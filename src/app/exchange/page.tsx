'use client';

import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import WalletConnectButton from '@/components/WalletConnectButton';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { 
  Shield, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Zap, 
  Lock, 
  CheckCircle,
  Activity,
  ChevronRight,
  Database,
  Coins,
  BadgeAlert,
  MessageSquare,
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface CryptoAsset {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume: string;
  chain: string;
}

export default function ExchangePage() {
  const { isConnected } = useAccount();

  // Selected asset
  const [selectedAsset, setSelectedAsset] = useState<CryptoAsset>({
    symbol: 'BRX',
    name: 'Bitraxx Token',
    price: 1.28,
    change24h: 12.45,
    volume: '$4.2M',
    chain: 'EVM (Multi-chain)'
  });

  // Timeframe and Candlestick Chart States
  const [timeframe, setTimeframe] = useState<'1m' | '5m' | '15m' | '1h'>('5m');
  
  interface Candle {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }
  
  const [chartData, setChartData] = useState<Candle[]>([]);
  const [hoveredCandle, setHoveredCandle] = useState<Candle | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Generate mock historical candles based on selected asset price
  const generateMockData = (basePrice: number, timeframeStr: string): Candle[] => {
    const count = 28;
    const data: Candle[] = [];
    let currentPrice = basePrice * 0.97; // start slightly lower for visual rise
    const now = new Date();
    
    for (let i = 0; i < count; i++) {
      const minutesAgo = (count - i) * (timeframeStr === '1m' ? 1 : timeframeStr === '5m' ? 5 : timeframeStr === '15m' ? 15 : 60);
      const candleTime = new Date(now.getTime() - minutesAgo * 60 * 1000);
      const timeLabel = candleTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      
      const change = (Math.random() - 0.43) * (basePrice * 0.012); // drift upward slightly
      const open = currentPrice;
      const close = currentPrice + change;
      const high = Math.max(open, close) + Math.random() * (basePrice * 0.005);
      const low = Math.min(open, close) - Math.random() * (basePrice * 0.005);
      const volume = Math.floor(Math.random() * 80000 + 20000);
      
      data.push({
        time: timeLabel,
        open,
        high,
        low,
        close,
        volume
      });
      currentPrice = close;
    }
    return data;
  };

  // Synchronize mock historical chart data on asset/timeframe updates
  useEffect(() => {
    const data = generateMockData(selectedAsset.price, timeframe);
    setChartData(data);
    setHoveredCandle(null);
    setHoveredIndex(null);
  }, [selectedAsset, timeframe]);

  // Simulate live price ticks for the latest candlestick bar in the chart
  useEffect(() => {
    if (chartData.length === 0) return;
    
    const interval = setInterval(() => {
      setChartData(prev => {
        if (prev.length === 0) return prev;
        const lastIndex = prev.length - 1;
        const lastCandle = prev[lastIndex];
        
        // Brownian price movement simulator matching latency ticks
        const priceDiff = (Math.random() - 0.5) * (selectedAsset.price * 0.0015);
        const nextClose = lastCandle.close + priceDiff;
        
        const updatedLast = {
          ...lastCandle,
          close: nextClose,
          high: Math.max(lastCandle.high, nextClose),
          low: Math.min(lastCandle.low, nextClose)
        };
        
        const nextArr = [...prev];
        nextArr[lastIndex] = updatedLast;
        return nextArr;
      });
    }, 1500);
    
    return () => clearInterval(interval);
  }, [chartData, selectedAsset]);

  // Mouse position event calculator relative to container width
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    
    const count = chartData.length;
    if (count === 0) return;
    
    let index = Math.floor(pct * count);
    if (index < 0) index = 0;
    if (index >= count) index = count - 1;
    
    setHoveredIndex(index);
    setHoveredCandle(chartData[index]);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setHoveredCandle(null);
  };


  // State for BitRaxx Shield™
  const [shieldActive, setShieldActive] = useState<boolean>(true);
  const [shieldCoverage, setShieldCoverage] = useState<number>(30);
  
  // State for Trading Form
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'conditional'>('market');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [priceInput, setPriceInput] = useState<string>('1.28');
  const [amountInput, setAmountInput] = useState<string>('100');
  const [stopLoss, setStopLoss] = useState<boolean>(false);
  const [takeProfit, setTakeProfit] = useState<boolean>(false);
  
  // Real-time matching stats
  const [matchingLatency, setMatchingLatency] = useState<number>(0.18);
  const [orderBookSells, setOrderBookSells] = useState<{ price: number; amount: number }[]>([]);
  const [orderBookBuys, setOrderBookBuys] = useState<{ price: number; amount: number }[]>([]);
  
  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const assets: CryptoAsset[] = [
    { symbol: 'BRX', name: 'Bitraxx Token', price: 1.28, change24h: 12.45, volume: '$4.2M', chain: 'EVM (Multi-chain)' },
    { symbol: 'BTC', name: 'Bitcoin', price: 68420.50, change24h: 1.85, volume: '$28.4B', chain: 'Ethereum Network' },
    { symbol: 'ETH', name: 'Ethereum', price: 3450.25, change24h: -0.42, volume: '$15.1B', chain: 'Ethereum Network' },
    { symbol: 'SOL', name: 'Solana', price: 148.80, change24h: -2.35, volume: '$3.8B', chain: 'Solana Network' },
    { symbol: 'TRX', name: 'TRON', price: 0.124, change24h: 0.85, volume: '$840M', chain: 'TRON Network' }
  ];

  // Initialize and simulate live order book & matching latency updates
  useEffect(() => {
    // Sync price input with selected asset default price
    setPriceInput(selectedAsset.price.toString());

    // Generate initial order book
    const generateOrderBook = (basePrice: number) => {
      const sells = Array.from({ length: 6 }, (_, i) => ({
        price: basePrice * (1 + (i + 1) * 0.0005),
        amount: Math.random() * 2.5 + 0.1
      })).reverse();
      
      const buys = Array.from({ length: 6 }, (_, i) => ({
        price: basePrice * (1 - (i + 1) * 0.0005),
        amount: Math.random() * 3 + 0.15
      }));

      setOrderBookSells(sells);
      setOrderBookBuys(buys);
    };

    generateOrderBook(selectedAsset.price);

    const interval = setInterval(() => {
      // Simulate micro-fluctuations in matching latency
      setMatchingLatency(parseFloat((0.15 + Math.random() * 0.1).toFixed(2)));

      // Simulate slight price updates in order book
      setOrderBookSells(prev => prev.map(item => ({
        ...item,
        amount: Math.max(0.01, item.amount + (Math.random() * 0.2 - 0.1))
      })));
      setOrderBookBuys(prev => prev.map(item => ({
        ...item,
        amount: Math.max(0.01, item.amount + (Math.random() * 0.2 - 0.1))
      })));
    }, 1500);

    return () => clearInterval(interval);
  }, [selectedAsset]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      showToast('⚠️ Please connect your Web3 wallet to execute trades.');
      return;
    }

    const typeStr = tradeType.toUpperCase();
    const orderStr = orderType.toUpperCase();
    const protectionStr = shieldActive ? `with BitRaxx Shield™ protection (${shieldCoverage}% coverage)` : 'without insurance';

    showToast(`🚀 ${orderStr} ${typeStr} Order Submitted: ${amountInput} ${selectedAsset.symbol} @ ${orderType === 'market' ? 'Market Price' : `$${priceInput}`} ${protectionStr}!`);
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen relative overflow-x-hidden bg-space-black">
      
      {/* Cinematic Deep Space Glow Effects */}
      <div className="absolute top-[-30%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-lux-gold/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-15%] w-[55vw] h-[55vw] rounded-full bg-electric-cyan/5 blur-[150px] pointer-events-none" />

      {/* Header section */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-void-navy/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Logo className="w-36 h-10 cursor-pointer" />
          </Link>
          <div className="hidden xs:flex items-center gap-1.5 text-[9px] font-display font-bold uppercase tracking-wider text-zinc-500 border-l border-white/10 pl-4 h-6">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse shadow-[0_0_6px_#00D9FF]" />
            Matching Engine Online
          </div>
        </div>

        {/* Unified Tab Navigation using standard Next.js Link routing */}
        <nav className="flex items-center bg-space-black/60 rounded-full p-1 border border-white/5 mx-4 max-w-sm">
          <Link
            href="/exchange"
            className="flex items-center gap-2 px-5 py-2 text-xs font-display font-bold uppercase tracking-wider rounded-full transition-all duration-300 bg-lux-gold text-black gold-bloom shadow-md"
          >
            <Activity className="w-4 h-4" />
            Spot Exchange
          </Link>
          <Link
            href="/launchpad"
            className="flex items-center gap-2 px-5 py-2 text-xs font-display font-bold uppercase tracking-wider rounded-full transition-all duration-300 text-zinc-400 hover:text-white hover:bg-white/5"
          >
            <Sparkles className="w-4 h-4" />
            Sovereign Launchpad
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <WalletConnectButton />
        </div>
      </header>

      {/* Main Grid View */}
      <main className="flex-1 p-6 grid grid-cols-1 xl:grid-cols-12 gap-6 max-w-[1600px] mx-auto w-full animate-slideUp">
        
        {/* TOP WIDGET: Cinematic Presale Tracker */}
        <section className="xl:col-span-12">
          <div className="glass-layer rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 gold-thread-left shadow-[0_0_30px_-5px_rgba(212,175,55,0.04)]">
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-display font-semibold text-lux-gold uppercase tracking-widest mb-1.5">
                <Sparkles className="w-4 h-4" />
                Presale Phase 1 Active
              </div>
              <h2 className="text-2xl font-display font-bold tracking-tight text-white md:max-w-md">
                Secure the Golden Epoch of Multi-Chain Liquidity
              </h2>
              <p className="text-xs text-zinc-400 mt-2 max-w-xl leading-relaxed">
                Bitraxx presale integrates unified liquidity across 4 major chains. Claim your BRX tokens at the institutional base rate before exchange listing.
              </p>
            </div>

            {/* Presale Capital Progress Bar */}
            <div className="w-full md:w-96 bg-space-black/80 rounded-xl p-5 border border-white/5 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-display font-semibold uppercase tracking-wider text-zinc-400">
                <span>Raised Capital</span>
                <span className="text-white">$3,204,500 / $5,000,000</span>
              </div>
              
              {/* Progress Bar Container (Trough) */}
              <div className="relative w-full h-2.5 bg-void-navy rounded-full border border-white/5">
                {/* Cyan Fill */}
                <div 
                  className="absolute left-0 top-0 bottom-0 rounded-full bg-gradient-to-r from-electric-cyan to-indigo-500 shadow-[0_0_12px_rgba(0,217,255,0.4)]"
                  style={{ width: '64.1%' }}
                />
                
                {/* Gold Marker indicating Contribution */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-lux-gold rounded-full border border-black shadow-[0_0_12px_#D4AF37] cursor-help z-10 flex items-center justify-center group"
                  style={{ left: '35%' }}
                >
                  <div className="w-1.5 h-1.5 bg-black rounded-full" />
                  
                  {/* Tooltip */}
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-void-navy border border-lux-gold/30 text-[9px] font-display font-bold uppercase tracking-widest text-lux-gold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-xl whitespace-nowrap z-20">
                    Your Hold: $2,500
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-[10px] font-display font-semibold uppercase tracking-wider">
                <span className="text-electric-cyan">64.1% Filled</span>
                <span className="text-zinc-500">12,452 participants</span>
              </div>
            </div>
          </div>
        </section>

        {/* LEFT COLUMN: Assets & Live Trade Form */}
        <section className="xl:col-span-4 flex flex-col gap-6">
          
          {/* Spot Markets Card */}
          <div className="glass-layer rounded-2xl p-5 flex flex-col gap-4 shadow-[0_0_20px_rgba(255,255,255,0.01)]">
            <h2 className="text-xs font-display font-bold tracking-widest uppercase text-zinc-500 flex items-center justify-between border-b border-white/5 pb-2.5">
              <span>Spot Markets</span>
              <Coins className="w-4 h-4 text-lux-gold" />
            </h2>
            <div className="flex flex-col gap-1 max-h-[220px] overflow-y-auto pr-1">
              {assets.map((ast) => (
                <button
                  key={ast.symbol}
                  onClick={() => setSelectedAsset(ast)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${selectedAsset.symbol === ast.symbol ? 'bg-lux-gold/5 border-lux-gold/30 text-white shadow-[0_0_15px_-5px_rgba(212,175,55,0.15)] gold-thread-left' : 'bg-transparent border-transparent text-zinc-400 hover:bg-white/5 hover:text-zinc-200'}`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-space-black flex items-center justify-center font-display font-bold text-xs border border-white/10 text-lux-gold">
                      {ast.symbol}
                    </div>
                    <div className="text-left">
                      <div className="font-display font-semibold text-sm tracking-wide">{ast.symbol}</div>
                      <div className="text-[9px] font-display font-bold uppercase tracking-wider text-zinc-500">{ast.chain}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display font-semibold text-sm text-white">${ast.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                    <span className={`font-mono text-[9px] font-bold flex items-center justify-end ${ast.change24h >= 0 ? 'text-electric-cyan' : 'text-rose-400'}`}>
                      {ast.change24h >= 0 ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                      {ast.change24h >= 0 ? '+' : ''}{ast.change24h}%
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Trade Execution Panel */}
          <div className="glass-layer rounded-2xl p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-xs font-display font-bold text-zinc-200 uppercase tracking-widest flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-lux-gold" />
                Place Order ({selectedAsset.symbol})
              </span>
              <div className="flex bg-space-black rounded-full p-0.5 border border-white/5">
                <button 
                  onClick={() => setTradeType('buy')}
                  className={`px-4 py-1 text-[10px] font-display font-bold uppercase tracking-wider rounded-full transition-all ${tradeType === 'buy' ? 'bg-lux-gold text-black shadow-md' : 'text-zinc-500 hover:text-white'}`}
                >
                  Buy
                </button>
                <button 
                  onClick={() => setTradeType('sell')}
                  className={`px-4 py-1 text-[10px] font-display font-bold uppercase tracking-wider rounded-full transition-all ${tradeType === 'sell' ? 'bg-rose-500 text-white shadow-md' : 'text-zinc-500 hover:text-white'}`}
                >
                  Sell
                </button>
              </div>
            </div>

            {/* Order Types */}
            <div className="grid grid-cols-3 gap-1 bg-space-black rounded-lg p-1 border border-white/5 text-[10px] font-display font-bold uppercase tracking-wider">
              {(['market', 'limit', 'conditional'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setOrderType(t)}
                  className={`py-1.5 rounded-md transition-all ${orderType === t ? 'bg-void-navy text-white shadow-sm border border-white/5' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Trading Inputs */}
            <form onSubmit={handlePlaceOrder} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase font-display font-bold tracking-widest text-zinc-500">Order Price (USDT)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    value={orderType === 'market' ? '' : priceInput}
                    onChange={(e) => setPriceInput(e.target.value)}
                    placeholder="Market Price"
                    disabled={orderType === 'market'}
                    className="w-full bg-void-navy border border-white/10 rounded-xl px-4 py-2.5 text-sm font-display font-medium text-white placeholder-zinc-700 focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  {orderType === 'market' && (
                    <span className="absolute right-4 top-2.5 text-[10px] font-display font-semibold tracking-wider text-electric-cyan/80 italic">Est. Best Price</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase font-display font-bold tracking-widest text-zinc-500">Amount ({selectedAsset.symbol})</label>
                <input
                  type="number"
                  step="any"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  className="w-full bg-void-navy border border-white/10 rounded-xl px-4 py-2.5 text-sm font-display font-medium text-white focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/30 transition-all"
                />
              </div>

              <div className="border-t border-white/5 pt-3 mt-1 flex flex-col gap-2.5">
                <label className="flex items-center justify-between p-2.5 bg-void-navy/40 border border-white/5 rounded-xl cursor-pointer hover:border-white/10 transition-colors">
                  <span className="text-xs text-zinc-400 flex items-center gap-2 font-display font-medium">
                    <input 
                      type="checkbox" 
                      checked={stopLoss} 
                      onChange={(e) => setStopLoss(e.target.checked)}
                      className="rounded border-white/10 text-lux-gold focus:ring-lux-gold/30 bg-space-black" 
                    />
                    Stop-Loss Trigger
                  </span>
                  {stopLoss && <span className="text-[10px] font-display font-bold text-zinc-500 tracking-wider">-5.00% Limit</span>}
                </label>

                <label className="flex items-center justify-between p-2.5 bg-void-navy/40 border border-white/5 rounded-xl cursor-pointer hover:border-white/10 transition-colors">
                  <span className="text-xs text-zinc-400 flex items-center gap-2 font-display font-medium">
                    <input 
                      type="checkbox" 
                      checked={takeProfit} 
                      onChange={(e) => setTakeProfit(e.target.checked)}
                      className="rounded border-white/10 text-lux-gold focus:ring-lux-gold/30 bg-space-black" 
                    />
                    Take-Profit Trigger
                  </span>
                  {takeProfit && <span className="text-[10px] font-display font-bold text-zinc-500 tracking-wider">+15.00% Limit</span>}
                </label>
              </div>

              {shieldActive && (
                <div className="mt-1 flex items-center justify-between p-3 rounded-xl bg-electric-cyan/5 border border-electric-cyan/20 text-xs text-electric-cyan">
                  <span className="flex items-center gap-1.5 font-display font-bold uppercase tracking-wider">
                    <Shield className="w-4 h-4 animate-pulse text-electric-cyan" />
                    BitRaxx Shield™ Active
                  </span>
                  <span className="font-display font-semibold">40% Capital Coverage</span>
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-3.5 rounded-full font-display font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-md transform hover:scale-[1.01] active:scale-[0.99] ${tradeType === 'buy' ? 'bg-lux-gold text-black gold-bloom shadow-[#D4AF37]/5 hover:bg-[#e9c349]' : 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/10'}`}
              >
                {tradeType === 'buy' ? 'Execute Buy' : 'Execute Sell'} {selectedAsset.symbol}
              </button>
            </form>
          </div>
        </section>

        {/* MIDDLE COLUMN: Chart & Order Book */}
        <section className="xl:col-span-5 flex flex-col gap-6">
          
          {/* Interactive Chart Visualizer */}
          <div className="glass-layer rounded-2xl p-5 flex flex-col gap-4 flex-1 min-h-[340px]">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-sm font-display font-bold uppercase tracking-widest text-zinc-200 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-electric-cyan" />
                  {selectedAsset.symbol}/USDT Real-time Chart
                </h2>
                <p className="text-[9px] text-zinc-500 font-display font-bold uppercase tracking-widest mt-0.5">Matching Latency: {matchingLatency}ms • sub-millisecond precision</p>
              </div>
              <div className="flex items-center gap-3">
                {/* Timeframe Selectors */}
                <div className="flex items-center gap-1 bg-space-black p-0.5 rounded-lg border border-white/5">
                  {(['1m', '5m', '15m', '1h'] as const).map(tf => (
                    <button
                      key={tf}
                      type="button"
                      onClick={() => setTimeframe(tf)}
                      className={`px-2 py-0.5 rounded text-[9px] font-display font-bold uppercase transition-all duration-200 ${timeframe === tf ? 'bg-lux-gold text-black font-extrabold' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-electric-cyan animate-ping" />
                  <span className="text-[9px] font-display font-bold text-electric-cyan tracking-widest">LIVE</span>
                </div>
              </div>
            </div>

            {/* Price OHLC Display Header */}
            {(() => {
              const activeCandle = hoveredCandle || chartData[chartData.length - 1];
              if (!activeCandle) return null;
              const isUp = activeCandle.close >= activeCandle.open;
              const percentDiff = ((activeCandle.close - activeCandle.open) / activeCandle.open) * 100;
              
              return (
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 bg-space-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-[10px] font-display font-semibold select-none">
                  <span className="text-zinc-500">TIME: <span className="text-zinc-300 font-mono font-medium">{activeCandle.time}</span></span>
                  <span className="text-zinc-500">O: <span className="text-zinc-300 font-mono font-medium">${activeCandle.open.toFixed(selectedAsset.symbol === 'TRX' ? 4 : 2)}</span></span>
                  <span className="text-zinc-500">H: <span className="text-zinc-300 font-mono font-medium">${activeCandle.high.toFixed(selectedAsset.symbol === 'TRX' ? 4 : 2)}</span></span>
                  <span className="text-zinc-500">L: <span className="text-zinc-300 font-mono font-medium">${activeCandle.low.toFixed(selectedAsset.symbol === 'TRX' ? 4 : 2)}</span></span>
                  <span className="text-zinc-500">C: <span className={`font-mono font-bold ${isUp ? 'text-electric-cyan' : 'text-rose-400'}`}>${activeCandle.close.toFixed(selectedAsset.symbol === 'TRX' ? 4 : 2)}</span></span>
                  <span className={`px-2 py-0.5 rounded font-mono font-extrabold ${isUp ? 'bg-electric-cyan/10 text-electric-cyan' : 'bg-rose-500/10 text-rose-400'}`}>
                    {isUp ? '+' : ''}{percentDiff.toFixed(2)}%
                  </span>
                </div>
              );
            })()}

            {/* Interactive SVG Chart */}
            <div className="flex-1 w-full bg-space-black/60 rounded-xl relative overflow-hidden border border-white/5 p-4 min-h-[220px] flex flex-col justify-between group">
              
              {/* Backgrid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none p-4 pb-12 pt-8 opacity-[0.03]">
                <div className="border-t border-dashed border-white w-full" />
                <div className="border-t border-dashed border-white w-full" />
                <div className="border-t border-dashed border-white w-full" />
                <div className="border-t border-dashed border-white w-full" />
              </div>

              {/* Render Candles & Volume */}
              {chartData.length > 0 ? (
                <div className="w-full flex-1 relative min-h-[150px]">
                  <svg 
                    className="w-full h-full cursor-crosshair overflow-visible select-none"
                    viewBox="0 0 100 100" 
                    preserveAspectRatio="none"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Definitions for Glow Gradients */}
                    <defs>
                      <linearGradient id="cyan-glow-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="rose-glow-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {(() => {
                      const prices = chartData.map(c => [c.high, c.low]).flat();
                      const maxPrice = Math.max(...prices);
                      const minPrice = Math.min(...prices);
                      const priceRange = maxPrice - minPrice || 1;
                      const maxVolume = Math.max(...chartData.map(c => c.volume), 1);

                      const getY = (val: number) => {
                        return 88 - ((val - minPrice) / priceRange) * 75; // map to Y coordinates between 13 and 88
                      };

                      const count = chartData.length;
                      const colWidth = 92 / count;

                      return (
                        <>
                          {/* 1. Semi-transparent Volume Bars */}
                          {chartData.map((c, i) => {
                            const x = 4 + i * colWidth + colWidth * 0.15;
                            const w = colWidth * 0.7;
                            const h = (c.volume / maxVolume) * 12;
                            const y = 98 - h;
                            return (
                              <rect 
                                key={`vol-${i}`}
                                x={x}
                                y={y}
                                width={w}
                                height={h}
                                fill="#ffffff"
                                opacity="0.06"
                                rx="0.5"
                              />
                            );
                          })}

                          {/* 2. Candlesticks wicks & bodies */}
                          {chartData.map((c, i) => {
                            const xCenter = 4 + i * colWidth + colWidth / 2;
                            const yHigh = getY(c.high);
                            const yLow = getY(c.low);
                            const yOpen = getY(c.open);
                            const yClose = getY(c.close);
                            
                            const isUp = c.close >= c.open;
                            const strokeColor = isUp ? '#00D9FF' : '#f43f5e';
                            
                            const rectY = Math.min(yOpen, yClose);
                            const rectH = Math.max(1, Math.abs(yOpen - yClose));
                            const rectW = colWidth * 0.65;
                            const rectX = xCenter - rectW / 2;

                            return (
                              <g key={`candle-${i}`}>
                                {/* Wick Line */}
                                <line 
                                  x1={xCenter} 
                                  y1={yHigh} 
                                  x2={xCenter} 
                                  y2={yLow} 
                                  stroke={strokeColor} 
                                  strokeWidth="0.35" 
                                  opacity="0.8"
                                />
                                {/* Candle Body Rect */}
                                <rect 
                                  x={rectX} 
                                  y={rectY} 
                                  width={rectW} 
                                  height={rectH} 
                                  fill={strokeColor}
                                  stroke={strokeColor}
                                  strokeWidth="0.15"
                                  opacity="0.9"
                                  rx="0.3"
                                  className="transition-all duration-300"
                                />
                              </g>
                            );
                          })}

                          {/* 3. Hover Guide Crosshair */}
                          {hoveredIndex !== null && hoveredCandle && (
                            <>
                              {(() => {
                                const hx = 4 + hoveredIndex * colWidth + colWidth / 2;
                                const hy = getY(hoveredCandle.close);
                                
                                return (
                                  <>
                                    {/* Vertical guide line */}
                                    <line 
                                      x1={hx} 
                                      y1={4} 
                                      x2={hx} 
                                      y2={98} 
                                      stroke="#D4AF37" 
                                      strokeWidth="0.25" 
                                      strokeDasharray="1.5,1.5"
                                      opacity="0.6"
                                    />
                                    {/* Horizontal guide line */}
                                    <line 
                                      x1={4} 
                                      y1={hy} 
                                      x2={96} 
                                      y2={hy} 
                                      stroke="#D4AF37" 
                                      strokeWidth="0.25" 
                                      strokeDasharray="1.5,1.5"
                                      opacity="0.6"
                                    />
                                    {/* Glowing intersection dot */}
                                    <circle 
                                      cx={hx} 
                                      cy={hy} 
                                      r="1.2" 
                                      fill="#D4AF37" 
                                      stroke="#ffffff" 
                                      strokeWidth="0.3"
                                    />
                                  </>
                                );
                              })()}
                            </>
                          )}
                        </>
                      );
                    })()}
                  </svg>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-zinc-600 animate-spin" />
                </div>
              )}

              {/* Dynamic bottom time axis */}
              <div className="flex justify-between text-[8px] font-display font-semibold tracking-widest text-zinc-500 border-t border-white/5 pt-2 mt-2 select-none">
                <span>{chartData[0]?.time || '15:45'}</span>
                <span>{chartData[Math.floor(chartData.length * 0.25)]?.time || '15:52'}</span>
                <span>{chartData[Math.floor(chartData.length * 0.5)]?.time || '16:00'}</span>
                <span>{chartData[Math.floor(chartData.length * 0.75)]?.time || '16:07'}</span>
                <span>{chartData[chartData.length - 1]?.time || '16:15'} (GMT+3)</span>
              </div>
            </div>
          </div>

          {/* Live Order Book */}
          <div className="glass-layer rounded-2xl p-5 flex flex-col gap-3 shadow-[0_0_20px_rgba(255,255,255,0.01)]">
            <h2 className="text-xs font-display font-bold tracking-widest uppercase text-zinc-400 flex items-center gap-1.5">
              <Database className="w-4 h-4 text-electric-cyan" />
              Live Order Book
            </h2>

            <div className="grid grid-cols-3 text-[9px] font-display font-bold uppercase tracking-widest text-zinc-500 pb-1.5 border-b border-white/5 select-none">
              <span>Price (USDT)</span>
              <span className="text-right">Amount ({selectedAsset.symbol})</span>
              <span className="text-right">Total (USDT)</span>
            </div>

            <div className="flex flex-col gap-0.5">
              {orderBookSells.map((sell, i) => (
                <div key={`sell-${i}`} className="grid grid-cols-3 text-[11px] font-mono py-1 rounded hover:bg-white/5 px-1 relative overflow-hidden transition-colors">
                  <span className="text-rose-400 font-semibold">{sell.price.toFixed(selectedAsset.symbol === 'TRX' ? 4 : 2)}</span>
                  <span className="text-right text-zinc-400">{sell.amount.toFixed(3)}</span>
                  <span className="text-right text-zinc-500">{(sell.price * sell.amount).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between py-1.5 px-3 bg-space-black border-y border-white/5 font-display font-bold text-xs rounded-lg select-none">
              <span className="text-zinc-500 uppercase tracking-wider text-[10px]">
                Spread:
                <span className="text-electric-cyan ml-1.5">${(selectedAsset.price * 0.0005).toFixed(selectedAsset.symbol === 'TRX' ? 5 : 3)}</span>
              </span>
              <span className="text-white text-xs font-semibold">${selectedAsset.price.toFixed(selectedAsset.symbol === 'TRX' ? 4 : 2)}</span>
            </div>

            <div className="flex flex-col gap-0.5">
              {orderBookBuys.map((buy, i) => (
                <div key={`buy-${i}`} className="grid grid-cols-3 text-[11px] font-mono py-1 rounded hover:bg-white/5 px-1 relative overflow-hidden transition-colors">
                  <span className="text-electric-cyan font-semibold">{buy.price.toFixed(selectedAsset.symbol === 'TRX' ? 4 : 2)}</span>
                  <span className="text-right text-zinc-400">{buy.amount.toFixed(3)}</span>
                  <span className="text-right text-zinc-500">{(buy.price * buy.amount).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Shield, Unified Wallet, SSL Secure Engine */}
        <section className="xl:col-span-3 flex flex-col gap-6">
          
          {/* BitRaxx Shield™ Trade Insurance Card */}
          <div className={`rounded-2xl p-5 flex flex-col gap-4 border transition-all duration-500 ${shieldActive ? 'glass-layer border-lux-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.05)] gold-thread-left' : 'glass-layer'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg border transition-all duration-300 ${shieldActive ? 'bg-lux-gold/10 text-lux-gold border-lux-gold/30 shadow-[0_0_10px_rgba(212,175,55,0.2)]' : 'bg-space-black text-zinc-600 border-white/5'}`}>
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-white tracking-wide">BitRaxx Shield™</h3>
                  <p className="text-[9px] font-display font-bold text-zinc-500 uppercase tracking-widest">Insurance active</p>
                </div>
              </div>
            </div>

            <div className="bg-space-black/60 rounded-xl p-4 border border-white/5 flex flex-col gap-3.5">
              <div className="flex items-center justify-between text-xs font-display font-semibold uppercase tracking-wider">
                <span className="text-zinc-500">Insured Level</span>
                <span className={`font-bold ${shieldActive ? 'text-lux-gold' : 'text-zinc-500'}`}>{shieldActive ? `${shieldCoverage}% loss cover` : 'Inactive'}</span>
              </div>

              {shieldActive && (
                <div className="flex flex-col gap-1.5">
                  <input
                    type="range"
                    min="10"
                    max="40"
                    step="5"
                    value={shieldCoverage}
                    onChange={(e) => setShieldCoverage(parseInt(e.target.value))}
                    className="w-full accent-lux-gold bg-void-navy rounded-lg cursor-pointer h-1.5"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Unified Wallet Dashboard */}
          <div className="glass-layer rounded-2xl p-5 flex flex-col gap-4">
            <h3 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-400 flex items-center justify-between">
              <span>Unified Wallet</span>
            </h3>

            <div className="flex flex-col gap-2">
              {[
                { chain: 'Ethereum', symbol: 'ETH', balance: isConnected ? '1.450' : '0.000', value: isConnected ? '$5,002' : '$0' },
                { chain: 'BNB Chain', symbol: 'BNB', balance: isConnected ? '4.820' : '0.000', value: isConnected ? '$2,845' : '$0' },
                { chain: 'Solana', symbol: 'SOL', balance: isConnected ? '12.40' : '0.000', value: isConnected ? '$1,845' : '$0' },
                { chain: 'TRON', symbol: 'TRX', balance: isConnected ? '8,400' : '0.000', value: isConnected ? '$1,041' : '$0' }
              ].map((wal) => (
                <div key={wal.chain} className="flex items-center justify-between p-3 rounded-xl bg-space-black/50 border border-white/5">
                  <div>
                    <div className="text-xs font-display font-semibold text-white tracking-wide">{wal.chain}</div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5">{wal.balance} {wal.symbol}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-display font-semibold text-white tracking-wide font-mono">{wal.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {!isConnected && (
              <div className="flex gap-2.5 p-3.5 bg-lux-gold/5 border border-lux-gold/10 rounded-xl text-lux-gold">
                <BadgeAlert className="w-5 h-5 shrink-0" />
                <div className="text-[9px] leading-normal font-display font-bold uppercase tracking-widest">Connect wallet to sync balances.</div>
              </div>
            )}
          </div>

          {/* Secure Engine Specification Panel */}
          <div className="glass-layer rounded-2xl p-5 flex flex-col gap-3">
            <h3 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-lux-gold" />
              Engine Specifications
            </h3>
            
            <div className="flex flex-col gap-2 font-display">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-space-black/50 border border-white/5">
                <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-500">Execution Speed</span>
                <span className="text-xs font-mono text-electric-cyan font-bold flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5" />
                  {matchingLatency}ms
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-space-black/50 border border-white/5">
                <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-500">Security Gate</span>
                <span className="text-[9px] uppercase font-bold text-lux-gold flex items-center gap-1 tracking-wider">
                  <Lock className="w-3.5 h-3.5" />
                  Bank-Grade AES
                </span>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Ticker Notifications */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="flex items-center gap-3 bg-void-navy border border-lux-gold/30 px-5 py-4 rounded-xl shadow-[0_0_30px_-5px_rgba(212,175,55,0.25)] text-xs font-display font-bold uppercase tracking-widest text-white">
            <CheckCircle className="w-5 h-5 text-lux-gold shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Floating 24/7 Human Support Widget */}
      <button 
        onClick={() => showToast('💬 Initializing 24/7 Human Representative Support Chat...')}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 bg-void-navy border border-white/10 text-zinc-200 hover:text-white rounded-full shadow-2xl hover:border-lux-gold/40 transition-all group hover:scale-105"
      >
        <MessageSquare className="w-4 h-4 text-lux-gold group-hover:rotate-12 transition-transform" />
        <span className="text-[10px] font-display font-bold uppercase tracking-widest">Support</span>
      </button>

      {/* Footer bar */}
      <footer className="border-t border-white/5 bg-void-navy/40 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-[9px] font-display font-bold uppercase tracking-widest text-zinc-500 mt-12">
        <div className="flex items-center gap-4">
          <span>© 2026 Bitraxx Sovereign System. All rights reserved.</span>
          <span className="hidden md:inline">•</span>
          <a href="#" className="hover:text-zinc-400 transition-colors">Whitepaper</a>
          <span className="hidden md:inline">•</span>
          <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Agreement</a>
        </div>
        <div className="flex items-center gap-4 font-mono select-none">
          <span className="flex items-center gap-1 text-lux-gold"><Lock className="w-3 h-3" /> SSL SECURED</span>
          <span>SYSTEM LOAD: 1.04%</span>
          <span className="flex items-center gap-1 text-electric-cyan"><span className="w-1.5 h-1.5 rounded-full bg-electric-cyan" /> STABLE</span>
        </div>
      </footer>
    </div>
  );
}
