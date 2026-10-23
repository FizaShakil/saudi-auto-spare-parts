/**
 * Neutral, part-specific vector artwork for the product grid.
 *
 * Real product photography is not available for this demo, so each SKU gets a
 * purpose-drawn illustration instead of a generic stock image. The container
 * background is `surface` (#F7F9F7), which the artwork uses for cut-outs.
 */

import type { ArtworkKind } from "@/lib/types";

const ACCESSIBLE_LABELS: Record<ArtworkKind, string> = {
  "engine-oil": "Illustration of an engine oil container",
  "gear-oil": "Illustration of a transmission fluid bottle",
  "brake-pads": "Illustration of a pair of brake pads",
  "oil-filter": "Illustration of a spin-on oil filter",
  "air-filter": "Illustration of a panel air filter",
  "spark-plugs": "Illustration of two spark plugs",
  shock: "Illustration of a gas shock absorber",
  battery: "Illustration of a car battery",
};

interface ProductArtworkProps {
  kind: ArtworkKind;
  className?: string;
}

export function ProductArtwork({ kind, className = "" }: ProductArtworkProps) {
  return (
    <svg
      viewBox="0 0 160 120"
      role="img"
      aria-label={ACCESSIBLE_LABELS[kind]}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {renderArtwork(kind)}
    </svg>
  );
}

function renderArtwork(kind: ArtworkKind) {
  switch (kind) {
    /* -------------------------------------------------------------------- */
    case "engine-oil":
      return (
        <g>
          <rect x="92" y="18" width="24" height="24" rx="5" fill="#FFFFFF" stroke="#C9D3CB" strokeWidth="2" />
          <rect x="89" y="8" width="30" height="14" rx="4" fill="#004D26" />
          <rect x="44" y="36" width="72" height="76" rx="12" fill="#FFFFFF" stroke="#C9D3CB" strokeWidth="2" />
          <path d="M56 48h16a13 13 0 0 1 0 26H56z" fill="#F7F9F7" />
          <rect x="52" y="76" width="56" height="30" rx="6" fill="#006C35" />
          <rect x="60" y="85" width="34" height="5" rx="2.5" fill="#FFFFFF" fillOpacity="0.92" />
          <rect x="60" y="94" width="22" height="5" rx="2.5" fill="#E8F5EC" fillOpacity="0.85" />
        </g>
      );

    /* -------------------------------------------------------------------- */
    case "gear-oil":
      return (
        <g>
          <rect x="76" y="8" width="8" height="20" rx="3" fill="#0F1A14" />
          <rect x="70" y="24" width="20" height="10" rx="3" fill="#0F1A14" />
          <rect x="72" y="32" width="16" height="20" fill="#004D26" />
          <rect x="52" y="48" width="56" height="64" rx="9" fill="#006C35" />
          <rect x="60" y="66" width="40" height="28" rx="5" fill="#FFFFFF" />
          <rect x="67" y="75" width="26" height="5" rx="2.5" fill="#006C35" />
          <rect x="67" y="84" width="16" height="4" rx="2" fill="#E3EAE5" />
        </g>
      );

    /* -------------------------------------------------------------------- */
    case "brake-pads":
      return (
        <g>
          <g transform="translate(16 30) rotate(-7 27 27)">
            <BrakePad />
          </g>
          <g transform="translate(84 38) rotate(7 27 27)">
            <BrakePad />
          </g>
        </g>
      );

    /* -------------------------------------------------------------------- */
    case "oil-filter":
      return (
        <g>
          <rect x="52" y="34" width="56" height="74" rx="6" fill="#006C35" />
          <rect x="52" y="58" width="56" height="24" fill="#FFFFFF" />
          <rect x="60" y="65" width="34" height="5" rx="2.5" fill="#006C35" />
          <rect x="60" y="74" width="22" height="4" rx="2" fill="#E3EAE5" />
          <ellipse cx="80" cy="108" rx="28" ry="7" fill="#004D26" />
          <ellipse cx="80" cy="34" rx="28" ry="8" fill="#DDE4DE" stroke="#B9C4BC" strokeWidth="1.5" />
          <ellipse cx="80" cy="34" rx="13" ry="4" fill="#8C9A92" />
        </g>
      );

    /* -------------------------------------------------------------------- */
    case "air-filter":
      return (
        <g>
          <rect x="20" y="30" width="120" height="60" rx="7" fill="#FFFFFF" stroke="#C9D3CB" strokeWidth="3" />
          <rect x="30" y="40" width="100" height="40" fill="#F7F9F7" />
          <g fill="#E3EAE5">
            <rect x="33" y="42" width="6" height="36" rx="2" />
            <rect x="43" y="42" width="6" height="36" rx="2" fill="#D8E0DA" />
            <rect x="53" y="42" width="6" height="36" rx="2" />
            <rect x="63" y="42" width="6" height="36" rx="2" fill="#D8E0DA" />
            <rect x="73" y="42" width="6" height="36" rx="2" />
            <rect x="83" y="42" width="6" height="36" rx="2" fill="#D8E0DA" />
            <rect x="93" y="42" width="6" height="36" rx="2" />
            <rect x="103" y="42" width="6" height="36" rx="2" fill="#D8E0DA" />
            <rect x="113" y="42" width="6" height="36" rx="2" />
            <rect x="123" y="42" width="6" height="36" rx="2" fill="#D8E0DA" />
          </g>
          <rect x="28" y="35" width="104" height="6" rx="3" fill="#006C35" />
        </g>
      );

    /* -------------------------------------------------------------------- */
    case "spark-plugs":
      return (
        <g>
          <g transform="translate(44 8) rotate(-9) scale(0.85)">
            <SparkPlug />
          </g>
          <g transform="translate(112 10) rotate(9) scale(0.85)">
            <SparkPlug />
          </g>
        </g>
      );

    /* -------------------------------------------------------------------- */
    case "shock":
      return (
        <g>
          <circle cx="80" cy="18" r="11" fill="#5B6B62" />
          <circle cx="80" cy="18" r="4.5" fill="#F7F9F7" />
          <rect x="76" y="26" width="8" height="22" fill="#DDE4DE" stroke="#B9C4BC" strokeWidth="1.2" />
          <rect x="58" y="46" width="44" height="56" rx="9" fill="#006C35" />
          <rect x="58" y="66" width="44" height="16" fill="#FFFFFF" />
          <rect x="66" y="71" width="28" height="5" rx="2.5" fill="#006C35" />
          <circle cx="80" cy="104" r="11" fill="#5B6B62" />
          <circle cx="80" cy="104" r="4.5" fill="#F7F9F7" />
        </g>
      );

    /* -------------------------------------------------------------------- */
    case "battery":
      return (
        <g>
          <path d="M62 42v-8h36v8" stroke="#5B6B62" strokeWidth="5" strokeLinecap="round" fill="none" />
          <rect x="40" y="26" width="18" height="16" rx="3" fill="#DDE4DE" stroke="#B9C4BC" strokeWidth="1.4" />
          <rect x="102" y="26" width="18" height="16" rx="3" fill="#DDE4DE" stroke="#B9C4BC" strokeWidth="1.4" />
          <g fill="#0F1A14">
            <rect x="44" y="33" width="10" height="3" rx="1.5" />
            <rect x="47.5" y="29.5" width="3" height="10" rx="1.5" />
            <rect x="106" y="33" width="10" height="3" rx="1.5" />
          </g>
          <rect x="24" y="40" width="112" height="66" rx="9" fill="#0F1A14" />
          <rect x="24" y="40" width="112" height="16" rx="8" fill="#5B6B62" />
          <rect x="38" y="62" width="84" height="28" rx="5" fill="#FFFFFF" />
          <rect x="46" y="69" width="34" height="6" rx="3" fill="#006C35" />
          <rect x="46" y="80" width="52" height="5" rx="2.5" fill="#E3EAE5" />
        </g>
      );
  }
}

/** Reusable spark plug so the pair stays visually identical. */
function SparkPlug() {
  return (
    <g transform="translate(-14 0)">
      <rect x="14" y="0" width="28" height="14" rx="3" fill="#B9C4BC" />
      <rect x="17" y="14" width="22" height="54" rx="6" fill="#FFFFFF" stroke="#DDE4DE" strokeWidth="1.5" />
      <g fill="#F7F9F7" stroke="#E3EAE5" strokeWidth="1.2">
        <rect x="12" y="22" width="32" height="6" rx="3" />
        <rect x="12" y="34" width="32" height="6" rx="3" />
        <rect x="12" y="46" width="32" height="6" rx="3" />
      </g>
      <rect x="13" y="66" width="30" height="6" rx="2" fill="#006C35" />
      <rect x="10" y="72" width="36" height="18" rx="4" fill="#8C9A92" />
      <rect x="16" y="90" width="24" height="26" fill="#B9C4BC" />
      <g stroke="#8C9A92" strokeWidth="1.5">
        <line x1="16" y1="96" x2="40" y2="96" />
        <line x1="16" y1="102" x2="40" y2="102" />
        <line x1="16" y1="108" x2="40" y2="108" />
      </g>
      <rect x="12" y="104" width="10" height="10" rx="2" fill="#5B6B62" />
    </g>
  );
}

/** Reusable brake pad: friction block on top of a steel backing plate. */
function BrakePad() {
  return (
    <g>
      <rect x="0" y="0" width="54" height="30" rx="7" fill="#DDE4DE" stroke="#B9C4BC" strokeWidth="2" />
      <rect x="-2" y="28" width="58" height="26" rx="6" fill="#5B6B62" />
      <rect x="52" y="32" width="12" height="8" rx="3" fill="#5B6B62" />
      <circle cx="14" cy="41" r="5" fill="#006C35" />
    </g>
  );
}
