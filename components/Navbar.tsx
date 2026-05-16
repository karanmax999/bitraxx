"use client";

import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";
import WalletConnect from "@/components/WalletConnect";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const NAV_LINKS = [
  { label: "Home page",  href: "#hero"       },
  { label: "Presale",    href: "#presale"     },
  { label: "Tokenomics", href: "#tokenomics"  },
  { label: "BRX Utility",href: "#utility"     },
  { label: "Stages",     href: "#stages"      },
  { label: "Roadmap",    href: "#roadmap"     },
  { label: "Whitepaper", href: "#whitepaper"  },
];

function DotsGrid() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      {[0,1,2].flatMap(r => [0,1,2].map(c => (
        <rect key={`${r}-${c}`} x={1 + c * 7} y={1 + r * 7} width="3" height="3" rx="0.8" />
      )))}
    </svg>
  );
}

/**
 * BitraXx SVG wordmark
 * "Bitra" — silver gradient, Orbitron bold
 * "Xx"    — gold/amber gradient, slightly larger
 * Speed-line swooshes left & right
 */
function BitraXxLogo({ height = 36 }: { height?: number }) {
  const aspect = 210 / 50;
  const w = Math.round(height * aspect);
  return (
    <svg
      width={w}
      height={height}
      viewBox="0 0 210 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="BitraXx"
    >
      <defs>
        <linearGradient id="bx-silver" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#ffffff" />
          <stop offset="45%"  stopColor="#d4d4d8" />
          <stop offset="100%" stopColor="#a1a1aa" />
        </linearGradient>
        <linearGradient id="bx-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#fcd34d" />
          <stop offset="50%"  stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
        <linearGradient id="bx-swoosh-l" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#71717a" stopOpacity="0"   />
          <stop offset="100%" stopColor="#71717a" stopOpacity="0.45"/>
        </linearGradient>
        <linearGradient id="bx-swoosh-r" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#71717a" stopOpacity="0.45"/>
          <stop offset="100%" stopColor="#71717a" stopOpacity="0"   />
        </linearGradient>
      </defs>

      {/* Left swooshes */}
      {([-6,-3,0,3,6] as number[]).map((dy, i) => (
        <line key={`ls${i}`}
          x1="2"  y1={25 + dy}
          x2={36} y2={25 + dy * 0.25}
          stroke="url(#bx-swoosh-l)" strokeWidth="0.7" />
      ))}

      {/* Right swooshes */}
      {([-6,-3,0,3,6] as number[]).map((dy, i) => (
        <line key={`rs${i}`}
          x1={174} y1={25 + dy * 0.25}
          x2={208} y2={25 + dy}
          stroke="url(#bx-swoosh-r)" strokeWidth="0.7" />
      ))}

      {/* "Bitra" */}
      <text
        x="38" y="38"
        fontFamily="'Orbitron', 'Arial Black', sans-serif"
        fontWeight="700"
        fontSize="27"
        fill="url(#bx-silver)"
        letterSpacing="-0.5"
      >
        Bitra
      </text>

      {/* "Xx" */}
      <text
        x="130" y="39"
        fontFamily="'Orbitron', 'Arial Black', sans-serif"
        fontWeight="800"
        fontSize="29"
        fill="url(#bx-gold)"
        letterSpacing="-1"
      >
        Xx
      </text>
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <>
      {/* ── Top bar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b backdrop-blur-md"
        style={{ backgroundColor: "var(--nav-bg)", borderBottomColor: "var(--nav-border)" }}>
        <div className="flex h-full items-center justify-between px-5">

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/5 hover:text-white"
            >
              <DotsGrid />
            </button>

            <a href="#hero" className="flex items-center transition-opacity hover:opacity-80">
              <BitraXxLogo height={30} />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <AnimatedThemeToggler sound={false} />
            <WalletConnect variant="outline" />
          </div>
        </div>
      </header>

      {/* ── Backdrop ── */}
      <div
        onClick={() => setDrawerOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ── Drawer ── */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-[200px] flex-col overflow-hidden
          border-r transition-transform duration-300 ease-in-out
          ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ backgroundColor: "var(--bg-card)", borderRightColor: "var(--border)" }}
      >
        <div className="flex flex-col gap-4 px-5 pt-4 pb-5" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            className="self-start transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            <DotsGrid />
          </button>
          <a href="#hero" onClick={() => setDrawerOpen(false)}>
            <BitraXxLogo height={26} />
          </a>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setDrawerOpen(false)}
              className="group flex items-center gap-3 px-5 py-[11px] text-[13.5px]
                transition-colors hover:text-amber-400"
              style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border-subtle)" }}
            >
              <span className="h-[5px] w-[5px] rounded-full flex-shrink-0 transition-colors"
                style={{ border: "1px solid var(--text-faint)" }} />
              {link.label}
            </a>
          ))}
        </nav>

        <div className="px-5 py-5" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <p className="mb-3 text-[11px] font-medium tracking-wide" style={{ color: "var(--text-faint)" }}>
            Join Our Socials
          </p>
          <div className="flex items-center gap-4">
            {[
              { label: "Telegram", icon: <Send className="h-[17px] w-[17px]" /> },
              { label: "LinkedIn", icon: <LinkedInIcon /> },
              { label: "X",        icon: <XIcon /> },
            ].map(({ label, icon }) => (
              <a key={label} href="#" aria-label={label}
                className="transition-colors hover:text-amber-400"
                style={{ color: "var(--text-muted)" }}>
                {icon}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
