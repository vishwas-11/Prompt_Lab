// "use client";

// import { useState } from "react";
// import api from "@/services/api";
// import ModuleSelector from "@/components/ModuleSelector";
// import PromptBox from "@/components/PromptBox";
// import StatCard from "@/components/StatCard";
// import AttemptsPanel from "@/components/AttemptsPanel";

// export default function SelfConsistencyPage() {
//   const [input, setInput] = useState("");
//   const [numRuns, setNumRuns] = useState(5);

//   const [result, setResult] = useState<any>(null);

//   const handleRun = async () => {
//     try {
//       const res = await api.post("/generate/self-consistency", {
//         input,
//         num_runs: numRuns,
//       });

//       setResult(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Error connecting to backend");
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Top */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">
//           Self-Consistency Lab
//         </h1>
//         <ModuleSelector />
//       </div>

//       {/* Inputs */}
//       <div className="space-y-3">
//         <PromptBox
//           value={input}
//           onChange={setInput}
//           placeholder="Enter your question..."
//         />

//         <div className="flex gap-3 items-center">
//           <label>Runs:</label>

//           <input
//             type="number"
//             value={numRuns}
//             onChange={(e) =>
//               setNumRuns(Number(e.target.value))
//             }
//             className="p-2 border rounded bg-gray-900 text-white w-24"
//           />

//           <button
//             onClick={handleRun}
//             className="bg-blue-600 px-4 py-2 rounded text-white"
//           >
//             Run
//           </button>
//         </div>
//       </div>

//       {/* Main Layout */}
//       {result && (
//         <div className="grid grid-cols-3 gap-4">
//           {/* Center Stats */}
//           <div className="col-span-2 space-y-4">
//             <div className="grid grid-cols-3 gap-4">
//               <StatCard
//                 title="Final Answer"
//                 value={result.final_answer}
//               />

//               <StatCard
//                 title="Confidence"
//                 value={result.confidence}
//               />

//               <StatCard
//                 title="Consensus"
//                 value={
//                   result.consensus_reached
//                     ? "Yes"
//                     : "No"
//                 }
//               />
//             </div>
//           </div>

//           {/* Sidebar */}
//           <AttemptsPanel
//             attempts={result.all_attempts}
//           />
//         </div>
//       )}
//     </div>
//   );
// }










"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Play,
  Loader2,
  RotateCcw,
  Terminal,
  Hash,
  Activity,
  Info,
  Layers
} from "lucide-react";
import api from "@/services/api";
import StatCard from "@/components/StatCard";
import AttemptsPanel from "@/components/AttemptsPanel";

// Helper for consistency colors
function getConsistencyColor(confidence: number): string {
  if (confidence >= 0.8) return "#4ADE80";
  if (confidence >= 0.5) return "#FACC15";
  return "#F87171";
}

export default function SelfConsistencyPage() {
  const [input, setInput] = useState("");
  const [numRuns, setNumRuns] = useState(5);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleRun = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await api.post("/generate/self-consistency", {
        input,
        num_runs: numRuns,
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setInput("");
    setNumRuns(5);
  };

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-screen bg-[#0A0A0A] text-white"
    >
      {/* Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        {/* --- PAGE HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-emerald-400/20 bg-emerald-400/5">
              <Layers size={15} className="text-emerald-400" />
            </div>
            <div>
              <span
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
                className="text-white/25 tracking-[0.2em] uppercase"
              >
                Agent Framework - Reasoner
              </span>
            </div>
          </div>

          <h1
            style={{ fontFamily: "'Syne', sans-serif", lineHeight: 1.05 }}
            className="text-5xl font-extrabold text-white tracking-tight mb-3"
          >
            Self-Consistency Lab
            <span className="text-white/15">.</span>
          </h1>
          <p className="text-white/35 text-base font-light max-w-xl leading-relaxed">
            Run parallel reasoning paths for the same prompt to find the most 
            statistically probable answer through majority voting.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* --- LEFT PANEL: CONFIG --- */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Input Box */}
            <div className="border border-white/8 rounded-xl bg-white/2 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/6">
                <Terminal size={12} className="text-white/25" />
                <span
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                  className="text-white/25 tracking-[0.15em] uppercase"
                >
                  Reasoning Input
                </span>
              </div>
              <div className="p-4">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter a complex logic or math question..."
                  rows={6}
                  className="w-full bg-transparent text-white/70 text-sm placeholder-white/15 resize-none outline-none leading-relaxed font-light"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>
            </div>

            {/* Runs Config */}
            <div className="border border-white/8 rounded-xl bg-white/2 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/6">
                <Hash size={12} className="text-white/25" />
                <span
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                  className="text-white/25 tracking-[0.15em] uppercase"
                >
                  Parallel Runs
                </span>
              </div>
              <div className="p-4 flex items-center gap-4">
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={numRuns}
                  onChange={(e) => setNumRuns(Number(e.target.value))}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/80 focus:border-emerald-500/50 outline-none transition-colors"
                />
                <div className="text-white/20 text-xs italic">
                  Suggested: 5-10
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="border border-emerald-400/10 rounded-xl bg-emerald-400/3 p-4">
              <div className="flex items-start gap-3">
                <Info size={13} className="text-emerald-400/60 mt-0.5 shrink-0" />
                <p
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                  className="text-white/25 leading-relaxed"
                >
                  This module generates multiple independent Chain-of-Thought paths 
                  and selects the final answer based on the highest consensus.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleRun}
                disabled={loading || !input.trim()}
                className="flex-1 group flex items-center justify-center gap-2 bg-white text-black py-3 rounded-xl font-medium text-sm transition-all hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Processing Paths...</span>
                  </>
                ) : (
                  <>
                    <Play size={13} />
                    <span>Generate Consistency</span>
                  </>
                )}
              </button>
              {result && (
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center w-11 h-11 border border-white/10 rounded-xl text-white/30 hover:text-white/60 hover:border-white/25 transition-all"
                >
                  <RotateCcw size={13} />
                </button>
              )}
            </div>
          </motion.div>

          {/* --- RIGHT PANEL: RESULTS --- */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {!result && !loading && (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full min-h-[480px] border border-white/6 rounded-xl bg-white/1 flex flex-col items-center justify-center gap-4"
                >
                  <div className="w-14 h-14 rounded-2xl border border-emerald-400/15 bg-emerald-400/5 flex items-center justify-center">
                    <Activity size={22} className="text-emerald-400/50" />
                  </div>
                  <div className="text-center">
                    <p style={{ fontFamily: "'Syne', sans-serif" }} className="text-white/20 font-semibold text-lg">
                      Ready for analysis
                    </p>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }} className="text-white/15 tracking-widest uppercase mt-1">
                      Enter a query to begin sampling
                    </p>
                  </div>
                </motion.div>
              )}

              {loading && (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full min-h-[480px] border border-white/6 rounded-xl bg-white/1 flex flex-col items-center justify-center gap-5"
                >
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 flex items-center justify-center">
                      <Zap size={20} className="text-emerald-400/60" />
                    </div>
                    <div className="absolute -inset-1 rounded-2xl border border-emerald-400/20 animate-ping opacity-30" />
                  </div>
                  <div className="text-center space-y-1.5">
                    {["Sampling outputs...", "Comparing logic paths...", "Calculating consensus..."].map((msg, i) => (
                      <motion.p
                        key={msg}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.4 }}
                        style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                        className="text-white/25 tracking-widest uppercase"
                      >
                        {msg}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              )}

              {result && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Top Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard 
                      title="Final Answer" 
                      value={result.final_answer} 
                    />
                    <StatCard 
                      title="Confidence" 
                      value={`${(result.confidence * 100).toFixed(0)}%`} 
                    />
                    <StatCard 
                      title="Consensus" 
                      value={result.consensus_reached ? "REACHED" : "DIVERGENT"} 
                    />
                  </div>

                  {/* Main Results Panel */}
                  <div className="border border-white/8 rounded-xl bg-white/2 overflow-hidden h-[500px] flex flex-col">
                    <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/6 bg-white/2">
                      <div className="flex items-center gap-2">
                        <Activity size={12} className="text-emerald-400/60" />
                        <span
                          style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                          className="text-white/25 tracking-[0.15em] uppercase"
                        >
                          All Reasoning Attempts
                        </span>
                      </div>
                      <div className="px-2 py-0.5 rounded border border-white/10 bg-white/5 font-mono text-[10px] text-white/40">
                        N = {result.all_attempts?.length || 0}
                      </div>
                    </div>
                    
                    <div className="flex-1 overflow-hidden relative">
                      <AttemptsPanel attempts={result.all_attempts} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}