// "use client";

// import { useState } from "react";
// import api from "@/services/api";
// import PromptBox from "@/components/PromptBox";
// import ModuleSelector from "@/components/ModuleSelector";
// import ReactTimeline from "@/components/ReactTimeline";
// import StatCard from "@/components/StatCard";
// import { Play, Loader2, Info } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function ReactPage() {
//   const [input, setInput] = useState("");
//   const [result, setResult] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const handleRun = async () => {
//     if (!input.trim() || loading) return;
//     try {
//       setLoading(true);
//       const res = await api.post("/generate/react", { input });
//       setResult(res.data);
//     } catch (err) {
//       console.error("Session error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div 
//       style={{ 
//         backgroundImage: `linear-gradient(to right, #ffffff03 1px, transparent 1px), linear-gradient(to bottom, #ffffff03 1px, transparent 1px)`,
//         backgroundSize: '50px 50px'
//       }} 
//       className="min-h-[calc(100vh-57px)] bg-[#0A0A0A] px-8 py-12"
//     >
//       {/* Header */}
//       <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between mb-12">
//         <div>
//           <div className="flex items-center gap-3 mb-3">
//             <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
//             <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }} className="text-white/30 tracking-[0.2em] uppercase">
//               Agent Framework / ReAct
//             </span>
//           </div>
//           <h1 style={{ fontFamily: "'Syne', sans-serif" }} className="text-4xl font-extrabold text-white tracking-tight">
//             ReAct Agent Lab
//           </h1>
//         </div>
//         <ModuleSelector />
//       </motion.div>

//       {/* Input Area */}
//       <div className="max-w-4xl mb-12">
//         <PromptBox value={input} onChange={setInput} placeholder="Assign a task to the agent..." />
//         <div className="flex items-center gap-6 mt-8">
//           <button
//             onClick={handleRun}
//             disabled={loading || !input.trim()}
//             className="flex items-center gap-3 bg-white text-black px-8 py-3 rounded-sm text-xs font-bold hover:bg-neutral-200 transition-all disabled:opacity-10"
//           >
//             {loading ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} fill="black" />}
//             <span className="tracking-[0.2em] uppercase">Run Agent</span>
//           </button>
//           {result && (
//             <button onClick={() => { setResult(null); setInput(""); }} className="text-white/20 hover:text-white/50 text-[10px] uppercase font-mono tracking-widest transition-colors">
//               Reset Session
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Output Grid */}
//       <AnimatePresence>
//         {result && (
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2">
//               <ReactTimeline steps={result.steps || []} />
//             </div>
//             <div className="space-y-6">
//               <StatCard title="Final Answer" value={result.final_answer} />
              
//               {/* Metadata Card */}
//               <div className="bg-[#0D0D0D] border border-white/5 p-6 rounded-lg">
//                 <div className="flex items-center gap-2 mb-4 text-white/40">
//                   <Info size={12} />
//                   <span className="text-[10px] uppercase font-mono tracking-widest">Metadata</span>
//                 </div>
//                 <div className="space-y-3">
//                   <div className="flex justify-between text-[11px] font-mono">
//                     <span className="text-white/20">Total Steps</span>
//                     <span className="text-white/60">{result.steps?.length || 0}</span>
//                   </div>
//                   <div className="flex justify-between text-[11px] font-mono">
//                     <span className="text-white/20">Agent Pattern</span>
//                     <span className="text-white/60">ReAct-01</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }









"use client";

import { useState } from "react";
import api from "@/services/api";
import PromptBox from "@/components/PromptBox";
import ModuleSelector from "@/components/ModuleSelector";
import ReactTimeline from "@/components/ReactTimeline";
import StatCard from "@/components/StatCard";
import { Play, Loader2, Info, RotateCcw, Zap, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReactPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    if (!input.trim() || loading) return;
    try {
      setLoading(true);
      const res = await api.post("/generate/react", { input });
      setResult(res.data);
    } catch (err) {
      console.error("Session error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-[calc(100vh-57px)] bg-[#0A0A0A] text-white"
    >
      {/* grid bg */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      {/* noise */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        {/* ── PAGE HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-start justify-between mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-yellow-400/20 bg-yellow-400/5">
                <Zap size={15} className="text-yellow-400" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-yellow-400 animate-pulse" />
                <span
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                  className="text-white/25 tracking-[0.2em] uppercase"
                >
                  Agent Framework — ReAct
                </span>
              </div>
            </div>
            <h1
              style={{ fontFamily: "'Syne', sans-serif", lineHeight: 1.05 }}
              className="text-5xl font-extrabold text-white tracking-tight mb-3"
            >
              ReAct Agent
              <span className="text-white/15">.</span>
            </h1>
            <p className="text-white/30 text-base font-light max-w-lg leading-relaxed">
              Reason and act in interleaved steps. The agent observes, thinks, and
              executes tools until the task is resolved.
            </p>
          </div>
          {/* <div className="mt-1">
            <ModuleSelector />
          </div> */}
        </motion.div>

        {/* ── INPUT AREA ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="mb-10"
        >
          {/* input card */}
          <div className="border border-white/8 rounded-xl bg-white/2 overflow-hidden mb-5">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/6">
              <Terminal size={12} className="text-white/25" />
              <span
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                className="text-white/25 tracking-[0.15em] uppercase"
              >
                Task Input
              </span>
            </div>
            <div className="p-4">
              <PromptBox
                value={input}
                onChange={setInput}
                placeholder="Assign a task to the agent..."
              />
            </div>
          </div>

          {/* actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleRun}
              disabled={loading || !input.trim()}
              className="group flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-xl font-medium text-sm hover:bg-white/90 transition-all disabled:opacity-25 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Running...</span>
                </>
              ) : (
                <>
                  <Play size={13} fill="black" />
                  <span>Run Agent</span>
                </>
              )}
            </button>

            {result && (
              <button
                onClick={() => { setResult(null); setInput(""); }}
                className="flex items-center gap-2 text-white/25 hover:text-white/55 transition-colors"
              >
                <RotateCcw size={13} />
                <span
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                  className="tracking-widest uppercase"
                >
                  Reset Session
                </span>
              </button>
            )}
          </div>
        </motion.div>

        {/* ── OUTPUT GRID ── */}
        <AnimatePresence>
          {loading && !result && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="border border-white/6 rounded-xl bg-white/1 flex flex-col items-center justify-center gap-5 py-24"
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-xl border border-yellow-400/20 bg-yellow-400/5 flex items-center justify-center">
                  <Zap size={18} className="text-yellow-400/60" />
                </div>
                <div className="absolute -inset-1 rounded-xl border border-yellow-400/15 animate-ping opacity-30" />
              </div>
              <div className="text-center space-y-1.5">
                {["Reasoning about task...", "Selecting tools...", "Executing actions..."].map(
                  (msg, i) => (
                    <motion.p
                      key={msg}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.35 }}
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                      className="text-white/25 tracking-widest uppercase"
                    >
                      {msg}
                    </motion.p>
                  )
                )}
              </div>
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* timeline */}
              <div className="lg:col-span-2">
                <div className="border border-white/6 rounded-xl bg-white/1 overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/6">
                    <Zap size={12} className="text-yellow-400/60" />
                    <span
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                      className="text-white/25 tracking-[0.15em] uppercase"
                    >
                      Agent Timeline
                    </span>
                    <span
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                      className="ml-auto text-white/15"
                    >
                      {result.steps?.length || 0} steps
                    </span>
                  </div>
                  <div className="p-5">
                    <ReactTimeline steps={result.steps || []} />
                  </div>
                </div>
              </div>

              {/* sidebar */}
              <div className="space-y-4">
                <StatCard title="Final Answer" value={result.final_answer} />

                {/* metadata card */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="border border-white/6 rounded-xl bg-white/2 overflow-hidden"
                >
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/6">
                    <Info size={12} className="text-white/25" />
                    <span
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                      className="text-white/25 tracking-[0.15em] uppercase"
                    >
                      Metadata
                    </span>
                  </div>
                  <div className="p-4 space-y-3">
                    {[
                      { label: "Total Steps", value: result.steps?.length || 0 },
                      { label: "Agent Pattern", value: "ReAct-01" },
                      { label: "Status", value: "Resolved" },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between py-1 border-b border-white/4 last:border-0"
                      >
                        <span
                          style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                          className="text-white/20"
                        >
                          {row.label}
                        </span>
                        <span
                          style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                          className="text-white/55"
                        >
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* info callout */}
                <div className="border border-yellow-400/10 rounded-xl bg-yellow-400/3 p-4">
                  <div className="flex items-start gap-3">
                    <Info size={12} className="text-yellow-400/50 mt-0.5 shrink-0" />
                    <p
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                      className="text-white/20 leading-relaxed"
                    >
                      ReAct interleaves Thought → Action → Observation cycles until the
                      agent reaches a final answer or hits the step limit.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}