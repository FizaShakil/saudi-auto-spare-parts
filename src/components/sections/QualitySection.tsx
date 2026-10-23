/**
 * Quality tier comparison.
 *
 * One shared container divided into three equal columns rather than a stack of
 * pricing cards. Explains choice and price position without claiming anything
 * about manufacturing quality by country.
 */

import { Section } from "@/components/ui/Section";
import { qualitySection } from "@/content/copy";
import { qualityTiers } from "@/data/mock";
import { sectionIds } from "@/lib/navigation";

export function QualitySection() {
  return (
    <Section id={sectionIds.quality} className="border-y border-line bg-surface">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
          {qualitySection.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted">
          {qualitySection.description}
        </p>
      </div>

      <div className="mt-9 grid overflow-hidden rounded-panel border border-line bg-white md:grid-cols-3">
        {qualityTiers.map((tier, index) => (
          <div
            key={tier.id}
            className={`flex flex-col p-6 lg:p-7 ${
              index > 0
                ? "border-t border-line md:border-l md:border-t-0"
                : ""
            }`}
          >
            <div>
              <h3 className="text-xl font-semibold leading-tight tracking-tight text-ink">
                {tier.label}
              </h3>
              <p className="mt-1.5 text-sm font-semibold text-brand">
                {tier.position}
              </p>
            </div>

            {/* Tier meter: three steps, filled up to this tier's level */}
            <div className="mt-5">
              <div className="flex gap-1.5" aria-hidden="true">
                {[1, 2, 3].map((step) => (
                  <span
                    key={step}
                    className={`h-1.5 flex-1 rounded-full ${
                      step <= tier.level ? "bg-brand" : "bg-line"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-2 text-xs text-muted">
                {tier.pricePosition}
                <span className="sr-only"> — level {tier.level} of 3</span>
              </p>
            </div>

            <p className="mt-4 text-base leading-relaxed text-muted">
              {tier.description}
            </p>

            <p className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-muted">
              <span className="font-medium text-ink">
                {qualitySection.bestForLabel}:
              </span>{" "}
              {tier.bestFor}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-7 flex flex-col gap-2">
        <p className="text-lg font-semibold tracking-tight text-ink">
          {qualitySection.closing}
        </p>
        <p className="max-w-[70ch] text-sm leading-relaxed text-muted">
          {qualitySection.note}
        </p>
      </div>
    </Section>
  );
}
