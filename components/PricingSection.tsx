"use client";

import React from "react";
import { Check, Zap, Crown, Rocket } from "lucide-react";
import { Sparkles } from "@/components/ui/sparkles";
import dynamic from "next/dynamic";

// Dynamic import prevents SSR hydration mismatch with @number-flow/react
const NumberFlow = dynamic(() => import("@number-flow/react"), { ssr: false });

/* ── Tier data ── */
interface Tier {
  id: string;
  name: string;
  icon: React.ElementType;
  price: number;
  unit: string;
  badge?: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  color: string;
  glowColor: string;
}

import { SALE_STAGES } from "@/config/tokenSale";

const TIER_UI_PROPS: Record<string, Partial<Tier>> = {
  seed: {
    icon: Rocket,
    unit: "per BRX",
    badge: "Closed",
    cta: "Sold Out",
    highlighted: false,
    color: "#d4d4d8",
    glowColor: "rgba(212,212,216,0.15)",
  },
  presale: {
    icon: Zap,
    unit: "per BRX",
    badge: "Live Now",
    cta: "Buy BRX",
    highlighted: true,
    color: "#f59e0b",
    glowColor: "rgba(245,158,11,0.35)",
  },
  listing: {
    icon: Crown,
    unit: "est. listing price",
    badge: "Sep 3, 2026",
    cta: "Set Reminder",
    highlighted: false,
    color: "#60a5fa",
    glowColor: "rgba(96,165,250,0.15)",
  },
};

const TIERS: Tier[] = (SALE_STAGES.map((stage) => {
  const ui = TIER_UI_PROPS[stage.id];
  if (!ui) return null;
  const tier: Tier = {
    id: stage.id,
    name: stage.name,
    icon: (ui.icon || Rocket) as React.ElementType,
    price: stage.price,
    unit: ui.unit || "per BRX",
    badge: ui.badge,
    description: stage.description,
    features: stage.features,
    cta: stage.id === "presale" ? `Buy BRX — $${stage.price}` : (ui.cta || "Learn More"),
    highlighted: ui.highlighted || false,
    color: ui.color || "#f59e0b",
    glowColor: ui.glowColor || "rgba(245,158,11,0.2)",
  };
  return tier;
}).filter((t) => t !== null) as Tier[]);

/* ── Feature row ── */
function Feature({ text, color }: { text: string; color: string }) {
  return (
    <li className="flex items-start gap-2.5 text-sm">
      <Check className="h-4 w-4 shrink-0 mt-0.5" style={{ color }} />
      <span style={{ color: "var(--text-muted)" }}>{text}</span>
    </li>
  );
}

/* ── Single card ── */
function TierCard({ tier, index }: { tier: Tier; index: number }) {
  const Icon = tier.icon;

  return (
    <div
      className="relative flex flex-col animate-fade-slide-up-lg"
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      {/* Gold gradient border for highlighted card */}
      <div
        className="relative flex flex-col flex-1 rounded-2xl p-px overflow-hidden"
        style={{
          background: tier.highlighted
            ? "linear-gradient(135deg, rgba(245,158,11,0.5) 0%, rgba(245,158,11,0.08) 50%, rgba(245,158,11,0.3) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
        }}
      >
        <div
          className="relative flex flex-col flex-1 rounded-2xl p-7 overflow-hidden"
          style={{ backgroundColor: "var(--bg-card)" }}
        >
          {/* Sparkles only on highlighted */}
          {tier.highlighted && (
            <Sparkles color="#f59e0b" density={18} minSize={0.8} maxSize={2} speed={0.6} />
          )}

          {/* Ambient glow */}
          <div
            className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full blur-3xl"
            style={{ backgroundColor: tier.glowColor }}
          />

          <div className="relative z-10 flex flex-col flex-1">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: `${tier.color}18`,
                    border: `1px solid ${tier.color}35`,
                    boxShadow: `0 0 12px 2px ${tier.color}25`,
                  }}
                >
                  <Icon className="h-5 w-5" style={{ color: tier.color }} />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: "var(--text-faint)" }}>
                    BitraXx
                  </div>
                  <div className="font-bold font-['Orbitron',sans-serif] text-sm" style={{ color: "var(--text-primary)" }}>
                    {tier.name}
                  </div>
                </div>
              </div>

              {tier.badge && (
                <span
                  className="rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
                  style={{
                    borderColor: `${tier.color}35`,
                    backgroundColor: `${tier.color}12`,
                    color: tier.color,
                  }}
                >
                  {tier.badge}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="mb-2">
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-medium" style={{ color: "var(--text-faint)" }}>$</span>
                <span
                  className="text-4xl font-bold font-['Orbitron',sans-serif]"
                  style={{ color: tier.color }}
                >
                  <NumberFlow
                    value={tier.price}
                    format={{ minimumFractionDigits: 3, maximumFractionDigits: 3 }}
                    animated
                  />
                </span>
              </div>
              <div className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>{tier.unit}</div>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
              {tier.description}
            </p>

            {/* Divider */}
            <div className="h-px w-full mb-5" style={{ backgroundColor: "var(--border)" }} />

            {/* Features */}
            <ul className="space-y-3 flex-1 mb-7">
              {tier.features.map((f) => (
                <Feature key={f} text={f} color={tier.color} />
              ))}
            </ul>

            {/* CTA */}
            <button
              disabled={tier.id === "seed"}
              className="w-full rounded-xl py-3 text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={
                tier.highlighted
                  ? {
                      background: "linear-gradient(135deg, #fcd34d, #f59e0b, #d97706)",
                      boxShadow: "0 0 20px 3px rgba(245,158,11,0.4)",
                      color: "#000",
                    }
                  : {
                      border: `1px solid ${tier.color}35`,
                      backgroundColor: `${tier.color}10`,
                      color: tier.color,
                    }
              }
            >
              {tier.cta}
            </button>
          </div>
        </div>
      </div>

      {/* "Most Popular" label above highlighted card */}
      {tier.highlighted && (
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full border px-4 py-1 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap z-20"
          style={{
            borderColor: "rgba(245,158,11,0.4)",
            backgroundColor: "var(--bg-base)",
            color: "#f59e0b",
          }}
        >
          ⚡ Best Price Available
        </div>
      )}
    </div>
  );
}

/* ── Section ── */
export default function PricingSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-14 animate-fade-slide-up text-center">
          <div
            className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest"
            style={{ borderColor: "rgba(245,158,11,0.25)", backgroundColor: "rgba(245,158,11,0.06)", color: "#f59e0b" }}
          >
            <Zap className="h-3 w-3" />
            Token Pricing
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-['Orbitron',sans-serif]">
            <span className="text-gold">Three Rounds.</span>{" "}
            <span className="text-silver">One Opportunity.</span>
          </h2>
          <p className="mt-3 text-sm max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Each stage offers a higher price than the last. The earlier you enter, the greater your potential upside.
            Price targets are projections, not guarantees.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TIERS.map((tier, i) => (
            <TierCard key={tier.id} tier={tier} index={i} />
          ))}
        </div>

        {/* Disclaimer */}
        <p className="mt-10 text-center text-xs" style={{ color: "var(--text-faint)" }}>
          All prices and dates are subject to change. This is not financial advice.
          Participation in the presale involves significant risk. Past performance does not guarantee future results.
        </p>
      </div>
    </section>
  );
}
