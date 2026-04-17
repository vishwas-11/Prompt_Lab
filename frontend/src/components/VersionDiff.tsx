// "use client";

// import { useState } from "react";
// import api from "@/services/api";
// import DiffViewer from "./DiffViewer";

// export default function VersionDiff() {
//     const [name, setName] = useState("");
//     const [diff, setDiff] = useState<any>(null);

//     const handleDiff = async () => {
//         const res = await api.get(`/version/diff/${name}`);
//         setDiff(res.data);
//     };

//     return (
//         <div className="bg-gray-900 p-4 rounded space-y-3">
//             <h2 className="text-lg font-semibold">🔍 Compare Versions</h2>

//             <div className="flex gap-2">
//                 <input
//                     placeholder="Prompt Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="flex-1 p-2 bg-gray-800 rounded"
//                 />

//                 <button
//                     onClick={handleDiff}
//                     className="bg-red-600 px-3 py-2 rounded"
//                 >
//                     Compare
//                 </button>
//             </div>

//             {diff && (
//                 <div>
//                     <p className="text-yellow-400">
//                         v{diff.old_version} → v{diff.new_version}
//                     </p>

//                     <DiffViewer diff={diff.diff} />
//                 </div>
//             )}
//         </div>
//     );
// }






"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitCompare, Search, Loader2, Terminal, ArrowRight } from "lucide-react";
import api from "@/services/api";
import DiffViewer from "./DiffViewer";

export default function VersionDiff() {
  const [name, setName] = useState("");
  const [diff, setDiff] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleDiff = async () => {
    if (!name.trim()) return;
    setLoading(true);
    setDiff(null);
    try {
      const res = await api.get(`/version/diff/${name}`);
      setDiff(res.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-white/8 rounded-xl bg-white/2 overflow-hidden h-full flex flex-col">
      {/* header */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/6">
        <GitCompare size={12} className="text-amber-400/60" />
        <span
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
          className="text-white/25 tracking-[0.15em] uppercase"
        >
          Compare Versions
        </span>
      </div>

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* search row */}
        <div>
          <label
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
            className="text-white/25 tracking-widest uppercase block mb-2"
          >
            Prompt Name
          </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Terminal size={11} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/15 pointer-events-none" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleDiff()}
                placeholder="Prompt name to diff..."
                className="w-full bg-transparent text-white/70 text-sm placeholder-white/15 outline-none pl-8 pr-3 py-2.5 border border-white/6 rounded-lg hover:border-white/12 focus:border-white/20 transition-colors"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px" }}
              />
            </div>
            <button
              onClick={handleDiff}
              disabled={loading || !name.trim()}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-black rounded-lg font-medium text-sm transition-all hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <Search size={13} />
              )}
            </button>
          </div>
        </div>

        {/* empty state */}
        {!loading && !diff && (
          <div className="flex-1 flex items-center justify-center">
            <p
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
              className="text-white/15 tracking-widest uppercase"
            >
              No diff loaded
            </p>
          </div>
        )}

        {/* diff result */}
        <AnimatePresence>
          {diff && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-3 flex-1"
            >
              {/* version badge row */}
              <div className="flex items-center gap-2">
                <span
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                  className="px-2.5 py-1 border border-amber-400/20 bg-amber-400/5 rounded text-amber-400/70"
                >
                  v{diff.old_version}
                </span>
                <ArrowRight size={13} className="text-white/20" />
                <span
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                  className="px-2.5 py-1 border border-green-500/20 bg-green-500/5 rounded text-green-400/70"
                >
                  v{diff.new_version}
                </span>
              </div>

              {/* diff viewer */}
              <div className="border border-white/6 rounded-lg overflow-hidden flex-1">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/6 bg-white/2">
                  <GitCompare size={11} className="text-white/20" />
                  <span
                    style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
                    className="text-white/20 tracking-widest uppercase"
                  >
                    Diff
                  </span>
                </div>
                <div className="p-3">
                  <DiffViewer diff={diff.diff} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}