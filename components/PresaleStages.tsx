'use client';

import { motion } from 'framer-motion';

const stages = [
  { name: 'Seed', price: '0.05', status: 'completed' },
  { name: 'Private', price: '0.08', status: 'live' },
  { name: 'Public', price: '0.12', status: 'upcoming' },
];

export function PresaleStages() {
  return (
    <section className="py-20 px-4">
      <h2 className="text-3xl font-orbitron text-center mb-12">Presale Stages</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {stages.map((stage, idx) => (
          <motion.div 
            key={stage.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className={`p-8 rounded-2xl border ${
              stage.status === 'live' 
                ? 'border-accent-cyan bg-accent-cyan/5 shadow-neon-cyan' 
                : 'border-white/10 bg-white/5'
            } backdrop-blur-xl relative overflow-hidden`}
          >
            {stage.status === 'live' && (
              <div className="absolute top-4 right-4 bg-accent-cyan text-background text-[10px] font-bold px-2 py-1 rounded uppercase animate-pulse">
                Live
              </div>
            )}
            <h3 className="text-2xl font-orbitron mb-4">{stage.name}</h3>
            <div className="text-4xl font-bold mb-2">${stage.price}</div>
            <div className="text-secondary text-sm mb-6">Price per $BRX</div>
            
            <button 
              disabled={stage.status !== 'live'}
              className={`w-full py-3 rounded-xl font-bold transition-all ${
                stage.status === 'live' 
                  ? 'bg-accent-cyan text-background hover:scale-105' 
                  : 'bg-white/10 text-secondary cursor-not-allowed'
              }`}
            >
              {stage.status === 'live' ? 'Participate' : stage.status === 'completed' ? 'Sold Out' : 'Coming Soon'}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
