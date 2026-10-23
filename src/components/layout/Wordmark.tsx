/**
 * Text-based wordmark for AutoParts KSA.
 *
 * Single component so the client can swap in a final logo file in one place.
 * Two tones are supported: on light surfaces (header) and on the dark green
 * footer.
 */

import { brand } from "@/content/site";

interface WordmarkProps {
  tone?: "dark" | "light";
  className?: string;
  /** Slightly larger treatment used in the footer. */
  size?: "md" | "lg";
}

export function Wordmark({
  tone = "dark",
  className = "",
  size = "md",
}: WordmarkProps) {
  const isLight = tone === "light";
  const markHole = isLight ? "#004D26" : "#FFFFFF";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className={size === "lg" ? "h-9 w-9" : "h-8 w-8"}
        fill="none"
      >
        {/* Hex nut silhouette — a simple, replaceable brand mark */}
        <path
          d="M16 2.6 27.4 9.3v13.4L16 29.4 4.6 22.7V9.3z"
          fill={isLight ? "#FFFFFF" : "#006C35"}
        />
        <circle cx="16" cy="16" r="5" fill={markHole} />
      </svg>

      <span
        className={`font-bold tracking-tight ${
          size === "lg" ? "text-2xl" : "text-xl"
        } ${isLight ? "text-white" : "text-ink"}`}
      >
        {brand.wordmark.primary}
      </span>
      <span
        className={`-ml-1.5 font-semibold tracking-wide ${
          size === "lg" ? "text-2xl" : "text-xl"
        } ${isLight ? "text-brand-light" : "text-brand"}`}
      >
        {brand.wordmark.suffix}
      </span>
    </span>
  );
}
