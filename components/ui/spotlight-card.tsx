"use client";

import React, { useEffect, useRef, ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const glowColorMap = {
  blue:   { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green:  { base: 120, spread: 200 },
  red:    { base: 0,   spread: 200 },
  orange: { base: 30,  spread: 200 },
  gold:   { base: 45,  spread: 180 },
};

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96',
};

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'gold',
  size = 'md',
  width,
  height,
  customSize = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const { clientX: x, clientY: y } = e;
    const rect = e.currentTarget.getBoundingClientRect();
    const localX = x - rect.left;
    const localY = y - rect.top;

    e.currentTarget.style.setProperty('--x', localX.toFixed(2));
    e.currentTarget.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
    e.currentTarget.style.setProperty('--y', localY.toFixed(2));
    e.currentTarget.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
  };

  const { base, spread } = glowColorMap[glowColor];

  const inlineStyles: React.CSSProperties & Record<string, string | number> = {
    '--base': base,
    '--spread': spread,
    '--radius': '16',
    '--border': '2',
    '--backdrop': 'var(--bg-card, hsl(0 0% 8% / 0.85))',
    '--backup-border': 'var(--border, rgba(245,158,11,0.15))',
    '--size': '220',
    '--outer': '1',
    '--border-size': 'calc(var(--border, 2) * 1px)',
    '--spotlight-size': 'calc(var(--size, 150) * 1px)',
    '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
    backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
      hsl(var(--hue, 45) calc(var(--saturation, 80) * 1%) calc(var(--lightness, 60) * 1%) / var(--bg-spot-opacity, 0.08)),
      transparent
    )`,
    backgroundColor: 'var(--backdrop)',
    backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
    backgroundPosition: '50% 50%',
    border: 'var(--border-size) solid var(--backup-border)',
    position: 'relative',
  };

  if (width !== undefined)  inlineStyles.width  = typeof width  === 'number' ? `${width}px`  : width;
  if (height !== undefined) inlineStyles.height = typeof height === 'number' ? `${height}px` : height;

  const sizeClasses = customSize ? '' : sizeMap[size];

  return (
    <div
      ref={cardRef}
      data-glow
      onPointerMove={handlePointerMove}
      style={inlineStyles}
      className={`glass-panel ${sizeClasses} relative rounded-2xl shadow-[0_1rem_2rem_-1rem_rgba(0,0,0,0.6)] ${className}`}
    >
      <div data-glow />
      {children}
    </div>
  );
};

export default GlowCard;
