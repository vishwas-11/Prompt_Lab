"use client";

import { useRouter, usePathname } from "next/navigation";

export default function ModuleSelector() {
  const router = useRouter();
  const pathname = usePathname();

  const modules = [
    { name: "Chain-of-Thought Prompting", path: "/cot" },
    { name: "Self-Consistency Prompting", path: "/self-consistency" },
    { name: "ReAct Pattern", path: "/react" },
    { name: "Tree-of-Thoughts", path: "/tot" },
    { name: "Prompt Optimization", path: "/optimize" },
    { name: "Prompt Versioning", path: "/version" },
    { name: "Prompt Injection", path: "/security" },

    // ✅ FIXED Roles entry
    { name: "Roles Prompting", path: "/roles" },
  ];

  // ✅ Safe current module detection
  const currentModule =
    modules.find((m) => pathname.startsWith(m.path))?.path ||
    modules[0].path;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPath = e.target.value;
    router.push(selectedPath);
  };

  return (
    <select
      value={currentModule}
      onChange={handleChange}
      className="p-2 border rounded-lg bg-gray-900 text-white"
    >
      {modules.map((m) => (
        <option key={m.path} value={m.path}>
          {m.name}
        </option>
      ))}
    </select>
  );
}