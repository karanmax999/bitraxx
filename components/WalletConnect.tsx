"use client";

import React, { useEffect } from "react";
import { Wallet, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useWallet } from "@/hooks/useWallet";

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

type Props = {
  variant?: "gradient" | "outline";
};

/**
 * WalletConnect — RainbowKit triggers wallet selection + WAGMI connection.
 * After the wallet is connected, we automatically start the SIWE sign-in flow.
 */
export default function WalletConnect({ variant = "gradient" }: Props) {
  const { isConnected } = useAccount();
  const { status, address, error, signIn, disconnect } = useWallet();

  // Automatically trigger SIWE sign-in once wallet is connected via RainbowKit
  useEffect(() => {
    if (isConnected && status === "disconnected") {
      signIn();
    }
  }, [isConnected, status, signIn]);

  // ── Connected + authenticated ──────────────────────────────────────────────
  if (status === "connected" && address) {
    return (
      <button
        onClick={disconnect}
        className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/8 px-4 py-2 text-sm font-medium text-amber-300 backdrop-blur-sm transition-colors hover:bg-amber-500/20 active:scale-95"
        title="Click to sign out"
      >
        <CheckCircle2 className="h-4 w-4 text-amber-400" />
        {truncateAddress(address)}
      </button>
    );
  }

  // ── Signing SIWE message ───────────────────────────────────────────────────
  if (status === "signing") {
    return (
      <button
        disabled
        className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/8 px-4 py-2 text-sm font-medium text-amber-300 backdrop-blur-sm opacity-80 cursor-not-allowed"
      >
        <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
        Sign message…
      </button>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (status === "error") {
    return (
      <div className="flex flex-col items-end gap-1">
        <button
          onClick={signIn}
          className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 backdrop-blur-sm transition-colors hover:bg-red-500/20 active:scale-95"
          title="Retry sign-in"
        >
          <AlertCircle className="h-4 w-4" />
          Retry Sign-In
        </button>
        {error && (
          <span className="text-xs text-red-400 max-w-[200px] text-right">{error}</span>
        )}
      </div>
    );
  }

  // ── Default: show RainbowKit ConnectButton ─────────────────────────────────
  return (
    <ConnectButton.Custom>
      {({ openConnectModal, mounted }) => {
        const ready = mounted;
        return (
          <button
            onClick={openConnectModal}
            disabled={!ready}
            className={
              variant === "outline"
                ? "inline-flex items-center gap-2 rounded-md border px-4 py-1.5 text-sm font-medium transition-colors active:scale-[0.98] disabled:opacity-50"
                : "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-black transition-all hover:scale-[1.03] hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
            }
            style={
              variant === "outline"
                ? {
                    borderColor: "var(--border-hover)",
                    color: "var(--text-primary)",
                    backgroundColor: "transparent",
                  }
                : {
                    background: "linear-gradient(135deg, #fcd34d, #f59e0b, #d97706)",
                    boxShadow: "0 0 16px 2px rgba(245,158,11,0.35)",
                  }
            }
          >
            <Wallet className="h-4 w-4" />
            Connect Wallet
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
}
