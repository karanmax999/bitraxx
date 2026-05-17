'use client';

import { motion } from 'framer-motion';

const allocations = [
  { name: 'Presale', percent: 40, color: '#00d9ff' },
  { name: 'Liquidity', percent: 20, color: '#a855f7' },
  { name: 'Team', percent: 15, color: '#ec4899' },
  { name: 'Marketing', percent: 15, color: '#ffffff' },
  { name: 'Ecosystem', percent: 10, color: '#a0aec0' },
];

export default function Tokenomics() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-orbitron font-bold mb-4">Tokenomics</h1>
          <p className="text-secondary text-lg">Total Supply: 1,000,000,000 $BRX</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square flex items-center justify-center">
             {/* Simple Donut Chart Representation */}
             <div className="w-80 h-80 rounded-full border-[40px] border-white/5 relative">
                {allocations.map((a, i) => (
                  <motion.div 
                    key={a.name}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: i * 0.1, duration: 1 }}
                    className="absolute inset-[-40px] rounded-full border-[40px]"
                    style={{ 
                      borderColor: a.color,
                      clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(a.percent * 3.6 * (Math.PI/180))}% ${50 - 50 * Math.sin(a.percent * 3.6 * (Math.PI/180))}%)`,
                      transform: `rotate(${allocations.slice(0, i).reduce((acc, curr) => acc + curr.percent, 0) * 3.6}deg)`
                    }}
                  />
                ))}
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <div className="text-3xl font-bold font-orbitron">$BRX</div>
                  <div className="text-xs text-secondary uppercase">Allocation</div>
                </div>
             </div>
          </div>

          <div className="space-y-6">
            {allocations.map((a, i) => (
              <motion.div 
                key={a.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: a.color }} />
                  <span className="font-bold text-lg">{a.name}</span>
                </div>
                <div className="text-2xl font-bold font-orbitron">{a.percent}%</div>
              </motion.div>
            ))}
          </div>
        </div>

        <section className="mt-32">
          <h2 className="text-3xl font-orbitron mb-12 text-center">Vesting Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5">
              <h4 className="text-accent-cyan font-bold mb-2">Public Sale</h4>
              <div className="text-2xl font-bold mb-4">100% Unlocked</div>
              <p className="text-secondary text-sm">Full access to tokens immediately after TGE.</p>
            </div>
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5">
              <h4 className="text-accent-purple font-bold mb-2">Private Sale</h4>
              <div className="text-2xl font-bold mb-4">10% TGE, 6m Cliff</div>
              <p className="text-secondary text-sm">Followed by 12 months linear vesting.</p>
            </div>
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5">
              <h4 className="text-accent-magenta font-bold mb-2">Team & Advisors</h4>
              <div className="text-2xl font-bold mb-4">12m Cliff</div>
              <p className="text-secondary text-sm">24 months linear vesting to ensure long-term commitment.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
