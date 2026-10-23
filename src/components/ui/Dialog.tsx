"use client";

/**
 * Accessible dialog used for the VIN help modal, the cart panel and the
 * mobile navigation drawer.
 *
 * - Rendered through a portal so `position: fixed` is never affected by a
 *   transformed ancestor.
 * - Traps focus, closes on Escape and on backdrop click, and restores focus to
 *   the element that opened it.
 * - Locks background scroll while open.
 */

import { useEffect, useId, useRef, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

/**
 * Portals need `document`, which never exists on the server. Dialogs always
 * start closed, but the subscription pair keeps the flag hydration-safe and
 * avoids a `setState` inside an effect.
 */
function subscribeNoop(): () => void {
  return () => {};
}

interface DialogProps {
  open: boolean;
  onClose: () => void;
  /** Visible dialog heading; also used as the accessible name. */
  title: string;
  children: ReactNode;
  /** `center` for modals, `right` for slide-over panels. */
  placement?: "center" | "right";
  /** Extra classes for the dialog surface (width, alignment, …). */
  surfaceClassName?: string;
  /** Hides the built-in title row when the caller supplies its own header. */
  hideHeader?: boolean;
  /** Set to false when the children manage their own scroll region. */
  scrollable?: boolean;
}

export function Dialog({
  open,
  onClose,
  title,
  children,
  placement = "center",
  surfaceClassName = "",
  hideHeader = false,
  scrollable = true,
}: DialogProps) {
  const titleId = useId();
  const surfaceRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  // Keep the latest close handler in a ref so the effect below only re-runs
  // when `open` changes (otherwise focus would be stolen on every render).
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    previousFocus.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the dialog on the next frame.
    const focusTimer = window.setTimeout(() => {
      const surface = surfaceRef.current;
      if (!surface) return;
      const first = surface.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      first?.focus();
    }, 10);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;

      const surface = surfaceRef.current;
      if (!surface) return;
      const focusables = Array.from(
        surface.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !surface.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus.current?.focus();
    };
  }, [open]);

  if (!open || !mounted) return null;

  const surfaceClassNameFinal =
    placement === "right"
      ? `absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col rounded-panel bg-white shadow-overlay animate-panel-in ${surfaceClassName}`
      : `absolute left-1/2 top-1/2 flex max-h-[88vh] w-[min(92vw,520px)] -translate-x-1/2 -translate-y-1/2 flex-col rounded-panel bg-white shadow-overlay animate-modal-in ${surfaceClassName}`;

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default animate-fade-in bg-ink/45"
        tabIndex={-1}
      />

      <div
        ref={surfaceRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={surfaceClassNameFinal}
      >
        {!hideHeader && (
          <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
            <h2 id={titleId} className="text-lg font-semibold tracking-tight text-ink">
              {title}
            </h2>
            <DialogCloseButton onClose={onClose} />
          </div>
        )}
        <div
          className={
            scrollable ? "min-h-0 flex-1 overflow-y-auto" : "min-h-0 flex-1"
          }
        >
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}

/** Close control shared by every dialog surface. */
export function DialogCloseButton({
  onClose,
  className = "",
}: {
  onClose: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close"
      className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${className}`}
    >
      <X className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
