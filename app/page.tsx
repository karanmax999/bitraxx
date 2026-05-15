"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/ui/glassmorphism-trust-hero";
import CredibilityBand from "@/components/CredibilityBand";
import StatsSection from "@/components/StatsSection";
import PresaleProgress from "@/components/PresaleProgress";
import TokenomicsSection from "@/components/TokenomicsSection";
import BrxUtilitySection from "@/components/BrxUtilitySection";
import PricingSection from "@/components/PricingSection";
import StagesSection from "@/components/StagesSection";
import RoadmapSection from "@/components/RoadmapSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--bg-base)" }}>
      <Navbar />

      <div id="hero" className="pt-14">
        <HeroSection />
      </div>

      {/* Credibility numbers band — sits right below hero */}
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
