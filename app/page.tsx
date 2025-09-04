"use client";

import Link from "next/link";
import { useAccount } from "wagmi";

export default function HomePage() {
  const { isConnected, address } = useAccount();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to Co-Mission</h1>
      <p className="text-gray-600 mb-8">
        A freelancing platform where you can complete tasks, gain experience,
        and get paid in crypto.
      </p>

      {isConnected ? (
        <div className="text-center">
          <p className="mb-4">
            Connected as <span className="font-mono">{address}</span>
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/tasks"
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              View Tasks
            </Link>
            <Link
              href="/my-profile"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              My Profile
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">
          Please connect your wallet using the button above to get started.
        </p>
      )}
    </main>
  );
}
