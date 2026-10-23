/**
 * Explanatory artwork for the "Where do I find my VIN?" dialog.
 *
 * Left: the windshield plate position. Right: the vehicle registration card
 * with the VIN field highlighted. This is instructional, not decorative.
 */

export function VinHelpArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 190"
      role="img"
      aria-label="Diagram showing the VIN plate at the base of the windshield and the VIN field on a vehicle registration card"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Windshield                                                          */}
      {/* ------------------------------------------------------------------ */}
      <g>
        <rect x="6" y="10" width="192" height="150" rx="12" fill="#F7F9F7" stroke="#E3EAE5" strokeWidth="1.5" />
        {/* Glass */}
        <path d="M34 34h136l12 62H22z" fill="#E8F5EC" stroke="#C9D3CB" strokeWidth="2" />
        {/* Wiper hint */}
        <path d="M44 84l40-30" stroke="#C9D3CB" strokeWidth="2.5" strokeLinecap="round" />
        {/* VIN plate at the base of the windshield, driver side */}
        <rect x="30" y="80" width="76" height="14" rx="3" fill="#FFFFFF" stroke="#006C35" strokeWidth="2" />
        <rect x="36" y="85" width="44" height="4" rx="2" fill="#006C35" fillOpacity="0.7" />
        {/* Leader line */}
        <path d="M68 100v16" stroke="#006C35" strokeWidth="1.5" strokeDasharray="3 3" />
        <text
          x="98"
          y="130"
          className="fill-muted text-[11px]"
          fontFamily="inherit"
        >
          VIN plate
        </text>
        <text x="98" y="146" className="fill-muted text-[11px]" fontFamily="inherit">
          driver side
        </text>
      </g>

      {/* ------------------------------------------------------------------ */}
      {/* Registration card                                                   */}
      {/* ------------------------------------------------------------------ */}
      <g>
        <rect x="222" y="10" width="192" height="150" rx="12" fill="#FFFFFF" stroke="#C9D3CB" strokeWidth="1.5" />
        <path d="M222 22a12 12 0 0 1 12-12h168a12 12 0 0 1 12 12v20H222z" fill="#006C35" />
        <text x="238" y="30" className="fill-white text-[11px]" fontFamily="inherit">
          Vehicle registration
        </text>

        {/* Data rows */}
        <rect x="238" y="56" width="44" height="6" rx="3" fill="#E3EAE5" />
        <rect x="238" y="68" width="96" height="6" rx="3" fill="#DDE4DE" />
        <rect x="346" y="56" width="34" height="6" rx="3" fill="#E3EAE5" />
        <rect x="346" y="68" width="52" height="6" rx="3" fill="#DDE4DE" />

        {/* Highlighted VIN field */}
        <rect x="234" y="90" width="164" height="32" rx="7" fill="#E8F5EC" stroke="#006C35" strokeWidth="1.5" />
        <text x="242" y="111" className="fill-brand text-[11px]" fontFamily="inherit">
          VIN
        </text>
        {/* 17 character boxes */}
        <g fill="#FFFFFF" stroke="#B9C4BC" strokeWidth="1">
          <rect x="266" y="99" width="6" height="14" rx="1.5" />
          <rect x="273.6" y="99" width="6" height="14" rx="1.5" />
          <rect x="281.2" y="99" width="6" height="14" rx="1.5" />
          <rect x="288.8" y="99" width="6" height="14" rx="1.5" />
          <rect x="296.4" y="99" width="6" height="14" rx="1.5" />
          <rect x="304" y="99" width="6" height="14" rx="1.5" />
          <rect x="311.6" y="99" width="6" height="14" rx="1.5" />
          <rect x="319.2" y="99" width="6" height="14" rx="1.5" />
          <rect x="326.8" y="99" width="6" height="14" rx="1.5" />
          <rect x="334.4" y="99" width="6" height="14" rx="1.5" />
          <rect x="342" y="99" width="6" height="14" rx="1.5" />
          <rect x="349.6" y="99" width="6" height="14" rx="1.5" />
          <rect x="357.2" y="99" width="6" height="14" rx="1.5" />
          <rect x="364.8" y="99" width="6" height="14" rx="1.5" />
          <rect x="372.4" y="99" width="6" height="14" rx="1.5" />
          <rect x="380" y="99" width="6" height="14" rx="1.5" />
          <rect x="387.6" y="99" width="6" height="14" rx="1.5" />
        </g>

        <rect x="238" y="134" width="66" height="6" rx="3" fill="#E3EAE5" />
        <rect x="316" y="134" width="46" height="6" rx="3" fill="#E3EAE5" />
      </g>
    </svg>
  );
}
