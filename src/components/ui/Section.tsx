/**
 * Shared section shell: consistent vertical rhythm (64px mobile / 96px
 * desktop, tighter when `dense`) and alignment to the global container.
 * Section ids are shared with `src/lib/navigation.ts`.
 */

import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";

interface SectionProps {
  id?: string;
  children: ReactNode;
  /** Background / border treatments. */
  className?: string;
  /** Tighter rhythm for shorter, functional sections. */
  dense?: boolean;
  /** Accessible name when the section has no visible heading. */
  ariaLabel?: string;
  ariaLabelledBy?: string;
}

export function Section({
  id,
  children,
  className = "",
  dense = false,
  ariaLabel,
  ariaLabelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={`scroll-mt-24 lg:scroll-mt-28 ${
        dense ? "py-14 lg:py-20" : "py-16 lg:py-24"
      } ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}
