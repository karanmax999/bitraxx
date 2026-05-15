"use client";

import React, { useEffect, useState } from "react";
import { Zap } from "lucide-react";

const RAISED = 4_200_000;
const HARD_CAP = 10_000_000;
const PERCENTAGE = Math.round((RAISED / HARD_CAP) * 100);

function formatUSD(n: number) {
  return n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(1)}M`
    : `$${(n / 1_000).toFixed(0)}K`;
}

export default function ProgressSection() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(PERCENTAGE), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="bg-zinc-950 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-10">
          {/* Stage label */}
          <div className="mb-6 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-300">
              <Zap className="h-3 w-3" />
              Stage 2 — Active
            </div>
            <span className="text-sm font-semibold text-white">{PERCENTAGE}% Filled</span>
          </div>

          {/* Progress bar */}
          <div className="relative h-4 w-full overflow-hidden rounded-full bg-zinc-800/60">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-1000 ease-out"
              style={{
                width: `${width}%`,
                boxShadow: "0 0 16px 2px rgba(139,92,246,0.6), 0 0 32px 4px rgba(34,211,238,0.3)",
              }}
            />
          </div>

          {/* Amounts */}
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-zinc-400">
              Raised: <span className="font-semibold text-white">{formatUSD(RAISED)}</span>
            </span>
            <span className="text-zinc-400">
              Hard Cap: <span className="font-semibold text-white">{formatUSD(HARD_CAP)}</span>
            </span>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <p className="mb-4 text-sm text-zinc-400">
              Don&apos;t miss Stage 2 pricing — ends in <span className="font-semibold text-white">14 days</span>
            </p>
            <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:scale-[1.03] hover:opacity-90 active:scale-[0.98]">
              Buy Tokens Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
