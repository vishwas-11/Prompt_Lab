"use client";

import { useState } from "react";
import api from "@/services/api";
import ModuleSelector from "@/components/ModuleSelector";
import { Play, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BLOCKS = [
  { key: "system",    label: "System Prompt",    accent: "#60A5FA", tag: "[SYS]",  placeholder: "Define the AI persona and core behavior..." },
  { key: "developer", label: "Developer Prompt",  accent: "#F59E0B", tag: "[DEV]",  placeholder: "Set operational constraints and instructions..." },
  { key: "user",      label: "User Prompt",       accent: "#4ADE80", tag: "[USR]",  placeholder: "Enter the end-user message or question..." },
] as const;

type BlockKey = typeof BLOCKS[number]["key"];

export default function RolesPage() {
  const [values,  setValues]  = useState<Record<BlockKey, string>>({ system: "", developer: "", user: "" });
  const [enabled, setEnabled] = useState<Record<BlockKey, boolean>>({ system: true, developer: true, user: true });
  const [result,  setResult]  = useState<{ final_prompt: string; output: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const toggle   = (k: BlockKey) => setEnabled((p) => ({ ...p, [k]: !p[k] }));
  const setValue = (k: BlockKey, v: string) => setValues((p) => ({ ...p, [k]: v }));

  const handleRun = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await api.post("/generate/roles", {
        system_prompt:    enabled.system    ? values.system    : "",
        developer_prompt: enabled.developer ? values.developer : "",
        user_prompt:      enabled.user      ? values.user      : "",
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

  const canRun = BLOCKS.some((b) => enabled[b.key] && values[b.key].trim());

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-[calc(100vh-57px)] bg-[#0A0A0A] px-8 py-8"
    >
      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            <span
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
              className="text-white/30 tracking-[0.2em] uppercase"
            >
              AGENT FRAMEWORK - ROLES
            </span>
          </div>
          <h1
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.5rem,3vw,2rem)" }}
            className="font-extrabold text-white"
          >
            Roles Prompting
          </h1>
          <p className="text-white/30 text-sm font-light mt-1">
            Layer system, developer &amp; user roles to shape model behaviour
          </p>
        </div>
        <ModuleSelector />
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* LEFT — prompt blocks */}
        <div className="flex flex-col gap-4">
          {BLOCKS.map((b, i) => (
            <motion.div
              key={b.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
            >
              {/* block header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggle(b.key)}
                    className="relative w-8 h-4 rounded-full transition-colors duration-200"
                    style={{ background: enabled[b.key] ? b.accent + "33" : "rgba(255,255,255,0.05)" }}
                  >
                    <span
                      className="absolute top-0.5 w-3 h-3 rounded-full transition-all duration-200"
                      style={{
                        left: enabled[b.key] ? "calc(100% - 14px)" : "2px",
                        background: enabled[b.key] ? b.accent : "rgba(255,255,255,0.2)",
                      }}
                    />
                  </button>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "10px",
                      color: enabled[b.key] ? b.accent : "rgba(255,255,255,0.15)",
                    }}
                    className="tracking-[0.2em] uppercase transition-colors duration-200"
                  >
                    {b.label}
                  </span>
                </div>
                <span
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
                  className="text-white/15"
                >
                  {values[b.key].length} chars
                </span>
              </div>

              {/* textarea card */}
              <div
                className="relative rounded-xl overflow-hidden transition-all duration-200"
                style={{
                  border: `1px solid ${enabled[b.key] ? b.accent + "20" : "rgba(255,255,255,0.04)"}`,
                  background: enabled[b.key]
                    ? `linear-gradient(135deg,${b.accent}08 0%,transparent 55%)`
                    : "rgba(255,255,255,0.02)",
                }}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-200"
                  style={{ background: enabled[b.key] ? b.accent + "70" : "transparent" }}
                />
                <div className="px-5 pt-3 pb-1">
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "9px",
                      color: enabled[b.key] ? b.accent + "80" : "rgba(255,255,255,0.1)",
                    }}
                    className="tracking-widest"
                  >
                    {b.tag}
                  </span>
                </div>
                <textarea
                  disabled={!enabled[b.key]}
                  value={values[b.key]}
                  onChange={(e) => setValue(b.key, e.target.value)}
                  placeholder={enabled[b.key] ? b.placeholder : "Disabled"}
                  rows={4}
                  className="w-full bg-transparent text-white/80 placeholder-white/15 text-sm resize-none outline-none px-5 pb-4 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>
            </motion.div>
          ))}

          {/* actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
            className="flex items-center gap-4 mt-2"
          >
            <button
              onClick={handleRun}
              disabled={loading || !canRun}
              className="group flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-white/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {loading
                ? <Loader2 size={13} className="animate-spin" />
                : <Play size={13} className="group-hover:scale-110 transition-transform" />
              }
              <span
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                className="tracking-widest uppercase"
              >
                {loading ? "Running..." : "Generate"}
              </span>
            </button>

            {(result || Object.values(values).some(Boolean)) && (
              <button
                onClick={handleClear}
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                className="text-white/20 hover:text-white/40 tracking-widest uppercase transition-colors"
              >
                Clear
              </button>
            )}
          </motion.div>
        </div>

        {/* RIGHT — output */}
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center gap-4 py-32"
              >
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 rounded-full border border-white/5" />
                  <div className="absolute inset-0 rounded-full border-t border-white/30 animate-spin" />
                </div>
                <span
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
                  className="text-white/20 tracking-[0.2em] uppercase animate-pulse"
                >
                  Generating...
                </span>
              </motion.div>
            )}

            {!loading && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-4"
              >
                {/* Final Prompt */}
                <div
                  className="rounded-xl p-5 flex flex-col gap-3"
                  style={{
                    border: "1px solid rgba(245,158,11,0.14)",
                    background: "linear-gradient(135deg,rgba(245,158,11,0.05) 0%,transparent 55%)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-yellow-400" />
                      <span
                        style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
                        className="text-yellow-400/70 tracking-[0.2em] uppercase"
                      >
                        Final Prompt
                      </span>
                    </div>
                    <span
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px" }}
                      className="text-white/15"
                    >
                      {result.final_prompt.length} chars
                    </span>
                  </div>
                  <pre
                    className="whitespace-pre-wrap text-white/40 leading-relaxed overflow-auto max-h-52"
                    style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                  >
                    {result.final_prompt}
                  </pre>
                </div>

                {/* LLM Output */}
                <div
                  className="rounded-xl p-5 flex flex-col gap-3"
                  style={{
                    border: "1px solid rgba(74,222,128,0.14)",
                    background: "linear-gradient(135deg,rgba(74,222,128,0.05) 0%,transparent 55%)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-green-400" />
                      <span
                        style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
                        className="text-green-400/70 tracking-[0.2em] uppercase"
                      >
                        LLM Output
                      </span>
                    </div>
                    <span
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px" }}
                      className="text-white/15"
                    >
                      {result.output.length} chars
                    </span>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">
                    {result.output}
                  </p>
                </div>
              </motion.div>
            )}

            {!loading && !result && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center py-32 gap-6"
              >
                <div className="flex flex-col items-center gap-1.5">
                  {BLOCKS.map((b, i) => (
                    <div
                      key={b.key}
                      className="rounded-md px-4 py-1.5 flex items-center gap-2"
                      style={{
                        border: `1px solid ${b.accent}18`,
                        background: `${b.accent}08`,
                        width: `${200 - i * 24}px`,
                        opacity: 0.55 - i * 0.1,
                      }}
                    >
                      <div className="w-1 h-1 rounded-full" style={{ background: b.accent }} />
                      <span
                        style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: b.accent + "99" }}
                        className="tracking-widest uppercase"
                      >
                        {b.tag}
                      </span>
                    </div>
                  ))}
                </div>
                <span
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
                  className="text-white/15 tracking-[0.2em] uppercase"
                >
                  Fill prompts &amp; generate
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}