/**
 * Domain model for the AutoParts KSA demo.
 *
 * These types describe the shape of the vehicle catalogue, the product
 * catalogue, pricing tiers and the client-side cart. All data referenced by
 * them lives in `src/data/mock.ts`.
 */

/** The three quality tiers a customer can choose from for every product. */
export type QualityTierId = "china" | "japan" | "german";

/** Static, content-driven definition of a quality tier. */
export interface QualityTier {
  id: QualityTierId;
  /** Short label used on segmented controls, e.g. "China". */
  label: string;
  /** Positioning word, e.g. "Economy". */
  position: string;
  /** Plain-English description of the tier. */
  description: string;
  /** Who this tier is best suited for. */
  bestFor: string;
  /** Relative price wording shown under the tier meter. */
  pricePosition: string;
  /** Meter level from 1 (lowest) to 3 (highest). */
  level: 1 | 2 | 3;
}

/** A single model line belonging to a vehicle make. */
export interface VehicleModel {
  name: string;
  /** Ascending list of model years offered for this model. */
  years: number[];
  /** Optional engine / trim options. Empty list means the field is optional. */
  engines: string[];
}

/** A manufacturer with its model range. */
export interface VehicleMake {
  id: string;
  name: string;
  models: VehicleModel[];
}

/** The four values collected by the "Choose Your Car" selector. */
export interface Vehicle {
  make: string;
  model: string;
  year: number;
  engine?: string;
}

/** How the current vehicle was identified. */
export type VehicleSource = "selector" | "vin";

/** The vehicle currently stored in the customer's garage. */
export interface SelectedVehicle extends Vehicle {
  source: VehicleSource;
}

/** Product category shown in the "Shop by Category" grid. */
export interface Category {
  id: string;
  name: string;
  /** One-line descriptor used on the category card. */
  blurb: string;
}

/** Illustration key used by `<ProductArtwork />`. */
export type ArtworkKind =
  | "engine-oil"
  | "gear-oil"
  | "brake-pads"
  | "oil-filter"
  | "air-filter"
  | "spark-plugs"
  | "shock"
  | "battery";

/** Compatibility rule for a product against the vehicle catalogue. */
export interface CompatibilityRule {
  make: string;
  /** `'all'` matches every model of the make, otherwise a model whitelist. */
  models: string[] | "all";
}

/** A single SKU with per-tier pricing. */
export interface Product {
  id: string;
  name: string;
  partNumber: string;
  categoryId: string;
  artwork: ArtworkKind;
  /** Short merchandising line shown under the product name. */
  blurb: string;
  /** Prices in SAR, one per quality tier. */
  prices: Record<QualityTierId, number>;
  /**
   * Demo fitment data. Nothing here has been verified against a real
   * fitment database — see the README for the demo limitations.
   */
  compatibility: CompatibilityRule[];
}

/** A line item inside the demo cart. Different qualities are separate lines. */
export interface CartLine {
  /** Stable key: `${productId}:${quality}`. */
  key: string;
  productId: string;
  name: string;
  partNumber: string;
  quality: QualityTierId;
  unitPrice: number;
  quantity: number;
}

/** Transient feedback message surfaced through the toast region. */
export interface ToastMessage {
  id: number;
  message: string;
  tone: "default" | "success";
}
