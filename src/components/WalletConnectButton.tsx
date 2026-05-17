'use client';

import React from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Wallet, LogOut, ChevronDown } from 'lucide-react';

export default function WalletConnectButton() {
  const { open } = useWeb3Modal();
  const { address, isConnected, isConnecting, chain } = useAccount();
  const { disconnect } = useDisconnect();

  // Truncate address for clean presentation: 0x1234...5678
  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  // Get network badge color based on Celestial Sovereign scheme
  const getNetworkBadge = () => {
    if (!chain) return null;
    const name = chain.name.toLowerCase();
    if (name.includes('ethereum') || name.includes('mainnet')) {
      return { label: 'Ethereum', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' };
    }
    if (name.includes('binance') || name.includes('bsc')) {
      return { label: 'BNB Chain', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' };
    }
    if (name.includes('polygon')) {
      return { label: 'Polygon', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' };
    }
    return { label: chain.name, color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
  };

  const badge = getNetworkBadge();

  if (isConnecting) {
    return (
      <button 
        disabled
        className="relative inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white/60 bg-void-navy/60 backdrop-blur-md border border-white/10 rounded-full cursor-not-allowed overflow-hidden animate-pulse"
      >
        <span className="w-1.5 h-1.5 bg-electric-cyan rounded-full animate-ping" />
        Connecting...
      </button>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        {badge && (
          <span className={`hidden sm:inline-flex items-center px-3 py-1 rounded-full text-[10px] font-display font-semibold uppercase tracking-wider border ${badge.color}`}>
            <span className="w-1 h-1 mr-1.5 rounded-full bg-current" />
            {badge.label}
          </span>
        )}
        
        <div className="relative group">
          <button
            onClick={() => open({ view: 'Account' })}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-void-navy border border-lux-gold/30 rounded-full hover:border-lux-gold transition-all duration-300 shadow-[0_0_15px_-5px_rgba(212,175,55,0.15)] hover:shadow-[0_0_20px_-2px_rgba(212,175,55,0.3)]"
          >
            {/* Pulsing neon cyan status indicator */}
            <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse shadow-[0_0_8px_#00D9FF]" />
            <span className="font-mono tracking-wide lowercase">{formatAddress(address)}</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors duration-200" />
          </button>
          
          {/* Dropdown Menu on Hover */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-void-navy border border-white/10 rounded-xl shadow-2xl opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 z-50 p-1.5">
            <div className="px-3 py-2 border-b border-white/5 text-[9px] font-display font-semibold text-zinc-500 uppercase tracking-widest">
              Secured Wallet
            </div>
            <button
              onClick={() => open({ view: 'Account' })}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-150 mt-1"
            >
              <Wallet className="w-4 h-4 text-lux-gold" />
              Wallet Profile
            </button>
            <button
              onClick={() => disconnect()}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-all duration-150"
            >
              <LogOut className="w-4 h-4" />
              Disconnect
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => open()}
      className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-lux-gold focus:ring-offset-2 focus:ring-offset-space-black transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
    >
      {/* Outer border glow border */}
      <span className="absolute inset-0 bg-[linear-gradient(90deg,#B89535,#D4AF37,#00D9FF,#B89535)] bg-[length:200%_auto] animate-shimmer rounded-full opacity-40 group-hover:opacity-90 transition-opacity duration-300" />
      
      {/* Glass (Ghost) Style Button Interior */}
      <span className="relative flex items-center gap-2.5 px-6 py-2.5 bg-void-navy/90 backdrop-blur-md hover:bg-void-navy/60 text-white text-xs font-display font-bold uppercase tracking-widest rounded-full transition-colors duration-300">
        <Wallet className="w-4 h-4 text-lux-gold group-hover:rotate-12 transition-transform duration-300" />
        Connect Wallet
      </span>
    </button>
  );
}
