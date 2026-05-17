'use client';

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import WalletConnectButton from '@/components/WalletConnectButton';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { 
  Shield, 
  TrendingUp, 
  ArrowUpRight, 
  MapPin, 
  Lock, 
  CheckCircle,
  Activity,
  Award,
  Wallet,
  Globe,
  Coins,
  ChevronRight,
  Sparkles,
  MessageSquare
} from 'lucide-react';

export default function LandingPage() {
  const { isConnected } = useAccount();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  return (
    <div className="bg-space-black text-[#e1e2e7] selection:bg-[#f2ca50]/30 selection:text-[#f2ca50] overflow-x-hidden min-h-screen flex flex-col relative font-body">
      
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-void-navy/80 backdrop-blur-[20px]">
        <div className="flex justify-between items-center h-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
          {/* Brand Logo redirects to Main Page */}
          <Link href="/" className="transition-transform duration-300 hover:scale-[1.02]">
            <Logo className="w-40 h-10 cursor-pointer" />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 font-display">
            <Link 
              href="/launchpad" 
              className="text-[#f2ca50] font-bold border-b-2 border-[#f2ca50] pb-1 text-sm tracking-wider uppercase"
            >
              Dashboard
            </Link>
            <Link 
              href="/launchpad?tab=utility" 
              className="text-[#d0c5af] font-medium hover:text-[#00D9FF] hover:drop-shadow-[0_0_8px_rgba(0,217,255,0.5)] transition-all duration-300 text-sm tracking-wider uppercase"
            >
              Stake
            </Link>
            <Link 
              href="/launchpad?tab=presale" 
              className="text-[#d0c5af] font-medium hover:text-[#00D9FF] hover:drop-shadow-[0_0_8px_rgba(0,217,255,0.5)] transition-all duration-300 text-sm tracking-wider uppercase"
            >
              Presale
            </Link>
            <Link 
              href="/launchpad?tab=tokenomics" 
              className="text-[#d0c5af] font-medium hover:text-[#00D9FF] hover:drop-shadow-[0_0_8px_rgba(0,217,255,0.5)] transition-all duration-300 text-sm tracking-wider uppercase"
            >
              Tokenomics
            </Link>
            <Link 
              href="/exchange" 
              className="text-[#d0c5af] font-medium hover:text-[#00D9FF] hover:drop-shadow-[0_0_8px_rgba(0,217,255,0.5)] transition-all duration-300 text-sm tracking-wider uppercase"
            >
              Spot Exchange
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <WalletConnectButton />
          </div>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        
        {/* Cinematic Background Container */}
        <div className="absolute inset-0 z-0">
          {/* Premium Glowing Digital Sand Dunes Background */}
          <img 
            className="absolute inset-0 w-full h-full object-cover select-none scale-[1.01]" 
            alt="Ethereal golden and neon cyan space sand dunes of Bitraxx Sovereign Launchpad" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF3so_HXDDKSNzQD5WMmcPSD6MfvzQPtiIGLVbx9jcRp2DzhUl0ytOB3ghNG7yI4gzXAi1Cs8MrpE4R8383JXuRWXabZPP08XpC6ZVip9MUvgRzYIrA2hH8adCVwZ39eVrb39eUDUcZNTF7RKatSJlVm2W7G3nDIiC22srIrlp7mt08fKoU1oec1DBz5b-5QMUp8RqBnSEK2GIuYSqmcHdxwk_h7aHY6aP61fUTIwEKsL9fH8ofaWyzUdEhyDUwWNojdvAXklPLR0f"
          />
          {/* Deep Cinematic Black and Saudi Gold Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-space-black/90 via-void-navy/30 to-space-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-space-black/80 via-transparent to-space-black/80" />
          
          {/* Grid Overlay mapping futuristic aesthetic */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 217, 255, 0.04) 1px, transparent 1px), 
                                linear-gradient(90deg, rgba(0, 217, 255, 0.04) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        {/* Content Canvas */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center text-center animate-slideUp">
          
          {/* Animated Sovereign Frontier Label */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00D9FF]/30 bg-[#00D9FF]/5 backdrop-blur-md mb-8">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00D9FF] animate-pulse shadow-[0_0_10px_#00D9FF]" />
            <span className="font-display font-semibold text-xs tracking-widest text-[#00D9FF] uppercase">
              The Sovereign Frontier
            </span>
          </div>

          {/* Hero Premium Sand-Gold Gradient Headline */}
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight max-w-4xl mb-6 leading-tight select-none">
            <span className="bg-gradient-to-r from-[#f2ca50] via-[#FFE088] to-[#B89535] bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(242,202,80,0.15)]">
              Invest in the Future of Sovereign Finance
            </span>
          </h1>

          {/* Premium Subheading */}
          <p className="text-zinc-400 font-body text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
            The premium launchpad for the next generation of Web3 innovation in the Kingdom and beyond. 
            Secure, transparent, and built for institutional-grade reliability with multi-chain synergy.
          </p>

          {/* CTA Cluster Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-16 w-full sm:w-auto">
            <Link href="/launchpad" className="w-full sm:w-auto">
              <button className="w-full px-10 py-4.5 bg-gradient-to-r from-[#f2ca50] to-[#B89535] text-black font-display text-base tracking-widest uppercase font-bold rounded-xl gold-bloom hover:from-[#FFE088] hover:to-[#f2ca50] transition-all duration-300 shadow-lg cursor-pointer transform active:scale-95">
                Launch Dashboard
              </button>
            </Link>
            
            <Link href="/launchpad?tab=tokenomics" className="w-full sm:w-auto">
              <button className="w-full px-10 py-4.5 bg-void-navy/60 backdrop-blur-md text-white font-display text-base tracking-widest uppercase font-bold rounded-xl border border-white/10 hover:border-[#00D9FF]/40 hover:text-[#00D9FF] transition-all duration-300 shadow-md cursor-pointer transform active:scale-95">
                View Tokenomics
              </button>
            </Link>
          </div>

          {/* Bento-style Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            {/* Box 1 */}
            <div className="glass-layer p-6 rounded-2xl flex flex-col items-center justify-center gap-2 group transition-all duration-300 border-white/5 hover:border-[#f2ca50]/40 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
              <div className="p-3 bg-[#f2ca50]/5 rounded-xl border border-[#f2ca50]/10 mb-1 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6 text-[#f2ca50]" />
              </div>
              <span className="font-display font-semibold text-[10px] text-zinc-500 uppercase tracking-widest">
                Region
              </span>
              <span className="font-display font-bold text-xl text-white">
                Saudi-Based
              </span>
            </div>

            {/* Box 2 */}
            <div className="glass-layer p-6 rounded-2xl flex flex-col items-center justify-center gap-2 group transition-all duration-300 border-white/5 hover:border-[#00D9FF]/40 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
              <div className="p-3 bg-[#00D9FF]/5 rounded-xl border border-[#00D9FF]/10 mb-1 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-[#00D9FF]" />
              </div>
              <span className="font-display font-semibold text-[10px] text-zinc-500 uppercase tracking-widest">
                Security
              </span>
              <span className="font-display font-bold text-xl text-white">
                Fully Audited
              </span>
            </div>

            {/* Box 3 */}
            <div className="glass-layer p-6 rounded-2xl flex flex-col items-center justify-center gap-2 group transition-all duration-300 border-white/5 hover:border-[#f2ca50]/40 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
              <div className="p-3 bg-[#f2ca50]/5 rounded-xl border border-[#f2ca50]/10 mb-1 group-hover:scale-110 transition-transform">
                <Wallet className="w-6 h-6 text-[#f2ca50]" />
              </div>
              <span className="font-display font-semibold text-[10px] text-zinc-500 uppercase tracking-widest">
                Target Cap
              </span>
              <span className="font-display font-bold text-xl text-white">
                $5M Hard Cap
              </span>
            </div>
          </div>

        </div>

        {/* Scroll Discover Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none pointer-events-none opacity-60">
          <span className="font-display text-[9px] text-zinc-500 uppercase tracking-[0.3em]">
            Discover
          </span>
          <div className="w-6 h-9 rounded-full border border-white/10 flex justify-center p-1">
            <div className="w-1.5 h-1.5 bg-[#f2ca50] rounded-full animate-bounce" />
          </div>
        </div>

        {/* Ethereal Glow elements */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#f2ca50]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#00D9FF]/5 rounded-full blur-[120px] pointer-events-none" />
      </main>

      {/* Floating 24/7 Human Support Widget */}
      <button 
        onClick={() => showToast('💬 Initializing 24/7 Human Representative Support Chat...')}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 bg-void-navy border border-white/10 text-zinc-200 hover:text-white rounded-full shadow-2xl hover:border-[#f2ca50]/40 transition-all group hover:scale-105"
      >
        <MessageSquare className="w-4 h-4 text-[#f2ca50] group-hover:rotate-12 transition-transform" />
        <span className="text-[10px] font-display font-bold uppercase tracking-widest">Support</span>
      </button>

      {/* Ticker Notifications */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="flex items-center gap-3 bg-void-navy border border-[#f2ca50]/30 px-5 py-4 rounded-xl shadow-[0_0_30px_-5px_rgba(242,202,80,0.25)] text-xs font-display font-bold uppercase tracking-widest text-white">
            <CheckCircle className="w-5 h-5 text-[#f2ca50] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full py-16 border-t border-white/5 bg-space-black relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-6 md:px-12 max-w-7xl mx-auto w-full text-center md:text-left">
          
          <div className="flex flex-col gap-3">
            <div className="text-xl font-display font-bold text-[#f2ca50] tracking-wider">
              BITRAXX SOVEREIGN SYSTEM
            </div>
            <p className="text-xs text-zinc-500 max-w-sm">
              © 2026 Bitraxx Launchpad. Engineered for the Future of Decentralized Sovereign Finance.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 font-display text-[10px] font-bold tracking-widest uppercase text-zinc-400">
            <a className="hover:text-[#f2ca50] transition-colors" href="/launchpad?tab=whitepaper">Whitepaper</a>
            <span>•</span>
            <a className="hover:text-[#f2ca50] transition-colors" href="#">Privacy Policy</a>
            <span>•</span>
            <a className="hover:text-[#f2ca50] transition-colors" href="#">Terms of Service</a>
            <span>•</span>
            <a className="hover:text-[#f2ca50] transition-colors" href="#">Audit Report</a>
            <span>•</span>
            <button className="hover:text-[#f2ca50] transition-colors" onClick={() => showToast('💬 Opening ambassador relations desk...')}>Ambassador Program</button>
          </div>

        </div>
      </footer>

    </div>
  );
}
