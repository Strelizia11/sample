"use client";

import { useAccount, useConnect, useDisconnect, useSendTransaction } from "wagmi";
import { parseEther } from "viem";

export function PlayButton() {
  const { address, isConnected } = useAccount();

  // Connection hook
  const {
    connect,
    connectors,
    error: connectError,
    isPending: isConnectPending,
  } = useConnect();

  const { disconnect } = useDisconnect();

  // Transaction hook
  const {
    sendTransactionAsync,
    error: txError,
    isPending: isTxPending,
  } = useSendTransaction();

  async function handleSend() {
    try {
      await sendTransactionAsync({
        to: "0x000000000000000000000000000000000000dead", // replace with real address
        value: parseEther("0.001"),
      });
      alert("Transaction sent!");
    } catch (err) {
      console.error(err);
      alert("Failed to send transaction");
    }
  }

  if (!isConnected) {
    return (
      <button
        onClick={() => connect({ connector: connectors[0] })} // pick first connector (injected/metamask)
        disabled={isConnectPending}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isConnectPending ? "Connecting..." : "Connect Wallet"}
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleSend}
        disabled={isTxPending}
        className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400"
      >
        {isTxPending ? "Sending..." : "Play (Send 0.001 ETH)"}
      </button>
      <button
        onClick={() => disconnect()}
        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
      >
        Disconnect
      </button>
      <p className="text-sm text-gray-500">Connected as {address}</p>
      {connectError && <p className="text-sm text-red-500">{connectError.message}</p>}
      {txError && <p className="text-sm text-red-500">{txError.message}</p>}
    </div>
  );
}
