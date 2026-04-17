// "use client";

// import { useState } from "react";
// import api from "@/services/api";

// export default function VersionHistory() {
//   const [name, setName] = useState("");
//   const [versions, setVersions] = useState<any[]>([]);
//   const [selected, setSelected] = useState<number | null>(null);

//   const fetchHistory = async () => {
//     const res = await api.get(`/version/history/${name}`);
//     setVersions(res.data.versions);
//   };

//   const rollback = async (version: number) => {
//     await api.post(`/version/rollback?name=${name}&version=${version}`);
//     fetchHistory();
//   };

//   return (
//     <div className="bg-gray-900 p-4 rounded space-y-3">
//       <h2>📜 Version History</h2>

//       <div className="flex gap-2">
//         <input
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Prompt Name"
//           className="p-2 bg-gray-800"
//         />
//         <button onClick={fetchHistory} className="bg-blue-600 px-3">
//           Fetch
//         </button>
//       </div>

//       {versions.map((v) => (
//         <div
//           key={v.version}
//           className={`p-2 rounded ${
//             selected === v.version ? "bg-blue-800" : "bg-black"
//           }`}
//         >
//           <div className="flex justify-between">
//             <p>Version {v.version}</p>

//             <div className="flex gap-2">
//               <button
//                 onClick={() => setSelected(v.version)}
//                 className="text-yellow-400"
//               >
//                 Select
//               </button>

//               <button
//                 onClick={() => rollback(v.version)}
//                 className="text-red-400"
//               >
//                 Rollback
//               </button>
//             </div>
//           </div>

//           <p className="text-gray-400 text-sm">{v.content}</p>
//         </div>
//       ))}
//     </div>
//   );
// }







"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, Search, RotateCcw, Loader2, Terminal, ChevronDown, ChevronRight } from "lucide-react";
import api from "@/services/api";

export default function VersionHistory() {
  const [name, setName] = useState("");
  const [versions, setVersions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [rolling, setRolling] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  const fetchHistory = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      const res = await api.get(`/version/history/${name}`);
      setVersions(res.data.versions ?? []);
    } finally {
      setLoading(false);
    }
  };

  const rollback = async (version: number) => {
    setRolling(version);
    try {
      await api.post(`/version/rollback?name=${name}&version=${version}`);
      await fetchHistory();
    } finally {
      setRolling(null);
    }
  };

  return (
    <div className="border border-white/8 rounded-xl bg-white/2 overflow-hidden h-full flex flex-col">
      {/* header */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/6">
        <History size={12} className="text-amber-400/60" />
        <span
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
          className="text-white/25 tracking-[0.15em] uppercase"
        >
          Version History
        </span>
        {versions.length > 0 && (
          <span
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
            className="ml-auto text-amber-400"
          >
            {versions.length} versions
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* search row */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Terminal size={11} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/15 pointer-events-none" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchHistory()}
              placeholder="Prompt name..."
              className="w-full bg-transparent text-white/70 text-sm placeholder-white/15 outline-none pl-8 pr-3 py-2.5 border border-white/6 rounded-lg hover:border-white/12 focus:border-white/20 transition-colors"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px" }}
            />
          </div>
          <button
            onClick={fetchHistory}
            disabled={loading || !name.trim()}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/6 hover:bg-white/10 border border-white/6 hover:border-white/15 rounded-lg text-white/50 hover:text-white/80 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Search size={13} />
            )}
          </button>
        </div>

        {/* empty state */}
        {!loading && versions.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <p
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
              className="text-white/15 tracking-widest uppercase"
            >
              No versions loaded
            </p>
          </div>
        )}

        {/* version list */}
        <div className="space-y-2 flex-1 overflow-y-auto max-h-72">
          <AnimatePresence>
            {versions.map((v, i) => (
              <motion.div
                key={v.version}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border border-white/6 rounded-lg overflow-hidden"
              >
                <div
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/3 transition-colors"
                  onClick={() => setExpanded(expanded === v.version ? null : v.version)}
                >
                  {/* left accent */}
                  <div className="w-0.5 h-4 rounded-full bg-amber-400/40 shrink-0" />

                  <div className="flex-1 min-w-0">
                    <span
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                      className="text-amber-400/80"
                    >
                      v{v.version}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      rollback(v.version);
                    }}
                    disabled={rolling === v.version}
                    className="flex items-center gap-1.5 px-2.5 py-1 border border-white/6 hover:border-red-400/30 hover:text-red-400/70 rounded text-white/25 transition-all text-xs"
                  >
                    {rolling === v.version ? (
                      <Loader2 size={10} className="animate-spin" />
                    ) : (
                      <RotateCcw size={10} />
                    )}
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}>
                      rollback
                    </span>
                  </button>

                  <div className="text-white/20">
                    {expanded === v.version ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  </div>
                </div>

                <AnimatePresence>
                  {expanded === v.version && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-white/6 px-4 py-3 bg-white/1"
                    >
                      <p className="text-white/40 text-xs leading-relaxed font-light">
                        {v.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}