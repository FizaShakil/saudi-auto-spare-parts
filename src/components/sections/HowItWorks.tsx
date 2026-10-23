/**
 * Three-step process section.
 *
 * Desktop: connected sequence with a hairline running through the numbered
 * markers. Mobile: a simple vertical stack that stays easy to scan.
 */

import { Section } from "@/components/ui/Section";
import { processSection } from "@/content/copy";
import { sectionIds } from "@/lib/navigation";

export function HowItWorks() {
  return (
    <Section id={sectionIds.how} dense>
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
          {processSection.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted">
          {processSection.description}
        </p>
      </div>

      <ol className="relative mt-9 grid gap-9 md:grid-cols-3 md:gap-8">
        {/* Connector between the markers on desktop */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-6 right-6 top-6 hidden h-px bg-line md:block"
        />

        {processSection.steps.map((step) => (
          <li key={step.number} className="relative">
            <span
              aria-hidden="true"
              className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-brand text-base font-semibold tabular-nums text-white"
            >
              {step.number}
            </span>
            <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-ink">
              {step.title}
            </h3>
            <p className="mt-2 max-w-[38ch] text-base leading-relaxed text-muted">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
