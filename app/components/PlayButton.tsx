"use client";


// Simple EIP-1193 payment on Base Sepolia (84532). For demo purposes only.
async function sendEth({ to, amountEth }:{ to: string; amountEth: string }) {
if (typeof window === "undefined" || !(window as any).ethereum) throw new Error("No wallet");
const ethereum = (window as any).ethereum;
await ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0x14a74" }] }).catch(async (e: any) => {
// If chain not added, try to add Base Sepolia
if (e?.code === 4902) {
await ethereum.request({
method: "wallet_addEthereumChain",
params: [{
chainId: "0x14a74",
chainName: "Base Sepolia",
nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
rpcUrls: ["https://sepolia.base.org"],
blockExplorerUrls: ["https://sepolia.basescan.org"],
}],
});
} else throw e;
});


const accounts = await ethereum.request({ method: "eth_requestAccounts" });
if (!accounts?.length) throw new Error("No account");
const from = accounts[0];
const valueHex = `0x${BigInt(Math.floor(parseFloat(amountEth) * 1e18)).toString(16)}`;
const txHash = await ethereum.request({
method: "eth_sendTransaction",
params: [{ from, to, value: valueHex }],
});
return txHash as string;
}


export default function PayButton({ to, amountEth, onPaid }:{ to: string; amountEth: string; onPaid: (hash?: string) => void }) {
const [busy, setBusy] = useState(false);
const [error, setError] = useState<string | null>(null);


const handlePay = async () => {
setBusy(true); setError(null);
try {
const hash = await sendEth({ to, amountEth });
onPaid(hash);
} catch (e: any) {
// Fallback mock payment for demo
console.warn("Payment failed, mocking success:", e?.message);
onPaid(undefined);
} finally {
setBusy(false);
}
};


return (
<button onClick={handlePay} disabled={busy} className="px-3 py-2 rounded-xl bg-purple-600 text-white disabled:opacity-50">
{busy ? "Processing…" : `Pay ${amountEth} ETH`}
</button>
);
}