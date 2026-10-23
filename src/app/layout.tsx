import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ToastHost } from "@/components/ui/ToastHost";
import { StoreProvider } from "@/lib/store";

import "./globals.css";

/**
 * Plus Jakarta Sans is loaded through next/font so it is self-hosted and
 * render-blocking free. The CSS variable feeds the `--font-sans` design token.
 */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AutoParts KSA — Spare Parts for Your Car in Saudi Arabia",
    template: "%s | AutoParts KSA",
  },
  description:
    "Find compatible spare parts for your car. Identify your vehicle by make, model and year or by VIN, compare China, Japan and German quality tiers, and order with clear SAR pricing.",
  keywords: [
    "auto spare parts Saudi Arabia",
    "car parts online",
    "vehicle parts finder",
    "VIN lookup",
    "engine oil brake pads filters",
  ],
  openGraph: {
    type: "website",
    locale: "en_SA",
    siteName: "AutoParts KSA",
    title: "AutoParts KSA — Find the Right Parts for Your Car",
    description:
      "Identify your vehicle, compare three quality tiers and browse parts that fit — with transparent SAR pricing.",
  },
  twitter: {
    card: "summary",
    title: "AutoParts KSA — Find the Right Parts for Your Car",
    description:
      "Identify your vehicle, compare quality tiers and browse compatible parts.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#006C35",
};

/**
 * Store-level structured data. Only fields that are safe to assert are
 * included — no address, ratings, price range or registration numbers.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoPartsStore",
  name: "AutoParts KSA",
  description:
    "Online automotive spare parts store for car owners and workshops in Saudi Arabia.",
  inLanguage: "en",
  areaServed: "SA",
  currenciesAccepted: "SAR",
  paymentAccepted:
    "Mada, Apple Pay, STC Pay, Visa, Mastercard, Tabby, Tamara",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />

        <StoreProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
          >
            Skip to content
          </a>

          <SiteHeader />

          <main id="main" className="flex-1">
            {children}
          </main>

          <SiteFooter />
          <WhatsAppButton />
          <ToastHost />
        </StoreProvider>
      </body>
    </html>
  );
}
