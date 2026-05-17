'use client';

import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import WalletConnectButton from '@/components/WalletConnectButton';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { 
  Shield, 
  Activity, 
  ChevronRight, 
  Coins, 
  MessageSquare, 
  Sparkles, 
  Wallet, 
  Globe, 
  RefreshCw, 
  Copy, 
  Users, 
  Award, 
  UploadCloud, 
  FileCheck,
  CheckCircle,
  Lock,
  ChevronDown,
  Info,
  Layers,
  Calendar,
  AlertTriangle,
  Play,
  Pause,
  Trash2,
  TrendingUp,
  UserCheck
} from 'lucide-react';

type TabType = 'home' | 'presale' | 'tokenomics' | 'utility' | 'stages' | 'roadmap' | 'whitepaper' | 'admin';

export default function LaunchpadPage() {
  const { address, isConnected } = useAccount();

  // Admin Wallet Access Definition
  const ADMIN_WALLET = '0x715F47Ce330aF0fd7130290874a182FBaF1D892F';
  const isAdmin = isConnected && !!address && address.toLowerCase() === ADMIN_WALLET.toLowerCase();

  // Active view tab state (default: 'presale' or 'home')
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // Handle URL Query parameters to select tabs dynamically with Super Admin protection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab && ['home', 'presale', 'tokenomics', 'utility', 'stages', 'roadmap', 'whitepaper', 'admin'].includes(tab)) {
        if (tab === 'admin') {
          if (isConnected && address && address.toLowerCase() === '0x715F47Ce330aF0fd7130290874a182FBaF1D892F'.toLowerCase()) {
            setActiveTab('admin');
          } else {
            setActiveTab('home');
          }
        } else {
          setActiveTab(tab as TabType);
        }
      }
    }
  }, [isConnected, address]);

  // Real-time security guard: eject non-admins from Super Admin view instantly
  useEffect(() => {
    const isCurrentAdmin = isConnected && !!address && address.toLowerCase() === '0x715F47Ce330aF0fd7130290874a182FBaF1D892F'.toLowerCase();
    if (activeTab === 'admin' && !isCurrentAdmin) {
      setActiveTab('home');
    }
  }, [activeTab, isConnected, address]);

  // Global Presale Control State
  const [presaleStatus, setPresaleStatus] = useState<'active' | 'paused' | 'terminated'>('active');
  const [activeRound, setActiveRound] = useState<'seed' | 'private' | 'public'>('seed');
  const [seedRoundPrice, setSeedRoundPrice] = useState<number>(0.04);
  const [privateRoundPrice, setPrivateRoundPrice] = useState<number>(0.08);
  const [publicRoundPrice, setPublicRoundPrice] = useState<number>(0.12);

  // Staking simulator state
  const [stakingMonths, setStakingMonths] = useState<number>(6);
  const [stakingAmount, setStakingAmount] = useState<string>('50000');

  // KYC Uploader State
  const [kycStatus, setKycStatus] = useState<'unverified' | 'uploading' | 'scanning' | 'approved'>('unverified');
  const [kycDocType, setKycDocType] = useState<'passport' | 'id' | 'license'>('passport');
  const [kycFileName, setKycFileName] = useState<string>('');
  const [kycProgress, setKycProgress] = useState<number>(0);

  // Simulated KYC list for Super Admin panel
  const [kycApplications, setKycApplications] = useState([
    { id: 1, name: 'Abdulrahman Al-Sudais', wallet: '0x71C...3a5f', type: 'Passport', status: 'Pending' },
    { id: 2, name: 'Sarah Jenkins', wallet: '0x9e2...d11e', type: 'Driver License', status: 'Pending' },
    { id: 3, name: 'Tariq Al-Harbi', wallet: '0x3a1...c4b9', type: 'National ID', status: 'Approved' }
  ]);

  // Payment gateway states
  const [purchaseCurrency, setPurchaseCurrency] = useState<'USDT' | 'USDC' | 'ETH' | 'BNB' | 'BTC'>('USDT');
  const [payAmount, setPayAmount] = useState<string>('500');
  const [receiveTokens, setReceiveTokens] = useState<number>(12500); // Dynamic output
  const [dynamicAddress, setDynamicAddress] = useState<string>('0x7D4B6b2847c945b0C7c17d2358B799C06aA225fF');
  const [manualPayMethod, setManualPayMethod] = useState<boolean>(false);
  const [manualTxHash, setManualTxHash] = useState<string>('');

  // Simulated Global Live Contributions Feed
  interface Contribution {
    id: string;
    wallet: string;
    amount: string;
    currency: string;
    tokens: string;
    time: string;
    flag: string;
    network: string;
  }
  
  const [contributions, setContributions] = useState<Contribution[]>([]);

  useEffect(() => {
    const initial = [
      { id: '1', wallet: '0x71C...3a5f', amount: '12,500', currency: 'USDT', tokens: '312,500', time: '4s ago', flag: '🇸🇦', network: 'BSC' },
      { id: '2', wallet: '0x9e2...d11e', amount: '4.5', currency: 'ETH', tokens: '388,125', time: '12s ago', flag: '🇬🇧', network: 'Ethereum' },
      { id: '3', wallet: '0x3a1...c4b9', amount: '25,000', currency: 'USDC', tokens: '625,000', time: '18s ago', flag: '🇸🇦', network: 'BSC' },
      { id: '4', wallet: '0x8f4...e2a9', amount: '15', currency: 'BNB', tokens: '221,250', time: '28s ago', flag: '🇦🇪', network: 'BSC' }
    ];
    setContributions(initial);
    
    const interval = setInterval(() => {
      const wallets = ['0x4a9...b71c', '0x8e2...f92a', '0x3c1...d45e', '0x5b8...a12c', '0x7d2...e54f'];
      const amounts = ['3,200', '8,500', '15,000', '42,000', '6,800', '2.5', '18.5'];
      const currencies = ['USDT', 'USDC', 'ETH', 'BNB'];
      const flags = ['🇸🇦', '🇦🇪', '🇶🇦', '🇬🇧', '🇨🇦', '🇸🇬'];
      
      const randWallet = wallets[Math.floor(Math.random() * wallets.length)];
      const randAmount = amounts[Math.floor(Math.random() * amounts.length)];
      const randCurrency = randAmount.includes('.') ? 'ETH' : currencies[Math.floor(Math.random() * (currencies.length - 1))];
      const randFlag = flags[Math.floor(Math.random() * flags.length)];
      
      const numVal = parseFloat(randAmount.replace(/,/g, ''));
      let rate = 1;
      if (randCurrency === 'ETH') rate = 3450;
      else if (randCurrency === 'BNB') rate = 590;
      const tokenValue = (numVal * rate) / 0.04; // seed base rate
      
      const newTx: Contribution = {
        id: Date.now().toString(),
        wallet: randWallet,
        amount: randAmount,
        currency: randCurrency,
        tokens: Math.floor(tokenValue).toLocaleString(undefined, { maximumFractionDigits: 0 }),
        time: 'just now',
        flag: randFlag,
        network: randCurrency === 'ETH' ? 'Ethereum' : 'BSC'
      };
      
      setContributions(prev => {
        const updated = prev.map(item => {
          if (item.time === 'just now') return { ...item, time: '4s ago' };
          if (item.time.endsWith('s ago')) {
            const seconds = parseInt(item.time) + 4;
            return { ...item, time: `${seconds}s ago` };
          }
          return item;
        });
        return [newTx, ...updated.slice(0, 3)];
      });
    }, 4500);
    
    return () => clearInterval(interval);
  }, []);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Dynamically calculate token return rates based on selected round price
  const getActivePrice = () => {
    if (activeRound === 'seed') return seedRoundPrice;
    if (activeRound === 'private') return privateRoundPrice;
    return publicRoundPrice;
  };

  const getCurrencyRate = () => {
    // Simulated live rates against USD
    if (purchaseCurrency === 'USDT' || purchaseCurrency === 'USDC') return 1;
    if (purchaseCurrency === 'ETH') return 3450;
    if (purchaseCurrency === 'BNB') return 590;
    return 68500; // BTC
  };

  useEffect(() => {
    const amount = parseFloat(payAmount) || 0;
    const rate = getCurrencyRate();
    const usdValue = amount * rate;
    const tokenPrice = getActivePrice();
    setReceiveTokens(usdValue / tokenPrice);
  }, [payAmount, purchaseCurrency, activeRound, seedRoundPrice, privateRoundPrice, publicRoundPrice]);

  // Handle Copy Actions
  const handleCopyLink = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    showToast(message);
  };

  // Handle Admin KYC actions
  const handleAdminKycApproval = (id: number, status: 'Approved' | 'Rejected') => {
    setKycApplications(prev => prev.map(app => app.id === id ? { ...app, status } : app));
    showToast(`💼 KYC Application #${id} marked as ${status}!`);
    if (id === 1 && status === 'Approved') {
      setKycStatus('approved');
    }
  };

  // Simulate KYC Upload
  const handleKycUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setKycFileName(file.name);
      setKycStatus('uploading');
      setKycProgress(0);

      let prog = 0;
      const interval = setInterval(() => {
        prog += 10;
        setKycProgress(prog);
        if (prog >= 100) {
          clearInterval(interval);
          setKycStatus('scanning');
          
          setTimeout(() => {
            setKycStatus('approved');
            showToast('✅ AI scan approved! Verification level upgraded to Tier 2.');
            // Add to admin roster as approved
            setKycApplications(prev => [
              { id: Date.now(), name: 'You (Uploaded Document)', wallet: address || '0x4f3e...b1a2', type: kycDocType === 'passport' ? 'Passport' : kycDocType === 'id' ? 'National ID' : 'Driver License', status: 'Approved' },
              ...prev
            ]);
          }, 3000);
        }
      }, 150);
    }
  };

  const executePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      showToast('⚠️ Please connect your Web3 wallet to contribute capital.');
      return;
    }
    if (presaleStatus === 'paused') {
      showToast('⚠️ Presale contribution round is temporarily paused.');
      return;
    }
    if (presaleStatus === 'terminated') {
      showToast('🛑 Presale round has terminated.');
      return;
    }

    if (manualPayMethod) {
      if (!manualTxHash) {
        showToast('⚠️ Please enter the Transaction Hash to verify your manual payment.');
        return;
      }
      showToast(`📝 Manual Payment Logged! Hash submitted for confirmation: ${manualTxHash}`);
    } else {
      showToast(`🚀 contribution Executed! Contributing ${payAmount} ${purchaseCurrency} for ${receiveTokens.toLocaleString(undefined, { maximumFractionDigits: 2 })} $BRX!`);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#05070A] text-[#e1e2e7] overflow-x-hidden font-body selection:bg-[#00D9FF]/30 selection:text-[#00D9FF] animate-fadeIn">
      
      {/* Dynamic Saudi Space Glow Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-lux-gold/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-electric-cyan/5 blur-[150px] pointer-events-none" />

      {/* LEFT NAVIGATION SIDEBAR LAYOUT (Direct match to screenshot layout) */}
      <aside className="w-64 shrink-0 bg-[#090D14] border-r border-white/5 flex flex-col justify-between p-6 select-none z-30">
        <div className="flex flex-col gap-8">
          
          {/* Logo Frame: Bitra Xx */}
          <Link href="/" className="flex items-center px-1 transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
            <Logo className="w-48 h-12" />
          </Link>

          {/* Menu links list */}
          <nav className="flex flex-col gap-1.5">
            {[
              { id: 'home', label: 'Home page' },
              { id: 'presale', label: 'Presale' },
              { id: 'tokenomics', label: 'Tokenomics' },
              { id: 'utility', label: 'BRX Utility' },
              { id: 'stages', label: 'Stages' },
              { id: 'roadmap', label: 'Roadmap' },
              { id: 'whitepaper', label: 'Whitepaper' },
              ...(isAdmin ? [{ id: 'admin', label: 'Super Admin' }] : [])
            ].map((menu) => (
              <button
                key={menu.id}
                onClick={() => setActiveTab(menu.id as TabType)}
                className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl font-display text-xs font-semibold uppercase tracking-widest text-left transition-all duration-300 ${activeTab === menu.id ? 'bg-lux-gold/10 text-lux-gold border border-lux-gold/20 shadow-[0_0_15px_-5px_rgba(212,175,55,0.2)]' : 'text-zinc-500 hover:text-white hover:bg-white/5 border border-transparent'}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full transition-colors ${activeTab === menu.id ? 'bg-lux-gold shadow-[0_0_6px_#D4AF37]' : 'bg-zinc-700'}`} />
                {menu.label}
              </button>
            ))}

            {/* Premium Divider and Link to Spot Exchange */}
            <div className="h-px bg-white/5 my-2.5" />
            
            <Link 
              href="/exchange" 
              className="w-full flex items-center justify-between px-3 py-3 rounded-xl font-display text-xs font-bold uppercase tracking-widest text-[#00D9FF] hover:bg-[#00D9FF]/5 border border-[#00D9FF]/10 hover:border-[#00D9FF]/30 transition-all duration-300 shadow-[0_0_15px_-5px_rgba(0,217,255,0.1)] active:scale-[0.98] cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse shadow-[0_0_6px_#00D9FF]" />
                Spot Exchange
              </span>
              <Activity className="w-4 h-4 text-[#00D9FF]" />
            </Link>
          </nav>
        </div>

        {/* Footer social icons inside the Sidebar bottom */}
        <div className="flex flex-col gap-4 border-t border-white/5 pt-6">
          <span className="text-[9px] font-display font-bold uppercase tracking-widest text-zinc-500">Join Our Socials</span>
          <div className="flex items-center gap-3.5">
            
            {/* Telegram vector */}
            <a href="https://t.me/bitraxx" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-lux-gold transition-colors duration-300" title="Telegram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.66-2.88 7.99-3.43 3.8-1.57 4.59-1.85 5.1-.16.03.09.04.2.04.3z"/>
              </svg>
            </a>

            {/* X Twitter vector */}
            <a href="https://x.com/bitraxx" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-lux-gold transition-colors duration-300" title="X (Twitter)">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* GitHub vector */}
            <a href="https://github.com/bitraxx" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-lux-gold transition-colors duration-300" title="GitHub">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>

            {/* TikTok vector */}
            <a href="https://tiktok.com/@bitraxx" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-lux-gold transition-colors duration-300" title="TikTok">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.03 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12.98 2.61 1.49 4.1 1.58v3.89c-1.74-.06-3.41-.65-4.79-1.74-.21-.17-.39-.37-.58-.56v7.35c.09 2.12-.66 4.29-2.12 5.86-1.75 1.94-4.5 2.87-7.07 2.41-2.91-.45-5.46-2.82-6.02-5.71-.8-3.79 1.47-7.78 5.25-8.66.97-.24 1.98-.24 2.96-.03v3.97c-.96-.29-2.02-.19-2.89.33-1.08.61-1.72 1.85-1.63 3.09.07 1.42 1.11 2.68 2.51 2.91 1.25.24 2.62-.26 3.29-1.32.32-.48.44-1.06.43-1.63V.02z"/>
              </svg>
            </a>

            {/* Instagram vector */}
            <a href="https://instagram.com/bitraxx" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-lux-gold transition-colors duration-300" title="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>

          </div>
        </div>

      </aside>

      {/* RIGHT MAIN CONTENT AREA */}
      <section className="flex-1 min-h-screen flex flex-col justify-between relative z-20">
        
        {/* Dynamic header showing wallet connectivity */}
        <header className="sticky top-0 z-40 border-b border-white/5 bg-void-navy/80 backdrop-blur-md px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-display font-bold uppercase tracking-wider text-zinc-500 select-none">Presale Gateway</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-xs font-display font-bold text-lux-gold capitalize select-none tracking-widest">{activeTab} View</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/exchange"
              className="text-xs font-display font-bold uppercase tracking-widest text-[#00D9FF] hover:text-white border border-[#00D9FF]/20 hover:border-white/25 px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-[1.02]"
            >
              Spot Trading
            </Link>
            <WalletConnectButton />
          </div>
        </header>

        {/* Dynamic viewport renderer */}
        <main className="flex-1 p-8 max-w-[1400px] w-full mx-auto flex flex-col gap-8 transition-opacity duration-300">
          
          {/* A. HOME VIEW (Overview Command Center) */}
          {activeTab === 'home' && (
            <div className="flex flex-col gap-8 animate-slideUp">
              
              {/* Command Hero */}
              <div className="glass-layer p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 gold-thread-left">
                <div>
                  <h2 className="font-display font-bold text-2xl tracking-tight text-white flex items-center gap-2">
                    Bitraxx Investor Command Center
                    <Sparkles className="w-5.5 h-5.5 text-lux-gold animate-pulse" />
                  </h2>
                  <p className="text-zinc-400 text-xs mt-2 max-w-xl leading-relaxed">
                    Access automated multi-chain presale mechanisms, secure account verification limits, copy smart-contract affiliate codes, and simulate locks.
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => setActiveTab('presale')}
                    className="bg-lux-gold hover:bg-[#e9c349] text-black px-5 py-3 rounded-full text-xs font-display font-bold uppercase tracking-widest transition-all duration-300 gold-bloom"
                  >
                    Contribute Presale
                  </button>
                  <button 
                    onClick={() => showToast('🌉 Opening Bitraxx Bridge Gateway...')}
                    className="border border-electric-cyan text-electric-cyan hover:bg-electric-cyan/10 px-5 py-3 rounded-full text-xs font-display font-bold uppercase tracking-widest transition-all duration-300"
                  >
                    Bridge Assets
                  </button>
                </div>
              </div>

              {/* Grid section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Vested holdings balance */}
                <div className="glass-layer p-6 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover:opacity-[0.04] transition-all">
                    <Coins className="w-20 h-20 text-lux-gold" />
                  </div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-display font-bold text-zinc-500 uppercase tracking-widest">YOUR PRESALE ALLOCATION</span>
                    <span className="text-[8px] font-display font-bold text-lux-gold bg-lux-gold/10 border border-lux-gold/20 px-2 py-0.5 rounded-full uppercase">Seed Vesting</span>
                  </div>
                  <div className="text-2xl font-display font-bold text-white tracking-wide">125,400.00 <span className="text-xs text-zinc-400 font-medium">BRX</span></div>
                  <div className="text-lux-gold text-xs font-display font-semibold mt-1">≈ $42,636.00 USD</div>
                </div>

                {/* Staking vault total yield */}
                <div className="glass-layer p-6 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover:opacity-[0.04] transition-all">
                    <Award className="w-20 h-20 text-lux-gold" />
                  </div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-display font-bold text-zinc-500 uppercase tracking-widest">STAKED ALLOCATIONS</span>
                    <span className="text-[8px] font-display font-bold text-electric-cyan bg-electric-cyan/10 border border-electric-cyan/20 px-2 py-0.5 rounded-full uppercase">18.5% APY</span>
                  </div>
                  <div className="text-2xl font-display font-bold text-white tracking-wide">50,000.00 <span className="text-xs text-zinc-400 font-medium">BRX</span></div>
                  <div className="text-electric-cyan text-xs font-display font-semibold mt-1">Est. Compound Period Yields active</div>
                </div>

                {/* Referral program direct payouts */}
                <div className="glass-layer p-6 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover:opacity-[0.04] transition-all">
                    <Users className="w-20 h-20 text-lux-gold" />
                  </div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-display font-bold text-zinc-500 uppercase tracking-widest">AFFILIATE INCOME</span>
                    <span className="text-[8px] font-display font-bold text-lux-gold bg-lux-gold/10 border border-lux-gold/20 px-2 py-0.5 rounded-full uppercase">5% USDT</span>
                  </div>
                  <div className="text-2xl font-display font-bold text-white tracking-wide">$3,420.00 <span className="text-xs text-zinc-400 font-medium">USDT</span></div>
                  <div className="text-lux-gold text-xs font-display font-semibold mt-1">Directly Deposited on-chain</div>
                </div>

              </div>

              {/* KYC scanner block */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Verification card */}
                <div className="lg:col-span-8 glass-layer rounded-2xl overflow-hidden">
                  <div className="p-5 border-b border-white/5 bg-void-navy/40 flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">Investor KYC Identity System</h3>
                      <p className="text-[9px] text-zinc-500 uppercase tracking-widest mt-0.5">Automated deep-space holographic scan</p>
                    </div>
                    <span className={`text-[9px] font-display font-bold px-3 py-1 rounded-full border ${kycStatus === 'approved' ? 'bg-electric-cyan/15 text-electric-cyan border-electric-cyan/25' : kycStatus === 'scanning' ? 'bg-lux-gold/15 text-lux-gold border-lux-gold/25 animate-pulse' : 'bg-zinc-800 text-zinc-400 border-white/5'}`}>
                      {kycStatus === 'approved' ? 'Verified Tier 2' : kycStatus === 'scanning' ? 'AI Scanner Active' : 'Unverified'}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-full md:w-48 flex flex-col gap-2.5">
                      <span className="text-[9px] font-display font-bold uppercase tracking-widest text-zinc-500">Document Type</span>
                      {['passport', 'id', 'license'].map((dType) => (
                        <button
                          key={dType}
                          onClick={() => setKycDocType(dType as any)}
                          disabled={kycStatus !== 'unverified'}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-display font-semibold transition-all ${kycDocType === dType ? 'bg-lux-gold/5 border-lux-gold/30 text-white gold-thread-left' : 'bg-space-black/50 border-white/5 text-zinc-500 hover:text-white disabled:opacity-50'}`}
                        >
                          <span className="capitalize">{dType === 'id' ? 'National ID' : dType === 'license' ? 'Driver License' : 'Passport'}</span>
                          <ChevronRight className="w-4 h-4 text-zinc-600" />
                        </button>
                      ))}
                    </div>

                    <div className="flex-1 w-full bg-space-black/60 rounded-xl border border-dashed border-white/10 p-6 flex flex-col items-center justify-center relative min-h-[180px] overflow-hidden">
                      
                      {kycStatus === 'scanning' && (
                        <div className="absolute inset-0 bg-gradient-to-b from-electric-cyan/20 to-transparent h-1/2 border-b-2 border-electric-cyan/70 animate-pulse pointer-events-none" style={{ animationDuration: '1.2s' }} />
                      )}

                      {kycStatus === 'unverified' && (
                        <>
                          <UploadCloud className="w-10 h-10 text-zinc-600 mb-2.5" />
                          <h4 className="text-xs font-display font-bold text-white uppercase tracking-wider mb-1">Upload ID File</h4>
                          <span className="text-[9px] text-zinc-500 uppercase tracking-widest mb-3.5">PDF or high-res Image</span>
                          <label className="bg-void-navy hover:bg-void-navy/60 border border-white/10 px-4 py-2 rounded-full text-[10px] font-display font-bold uppercase tracking-wider text-white transition-all cursor-pointer">
                            Browse Files
                            <input type="file" className="hidden" onChange={handleKycUpload} />
                          </label>
                        </>
                      )}

                      {kycStatus === 'uploading' && (
                        <div className="w-full max-w-[200px] text-center flex flex-col items-center gap-2">
                          <RefreshCw className="w-6 h-6 text-lux-gold animate-spin" />
                          <span className="text-[10px] font-display font-bold text-white uppercase tracking-widest">Uploading Document...</span>
                          <div className="w-full bg-void-navy h-1 rounded-full overflow-hidden border border-white/5">
                            <div className="bg-lux-gold h-full" style={{ width: `${kycProgress}%` }} />
                          </div>
                        </div>
                      )}

                      {kycStatus === 'scanning' && (
                        <div className="text-center flex flex-col items-center gap-2.5 z-10 animate-pulse">
                          <Activity className="w-8 h-8 text-electric-cyan animate-spin" style={{ animationDuration: '3s' }} />
                          <span className="text-[10px] font-display font-bold text-electric-cyan uppercase tracking-widest">Running Holographic Scan</span>
                          <span className="text-[8px] text-zinc-500 font-mono">Consensus checking: {kycFileName}</span>
                        </div>
                      )}

                      {kycStatus === 'approved' && (
                        <div className="text-center flex flex-col items-center gap-3 animate-scaleIn w-full max-w-[280px] p-4 bg-gradient-to-br from-lux-gold/10 via-space-black to-electric-cyan/5 border border-lux-gold/20 rounded-2xl relative overflow-hidden select-none">
                          {/* Top gold line indicator */}
                          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-lux-gold via-white to-electric-cyan" />
                          <div className="absolute -right-8 -bottom-8 w-20 h-20 bg-lux-gold/5 rounded-full blur-xl pointer-events-none" />

                          <div className="flex justify-between items-center w-full border-b border-white/5 pb-2">
                            <div className="flex items-center gap-1">
                              <span className="text-[10px]">🇸🇦</span>
                              <span className="text-[8px] font-display font-bold text-lux-gold uppercase tracking-widest">Sovereign Investor</span>
                            </div>
                            <span className="text-[7.5px] font-display font-extrabold text-[#10b981] bg-[#10b981]/15 border border-[#10b981]/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              Approved
                            </span>
                          </div>

                          <div className="flex flex-col gap-1.5 w-full text-left font-display">
                            <div>
                              <span className="text-[6.5px] text-zinc-500 font-bold uppercase tracking-widest block">Consensus Wallet Address</span>
                              <span className="text-[8.5px] font-mono text-zinc-300 font-semibold">{address ? address.substring(0, 12) + '...' + address.substring(address.length - 8) : '0x71C2...3a5f'}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-1">
                              <div>
                                <span className="text-[6.5px] text-zinc-500 font-bold uppercase tracking-widest block">Accreditation</span>
                                <span className="text-[8.5px] text-zinc-300 font-bold uppercase">Class II Tier</span>
                              </div>
                              <div>
                                <span className="text-[6.5px] text-zinc-500 font-bold uppercase tracking-widest block">Limit Cap</span>
                                <span className="text-[8.5px] text-lux-gold font-extrabold">$250,000 USD</span>
                              </div>
                            </div>
                          </div>

                          <div className="w-full flex items-center justify-center gap-1.5 bg-[#10b981]/10 border border-[#10b981]/20 rounded-lg py-1.5 mt-1 select-none">
                            <FileCheck className="w-4 h-4 text-[#10b981]" />
                            <span className="text-[8px] font-display font-bold text-[#10b981] uppercase tracking-wider">Consensus Registry Completed</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Copy Referral link Sidebar card */}
                <div className="lg:col-span-4 glass-layer p-6 rounded-2xl flex flex-col justify-between border-l-2 border-lux-gold">
                  <div>
                    <h3 className="font-display font-bold text-xs uppercase tracking-widest text-white flex items-center gap-2 mb-3.5">
                      <Users className="w-4 h-4 text-lux-gold" />
                      Referral Ambassador
                    </h3>
                    <p className="text-zinc-400 text-[11px] leading-relaxed font-body">
                      Invite teammates to contribute pre-sale slots. Earn **5% direct commission payouts** deposited straight to your connected address.
                    </p>
                  </div>

                  <div className="mt-5">
                    <label className="text-[9px] font-display font-bold uppercase tracking-widest text-zinc-500 block mb-2 select-none">Your ambassador link</label>
                    <div className="flex bg-space-black rounded-xl p-1.5 border border-white/10 items-center justify-between">
                      <span className="text-[9px] font-mono text-zinc-500 overflow-hidden text-ellipsis whitespace-nowrap pl-2 pr-4 lowercase">
                        bitraxx.io/presale?ref={address ? address.substring(0, 8) + '...' : '0x4f3e...b1a2'}
                      </span>
                      <button 
                        onClick={() => handleCopyLink(address ? `https://bitraxx.io/presale?ref=${address}` : 'https://bitraxx.io/presale?ref=0x4f3e...b1a2', '📋 Referral ambassador link copied to clipboard!')}
                        className="bg-lux-gold p-2 rounded-lg text-black hover:bg-[#e9c349] transition-colors"
                        title="Copy referral link"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* LIVE PRESALE ACTIVITY LEDGER */}
              <div className="glass-layer p-6 rounded-2xl border-t border-white/5 flex flex-col gap-4 mt-8 shadow-[0_0_20px_rgba(0,217,255,0.01)] select-none">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-lux-gold animate-ping" />
                    <span className="w-2 h-2 rounded-full bg-lux-gold absolute" />
                    <h3 className="font-display font-bold text-xs uppercase tracking-widest text-white flex items-center gap-1.5 ml-1">
                      Live Presale Contribution Feed
                    </h3>
                  </div>
                  <span className="text-[8px] font-display font-bold text-zinc-500 uppercase tracking-widest">Global Activity • Real-time Ticker</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-hidden">
                  {contributions.map((tx) => (
                    <div 
                      key={tx.id} 
                      className="bg-space-black/60 border border-white/5 rounded-xl p-4 flex flex-col justify-between gap-3 relative overflow-hidden transition-all duration-500 hover:border-lux-gold/30 hover:scale-[1.01] animate-slideIn gold-thread-left"
                    >
                      {/* Top row */}
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono text-zinc-400 font-bold">{tx.flag} {tx.wallet}</span>
                        <span className="text-[8px] font-display font-bold text-zinc-500 uppercase tracking-wider">{tx.time}</span>
                      </div>
                      
                      {/* Mid row */}
                      <div className="flex justify-between items-end mt-1">
                        <div>
                          <span className="text-[8px] font-display font-bold text-zinc-500 uppercase tracking-widest block mb-0.5">CONTRIBUTED</span>
                          <span className="text-xs font-display font-bold text-white font-mono">{tx.amount} <span className="text-[9px] text-lux-gold font-normal">{tx.currency}</span></span>
                        </div>
                        <div className="text-right">
                          <span className="text-[8px] font-display font-bold text-zinc-500 uppercase tracking-widest block mb-0.5">ACQUIRED</span>
                          <span className="text-xs font-display font-bold text-electric-cyan font-mono">+{tx.tokens} <span className="text-[8px] text-zinc-400 font-normal">BRX</span></span>
                        </div>
                      </div>

                      {/* Network Badge bottom */}
                      <div className="flex items-center justify-between border-t border-white/5 pt-2 mt-1">
                        <span className="text-[8px] text-zinc-500 font-display font-bold uppercase tracking-wider">Multi-Chain Vault</span>
                        <span className={`text-[8px] font-display font-extrabold uppercase px-2 py-0.5 rounded-full ${tx.network === 'BSC' ? 'bg-[#f0b90b]/10 text-[#f0b90b] border border-[#f0b90b]/20' : 'bg-[#627eea]/10 text-[#8c8c8c] border border-[#627eea]/20'}`}>
                          {tx.network} Network
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* B. PRESALE VIEW (Payment Gateway & Web3 contributions) */}
          {activeTab === 'presale' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-slideUp">
              
              {/* Payment input calculator */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                <div className="glass-layer p-6 rounded-2xl">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                    <div>
                      <h3 className="font-display font-bold text-lg text-white tracking-wide">BRX Token presale round</h3>
                      <p className="text-[9px] text-zinc-500 font-display font-bold uppercase tracking-widest mt-0.5">Secure allocations at institutional rates</p>
                    </div>
                    <span className="text-[10px] font-display font-bold text-lux-gold bg-lux-gold/10 border border-lux-gold/20 px-3 py-1 rounded-full uppercase tracking-wider select-none animate-pulse">
                      Seed Stage Live
                    </span>
                  </div>

                  <form onSubmit={executePurchase} className="flex flex-col gap-5">
                    
                    {/* Currency Selector */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] font-display font-bold uppercase tracking-widest text-zinc-500 select-none">Select Purchase Asset</label>
                      <div className="grid grid-cols-5 gap-2">
                        {(['USDT', 'USDC', 'ETH', 'BNB', 'BTC'] as const).map((curr) => (
                          <button
                            key={curr}
                            type="button"
                            onClick={() => { setPurchaseCurrency(curr); setManualPayMethod(false); }}
                            className={`py-3 rounded-xl font-display text-xs font-bold border transition-all ${purchaseCurrency === curr && !manualPayMethod ? 'bg-lux-gold border-lux-gold text-black shadow-md gold-bloom' : 'bg-space-black border-white/5 text-zinc-400 hover:text-white'}`}
                          >
                            {curr}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Pay amount input */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] font-display font-bold uppercase tracking-widest text-zinc-500">Contribute Amount ({purchaseCurrency})</label>
                        <input
                          type="number"
                          step="any"
                          value={payAmount}
                          onChange={(e) => setPayAmount(e.target.value)}
                          className="w-full bg-void-navy border border-white/10 rounded-xl px-4 py-3 text-sm font-display font-semibold text-white focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/30 transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] font-display font-bold uppercase tracking-widest text-zinc-500">Allocated Return ($BRX)</label>
                        <div className="w-full bg-space-black/50 border border-white/5 rounded-xl px-4 py-3 text-sm font-display font-bold text-lux-gold flex items-center justify-between select-none">
                          <span>{receiveTokens.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                          <span className="text-[10px] text-zinc-500">BRX</span>
                        </div>
                      </div>
                    </div>

                    {/* Toggle between Web3 MetaMask one-click & manual deposits */}
                    <div className="flex gap-4 border-t border-white/5 pt-4 mt-2">
                      <button
                        type="button"
                        onClick={() => setManualPayMethod(false)}
                        className={`flex-1 py-3 rounded-xl text-xs font-display font-bold border uppercase tracking-wider transition-all ${!manualPayMethod ? 'bg-void-navy border-electric-cyan/30 text-white' : 'bg-transparent border-white/5 text-zinc-500 hover:text-zinc-300'}`}
                      >
                        ⚡ Web3 instant contributor
                      </button>
                      <button
                        type="button"
                        onClick={() => setManualPayMethod(true)}
                        className={`flex-1 py-3 rounded-xl text-xs font-display font-bold border uppercase tracking-wider transition-all ${manualPayMethod ? 'bg-void-navy border-electric-cyan/30 text-white' : 'bg-transparent border-white/5 text-zinc-500 hover:text-zinc-300'}`}
                      >
                        🔒 Manual deposit address
                      </button>
                    </div>

                    {/* Manual Dynamic Deposit Generation (as per spec) */}
                    {manualPayMethod && (
                      <div className="bg-space-black/80 border border-white/5 rounded-xl p-5 flex flex-col gap-4 animate-fadeIn">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-display font-bold text-zinc-500 uppercase tracking-widest">DYNAMIC DEPOSIT GATEWAY ({purchaseCurrency})</span>
                          <span className="text-[9px] text-lux-gold font-display font-bold tracking-wider">Generates unique Address</span>
                        </div>

                        <div className="flex bg-void-navy rounded-xl p-2 border border-white/10 items-center justify-between">
                          <span className="text-xs font-mono text-zinc-300 overflow-hidden text-ellipsis whitespace-nowrap pl-2 pr-4">
                            {dynamicAddress}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyLink(dynamicAddress, '📋 Deposit wallet address copied to clipboard!')}
                            className="bg-lux-gold p-2 rounded-lg text-black hover:bg-[#e9c349] transition-colors"
                            title="Copy dynamic address"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex flex-col gap-1.5 mt-2">
                          <label className="text-[9px] font-display font-bold uppercase tracking-widest text-zinc-500">Step 2: Enter Transaction Hash (Gas Tx)</label>
                          <input
                            type="text"
                            value={manualTxHash}
                            onChange={(e) => setManualTxHash(e.target.value)}
                            placeholder="0x7a8...91fd"
                            className="w-full bg-void-navy border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-zinc-700 focus:outline-none focus:border-electric-cyan transition-all"
                          />
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-lux-gold text-black font-display font-bold uppercase tracking-widest text-xs gold-bloom hover:bg-[#e9c349] transition-all transform hover:scale-[1.01]"
                    >
                      {!manualPayMethod ? 'Execute Direct Wallet contribution' : 'Submit Manual Deposit Receipt'}
                    </button>

                  </form>
                </div>
              </div>

              {/* Sidebar Presale Rounds */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                
                {/* Live Progress Tracker */}
                <div className="glass-layer p-6 rounded-2xl select-none">
                  <h3 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-400 border-b border-white/5 pb-3 mb-4 flex items-center justify-between">
                    <span>Live Presale Progress</span>
                    <Activity className="w-4 h-4 text-electric-cyan" />
                  </h3>
                  
                  <div className="flex justify-between text-xs font-display font-bold text-zinc-300 uppercase tracking-wide mb-1">
                    <span>Raised Capital</span>
                    <span>$3.24M / $5.00M</span>
                  </div>

                  <div className="w-full bg-void-navy h-2.5 rounded-full border border-white/5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-lux-gold to-orange-400 h-full shadow-[0_0_10px_#D4AF37]" 
                      style={{ width: '64.8%' }}
                    />
                  </div>

                  <div className="flex justify-between text-[9px] font-display font-bold uppercase tracking-widest mt-2">
                    <span className="text-electric-cyan">64.8% Filled</span>
                    <span className="text-zinc-500">Remaining: 14.5M BRX</span>
                  </div>
                </div>

                {/* Staged info details card */}
                <div className="glass-layer p-6 rounded-2xl flex flex-col gap-3.5 select-none">
                  <h3 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-400 border-b border-white/5 pb-3 mb-1">Stage Schedules</h3>
                  
                  <div className="flex justify-between items-center text-xs font-display py-1">
                    <span className="text-zinc-400">Seed round</span>
                    <span className="text-lux-gold font-bold font-mono">$0.04</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-display py-1">
                    <span className="text-zinc-500">Private Round</span>
                    <span className="text-zinc-500 font-mono">$0.08</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-display py-1">
                    <span className="text-zinc-500">Public Round</span>
                    <span className="text-zinc-500 font-mono">$0.12</span>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* C. TOKENOMICS VIEW (Interactive Allocation Pie Chart & specs) */}
          {activeTab === 'tokenomics' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-slideUp">
              
              {/* Dynamic Pie-Chart Allocation */}
              <div className="lg:col-span-8 glass-layer p-6 rounded-2xl">
                <h3 className="font-display font-bold text-lg text-white border-b border-white/5 pb-4 mb-6">Tokenomics allocation</h3>
                
                <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
                  
                  {/* SVG Pie Chart Mock */}
                  <div className="relative w-56 h-56 flex-shrink-0 flex items-center justify-center select-none">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                      {/* Seed - 15% (Gold) */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#D4AF37" strokeWidth="3" strokeDasharray="15 85" strokeDashoffset="0" />
                      {/* Public - 25% (Electric Cyan) */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#00D9FF" strokeWidth="3" strokeDasharray="25 75" strokeDashoffset="-15" />
                      {/* Team - 20% (Indigo) */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#6366f1" strokeWidth="3" strokeDasharray="20 80" strokeDashoffset="-40" />
                      {/* Liquidity - 30% (Emerald) */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="30 70" strokeDashoffset="-60" />
                      {/* Reserve - 10% (Rose) */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f43f5e" strokeWidth="3" strokeDasharray="10 90" strokeDashoffset="-90" />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#05070A]/80 rounded-full w-[84%] h-[84%] m-auto border border-white/5">
                      <span className="text-[10px] font-display font-bold text-zinc-500 uppercase tracking-widest">Total Supply</span>
                      <span className="text-sm font-display font-bold text-white tracking-wide font-mono">1,000,000,000</span>
                      <span className="text-[9px] text-lux-gold font-display font-bold tracking-wider uppercase mt-0.5">$BRX</span>
                    </div>
                  </div>

                  {/* Legends details */}
                  <div className="flex-1 flex flex-col gap-3 font-display text-xs">
                    {[
                      { label: 'Ecosystem Liquidity (30%)', value: '300,000,000 BRX', color: '#10b981' },
                      { label: 'Public Presale Allocation (25%)', value: '250,000,000 BRX', color: '#00D9FF' },
                      { label: 'Core Team & Founders (20%)', value: '200,000,000 BRX', color: '#6366f1' },
                      { label: 'Seed Round Investors (15%)', value: '150,000,000 BRX', color: '#D4AF37' },
                      { label: 'Strategic Treasury Reserves (10%)', value: '100,000,000 BRX', color: '#f43f5e' }
                    ].map((leg, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 bg-space-black/50 border border-white/5 rounded-xl">
                        <div className="flex items-center gap-2.5">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: leg.color }} />
                          <span className="text-zinc-400 font-medium">{leg.label}</span>
                        </div>
                        <span className="text-white font-semibold font-mono">{leg.value}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* Vesting Rules sidebar */}
              <div className="lg:col-span-4 glass-layer p-6 rounded-2xl flex flex-col gap-4 select-none">
                <h3 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-400 border-b border-white/5 pb-3">Contributor Lock Rules</h3>
                
                <div className="flex flex-col gap-3.5">
                  <div className="bg-space-black/50 p-3.5 rounded-xl border border-white/5">
                    <span className="text-[9px] font-display font-bold uppercase tracking-widest text-lux-gold block mb-1">Seed Round Vesting</span>
                    <p className="text-[10px] text-zinc-400 leading-normal">
                      10% release at Token Generation Event (TGE), followed by 3 months cliff period, then 10% monthly vesting releases.
                    </p>
                  </div>

                  <div className="bg-space-black/50 p-3.5 rounded-xl border border-white/5">
                    <span className="text-[9px] font-display font-bold uppercase tracking-widest text-electric-cyan block mb-1">Founders & Team Vesting</span>
                    <p className="text-[10px] text-zinc-400 leading-normal">
                      0% release at TGE, 12 months cliff period, followed by 5% linear release monthly over 20 months.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* D. BRX UTILITY VIEW (Staking calculator & governance) */}
          {activeTab === 'utility' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-slideUp">
              
              {/* Compound Staking vault */}
              {(() => {
                const activeApy = stakingMonths <= 3 ? 10.0 : stakingMonths <= 6 ? 12.5 : stakingMonths <= 9 ? 15.0 : 18.5;
                const rawAmt = parseFloat(stakingAmount) || 0;
                const rewardYield = (rawAmt * (activeApy / 100) * stakingMonths) / 12;
                const votingWeight = stakingMonths >= 9 ? (stakingMonths >= 12 ? '2.5x' : '1.8x') : '1.2x';
                const gasSavings = rawAmt > 0 ? (12.45 + (rawAmt * 0.00012)) : 0;
                const governanceBadge = stakingMonths >= 12 ? 'Sovereign Consensus' : stakingMonths >= 9 ? 'Lead Delegate' : 'DAO Voter';
                
                return (
                  <div className="lg:col-span-8 glass-layer p-6 rounded-2xl flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-bold text-lg text-white border-b border-white/5 pb-4 mb-5">Strategic Validator Staking</h3>
                      <p className="text-zinc-400 text-xs leading-relaxed font-body">
                        Lock allocations to secure validator consensus nodes and compound APY yields. Higher stakes unlock higher shield insurance percentages.
                      </p>

                      {/* Calculator elements */}
                      <div className="bg-space-black/60 border border-white/5 rounded-xl p-5 my-6 flex flex-col gap-4 select-none">
                        <div className="flex justify-between items-center text-xs font-display font-bold uppercase tracking-widest">
                          <span className="text-zinc-500">Target Stake Amount ($BRX)</span>
                          <span className="text-lux-gold font-bold">{activeApy.toFixed(1)}% APR Vault</span>
                        </div>

                        <input
                          type="number"
                          value={stakingAmount}
                          onChange={(e) => setStakingAmount(e.target.value)}
                          className="w-full bg-void-navy border border-white/10 rounded-xl px-4 py-2.5 text-sm font-display font-bold text-white focus:outline-none focus:border-electric-cyan transition-all"
                        />

                        <div className="flex flex-col gap-1.5 mt-2">
                          <div className="flex justify-between text-[8px] font-display font-bold uppercase tracking-widest text-zinc-500">
                            <span>3 Months (10.0% APY)</span>
                            <span className="text-white font-semibold">{stakingMonths} Months Lock</span>
                            <span>12 Months (18.5% APY)</span>
                          </div>
                          <input 
                            type="range" 
                            min="3" 
                            max="12" 
                            step="3" 
                            value={stakingMonths}
                            onChange={(e) => setStakingMonths(parseInt(e.target.value))}
                            className="w-full accent-lux-gold bg-void-navy rounded-lg cursor-pointer h-1.5" 
                          />
                        </div>

                        {/* ADVANCED YIELD BREAKDOWN GRID */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/5 pt-4 mt-2">
                          <div className="bg-void-navy/40 p-2.5 rounded-lg border border-white/5">
                            <span className="text-[7.5px] font-display font-bold uppercase tracking-widest text-zinc-500 block mb-1">Gross Yields</span>
                            <span className="text-sm font-display font-bold text-lux-gold font-mono">
                              {Math.floor(rewardYield).toLocaleString(undefined, { maximumFractionDigits: 0 })} BRX
                            </span>
                          </div>
                          <div className="bg-void-navy/40 p-2.5 rounded-lg border border-white/5">
                            <span className="text-[7.5px] font-display font-bold uppercase tracking-widest text-zinc-500 block mb-1">Shield™ Coverage</span>
                            <span className="text-sm font-display font-bold text-electric-cyan uppercase">
                              +{stakingMonths >= 9 ? '40%' : '20%'} loss
                            </span>
                          </div>
                          <div className="bg-void-navy/40 p-2.5 rounded-lg border border-white/5">
                            <span className="text-[7.5px] font-display font-bold uppercase tracking-widest text-zinc-500 block mb-1">DAO Voting Power</span>
                            <span className="text-sm font-display font-bold text-indigo-400 font-mono">
                              {votingWeight}
                            </span>
                          </div>
                          <div className="bg-void-navy/40 p-2.5 rounded-lg border border-white/5">
                            <span className="text-[7.5px] font-display font-bold uppercase tracking-widest text-zinc-500 block mb-1">Governance Slot</span>
                            <span className="text-xs font-display font-bold text-emerald-400 uppercase truncate block">
                              {governanceBadge}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => showToast(`🔐 Vault Staked! Allocated ${parseFloat(stakingAmount).toLocaleString()} BRX inside validator consensus node successfully for ${stakingMonths} months.`)}
                      className="w-full py-3.5 bg-lux-gold text-black hover:bg-[#e9c349] font-display font-bold uppercase tracking-widest text-xs rounded-full transition-all gold-bloom"
                    >
                      Confirm validator Stake Lock
                    </button>
                  </div>
                );
              })()}

              {/* Governance Proposal sidebar */}
              <div className="lg:col-span-4 glass-layer p-6 rounded-2xl flex flex-col gap-4 select-none">
                <h3 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-400 border-b border-white/5 pb-3">DAO Governance Decisions</h3>
                
                <div className="flex flex-col gap-4 mt-2">
                  <div className="bg-space-black/50 p-4 rounded-xl border border-white/5">
                    <span className="text-[8px] font-display font-bold text-lux-gold bg-lux-gold/10 border border-lux-gold/20 px-2 py-0.5 rounded-full uppercase inline-block mb-2">Proposal #08</span>
                    <h4 className="text-white font-display font-bold text-xs mb-1.5">Reduce Team Vesting by 5%?</h4>
                    <div className="flex gap-2">
                      <button onClick={() => showToast('🗳️ Governance vote registered!')} className="flex-1 py-1 bg-void-navy hover:bg-void-navy/60 border border-white/10 rounded-lg text-[9px] font-display font-bold uppercase tracking-wider text-white">VOTE YES</button>
                      <button onClick={() => showToast('🗳️ Governance vote registered!')} className="flex-1 py-1 bg-void-navy hover:bg-void-navy/60 border border-white/10 rounded-lg text-[9px] font-display font-bold uppercase tracking-wider text-white">VOTE NO</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* E. STAGES VIEW (Seed, Private, Public specs & tickers) */}
          {activeTab === 'stages' && (
            <div className="flex flex-col gap-8 animate-slideUp">
              
              <div className="glass-layer p-6 rounded-2xl">
                <h3 className="font-display font-bold text-lg text-white border-b border-white/5 pb-4 mb-6">Presale stage milestones</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-display text-xs">
                  
                  {/* Round 1 */}
                  <div className={`p-5 rounded-xl border flex flex-col gap-4 relative overflow-hidden ${activeRound === 'seed' ? 'bg-lux-gold/5 border-lux-gold/40 shadow-xl gold-thread-left' : 'bg-space-black/50 border-white/5 opacity-60'}`}>
                    <div className="flex justify-between items-center select-none">
                      <span className="text-[9px] uppercase tracking-widest text-lux-gold font-bold">Round 1</span>
                      {activeRound === 'seed' && (
                        <span className="text-[8px] bg-lux-gold/10 text-lux-gold border border-lux-gold/20 px-2 py-0.5 rounded uppercase font-semibold">Active</span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-bold uppercase">Seed Round Stage</h4>
                      <p className="text-zinc-500 font-bold uppercase text-[9px] mt-0.5">Base contribution rate</p>
                    </div>
                    <div className="text-xl font-bold text-lux-gold font-mono">${seedRoundPrice.toFixed(2)} <span className="text-[10px] text-zinc-500 font-normal">/ BRX</span></div>
                  </div>

                  {/* Round 2 */}
                  <div className={`p-5 rounded-xl border flex flex-col gap-4 relative overflow-hidden ${activeRound === 'private' ? 'bg-lux-gold/5 border-lux-gold/40 shadow-xl gold-thread-left' : 'bg-space-black/50 border-white/5 opacity-60'}`}>
                    <div className="flex justify-between items-center select-none">
                      <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Round 2</span>
                      {activeRound === 'private' && (
                        <span className="text-[8px] bg-lux-gold/10 text-lux-gold border border-lux-gold/20 px-2 py-0.5 rounded uppercase font-semibold">Active</span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-bold uppercase">Private Round Stage</h4>
                      <p className="text-zinc-500 font-bold uppercase text-[9px] mt-0.5">Whitelisted buyers only</p>
                    </div>
                    <div className="text-xl font-bold text-white font-mono">${privateRoundPrice.toFixed(2)} <span className="text-[10px] text-zinc-500 font-normal">/ BRX</span></div>
                  </div>

                  {/* Round 3 */}
                  <div className={`p-5 rounded-xl border flex flex-col gap-4 relative overflow-hidden ${activeRound === 'public' ? 'bg-lux-gold/5 border-lux-gold/40 shadow-xl gold-thread-left' : 'bg-space-black/50 border-white/5 opacity-60'}`}>
                    <div className="flex justify-between items-center select-none">
                      <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Round 3</span>
                      {activeRound === 'public' && (
                        <span className="text-[8px] bg-lux-gold/10 text-lux-gold border border-lux-gold/20 px-2 py-0.5 rounded uppercase font-semibold">Active</span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-bold uppercase">Public Round Stage</h4>
                      <p className="text-zinc-500 font-bold uppercase text-[9px] mt-0.5">Final exchange list rate</p>
                    </div>
                    <div className="text-xl font-bold text-white font-mono">${publicRoundPrice.toFixed(2)} <span className="text-[10px] text-zinc-500 font-normal">/ BRX</span></div>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* F. ROADMAP VIEW (Futuristic Milestone timeline) */}
          {activeTab === 'roadmap' && (
            <div className="glass-layer p-6 rounded-2xl animate-slideUp">
              <h3 className="font-display font-bold text-lg text-white border-b border-white/5 pb-4 mb-6">Interactive roadmap quarters</h3>
              
              <div className="flex flex-col gap-6 select-none font-display">
                {[
                  { quarter: 'Q3 2023', title: 'Concept Formulation & Ideation', details: 'Formulated sovereign mathematical match architecture, written whitepaper specs.', status: 'Completed' },
                  { quarter: 'Q4 2023', title: 'Web3 Presale Scaffolding', details: 'Designed secure dynamic Saudi theme layout and direct-buy gateways.', status: 'Completed' },
                  { quarter: 'Q1 2024', title: 'BitRaxx Shield™ Insurance', details: 'Deploy contract insurance triggers covering up to 40% losses during micro-market crash loops.', status: 'Ongoing' },
                  { quarter: 'Q2 2024', title: 'Global Public DEX Exchange Listings', details: 'Institutional listing gates, liquidity pool initialization on 4 networks.', status: 'Planned' }
                ].map((road, i) => (
                  <div key={i} className="flex gap-6 items-start group">
                    <div className="flex flex-col items-center">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border ${road.status === 'Completed' ? 'bg-electric-cyan/15 text-electric-cyan border-electric-cyan/30 shadow-[0_0_10px_rgba(0,217,255,0.2)]' : road.status === 'Ongoing' ? 'bg-lux-gold/15 text-lux-gold border-lux-gold/30 animate-pulse' : 'bg-zinc-800 text-zinc-500 border-white/5'}`}>
                        {i + 1}
                      </span>
                      {i < 3 && <span className="w-0.5 h-14 bg-white/5" />}
                    </div>

                    <div className="flex-1 bg-space-black/50 p-4 rounded-xl border border-white/5 hover:border-white/15 transition-all">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-lux-gold font-bold text-xs uppercase tracking-wider">{road.quarter}</span>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${road.status === 'Completed' ? 'bg-electric-cyan/10 text-electric-cyan border-electric-cyan/15' : road.status === 'Ongoing' ? 'bg-lux-gold/10 text-lux-gold border-lux-gold/15 animate-pulse' : 'bg-zinc-900 text-zinc-500 border-transparent'}`}>{road.status}</span>
                      </div>
                      <h4 className="text-white font-bold text-sm mb-1.5">{road.title}</h4>
                      <p className="text-zinc-400 text-xs leading-relaxed">{road.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* G. WHITEPAPER VIEW (Built-in Viewer layout) */}
          {activeTab === 'whitepaper' && (
            <div className="glass-layer p-6 rounded-2xl animate-slideUp">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6 select-none">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Sovereign Whitepaper viewer</h3>
                  <p className="text-[9px] text-zinc-500 font-display font-bold uppercase tracking-widest mt-0.5">Section 1: Bitraxx Sovereign Shield Platform</p>
                </div>
                <button 
                  onClick={() => showToast('📥 Downloading full institutional whitepaper PDF...')}
                  className="bg-lux-gold text-black px-4 py-2 rounded-full text-[10px] font-display font-bold uppercase tracking-widest hover:bg-[#e9c349]"
                >
                  Download PDF
                </button>
              </div>

              <div className="bg-space-black/50 border border-white/5 rounded-xl p-6 h-[400px] overflow-y-auto text-xs leading-relaxed text-zinc-400 flex flex-col gap-4 font-body">
                <h4 className="text-white font-display font-bold text-sm uppercase tracking-wide">1. Abstract</h4>
                <p>
                  Bitraxx initiates a cinematic paradigm shift in multi-chain financial ecosystems. By integrating custom matching engines, native AES secure transaction pools, and the BitRaxx Shield™ automated loss insurance algorithms, investors can interact with Web3 protocols while mitigating critical downside tail-risk up to 40% during volatile liquidity drain periods.
                </p>
                <h4 className="text-white font-display font-bold text-sm uppercase tracking-wide mt-4">2. The BitRaxx Shield™ Mechanism</h4>
                <p>
                  BitRaxx Shield™ operates by locking specialized capital reserves in cross-chain protocol protection pools. When an asset experiences severe negative volatility triggers during an active insured spot order, the automated contract pool offsets capital loss by contributing native treasury compensations directly to the user wallet on execution.
                </p>
                <p>
                  This provides bank-grade trade insurance directly on-chain, securing Saudi-Arabian sovereign financial architectural resilience within decentralised structures.
                </p>
              </div>
            </div>
          )}

          {/* H. SUPER ADMIN VIEW (Control presale rounds, KYC lists) */}
          {activeTab === 'admin' && (
            <div className="flex flex-col gap-8 animate-slideUp">
              
              {/* Presale Control Console */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 select-none">
                
                {/* Control Toggles */}
                <div className="lg:col-span-7 glass-layer p-6 rounded-2xl border-l-2 border-rose-500">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                    <div>
                      <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">Presale state controller</h3>
                      <p className="text-[9px] text-zinc-500 uppercase tracking-widest mt-0.5">Control live rounds, pricing, and system access</p>
                    </div>
                    <span className={`text-[9px] font-display font-bold px-2.5 py-0.5 rounded border uppercase ${presaleStatus === 'active' ? 'bg-electric-cyan/15 text-electric-cyan border-electric-cyan/25' : presaleStatus === 'paused' ? 'bg-lux-gold/15 text-lux-gold border-lux-gold/25' : 'bg-rose-500/15 text-rose-500 border-rose-500/25'}`}>
                      {presaleStatus}
                    </span>
                  </div>

                  {/* Price override fields */}
                  <div className="grid grid-cols-3 gap-4 font-display text-xs mb-5">
                    <div>
                      <span className="text-zinc-500 block mb-1">Seed Price ($)</span>
                      <input
                        type="number"
                        step="0.01"
                        value={seedRoundPrice}
                        onChange={(e) => setSeedRoundPrice(parseFloat(e.target.value) || 0)}
                        className="w-full bg-void-navy border border-white/10 rounded-lg p-2 text-white font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-zinc-500 block mb-1">Private Price ($)</span>
                      <input
                        type="number"
                        step="0.01"
                        value={privateRoundPrice}
                        onChange={(e) => setPrivateRoundPrice(parseFloat(e.target.value) || 0)}
                        className="w-full bg-void-navy border border-white/10 rounded-lg p-2 text-white font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-zinc-500 block mb-1">Public Price ($)</span>
                      <input
                        type="number"
                        step="0.01"
                        value={publicRoundPrice}
                        onChange={(e) => setPublicRoundPrice(parseFloat(e.target.value) || 0)}
                        className="w-full bg-void-navy border border-white/10 rounded-lg p-2 text-white font-mono"
                      />
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => { setPresaleStatus('active'); showToast('🚀 Presale round restarted successfully!'); }}
                      className="flex-1 py-2.5 rounded-lg bg-electric-cyan/10 border border-electric-cyan/35 text-electric-cyan hover:bg-electric-cyan/20 text-xs font-display font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5" /> Start Round
                    </button>
                    <button
                      onClick={() => { setPresaleStatus('paused'); showToast('⚠️ Presale contribution round paused.'); }}
                      className="flex-1 py-2.5 rounded-lg bg-lux-gold/10 border border-lux-gold/35 text-lux-gold hover:bg-lux-gold/20 text-xs font-display font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                    >
                      <Pause className="w-3.5 h-3.5" /> Pause Round
                    </button>
                    <button
                      onClick={() => { setPresaleStatus('terminated'); showToast('🛑 Presale terminated.'); }}
                      className="flex-1 py-2.5 rounded-lg bg-rose-500/10 border border-rose-500/35 text-rose-500 hover:bg-rose-500/20 text-xs font-display font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Terminate
                    </button>
                  </div>
                </div>

                {/* Pool Liquidity Monitors */}
                <div className="lg:col-span-5 glass-layer p-6 rounded-2xl flex flex-col gap-4">
                  <h3 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-400 border-b border-white/5 pb-3">Contributed pools liquidity</h3>
                  
                  <div className="flex flex-col gap-2.5 font-display text-xs">
                    <div className="flex justify-between items-center p-2 bg-space-black/50 border border-white/5 rounded-xl">
                      <span className="text-zinc-500">USDT Pool Balance</span>
                      <span className="text-white font-semibold font-mono">$1,845,900 USDT</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-space-black/50 border border-white/5 rounded-xl">
                      <span className="text-zinc-500">ETH Pool Balance</span>
                      <span className="text-white font-semibold font-mono">382.41 ETH</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-space-black/50 border border-white/5 rounded-xl">
                      <span className="text-zinc-500">BNB Pool Balance</span>
                      <span className="text-white font-semibold font-mono">592.80 BNB</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* KYC User Approval Override ledger */}
              <div className="glass-layer rounded-2xl overflow-hidden shadow-md">
                <div className="p-6 border-b border-white/5 bg-void-navy/40 flex justify-between items-center">
                  <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">KYC Verification Override queue</h3>
                  <span className="text-[10px] font-display font-bold text-zinc-500 uppercase tracking-widest">Manual approvals dashboard</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse font-display text-xs">
                    <thead>
                      <tr className="text-zinc-500 font-bold uppercase tracking-widest border-b border-white/5 select-none bg-space-black/40 text-[9px]">
                        <th className="px-6 py-3 font-semibold">User ID</th>
                        <th className="px-6 py-3 font-semibold">Investor Name</th>
                        <th className="px-6 py-3 font-semibold">Wallet Address</th>
                        <th className="px-6 py-3 font-semibold">Document</th>
                        <th className="px-6 py-3 font-semibold">State</th>
                        <th className="px-6 py-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {kycApplications.map((app) => (
                        <tr key={app.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-white font-mono">#{app.id}</td>
                          <td className="px-6 py-4 text-white font-medium">{app.name}</td>
                          <td className="px-6 py-4 text-zinc-500 font-mono">{app.wallet}</td>
                          <td className="px-6 py-4 text-zinc-400 font-semibold">{app.type}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${app.status === 'Approved' ? 'bg-electric-cyan/15 text-electric-cyan border border-electric-cyan/20' : app.status === 'Pending' ? 'bg-lux-gold/15 text-lux-gold border border-lux-gold/20 animate-pulse' : 'bg-rose-500/10 text-rose-500'}`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {app.status === 'Pending' && (
                              <div className="inline-flex gap-2">
                                <button
                                  onClick={() => handleAdminKycApproval(app.id, 'Approved')}
                                  className="bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan hover:bg-electric-cyan/20 px-3 py-1 rounded font-bold uppercase text-[9px]"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleAdminKycApproval(app.id, 'Rejected')}
                                  className="bg-rose-500/10 border border-rose-500/30 text-rose-500 hover:bg-rose-500/20 px-3 py-1 rounded font-bold uppercase text-[9px]"
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </main>

        {/* Global social Ticker notifications */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 animate-bounce">
            <div className="flex items-center gap-3 bg-[#0A0E14] border border-lux-gold/30 px-5 py-4 rounded-xl shadow-[0_0_30px_-5px_rgba(212,175,55,0.25)] text-xs font-display font-bold uppercase tracking-widest text-white">
              <CheckCircle className="w-5 h-5 text-lux-gold shrink-0" />
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        {/* Floating Support chat button */}
        <button 
          onClick={() => showToast('💬 Initializing live Web3 24/7 Human support rep chat...')}
          className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#0A0E14] border border-white/10 text-zinc-200 hover:text-white rounded-full shadow-2xl hover:border-lux-gold/40 transition-all group hover:scale-105"
        >
          <MessageSquare className="w-4 h-4 text-lux-gold group-hover:rotate-12 transition-transform" />
          <span className="text-[10px] font-display font-bold uppercase tracking-widest">Support</span>
        </button>

        {/* Unified shared footer */}
        <footer className="border-t border-white/5 bg-[#090D14]/80 px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-[9px] font-display font-bold uppercase tracking-widest text-zinc-500">
          <div className="flex items-center gap-4">
            <span>© 2026 Bitraxx Presale sovereign portal. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <a href="#" className="hover:text-zinc-400 transition-colors">Vesting Rules</a>
            <span className="hidden md:inline">•</span>
            <a href="#" className="hover:text-zinc-400 transition-colors">Platform audit</a>
          </div>
          <div className="flex items-center gap-4 font-mono select-none">
            <span className="flex items-center gap-1 text-lux-gold"><Lock className="w-3 h-3" /> SSL SECURED</span>
            <span>PRESALE NODE: ACTIVE</span>
            <span className="flex items-center gap-1 text-electric-cyan"><span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" /> ENGINE ONLINE</span>
          </div>
        </footer>

      </section>

    </div>
  );
}

// Simple internal helper component
function ZapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
