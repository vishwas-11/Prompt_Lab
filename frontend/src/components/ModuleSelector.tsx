"use client";

import { useRouter, usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

const modules = [
  { name: "Chain-of-Thought", path: "/cot" },
  { name: "Self-Consistency", path: "/self-consistency" },
  { name: "ReAct Pattern", path: "/react" },
  { name: "Tree-of-Thoughts", path: "/tot" },
  { name: "Prompt Optimization", path: "/optimize" },
  { name: "Prompt Versioning", path: "/version" },
  { name: "Prompt Injection", path: "/security" },
  { name: "Roles Prompting", path: "/roles" },
];

export default function ModuleSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const currentModule = modules.find((m) => pathname.startsWith(m.path))?.path || modules[0].path;

  return (
    <div className="relative">
      <select
        value={currentModule}
        onChange={(e) => router.push(e.target.value)}
        style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", appearance: "none" }}
        className="bg-white/4 border border-white/8 text-white/60 rounded-lg pl-4 pr-9 py-2 tracking-widest uppercase focus:outline-none focus:border-white/20 hover:border-white/15 transition-colors cursor-pointer"
      >
        {modules.map((m) => (
          <option key={m.path} value={m.path} className="bg-[#0F0F0F] text-white normal-case tracking-normal" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px" }}>
            {m.name}
          </option>
        ))}
      </select>
      <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
    </div>
  );
}