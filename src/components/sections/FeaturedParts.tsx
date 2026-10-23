"use client";

/**
 * Featured Parts — the main shopping interface.
 *
 * Filters (category + header search) combine into one result list derived
 * straight from the mock catalogue, so the count and the empty states are
 * always truthful.
 */

import { useMemo } from "react";
import { Car, SearchX, SlidersHorizontal, X } from "lucide-react";

import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { featuredSection } from "@/content/copy";
import { categories, products } from "@/data/mock";
import { formatVehicleDetail } from "@/lib/format";
import { focusVehicleFinder, sectionIds } from "@/lib/navigation";
import { useStore } from "@/lib/store";

export function FeaturedParts() {
  const {
    vehicle,
    activeCategory,
    setActiveCategory,
    query,
    setQuery,
    clearFilters,
  } = useStore();

  const trimmedQuery = query.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      products.filter((product) => {
        const inCategory = !activeCategory || product.categoryId === activeCategory;
        if (!inCategory) return false;
        if (!trimmedQuery) return true;
        return (
          product.name.toLowerCase().includes(trimmedQuery) ||
          product.partNumber.toLowerCase().includes(trimmedQuery) ||
          product.blurb.toLowerCase().includes(trimmedQuery)
        );
      }),
    [activeCategory, trimmedQuery],
  );

  const activeCategoryName = categories.find(
    (category) => category.id === activeCategory,
  )?.name;

  const filterButton = (
    id: string,
    label: string,
    active: boolean,
    onClick: () => void,
  ) => (
    <button
      key={id}
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`h-9 shrink-0 rounded-control border px-3.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
        active
          ? "border-brand bg-brand text-white"
          : "border-line bg-white text-muted hover:border-muted/60 hover:text-ink"
      }`}
    >
      {label}
    </button>
  );

  return (
    <Section id={sectionIds.featured}>
      {/* Section header with the vehicle context on the right --------------- */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
            {featuredSection.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {featuredSection.description}
          </p>
        </div>

        {vehicle ? (
          <div className="flex w-full items-center gap-3.5 rounded-card border border-line bg-white px-4 py-3.5 shadow-xs lg:w-auto">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-light text-brand">
              <Car className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Your vehicle
              </p>
              <p className="truncate text-base font-semibold tracking-tight text-ink">
                {formatVehicleDetail(vehicle)}
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={focusVehicleFinder}
              className="ml-auto shrink-0"
            >
              {featuredSection.changeVehicle}
            </Button>
          </div>
        ) : (
          <div className="flex w-full flex-wrap items-center gap-3.5 rounded-card border border-dashed border-line bg-surface px-4 py-3.5 lg:w-auto">
            <div className="min-w-0">
              <p className="text-base font-semibold tracking-tight text-ink">
                {featuredSection.noVehicleTitle}
              </p>
              <p className="mt-0.5 text-sm text-muted">
                {featuredSection.noVehicleDescription}
              </p>
            </div>
            <Button
              size="sm"
              onClick={focusVehicleFinder}
              className="ml-auto shrink-0"
            >
              {featuredSection.chooseCar}
            </Button>
          </div>
        )}
      </div>

      {/* Filters ------------------------------------------------------------- */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="-mx-5 overflow-x-auto px-5 no-scrollbar sm:mx-0 sm:px-0">
          <div className="flex min-w-max gap-2">
            {filterButton(
              "all",
              featuredSection.allCategories,
              !activeCategory,
              () => {
                setActiveCategory(null);
              },
            )}
            {categories.map((category) =>
              filterButton(
                category.id,
                category.name,
                activeCategory === category.id,
                () => setActiveCategory(category.id),
              ),
            )}
          </div>
        </div>

        <p
          aria-live="polite"
          className="shrink-0 text-sm text-muted"
        >
          {featuredSection.resultsLabel(filtered.length, products.length)}
        </p>
      </div>

      {/* Active search query -------------------------------------------------- */}
      {query.trim() && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted">
          <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
          <span>
            Results for <span className="font-medium text-ink">“{query.trim()}”</span>
          </span>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="inline-flex h-7 items-center gap-1 rounded-md border border-line bg-white px-2 text-xs font-medium text-muted transition-colors hover:border-danger hover:text-danger"
          >
            <X className="h-3 w-3" aria-hidden="true" />
            Clear search
          </button>
        </div>
      )}

      {/* Results -------------------------------------------------------------- */}
      {filtered.length > 0 ? (
        <ul className="mt-6 grid gap-4 min-[520px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <li key={product.id} className="min-w-0">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-card border border-dashed border-line bg-surface px-6 py-16 text-center">
          <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-white text-muted">
            <SearchX className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">
            {query.trim()
              ? featuredSection.emptySearchTitle(query.trim())
              : featuredSection.emptyTitle}
          </h3>
          <p className="mx-auto mt-2 max-w-[46ch] text-sm leading-relaxed text-muted">
            {featuredSection.emptyDescription}
          </p>
          <Button
            variant="secondary"
            onClick={clearFilters}
            className="mt-5"
          >
            {featuredSection.clearFilters}
          </Button>
        </div>
      )}

      {/* Filter context line */}
      {activeCategory && filtered.length > 0 && (
        <p className="mt-5 text-sm text-muted">
          Filtered by <span className="font-medium text-ink">{activeCategoryName}</span>.
        </p>
      )}
    </Section>
  );
}
