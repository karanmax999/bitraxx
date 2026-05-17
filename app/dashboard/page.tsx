'use client';

import { motion } from 'framer-motion';
import { useWeb3 } from '@/hooks/useWeb3';

export default function Dashboard() {
  const { address, balance, symbol } = useWeb3();

  return (
    <div className="min-h-screen bg-background text-foreground p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-orbitron font-bold mb-2">Investor Dashboard</h1>
          <p className="text-secondary">Manage your $BRX holdings and tracking your vesting.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Wallet Card */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <h3 className="text-secondary text-sm font-bold uppercase tracking-wider mb-4">Connected Wallet</h3>
            <div className="text-lg font-mono truncate mb-2">{address || '0x...'}</div>
            <div className="text-2xl font-bold">{balance || '0.00'} {symbol}</div>
          </div>

          {/* $BRX Holdings */}
          <div className="p-6 rounded-2xl bg-accent-cyan/5 border border-accent-cyan/20 backdrop-blur-xl">
            <h3 className="text-accent-cyan text-sm font-bold uppercase tracking-wider mb-4">$BRX Balance</h3>
            <div className="text-4xl font-bold">25,000 $BRX</div>
            <div className="text-secondary text-xs mt-2">Value: ~$2,000 USD</div>
          </div>

          {/* Referral Card */}
          <div className="p-6 rounded-2xl bg-accent-purple/5 border border-accent-purple/20 backdrop-blur-xl">
            <h3 className="text-accent-purple text-sm font-bold uppercase tracking-wider mb-4">Referral Earnings</h3>
            <div className="text-4xl font-bold">$450.00</div>
            <div className="text-secondary text-xs mt-2">Total Referrals: 12</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Purchase History */}
          <section>
            <h2 className="text-2xl font-orbitron mb-6">Recent Purchases</h2>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-secondary text-xs uppercase">
                  <tr>
                    <th className="px-6 py-4">Round</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">Private</td>
                    <td className="px-6 py-4">10,000 $BRX</td>
                    <td className="px-6 py-4"><span className="text-accent-cyan">Confirmed</span></td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">Seed</td>
                    <td className="px-6 py-4">15,000 $BRX</td>
                    <td className="px-6 py-4"><span className="text-accent-cyan">Confirmed</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Vesting Timeline */}
          <section>
            <h2 className="text-2xl font-orbitron mb-6">Vesting Timeline</h2>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="space-y-6">
                {[
                  { month: 'Month 1', percent: '10%', status: 'Released' },
                  { month: 'Month 2', percent: '10%', status: 'Next Release' },
                  { month: 'Month 3', percent: '10%', status: 'Locked' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${item.status === 'Released' ? 'bg-accent-cyan' : item.status === 'Next Release' ? 'bg-accent-purple animate-pulse' : 'bg-white/20'}`} />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-bold">{item.month}</span>
                        <span className="text-secondary text-sm">{item.percent}</span>
                      </div>
                      <div className="text-xs text-secondary">{item.status}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-3 bg-neon-gradient rounded-xl font-bold shadow-neon-purple hover:scale-105 transition-transform">
                Claim Vested Tokens
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
