"use client";

import React, { useState } from "react";
import { Wallet, AlertCircle, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useWallet } from "@/hooks/useWallet";

type WalletOption = {
  id: string;
  name: string;
  icon: string;
};

const WALLETS: WalletOption[] = [
  { id: "metamask", name: "MetaMask", icon: "🦊" },
  { id: "walletconnect", name: "WalletConnect", icon: "🔗" },
  { id: "coinbase", name: "Coinbase Wallet", icon: "🔵" },
];

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Simulated mock addresses per wallet
const MOCK_ADDRESSES: Record<string, string> = {
  metamask: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  walletconnect: "0x3A5e2B4E5e2B4E5e2B4E5e2B4E5e2B4E5e2B4E5e",
  coinbase: "0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7",
};

type Props = {
  variant?: "gradient" | "outline";
};

export default function WalletConnect({ variant = "gradient" }: Props) {
  const [open, setOpen] = useState(false);
  const { status, address, error, activeConnector, connect, disconnect } = useWallet();

  async function handleSelect(wallet: WalletOption) {
    try {
      await connect(wallet.id);
      setOpen(false);
    } catch (e) {
      // Error is stored in the hook and shown in the UI
    }
  }

  if (status === "connected" && address) {
    return (
      <button 
        onClick={disconnect}
        className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/8 px-4 py-2 text-sm font-medium text-amber-300 backdrop-blur-sm transition-colors hover:bg-amber-500/20 active:scale-95"
        title="Click to disconnect"
      >
        <CheckCircle2 className="h-4 w-4 text-amber-400" />
        {truncateAddress(address)}
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={
          variant === "outline"
            ? "inline-flex items-center gap-2 rounded-md border px-4 py-1.5 text-sm font-medium transition-colors active:scale-[0.98]"
            : "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-black transition-all hover:scale-[1.03] hover:opacity-90 active:scale-[0.98]"
        }
        style={variant === "outline"
          ? { borderColor: "var(--border-hover)", color: "var(--text-primary)", backgroundColor: "transparent" }
          : { background: "linear-gradient(135deg, #fcd34d, #f59e0b, #d97706)", boxShadow: "0 0 16px 2px rgba(245,158,11,0.35)" }}
      >
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect a Wallet</DialogTitle>
            <DialogDescription>
              Choose your preferred wallet to participate in the presale.
            </DialogDescription>
          </DialogHeader>

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-3">
            {WALLETS.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => handleSelect(wallet)}
                disabled={status === "connecting"}
                className="flex w-full items-center gap-4 rounded-2xl border border-amber-500/10 bg-[var(--bg-card)] px-5 py-4 text-left transition-all hover:bg-amber-500/5 hover:border-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-2xl">{wallet.icon}</span>
                <span className="flex-1 font-medium text-white">{wallet.name}</span>
                {activeConnector === wallet.id && status === "connecting" && (
                  <span className="text-xs text-zinc-400 animate-pulse">Connecting…</span>
                )}
              </button>
            ))}
          </div>

          <p className="mt-4 text-center text-xs text-zinc-500">
            By connecting, you agree to our Terms of Service.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
