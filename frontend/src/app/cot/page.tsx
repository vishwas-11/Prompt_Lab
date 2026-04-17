"use client";

import { useState } from "react";
import api from "@/services/api";
import PromptBox from "@/components/PromptBox";
import ModuleSelector from "@/components/ModuleSelector";
import OutputCard from "@/components/OutputCard";
import ReasoningPanel from "@/components/ReasoningPanel";
import { Play, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  const hasOutput = normal || cot || steps.length > 0;

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-[calc(100vh-57px)] bg-[#0A0A0A] px-8 py-8"
    >
      {/* header row */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }} className="text-white/30 tracking-[0.2em] uppercase">
              Technique
            </span>
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.5rem,3vw,2rem)" }} className="font-extrabold text-white">
            Chain-of-Thought
          </h1>
          <p className="text-white/30 text-sm font-light mt-1">
            Compare baseline vs. step-by-step reasoning output
          </p>
        </div>
        <ModuleSelector />
      </div>

      {/* input area */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }} className="text-white/25 tracking-[0.2em] uppercase">
            Prompt Input
          </span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }} className="text-white/15">
            {input.length} chars
          </span>
        </div>
        <PromptBox value={input} onChange={setInput} placeholder="Enter your prompt..." />

        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={handleRun}
            disabled={loading || !input.trim()}
            className="group flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-white/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Play size={13} className="group-hover:scale-110 transition-transform" />
            )}
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }} className="tracking-widest uppercase">
              {loading ? "Running..." : "Run Prompt"}
            </span>
          </button>

          {hasOutput && (
            <button
              onClick={() => { setNormal(""); setCot(""); setSteps([]); setInput(""); }}
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
              className="text-white/20 hover:text-white/40 tracking-widest uppercase transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px flex-1 bg-white/5" />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }} className="text-white/15 tracking-[0.2em] uppercase shrink-0">
          Output
        </span>
        <div className="h-px flex-1 bg-white/5" />
      </div>

      {/* output grid */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4"
        >
          {/* Normal Output */}
          <OutputCard title="Normal Output" content={normal} accent="#60A5FA" />

          {/* CoT Output */}
          <OutputCard title="CoT Output" content={cot} accent="#4ADE80" />

          {/* Reasoning Panel */}
          <ReasoningPanel steps={steps} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}