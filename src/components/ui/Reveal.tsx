"use client";

/**
 * Lightweight scroll reveal.
 *
 * Content renders fully visible in the server HTML, so crawlers and no-JS
 * users always see it. After hydration, off-screen elements get the
 * `reveal-pending` class (opacity 0 + a 12 px rise, see globals.css) and
 * lose it when they enter the viewport, letting the CSS transition play.
 * Elements already on screen — and visitors with prefers-reduced-motion —
 * are never hidden, so there is no flash and no missing content.
 *
 * Implemented with direct DOM class toggling rather than setState to keep
 * the react-hooks/set-state-in-effect rule happy (DOM mutation is an
 * external-system update, which effects are allowed to do).
 */

import { useEffect, useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Optional class applied to the wrapper (margin, grid item, etc.). */
  className?: string;
  /** Stagger delay in milliseconds for grid children. */
  delay?: number;
}

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const inInitialViewport = rect.top < window.innerHeight * 0.92;
    if (inInitialViewport) return;

    if (delay > 0) el.style.transitionDelay = `${delay}ms`;
    el.classList.add("reveal-pending");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.remove("reveal-pending");
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-500 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
