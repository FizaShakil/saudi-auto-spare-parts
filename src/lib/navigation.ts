/**
 * Section ids and scroll helpers shared by the header, CTAs and shortcuts.
 * Every in-page anchor on the site points at one of these ids.
 */
export const sectionIds = {
  finder: "vehicle-finder",
  categories: "categories",
  featured: "featured-parts",
  quality: "quality-tiers",
  how: "how-it-works",
  vin: "vin-lookup",
  makes: "popular-makes",
  payment: "payment",
  faq: "faq",
  contact: "contact",
} as const;

export type SectionId = keyof typeof sectionIds;

/** True when the visitor has asked for reduced motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Smoothly scrolls to a section. Sections carry `scroll-mt-*` utilities so the
 * sticky header never covers the heading.
 */
export function scrollToSection(id: string): void {
  if (typeof document === "undefined") return;
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
}

/**
 * Scrolls to the vehicle finder and moves keyboard focus into it so the next
 * Tab press lands on the interactive controls.
 */
export function focusVehicleFinder(): void {
  scrollToSection(sectionIds.finder);
  const focusTarget = document.querySelector<HTMLElement>("[data-finder-focus]");
  if (!focusTarget) return;
  // Wait for the scroll to settle enough for focus not to jump the viewport.
  window.setTimeout(
    () => focusTarget.focus({ preventScroll: true }),
    prefersReducedMotion() ? 0 : 350,
  );
}
