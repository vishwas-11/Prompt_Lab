// "use client";

// import { useState } from "react";
// import api from "@/services/api";
// import ModuleSelector from "@/components/ModuleSelector";
// import { Play, Loader2 } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// const BLOCKS = [
//   { key: "system",    label: "System Prompt",    accent: "#60A5FA", tag: "[SYS]",  placeholder: "Define the AI persona and core behavior..." },
//   { key: "developer", label: "Developer Prompt",  accent: "#F59E0B", tag: "[DEV]",  placeholder: "Set operational constraints and instructions..." },
//   { key: "user",      label: "User Prompt",       accent: "#4ADE80", tag: "[USR]",  placeholder: "Enter the end-user message or question..." },
// ] as const;

// type BlockKey = typeof BLOCKS[number]["key"];

// export default function RolesPage() {
//   const [values,  setValues]  = useState<Record<BlockKey, string>>({ system: "", developer: "", user: "" });
//   const [enabled, setEnabled] = useState<Record<BlockKey, boolean>>({ system: true, developer: true, user: true });
//   const [result,  setResult]  = useState<{ final_prompt: string; output: string } | null>(null);
//   const [loading, setLoading] = useState(false);

//   const toggle   = (k: BlockKey) => setEnabled((p) => ({ ...p, [k]: !p[k] }));
//   const setValue = (k: BlockKey, v: string) => setValues((p) => ({ ...p, [k]: v }));

//   const handleRun = async () => {
//     if (loading) return;
//     try {
//       setLoading(true);
//       const res = await api.post("/generate/roles", {
//         system_prompt:    enabled.system    ? values.system    : "",
//         developer_prompt: enabled.developer ? values.developer : "",
//         user_prompt:      enabled.user      ? values.user      : "",
//       });
//       setResult(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClear = () => {
//     setValues({ system: "", developer: "", user: "" });
//     setEnabled({ system: true, developer: true, user: true });
//     setResult(null);
//   };

//   const canRun = BLOCKS.some((b) => enabled[b.key] && values[b.key].trim());

//   return (
//     <div
//       style={{ fontFamily: "'DM Sans', sans-serif" }}
//       className="min-h-[calc(100vh-57px)] bg-[#0A0A0A] px-8 py-8"
//     >
//       {/* ── Header ── */}
//       <div className="flex items-start justify-between mb-10">
//         <div>
//           <div className="flex items-center gap-3 mb-2">
//             <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
//             <span
//               style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
//               className="text-white/30 tracking-[0.2em] uppercase"
//             >
//               AGENT FRAMEWORK - ROLES
//             </span>
//           </div>
//           <h1
//             style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.5rem,3vw,2rem)" }}
//             className="font-extrabold text-white"
//           >
//             Roles Prompting
//           </h1>
//           <p className="text-white/30 text-sm font-light mt-1">
//             Layer system, developer &amp; user roles to shape model behaviour
//           </p>
//         </div>
//         <ModuleSelector />
//       </div>

//       {/* ── Two-column layout ── */}
//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

//         {/* LEFT — prompt blocks */}
//         <div className="flex flex-col gap-4">
//           {BLOCKS.map((b, i) => (
//             <motion.div
//               key={b.key}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3, delay: i * 0.07 }}
//             >
//               {/* block header */}
//               <div className="flex items-center justify-between mb-2">
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => toggle(b.key)}
//                     className="relative w-8 h-4 rounded-full transition-colors duration-200"
//                     style={{ background: enabled[b.key] ? b.accent + "33" : "rgba(255,255,255,0.05)" }}
//                   >
//                     <span
//                       className="absolute top-0.5 w-3 h-3 rounded-full transition-all duration-200"
//                       style={{
//                         left: enabled[b.key] ? "calc(100% - 14px)" : "2px",
//                         background: enabled[b.key] ? b.accent : "rgba(255,255,255,0.2)",
//                       }}
//                     />
//                   </button>
//                   <span
//                     style={{
//                       fontFamily: "'DM Mono', monospace",
//                       fontSize: "10px",
//                       color: enabled[b.key] ? b.accent : "rgba(255,255,255,0.15)",
//                     }}
//                     className="tracking-[0.2em] uppercase transition-colors duration-200"
//                   >
//                     {b.label}
//                   </span>
//                 </div>
//                 <span
//                   style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
//                   className="text-white/15"
//                 >
//                   {values[b.key].length} chars
//                 </span>
//               </div>

//               {/* textarea card */}
//               <div
//                 className="relative rounded-xl overflow-hidden transition-all duration-200"
//                 style={{
//                   border: `1px solid ${enabled[b.key] ? b.accent + "20" : "rgba(255,255,255,0.04)"}`,
//                   background: enabled[b.key]
//                     ? `linear-gradient(135deg,${b.accent}08 0%,transparent 55%)`
//                     : "rgba(255,255,255,0.02)",
//                 }}
//               >
//                 <div
//                   className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-200"
//                   style={{ background: enabled[b.key] ? b.accent + "70" : "transparent" }}
//                 />
//                 <div className="px-5 pt-3 pb-1">
//                   <span
//                     style={{
//                       fontFamily: "'DM Mono', monospace",
//                       fontSize: "9px",
//                       color: enabled[b.key] ? b.accent + "80" : "rgba(255,255,255,0.1)",
//                     }}
//                     className="tracking-widest"
//                   >
//                     {b.tag}
//                   </span>
//                 </div>
//                 <textarea
//                   disabled={!enabled[b.key]}
//                   value={values[b.key]}
//                   onChange={(e) => setValue(b.key, e.target.value)}
//                   placeholder={enabled[b.key] ? b.placeholder : "Disabled"}
//                   rows={4}
//                   className="w-full bg-transparent text-white/80 placeholder-white/15 text-sm resize-none outline-none px-5 pb-4 disabled:opacity-30 disabled:cursor-not-allowed"
//                   style={{ fontFamily: "'DM Sans', sans-serif" }}
//                 />
//               </div>
//             </motion.div>
//           ))}

//           {/* actions */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.28 }}
//             className="flex items-center gap-4 mt-2"
//           >
//             <button
//               onClick={handleRun}
//               disabled={loading || !canRun}
//               className="group flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-white/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
//             >
//               {loading
//                 ? <Loader2 size={13} className="animate-spin" />
//                 : <Play size={13} className="group-hover:scale-110 transition-transform" />
//               }
//               <span
//                 style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
//                 className="tracking-widest uppercase"
//               >
//                 {loading ? "Running..." : "Generate"}
//               </span>
//             </button>

//             {(result || Object.values(values).some(Boolean)) && (
//               <button
//                 onClick={handleClear}
//                 style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
//                 className="text-white/20 hover:text-white/40 tracking-widest uppercase transition-colors"
//               >
//                 Clear
//               </button>
//             )}
//           </motion.div>
//         </div>

//         {/* RIGHT — output */}
//         <div className="flex flex-col gap-4">
//           <AnimatePresence mode="wait">
//             {loading && (
//               <motion.div
//                 key="loader"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="flex-1 flex flex-col items-center justify-center gap-4 py-32"
//               >
//                 <div className="relative w-10 h-10">
//                   <div className="absolute inset-0 rounded-full border border-white/5" />
//                   <div className="absolute inset-0 rounded-full border-t border-white/30 animate-spin" />
//                 </div>
//                 <span
//                   style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
//                   className="text-white/20 tracking-[0.2em] uppercase animate-pulse"
//                 >
//                   Generating...
//                 </span>
//               </motion.div>
//             )}

//             {!loading && result && (
//               <motion.div
//                 key="result"
//                 initial={{ opacity: 0, y: 14 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -8 }}
//                 transition={{ duration: 0.35 }}
//                 className="flex flex-col gap-4"
//               >
//                 {/* Final Prompt */}
//                 <div
//                   className="rounded-xl p-5 flex flex-col gap-3"
//                   style={{
//                     border: "1px solid rgba(245,158,11,0.14)",
//                     background: "linear-gradient(135deg,rgba(245,158,11,0.05) 0%,transparent 55%)",
//                   }}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <div className="w-1 h-1 rounded-full bg-yellow-400" />
//                       <span
//                         style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
//                         className="text-yellow-400/70 tracking-[0.2em] uppercase"
//                       >
//                         Final Prompt
//                       </span>
//                     </div>
//                     <span
//                       style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px" }}
//                       className="text-white/15"
//                     >
//                       {result.final_prompt.length} chars
//                     </span>
//                   </div>
//                   <pre
//                     className="whitespace-pre-wrap text-white/40 leading-relaxed overflow-auto max-h-52"
//                     style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
//                   >
//                     {result.final_prompt}
//                   </pre>
//                 </div>

//                 {/* LLM Output */}
//                 <div
//                   className="rounded-xl p-5 flex flex-col gap-3"
//                   style={{
//                     border: "1px solid rgba(74,222,128,0.14)",
//                     background: "linear-gradient(135deg,rgba(74,222,128,0.05) 0%,transparent 55%)",
//                   }}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <div className="w-1 h-1 rounded-full bg-green-400" />
//                       <span
//                         style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
//                         className="text-green-400/70 tracking-[0.2em] uppercase"
//                       >
//                         LLM Output
//                       </span>
//                     </div>
//                     <span
//                       style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px" }}
//                       className="text-white/15"
//                     >
//                       {result.output.length} chars
//                     </span>
//                   </div>
//                   <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">
//                     {result.output}
//                   </p>
//                 </div>
//               </motion.div>
//             )}

//             {!loading && !result && (
//               <motion.div
//                 key="empty"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="flex-1 flex flex-col items-center justify-center py-32 gap-6"
//               >
//                 <div className="flex flex-col items-center gap-1.5">
//                   {BLOCKS.map((b, i) => (
//                     <div
//                       key={b.key}
//                       className="rounded-md px-4 py-1.5 flex items-center gap-2"
//                       style={{
//                         border: `1px solid ${b.accent}18`,
//                         background: `${b.accent}08`,
//                         width: `${200 - i * 24}px`,
//                         opacity: 0.55 - i * 0.1,
//                       }}
//                     >
//                       <div className="w-1 h-1 rounded-full" style={{ background: b.accent }} />
//                       <span
//                         style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: b.accent + "99" }}
//                         className="tracking-widest uppercase"
//                       >
//                         {b.tag}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//                 <span
//                   style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
//                   className="text-white/15 tracking-[0.2em] uppercase"
//                 >
//                   Fill prompts &amp; generate
//                 </span>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// }









"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Loader2, 
  RotateCcw, 
  Terminal, 
  UserCircle, 
  Settings, 
  Code2, 
  Sparkles,
  Layers
} from "lucide-react";
import api from "@/services/api";
import ModuleSelector from "@/components/ModuleSelector";

const BLOCKS = [
  { 
    key: "system",    
    label: "System Role",    
    accent: "#60A5FA", 
    icon: Settings, 
    tag: "[SYS]",   
    placeholder: "Define the AI persona and core behavior (e.g., 'You are a professional auditor')..." 
  },
  { 
    key: "developer", 
    label: "Developer Role", 
    accent: "#F59E0B", 
    icon: Code2, 
    tag: "[DEV]",   
    placeholder: "Set operational constraints (e.g., 'Only output JSON', 'Do not mention competitors')..." 
  },
  { 
    key: "user",      
    label: "User Role",      
    accent: "#4ADE80", 
    icon: UserCircle, 
    tag: "[USR]",   
    placeholder: "Enter the end-user message or specific request..." 
  },
] as const;

type BlockKey = typeof BLOCKS[number]["key"];

export default function RolesPage() {
  const [values, setValues] = useState<Record<BlockKey, string>>({ system: "", developer: "", user: "" });
  const [enabled, setEnabled] = useState<Record<BlockKey, boolean>>({ system: true, developer: true, user: true });
  const [result, setResult] = useState<{ final_prompt: string; output: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const toggle = (k: BlockKey) => setEnabled((p) => ({ ...p, [k]: !p[k] }));
  const setValue = (k: BlockKey, v: string) => setValues((p) => ({ ...p, [k]: v }));

  const handleRun = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await api.post("/generate/roles", {
        system_prompt: enabled.system ? values.system : "",
        developer_prompt: enabled.developer ? values.developer : "",
        user_prompt: enabled.user ? values.user : "",
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setValues({ system: "", developer: "", user: "" });
    setEnabled({ system: true, developer: true, user: true });
    setResult(null);
  };

  // Fixed the ReferenceError by defining hasOutput here
  const hasOutput = result || Object.values(values).some(Boolean);
  const canRun = BLOCKS.some((b) => enabled[b.key] && values[b.key].trim());

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

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {/* --- PAGE HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-amber-400/20 bg-amber-400/5">
              <Layers size={15} className="text-amber-400" />
            </div>
            <div>
              <span
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
                className="text-white/25 tracking-[0.2em] uppercase"
              >
                Agent Framework - Persona Architecture
              </span>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h1
                style={{ fontFamily: "'Syne', sans-serif", lineHeight: 1.05 }}
                className="text-5xl font-extrabold text-white tracking-tight mb-3"
              >
                Roles Prompting
                <span className="text-white/15">.</span>
              </h1>
              <p className="text-white/35 text-base font-light max-w-xl leading-relaxed">
                Layer specific role definitions to create nuanced AI behavior. Control the 
                narrative by separating system constraints from end-user interactions.
              </p>
            </div>
            <ModuleSelector />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* --- LEFT COLUMN: PROMPT BLOCKS --- */}
          <div className="lg:col-span-2 space-y-4">
            {BLOCKS.map((b, i) => (
              <motion.div
                key={b.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative border rounded-xl overflow-hidden transition-all duration-300 ${
                  enabled[b.key] ? "border-white/10 bg-white/2 shadow-xl" : "border-white/5 bg-transparent opacity-50"
                }`}
              >
                {/* Visual Accent Strip */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-1 transition-opacity duration-300"
                  style={{ background: b.accent, opacity: enabled[b.key] ? 0.6 : 0.1 }}
                />

                <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <b.icon size={14} style={{ color: enabled[b.key] ? b.accent : "gray" }} />
                    <span
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                      className="text-white/40 tracking-widest uppercase"
                    >
                      {b.label}
                    </span>
                  </div>
                  <button
                    onClick={() => toggle(b.key)}
                    className={`w-8 h-4 rounded-full transition-all relative ${
                      enabled[b.key] ? "bg-white/20" : "bg-white/5"
                    }`}
                  >
                    <div 
                      className={`absolute top-0.5 w-3 h-3 rounded-full transition-all ${
                        enabled[b.key] ? "right-1 bg-white" : "left-1 bg-white/20"
                      }`}
                    />
                  </button>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                     <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px" }} className="text-white/15 tracking-tighter">
                        {b.tag}
                     </span>
                  </div>
                  <textarea
                    disabled={!enabled[b.key]}
                    value={values[b.key]}
                    onChange={(e) => setValue(b.key, e.target.value)}
                    placeholder={enabled[b.key] ? b.placeholder : "Block Disabled"}
                    rows={4}
                    className="w-full bg-transparent text-white/70 text-sm placeholder-white/5 outline-none resize-none font-light leading-relaxed scrollbar-hide"
                  />
                </div>
              </motion.div>
            ))}

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleRun}
                disabled={loading || !canRun}
                className="flex-1 group flex items-center justify-center gap-2 bg-white text-black py-3 rounded-xl font-medium text-sm transition-all hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Play size={13} className="fill-current" />
                )}
                <span style={{ fontFamily: "'DM Mono', monospace" }} className="tracking-widest uppercase font-bold">
                  {loading ? "Synthesizing..." : "Generate Inference"}
                </span>
              </button>
              {hasOutput && (
                <button
                  onClick={handleClear}
                  className="w-12 flex items-center justify-center border border-white/10 rounded-xl text-white/30 hover:text-white/60 hover:border-white/20 transition-all"
                >
                  <RotateCcw size={16} />
                </button>
              )}
            </div>
          </div>

          {/* --- RIGHT COLUMN: SYNTHESIZED OUTPUT --- */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full min-h-[500px] border border-white/5 rounded-2xl bg-white/[0.01] flex flex-col items-center justify-center gap-4"
                >
                   <div className="relative">
                    <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center">
                       <Sparkles size={24} className="text-white/20 animate-pulse" />
                    </div>
                    <div className="absolute inset-0 rounded-full border-t-2 border-amber-400/40 animate-spin" />
                  </div>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }} className="text-white/20 tracking-[0.3em] uppercase">
                    Assembling Context...
                  </span>
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Final Composed Prompt */}
                  <div className="border border-amber-400/10 bg-amber-400/[0.02] rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Terminal size={14} className="text-amber-400/60" />
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }} className="text-amber-400/60 tracking-widest uppercase font-bold">
                        Synthesized Prompt Sequence
                      </span>
                    </div>
                    <pre className="text-white/40 text-xs font-mono leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto custom-scrollbar pr-2">
                      {result.final_prompt}
                    </pre>
                  </div>

                  {/* LLM Response Output */}
                  <div className="border border-emerald-400/10 bg-emerald-400/[0.02] rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Sparkles size={14} className="text-emerald-400/60" />
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }} className="text-emerald-400/60 tracking-widest uppercase font-bold">
                          Model Output
                        </span>
                      </div>
                      <span className="text-emerald-400/30 font-mono text-[10px]">SUCCESS.EXE</span>
                    </div>
                    <div className="text-white/80 text-base leading-relaxed font-light whitespace-pre-wrap">
                      {result.output}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full min-h-[500px] border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center opacity-20">
                   <Layers size={40} strokeWidth={1} />
                   <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }} className="mt-4 tracking-widest uppercase">
                      Awaiting persona configuration
                   </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}