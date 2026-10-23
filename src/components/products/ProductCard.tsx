"use client";

/**
 * Product card: artwork, name, part number, honest fitment status, quality
 * tier selector with live price, and the add-to-cart action.
 *
 * Adding to cart is a short, guarded transition (idle -> adding -> added) so
 * double clicks cannot create duplicate lines, and every state change is
 * announced through the shared toast.
 */

import { useEffect, useRef, useState } from "react";
import { Car, Check, HelpCircle, Loader2, ShoppingCart } from "lucide-react";

import { ProductArtwork } from "@/components/illustrations/ProductArtwork";
import { QualitySelector } from "@/components/products/QualitySelector";
import { Button } from "@/components/ui/Button";
import { featuredSection } from "@/content/copy";
import { isCompatible, qualityTiers } from "@/data/mock";
import { formatSAR } from "@/lib/format";
import { useStore } from "@/lib/store";
import type { Product, QualityTierId } from "@/lib/types";

type Phase = "idle" | "adding" | "added";

export function ProductCard({ product }: { product: Product }) {
  const { vehicle, addToCart, notify } = useStore();

  const [quality, setQuality] = useState<QualityTierId>("japan");
  const [phase, setPhase] = useState<Phase>("idle");

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Clear any pending transitions when the card unmounts (e.g. filtering).
  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((timer) => clearTimeout(timer));
  }, []);

  const price = product.prices[quality];
  const tierLabel =
    qualityTiers.find((tier) => tier.id === quality)?.label ?? quality;

  /* Honest fitment status -------------------------------------------------- */
  const fitment = !vehicle
    ? {
        className: "border border-dashed border-line bg-white text-muted",
        icon: Car,
        label: featuredSection.noVehicle,
      }
    : isCompatible(product, vehicle)
      ? {
          className: "border border-brand/25 bg-brand-light text-brand",
          icon: Check,
          label: featuredSection.fits,
        }
      : {
          className: "border border-line bg-surface text-muted",
          icon: HelpCircle,
          label: featuredSection.fitUnknown,
        };

  const FitIcon = fitment.icon;

  /* Add to cart ------------------------------------------------------------ */
  const handleAdd = () => {
    if (phase !== "idle") return;

    setPhase("adding");
    timers.current.push(
      setTimeout(() => {
        addToCart(product, quality);
        setPhase("added");
        notify(`Added ${product.name} (${tierLabel}) to your cart`, "success");
        timers.current.push(
          setTimeout(() => setPhase("idle"), 1400),
        );
      }, 420),
    );
  };

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-xs transition-all hover:border-muted/40 hover:shadow-sm">
      {/* Consistent artwork container with a reserved aspect ratio */}
      <div className="relative aspect-[4/3] border-b border-line bg-surface">
        <ProductArtwork
          kind={product.artwork}
          className="absolute inset-0 h-full w-full p-5"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div>
          <h3 className="text-lg font-semibold leading-snug tracking-tight text-ink">
            {product.name}
          </h3>
          <p className="mt-1.5 font-mono text-xs text-muted">
            {product.partNumber}
          </p>
          <p className="mt-1 text-sm leading-snug text-muted">
            {product.blurb}
          </p>

          <p
            className={`mt-3 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${fitment.className}`}
          >
            <FitIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {fitment.label}
          </p>
        </div>

        {/* Price and action block stays aligned across a row of cards */}
        <div className="mt-auto pt-4">
          <QualitySelector
            value={quality}
            onChange={setQuality}
            name={`quality-${product.id}`}
            disabled={phase === "adding"}
          />

          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
            <span className="text-xl font-semibold leading-none tracking-tight tabular-nums text-ink">
              {formatSAR(price)}
            </span>
            <span className="text-xs text-muted">
              {featuredSection.vatNote}
            </span>
          </div>

          <Button
            fullWidth
            onClick={handleAdd}
            disabled={phase === "adding"}
            className={`mt-3.5 ${phase === "added" ? "bg-brand-dark hover:bg-brand-dark" : ""}`}
          >
            {phase === "adding" && (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            )}
            {phase === "added" && <Check className="h-4 w-4" aria-hidden="true" />}
            {phase === "idle" && (
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
            )}
            {phase === "idle" ? featuredSection.addToCart : phase === "adding" ? "Adding…" : featuredSection.added}
          </Button>
        </div>
      </div>
    </article>
  );
}
