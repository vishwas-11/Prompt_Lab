"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/roles">Roles</Link>
      <Link href="/cot">CoT</Link>
      <Link href="/react">ReAct</Link>
      <Link href="/tot">ToT</Link>
      <Link href="/optimize">Optimize</Link>
      <Link href="/version">Versioning</Link>
      <Link href="/security">Security</Link>
    </nav>
  );
}