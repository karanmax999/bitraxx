'use client';

import React, { ReactNode } from 'react';
import { config, projectId } from '@/config/wagmi';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

// Setup QueryClient
const queryClient = new QueryClient();

// Create Web3Modal instance (client-side only)
if (typeof window !== 'undefined') {
  createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true,
    enableOnramp: true,
    themeMode: 'dark',
    themeVariables: {
      '--w3m-color-mix': '#0d1117',
      '--w3m-color-mix-strength': 40,
      '--w3m-accent': '#00ff88',
      '--w3m-border-radius-master': '12px'
    }
  });
}

export default function Web3ModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
