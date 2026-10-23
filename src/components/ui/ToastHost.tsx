"use client";

/**
 * Single polite live region used for transient feedback (added to cart,
 * vehicle saved, placeholder notices…).
 *
 * Positioned clear of the floating WhatsApp button so neither control ever
 * covers the other.
 */

import { Check } from "lucide-react";

import { useStore } from "@/lib/store";

export function ToastHost() {
  const { toast } = useStore();

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-[110] flex justify-start pb-[max(env(safe-area-inset-bottom),1rem)] pl-4 pr-24 sm:pl-6"
    >
      {toast && (
        <div
          key={toast.id}
          role="status"
          className="flex max-w-[340px] items-start gap-2.5 rounded-card border border-line bg-white px-4 py-3 text-sm leading-snug text-ink shadow-card animate-toast-in"
        >
          {toast.tone === "success" && (
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-white">
              <Check className="h-3 w-3" aria-hidden="true" />
            </span>
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
