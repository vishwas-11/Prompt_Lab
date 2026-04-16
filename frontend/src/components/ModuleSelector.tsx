"use client";

import { useRouter, usePathname } from "next/navigation";

const modules = [
  { name: "Chain-of-Thought Prompting", path: "/cot" },
  { name: "Self-Consistency Prompting", path: "/self-consistency" },
  { name: "ReAct Pattern", path: "/react" },
  { name: "Tree-of-Thoughts", path: "/tot" },
  { name: "Prompt Optimization", path: "/optimize" },
  { name: "Prompt Versioning", path: "/version" },
  { name: "Prompt Injection", path: "/security" },
];

export default function ModuleSelector() {
  const router = useRouter();
  const pathname = usePathname();

  //  Find current module based on URL
  const currentModule =
    modules.find((m) => pathname.startsWith(m.path))?.name ||
    modules[0].name;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    const module = modules.find((m) => m.name === selectedName);

    if (module) {
      router.push(module.path);
    }
  };

  return (
    <select
      value={currentModule}  // ✅ controlled by route
      onChange={handleChange}
      className="p-2 border rounded-lg bg-gray-900 text-white"
    >
      {modules.map((m) => (
        <option key={m.name} value={m.name}>
          {m.name}
        </option>
      ))}
    </select>
  );
}