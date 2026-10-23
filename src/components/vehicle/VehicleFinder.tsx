"use client";

/**
 * Hero vehicle finder — the primary conversion control of the page.
 *
 * Two accessible tabs:
 *  1. Choose Your Car: make -> model -> year -> engine (cascading, each field
 *     disabled until its predecessor is chosen, downstream resets on change).
 *  2. Search by VIN: 17-character validation plus a demo lookup.
 *
 * A successful selection is written to the store (and therefore to
 * localStorage and the header garage) and the page scrolls to Featured Parts.
 */

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { SelectField } from "@/components/ui/SelectField";
import { VinForm } from "@/components/vehicle/VinForm";
import { hero } from "@/content/copy";
import { vehicleMakes } from "@/data/mock";
import { subscribeToMakeRequest } from "@/lib/finderBus";
import { formatVehicleDetail, formatVehicleSource } from "@/lib/format";
import { scrollToSection, sectionIds } from "@/lib/navigation";
import { useStore } from "@/lib/store";
import type { SelectedVehicle } from "@/lib/types";

type TabId = "car" | "vin";
type Status = "idle" | "loading" | "success";

interface FieldErrors {
  make?: string;
  model?: string;
  year?: string;
}

const TABS: { id: TabId; label: string; panelId: string; tabId: string }[] = [
  { id: "car", label: hero.tabs.selector, panelId: "finder-panel-car", tabId: "finder-tab-car" },
  { id: "vin", label: hero.tabs.vin, panelId: "finder-panel-vin", tabId: "finder-tab-vin" },
];

export function VehicleFinder() {
  const { vehicle, setVehicle, ready } = useStore();

  const [tab, setTab] = useState<TabId>("car");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  /**
   * Field values are stored as overrides (`null` = "nothing entered yet") and
   * fall back to the saved vehicle, but only while the cascade still matches.
   * Changing an upstream field clears the overrides downstream, which makes
   * the dependent options reset without an effect that copies state around.
   */
  const [makeInput, setMakeInput] = useState<string | null>(null);
  const [modelInput, setModelInput] = useState<string | null>(null);
  const [yearInput, setYearInput] = useState<string | null>(null);
  const [engineInput, setEngineInput] = useState<string | null>(null);

  const savedVehicle = ready ? vehicle : null;

  const make = makeInput ?? savedVehicle?.make ?? "";
  const model =
    modelInput ??
    (savedVehicle && savedVehicle.make === make ? savedVehicle.model : "");
  const year =
    yearInput ??
    (savedVehicle &&
    savedVehicle.make === make &&
    savedVehicle.model === model
      ? String(savedVehicle.year)
      : "");
  const engine =
    engineInput ??
    (savedVehicle &&
    savedVehicle.make === make &&
    savedVehicle.model === model &&
    String(savedVehicle.year) === year
      ? (savedVehicle.engine ?? "")
      : "");

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  /* Popular makes shortcut: switch tab, preselect make, reset the rest ----- */
  useEffect(() => {
    return subscribeToMakeRequest((requestedMake) => {
      setTab("car");
      setStatus("idle");
      setMakeInput(requestedMake);
      setModelInput(null);
      setYearInput(null);
      setEngineInput(null);
      setErrors({});
      scrollToSection(sectionIds.finder);
    });
  }, []);

  /* Derived option lists --------------------------------------------------- */
  const makeOptions = vehicleMakes.map((entry) => ({
    value: entry.name,
    label: entry.name,
  }));

  const selectedMake = vehicleMakes.find((entry) => entry.name === make);
  const modelOptions = (selectedMake?.models ?? []).map((entry) => ({
    value: entry.name,
    label: entry.name,
  }));

  const selectedModel = selectedMake?.models.find((entry) => entry.name === model);
  const yearOptions = (selectedModel?.years ?? []).map((value) => ({
    value: String(value),
    label: String(value),
  }));
  const engineOptions = (selectedModel?.engines ?? []).map((value) => ({
    value,
    label: value,
  }));

  /* Handlers --------------------------------------------------------------- */
  const selectMake = (value: string) => {
    setMakeInput(value);
    setModelInput(null);
    setYearInput(null);
    setEngineInput(null);
    setErrors((current) => ({ ...current, make: undefined }));
  };

  const selectModel = (value: string) => {
    setModelInput(value);
    setYearInput(null);
    setEngineInput(null);
    setErrors((current) => ({ ...current, model: undefined }));
  };

  const selectYear = (value: string) => {
    setYearInput(value);
    setErrors((current) => ({ ...current, year: undefined }));
  };

  const selectEngine = (value: string) => setEngineInput(value);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;

    const nextErrors: FieldErrors = {};
    if (!make) nextErrors.make = "Select a make to continue.";
    if (!model) nextErrors.model = "Select a model to continue.";
    if (!year) nextErrors.year = "Select a year to continue.";

    if (nextErrors.make || nextErrors.model || nextErrors.year) {
      setErrors(nextErrors);
      const firstInvalid = nextErrors.make
        ? "finder-make"
        : nextErrors.model
          ? "finder-model"
          : "finder-year";
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setErrors({});
    setStatus("loading");

    // Simulated lookup so the loading state reflects a real transition.
    timerRef.current = setTimeout(() => {
      setVehicle({
        make,
        model,
        year: Number(year),
        engine: engine || undefined,
        source: "selector",
      });
      setStatus("success");
      scrollToSection(sectionIds.featured);
    }, 700);
  };

  const handleVinResolved = (resolved: SelectedVehicle) => {
    setVehicle(resolved);
    setStatus("success");
    scrollToSection(sectionIds.featured);
  };

  const switchTab = (next: TabId) => {
    setTab(next);
    window.setTimeout(() => {
      document.getElementById(`finder-tab-${next}`)?.focus();
    }, 0);
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next: TabId =
      event.key === "Home"
        ? "car"
        : event.key === "End"
          ? "vin"
          : tab === "car"
            ? "vin"
            : "car";
    switchTab(next);
  };

  const focusTarget = status === "success" ? "success" : `finder-tab-${tab}`;

  return (
    <section id={sectionIds.finder} aria-labelledby="finder-heading" className="scroll-mt-28">
      <h2 id="finder-heading" className="sr-only">
        Identify your vehicle
      </h2>

      <div className="rounded-panel border border-line bg-white p-5 shadow-card sm:p-6 lg:p-7">
        {status === "success" && vehicle ? (
          /* -------------------------------------------------------------- */
          /* Success state                                                    */
          /* -------------------------------------------------------------- */
          <div
            role="status"
            tabIndex={-1}
            data-finder-focus="true"
            className="rounded-card border border-brand/25 bg-brand-light p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <div className="flex items-start gap-3.5">
              <span
                aria-hidden="true"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white"
              >
                <Check className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink">
                  {hero.successTitle}
                </p>
                <p className="mt-1 break-words text-xl font-semibold leading-snug tracking-tight text-brand-dark">
                  {formatVehicleDetail(vehicle)}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {formatVehicleSource(vehicle)}. Compatibility labels across
                  Featured Parts now refer to this vehicle.
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <Button
                onClick={() => scrollToSection(sectionIds.featured)}
              >
                {hero.viewParts}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button variant="secondary" onClick={() => setStatus("idle")}>
                {hero.changeVehicle}
              </Button>
            </div>
          </div>
        ) : (
          /* -------------------------------------------------------------- */
          /* Tabs + forms                                                     */
          /* -------------------------------------------------------------- */
          <>
            <div
              role="tablist"
              aria-label="Vehicle identification method"
              onKeyDown={handleTabKeyDown}
              className="grid grid-cols-2 gap-1 rounded-control bg-surface p-1"
            >
              {TABS.map((entry) => {
                const selected = tab === entry.id;
                return (
                  <button
                    key={entry.id}
                    type="button"
                    role="tab"
                    id={entry.tabId}
                    aria-selected={selected}
                    aria-controls={entry.panelId}
                    tabIndex={selected ? 0 : -1}
                    data-finder-focus={focusTarget === entry.tabId ? "true" : undefined}
                    onClick={() => setTab(entry.id)}
                    className={`h-11 rounded-lg px-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                      selected
                        ? "bg-white font-semibold text-ink shadow-xs"
                        : "font-medium text-muted hover:text-ink"
                    }`}
                  >
                    {entry.label}
                  </button>
                );
              })}
            </div>

            {/* Cascading selector */}
            <div
              role="tabpanel"
              id="finder-panel-car"
              aria-labelledby="finder-tab-car"
              hidden={tab !== "car"}
            >
              <form onSubmit={handleSubmit} noValidate>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <SelectField
                    id="finder-make"
                    label="Make"
                    value={make}
                    onChange={selectMake}
                    options={makeOptions}
                    placeholder="Select a make"
                    error={errors.make}
                  />
                  <SelectField
                    id="finder-model"
                    label="Model"
                    value={model}
                    onChange={selectModel}
                    options={modelOptions}
                    placeholder={make ? "Select a model" : "Select a make first"}
                    disabled={!make}
                    error={errors.model}
                  />
                  <SelectField
                    id="finder-year"
                    label="Year"
                    value={year}
                    onChange={selectYear}
                    options={yearOptions}
                    placeholder={model ? "Select a year" : "Select a model first"}
                    disabled={!model}
                    error={errors.year}
                  />
                  <SelectField
                    id="finder-engine"
                    label="Engine or trim"
                    value={engine}
                    onChange={selectEngine}
                    options={engineOptions}
                    placeholder={model ? "Select an engine (optional)" : "Select a model first"}
                    disabled={!model}
                    hint="Optional"
                  />
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "loading"}
                    className={status === "loading" ? "cursor-wait" : ""}
                  >
                    {status === "loading" && (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    )}
                    {status === "loading" ? "Finding parts…" : hero.selectorCta}
                    {status !== "loading" && (
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    )}
                  </Button>

                  <p className="max-w-[280px] text-sm leading-relaxed text-muted sm:text-right">
                    {hero.finderNote}
                  </p>
                </div>
              </form>
            </div>

            {/* VIN lookup */}
            <div
              role="tabpanel"
              id="finder-panel-vin"
              aria-labelledby="finder-tab-vin"
              hidden={tab !== "vin"}
            >
              <VinForm idPrefix="finder" onResolved={handleVinResolved} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
