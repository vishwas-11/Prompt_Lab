// "use client";

// import { useState } from "react";
// import api from "@/services/api";

// export default function VersionTest() {
//   const [name, setName] = useState("");
//   const [input, setInput] = useState("");
//   const [version, setVersion] = useState<number | null>(null);
//   const [result, setResult] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const handleTest = async () => {
//     try {
//       setLoading(true);

//       const payload: any = {
//         name,
//         input,
//       };

//       // ✅ Only include version if user entered it
//       if (version) {
//         payload.version = version;
//       }

//       const res = await api.post("/version/test", payload);

//       setResult(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Error testing prompt");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-900 p-4 rounded space-y-4">
//       <h2 className="text-lg font-semibold">🧪 Test Prompt</h2>

//       {/* Prompt Name */}
//       <input
//         placeholder="Prompt Name (e.g. math_solver)"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="w-full p-2 bg-gray-800 rounded"
//       />

//       {/* Version Selector */}
//       <input
//         type="number"
//         placeholder="Version (optional — leave empty for latest)"
//         onChange={(e) =>
//           setVersion(e.target.value ? Number(e.target.value) : null)
//         }
//         className="w-full p-2 bg-gray-800 rounded"
//       />

//       {/* Input */}
//       <textarea
//         placeholder="Enter input for the prompt..."
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         className="w-full p-2 bg-gray-800 rounded"
//       />

//       {/* Button */}
//       <button
//         onClick={handleTest}
//         disabled={loading}
//         className="bg-purple-600 px-4 py-2 rounded text-white"
//       >
//         {loading ? "Running..." : "Run Test"}
//       </button>

//       {/* Output */}
//       {result && (
//         <div className="bg-black p-4 rounded space-y-3">
//           <div className="flex justify-between items-center">
//             <p className="text-yellow-400 font-semibold">
//               Version: {result.version}
//             </p>
//           </div>

//           {/* Prompt Used */}
//           {result.prompt && (
//             <div>
//               <p className="text-gray-400 text-sm mb-1">Prompt Used:</p>
//               <pre className="text-xs text-blue-300 bg-gray-800 p-2 rounded whitespace-pre-wrap">
//                 {result.prompt}
//               </pre>
//             </div>
//           )}

//           {/* Output */}
//           <div>
//             <p className="text-gray-400 text-sm mb-1">Output:</p>
//             <pre className="text-green-400 whitespace-pre-wrap">
//               {result.output}
//             </pre>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }








"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, Play, Loader2, Terminal, Hash } from "lucide-react";
import api from "@/services/api";

export default function VersionTest() {
  const [name, setName] = useState("");
  const [input, setInput] = useState("");
  const [version, setVersion] = useState<number | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    if (!name.trim() || !input.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const payload: any = { name, input };
      if (version) payload.version = version;
      const res = await api.post("/version/test", payload);
      setResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-white/8 rounded-xl bg-white/2 overflow-hidden h-full flex flex-col">
      {/* header */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/6">
        <FlaskConical size={12} className="text-amber-400/60" />
        <span
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
          className="text-white/25 tracking-[0.15em] uppercase"
        >
          Test Prompt
        </span>
      </div>

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* name + version row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
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
                placeholder="math_solver"
                className="w-full bg-transparent text-white/70 text-sm placeholder-white/15 outline-none pl-8 pr-3 py-2.5 border border-white/6 rounded-lg hover:border-white/12 focus:border-white/20 transition-colors"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px" }}
              />
            </div>
          </div>
          <div>
            <label
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
              className="text-white/25 tracking-widest uppercase block mb-2"
            >
              Version
            </label>
            <div className="relative">
              <Hash size={11} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/15 pointer-events-none" />
              <input
                type="number"
                placeholder="latest"
                onChange={(e) => setVersion(e.target.value ? Number(e.target.value) : null)}
                className="w-full bg-transparent text-white/70 text-sm placeholder-white/15 outline-none pl-8 pr-3 py-2.5 border border-white/6 rounded-lg hover:border-white/12 focus:border-white/20 transition-colors"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px" }}
              />
            </div>
          </div>
        </div>

        {/* input */}
        <div>
          <label
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
            className="text-white/25 tracking-widest uppercase block mb-2"
          >
            Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter input for the prompt..."
            rows={3}
            className="w-full bg-transparent text-white/70 text-sm placeholder-white/15 resize-none outline-none leading-relaxed font-light border border-white/6 rounded-lg p-3 hover:border-white/12 focus:border-white/20 transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          />
        </div>

        {/* button */}
        <button
          onClick={handleTest}
          disabled={loading || !name.trim() || !input.trim()}
          className="flex items-center justify-center gap-2 bg-white text-black py-2.5 rounded-xl font-medium text-sm transition-all hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={13} className="animate-spin" />
              <span>Running...</span>
            </>
          ) : (
            <>
              <Play size={13} />
              <span>Run Test</span>
            </>
          )}
        </button>

        {/* result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="border border-white/6 rounded-lg overflow-hidden"
            >
              {/* result header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/6 bg-white/2">
                <span
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
                  className="text-amber-400/70 tracking-widest uppercase"
                >
                  v{result.version}
                </span>
                <div className="h-3 w-px bg-white/10" />
                <span
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
                  className="text-white/25 tracking-widest uppercase"
                >
                  Output
                </span>
              </div>

              <div className="p-4 space-y-3">
                {result.prompt && (
                  <div>
                    <div
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
                      className="text-white/20 tracking-widest uppercase mb-2"
                    >
                      Prompt Used
                    </div>
                    <p className="text-blue-300/60 text-xs leading-relaxed bg-blue-400/5 border border-blue-400/10 rounded-lg p-3 font-mono">
                      {result.prompt}
                    </p>
                  </div>
                )}

                <div>
                  <div
                    style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
                    className="text-white/20 tracking-widest uppercase mb-2"
                  >
                    Result
                  </div>
                  <p className="text-green-400/70 text-sm leading-relaxed whitespace-pre-wrap">
                    {result.output}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}