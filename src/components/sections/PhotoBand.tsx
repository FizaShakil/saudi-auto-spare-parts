"use client";

/**
 * PhotoBand — a full-width photographic breather between the product grid
 * and the VIN education panel. Decorative only: the image has an empty alt
 * and carries no text overlay, so it never competes with surrounding copy.
 *
 * Served from Pexels as demo imagery; swap for client-owned assets before
 * production (see README → Demo imagery).
 */

import { useState } from "react";
import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { bandImage } from "@/content/images";

export function PhotoBand() {
  const [photoFailed, setPhotoFailed] = useState(false);

  if (photoFailed) return null;

  return (
    <section aria-hidden="true" className="bg-white">
      <Container className="pb-2">
        <div className="relative aspect-[21/9] overflow-hidden rounded-panel border border-line bg-surface">
          <Image
            src={bandImage.src}
            alt={bandImage.alt}
            fill
            sizes="100vw"
            onError={() => setPhotoFailed(true)}
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
