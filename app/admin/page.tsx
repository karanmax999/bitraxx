'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'users' | 'presale' | 'liquidity'>('users');

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 p-6 flex flex-col gap-8 bg-black/20">
        <div className="text-xl font-orbitron font-black tracking-tighter text-accent-cyan">ADMIN PORTAL</div>
        <nav className="flex flex-col gap-2">
          {['users', 'presale', 'liquidity'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`text-left px-4 py-3 rounded-lg capitalize font-bold transition-all ${activeTab === tab ? 'bg-accent-cyan text-background shadow-neon-cyan' : 'text-secondary hover:bg-white/5'}`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        {activeTab === 'users' && (
          <section>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-orbitron font-bold">User Management</h1>
              <input type="text" placeholder="Search user..." className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-accent-cyan" />
            </div>
            
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-secondary text-xs uppercase">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Wallet</th>
                    <th className="px-6 py-4">KYC Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {[1, 2, 3].map((u) => (
                    <tr key={u} className="hover:bg-white/[0.02]">
                      <td className="px-6 py-4">
                        <div className="font-bold">User #{u}</div>
                        <div className="text-xs text-secondary">user{u}@example.com</div>
                      </td>
                      <td className="px-6 py-4 font-mono">0x71C...3a2f</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded bg-yellow-500/10 text-yellow-500 text-[10px] font-bold uppercase">Pending</span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button className="text-accent-cyan hover:underline">Approve</button>
                        <button className="text-accent-magenta hover:underline">Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'presale' && (
          <section>
            <h1 className="text-3xl font-orbitron font-bold mb-8">Presale Controls</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-orbitron mb-4">Round Status</h3>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-4 h-4 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  <div className="text-lg font-bold">Private Round is LIVE</div>
                </div>
                <div className="flex gap-4">
                  <button className="px-6 py-3 bg-accent-magenta/20 text-accent-magenta border border-accent-magenta/30 rounded-xl font-bold hover:bg-accent-magenta hover:text-white transition-all">Pause Presale</button>
                  <button className="px-6 py-3 bg-white/5 text-secondary border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all">Terminate</button>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-orbitron mb-4">Pricing Control</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-secondary mb-1">Current Price ($)</label>
                    <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 font-mono" defaultValue="0.08" />
                  </div>
                  <button className="w-full py-3 bg-accent-cyan text-background rounded-xl font-bold shadow-neon-cyan">Update Price</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'liquidity' && (
          <section>
            <h1 className="text-3xl font-orbitron font-bold mb-8">Liquidity Monitoring</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="text-secondary text-sm mb-1">Total ETH Raised</div>
                <div className="text-3xl font-bold">124.5 ETH</div>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="text-secondary text-sm mb-1">Total USDT Raised</div>
                <div className="text-3xl font-bold">452,000 USDT</div>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="text-secondary text-sm mb-1">Total USDC Raised</div>
                <div className="text-3xl font-bold">120,500 USDC</div>
              </div>
            </div>
            
            <div className="h-64 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-secondary">
              [ Liquidity Growth Chart Placeholder ]
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
