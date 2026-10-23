"use client";

/**
 * "Shop by category" grid.
 *
 * Selecting a category sets the shared filter used by Featured Parts and
 * scrolls there. Categories without demo products still respond — the product
 * grid shows an explanatory empty state instead of a dead click.
 */

import {
  ArrowRight,
  CarFront,
  Cog,
  Disc,
  Droplets,
  Filter,
  Lightbulb,
  MoveVertical,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { categoriesSection } from "@/content/copy";
import { categories, products } from "@/data/mock";
import { scrollToSection, sectionIds } from "@/lib/navigation";
import { useStore } from "@/lib/store";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "engine-oil": Droplets,
  "gear-oil": Cog,
  "brake-pads": Disc,
  filters: Filter,
  suspension: MoveVertical,
  "engine-parts": Wrench,
  "body-exterior": CarFront,
  "electrical-lighting": Lightbulb,
};

/** Number of demo products filed under a category. */
function productCount(categoryId: string): number {
  return products.filter((product) => product.categoryId === categoryId).length;
}

export function CategorySection() {
  const { activeCategory, setActiveCategory, setQuery } = useStore();

  const selectCategory = (categoryId: string) => {
    // Clicking the active category again clears the filter.
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
    setQuery("");
    scrollToSection(sectionIds.featured);
  };

  const showAll = () => {
    setActiveCategory(null);
    setQuery("");
    scrollToSection(sectionIds.featured);
  };

  return (
    <Section id={sectionIds.categories}>
      {/* Asymmetric section header: heading left, action right */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
            {categoriesSection.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {categoriesSection.description}
          </p>
        </div>

        <Button
          variant="secondary"
          onClick={showAll}
          className="shrink-0 self-start sm:self-auto"
        >
          {categoriesSection.browseAll}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon = CATEGORY_ICONS[category.id];
          const count = productCount(category.id);
          const isActive = activeCategory === category.id;

          return (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => selectCategory(category.id)}
                aria-pressed={isActive}
                className={`group flex h-full w-full flex-col items-start rounded-card border bg-white p-4 text-left shadow-xs transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:p-5 ${
                  isActive
                    ? "border-brand bg-brand-light/60"
                    : "border-line hover:border-brand/50 hover:bg-surface hover:shadow-sm"
                }`}
              >
                <span
                  className={`grid h-10 w-10 place-items-center rounded-lg transition-colors ${
                    isActive
                      ? "bg-brand text-white"
                      : "bg-brand-light text-brand group-hover:bg-brand group-hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>

                <span className="mt-4 flex items-center gap-1.5 text-base font-semibold leading-snug tracking-tight text-ink">
                  {category.name}
                  {isActive && (
                    <span className="text-xs font-medium text-brand">
                      (filtered)
                    </span>
                  )}
                </span>

                <span className="mt-1 text-sm leading-snug text-muted">
                  {category.blurb}
                </span>

                <span className="mt-4 flex w-full items-center justify-between gap-3 border-t border-line pt-3">
                  <span className="text-xs text-muted">
                    {count === 0
                      ? "No demo parts yet"
                      : `${count} part${count === 1 ? "" : "s"}`}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-brand"
                    aria-hidden="true"
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
