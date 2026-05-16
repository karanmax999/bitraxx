"use client";

import React from "react";
import { TrendingUp, Users, DollarSign, Clock } from "lucide-react";

const STATS = [
  { icon: DollarSign, value: "$4.2M",  label: "Total Raised",   accent: "text-amber-400", glow: "rgba(245,158,11,0.2)"  },
  { icon: Users,      value: "12,840", label: "Participants",    accent: "text-amber-300", glow: "rgba(245,158,11,0.15)" },
  { icon: TrendingUp, value: "$0.042", label: "Token Price",     accent: "text-amber-400", glow: "rgba(245,158,11,0.2)"  },
  { icon: Clock,      value: "14d 6h", label: "Time Remaining",  accent: "text-amber-300", glow: "rgba(245,158,11,0.15)" },
];

export default function StatsSection() {
  return (
    <section className="bg-[var(--bg-base)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map(({ icon: Icon, value, label, accent, glow }) => (
            <div key={label}
              className="glass-panel group relative overflow-hidden rounded-2xl border border-amber-500/10 p-6 transition-all hover:-translate-y-1 hover:border-amber-500/20"
              style={{ boxShadow: `0 0 0 0 ${glow}`, transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 8px 32px 0 ${glow}`)}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 0 0 ${glow}`)}>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Icon className={`mb-4 h-5 w-5 ${accent}`} />
              <div className={`text-2xl font-bold sm:text-3xl font-['Orbitron',sans-serif] ${accent}`}>{value}</div>
              <div className="mt-1.5 text-[11px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
