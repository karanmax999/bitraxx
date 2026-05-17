'use client';

import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/20 blur-[120px] rounded-full -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-accent-cyan/10 blur-[100px] rounded-full -z-10" />

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-orbitron font-extrabold tracking-tighter mb-6"
      >
        <span className="bg-neon-gradient bg-clip-text text-transparent">BitraXx</span> $BRX
        <br />
        Future of DeFi
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-secondary text-lg md:text-xl max-w-2xl mb-10"
      >
        Join the most anticipated token launch of 2026. $BRX is the utility coin powering the Bitraxx ecosystem. 
        Secure your position in the Seed, Private, or Public rounds.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex gap-4"
      >
        <button className="px-8 py-4 bg-neon-gradient rounded-full font-bold text-white shadow-neon-cyan hover:scale-105 transition-transform">
          Buy $BRX Now
        </button>
        <button className="px-8 py-4 border border-accent-cyan/50 rounded-full font-bold text-accent-cyan hover:bg-accent-cyan/10 transition-colors">
          View Roadmap
        </button>
      </motion.div>
    </section>
  );
}
