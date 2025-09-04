"use client";
import Link from "next/link";
import { useProfile } from "@/lib/store";


export default function Home() {
const { profile } = useProfile();
return (
<div className="space-y-6">
<h1 className="text-3xl font-bold">Build your portfolio. Get paid. Level up.</h1>
<p className="text-gray-600">co‑mission matches beginners to right‑sized tasks, tracks XP, and pays in crypto.</p>
<div className="flex gap-3">
<Link href="/tasks" className="px-4 py-2 rounded-xl bg-black text-white">Browse Tasks</Link>
<Link href="/post-task" className="px-4 py-2 rounded-xl bg-white border">Post a Task</Link>
</div>


<div className="rounded-2xl border bg-white p-4">
<h2 className="font-semibold mb-2">Your Progress</h2>
<p>Level <span className="font-semibold">{profile.level}</span> • XP <span className="font-semibold">{profile.xp}</span></p>
</div>
</div>
);
}