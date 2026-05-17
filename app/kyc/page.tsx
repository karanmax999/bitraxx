'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function KYCPage() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'none' | 'pending' | 'approved' | 'rejected'>('none');

  return (
    <div className="min-h-screen bg-background text-foreground p-8 pt-24">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-orbitron font-bold mb-4">Identity Verification</h1>
          <p className="text-secondary">Complete your KYC to participate in the $BRX presale. This is a one-time process.</p>
        </header>

        {status === 'none' ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            <div className="flex justify-between mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === s ? 'bg-accent-cyan text-background' : 'bg-white/10 text-secondary'}`}>
                    {s}
                  </div>
                  <span className={`text-xs uppercase font-bold tracking-widest ${step === s ? 'text-accent-cyan' : 'text-secondary'}`}>
                    {s === 1 ? 'Personal' : s === 2 ? 'Document' : 'Selfie'}
                  </span>
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-secondary mb-2">Full Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent-cyan transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm text-secondary mb-2">Date of Birth</label>
                  <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent-cyan transition-colors" />
                </div>
                <button onClick={() => setStep(2)} className="w-full py-4 bg-accent-cyan text-background rounded-xl font-bold hover:scale-[1.02] transition-transform">
                  Continue
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center hover:border-accent-cyan transition-colors cursor-pointer">
                  <div className="text-4xl mb-4">📄</div>
                  <p className="text-secondary">Upload ID Card, Passport or Driver's License</p>
                  <input type="file" className="hidden" id="doc-upload" />
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="flex-1 py-4 border border-white/10 rounded-xl font-bold hover:bg-white/5 transition-colors">Back</button>
                  <button onClick={() => setStep(3)} className="flex-1 py-4 bg-accent-cyan text-background rounded-xl font-bold hover:scale-[1.02] transition-transform">Continue</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 text-center">
                <div className="w-48 h-48 rounded-full border-4 border-accent-cyan/20 mx-auto bg-white/5 flex items-center justify-center text-4xl">
                  👤
                </div>
                <p className="text-secondary text-sm px-12">Please take a clear selfie holding your ID and a note with "BitraXx 2026".</p>
                <div className="flex gap-4">
                  <button onClick={() => setStep(2)} className="flex-1 py-4 border border-white/10 rounded-xl font-bold hover:bg-white/5 transition-colors">Back</button>
                  <button onClick={() => setStatus('pending')} className="flex-1 py-4 bg-neon-gradient text-white rounded-xl font-bold shadow-neon-cyan hover:scale-[1.02] transition-transform">Submit KYC</button>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="p-12 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className={`text-6xl mb-6 ${status === 'pending' ? 'animate-pulse' : ''}`}>
              {status === 'pending' ? '⏳' : status === 'approved' ? '✅' : '❌'}
            </div>
            <h2 className="text-2xl font-orbitron font-bold mb-2">
              {status === 'pending' ? 'KYC Under Review' : status === 'approved' ? 'Verification Successful' : 'Verification Failed'}
            </h2>
            <p className="text-secondary mb-8">
              {status === 'pending' ? "We're reviewing your documents. This usually takes 12-24 hours." : status === 'approved' ? "You're all set! You can now participate in the $BRX presale." : "Your KYC was rejected. Please check your email for details."}
            </p>
            {status === 'approved' && (
              <a href="/dashboard" className="inline-block px-8 py-3 bg-accent-cyan text-background rounded-full font-bold hover:scale-105 transition-transform">Go to Dashboard</a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
