"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Zap, Crown, Star, Hexagon, Triangle, Command, Ghost, Gem, Cpu } from "lucide-react";

const CLIENTS = [
  { name: "Binance",   icon: Hexagon  },
  { name: "Coinbase",  icon: Triangle },
  { name: "Kraken",    icon: Command  },
  { name: "Phantom",   icon: Ghost    },
  { name: "Ledger",    icon: Gem      },
  { name: "Chainlink", icon: Cpu      },
];

// 4K image — full resolution, no width cap
const BG_DARK  = "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/a72ca2f3-9dd1-4fe4-84ba-fe86468a5237_3840w.webp";
// Light mode: a bright futuristic city/tech image from Unsplash (4K)
const BG_LIGHT = "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=3840&q=90&auto=format&fit=crop";

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
    <span className="text-xl font-bold sm:text-2xl text-gold">{value}</span>
    <span className="text-[10px] uppercase tracking-wider font-medium sm:text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>{label}</span>
  </div>
);

export default function HeroSection() {
  const bgRef      = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(true);

  // Sync theme
  useEffect(() => {
    const check = () => setIsDark(!document.documentElement.classList.contains("light"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let scrollY = 0;
    let mouseX  = 0;
    let mouseY  = 0;
    let driftX  = 0;
    let driftY  = 0;
    let driftVX = 0.008;
    let driftVY = 0.005;
    let raf: number;

    // Smooth mouse parallax
    let targetMX = 0;
    let targetMY = 0;
    let currentMX = 0;
    let currentMY = 0;

    const onScroll = () => { scrollY = window.scrollY; };
    const onMouse  = (e: MouseEvent) => {
      targetMX = (e.clientX / window.innerWidth  - 0.5) * 18;
      targetMY = (e.clientY / window.innerHeight - 0.5) * 12;
    };

    const tick = () => {
      if (!bgRef.current) { raf = requestAnimationFrame(tick); return; }

      // Smooth lerp toward mouse position
      currentMX += (targetMX - currentMX) * 0.04;
      currentMY += (targetMY - currentMY) * 0.04;

      // Slow autonomous drift (figure-8 style)
      driftX += driftVX;
      driftY += driftVY;
      if (driftX >  1 || driftX < -1) driftVX *= -1;
      if (driftY >  1 || driftY < -1) driftVY *= -1;
      const autoX = Math.sin(driftX * Math.PI) * 12;
      const autoY = Math.cos(driftY * Math.PI) * 8;

      // Scroll zoom
      const scale = 1 + Math.min(scrollY / 600, 1) * 0.14;

      const tx = currentMX + autoX;
      const ty = currentMY + autoY;

      bgRef.current.style.transform = `scale(${scale}) translate(${tx}px, ${ty}px)`;

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll",    onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse,  { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll",    onScroll);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(raf);
    };
  }, []);

  const bgUrl = isDark ? BG_DARK : BG_LIGHT;

  return (
    <div ref={sectionRef} className="relative w-full overflow-hidden font-sans" style={{ backgroundColor: "var(--bg-base)", color: "var(--text-primary)" }}>
      <style>{`
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes marquee     { from { transform: translateX(0); }               to   { transform: translateX(-50%); } }
        .animate-fade-in  { animation: fadeSlideIn 0.9s ease-out forwards; opacity: 0; }
        .animate-marquee  { animation: marquee 40s linear infinite; }
        .delay-100 { animation-delay: 0.1s;  }
        .delay-200 { animation-delay: 0.2s;  }
        .delay-300 { animation-delay: 0.35s; }
        .delay-400 { animation-delay: 0.5s;  }
        .delay-500 { animation-delay: 0.65s; }
      `}</style>

      {/* ── 4K Background ── */}
      <div
        ref={bgRef}
        className="absolute inset-[-8%] z-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${bgUrl})`,
          opacity: isDark ? 0.30 : 0.18,
          maskImage:         "linear-gradient(180deg, transparent 0%, black 12%, black 78%, transparent 100%)",
          WebkitMaskImage:   "linear-gradient(180deg, transparent 0%, black 12%, black 78%, transparent 100%)",
          transition: "opacity 0.6s ease, background-image 0.6s ease",
        }}
      />

      {/* Light mode: extra blue tint overlay so image doesn't wash out the text */}
      {!isDark && (
        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(219,234,254,0.55) 0%, rgba(186,230,253,0.35) 100%)" }} />
      )}

      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl z-0"
        style={{ backgroundColor: isDark ? "rgba(245,158,11,0.07)" : "rgba(59,130,246,0.10)" }} />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full blur-3xl z-0"
        style={{ backgroundColor: isDark ? "rgba(217,119,6,0.05)" : "rgba(59,130,246,0.08)" }} />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 md:pt-32 md:pb-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-start">

          {/* ── LEFT ── */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 pt-8">

            {/* Badge */}
            <div className="animate-fade-in delay-100">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/8 px-4 py-1.5 backdrop-blur-md">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
                </span>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-amber-300 flex items-center gap-2">
                  BRX Presale Live
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                </span>
              </div>
            </div>

            {/* Heading */}
            <h1 className="animate-fade-in delay-200 font-['Orbitron',sans-serif] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05]">
              <span className="text-silver">The Future of</span><br />
              <span className="text-gold">Decentralized</span><br />
              <span className="text-silver">Trading</span>
            </h1>

            {/* Description */}
            <p className="animate-fade-in delay-300 max-w-xl text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              BitraXx combines institutional-grade matching speed with DeFi freedom.
              Join the presale and secure BRX at the lowest price before public listing.
            </p>

            {/* CTAs */}
            <div className="animate-fade-in delay-400 flex flex-col sm:flex-row gap-4">
              <button
                className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-black transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #fcd34d 0%, #f59e0b 60%, #d97706 100%)", boxShadow: "0 0 24px 4px rgba(245,158,11,0.4)" }}
              >
                Buy BRX Now
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="group inline-flex items-center justify-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/5 px-8 py-4 text-sm font-semibold text-amber-300 backdrop-blur-sm transition-all hover:bg-amber-500/10 hover:border-amber-500/40">
                <Zap className="w-4 h-4 text-amber-400" />
                View Tokenomics
              </button>
            </div>

            {/* Trust line */}
            <div className="animate-fade-in delay-500 flex items-center gap-3 text-xs" style={{ color: "var(--text-faint)" }}>
              <Crown className="h-3.5 w-3.5 text-amber-600" />
              <span>Audited by CertiK · KYC Verified · Smart Contract on Ethereum</span>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="lg:col-span-5 space-y-5 lg:mt-8">

            {/* Stats card */}
            <div className="animate-fade-in delay-400 relative overflow-hidden rounded-2xl p-px"
              style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.3) 0%, rgba(245,158,11,0.05) 50%, rgba(245,158,11,0.15) 100%)" }}>
              <div className="relative rounded-2xl p-7 backdrop-blur-xl" style={{ backgroundColor: "var(--bg-card)" }}>
                <div className="pointer-events-none absolute top-0 right-0 -mr-10 -mt-10 h-48 w-48 rounded-full bg-amber-500/8 blur-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-amber-500/30"
                      style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))" }}>
                      <Crown className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold font-['Orbitron',sans-serif]" style={{ color: "var(--text-primary)" }}>$4.2M</div>
                      <div className="text-xs" style={{ color: "var(--text-faint)" }}>Total Raised</div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs">
                      <span style={{ color: "var(--text-faint)" }}>Stage 2 Progress</span>
                      <span className="text-amber-400 font-semibold">78%</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: "var(--track-bg)" }}>
                      <div className="h-full w-[78%] rounded-full"
                        style={{ background: "linear-gradient(90deg, #f59e0b, #fcd34d)", boxShadow: "0 0 10px 2px rgba(245,158,11,0.5)" }} />
                    </div>
                  </div>

                  <div className="h-px w-full mb-5" style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.2), transparent)" }} />

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <StatItem value="$0.042" label="Price" />
                    <div className="w-px mx-auto" style={{ backgroundColor: "var(--border)" }} />
                    <StatItem value="12.8K" label="Holders" />
                    <div className="w-px mx-auto" style={{ backgroundColor: "var(--border)" }} />
                    <StatItem value="14d" label="Left" />
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/8 px-3 py-1 text-[10px] font-semibold tracking-wide text-amber-300">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
                      </span>
                      LIVE
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold tracking-wide"
                      style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "var(--bg-card-alt)" }}>
                      <Crown className="w-3 h-3 text-amber-500" />
                      STAGE 2
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Marquee card */}
            <div className="animate-fade-in delay-500 relative overflow-hidden rounded-2xl border py-6 backdrop-blur-xl"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
              <p className="mb-4 px-6 text-[11px] font-medium uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>
                Trusted by
              </p>
              <div className="relative flex overflow-hidden"
                style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}>
                <div className="animate-marquee flex gap-10 whitespace-nowrap px-4">
                  {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => (
                    <div key={i} className="flex items-center gap-2 opacity-30 transition-all hover:opacity-70 cursor-default">
                      <client.icon className="h-4 w-4 text-amber-400" />
                      <span className="text-sm font-semibold tracking-tight" style={{ color: "var(--text-secondary)" }}>{client.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
