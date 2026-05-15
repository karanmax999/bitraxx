"use client";

import React from "react";
import {
  Percent, Layers, Rocket, Shield, TrendingUp, Vote,
  Gift, Star, Zap, Users, BarChart2, Crown,
} from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";
import { UniqueAccordion, type AccordionItem } from "@/components/ui/interactive-accordion";

/* ── Utilities grid data ── */
const UTILITIES = [
  { icon: Percent,   title: "Fee Discounts",    description: "Hold BRX to unlock up to 50% reduction on all trading fees across the BitraXx exchange.",                          color: "#f59e0b", glow: "gold"   as const },
  { icon: Layers,    title: "Staking Rewards",  description: "Stake BRX to earn passive yield. Higher tiers unlock boosted APY and compounding options.",                        color: "#d97706", glow: "orange" as const },
  { icon: Rocket,    title: "Launchpad Access", description: "BRX holders get guaranteed allocation in every new project launched on the BitraXx Launchpad.",                   color: "#f59e0b", glow: "gold"   as const },
  { icon: Shield,    title: "BRX Shield",       description: "Activate up to 40% downside protection on eligible positions — exclusive to BRX holders.",                        color: "#d4d4d8", glow: "blue"   as const },
  { icon: TrendingUp,title: "Trading Rewards",  description: "Earn BRX rebates on every trade. Volume-based tiers multiply your rewards automatically.",                         color: "#f59e0b", glow: "gold"   as const },
  { icon: Vote,      title: "Governance",       description: "Vote on protocol upgrades, fee structures, and new listings. Your BRX = your voice.",                             color: "#d4d4d8", glow: "blue"   as const },
];

/* ── VIP accordion data ── */
const VIP_ITEMS: AccordionItem[] = [
  {
    id: "airdrops",
    number: "01",
    title: "Exclusive Airdrops",
    content: "VIP holders receive priority access to partner token airdrops and ecosystem rewards — distributed directly to your wallet before public announcements.",
  },
  {
    id: "vip-status",
    number: "02",
    title: "VIP Status & Support",
    content: "Unlock a dedicated account manager, zero-fee withdrawals, and early access to every new platform feature before it goes live to the general public.",
  },
  {
    id: "staking",
    number: "03",
    title: "Enhanced Staking",
    content: "VIP tier staking pools offer 2× base APY with weekly compounding and zero lock-up penalties. Withdraw anytime without sacrificing your earned rewards.",
  },
  {
    id: "affiliate",
    number: "04",
    title: "Affiliate Boosts",
    content: "Earn up to 40% commission on every referral. VIP status doubles your affiliate tier multiplier — turning your network into a compounding income stream.",
  },
  {
    id: "fund",
    number: "05",
    title: "Investment Fund Access",
    content: "Access the BitraXx Ecosystem Fund — a curated portfolio of early-stage DeFi projects. VIP holders get allocation rights before public rounds open.",
  },
  {
    id: "council",
    number: "06",
    title: "Council Membership",
    content: "Top 100 BRX holders join the BitraXx Council — directly shaping the roadmap, treasury allocation, and strategic partnerships through binding governance votes.",
  },
];

function BenefitCard({ icon: Icon, title, description, color, glow }: {
  icon: React.ElementType; title: string; description: string;
  color: string; glow: "gold" | "orange" | "blue" | "purple" | "green" | "red";
}) {
  return (
    <GlowCard glowColor={glow} customSize className="p-0 h-full">
      <div className="flex flex-col gap-4 rounded-2xl p-6 h-full" style={{ backgroundColor: "var(--bg-card)" }}>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}14`, border: `1px solid ${color}30`, boxShadow: `0 0 12px 2px ${color}20` }}>
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
        <div>
          <h3 className="mb-1.5 font-semibold text-sm font-['Orbitron',sans-serif]" style={{ color: "var(--text-primary)" }}>
            {title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{description}</p>
        </div>
      </div>
    </GlowCard>
  );
}

export default function BrxUtilitySection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="mx-auto max-w-7xl space-y-20">

        {/* ── BRX Utilities grid ── */}
        <div>
          <div className="mb-12 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest"
              style={{ borderColor: "rgba(245,158,11,0.25)", backgroundColor: "rgba(245,158,11,0.06)", color: "#f59e0b" }}>
              <Zap className="h-3 w-3" />
              BRX Utility
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-['Orbitron',sans-serif]">
              <span className="text-gold">Why Hold</span> <span className="text-silver">BRX?</span>
            </h2>
            <p className="mt-3 text-sm max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
              BRX is the economic engine of the BitraXx ecosystem — powering every transaction,
              reward, and interaction with instant, gasless on-chain execution.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {UTILITIES.map((item) => <BenefitCard key={item.title} {...item} />)}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.2), transparent)" }} />

        {/* ── VIP Tier — accordion layout ── */}
        <div>
          <div className="mb-12 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest"
              style={{ borderColor: "rgba(245,158,11,0.25)", backgroundColor: "rgba(245,158,11,0.06)", color: "#fcd34d" }}>
              <Crown className="h-3 w-3" />
              VIP Tier
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-['Orbitron',sans-serif]">
              <span className="text-gold">Exclusive</span> <span className="text-silver">Benefits</span>
            </h2>
            <p className="mt-3 text-sm max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
              The more BRX you hold, the more you unlock. VIP status opens doors that
              regular participants simply don't have access to.
            </p>
          </div>

          {/* Two-column layout: accordion left, decorative right */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 items-start">

            {/* Accordion */}
            <div className="rounded-2xl border p-6 sm:p-8"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
              <UniqueAccordion items={VIP_ITEMS} defaultOpen="airdrops" />
            </div>

            {/* Right panel — VIP tier visual */}
            <div className="flex flex-col gap-5">
              {/* Tier card */}
              <div className="relative overflow-hidden rounded-2xl p-px"
                style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.4) 0%, rgba(245,158,11,0.06) 50%, rgba(245,158,11,0.2) 100%)" }}>
                <div className="relative rounded-2xl p-7" style={{ backgroundColor: "var(--bg-card)" }}>
                  <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{ background: "linear-gradient(135deg, #fcd34d, #f59e0b)", boxShadow: "0 0 20px 4px rgba(245,158,11,0.4)" }}>
                        <Crown className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-widest text-amber-400">BitraXx</div>
                        <div className="text-lg font-bold font-['Orbitron',sans-serif]" style={{ color: "var(--text-primary)" }}>
                          VIP Council
                        </div>
                      </div>
                    </div>

                    {/* Tier thresholds */}
                    {[
                      { tier: "Bronze",   amount: "10,000 BRX",  perks: "Fee discounts + Staking",       color: "#cd7f32" },
                      { tier: "Silver",   amount: "50,000 BRX",  perks: "+ Launchpad + Shield",           color: "#d4d4d8" },
                      { tier: "Gold",     amount: "200,000 BRX", perks: "+ Airdrops + Fund access",       color: "#f59e0b" },
                      { tier: "Platinum", amount: "500,000 BRX", perks: "+ Council + All benefits",       color: "#e5e4e2" },
                    ].map(({ tier, amount, perks, color }) => (
                      <div key={tier} className="flex items-center gap-3 py-3 border-b last:border-0"
                        style={{ borderColor: "var(--border)" }}>
                        <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold uppercase tracking-widest" style={{ color }}>{tier}</span>
                            <span className="text-xs font-semibold font-['Orbitron',sans-serif]" style={{ color: "var(--text-secondary)" }}>{amount}</span>
                          </div>
                          <div className="text-[11px] mt-0.5" style={{ color: "var(--text-faint)" }}>{perks}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "6",    label: "VIP Perks"   },
                  { value: "2×",   label: "Staking APY" },
                  { value: "40%",  label: "Max Rebate"  },
                ].map(({ value, label }) => (
                  <div key={label} className="rounded-xl border p-4 text-center"
                    style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
                    <div className="text-xl font-bold font-['Orbitron',sans-serif] text-gold">{value}</div>
                    <div className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: "var(--text-faint)" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA banner ── */}
        <div className="relative overflow-hidden rounded-2xl p-px"
          style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.35) 0%, rgba(245,158,11,0.06) 50%, rgba(245,158,11,0.2) 100%)" }}>
          <div className="relative rounded-2xl px-8 py-10 text-center" style={{ backgroundColor: "var(--bg-card)" }}>
            <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-amber-500/8 blur-3xl" />
            <Crown className="mx-auto mb-4 h-8 w-8 text-amber-400" />
            <h3 className="mb-2 text-xl font-bold font-['Orbitron',sans-serif]" style={{ color: "var(--text-primary)" }}>
              Secure Your BRX Before Stage 2 Closes
            </h3>
            <p className="mb-6 text-sm max-w-md mx-auto" style={{ color: "var(--text-muted)" }}>
              Stage 2 is 78% filled. Once it closes, the price moves to $0.065.
              Every utility above is available from day one of holding.
            </p>
            <button className="inline-flex items-center gap-2 rounded-full px-10 py-3.5 text-sm font-bold text-black transition-all hover:scale-[1.03] active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg, #fcd34d, #f59e0b, #d97706)", boxShadow: "0 0 24px 4px rgba(245,158,11,0.4)" }}>
              Buy BRX Now — $0.042
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
