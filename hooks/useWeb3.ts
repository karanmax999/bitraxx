import { useAccount, useBalance, useSendTransaction, useConnect, useDisconnect, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';

export function useWeb3() {
  const { address, isConnected, connector } = useAccount();
  const { connect, connectors, error: connectError } = useConnect();
  const { disconnect } = useDisconnect();
  
  const { data: balance, isError: balanceError, isLoading: balanceLoading } = useBalance({
    address,
  });

  const { data: hash, sendTransaction, isPending: isSending, error: sendError } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const connectWallet = async (connectorName: string = 'MetaMask') => {
    try {
      const selectedConnector = connectors.find((c: any) => c.name.toLowerCase().includes(connectorName.toLowerCase()));
      if (!selectedConnector) throw new Error(`Connector ${connectorName} not found`);
      
      await connect({ connector: selectedConnector });
    } catch (error) {
      console.error('[Web3] Wallet connection failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to connect wallet');
    }
  };

  const sendTokens = async (to: `0x${string}`, amount: string) => {
    try {
      if (!address) throw new Error("Wallet not connected");
      if (!amount || isNaN(Number(amount))) throw new Error("Invalid amount");
      
      return sendTransaction({
        to,
        value: parseEther(amount),
      });
    } catch (error) {
      console.error('[Web3] Send transaction failed:', error);
      throw error;
    }
  };

  return {
    address,
    isConnected,
    connectorName: connector?.name,
    balance: balance?.formatted,
    symbol: balance?.symbol,
    balanceLoading,
    balanceError,
    connectWallet,
    disconnect,
    sendTokens,
    isSending,
    isConfirming,
    isConfirmed,
    sendError,
    connectError,
    txHash: hash
  };
}
