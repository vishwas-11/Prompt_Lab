// "use client";

// import { useState } from "react";
// import api from "@/services/api";

// export default function VersionCreate() {
//   const [name, setName] = useState("");
//   const [content, setContent] = useState("");
//   const [result, setResult] = useState<any>(null);

//   const handleCreate = async () => {
//     const res = await api.post("/version/create", {
//       name,
//       content
//     });

//     setResult(res.data);
//   };

//   return (
//     <div className="bg-gray-900 p-4 rounded space-y-3">
//       <h2 className="text-lg font-semibold">➕ Create Prompt</h2>

//       <input
//         placeholder="Prompt Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="w-full p-2 bg-gray-800 rounded"
//       />

//       <textarea
//         placeholder="Prompt Content"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         className="w-full p-2 bg-gray-800 rounded"
//       />

//       <button
//         onClick={handleCreate}
//         className="bg-green-600 px-3 py-2 rounded"
//       >
//         Create
//       </button>

//       {result && (
//         <div className="bg-black p-2 rounded text-green-400">
//           Version Created: {result.data.version}
//         </div>
//       )}
//     </div>
//   );
// }








"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Loader2, Terminal, CheckCircle } from "lucide-react";
import api from "@/services/api";

export default function VersionCreate() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCreate = async () => {
    if (!name.trim() || !content.trim()) return;
    setLoading(true);
    try {
      const res = await api.post("/version/create", { name, content });
      setResult(res.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-white/8 rounded-xl bg-white/2 overflow-hidden h-full flex flex-col">
      {/* header */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/6">
        <Plus size={12} className="text-amber-400/60" />
        <span
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
          className="text-white/25 tracking-[0.15em] uppercase"
        >
          Create Version
        </span>
      </div>

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* prompt name */}
        <div>
          <label
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
            className="text-white/25 tracking-widest uppercase block mb-2"
          >
            Prompt Name
          </label>
          <div className="relative">
            <Terminal size={11} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/15 pointer-events-none" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. math_solver"
              className="w-full bg-transparent text-white/70 text-sm placeholder-white/15 outline-none pl-8 pr-3 py-2.5 border border-white/6 rounded-lg hover:border-white/12 focus:border-white/20 transition-colors"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px" }}
            />
          </div>
        </div>

        {/* content */}
        <div className="flex-1">
          <label
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
            className="text-white/25 tracking-widest uppercase block mb-2"
          >
            Prompt Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your prompt content here..."
            rows={5}
            className="w-full bg-transparent text-white/70 text-sm placeholder-white/15 resize-none outline-none leading-relaxed font-light border border-white/6 rounded-lg p-3 hover:border-white/12 focus:border-white/20 transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          />
        </div>

        {/* result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2.5 border border-green-500/20 rounded-lg px-4 py-3 bg-green-500/5"
            >
              <CheckCircle size={13} className="text-green-400 shrink-0" />
              <span
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                className="text-green-400/80 tracking-widest"
              >
                Version {result.data?.version ?? result.version} created
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* button */}
        <button
          onClick={handleCreate}
          disabled={loading || !name.trim() || !content.trim()}
          className="flex items-center justify-center gap-2 bg-white text-black py-2.5 rounded-xl font-medium text-sm transition-all hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={13} className="animate-spin" />
              <span>Creating...</span>
            </>
          ) : (
            <>
              <Plus size={13} />
              <span>Create Version</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}