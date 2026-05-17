'use client';

import { motion } from 'framer-motion';
import { useWeb3 } from '@/hooks/useWeb3';

export default function ReferralsPage() {
  const { address } = useWeb3();
  const referralCode = address ? address.slice(-8).toUpperCase() : 'CONNECT';

  return (
    <div className="min-h-screen bg-background text-foreground p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-orbitron font-bold mb-4 bg-neon-gradient bg-clip-text text-transparent">Refer & Earn</h1>
          <p className="text-secondary text-lg">Invite your friends to the $BRX presale and earn 5% of their purchase in USDT.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <div className="bg-accent-purple/20 text-accent-purple text-xs font-bold px-3 py-1 rounded-full border border-accent-purple/30">Active</div>
            </div>
            <h3 className="text-xl font-orbitron mb-6">Your Referral Link</h3>
            <div className="bg-black/40 rounded-xl p-4 flex items-center justify-between border border-white/5 mb-6">
              <code className="text-accent-cyan text-sm">bitraxx.io/?ref={referralCode}</code>
              <button className="text-xs font-bold text-secondary hover:text-white transition-colors">COPY</button>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-secondary text-xs uppercase tracking-widest mb-1">Referral Code</div>
                <div className="text-2xl font-bold font-mono">{referralCode}</div>
              </div>
              <button className="px-6 py-2 bg-accent-purple text-white rounded-lg font-bold shadow-neon-purple hover:scale-105 transition-transform">Share Now</button>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <h3 className="text-xl font-orbitron mb-6">Earnings Overview</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-secondary">Total Referred</span>
                <span className="text-2xl font-bold">12 Users</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary">Total Earned</span>
                <span className="text-2xl font-bold text-accent-cyan">$450.00 USDT</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary">Pending Rewards</span>
                <span className="text-2xl font-bold text-accent-magenta">$50.00 USDT</span>
              </div>
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-orbitron mb-8">Recent Referrals</h2>
          <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/5">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-secondary text-[10px] uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-4">User</th>
                  <th className="px-8 py-4">Date</th>
                  <th className="px-8 py-4 text-right">Commission</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[1, 2, 3, 4].map((i) => (
                  <tr key={i} className="hover:bg-white/[0.02]">
                    <td className="px-8 py-4">
                      <div className="font-mono text-sm text-accent-cyan">0x{i}b2...4f9{i}</div>
                    </td>
                    <td className="px-8 py-4 text-secondary text-sm">May {10 + i}, 2026</td>
                    <td className="px-8 py-4 text-right font-bold text-accent-purple">+ $25.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
