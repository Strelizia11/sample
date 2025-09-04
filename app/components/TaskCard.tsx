"use client";
import { Task } from "@/lib/type";
import { useEffect, useState } from "react";


export default function TaskCard({ task, onClaim, onComplete, onPay }:{
task: Task;
onClaim: (id: string) => void;
onComplete: (id: string) => void;
onPay: (id: string) => void;
}) {
const [statusColor, setStatusColor] = useState("bg-gray-200 text-gray-800");
useEffect(() => {
setStatusColor(
task.status === "open" ? "bg-green-100 text-green-800" :
task.status === "claimed" ? "bg-yellow-100 text-yellow-800" :
task.status === "completed" ? "bg-blue-100 text-blue-800" :
"bg-purple-100 text-purple-800"
);
}, [task.status]);


return (
<div className="rounded-2xl border p-4 shadow-sm bg-white">
<div className="flex items-start justify-between">
<div>
<h3 className="font-semibold text-lg">{task.title}</h3>
<p className="text-sm text-gray-600 mt-1">{task.description}</p>
<div className="flex gap-2 mt-3 text-xs">
<span className="px-2 py-1 rounded-full bg-gray-100">Min Lvl {task.levelRequired}</span>
<span className="px-2 py-1 rounded-full bg-gray-100">Reward {task.rewardEth} ETH</span>
<span className={`px-2 py-1 rounded-full ${statusColor}`}>{task.status}</span>
</div>
</div>
</div>


<div className="flex gap-2 mt-4">
{task.status === "open" && (
<button onClick={() => onClaim(task.id)} className="px-3 py-2 rounded-xl bg-black text-white">Claim</button>
)}
{task.status === "claimed" && (
<button onClick={() => onComplete(task.id)} className="px-3 py-2 rounded-xl bg-blue-600 text-white">Mark Complete</button>
)}
{task.status === "completed" && (
<button onClick={() => onPay(task.id)} className="px-3 py-2 rounded-xl bg-purple-600 text-white">Release Payment</button>
)}
{task.status === "paid" && (
<span className="text-sm text-purple-700 font-medium">Paid ✅</span>
)}
</div>
</div>
);
}