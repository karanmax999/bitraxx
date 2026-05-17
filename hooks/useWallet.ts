"use client";

import { useState, useCallback } from "react";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";

export type WalletStatus = "disconnected" | "connecting" | "signing" | "connected" | "error";

export interface WalletAuthState {
  status: WalletStatus;
  address: string | null;
  isAdmin: boolean;
  error: string | null;
}

export function useWallet() {
  const { address: wagmiAddress, chain } = useAccount();
  const { disconnect: wagmiDisconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  const [authStatus, setAuthStatus] = useState<WalletStatus>("disconnected");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Trigger the SIWE sign-in flow after wallet is connected.
   * Call this immediately after RainbowKit's ConnectButton confirms a connection.
   */
  const signIn = useCallback(async () => {
    if (!wagmiAddress) return;
    setError(null);
    setAuthStatus("signing");

    try {
      // Step 1: Get a fresh nonce from the server
      const nonceRes = await fetch("/api/auth/nonce");
      if (!nonceRes.ok) throw new Error("Failed to fetch nonce");
      const { nonce } = await nonceRes.json();

      // Step 2: Build the EIP-4361 SIWE message
      const message = new SiweMessage({
        domain: window.location.host,
        address: wagmiAddress,
        statement: "Sign in to Bitraxx BRX Launchpad. This request will not trigger a blockchain transaction or cost any gas fees.",
        uri: window.location.origin,
        version: "1",
        chainId: chain?.id ?? 1,
        nonce,
      });

      const preparedMessage = message.prepareMessage();

      // Step 3: Prompt user to sign
      const signature = await signMessageAsync({ message: preparedMessage });

      // Step 4: Verify with server — creates session cookie
      const verifyRes = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: preparedMessage, signature }),
      });

      if (!verifyRes.ok) {
        const body = await verifyRes.json();
        throw new Error(body.error ?? "Verification failed");
      }

      const data = await verifyRes.json();
      setIsAdmin(data.isAdmin ?? false);
      setAuthStatus("connected");
    } catch (err: any) {
      if (err?.name === "UserRejectedRequestError" || err?.message?.includes("rejected")) {
        setError("Signature request was rejected.");
      } else {
        setError(err?.message ?? "Sign-in failed. Please try again.");
      }
      setAuthStatus("error");
    }
  }, [wagmiAddress, chain, signMessageAsync]);

  const disconnect = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Non-fatal
    }
    wagmiDisconnect();
    setAuthStatus("disconnected");
    setIsAdmin(false);
    setError(null);
  }, [wagmiDisconnect]);

  return {
    status: authStatus,
    address: wagmiAddress ?? null,
    isAdmin,
    error,
    signIn,
    disconnect,
  };
}
