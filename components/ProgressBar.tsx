'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  raised: number;
  hardCap: number;
  softCap: number;
}

export function ProgressBar({ raised, hardCap, softCap }: ProgressBarProps) {
  const percentage = Math.min((raised / hardCap) * 100, 100);
  const softCapPos = (softCap / hardCap) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 my-12">
      <div className="flex justify-between mb-4 font-orbitron text-sm">
        <span className="text-accent-cyan">Raised: ${raised.toLocaleString()}</span>
        <span className="text-secondary">Hard Cap: ${hardCap.toLocaleString()}</span>
      </div>

      <div className="relative h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-0 left-0 h-full bg-neon-gradient"
        />
        
        {/* Soft Cap Marker */}
        <div 
          className="absolute top-0 h-full w-0.5 bg-accent-magenta shadow-neon-purple"
          style={{ left: `${softCapPos}%` }}
        />
      </div>

      <div className="flex justify-between mt-2 text-[10px] uppercase tracking-widest text-secondary">
        <span>0%</span>
        <span style={{ marginLeft: `${softCapPos}%`, transform: 'translateX(-50%)' }}>Soft Cap</span>
        <span>100%</span>
      </div>
    </div>
  );
}
