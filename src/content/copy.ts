/**
 * Marketing copy, section text and policy answers for the landing page.
 *
 * Everything the client is likely to edit before launch lives here.
 * Policy answers that still need business confirmation are clearly marked as
 * placeholders — replace them rather than shipping the preview wording.
 */

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

export const hero = {
  title: "Find the Right Parts for Your Car",
  description:
    "Identify your vehicle once, compare Economy, Trusted and Premium quality options, and see the parts that fit — before you spend a riyal.",
  /** Small print under the vehicle finder. */
  finderNote:
    "No account needed. Your selected car is saved on this device so results stay relevant.",
  tabs: { selector: "Choose Your Car", vin: "Search by VIN" },
  selectorCta: "Find Compatible Parts",
  vinCta: "Find by VIN",
  successTitle: "Vehicle saved to My Garage",
  changeVehicle: "Change vehicle",
  clearVehicle: "Remove vehicle",
  viewParts: "View compatible parts",
  /** Error shown when the cascading selector is incomplete. */
  selectorError: "Select a make, model and year to continue.",
} as const;

/* -------------------------------------------------------------------------- */
/* Trust strip                                                                */
/* -------------------------------------------------------------------------- */

export const trustItems = [
  { id: "fitment", icon: "car", label: "Parts matched to your vehicle" },
  { id: "compare", icon: "sliders", label: "Compare three quality tiers" },
  { id: "payment", icon: "shield", label: "Secure online payment" },
  { id: "delivery", icon: "truck", label: "Delivery across Saudi Arabia" },
  { id: "returns", icon: "rotate", label: "Clear return information" },
] as const;

/* -------------------------------------------------------------------------- */
/* Categories                                                                 */
/* -------------------------------------------------------------------------- */

export const categoriesSection = {
  title: "Shop by category",
  description:
    "Start from the part you need. Every category filters the demo catalogue below, so you can compare tiers straight away.",
  browseAll: "Browse all parts",
} as const;

/* -------------------------------------------------------------------------- */
/* Quality tiers                                                              */
/* -------------------------------------------------------------------------- */

export const qualitySection = {
  title: "Three quality options, one part number",
  description:
    "Most parts in our catalogue are stocked in three tiers. The tier you pick sets the price — nothing else about the listing changes.",
  bestForLabel: "Best for",
  closing: "Same part. Your choice of quality and budget.",
  note:
    "Tier names describe this store's price and positioning only. They are not a statement about manufacturing quality for an entire country.",
} as const;

/* -------------------------------------------------------------------------- */
/* How it works                                                               */
/* -------------------------------------------------------------------------- */

export const processSection = {
  title: "How it works",
  description: "Three steps from an unidentified car to an order you trust.",
  steps: [
    {
      number: "1",
      title: "Identify your car",
      description:
        "Pick make, model, year and engine — or enter your 17-character VIN.",
    },
    {
      number: "2",
      title: "Find compatible parts",
      description:
        "Browse the catalogue with a clear fitment status on every product.",
    },
    {
      number: "3",
      title: "Choose your quality and order",
      description:
        "Switch between China, Japan and German to see the price change instantly.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Featured parts                                                             */
/* -------------------------------------------------------------------------- */

export const featuredSection = {
  title: "Featured parts",
  description:
    "A demonstration catalogue with realistic part numbers and example prices. Compatibility status updates as soon as you select a vehicle.",
  allCategories: "All parts",
  noVehicleTitle: "Select your car to check fit",
  noVehicleDescription:
    "Fitment status appears on every product once a vehicle is saved in My Garage.",
  chooseCar: "Choose your car",
  changeVehicle: "Change vehicle",
  resultsLabel: (shown: number, total: number) =>
    `Showing ${shown} of ${total} parts`,
  emptyTitle: "No parts in this category yet",
  emptyDescription:
    "This category has no products in the demo catalogue. Clear the filter to see everything we have listed.",
  emptySearchTitle: (query: string) => `No parts match “${query}”`,
  clearFilters: "Show all parts",
  fits: "Fits your car",
  fitUnknown: "Fit not confirmed",
  noVehicle: "Select your car to check fit",
  addToCart: "Add to Cart",
  added: "Added",
  vatNote: "Price incl. 15% VAT",
} as const;

/* -------------------------------------------------------------------------- */
/* VIN education                                                              */
/* -------------------------------------------------------------------------- */

export const vinSection = {
  title: "What is a VIN and why does it help?",
  description:
    "A VIN is the 17-character identifier stamped on your vehicle. It pinpoints the exact build of your car, so the parts you start browsing are far more likely to be the right ones.",
  locations: ["Windshield", "Vehicle registration card", "Driver-side door jamb"],
  benefits: [
    "More accurate vehicle identification",
    "Less uncertainty when choosing parts",
    "An easier starting point for finding compatible products",
  ],
  panelTitle: "Look up a VIN",
  fallbackNote:
    "Cannot find or read your VIN? Use the vehicle selector instead — every make from Toyota to BMW is listed there.",
  useSelector: "Open the vehicle selector",
} as const;

/* -------------------------------------------------------------------------- */
/* Popular makes                                                              */
/* -------------------------------------------------------------------------- */

export const makesSection = {
  title: "Popular makes",
  description: "Jump straight into the selector with your make preselected.",
} as const;

/* -------------------------------------------------------------------------- */
/* Payment and delivery                                                       */
/* -------------------------------------------------------------------------- */

export const paymentSection = {
  title: "Payment and delivery",
  paymentHeading: "Ways to pay",
  paymentNote:
    "Payment methods shown are placeholders for this demo and are not connected to a live payment provider.",
  deliveryHeading: "Delivery partners",
  deliveryNote:
    "Delivery partners shown are placeholders pending commercial confirmation.",
  facts: [
    {
      id: "currency",
      text: "All prices are displayed in Saudi Riyal (SAR).",
    },
    {
      id: "vat",
      text: "Displayed prices include 15% VAT, subject to final business confirmation.",
    },
    {
      id: "invoice",
      text: "A VAT invoice is provided where applicable.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */

export const faqSection = {
  title: "Frequently asked questions",
  description: "Straight answers about fitment, quality tiers, delivery and payment.",
  /** Single-open accordion behaviour. */
  items: [
    {
      id: "fits",
      question: "How do I know a part fits my car?",
      answer:
        "Identify your vehicle first — either with the selector or your VIN. Each product then shows a status: “Fits your car” for parts our demo catalogue marks compatible, or “Fit not confirmed” where we cannot verify it. Fitment data in this preview is illustrative and will be replaced by the client's verified fitment source.",
    },
    {
      id: "vin-location",
      question: "Where do I find my VIN?",
      answer:
        "The 17-character VIN is normally visible at the base of the windshield on the driver's side, printed on the vehicle registration card, and on a label inside the driver's door jamb.",
    },
    {
      id: "tiers",
      question: "What is the difference between China, Japan and German quality?",
      answer:
        "They are this store's three price and positioning tiers for the same part number: Economy, Trusted and Premium. Selecting a tier changes the price on the listing. The names describe positioning only — they are not a claim about manufacturing quality for an entire country.",
    },
    {
      id: "delivery-time",
      question: "How long does delivery take?",
      answer:
        "PLACEHOLDER — delivery timeframes are not confirmed yet. This demo does not state a delivery window. Replace this answer with the business's confirmed lead times and coverage before launch.",
    },
    {
      id: "returns",
      question: "What is your return policy?",
      answer:
        "PLACEHOLDER — the returns policy is being finalised. This preview deliberately avoids quoting return periods or conditions. Publish the confirmed policy here before launch.",
    },
    {
      id: "payments",
      question: "Which payment methods do you accept?",
      answer:
        "PLACEHOLDER — Mada, Apple Pay, STC Pay, Visa, Mastercard, Tabby and Tamara are listed as intended methods. None of them are integrated in this demo; confirm the final list with the business.",
    },
    {
      id: "vat-invoice",
      question: "Will I receive a VAT invoice?",
      answer:
        "Displayed prices include 15% VAT and a VAT invoice is issued where applicable. The VAT registration number is still to be confirmed and has deliberately been left as a placeholder.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Final CTA                                                                  */
/* -------------------------------------------------------------------------- */

export const ctaSection = {
  title: "Ready to Find the Right Parts?",
  description:
    "Tell us what you drive and we will narrow the catalogue down to the parts that suit it — then you decide the quality tier.",
  action: "Find Your Parts",
} as const;

/* -------------------------------------------------------------------------- */
/* Cart                                                                       */
/* -------------------------------------------------------------------------- */

export const cartCopy = {
  title: "Your cart",
  emptyTitle: "Your cart is empty",
  emptyDescription: "Add a part from the catalogue to see it here.",
  browse: "Browse parts",
  subtotal: "Subtotal",
  vatIncluded: "Includes 15% VAT",
  checkout: "Continue to checkout",
  checkoutNotice:
    "Checkout is not connected in this demo preview — no order will be placed.",
  remove: "Remove line",
  decrease: "Decrease quantity",
  increase: "Increase quantity",
} as const;

/* -------------------------------------------------------------------------- */
/* Shared / demo notices                                                      */
/* -------------------------------------------------------------------------- */

export const demoNotices = {
  placeholderLink: "This link is a placeholder in the demo.",
  account:
    "Account sign-in is not part of this demo — no personal data is collected.",
  vehicleRemoved: "Vehicle removed from My Garage.",
  vehicleSaved: (label: string) => `Vehicle saved: ${label}`,
} as const;
