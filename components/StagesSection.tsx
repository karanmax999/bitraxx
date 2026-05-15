"use client";

import React from "react";
import { CheckCircle2, Zap, Lock, TrendingUp, AlertTriangle } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";

import { SALE_STAGES, StageStatus } from "@/config/tokenSale";

const GLOW_COLORS: Record<string, "gold" | "orange" | "blue" | "purple"> = {
  seed: "gold",
  presale: "orange",
  listing: "blue",
};

const PROJECTIONS: Record<string, { target: string; note: string }> = {
  listing: { target: "$0.05 → $0.25", note: "Price targets are projections, not guarantees." },
};

function fmtNum(n: number) { return n >= 1_000_000 ? `${n / 1_000_000}M BRX` : n === 0 ? "Open Market" : n.toLocaleString(); }
function fmtUSD(n: number) { return n === 0 ? "—" : `$${n.toLocaleString()}`; }

const STATUS_META: Record<StageStatus, { label: string; dot: string; badge: string; icon: React.ReactNode }> = {
  completed: {
    label: "Completed",
    dot: "bg-amber-500",
    badge: "border-amber-500/20 bg-amber-500/8 text-amber-400",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
  live: {
    label: "Live Now",
    dot: "bg-emerald-400",
    badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    icon: <Zap className="h-3.5 w-3.5" />,
  },
  upcoming: {
    label: "Upcoming",
    dot: "bg-blue-400",
    badge: "border-blue-500/25 bg-blue-500/8 text-blue-300",
    icon: <Lock className="h-3.5 w-3.5" />,
  },
};

function ProgressBar({ pct, status }: { pct: number; status: StageStatus }) {
  const gradient =
    status === "completed" ? "linear-gradient(90deg, #d97706, #f59e0b, #fcd34d)" :
    status === "live"      ? "linear-gradient(90deg, #059669, #10b981, #34d399)" :
                             "linear-gradient(90deg, #1d4ed8, #3b82f6, #60a5fa)";
  const glow =
    status === "completed" ? "rgba(245,158,11,0.5)" :
    status === "live"      ? "rgba(16,185,129,0.5)" :
                             "rgba(59,130,246,0.4)";
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: "var(--track-bg)" }}>
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${pct}%`, background: gradient, boxShadow: `0 0 8px 1px ${glow}` }}
      />
    </div>
  );
}

export default function StagesSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-['Orbitron',sans-serif]">
            <span className="text-gold">Presale</span>{" "}
            <span className="text-silver">Stages</span>
          </h2>
          <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>
            Three rounds. One opportunity. Secure BRX before public listing.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {SALE_STAGES.map((stage) => {
            const meta = STATUS_META[stage.status];
            const isLive = stage.status === "live";
            const isCompleted = stage.status === "completed";
            const glowColor = GLOW_COLORS[stage.id] || "blue";
            const projection = PROJECTIONS[stage.id];

            return (
              <GlowCard
                key={stage.id}
                glowColor={glowColor}
                customSize
                className={`p-0 flex flex-col ${isCompleted ? "opacity-80" : ""}`}
              >
                {/* Card inner — uses CSS var for bg so it themes correctly */}
                <div
                  className="flex flex-col h-full rounded-2xl p-6 gap-5"
                  style={{ backgroundColor: "var(--bg-card)" }}
                >
                  {/* Top row: name + status badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-widest mb-1"
                        style={{ color: "var(--text-faint)" }}>
                        {stage.subtitle}
                      </div>
                      <div className="text-lg font-bold font-['Orbitron',sans-serif]"
                        style={{ color: "var(--text-primary)" }}>
                        {stage.name}
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest shrink-0 ${meta.badge}`}>
                      {isLive && (
                        <span className="relative flex h-1.5 w-1.5">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${meta.dot} opacity-75`} />
                          <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                        </span>
                      )}
                      {!isLive && meta.icon}
                      {meta.label}
                    </span>
                  </div>

                  {/* Price */}
                  <div>
                    <div className="text-3xl font-bold font-['Orbitron',sans-serif] text-gold">
                      {stage.id === "listing" ? "$0.05 – $0.25" : `$${stage.price}`}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>per BRX token</div>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full" style={{ backgroundColor: "var(--border)" }} />

                  {/* Details grid */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {[
                      { label: "Allocation", value: fmtNum(stage.allocation) },
                      { label: "Pool Share",  value: stage.allocationPct > 0 ? `${stage.allocationPct}%` : "—" },
                      { label: "Target Raise", value: fmtUSD(stage.raiseUSD) },
                      { label: "Start Date",  value: stage.startDate },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <div className="text-[10px] uppercase tracking-widest mb-0.5"
                          style={{ color: "var(--text-faint)" }}>{label}</div>
                        <div className="font-semibold text-sm" style={{ color: "var(--text-secondary)" }}>{value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Progress bar (only for seed + private) */}
                  {stage.filledPct > 0 && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span style={{ color: "var(--text-muted)" }}>Filled</span>
                        <span className="font-bold text-amber-400">{stage.filledPct}%</span>
                      </div>
                      <ProgressBar pct={stage.filledPct} status={stage.status} />
                    </div>
                  )}

                  {/* Projection note for listing */}
                  {projection && (
                    <div className="rounded-xl border border-blue-500/15 bg-blue-500/5 px-4 py-3 space-y-1.5">
                      <div className="flex items-center gap-2 text-sm font-semibold text-blue-300">
                        <TrendingUp className="h-4 w-4" />
                        Price Target: {projection.target}
                      </div>
                      <div className="flex items-start gap-1.5 text-[11px]" style={{ color: "var(--text-faint)" }}>
                        <AlertTriangle className="h-3 w-3 shrink-0 mt-0.5 text-amber-600" />
                        {projection.note}
                      </div>
                    </div>
                  )}

                  {/* CTA — only on live stage */}
                  {isLive && (
                    <button
                      className="mt-auto w-full rounded-xl py-3 text-sm font-bold text-black transition-all hover:opacity-90 active:scale-[0.98]"
                      style={{
                        background: "linear-gradient(135deg, #fcd34d, #f59e0b, #d97706)",
                        boxShadow: "0 0 20px 3px rgba(245,158,11,0.4)",
                      }}
                    >
                      Buy BRX — ${stage.price}
                    </button>
                  )}

                  {isCompleted && (
                    <div className="mt-auto flex items-center gap-2 text-xs text-amber-500 font-medium">
                      <CheckCircle2 className="h-4 w-4" />
                      Sold out — Stage closed
                    </div>
                  )}
                </div>
              </GlowCard>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="mt-10 text-center text-xs" style={{ color: "var(--text-faint)" }}>
          All dates and allocations are subject to change. This is not financial advice.
          Participation in the presale involves significant risk.
        </p>
      </div>
    </section>
  );
}
