"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { parseEther } from "viem";
import { http, createConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";

// 🔹 Wagmi config
export const config = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
  ssr: true,
});

// Define store shape
interface UserState {
  address: string | null;
  balance: string;
  isConnected: boolean;
  setUser: (address: string, balance: string) => void;
  clearUser: () => void;
}

// Zustand store (just holds values)
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      address: null,
      balance: "0",
      isConnected: false,

      setUser: (address, balance) =>
        set({ address, balance, isConnected: true }),

      clearUser: () =>
        set({ address: null, balance: "0", isConnected: false }),
    }),
    { name: "user-storage" }
  )
);
