"use client";

/**
 * Popular makes: one-click shortcuts into the vehicle finder.
 * Selecting a make switches to the selector tab, preselects the make, resets
 * the dependent fields and scrolls the finder into view.
 */

import { Check } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { makesSection } from "@/content/copy";
import { popularMakes } from "@/data/mock";
import { emitMakeRequest } from "@/lib/finderBus";
import { sectionIds } from "@/lib/navigation";
import { useStore } from "@/lib/store";

export function PopularMakes() {
  const { vehicle } = useStore();

  return (
    <Section id={sectionIds.makes} dense className="border-y border-line bg-surface">
      <Reveal>
      <div className="grid gap-6 lg:grid-cols-[300px_1fr] lg:gap-12">
        <div>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
            {makesSection.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {makesSection.description}
          </p>
        </div>

        <ul className="flex flex-wrap gap-2.5">
          {popularMakes.map((make) => {
            const isCurrent = vehicle?.make === make;
            return (
              <li key={make}>
                <button
                  type="button"
                  onClick={() => emitMakeRequest(make)}
                  aria-pressed={isCurrent}
                  className={`inline-flex h-11 items-center gap-1.5 rounded-control border px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                    isCurrent
                      ? "border-brand bg-brand-light text-brand-dark"
                      : "border-line bg-white text-ink hover:border-brand hover:text-brand"
                  }`}
                >
                  {make}
                  {isCurrent && (
                    <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      </Reveal>
    </Section>
  );
}
