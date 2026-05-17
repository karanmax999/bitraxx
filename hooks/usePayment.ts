import { useState } from 'react';
import { useWeb3 } from './useWeb3';

export type PaymentMethod = 'USDT' | 'USDC' | 'BTC' | 'ETH' | 'BNB';

export function usePayment() {
  const { sendTokens, address, isConnected } = useWeb3();
  const [status, setStatus] = useState<'idle' | 'processing' | 'confirmed' | 'failed'>('idle');
  const [error, setError] = useState<string | null>(null);

  const processPayment = async (method: PaymentMethod, amount: string) => {
    if (!isConnected || !address) {
      setError('Wallet not connected');
      setStatus('failed');
      return;
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Invalid payment amount');
      setStatus('failed');
      return;
    }

    setStatus('processing');
    setError(null);
    try {
      if (method === 'ETH' || method === 'BNB') {
        // Simple transfer for native coins
        // In a real scenario, this would send to the presale contract
        const tx = await sendTokens('0x0000000000000000000000000000000000000000', amount);
        setStatus('confirmed');
        return tx;
      } else {
        // Handle ERC20 tokens like USDT/USDC (would use useWriteContract)
        console.log(`Processing ${method} payment...`);
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStatus('confirmed');
      }
    } catch (err) {
      console.error('[Payment] Error processing payment:', err);
      setError(err instanceof Error ? err.message : 'Payment failed');
      setStatus('failed');
    }
  };

  return {
    processPayment,
    status,
    error,
    resetPaymentStatus: () => { setStatus('idle'); setError(null); }
  };
}
