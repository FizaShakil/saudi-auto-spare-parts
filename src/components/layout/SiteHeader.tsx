"use client";

/**
 * Sticky site header: announcement bar, primary navigation, search, garage,
 * account and cart access, plus the mobile drawer.
 *
 * Every control here has real behaviour:
 * - Search filters the Featured Parts catalogue live.
 * - My Garage opens a panel with the saved vehicle (or an empty state).
 * - Cart opens the slide-over cart.
 * - Account shows an honest "not part of this demo" notice.
 */

import { useEffect, useRef, useState } from "react";
import {
  Car,
  ChevronRight,
  Menu,
  Search,
  ShoppingCart,
  Trash2,
  User,
  X,
} from "lucide-react";

import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Wordmark } from "@/components/layout/Wordmark";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Dialog } from "@/components/ui/Dialog";
import { demoNotices, hero } from "@/content/copy";
import { navLinks } from "@/content/site";
import { formatVehicleDetail, formatVehicleLabel } from "@/lib/format";
import {
  focusVehicleFinder,
  scrollToSection,
  sectionIds,
} from "@/lib/navigation";
import { useStore } from "@/lib/store";

export function SiteHeader() {
  const { ready, vehicle, clearVehicle, cartCount, query, setQuery, notify } =
    useStore();

  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [garageOpen, setGarageOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const garageRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  /* Sticky elevation once the page is scrolled ---------------------------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Garage popover: outside click + Escape -------------------------------- */
  useEffect(() => {
    if (!garageOpen) return;

    garageRef.current?.querySelector<HTMLElement>("button")?.focus();

    const onPointerDown = (event: MouseEvent) => {
      if (
        garageRef.current &&
        !garageRef.current.contains(event.target as Node)
      ) {
        setGarageOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setGarageOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [garageOpen]);

  const vehicleLabel = ready && vehicle ? formatVehicleLabel(vehicle) : null;

  const submitSearch = () => {
    setSearchOpen(false);
    scrollToSection(sectionIds.featured);
  };

  const goToFinder = () => {
    setGarageOpen(false);
    setMenuOpen(false);
    focusVehicleFinder();
  };

  return (
    <>
      <AnnouncementBar />

      <header
        className={`sticky top-0 z-50 bg-white transition-[border-color,box-shadow] ${
          scrolled
            ? "border-b border-line shadow-xs"
            : "border-b border-transparent"
        }`}
      >
        <Container className="flex h-16 items-center gap-3 lg:h-[68px] lg:gap-5">
          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-control text-ink transition-colors hover:bg-surface lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* Wordmark - replace this component to swap in the client logo */}
          <a
            href={`#${sectionIds.finder}`}
            aria-label="AutoParts KSA home"
            className="shrink-0 rounded-control"
          >
            <Wordmark />
          </a>

          {/* Primary navigation */}
          <nav aria-label="Primary" className="ml-2 hidden items-center lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-control px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={() => {
                const willOpen = !searchOpen;
                setSearchOpen(willOpen);
                if (willOpen) {
                  window.setTimeout(() => searchInputRef.current?.focus(), 30);
                }
              }}
              aria-label={searchOpen ? "Close search" : "Search parts"}
              aria-expanded={searchOpen}
              aria-controls="site-search"
              className="grid h-11 w-11 place-items-center rounded-control text-ink transition-colors hover:bg-surface"
            >
              {searchOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Search className="h-5 w-5" aria-hidden="true" />
              )}
            </button>

            {/* My Garage */}
            <div className="relative hidden md:block" ref={garageRef}>
              <button
                type="button"
                onClick={() => setGarageOpen((open) => !open)}
                aria-expanded={garageOpen}
                aria-haspopup="dialog"
                aria-label={
                  vehicleLabel ? `My Garage: ${vehicleLabel}` : "My Garage"
                }
                className={`flex h-11 max-w-[230px] items-center gap-2 rounded-control border px-3 text-sm font-medium transition-colors ${
                  vehicleLabel
                    ? "border-line text-ink hover:border-brand hover:text-brand"
                    : "border-line text-muted hover:border-muted/60 hover:text-ink"
                }`}
              >
                <Car className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{vehicleLabel ?? "My Garage"}</span>
              </button>

              {garageOpen && (
                <div
                  role="dialog"
                  aria-label="My Garage"
                  tabIndex={-1}
                  className="absolute right-0 top-[calc(100%+10px)] w-[320px] rounded-card border border-line bg-white p-4 shadow-overlay"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    My Garage
                  </p>

                  {vehicle ? (
                    <>
                      <p className="mt-2 text-lg font-semibold leading-snug tracking-tight text-ink">
                        {formatVehicleLabel(vehicle)}
                      </p>
                      <p className="mt-0.5 text-sm text-muted">
                        {formatVehicleDetail(vehicle)}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          onClick={goToFinder}
                          className="flex-1"
                        >
                          {hero.changeVehicle}
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            clearVehicle();
                            setGarageOpen(false);
                            notify(demoNotices.vehicleRemoved);
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                          {hero.clearVehicle}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        No vehicle saved yet. Choose your car and every product
                        will show whether it fits.
                      </p>
                      <Button
                        onClick={goToFinder}
                        fullWidth
                        className="mt-4"
                      >
                        {hero.tabs.selector}
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Account - honest demo behaviour */}
            <button
              type="button"
              onClick={() => notify(demoNotices.account)}
              aria-label="Account"
              className="hidden h-11 w-11 place-items-center rounded-control text-ink transition-colors hover:bg-surface sm:grid"
            >
              <User className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Cart */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={
                cartCount > 0
                  ? `My cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`
                  : "My cart, empty"
              }
              className="relative grid h-11 w-11 place-items-center rounded-control text-ink transition-colors hover:bg-surface"
            >
              <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              {ready && cartCount > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute right-1 top-1 grid min-h-[18px] min-w-[18px] place-items-center rounded-full bg-brand px-1 text-2xs font-semibold leading-none text-white"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </Container>

        {/* Live search row */}
        {searchOpen && (
          <div className="border-t border-line bg-white">
            <Container className="flex items-center gap-3 py-3">
              <div className="relative flex-1">
                <label htmlFor="site-search" className="sr-only">
                  Search parts by name or part number
                </label>
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                  aria-hidden="true"
                />
                <input
                  id="site-search"
                  ref={searchInputRef}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      submitSearch();
                    }
                  }}
                  placeholder="Search by part name or part number"
                  className="h-11 w-full rounded-control border border-line bg-surface pl-10 pr-3 text-base text-ink placeholder:text-muted/80 focus:border-brand focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                />
              </div>
              <Button onClick={submitSearch} className="shrink-0">
                View results
              </Button>
            </Container>
          </div>
        )}
      </header>

      {/* Mobile navigation drawer */}
      <Dialog
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        title="Menu"
        placement="right"
      >
        <nav aria-label="Mobile" className="px-5 py-2 sm:px-6">
          <ul className="divide-y divide-line">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-12 items-center justify-between gap-4 py-3 text-base font-medium text-ink"
                >
                  {link.label}
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-line px-5 py-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            My Garage
          </p>
          {vehicle ? (
            <>
              <p className="mt-1.5 text-base font-semibold tracking-tight text-ink">
                {formatVehicleLabel(vehicle)}
              </p>
              <div className="mt-3 flex gap-2">
                <Button
                  onClick={() => {
                    setMenuOpen(false);
                    focusVehicleFinder();
                  }}
                  className="flex-1"
                >
                  {hero.changeVehicle}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    clearVehicle();
                    setMenuOpen(false);
                    notify(demoNotices.vehicleRemoved);
                  }}
                >
                  {hero.clearVehicle}
                </Button>
              </div>
            </>
          ) : (
            <Button
              fullWidth
              className="mt-3"
              onClick={() => {
                setMenuOpen(false);
                focusVehicleFinder();
              }}
            >
              {hero.tabs.selector}
            </Button>
          )}
        </div>
      </Dialog>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
