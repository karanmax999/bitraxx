'use client';

import { motion } from 'framer-motion';

const milestones = [
  { q: 'Q1 2026', title: 'Platform Launch', desc: 'Mainnet deployment and Seed round initiation.', status: 'completed' },
  { q: 'Q2 2026', title: 'Private & Public Sale', desc: 'Strategic partnerships and community expansion.', status: 'live' },
  { q: 'Q3 2026', title: 'TGE & Listing', desc: 'Token Generation Event and CEX/DEX listings.', status: 'upcoming' },
  { q: 'Q4 2026', title: 'Bitraxx DEX', desc: 'Launch of our proprietary decentralized exchange.', status: 'upcoming' },
  { q: 'Q1 2027', title: 'Staking & Governance', desc: 'Rollout of the Bitraxx DAO and staking rewards.', status: 'upcoming' },
];

export default function Roadmap() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-20">
          <h1 className="text-5xl font-orbitron font-bold mb-4">Roadmap</h1>
          <p className="text-secondary text-lg">Our vision for the future of the Bitraxx ecosystem.</p>
        </header>

        <div className="relative border-l-2 border-white/5 ml-4 md:ml-0 md:left-1/2 md:-translate-x-1/2">
          {milestones.map((m, i) => (
            <motion.div 
              key={m.q}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`relative mb-20 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}
            >
              {/* Dot */}
              <div className={`absolute top-0 w-4 h-4 rounded-full border-2 border-background z-10 
                ${m.status === 'completed' ? 'bg-accent-cyan' : m.status === 'live' ? 'bg-accent-purple animate-pulse' : 'bg-white/20'} 
                ${i % 2 === 0 ? 'md:-right-2 -left-[25px] md:left-auto' : '-left-[25px] md:-left-2'}`} 
              />
              
              <div className={`p-8 rounded-2xl border ${m.status === 'live' ? 'border-accent-purple bg-accent-purple/5' : 'border-white/10 bg-white/5'} backdrop-blur-xl`}>
                <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${m.status === 'completed' ? 'text-accent-cyan' : m.status === 'live' ? 'text-accent-purple' : 'text-secondary'}`}>
                  {m.q} {m.status === 'completed' && '✓'}
                </div>
                <h3 className="text-2xl font-orbitron mb-3">{m.title}</h3>
                <p className="text-secondary">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
