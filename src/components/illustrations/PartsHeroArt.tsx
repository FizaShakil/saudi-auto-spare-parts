/**
 * Hero illustration — a parts-catalogue composition of the four components
 * customers shop for most: brake disc, engine oil, oil filter and spark plug.
 *
 * Custom vector artwork in the brand palette. No stock photography and no
 * third-party automotive marks are used anywhere in this demo.
 */

export function PartsHeroArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 480"
      role="img"
      aria-label="Illustration of a brake disc, an engine oil container, an oil filter and a spark plug"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Technical guide rings — engineering-drawing feel, kept very light */}
      <circle
        cx="280"
        cy="240"
        r="205"
        stroke="#006C35"
        strokeOpacity="0.16"
        strokeWidth="1.5"
        strokeDasharray="5 7"
      />
      <circle
        cx="280"
        cy="240"
        r="168"
        stroke="#006C35"
        strokeOpacity="0.12"
        strokeWidth="1.5"
      />

      {/* Grounding shadows */}
      <g fill="#006C35" fillOpacity="0.07">
        <ellipse cx="190" cy="344" rx="118" ry="14" />
        <ellipse cx="410" cy="300" rx="62" ry="10" />
        <ellipse cx="115" cy="468" rx="54" ry="9" />
      </g>

      {/* ---------------------------------------------------------------- */}
      {/* Brake disc                                                        */}
      {/* ---------------------------------------------------------------- */}
      <g>
        <circle cx="190" cy="215" r="118" fill="#DDE4DE" />
        <circle cx="190" cy="215" r="118" fill="none" stroke="#B9C4BC" strokeWidth="3" />
        {/* Ventilation slots on the friction face */}
        <g fill="#FFFFFF" fillOpacity="0.9">
          <circle cx="190" cy="127" r="6" />
          <circle cx="252" cy="153" r="6" />
          <circle cx="278" cy="215" r="6" />
          <circle cx="252" cy="277" r="6" />
          <circle cx="190" cy="303" r="6" />
          <circle cx="128" cy="277" r="6" />
          <circle cx="102" cy="215" r="6" />
          <circle cx="128" cy="153" r="6" />
        </g>
        {/* Hat / hub */}
        <circle cx="190" cy="215" r="52" fill="#006C35" />
        <circle cx="190" cy="215" r="26" fill="#E8F5EC" />
        <circle cx="190" cy="215" r="12" fill="#004D26" />
        <g fill="#004D26">
          <circle cx="190" cy="177" r="6" />
          <circle cx="226" cy="203" r="6" />
          <circle cx="212" cy="246" r="6" />
          <circle cx="168" cy="246" r="6" />
          <circle cx="154" cy="203" r="6" />
        </g>
      </g>

      {/* ---------------------------------------------------------------- */}
      {/* Engine oil container                                              */}
      {/* ---------------------------------------------------------------- */}
      <g>
        <rect
          x="424"
          y="116"
          width="44"
          height="42"
          rx="7"
          fill="#FFFFFF"
          stroke="#C9D3CB"
          strokeWidth="2"
        />
        <rect x="419" y="96" width="54" height="24" rx="7" fill="#004D26" />
        <rect
          x="350"
          y="148"
          width="120"
          height="142"
          rx="16"
          fill="#FFFFFF"
          stroke="#C9D3CB"
          strokeWidth="2"
        />
        {/* Handle hole drawn after the body so it reads as a cut-out */}
        <path d="M368 176h30a20 20 0 0 1 0 40h-30z" fill="#E8F5EC" />
        {/* Label */}
        <rect
          x="364"
          y="214"
          width="92"
          height="58"
          rx="8"
          fill="#F7F9F7"
          stroke="#E3EAE5"
          strokeWidth="1.5"
        />
        <rect x="376" y="228" width="58" height="7" rx="3.5" fill="#006C35" />
        <rect x="376" y="244" width="40" height="6" rx="3" fill="#C9D3CB" />
        <rect x="376" y="256" width="52" height="6" rx="3" fill="#E3EAE5" />
      </g>

      {/* ---------------------------------------------------------------- */}
      {/* Oil filter                                                        */}
      {/* ---------------------------------------------------------------- */}
      <g>
        <rect x="65" y="344" width="100" height="112" rx="10" fill="#006C35" />
        <rect x="65" y="384" width="100" height="42" fill="#FFFFFF" />
        <rect x="80" y="396" width="52" height="7" rx="3.5" fill="#006C35" />
        <rect x="80" y="410" width="34" height="6" rx="3" fill="#E3EAE5" />
        <ellipse cx="115" cy="344" rx="50" ry="13" fill="#DDE4DE" />
        <ellipse cx="115" cy="344" rx="50" ry="13" fill="none" stroke="#B9C4BC" strokeWidth="2" />
        <ellipse cx="115" cy="344" rx="22" ry="6" fill="#8C9A92" />
        <ellipse cx="115" cy="454" rx="50" ry="12" fill="#004D26" />
      </g>

      {/* ---------------------------------------------------------------- */}
      {/* Spark plug (tilted)                                               */}
      {/* ---------------------------------------------------------------- */}
      <g transform="rotate(-28 400 392)">
        {/* Terminal */}
        <rect x="386" y="316" width="28" height="16" rx="3" fill="#B9C4BC" />
        {/* Insulator with ribs */}
        <rect x="389" y="332" width="22" height="62" rx="6" fill="#FFFFFF" stroke="#DDE4DE" strokeWidth="1.5" />
        <g fill="#F7F9F7" stroke="#E3EAE5" strokeWidth="1.2">
          <rect x="384" y="342" width="32" height="7" rx="3" />
          <rect x="384" y="356" width="32" height="7" rx="3" />
          <rect x="384" y="370" width="32" height="7" rx="3" />
        </g>
        {/* Brand gasket ring */}
        <rect x="385" y="392" width="30" height="6" rx="2" fill="#006C35" />
        {/* Hex nut */}
        <rect x="382" y="398" width="36" height="20" rx="4" fill="#8C9A92" />
        {/* Threaded body */}
        <rect x="388" y="418" width="24" height="34" fill="#B9C4BC" />
        <g stroke="#8C9A92" strokeWidth="1.6">
          <line x1="388" y1="424" x2="412" y2="424" />
          <line x1="388" y1="431" x2="412" y2="431" />
          <line x1="388" y1="438" x2="412" y2="438" />
          <line x1="388" y1="445" x2="412" y2="445" />
        </g>
        {/* Centre electrode */}
        <rect x="394" y="452" width="12" height="10" fill="#8C9A92" />
        <rect x="386" y="456" width="10" height="8" rx="2" fill="#5B6B62" />
      </g>
    </svg>
  );
}
