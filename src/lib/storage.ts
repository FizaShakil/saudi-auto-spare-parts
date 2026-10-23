/**
 * Safe localStorage / sessionStorage helpers.
 *
 * Storage can be unavailable (private browsing, blocked cookies, server
 * render). Every read and write is wrapped so client components never throw
 * and never produce a hydration mismatch.
 */

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/** Reads and parses a JSON value, returning `null` on any failure. */
export function readJSON<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** Writes a JSON value, ignoring storage failures silently. */
export function writeJSON(key: string, value: unknown): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or blocked — the demo continues without persistence */
  }
}

/** Removes a key from localStorage. */
export function removeKey(key: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* no-op */
  }
}

/** Reads a plain string value (used for session-scoped UI state). */
export function readString(key: string): string | null {
  if (!isBrowser()) return null;
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

/** Writes a plain string value. */
export function writeString(key: string, value: string): void {
  if (!isBrowser()) return;
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    /* no-op */
  }
}

/** Storage keys used across the app — keep them namespaced and stable. */
export const STORAGE_KEYS = {
  vehicle: "autopartsksa:vehicle",
  cart: "autopartsksa:cart",
  announcement: "autopartsksa:announcement-dismissed",
} as const;
