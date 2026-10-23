/**
 * Payment and delivery confidence block.
 *
 * All provider names are placeholders listed as text — no licensed logos and
 * no claim that an integration exists. Policy notes that still need business
 * confirmation are stated as such.
 */

import { Check, FileText, Info, Receipt } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { paymentSection } from "@/content/copy";
import { deliveryPartners, paymentMethods } from "@/content/site";
import { sectionIds } from "@/lib/navigation";

const FACT_ICONS: Record<string, typeof Check> = {
  currency: Check,
  vat: Receipt,
  invoice: FileText,
};

export function PaymentDelivery() {
  return (
    <Section id={sectionIds.payment} dense>
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
          {paymentSection.title}
        </h2>
      </div>

      <div className="mt-8 grid gap-8 border-t border-line pt-8 md:grid-cols-2 md:gap-12">
        {/* Payments */}
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-ink">
            {paymentSection.paymentHeading}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {paymentMethods.map((method) => (
              <li
                key={method}
                className="rounded-md border border-line bg-surface px-3 py-1.5 text-sm font-medium text-ink"
              >
                {method}
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-muted">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {paymentSection.paymentNote}
          </p>
        </div>

        {/* Delivery */}
        <div className="md:border-l md:border-line md:pl-12">
          <h3 className="text-lg font-semibold tracking-tight text-ink">
            {paymentSection.deliveryHeading}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {deliveryPartners.map((partner) => (
              <li
                key={partner}
                className="rounded-md border border-line bg-surface px-3 py-1.5 text-sm font-medium text-ink"
              >
                {partner}
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-muted">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {paymentSection.deliveryNote}
          </p>
        </div>
      </div>

      {/* Pricing and invoice facts */}
      <ul className="mt-8 grid gap-4 border-t border-line pt-8 sm:grid-cols-3">
        {paymentSection.facts.map((fact) => {
          const Icon = FACT_ICONS[fact.id] ?? Check;
          return (
            <li key={fact.id} className="flex items-start gap-3">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-brand-light text-brand">
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span className="text-sm leading-relaxed text-ink">
                {fact.text}
              </span>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
