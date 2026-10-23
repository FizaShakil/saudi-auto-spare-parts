/**
 * Demo catalogue data for AutoParts KSA.
 *
 * Everything in this file is MOCK DATA used for the client-facing preview.
 * It is intentionally kept apart from the UI so the client can swap in a real
 * vehicle database, product feed and fitment service later without touching
 * component code.
 *
 * Demo limitations (also documented in README.md):
 * - Vehicle catalogue: 10 makes with a representative model range, years
 *   2010-2025. Not exhaustive.
 * - VIN lookup: only the single demo VIN below resolves. No vehicle database
 *   is connected and no VIN decoding is performed.
 * - Fitment: `compatibility` flags are illustrative only.
 * - Prices: example SAR prices including an assumed 15% VAT.
 */

import type {
  Category,
  CompatibilityRule,
  Product,
  QualityTier,
  SelectedVehicle,
  VehicleMake,
} from "@/lib/types";

/* -------------------------------------------------------------------------- */
/* Quality tiers                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Demo positioning copy. These tiers describe price/quality positioning for
 * this storefront only — they are not statements about manufacturing quality
 * by country of origin.
 */
export const qualityTiers: QualityTier[] = [
  {
    id: "china",
    label: "China",
    position: "Economy",
    description:
      "An affordable replacement option that keeps routine maintenance costs down.",
    bestFor: "Budget-led repairs, service items and older vehicles.",
    pricePosition: "Lowest price",
    level: 1,
  },
  {
    id: "japan",
    label: "Japan",
    position: "Trusted",
    description:
      "A balanced option for drivers who want dependable everyday value.",
    bestFor: "Daily drivers and regular maintenance you rely on.",
    pricePosition: "Mid price",
    level: 2,
  },
  {
    id: "german",
    label: "German",
    position: "Premium",
    description:
      "A higher specification tier for customers who want an upgraded part.",
    bestFor: "Longer ownership, performance-minded and premium vehicles.",
    pricePosition: "Highest price",
    level: 3,
  },
];

/* -------------------------------------------------------------------------- */
/* Vehicle catalogue                                                          */
/* -------------------------------------------------------------------------- */

/** Generates a descending year list (newest first) inside an inclusive range. */
const years = (from: number, to: number): number[] => {
  const list: number[] = [];
  for (let year = to; year >= from; year -= 1) list.push(year);
  return list;
};

const ALL_YEARS = years(2010, 2025);

/** Vehicle makes supported by the demo selector. */
export const vehicleMakes: VehicleMake[] = [
  {
    id: "toyota",
    name: "Toyota",
    models: [
      { name: "Corolla", years: ALL_YEARS, engines: ["1.6L", "1.8L", "2.0L"] },
      { name: "Camry", years: ALL_YEARS, engines: ["2.5L", "3.5L"] },
      {
        name: "Land Cruiser",
        years: ALL_YEARS,
        engines: ["4.0L V6", "4.6L V8", "5.7L V8"],
      },
      { name: "Hilux", years: ALL_YEARS, engines: ["2.4L Diesel", "2.7L", "4.0L V6"] },
      { name: "RAV4", years: ALL_YEARS, engines: ["2.0L", "2.5L"] },
    ],
  },
  {
    id: "honda",
    name: "Honda",
    models: [
      { name: "Civic", years: ALL_YEARS, engines: ["1.5T", "1.8L", "2.0L"] },
      { name: "Accord", years: ALL_YEARS, engines: ["1.5T", "2.0T"] },
      { name: "CR-V", years: ALL_YEARS, engines: ["1.5T", "2.4L"] },
      { name: "HR-V", years: years(2015, 2025), engines: ["1.5L", "1.8L"] },
    ],
  },
  {
    id: "hyundai",
    name: "Hyundai",
    models: [
      { name: "Elantra", years: ALL_YEARS, engines: ["1.6L", "2.0L"] },
      { name: "Tucson", years: ALL_YEARS, engines: ["2.0L", "2.4L", "1.6T"] },
      { name: "Sonata", years: years(2010, 2024), engines: ["2.0L", "2.4L", "1.6T"] },
      { name: "Santa Fe", years: ALL_YEARS, engines: ["2.4L", "2.0T", "3.5L V6"] },
    ],
  },
  {
    id: "nissan",
    name: "Nissan",
    models: [
      { name: "Altima", years: ALL_YEARS, engines: ["2.5L", "3.5L V6"] },
      { name: "Patrol", years: ALL_YEARS, engines: ["4.0L V6", "5.6L V8"] },
      { name: "Sunny", years: ALL_YEARS, engines: ["1.5L", "1.6L"] },
      { name: "X-Trail", years: ALL_YEARS, engines: ["2.0L", "2.5L", "1.3T"] },
    ],
  },
  {
    id: "kia",
    name: "Kia",
    models: [
      { name: "Sportage", years: ALL_YEARS, engines: ["2.0L", "2.4L", "1.6T"] },
      { name: "Seltos", years: years(2019, 2025), engines: ["1.5L", "1.6T"] },
      { name: "Pegas", years: years(2017, 2025), engines: ["1.4L"] },
      { name: "K5", years: years(2020, 2025), engines: ["1.6T", "2.4L"] },
    ],
  },
  {
    id: "ford",
    name: "Ford",
    models: [
      { name: "Explorer", years: ALL_YEARS, engines: ["2.3L EcoBoost", "3.5L V6"] },
      { name: "F-150", years: ALL_YEARS, engines: ["2.7L EcoBoost", "3.5L V6", "5.0L V8"] },
      { name: "Escape", years: ALL_YEARS, engines: ["1.5L EcoBoost", "2.0L EcoBoost"] },
    ],
  },
  {
    id: "chevrolet",
    name: "Chevrolet",
    models: [
      { name: "Tahoe", years: ALL_YEARS, engines: ["5.3L V8", "6.2L V8"] },
      { name: "Silverado", years: ALL_YEARS, engines: ["5.3L V8", "6.2L V8"] },
      { name: "Captiva", years: years(2010, 2023), engines: ["2.4L", "3.2L V6"] },
      { name: "Trailblazer", years: years(2020, 2025), engines: ["1.2L Turbo", "1.3L Turbo"] },
    ],
  },
  {
    id: "volkswagen",
    name: "Volkswagen",
    models: [
      { name: "Passat", years: years(2010, 2024), engines: ["1.4 TSI", "2.0 TSI"] },
      { name: "Tiguan", years: ALL_YEARS, engines: ["1.4 TSI", "2.0 TSI"] },
      { name: "Golf", years: years(2010, 2024), engines: ["1.4 TSI", "2.0 TDI"] },
      { name: "Jetta", years: ALL_YEARS, engines: ["1.4 TSI", "2.0 TDI"] },
    ],
  },
  {
    id: "mercedes-benz",
    name: "Mercedes-Benz",
    models: [
      { name: "C-Class", years: ALL_YEARS, engines: ["200", "300", "AMG C 43"] },
      { name: "E-Class", years: ALL_YEARS, engines: ["200", "350", "AMG E 53"] },
      { name: "GLE", years: years(2015, 2025), engines: ["350", "450", "AMG 63"] },
      { name: "S-Class", years: ALL_YEARS, engines: ["S 500", "S 580"] },
    ],
  },
  {
    id: "bmw",
    name: "BMW",
    models: [
      { name: "3 Series", years: ALL_YEARS, engines: ["320i", "330i", "M340i"] },
      { name: "5 Series", years: ALL_YEARS, engines: ["520i", "530i", "M550i"] },
      { name: "X3", years: ALL_YEARS, engines: ["sDrive20i", "xDrive30i"] },
      { name: "X5", years: ALL_YEARS, engines: ["xDrive40i", "xDrive50i"] },
    ],
  },
];

/** Makes offered as one-click shortcuts in the "Popular Makes" section. */
export const popularMakes: string[] = vehicleMakes.map((make) => make.name);

/* -------------------------------------------------------------------------- */
/* Demo VIN mapping                                                           */
/* -------------------------------------------------------------------------- */

/**
 * The single VIN that resolves in this demo.
 *
 * DEMO LIMITATION: no VIN decoding happens. The lookup below is a hard-coded
 * match so the flow can be demonstrated end to end. Any other structurally
 * valid VIN returns a "not found" message that points back to the selector.
 */
export const DEMO_VIN = "2HGFC2F59LH500001";

export const demoVinMapping: Record<string, SelectedVehicle> = {
  [DEMO_VIN]: {
    make: "Honda",
    model: "Civic",
    year: 2020,
    engine: "1.5T",
    source: "vin",
  },
};

/* -------------------------------------------------------------------------- */
/* Categories                                                                 */
/* -------------------------------------------------------------------------- */

/** The eight top-level categories used by the category grid and filters. */
export const categories: Category[] = [
  {
    id: "engine-oil",
    name: "Engine Oil",
    blurb: "Fully synthetic, semi synthetic and mineral",
  },
  {
    id: "gear-oil",
    name: "Gear Oil",
    blurb: "ATF, manual gear and differential fluids",
  },
  {
    id: "brake-pads",
    name: "Brake Pads",
    blurb: "Front and rear axle sets",
  },
  {
    id: "filters",
    name: "Filters",
    blurb: "Oil, air, cabin and fuel filters",
  },
  {
    id: "suspension",
    name: "Suspension",
    blurb: "Shocks, struts and mounting kits",
  },
  {
    id: "engine-parts",
    name: "Engine Parts",
    blurb: "Ignition, timing and sealing components",
  },
  {
    id: "body-exterior",
    name: "Body & Exterior",
    blurb: "Mirrors, bumpers and lighting housings",
  },
  {
    id: "electrical-lighting",
    name: "Electrical & Lighting",
    blurb: "Batteries, bulbs and alternators",
  },
];

/* -------------------------------------------------------------------------- */
/* Products                                                                   */
/* -------------------------------------------------------------------------- */

const fits = (make: string, models: string[] | "all" = "all"): CompatibilityRule => ({
  make,
  models,
});

/** Eight demonstration products with per-tier pricing in SAR. */
export const products: Product[] = [
  {
    id: "engine-oil-hx8",
    name: "Fully Synthetic Engine Oil 5W-30 — 4L",
    partNumber: "AE-5W30-4L",
    categoryId: "engine-oil",
    artwork: "engine-oil",
    blurb: "API SP / ILSAC GF-6A",
    prices: { china: 68, japan: 96, german: 134 },
    compatibility: [
      fits("Toyota"),
      fits("Honda"),
      fits("Hyundai"),
      fits("Nissan"),
      fits("Kia"),
      fits("Ford"),
      fits("Chevrolet"),
      fits("Volkswagen"),
      fits("Mercedes-Benz"),
      fits("BMW"),
    ],
  },
  {
    id: "gear-oil-atf4",
    name: "Multi-Vehicle Automatic Transmission Fluid — 1L",
    partNumber: "GO-ATF4-1L",
    categoryId: "gear-oil",
    artwork: "gear-oil",
    blurb: "Meets Dexron VI / Mercon LV",
    prices: { china: 42, japan: 61, german: 84 },
    compatibility: [
      fits("Toyota", ["Corolla", "Camry", "RAV4", "Hilux"]),
      fits("Honda", ["Civic", "Accord", "CR-V"]),
      fits("Hyundai"),
      fits("Kia"),
      fits("Chevrolet", ["Captiva", "Tahoe", "Silverado"]),
    ],
  },
  {
    id: "brake-pads-ceramic",
    name: "Front Ceramic Brake Pad Set",
    partNumber: "BP-CER-F-14",
    categoryId: "brake-pads",
    artwork: "brake-pads",
    blurb: "Low dust, includes wear sensor",
    prices: { china: 129, japan: 192, german: 268 },
    compatibility: [
      fits("Toyota", ["Corolla", "Camry", "RAV4"]),
      fits("Honda", ["Civic", "Accord", "CR-V"]),
      fits("Nissan", ["Altima", "X-Trail", "Sunny"]),
      fits("Hyundai", ["Elantra", "Tucson"]),
      fits("BMW", ["3 Series", "5 Series"]),
    ],
  },
  {
    id: "oil-filter-spin",
    name: "Spin-On Oil Filter",
    partNumber: "OF-SPN-112",
    categoryId: "filters",
    artwork: "oil-filter",
    blurb: "Anti-drain back valve",
    prices: { china: 18, japan: 31, german: 46 },
    compatibility: [
      fits("Toyota"),
      fits("Honda"),
      fits("Nissan"),
      fits("Hyundai"),
      fits("Kia"),
      fits("Ford"),
      fits("Chevrolet"),
    ],
  },
  {
    id: "air-filter-panel",
    name: "Panel Air Filter",
    partNumber: "AF-PNL-207",
    categoryId: "filters",
    artwork: "air-filter",
    blurb: "High-flow pleated media",
    prices: { china: 24, japan: 39, german: 57 },
    compatibility: [
      fits("Toyota"),
      fits("Honda"),
      fits("Volkswagen"),
      fits("Mercedes-Benz"),
      fits("BMW"),
      fits("Ford"),
    ],
  },
  {
    id: "spark-plugs-iridium",
    name: "Iridium Spark Plugs — Set of 4",
    partNumber: "SP-IRD-4",
    categoryId: "engine-parts",
    artwork: "spark-plugs",
    blurb: "Pre-gapped, 100,000 km service",
    prices: { china: 66, japan: 102, german: 152 },
    compatibility: [
      fits("Toyota"),
      fits("Honda"),
      fits("Hyundai"),
      fits("Kia"),
      fits("Nissan", ["Sunny", "Altima", "X-Trail"]),
      fits("Volkswagen"),
    ],
  },
  {
    id: "shock-absorber-front",
    name: "Front Gas Shock Absorber",
    partNumber: "SA-GAS-331",
    categoryId: "suspension",
    artwork: "shock",
    blurb: "Twin-tube, sold individually",
    prices: { china: 178, japan: 249, german: 336 },
    compatibility: [
      fits("Toyota", ["Corolla", "Hilux", "RAV4"]),
      fits("Nissan", ["Patrol", "X-Trail"]),
      fits("Ford", ["Explorer", "Escape"]),
      fits("Chevrolet", ["Tahoe", "Captiva"]),
    ],
  },
  {
    id: "battery-mf-70",
    name: "Maintenance-Free Battery 70Ah 640A",
    partNumber: "BT-MF-70",
    categoryId: "electrical-lighting",
    artwork: "battery",
    blurb: "24-month replacement warranty*",
    prices: { china: 292, japan: 384, german: 468 },
    compatibility: [
      fits("Toyota", ["Camry", "Corolla", "Land Cruiser"]),
      fits("Nissan", ["Patrol", "Altima"]),
      fits("Chevrolet", ["Tahoe", "Silverado"]),
      fits("Mercedes-Benz"),
      fits("BMW"),
      fits("Kia"),
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Compatibility helpers                                                      */
/* -------------------------------------------------------------------------- */

/** Returns `true` when the product's demo fitment rules include the vehicle. */
export function isCompatible(product: Product, vehicle: SelectedVehicle): boolean {
  return product.compatibility.some((rule) => {
    if (rule.make !== vehicle.make) return false;
    if (rule.models === "all") return true;
    return rule.models.includes(vehicle.model);
  });
}

/** Counts how many demo products are marked compatible with a vehicle. */
export function compatibleProductCount(vehicle: SelectedVehicle): number {
  return products.filter((product) => isCompatible(product, vehicle)).length;
}
