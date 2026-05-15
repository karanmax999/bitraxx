import React from "react";
import { Zap, Globe, Shield, Coins } from "lucide-react";

const STATS = [
  { icon: Coins,  value: "200M",  label: "Total BRX Supply",         color: "text-amber-400" },
  { icon: Zap,    value: "1M/s",  label: "Orders / Second Matching",  color: "text-amber-300" },
  { icon: Globe,  value: "76",    label: "Countries Covered",         color: "text-amber-400" },
  { icon: Shield, value: "40%",   label: "BitRaxx Shield Protection", color: "text-amber-300" },
];

export default function CredibilityBand() {
  return (
    <div className="relative overflow-hidden border-y border-amber-500/10 bg-[var(--bg-base)]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-x divide-amber-500/8 lg:grid-cols-4">
          {STATS.map(({ icon: Icon, value, label, color }) => (
            <div key={label}
              className="group flex flex-col items-center justify-center gap-2.5 px-6 py-9 text-center transition-colors hover:bg-amber-500/[0.03]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/15 bg-amber-500/5 transition-transform group-hover:-translate-y-0.5"
                style={{ boxShadow: "0 0 16px 2px rgba(245,158,11,0.1)" }}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <span className={`text-2xl font-bold tracking-tight font-['Orbitron',sans-serif] sm:text-3xl ${color}`}>
                {value}
              </span>
              <span className="text-xs leading-snug max-w-[130px]" style={{ color: "var(--text-muted)" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
