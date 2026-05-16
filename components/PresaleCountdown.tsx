"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

function useCountdown(target: number) {
  const calc = () => {
    const d = Math.max(0, target - Date.now());
    return {
      d: Math.floor(d / 86400000),
      h: Math.floor((d % 86400000) / 3600000),
      m: Math.floor((d % 3600000) / 60000),
      s: Math.floor((d % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-xl border border-amber-500/20 bg-[var(--bg-card)] font-orbitron text-2xl font-bold tabular-nums text-amber-300"
        style={{ boxShadow: "0 0 12px 2px rgba(245,158,11,0.12)" }}
        suppressHydrationWarning
      >
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-[10px] uppercase tracking-widest text-zinc-600">{label}</span>
    </div>
  );
}

export default function PresaleCountdown({ deadline }: { deadline: number }) {
  const countdown = useCountdown(deadline);

  return (
    <div className="glass-panel rounded-2xl border border-amber-500/10 px-6 py-6">
      <div className="mb-5 flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-zinc-600">
        <Clock className="h-3.5 w-3.5 text-amber-600" />
        Stage ends in
      </div>
      <div className="flex items-center justify-center gap-3">
        <CountdownUnit value={countdown.d} label="Days" />
        <span className="mb-5 text-2xl font-bold text-amber-800">:</span>
        <CountdownUnit value={countdown.h} label="Hours" />
        <span className="mb-5 text-2xl font-bold text-amber-800">:</span>
        <CountdownUnit value={countdown.m} label="Min" />
        <span className="mb-5 text-2xl font-bold text-amber-800">:</span>
        <CountdownUnit value={countdown.s} label="Sec" />
      </div>
    </div>
  );
}
