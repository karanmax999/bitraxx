"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

interface SparklesProps {
  className?: string;
  /** Particle color — defaults to gold */
  color?: string;
  /** Particles per second */
  density?: number;
  /** Min particle size px */
  minSize?: number;
  /** Max particle size px */
  maxSize?: number;
  /** Speed multiplier */
  speed?: number;
}

export function Sparkles({
  className = "",
  color = "#f59e0b",
  density = 40,
  minSize = 1,
  maxSize = 3,
  speed = 1,
}: SparklesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles  = useRef<Particle[]>([]);
  const raf        = useRef<number>(0);
  const lastSpawn  = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const spawnInterval = 1000 / density;

    const spawn = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.current.push({
        x, y,
        vx: (Math.random() - 0.5) * speed * 0.6,
        vy: -(Math.random() * speed * 0.8 + 0.2),
        life: 0,
        maxLife: 60 + Math.random() * 60,
        size: minSize + Math.random() * (maxSize - minSize),
        color,
      });
    };

    const draw = (ts: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (ts - lastSpawn.current > spawnInterval) {
        spawn();
        lastSpawn.current = ts;
      }

      particles.current = particles.current.filter((p) => p.life < p.maxLife);

      for (const p of particles.current) {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        const progress = p.life / p.maxLife;
        const alpha = progress < 0.3
          ? progress / 0.3
          : 1 - (progress - 0.3) / 0.7;

        ctx.save();
        ctx.globalAlpha = alpha * 0.85;
        ctx.fillStyle   = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur  = p.size * 3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      ro.disconnect();
    };
  }, [color, density, minSize, maxSize, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
    />
  );
}

export default Sparkles;
