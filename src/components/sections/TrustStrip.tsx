/**
 * Compact trust strip directly under the hero.
 *
 * Five short benefits: a divided row on desktop, a two- then three-column
 * grid on smaller screens. Deliberately not five separate cards.
 */

import {
  Car,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
  Truck,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { trustItems } from "@/content/copy";

const ICONS: Record<(typeof trustItems)[number]["icon"], LucideIcon> = {
  car: Car,
  sliders: SlidersHorizontal,
  shield: ShieldCheck,
  truck: Truck,
  rotate: RotateCcw,
};

export function TrustStrip() {
  return (
    <section aria-label="Shopping benefits" className="border-y border-line bg-surface">
      <Container>
        <ul className="grid grid-cols-2 gap-x-5 gap-y-4 py-5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-0 lg:divide-x lg:divide-line">
          {trustItems.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <li
                key={item.id}
                className="flex items-center gap-2.5 lg:px-5 lg:first:pl-0 lg:last:pr-0"
              >
                <Icon
                  className="h-5 w-5 shrink-0 text-brand"
                  aria-hidden="true"
                />
                <span className="text-sm font-medium leading-snug text-ink">
                  {item.label}
                </span>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
