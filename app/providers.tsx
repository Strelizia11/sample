"use client";

import { ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { injected } from "@wagmi/connectors";

// 1. Configure wagmi (v2 style)
const config = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http("https://sepolia.base.org"), // Base Sepolia RPC
  },
  connectors: [
    injected({ target: "metaMask" }), // MetaMask or injected wallet
  ],
});

// 2. Setup QueryClient (wagmi v2 requires react-query)
const queryClient = new QueryClient();

// 3. Providers wrapper
export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
