"use client";
import Link from "next/link";


export default function Nav() {
return (
<nav className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
<div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
<Link href="/" className="font-bold text-lg">co‑mission</Link>
<div className="flex gap-4 text-sm">
<Link href="/tasks" className="hover:underline">Tasks</Link>
<Link href="/post-task" className="hover:underline">Post Task</Link>
<Link href="/my-profile" className="hover:underline">My Profile</Link>
</div>
</div>
</nav>
);
}