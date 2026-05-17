'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export default function Logo({ className = '', width = '100%', height = 'auto' }: LogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 340 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
    >
      <defs>
        {/* Shiny Premium Metallic Silver Gradient for 'Bitra' */}
        <linearGradient id="logoSilver" x1="75" y1="20" x2="75" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#E2E4E8" />
          <stop offset="70%" stopColor="#B0B5C0" />
          <stop offset="100%" stopColor="#8A8E98" />
        </linearGradient>

        {/* Gorgeous Deep Arabic Gold/Orange Gradient for 'Xx' */}
        <linearGradient id="logoGold" x1="220" y1="20" x2="220" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE088" />
          <stop offset="30%" stopColor="#F2CA50" />
          <stop offset="70%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#A67C1E" />
        </linearGradient>

        {/* Speed lines linear fade out gradients */}
        <linearGradient id="lineFadeLeft" x1="70" y1="40" x2="10" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="lineFadeRight" x1="270" y1="40" x2="330" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE088" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFE088" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* LEFT WING / SPEED LINES WHISKERS */}
      <g>
        {/* Top left line */}
        <path d="M 70 41 L 10 33" stroke="url(#lineFadeLeft)" strokeWidth="1.2" strokeLinecap="round" />
        {/* Middle left line */}
        <path d="M 72 43 L 5 43" stroke="url(#lineFadeLeft)" strokeWidth="2" strokeLinecap="round" />
        {/* Bottom left line */}
        <path d="M 70 45 L 10 53" stroke="url(#lineFadeLeft)" strokeWidth="1.2" strokeLinecap="round" />
      </g>

      {/* TEXT: Bitra */}
      <text
        x="80"
        y="55"
        fill="url(#logoSilver)"
        fontFamily="var(--font-display), 'Space Grotesk', system-ui, sans-serif"
        fontWeight="800"
        fontSize="44"
        letterSpacing="-0.03em"
      >
        Bitra
      </text>

      {/* TEXT: Xx */}
      <text
        x="212"
        y="55"
        fill="url(#logoGold)"
        fontFamily="var(--font-display), 'Space Grotesk', system-ui, sans-serif"
        fontWeight="900"
        fontSize="44"
        letterSpacing="-0.03em"
        style={{ filter: 'drop-shadow(0px 0px 4px rgba(212, 175, 55, 0.25))' }}
      >
        Xx
      </text>

      {/* RIGHT WING / SPEED LINES WHISKERS */}
      <g>
        {/* Top right line */}
        <path d="M 270 41 L 330 33" stroke="url(#lineFadeRight)" strokeWidth="1.2" strokeLinecap="round" />
        {/* Middle right line */}
        <path d="M 268 43 L 335 43" stroke="url(#lineFadeRight)" strokeWidth="2" strokeLinecap="round" />
        {/* Bottom right line */}
        <path d="M 270 45 L 330 53" stroke="url(#lineFadeRight)" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    </svg>
  );
}
