"use client";

import React, { useEffect, useRef, useState } from "react";
import { Zap, Info } from "lucide-react";
import PresaleCountdown from "@/components/PresaleCountdown";
import { TOKEN_CONFIG, getCurrentStage } from "@/config/tokenSale";

const currentStage = getCurrentStage();
const STAGE_NAME = currentStage?.name || "Presale";
const STAGE_RAISED = currentStage?.tokensRaised || 0;
const STAGE_TOTAL = currentStage?.allocation || 0;
const SOFT_CAP_PCT = TOKEN_CONFIG.softCapPct;
const OVERALL_RAISED = TOKEN_CONFIG.overallRaisedUSD;
const HARD_CAP_USD = TOKEN_CONFIG.hardCapUSD;
const REMAINING = STAGE_TOTAL - STAGE_RAISED;
const STAGE_PCT = STAGE_TOTAL > 0 ? Math.round((STAGE_RAISED / STAGE_TOTAL) * 100) : 0;
const DEADLINE =
  currentStage && currentStage.endDate !== "TBD" && currentStage.endDate !== "—"
    ? Date.parse(currentStage.endDate)
    : Date.now() + 14 * 24 * 60 * 60 * 1000;

function fmt(n: number) {
  return n.toLocaleString("en-US");
}
function fmtUSD(n: number) {
  return n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` : `$${(n / 1_000).toFixed(0)}K`;
}

export default function PresaleProgress() {
  const [barWidth, setBarWidth] = useState(0);
  const [tooltip, setTooltip] = useState<{ x: number; visible: boolean }>({ x: 0, visible: false });
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setBarWidth(STAGE_PCT), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="bg-[var(--bg-base)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-5">
        <div className="mb-10 text-center">
          <h2 className="font-orbitron text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="text-gold">Presale</span> Progress
          </h2>
          <p className="mt-3 text-sm text-zinc-500">Live data will be pulled from smart contract in v2</p>
        </div>

        <div
          className="relative overflow-hidden rounded-2xl p-px"
          style={{
            background:
              "linear-gradient(135deg, rgba(245,158,11,0.25) 0%, rgba(245,158,11,0.04) 50%, rgba(245,158,11,0.12) 100%)",
          }}
        >
          <div className="relative rounded-2xl bg-[var(--bg-card)] p-8 sm:p-10">
            <div className="pointer-events-none absolute -top-24 -right-24 hidden h-64 w-64 rounded-full bg-amber-500/6 blur-3xl md:block" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 hidden h-64 w-64 rounded-full bg-amber-600/4 blur-3xl md:block" />

            <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/8 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-300">
                <Zap className="h-3 w-3" />
                {STAGE_NAME} — Active
              </div>
              <span className="font-orbitron text-sm font-bold text-amber-400">{STAGE_PCT}% Sold</span>
            </div>

            <div
              ref={barRef}
              className="relative h-5 w-full cursor-crosshair overflow-visible rounded-full bg-zinc-800/70"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setTooltip({ x: e.clientX - r.left, visible: true });
              }}
              onMouseLeave={() => setTooltip((t) => ({ ...t, visible: false }))}
            >
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${barWidth}%`,
                  background: "linear-gradient(90deg, #d97706, #f59e0b, #fcd34d)",
                  boxShadow: "0 0 20px 4px rgba(245,158,11,0.5), 0 0 40px 8px rgba(245,158,11,0.2)",
                }}
              />

              <div className="absolute bottom-0 top-0 w-px bg-zinc-500/40" style={{ left: `${SOFT_CAP_PCT}%` }}>
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-zinc-600">
                  Soft Cap
                </span>
              </div>
              <div className="absolute bottom-0 top-0 w-px bg-zinc-600/30" style={{ left: "99.5%" }}>
                <span className="absolute -top-6 right-0 whitespace-nowrap text-[10px] text-zinc-600">Hard Cap</span>
              </div>

              {tooltip.visible && (
                <div
                  className="pointer-events-none absolute -top-16 z-10 -translate-x-1/2 whitespace-nowrap rounded-xl border border-amber-500/20 bg-[var(--bg-card-alt)] px-3 py-2 text-xs text-white shadow-xl"
                  style={{ left: tooltip.x }}
                >
                  <div className="font-semibold text-amber-300">{fmt(STAGE_RAISED)} BRX sold</div>
                  <div className="text-zinc-500">of {fmt(STAGE_TOTAL)} BRX allocated</div>
                  <div className="absolute -bottom-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b border-r border-amber-500/20 bg-[var(--bg-card-alt)]" />
                </div>
              )}
            </div>

            <div className="mt-5 flex flex-wrap justify-between gap-2 text-sm">
              <span className="text-zinc-500">
                Raised: <span className="font-semibold text-amber-300">{fmtUSD(OVERALL_RAISED)}</span>
              </span>
              <span className="text-zinc-500">
                Hard Cap: <span className="font-semibold text-zinc-300">{fmtUSD(HARD_CAP_USD)}</span>
              </span>
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-500/10 bg-amber-500/[0.04] px-5 py-4">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <div>
                <span className="text-sm text-zinc-300">
                  Remaining in {STAGE_NAME}: <span className="font-bold text-amber-300">{fmt(REMAINING)} BRX</span>
                </span>
                <p className="mt-0.5 text-[11px] italic text-zinc-700">Will update live from smart contract in v2.</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                className="inline-flex items-center gap-2 rounded-full px-10 py-3.5 text-sm font-bold text-black transition-all hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #fcd34d, #f59e0b, #d97706)",
                  boxShadow: "0 0 24px 4px rgba(245,158,11,0.4)",
                }}
              >
                Buy BRX Now
              </button>
            </div>
          </div>
        </div>

        <PresaleCountdown deadline={DEADLINE} />
      </div>
    </section>
  );
}
