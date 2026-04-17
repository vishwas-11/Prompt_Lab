"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/services/auth";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
    router.refresh();
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex items-center gap-4">
      <Link href="/">Home</Link>
      <Link href="/roles">Roles</Link>
      <Link href="/cot">CoT</Link>
      <Link href="/react">ReAct</Link>
      <Link href="/tot">ToT</Link>
      <Link href="/optimize">Optimize</Link>
      <Link href="/version">Versioning</Link>
      <Link href="/security">Security</Link>

      <button
        type="button"
        onClick={handleLogout}
        className="ml-auto rounded bg-red-600 px-3 py-1.5 text-sm font-medium hover:bg-red-700"
      >
        Logout
      </button>
    </nav>
  );
}
