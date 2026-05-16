"use client";

import { useState } from "react";

export type WalletStatus = "disconnected" | "connecting" | "connected";

const MOCK_ADDRESSES: Record<string, string> = {
  metamask: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  walletconnect: "0x3A5e2B4E5e2B4E5e2B4E5e2B4E5e2B4E5e2B4E5e",
  coinbase: "0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7",
};

export function useWallet() {
  const [status, setStatus] = useState<WalletStatus>("disconnected");
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeConnector, setActiveConnector] = useState<string | null>(null);

  const connect = async (connectorId: string) => {
    setStatus("connecting");
    setActiveConnector(connectorId);
    setError(null);

    try {
      // Simulate wallet connection delay
      await new Promise((r) => setTimeout(r, 450));

      // Simulate occasional connection rejection
      if (Math.random() < 0.1) {
        throw new Error("Connection request rejected.");
      }

      setStatus("connected");
      setAddress(MOCK_ADDRESSES[connectorId] || MOCK_ADDRESSES.metamask);
    } catch (err: any) {
      setStatus("disconnected");
      setActiveConnector(null);
      setError(err.message || "Failed to connect");
      throw err;
    }
  };

  const disconnect = () => {
    setStatus("disconnected");
    setActiveConnector(null);
    setAddress(null);
  };

  return {
    status,
    address,
    error,
    activeConnector,
    connect,
    disconnect,
  };
}
