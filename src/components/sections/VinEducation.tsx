"use client";

/**
 * VIN education band on the light green surface: what a VIN is, where to find
 * it, why it helps, and a compact lookup panel using the same validation as
 * the hero form.
 */

import { useState } from "react";
import { ArrowRight, Check, MapPin, Pin } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { VinForm } from "@/components/vehicle/VinForm";
import { demoNotices, vinSection } from "@/content/copy";
import { formatVehicleDetail } from "@/lib/format";
import { focusVehicleFinder, scrollToSection, sectionIds } from "@/lib/navigation";
import { useStore } from "@/lib/store";
import type { SelectedVehicle } from "@/lib/types";

export function VinEducation() {
  const { setVehicle, notify } = useStore();
  const [confirmed, setConfirmed] = useState<SelectedVehicle | null>(null);

  const handleResolved = (resolved: SelectedVehicle) => {
    setVehicle(resolved);
    setConfirmed(resolved);
    notify(demoNotices.vehicleSaved(formatVehicleDetail(resolved)), "success");
    scrollToSection(sectionIds.featured);
  };

  return (
    <Section id={sectionIds.vin} className="bg-brand-light">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Explanatory column --------------------------------------------- */}
        <div>
          <h2 className="max-w-[18ch] text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
            {vinSection.title}
          </h2>
          <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-muted">
            {vinSection.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {vinSection.locations.map((location) => (
              <li
                key={location}
                className="inline-flex items-center gap-1.5 rounded-lg border border-brand/20 bg-white px-3 py-2 text-sm font-medium text-ink"
              >
                <MapPin className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                {location}
              </li>
            ))}
          </ul>

          <ul className="mt-7 space-y-3">
            {vinSection.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                <span className="text-base leading-relaxed text-ink">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-brand/20 pt-5">
            <p className="max-w-[56ch] text-sm leading-relaxed text-muted">
              {vinSection.fallbackNote}
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={focusVehicleFinder}
              className="mt-3"
            >
              {vinSection.useSelector}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        {/* Lookup panel ----------------------------------------------------- */}
        <div className="lg:pt-2">
          <div className="rounded-panel border border-line bg-white p-5 shadow-card sm:p-6">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-light text-brand">
                <Pin className="h-4 w-4" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-semibold tracking-tight text-ink">
                {vinSection.panelTitle}
              </h3>
            </div>

            <VinForm idPrefix="vin-section" onResolved={handleResolved} />

            {confirmed && (
              <p
                role="status"
                className="mt-5 rounded-card bg-brand-light px-3.5 py-3 text-sm leading-relaxed text-brand-dark"
              >
                <span className="font-semibold">
                  {formatVehicleDetail(confirmed)}
                </span>{" "}
                saved to My Garage. Compatibility labels now use this vehicle.
              </p>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
