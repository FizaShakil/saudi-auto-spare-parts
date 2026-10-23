"use client";

/**
 * Reusable VIN lookup form.
 *
 * Used twice: as the second tab of the hero vehicle finder and inside the VIN
 * education section. Validation logic lives in `src/lib/vin.ts`; the resolved
 * vehicle comes from the demo mapping in `src/data/mock.ts`.
 *
 * DEMO LIMITATION: no VIN decoding service is connected. Only the sample VIN
 * resolves, and that is stated in the UI.
 */

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Loader2, ScanLine } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { VinHelpDialog } from "@/components/vehicle/VinHelpDialog";
import { hero } from "@/content/copy";
import { DEMO_VIN, demoVinMapping } from "@/data/mock";
import { normalizeVin, validateVin } from "@/lib/vin";
import type { SelectedVehicle } from "@/lib/types";

interface VinFormProps {
  /** Prefix for generated element ids so two instances never collide. */
  idPrefix: string;
  /** Called with the demo vehicle when the sample VIN is submitted. */
  onResolved: (vehicle: SelectedVehicle) => void;
  /** Submit button label. */
  ctaLabel?: string;
  /** Show the "use the sample VIN" helper (useful in the demo). */
  showDemoHint?: boolean;
}

export function VinForm({
  idPrefix,
  onResolved,
  ctaLabel = hero.vinCta,
  showDemoHint = true,
}: VinFormProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const inputId = `${idPrefix}-vin`;
  const errorId = `${idPrefix}-vin-error`;
  const hintId = `${idPrefix}-vin-hint`;
  const typedLength = normalizeVin(value).length;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;

    const result = validateVin(value);
    if (!result.ok) {
      setError(result.message);
      inputRef.current?.focus();
      return;
    }

    setError(null);
    setBusy(true);

    // Simulated lookup so the loading state is real, not decorative.
    timerRef.current = setTimeout(() => {
      setBusy(false);
      const match = demoVinMapping[result.vin];
      if (match) {
        setValue("");
        onResolved(match);
      } else {
        setError(
          "That VIN is not part of this demo lookup. Use the sample VIN below, or choose your car in the selector.",
        );
        inputRef.current?.focus();
      }
    }, 650);
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="mt-5">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor={inputId} className="text-sm font-medium text-ink">
              Vehicle identification number (VIN)
            </label>
            <span
              className={`font-mono text-xs tabular-nums ${
                typedLength === 17 ? "text-brand" : "text-muted"
              }`}
              aria-hidden="true"
            >
              {typedLength}/17
            </span>
          </div>

          <div className="relative">
            <ScanLine
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <input
              ref={inputRef}
              id={inputId}
              name={inputId}
              type="text"
              inputMode="text"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="characters"
              spellCheck={false}
              maxLength={17}
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
                if (error) setError(null);
              }}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `${hintId} ${errorId}` : hintId}
              placeholder="17-character VIN"
              className={`h-12 w-full rounded-control border bg-white pl-10 pr-3.5 font-mono text-base uppercase tracking-wider text-ink transition-colors placeholder:tracking-normal placeholder:text-muted/70 focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                error ? "border-danger" : "border-line hover:border-muted/60"
              }`}
            />
          </div>

          {error && (
            <p id={errorId} role="alert" className="text-sm font-medium text-danger">
              {error}
            </p>
          )}
        </div>

        <p id={hintId} className="mt-2.5 text-sm leading-relaxed text-muted">
          You will find it on the windshield, the registration card or the
          driver&apos;s door jamb.{" "}
          <button
            type="button"
            onClick={() => setHelpOpen(true)}
            className="font-medium text-brand underline underline-offset-4 hover:text-brand-dark"
          >
            Where do I find my VIN?
          </button>
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="submit"
            size="lg"
            disabled={busy}
            className={busy ? "cursor-wait" : ""}
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {busy ? "Checking VIN…" : ctaLabel}
          </Button>

          {showDemoHint && (
            <p className="text-xs leading-relaxed text-muted">
              Preview lookup resolves one sample VIN:{" "}
              <button
                type="button"
                onClick={() => {
                  setValue(DEMO_VIN);
                  setError(null);
                  inputRef.current?.focus();
                }}
                aria-label={`Use the sample VIN ${DEMO_VIN}`}
                className="font-mono font-medium text-ink underline underline-offset-4 hover:text-brand"
              >
                {DEMO_VIN}
              </button>
            </p>
          )}
        </div>
      </form>

      <VinHelpDialog open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}
