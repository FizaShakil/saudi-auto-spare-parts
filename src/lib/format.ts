import type { SelectedVehicle, Vehicle } from "@/lib/types";

/** Single source of truth for formatting money in Saudi Riyal. */
const sarFormatter = new Intl.NumberFormat("en-SA", {
  style: "currency",
  currency: "SAR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Formats a number as e.g. "SAR 129.00". */
export function formatSAR(amount: number): string {
  return sarFormatter.format(amount);
}

/** Compact garage label, e.g. "Toyota Corolla 2022". */
export function formatVehicleLabel(vehicle: Vehicle): string {
  return `${vehicle.make} ${vehicle.model} ${vehicle.year}`;
}

/** Detailed label including the engine/trim when one is known. */
export function formatVehicleDetail(vehicle: Vehicle): string {
  const base = formatVehicleLabel(vehicle);
  return vehicle.engine ? `${base} · ${vehicle.engine}` : base;
}

/** Source badge used in the garage panel and success message. */
export function formatVehicleSource(vehicle: SelectedVehicle): string {
  return vehicle.source === "vin" ? "Found by VIN" : "Chosen in selector";
}
