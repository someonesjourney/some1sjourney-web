import { HeroSection } from "@/components/sections/HeroSection";
import { WhatIsSection } from "@/components/sections/WhatIsSection";
import { DiscoverySection } from "@/components/sections/DiscoverySection";
import { PathBeyondSection } from "@/components/sections/PathBeyondSection";
import { IdentitiesSection } from "@/components/sections/IdentitiesSection";
import { TribesSection } from "@/components/sections/TribesSection";
import { MemoriesSection } from "@/components/sections/MemoriesSection";
import { CompeteEvolveSection } from "@/components/sections/CompeteEvolveSection";
import { MarketplaceSection } from "@/components/sections/MarketplaceSection";
import { PTSSection } from "@/components/sections/PTSSection";
import { SeasonOneSection } from "@/components/sections/SeasonOneSection";
import { EvolutionSection } from "@/components/sections/EvolutionSection";
import { EarlyAccessSection } from "@/components/sections/EarlyAccessSection";
import { GradientBackground } from "@/components/ui/GradientBackground";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="relative">
        <GradientBackground className="opacity-50" />
        <div className="relative">
          <WhatIsSection />
          <DiscoverySection />
          <PathBeyondSection />
          <IdentitiesSection />
          <TribesSection />
          <MemoriesSection />
          <CompeteEvolveSection />
          <MarketplaceSection />
          <PTSSection />
          <SeasonOneSection />
          <EvolutionSection />
          <EarlyAccessSection />
        </div>
      </div>
    </>
  );
}
