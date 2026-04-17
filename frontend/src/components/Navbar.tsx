"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { logout } from "@/services/auth";
import { Terminal, LogOut } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Roles", href: "/roles" },
  { label: "CoT", href: "/cot" },
  { label: "ReAct", href: "/react" },
  { label: "ToT", href: "/tot" },
  { label: "Optimize", href: "/optimize" },
  { label: "Versioning", href: "/version" },
  { label: "Security", href: "/security" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.replace("/login");
    router.refresh();
  };

  return (
    <nav
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="sticky top-0 z-50 bg-[#0A0A0A] border-b border-white/6 px-6 py-0 flex items-center"
    >
      {/* logo */}
      <Link href="/" className="flex items-center gap-2 pr-8 py-4 border-r border-white/6 shrink-0 hover:opacity-70 transition-opacity">
        <Terminal size={14} className="text-white/40" />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }} className="text-white/40 tracking-widest uppercase">
          prompt_lab
        </span>
      </Link>

      {/* links */}
      <div className="flex items-stretch flex-1 overflow-x-auto scrollbar-hide">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
              className={`relative px-4 py-4 tracking-widest uppercase transition-colors whitespace-nowrap ${
                isActive ? "text-white" : "text-white/30 hover:text-white/60"
              }`}
            >
              {isActive && (
                <span className="absolute bottom-0 left-4 right-4 h-px bg-white" />
              )}
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* logout */}
      <div className="pl-6 py-3 border-l border-white/6 shrink-0">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-white/25 hover:text-white/60 transition-colors"
        >
          <LogOut size={13} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }} className="tracking-widest uppercase">
            Logout
          </span>
        </button>
      </div>
    </nav>
  );
}