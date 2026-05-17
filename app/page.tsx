import { Hero } from '@/components/Hero';
import { ProgressBar } from '@/components/ProgressBar';
import { PresaleStages } from '@/components/PresaleStages';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent-cyan/30">
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-background/50 backdrop-blur-md border-b border-white/5">
        <div className="text-2xl font-orbitron font-black tracking-tighter bg-neon-gradient bg-clip-text text-transparent">
          BITRAXX
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-secondary">
          <a href="#" className="hover:text-accent-cyan transition-colors">Presale</a>
          <a href="#" className="hover:text-accent-cyan transition-colors">Tokenomics</a>
          <a href="#" className="hover:text-accent-cyan transition-colors">Roadmap</a>
          <a href="#" className="hover:text-accent-cyan transition-colors">Whitepaper</a>
        </div>
        <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-bold border border-white/20 transition-all">
          Launch App
        </button>
      </nav>

      <Hero />
      
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <ProgressBar raised={1250000} softCap={2000000} hardCap={5000000} />
      </div>

      <PresaleStages />

      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-orbitron mb-8">Why Invest in $BRX?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h4 className="text-accent-cyan font-bold mb-2">Automated Liquidity</h4>
              <p className="text-secondary text-sm">Every transaction contributes to the liquidity pool, ensuring stable trading post-launch.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h4 className="text-accent-purple font-bold mb-2">Staking Rewards</h4>
              <p className="text-secondary text-sm">Holders earn passive income through our automated staking protocols.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h4 className="text-accent-magenta font-bold mb-2">Governance Rights</h4>
              <p className="text-secondary text-sm">Influence the future of Bitraxx by participating in DAO voting.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h4 className="text-white font-bold mb-2">Deflationary Model</h4>
              <p className="text-secondary text-sm">Regular token burns reduce supply and increase long-term value.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 text-center">
        <div className="text-2xl font-orbitron font-black tracking-tighter mb-8">BITRAXX</div>
        <div className="flex justify-center gap-6 mb-8 text-secondary">
          <a href="#" className="hover:text-accent-cyan">Telegram</a>
          <a href="#" className="hover:text-accent-cyan">X (Twitter)</a>
          <a href="#" className="hover:text-accent-cyan">GitHub</a>
          <a href="#" className="hover:text-accent-cyan">TikTok</a>
        </div>
        <p className="text-secondary/50 text-xs">© 2026 Bitraxx Platform. All rights reserved.</p>
      </footer>
    </main>
  );
}
