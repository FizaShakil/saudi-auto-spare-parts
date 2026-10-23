"use client";

/**
 * Lightweight client-side store for the demo.
 *
 * Holds the three pieces of state that must survive a page refresh — the
 * selected vehicle, the cart and the transient UI filters.
 *
 * Hydration is done with `useSyncExternalStore` rather than an effect that
 * calls `setState`: the server snapshot is empty, the client snapshot is the
 * persisted value, and React re-renders once after hydration with the real
 * data. The user's own edits are layered on top as overrides, so a clear
 * action stays cleared even though the persisted value is still in the
 * snapshot.
 *
 * No backend is involved anywhere in this file.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { STORAGE_KEYS, readJSON, removeKey, writeJSON } from "@/lib/storage";
import type {
  CartLine,
  Product,
  QualityTierId,
  SelectedVehicle,
  ToastMessage,
} from "@/lib/types";

interface StoreValue {
  /** False until localStorage has been read — gate persisted UI on this. */
  ready: boolean;

  /* Vehicle ------------------------------------------------------------- */
  vehicle: SelectedVehicle | null;
  setVehicle: (vehicle: SelectedVehicle) => void;
  clearVehicle: () => void;

  /* Cart ---------------------------------------------------------------- */
  cart: CartLine[];
  cartCount: number;
  addToCart: (product: Product, quality: QualityTierId) => void;
  updateLineQuantity: (key: string, delta: number) => void;
  removeLine: (key: string) => void;

  /* Discovery filters ---------------------------------------------------- */
  activeCategory: string | null;
  setActiveCategory: (categoryId: string | null) => void;
  query: string;
  setQuery: (query: string) => void;
  clearFilters: () => void;

  /* Feedback -------------------------------------------------------------- */
  toast: ToastMessage | null;
  notify: (message: string, tone?: ToastMessage["tone"]) => void;
}

interface PersistedState {
  vehicle: SelectedVehicle | null;
  cart: CartLine[];
}

/** What the server (and the pre-hydration client) renders with. */
const EMPTY_PERSISTED: PersistedState = { vehicle: null, cart: [] };

const StoreContext = createContext<StoreValue | null>(null);

/* --------------------------- persistence ------------------------------- */

/** Guards against corrupted storage producing an unusable vehicle object. */
function isStoredVehicle(value: unknown): value is SelectedVehicle {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<SelectedVehicle>;
  return (
    typeof candidate.make === "string" &&
    typeof candidate.model === "string" &&
    typeof candidate.year === "number"
  );
}

function isStoredCart(value: unknown): value is CartLine[] {
  return Array.isArray(value);
}

/**
 * Cached snapshot of localStorage. Read once, then reused so the identity of
 * the value returned by `getSnapshot` never changes (React compares snapshots
 * with `Object.is`).
 */
let persistedCache: PersistedState | null = null;

function readPersisted(): PersistedState {
  if (persistedCache) return persistedCache;

  const rawVehicle = readJSON<unknown>(STORAGE_KEYS.vehicle, null);
  const rawCart = readJSON<unknown>(STORAGE_KEYS.cart, []);

  persistedCache = {
    vehicle: isStoredVehicle(rawVehicle) ? rawVehicle : null,
    cart: isStoredCart(rawCart) ? rawCart : [],
  };
  return persistedCache;
}

/** localStorage has no in-page change events we rely on for this demo. */
function subscribeToPersisted(): () => void {
  return () => {};
}

/* ------------------------------- store --------------------------------- */

export function StoreProvider({ children }: { children: ReactNode }) {
  const persisted = useSyncExternalStore(
    subscribeToPersisted,
    readPersisted,
    () => EMPTY_PERSISTED,
  );

  // `ready` flips after hydration, when the real snapshot replaces the
  // empty server snapshot.
  const ready = persisted !== EMPTY_PERSISTED;

  // User edits sit on top of the persisted snapshot. `undefined` means
  // "not touched yet", so a stored vehicle still seeds the UI.
  const [vehicleOverride, setVehicleOverride] = useState<
    SelectedVehicle | null | undefined
  >(undefined);
  const [cartOverride, setCartOverride] = useState<CartLine[] | undefined>(
    undefined,
  );

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const vehicle =
    vehicleOverride !== undefined ? vehicleOverride : persisted.vehicle;
  const cart = cartOverride ?? persisted.cart;

  /* --------------------------- persistence ----------------------------- */

  useEffect(() => {
    if (!ready) return;
    if (vehicle) writeJSON(STORAGE_KEYS.vehicle, vehicle);
    else removeKey(STORAGE_KEYS.vehicle);
  }, [ready, vehicle]);

  useEffect(() => {
    if (!ready) return;
    writeJSON(STORAGE_KEYS.cart, cart);
  }, [ready, cart]);

  /* ------------------------------ actions ------------------------------ */

  const setVehicle = useCallback(
    (next: SelectedVehicle) => setVehicleOverride(next),
    [],
  );

  const clearVehicle = useCallback(() => setVehicleOverride(null), []);

  const addToCart = useCallback(
    (product: Product, quality: QualityTierId) => {
      const key = `${product.id}:${quality}`;
      const unitPrice = product.prices[quality];

      setCartOverride((current) => {
        const lines = current ?? readPersisted().cart;
        const existing = lines.find((line) => line.key === key);

        if (existing) {
          return lines.map((line) =>
            line.key === key
              ? { ...line, quantity: line.quantity + 1 }
              : line,
          );
        }

        return [
          ...lines,
          {
            key,
            productId: product.id,
            name: product.name,
            partNumber: product.partNumber,
            quality,
            unitPrice,
            quantity: 1,
          },
        ];
      });
    },
    [],
  );

  const updateLineQuantity = useCallback((key: string, delta: number) => {
    setCartOverride((current) =>
      (current ?? readPersisted().cart)
        .map((line) =>
          line.key === key
            ? { ...line, quantity: Math.max(0, line.quantity + delta) }
            : line,
        )
        .filter((line) => line.quantity > 0),
    );
  }, []);

  const removeLine = useCallback((key: string) => {
    setCartOverride((current) =>
      (current ?? readPersisted().cart).filter((line) => line.key !== key),
    );
  }, []);

  const clearFilters = useCallback(() => {
    setActiveCategory(null);
    setQuery("");
  }, []);

  const notify = useCallback(
    (message: string, tone: ToastMessage["tone"] = "default") => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
      setToast({ id: Date.now(), message, tone });
      toastTimer.current = setTimeout(() => setToast(null), 4000);
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  /* ------------------------------ derived ------------------------------ */

  const cartCount = useMemo(
    () => cart.reduce((total, line) => total + line.quantity, 0),
    [cart],
  );

  const value = useMemo<StoreValue>(
    () => ({
      ready,
      vehicle,
      setVehicle,
      clearVehicle,
      cart,
      cartCount,
      addToCart,
      updateLineQuantity,
      removeLine,
      activeCategory,
      setActiveCategory,
      query,
      setQuery,
      clearFilters,
      toast,
      notify,
    }),
    [
      ready,
      vehicle,
      setVehicle,
      clearVehicle,
      cart,
      cartCount,
      addToCart,
      updateLineQuantity,
      removeLine,
      activeCategory,
      query,
      clearFilters,
      toast,
      notify,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

/** Access the store. Throws when used outside `StoreProvider`. */
export function useStore(): StoreValue {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used inside <StoreProvider>");
  }
  return context;
}
