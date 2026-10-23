/**
 * Hero — the primary conversion area.
 *
 * Desktop: a 55/45 split between the headline + vehicle finder and a custom
 * parts illustration. Mobile: copy first, finder immediately after, artwork
 * last so the primary action is never pushed below the fold.
 */

import { Container } from "@/components/ui/Container";
import { PartsHeroArt } from "@/components/illustrations/PartsHeroArt";
import { VehicleFinder } from "@/components/vehicle/VehicleFinder";
import { hero } from "@/content/copy";

export function Hero() {
  return (
    <section className="relative bg-white">
      <Container className="pb-14 pt-9 sm:pt-12 lg:pb-20 lg:pt-16">
        <div className="grid items-start gap-9 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
          {/* Primary content ------------------------------------------------ */}
          <div className="min-w-0">
            <h1 className="max-w-[15ch] text-5xl font-bold leading-[1.05] tracking-display text-ink sm:text-6xl">
              Find the{" "}
              <span className="text-brand">Right Parts</span> for Your Car
            </h1>

            <p className="mt-4 max-w-[54ch] text-lg leading-relaxed text-muted">
              {hero.description}
            </p>

            <div className="mt-7 sm:mt-8">
              <VehicleFinder />
            </div>
          </div>

          {/* Secondary visual ----------------------------------------------- */}
          <div className="lg:col-start-2 lg:row-start-1 lg:pt-2">
            <div className="relative overflow-hidden rounded-panel border border-brand/15 bg-brand-light">
              <PartsHeroArt className="h-auto w-full" />
            </div>

            <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-muted">
              Engine oil, filters, brakes and ignition parts — matched to what
              you drive, priced by the quality tier you choose.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
