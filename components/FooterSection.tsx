import React from "react";
import { Twitter, Send, MessageCircle, ExternalLink } from "lucide-react";

const NAV_LINKS    = ["Whitepaper", "Audit", "FAQ", "Contact"];
const SOCIAL_LINKS = [
  { label: "Twitter / X", icon: Twitter,       href: "#" },
  { label: "Telegram",    icon: Send,           href: "#" },
  { label: "Discord",     icon: MessageCircle,  href: "#" },
];

function BitraXxWordmark() {
  return (
    <svg width="130" height="32" viewBox="0 0 210 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="BitraXx">
      <defs>
        <linearGradient id="ft-silver" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" /><stop offset="100%" stopColor="#a1a1aa" />
        </linearGradient>
        <linearGradient id="ft-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fcd34d" /><stop offset="100%" stopColor="#92400e" />
        </linearGradient>
        <linearGradient id="ft-sl" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#71717a" stopOpacity="0" /><stop offset="100%" stopColor="#71717a" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="ft-sr" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#71717a" stopOpacity="0.4" /><stop offset="100%" stopColor="#71717a" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[-5,-2,1,4,7].map((dy,i) => <line key={`l${i}`} x1="2" y1={25+dy} x2="36" y2={25+dy*0.25} stroke="url(#ft-sl)" strokeWidth="0.7" />)}
      {[-5,-2,1,4,7].map((dy,i) => <line key={`r${i}`} x1="174" y1={25+dy*0.25} x2="208" y2={25+dy} stroke="url(#ft-sr)" strokeWidth="0.7" />)}
      <text x="38" y="38" fontFamily="'Orbitron','Arial Black',sans-serif" fontWeight="700" fontSize="27" fill="url(#ft-silver)" letterSpacing="-0.5">Bitra</text>
      <text x="130" y="39" fontFamily="'Orbitron','Arial Black',sans-serif" fontWeight="800" fontSize="29" fill="url(#ft-gold)" letterSpacing="-1">Xx</text>
    </svg>
  );
}

export default function FooterSection() {
  return (
    <footer className="border-t border-amber-500/10 bg-[var(--bg-base)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <BitraXxWordmark />

          <nav className="flex flex-wrap justify-center gap-6">
            {NAV_LINKS.map(label => (
              <a key={label} href="#"
                className="inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-amber-300">
                {label}
                <ExternalLink className="h-3 w-3 opacity-40" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ label, icon: Icon, href }) => (
              <a key={label} href={href} aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-500/15 bg-amber-500/5 text-zinc-500 transition-all hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-300">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-amber-500/8 pt-8 text-center text-xs text-zinc-700 leading-relaxed max-w-2xl mx-auto">
          This presale is not available to residents of the United States, China, or other restricted jurisdictions.
          Participation involves significant risk. This is not financial advice.
          &copy; {new Date().getFullYear()} BitraXx. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
