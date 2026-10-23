"use client";

/**
 * Segmented quality selector built from native radio inputs.
 *
 * Native radios give arrow-key navigation and correct screen-reader semantics
 * for free; the visual treatment adds a filled state plus a check mark so the
 * selection never depends on colour alone.
 */

import { Check } from "lucide-react";

import { qualityTiers } from "@/data/mock";
import type { QualityTierId } from "@/lib/types";

interface QualitySelectorProps {
  value: QualityTierId;
  onChange: (tier: QualityTierId) => void;
  /** Unique prefix so multiple cards never share radio group names. */
  name: string;
  disabled?: boolean;
}

export function QualitySelector({
  value,
  onChange,
  name,
  disabled = false,
}: QualitySelectorProps) {
  return (
    <fieldset className="min-w-0" disabled={disabled}>
      <legend className="sr-only">Choose a quality tier</legend>

      <div className="grid grid-cols-3 gap-1 rounded-control bg-surface p-1">
        {qualityTiers.map((tier) => {
          const checked = value === tier.id;
          const id = `${name}-${tier.id}`;

          return (
            <div key={tier.id} className="relative">
              <input
                type="radio"
                id={id}
                name={name}
                value={tier.id}
                checked={checked}
                onChange={() => onChange(tier.id)}
                className="peer sr-only"
              />
              <label
                htmlFor={id}
                className={`flex h-9 cursor-pointer items-center justify-center gap-1 rounded-md px-1 text-sm leading-none transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand ${
                  checked
                    ? "bg-brand font-semibold text-white shadow-xs"
                    : "font-medium text-muted hover:bg-white hover:text-ink"
                }`}
              >
                {checked && (
                  <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                )}
                <span>{tier.label}</span>
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
