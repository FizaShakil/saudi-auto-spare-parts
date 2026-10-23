"use client";

/**
 * FAQ accordion.
 *
 * Single-open behaviour keeps the page scannable. Each header is a real
 * button with `aria-expanded` / `aria-controls`; answers expand with a short
 * grid-row transition and are inert while closed. Policies that the business
 * has not confirmed are marked as placeholders in `src/content/copy.ts`.
 */

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { faqSection } from "@/content/copy";
import { sectionIds } from "@/lib/navigation";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqSection.items[0]?.id ?? null);

  return (
    <Section id={sectionIds.faq} className="border-t border-line">
      <Reveal>
      <div className="grid gap-8 lg:grid-cols-[340px_1fr] lg:gap-14">
        {/* Heading column */}
        <div>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
            {faqSection.title}
          </h2>
          <p className="mt-4 max-w-[42ch] text-base leading-relaxed text-muted">
            {faqSection.description}
          </p>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-line border-y border-line">
          {faqSection.items.map((item) => {
            const isOpen = openId === item.id;
            const buttonId = `faq-button-${item.id}`;
            const panelId = `faq-panel-${item.id}`;

            return (
              <div key={item.id}>
                <h3 className="text-base font-medium tracking-tight text-ink">
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full items-start justify-between gap-5 py-5 text-left transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`mt-0.5 h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-brand" : ""
                      }`}
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[70ch] pb-5 pr-8 text-base leading-relaxed text-muted">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </Reveal>
    </Section>
  );
}
