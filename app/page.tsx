import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/ui/glassmorphism-trust-hero";
import CredibilityBand from "@/components/CredibilityBand";
import SectionSkeleton from "@/components/SectionSkeleton";

const StatsSection = dynamic(() => import("@/components/StatsSection"), {
  loading: () => <SectionSkeleton className="mx-4 my-8 h-36" />,
});
const PresaleProgress = dynamic(() => import("@/components/PresaleProgress"), {
  loading: () => <SectionSkeleton className="mx-4 my-8 h-64" />,
});
const TokenomicsSection = dynamic(() => import("@/components/TokenomicsSection"), {
  loading: () => <SectionSkeleton className="mx-4 my-8 h-80" />,
});
const BrxUtilitySection = dynamic(() => import("@/components/BrxUtilitySection"), {
  loading: () => <SectionSkeleton className="mx-4 my-8 h-96" />,
});
const PricingSection = dynamic(() => import("@/components/PricingSection"), {
  loading: () => <SectionSkeleton className="mx-4 my-8 h-[28rem]" />,
});
const StagesSection = dynamic(() => import("@/components/StagesSection"), {
  loading: () => <SectionSkeleton className="mx-4 my-8 h-48" />,
});
const RoadmapSection = dynamic(() => import("@/components/RoadmapSection"), {
  loading: () => <SectionSkeleton className="mx-4 my-8 h-72" />,
});
const FooterSection = dynamic(() => import("@/components/FooterSection"), {
  loading: () => <SectionSkeleton className="mx-4 my-8 h-32" />,
});

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--bg-base)" }}>
      <Navbar />

      <div id="hero" className="pt-14">
        <HeroSection />
      </div>

      <CredibilityBand />

      <div id="presale">
        <StatsSection />
        <PresaleProgress />
      </div>

      <div id="tokenomics">
        <TokenomicsSection />
      </div>

      <div id="utility">
        <BrxUtilitySection />
      </div>

      <div id="stages">
        <PricingSection />
        <StagesSection />
      </div>

      <div id="roadmap">
        <RoadmapSection />
      </div>

      <FooterSection />
    </main>
  );
}
