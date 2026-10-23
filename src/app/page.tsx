import { CategorySection } from "@/components/sections/CategorySection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeaturedParts } from "@/components/sections/FeaturedParts";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PaymentDelivery } from "@/components/sections/PaymentDelivery";
import { PopularMakes } from "@/components/sections/PopularMakes";
import { QualitySection } from "@/components/sections/QualitySection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { VinEducation } from "@/components/sections/VinEducation";

/**
 * Landing page.
 *
 * Composed mostly of server components; interactive islands (finder, product
 * grid, FAQ, VIN form) are client components that pull shared state from
 * `StoreProvider`.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CategorySection />
      <QualitySection />
      <HowItWorks />
      <FeaturedParts />
      <VinEducation />
      <PopularMakes />
      <PaymentDelivery />
      <FaqSection />
      <FinalCta />
    </>
  );
}
