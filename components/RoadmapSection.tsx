"use client";

import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";

type Milestone = { quarter: string; title: string; description: string; completed: boolean; };

const MILESTONES: Milestone[] = [
  { quarter: "Q1 2024", title: "Project Launch",        description: "Whitepaper release, team formation, smart contract development and audit.", completed: true  },
  { quarter: "Q2 2024", title: "Presale Begins",        description: "Stage 1 & 2 presale, community building, exchange listing applications.",  completed: true  },
  { quarter: "Q3 2024", title: "DEX Listing",           description: "Token launch on Uniswap and PancakeSwap, liquidity pool creation.",         completed: false },
  { quarter: "Q4 2024", title: "CEX & Ecosystem",       description: "Major centralized exchange listings, staking platform, governance launch.", completed: false },
];

function MilestoneContent({ milestone }: { milestone: Milestone }) {
  return (
    <div className={`rounded-2xl p-px max-w-sm w-full ${milestone.completed
      ? "bg-gradient-to-br from-amber-500/20 to-amber-500/05"
      : "bg-gradient-to-br from-zinc-700/20 to-zinc-700/05"}`}>
        <div className="rounded-2xl bg-[var(--bg-card)] p-5">
        <div className="mb-2 flex items-center gap-2">
          <span className={`text-xs font-bold uppercase tracking-widest font-['Orbitron',sans-serif] ${milestone.completed ? "text-amber-400" : "text-zinc-600"}`}>
            {milestone.quarter}
          </span>
          {milestone.completed && (
            <span className="rounded-full border border-amber-500/20 bg-amber-500/8 px-2 py-0.5 text-[10px] font-bold text-amber-400">Done</span>
          )}
        </div>
        <div className="mb-1.5 font-semibold text-zinc-200">{milestone.title}</div>
        <div className="text-sm text-zinc-500 leading-relaxed">{milestone.description}</div>
      </div>
    </div>
  );
}

function MilestoneCard({ milestone, index }: { milestone: Milestone; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isLeft = index % 2 === 0;

  return (
    <div ref={ref}
      className={`relative flex items-center gap-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 130}ms` }}>

      <div className={`hidden lg:flex lg:w-[calc(50%-2rem)] ${isLeft ? "justify-end" : "invisible"}`}>
        {isLeft && <MilestoneContent milestone={milestone} />}
      </div>

      {/* Center node */}
      <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
      milestone.completed ? "border-amber-500/40 bg-[var(--bg-card)]" : "border-zinc-700/50 bg-[var(--bg-card)]"
      }`} style={milestone.completed ? { boxShadow: "0 0 12px 2px rgba(245,158,11,0.25)" } : {}}>
        {milestone.completed
          ? <CheckCircle2 className="h-5 w-5 text-amber-400" />
          : <Circle className="h-5 w-5 text-zinc-700" />}
      </div>

      <div className={`w-full lg:w-[calc(50%-2rem)] ${!isLeft ? "lg:flex" : "lg:invisible hidden lg:block"}`}>
        <div className="lg:hidden w-full"><MilestoneContent milestone={milestone} /></div>
        {!isLeft && <div className="hidden lg:block"><MilestoneContent milestone={milestone} /></div>}
      </div>
    </div>
  );
}

export default function RoadmapSection() {
  return (
    <section className="bg-[var(--bg-base)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-['Orbitron',sans-serif]">
            <span className="text-gold">Road</span><span className="text-silver">map</span>
          </h2>
          <p className="mt-3 text-sm text-zinc-500">Our path from launch to full ecosystem.</p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 h-full w-px lg:left-1/2"
            style={{ background: "linear-gradient(180deg, transparent, rgba(245,158,11,0.2) 20%, rgba(245,158,11,0.2) 80%, transparent)" }} />

          <div className="space-y-10">
            {MILESTONES.map((m, i) => <MilestoneCard key={m.quarter} milestone={m} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
