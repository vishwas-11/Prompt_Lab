// "use client";

// import { useState } from "react";
// import api from "@/services/api";
// import PromptBox from "@/components/PromptBox";
// import ModuleSelector from "@/components/ModuleSelector";
// import OutputCard from "@/components/OutputCard";
// import ReasoningPanel from "@/components/ReasoningPanel";
// import { Play, Loader2 } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function CoTPage() {
//   const [input, setInput] = useState("");
//   const [normal, setNormal] = useState("");
//   const [cot, setCot] = useState("");
//   const [steps, setSteps] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);

//   const extractSteps = (text: string) =>
//     text.split("\n").filter((l) => l.trim().length > 0).slice(0, 6);

//   const handleRun = async () => {
//     if (!input.trim() || loading) return;
//     try {
//       setLoading(true);
//       const res = await api.post("/generate/cot", { input });
//       setNormal(res.data.normal_output);
//       setCot(res.data.cot_output);
//       setSteps(extractSteps(res.data.cot_output));
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const hasOutput = normal || cot || steps.length > 0;

//   return (
//     <div
//       style={{ fontFamily: "'DM Sans', sans-serif" }}
//       className="min-h-[calc(100vh-57px)] bg-[#0A0A0A] px-8 py-8"
//     >
//       {/* header row */}
//       <div className="flex items-start justify-between mb-8">
//         <div>
//           <div className="flex items-center gap-3 mb-2">
//             <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
//             <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }} className="text-white/30 tracking-[0.2em] uppercase">
//               AGENT FRAMEWORK - CHAIN OF THOUGHTS
//             </span>
//           </div>
//           <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.5rem,3vw,2rem)" }} className="font-extrabold text-white">
//             Chain-of-Thought
//           </h1>
//           <p className="text-white/30 text-sm font-light mt-1">
//             Compare baseline vs. step-by-step reasoning output
//           </p>
//         </div>
//         <ModuleSelector />
//       </div>

//       {/* input area */}
//       <div className="mb-6">
//         <div className="flex items-center justify-between mb-3">
//           <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }} className="text-white/25 tracking-[0.2em] uppercase">
//             Prompt Input
//           </span>
//           <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }} className="text-white/15">
//             {input.length} chars
//           </span>
//         </div>
//         <PromptBox value={input} onChange={setInput} placeholder="Enter your prompt..." />

//         <div className="flex items-center gap-4 mt-4">
//           <button
//             onClick={handleRun}
//             disabled={loading || !input.trim()}
//             className="group flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-white/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <Loader2 size={13} className="animate-spin" />
//             ) : (
//               <Play size={13} className="group-hover:scale-110 transition-transform" />
//             )}
//             <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }} className="tracking-widest uppercase">
//               {loading ? "Running..." : "Run Prompt"}
//             </span>
//           </button>

//           {hasOutput && (
//             <button
//               onClick={() => { setNormal(""); setCot(""); setSteps([]); setInput(""); }}
//               style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
//               className="text-white/20 hover:text-white/40 tracking-widest uppercase transition-colors"
//             >
//               Clear
//             </button>
//           )}
//         </div>
//       </div>

//       {/* divider */}
//       <div className="flex items-center gap-4 mb-6">
//         <div className="h-px flex-1 bg-white/5" />
//         <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }} className="text-white/15 tracking-[0.2em] uppercase shrink-0">
//           Output
//         </span>
//         <div className="h-px flex-1 bg-white/5" />
//       </div>

//       {/* output grid */}
//       <AnimatePresence>
//         <motion.div
//           initial={{ opacity: 0, y: 12 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.35 }}
//           className="grid grid-cols-1 lg:grid-cols-3 gap-4"
//         >
//           {/* Normal Output */}
//           <OutputCard title="Normal Output" content={normal} accent="#60A5FA" />

//           {/* CoT Output */}
//           <OutputCard title="CoT Output" content={cot} accent="#4ADE80" />

//           {/* Reasoning Panel */}
//           <ReasoningPanel steps={steps} />
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// }









"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Play,
  Loader2,
  RotateCcw,
  Terminal,
  BrainCircuit,
  Zap,
  Split
} from "lucide-react";
import api from "@/services/api";
import OutputCard from "@/components/OutputCard";
import ReasoningPanel from "@/components/ReasoningPanel";

export default function CoTPage() {
  const [input, setInput] = useState("");
  const [normal, setNormal] = useState("");
  const [cot, setCot] = useState("");
  const [steps, setSteps] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const extractSteps = (text: string) =>
    text.split("\n").filter((l) => l.trim().length > 0).slice(0, 6);

  const handleRun = async () => {
    if (!input.trim() || loading) return;
    try {
      setLoading(true);
      const res = await api.post("/generate/cot", { input });
      setNormal(res.data.normal_output);
      setCot(res.data.cot_output);
      setSteps(extractSteps(res.data.cot_output));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setNormal("");
    setCot("");
    setSteps([]);
    setInput("");
  };

  const hasOutput = normal || cot || steps.length > 0;

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden"
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
            <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-blue-400/20 bg-blue-400/5">
              <BrainCircuit size={15} className="text-blue-400" />
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
            Chain-of-Thought
            <span className="text-white/15">.</span>
          </h1>
          <p className="text-white/35 text-base font-light max-w-xl leading-relaxed">
            Unpack the LLM's internal reasoning. Compare standard direct responses 
            against structured step-by-step logic to improve output accuracy.
          </p>
        </motion.div>

        {/* --- INPUT AREA --- */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10 border border-white/8 rounded-xl bg-white/2 overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/6 bg-white/2">
            <div className="flex items-center gap-2">
              <Terminal size={12} className="text-white/25" />
              <span
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                className="text-white/25 tracking-[0.15em] uppercase"
              >
                Inference Input
              </span>
            </div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }} className="text-white/10">
              {input.length} chars
            </span>
          </div>
          
          <div className="p-5">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a complex logic problem or reasoning task..."
              className="w-full bg-transparent text-white/70 text-lg placeholder-white/10 outline-none resize-none font-light leading-relaxed"
              rows={3}
            />
            
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={handleRun}
                disabled={loading || !input.trim()}
                className="group flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-white/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Zap size={14} className="fill-current" />
                )}
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }} className="tracking-widest uppercase font-bold">
                  {loading ? "Reasoning..." : "Execute CoT"}
                </span>
              </button>

              {hasOutput && (
                <button
                  onClick={handleClear}
                  className="flex items-center justify-center w-11 h-11 border border-white/10 rounded-xl text-white/30 hover:text-white/60 hover:border-white/25 transition-all"
                >
                  <RotateCcw size={14} />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* --- OUTPUT GRID --- */}
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <OutputCard 
              title="Baseline Response" 
              content={normal} 
              accent="#60A5FA" 
              loading={loading}
            />
            <OutputCard 
              title="CoT Optimized" 
              content={cot} 
              accent="#4ADE80" 
              loading={loading}
            />
            <ReasoningPanel steps={steps} loading={loading} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}