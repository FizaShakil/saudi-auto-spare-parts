"use client";

/**
 * Slide-over cart panel.
 *
 * The demo cart is client-side only: quantities and lines are stored in
 * localStorage and nothing is ever sent anywhere. Checkout is an honest demo
 * notice rather than a fake success flow.
 */

import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { cartCopy } from "@/content/copy";
import { qualityTiers } from "@/data/mock";
import { formatSAR } from "@/lib/format";
import { useStore } from "@/lib/store";
import { scrollToSection, sectionIds } from "@/lib/navigation";
import type { QualityTierId } from "@/lib/types";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, ready, updateLineQuantity, removeLine, notify } = useStore();

  const subtotal = cart.reduce(
    (total, line) => total + line.unitPrice * line.quantity,
    0,
  );

  const tierLabel = (id: QualityTierId) =>
    qualityTiers.find((tier) => tier.id === id)?.label ?? id;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={cartCopy.title}
      placement="right"
      scrollable={false}
    >
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto px-5 sm:px-6">
          {!ready ? null : cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-surface text-muted">
                <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="text-base font-semibold tracking-tight text-ink">
                {cartCopy.emptyTitle}
              </p>
              <p className="max-w-[260px] text-sm leading-relaxed text-muted">
                {cartCopy.emptyDescription}
              </p>
              <Button
                variant="secondary"
                onClick={() => {
                  onClose();
                  scrollToSection(sectionIds.featured);
                }}
                className="mt-1"
              >
                {cartCopy.browse}
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {cart.map((line) => (
                <li key={line.key} className="flex gap-4 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-medium leading-snug tracking-tight text-ink">
                      {line.name}
                    </p>
                    <p className="mt-1 font-mono text-xs text-muted">
                      {line.partNumber} · {tierLabel(line.quality)}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <div
                        className="inline-flex items-center rounded-control border border-line"
                        role="group"
                        aria-label={`Quantity for ${line.name}`}
                      >
                        <button
                          type="button"
                          onClick={() => updateLineQuantity(line.key, -1)}
                          aria-label={`${cartCopy.decrease}: ${line.name}`}
                          className="grid h-9 w-9 place-items-center rounded-l-control text-muted transition-colors hover:bg-surface hover:text-ink"
                        >
                          <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        <span className="min-w-8 text-center text-sm font-medium tabular-nums text-ink">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateLineQuantity(line.key, 1)}
                          aria-label={`${cartCopy.increase}: ${line.name}`}
                          className="grid h-9 w-9 place-items-center rounded-r-control text-muted transition-colors hover:bg-surface hover:text-ink"
                        >
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLine(line.key)}
                        aria-label={`${cartCopy.remove}: ${line.name}`}
                        className="px-2 text-muted hover:text-danger"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        Remove
                      </Button>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-base font-semibold tabular-nums text-ink">
                      {formatSAR(line.unitPrice * line.quantity)}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {formatSAR(line.unitPrice)} each
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {ready && cart.length > 0 && (
          <div className="border-t border-line px-5 py-4 sm:px-6">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm text-muted">{cartCopy.subtotal}</span>
              <span className="text-xl font-semibold tracking-tight tabular-nums text-ink">
                {formatSAR(subtotal)}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted">{cartCopy.vatIncluded}</p>

            <Button
              size="lg"
              fullWidth
              onClick={() => notify(cartCopy.checkoutNotice)}
              className="mt-4"
            >
              {cartCopy.checkout}
            </Button>
          </div>
        )}
      </div>
    </Dialog>
  );
}
