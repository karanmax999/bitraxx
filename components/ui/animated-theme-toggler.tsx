"use client";

import { useState, useEffect, useRef } from "react";

export interface AnimatedThemeTogglerProps {
  sound?: boolean;
}

/* ── Audio ── */
let _ctx: AudioContext | null = null;
let _buf: AudioBuffer | null = null;

function audioCtx() {
  if (!_ctx) {
    _ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  if (_ctx.state === "suspended") _ctx.resume();
  return _ctx;
}

function ensureBuf(ac: AudioContext): AudioBuffer {
  if (_buf && _buf.sampleRate === ac.sampleRate) return _buf;
  const rate = ac.sampleRate;
  const len = Math.floor(rate * 0.006);
  const buf = ac.createBuffer(1, len, rate);
  const ch = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    const t = i / len;
    const sine = Math.sin(2 * Math.PI * 3400 * t);
    const noise = Math.random() * 2 - 1;
    ch[i] = (sine * 0.6 + noise * 0.4) * (1 - t) ** 3;
  }
  _buf = buf;
  return buf;
}

function playTick(last: React.MutableRefObject<number>) {
  const now = performance.now();
  if (now - last.current < 80) return;
  last.current = now;
  try {
    const ac = audioCtx();
    const buf = ensureBuf(ac);
    const src = ac.createBufferSource();
    const gain = ac.createGain();
    src.buffer = buf;
    gain.gain.value = 0.08;
    src.connect(gain);
    gain.connect(ac.destination);
    src.start();
  } catch { /* silent */ }
}

export function AnimatedThemeToggler({ sound = true }: AnimatedThemeTogglerProps) {
  const lastSnd = useRef(0);
  // Use null to avoid hydration mismatch — resolved on mount
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const html = document.documentElement;
    const goingDark = !html.classList.contains("dark");
    html.classList.toggle("dark", goingDark);
    html.classList.toggle("light", !goingDark);
    setIsDark(goingDark);
    if (sound) playTick(lastSnd);
  };

  // Render a placeholder with same dimensions until mounted to avoid layout shift
  if (isDark === null) {
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/15 bg-amber-500/5" />
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/15 bg-amber-500/5 text-amber-400 transition-all hover:scale-110 active:scale-90 hover:border-amber-500/30 hover:bg-amber-500/10"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          overflow: "visible",
          transform: isDark ? "rotate(270deg)" : "rotate(0deg)",
          transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {isDark ? (
          /* Moon */
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" stroke="none" />
        ) : (
          /* Sun */
          <>
            <circle cx="12" cy="12" r="5" fill="currentColor" stroke="none" />
            <line x1="12" y1="1"    x2="12" y2="3"    />
            <line x1="12" y1="21"   x2="12" y2="23"   />
            <line x1="1"  y1="12"   x2="3"  y2="12"   />
            <line x1="21" y1="12"   x2="23" y2="12"   />
            <line x1="5.64"  y1="5.64"  x2="4.22"  y2="4.22"  />
            <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"  />
            <line x1="5.64"  y1="18.36" x2="4.22"  y2="19.78" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          </>
        )}
      </svg>
    </button>
  );
}

export default AnimatedThemeToggler;
