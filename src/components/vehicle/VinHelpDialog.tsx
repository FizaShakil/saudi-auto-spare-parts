"use client";

/**
 * Accessible dialog explaining where a VIN can be found.
 *
 * Contains a custom diagram (windshield plate + registration card) and a
 * short ordered list of the three common locations.
 */

import { Dialog } from "@/components/ui/Dialog";
import { VinHelpArt } from "@/components/illustrations/VinHelpArt";
import { vinSection } from "@/content/copy";

const LOCATIONS = [
  {
    title: "Base of the windshield",
    detail: "Viewed from outside the car, on the driver's side.",
  },
  {
    title: "Vehicle registration card",
    detail: "Printed on the registration document (istimara).",
  },
  {
    title: "Driver's door jamb",
    detail: "On a label revealed when the driver's door is open.",
  },
];

interface VinHelpDialogProps {
  open: boolean;
  onClose: () => void;
}

export function VinHelpDialog({ open, onClose }: VinHelpDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} title="Where do I find my VIN?">
      <div className="px-5 py-5 sm:px-6">
        <VinHelpArt className="h-auto w-full rounded-lg border border-line bg-white" />

        <ol className="mt-5 space-y-4">
          {LOCATIONS.map((location, index) => (
            <li key={location.title} className="flex gap-3.5">
              <span
                aria-hidden="true"
                className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-light text-xs font-semibold text-brand"
              >
                {index + 1}
              </span>
              <span>
                <span className="block text-base font-medium tracking-tight text-ink">
                  {location.title}
                </span>
                <span className="mt-0.5 block text-sm leading-relaxed text-muted">
                  {location.detail}
                </span>
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-5 rounded-card bg-surface px-3.5 py-3 text-sm leading-relaxed text-muted">
          Your VIN has 17 characters and never contains the letters I, O or Q.
          If it is damaged or unreadable, the {vinSection.panelTitle.toLowerCase()}{" "}
          alternative is the vehicle selector.
        </p>
      </div>
    </Dialog>
  );
}
