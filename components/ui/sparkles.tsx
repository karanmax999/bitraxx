"use client";

import React, { useEffect, useRef } from "react";
import { useInView, usePageVisible, usePrefersReducedMotion } from "@/lib/performance";

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
  color?: string;
  density?: number;
  minSize?: number;
  maxSize?: number;
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
  const particles = useRef<Particle[]>([]);
  const raf = useRef<number>(0);
  const lastSpawn = useRef<number>(0);
  const reducedMotion = usePrefersReducedMotion();
  const pageVisible = usePageVisible();
  const inView = useInView(canvasRef);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const spawnInterval = 1000 / density;

    const spawn = () => {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed * 0.6,
        vy: -(Math.random() * speed * 0.8 + 0.2),
        life: 0,
        maxLife: 60 + Math.random() * 60,
        size: minSize + Math.random() * (maxSize - minSize),
        color,
      });
    };

    const draw = (ts: number) => {
      if (!pageVisible || !inView) {
        raf.current = requestAnimationFrame(draw);
        return;
      }

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
        const alpha =
          progress < 0.3 ? progress / 0.3 : 1 - (progress - 0.3) / 0.7;

        ctx.globalAlpha = alpha * 0.85;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      ro.disconnect();
    };
  }, [color, density, minSize, maxSize, speed, reducedMotion, pageVisible, inView]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}

export default Sparkles;
