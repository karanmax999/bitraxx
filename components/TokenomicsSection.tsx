"use client";

import React from "react";
import { GlowCard } from "@/components/ui/spotlight-card";
import { TOKEN_CONFIG } from "@/config/tokenSale";

const ALLOCATIONS = [
  { label: "Presale",         pct: 35, color: "#f59e0b", glow: "gold"   as const },
  { label: "Liquidity",       pct: 20, color: "#d4d4d8", glow: "blue"   as const },
  { label: "Team & Advisors", pct: 15, color: "#d97706", glow: "orange" as const },
  { label: "Marketing",       pct: 15, color: "#a1a1aa", glow: "purple" as const },
  { label: "Reserve",         pct: 10, color: "#92400e", glow: "gold"   as const },
  { label: "Ecosystem",       pct: 5,  color: "#71717a", glow: "blue"   as const },
];

export default function TokenomicsSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-['Orbitron',sans-serif]">
            <span className="text-gold">Token</span><span className="text-silver">omics</span>
          </h2>
          <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>
            Total Supply:{" "}
            <span className="font-semibold text-amber-400">
              {TOKEN_CONFIG.totalSupply.toLocaleString()} {TOKEN_CONFIG.symbol}
            </span>
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ALLOCATIONS.map(({ label, pct, color, glow }) => (
            <GlowCard key={label} glowColor={glow} customSize className="p-0">
              <div
                className="flex flex-col gap-4 rounded-2xl p-6 h-full"
                style={{ backgroundColor: "var(--bg-card)" }}
              >
                {/* Label + percentage */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                      {label}
                    </span>
                  </div>
                  <span
                    className="text-xl font-bold font-['Orbitron',sans-serif]"
                    style={{ color }}
                  >
                    {pct}%
                  </span>
                </div>

                {/* Bar */}
                <div
                  className="h-2 w-full overflow-hidden rounded-full"
                  style={{ backgroundColor: "var(--track-bg)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, ${color}99, ${color})`,
                      boxShadow: `0 0 8px 1px ${color}55`,
                    }}
                  />
                </div>

                {/* Token count */}
                <div className="text-xs" style={{ color: "var(--text-faint)" }}>
                  {(pct * 10_000_000).toLocaleString()} BRX
                </div>
              </div>
            </GlowCard>
          ))}
        </div>

        {/* Visual total bar */}
        <div className="mt-12 rounded-2xl border p-6" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>
            Allocation Overview
          </p>
          <div className="flex h-4 w-full overflow-hidden rounded-full gap-px">
            {ALLOCATIONS.map(({ label, pct, color }) => (
              <div
                key={label}
                title={`${label}: ${pct}%`}
                className="h-full transition-all duration-700 first:rounded-l-full last:rounded-r-full"
                style={{ width: `${pct}%`, backgroundColor: color }}
              />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {ALLOCATIONS.map(({ label, pct, color }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                {label} {pct}%
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
