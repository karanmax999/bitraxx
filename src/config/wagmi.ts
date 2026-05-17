import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { cookieStorage, createStorage } from 'wagmi';
import { mainnet, bsc, polygon, arbitrum } from 'wagmi/chains';

// Get projectId from environment
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || 'e36a43878b27ad428dbd6139cd364a88';

export const metadata = {
  name: 'Bitraxx V1',
  description: 'Bitraxx V1 - High Performance Spot Trading & Multi-chain Wallet',
  url: 'https://bitraxx.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

export const chains = [mainnet, bsc, polygon, arbitrum] as const;

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  })
});
