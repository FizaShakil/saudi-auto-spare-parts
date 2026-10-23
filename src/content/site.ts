/**
 * Business, brand and legal copy for AutoParts KSA.
 *
 * Everything here is editable without touching component code.
 * PLACEHOLDER fields are marked with a `placeholder: true` note in the
 * README — the client must confirm them before launch.
 */

export const brand = {
  /** Full wordmark as it should appear in page titles and the footer. */
  name: "AutoParts KSA",
  /** Split wordmark parts so the two-tone treatment stays in one place. */
  wordmark: { primary: "AutoParts", suffix: "KSA" },
  /** Short descriptor used under the logo and in the footer. */
  tagline: "Vehicle-first spare parts store",
  /** One sentence business description for the footer and structured data. */
  description:
    "An online spare parts store for car owners and workshops in Saudi Arabia — find parts by vehicle, compare quality tiers and order with clear pricing.",
} as const;

/**
 * Announcement bar copy.
 * Keep delivery claims generic until the business confirms specifics.
 */
export const announcement = {
  message: "Delivery across Saudi Arabia  ·  Secure online payments",
  dismissLabel: "Dismiss announcement",
} as const;

/** Primary navigation. Anchors map to section ids in `src/lib/navigation.ts`. */
export const navLinks = [
  { label: "Shop by Car", href: "#vehicle-finder" },
  { label: "Categories", href: "#categories" },
  { label: "Find by VIN", href: "#vin-lookup" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
] as const;

/**
 * Contact details — PLACEHOLDERS.
 * Replace with the confirmed business numbers and mailbox before launch.
 */
export const contact = {
  phone: "+966 00 000 0000",
  phoneHref: "tel:+966000000000",
  email: "sales@autopartksa.example",
  emailHref: "mailto:sales@autopartksa.example",
  /**
   * Placeholder WhatsApp number in international format without "+".
   * MUST be replaced with the client's real business number.
   * The floating button links to https://wa.me/<number>.
   */
  whatsapp: "966500000000",
  whatsappLabel: "+966 50 000 0000",
  placeholderNote: "Contact details are placeholders pending client confirmation.",
} as const;

/** Legal registrations — PLACEHOLDERS. Do not invent real numbers. */
export const legal = {
  commercialRegistration: "Commercial Registration: to be confirmed",
  vatRegistration: "VAT Registration: to be confirmed",
  copyright: `© ${new Date().getFullYear()} AutoParts KSA. All rights reserved.`,
} as const;

/** Social profiles — PLACEHOLDERS. Clicks show an honest demo notice. */
export const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "X", href: "#" },
  { label: "YouTube", href: "#" },
] as const;

/** Text-only payment badges — no licensed logos are used in this demo. */
export const paymentMethods = [
  "Mada",
  "Apple Pay",
  "STC Pay",
  "Visa",
  "Mastercard",
  "Tabby",
  "Tamara",
] as const;

/** Delivery partners — placeholders pending commercial confirmation. */
export const deliveryPartners = ["Aramex", "SMSA"] as const;

/** Footer link groups. `href: null` marks a placeholder destination. */
export const footerLinks = {
  shop: [
    { label: "Shop by Car", href: "#vehicle-finder" },
    { label: "All Categories", href: "#categories" },
    { label: "Featured Parts", href: "#featured-parts" },
    { label: "Quality Comparison", href: "#quality-tiers" },
    { label: "Find by VIN", href: "#vin-lookup" },
  ],
  help: [
    { label: "FAQ", href: "#faq" },
    { label: "Where to find my VIN", href: "#vin-lookup" },
    { label: "Payment & Delivery", href: "#payment" },
    { label: "How It Works", href: "#how-it-works" },
  ],
  company: [
    { label: "About Us", href: null },
    { label: "Wholesale & Workshops", href: null },
    { label: "Careers", href: null },
    { label: "Contact", href: "#contact" },
  ],
} as const;
