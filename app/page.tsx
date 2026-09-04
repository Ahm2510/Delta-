import { SiteNav } from "@/components/site-nav";
import { Rails } from "@/components/ui/rails";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { HowItWorks } from "@/components/sections/how-it-works";
import { DataSafety } from "@/components/sections/data-safety";
import { Privacy } from "@/components/sections/privacy";
import {
  AlwaysCurrent,
  CardsDecoded,
  Goals,
  MomentYouSpend,
} from "@/components/sections/features";
import { Trust } from "@/components/sections/trust";
import {
  EarlyAccess,
  Investors,
  SiteFooter,
  WhyNow,
} from "@/components/sections/closing";

export default function Page() {
  return (
    <main className="relative w-full max-w-full">
      <Rails />
      <SiteNav />

      <div className="relative z-10">
        <Hero />
        <Problem />
        <HowItWorks />
        <Privacy />
        <DataSafety />
        <MomentYouSpend />
        <AlwaysCurrent />
        <CardsDecoded />
        <Goals />
        <Trust />
        <WhyNow />
        <EarlyAccess />
        <Investors />
        <SiteFooter />
      </div>
    </main>
  );
}
