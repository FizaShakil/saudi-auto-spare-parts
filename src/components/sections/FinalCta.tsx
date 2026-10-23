"use client";

/**
 * Final conversion band before the footer.
 * A single primary action that scrolls to the vehicle finder and moves focus
 * into it.
 */

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ctaSection } from "@/content/copy";
import { focusVehicleFinder } from "@/lib/navigation";

export function FinalCta() {
  return (
    <section className="bg-brand text-white">
      <Container className="py-14 lg:py-20">
        <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              {ctaSection.title}
            </h2>
            <p className="mt-4 max-w-[54ch] text-base leading-relaxed text-white/90">
              {ctaSection.description}
            </p>
          </div>

          <Button
            variant="onBrand"
            size="lg"
            onClick={focusVehicleFinder}
            className="shrink-0 md:self-start"
          >
            {ctaSection.action}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
