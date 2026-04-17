"use client";

import { useState } from "react";
import api from "@/services/api";
import ModuleSelector from "@/components/ModuleSelector";
import { Play, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PromptBlock {
  label: string;
  key: "system" | "developer" | "user";
  enabled: boolean;
  value: string;
  accent: string;
  placeholder: string;
}

export default function RolesPage() {
  const [blocks, setBlocks] = useState<PromptBlock[]>([
    {
      label: "System Prompt",
      key: "system",
      enabled: true,
      value: "",
      accent: "#60A5FA",
      placeholder: "Define the AI's persona and core behavior...",
    },
    {
      label: "Developer Prompt",
      key: "developer",
      enabled: true,
      value: "",
      accent: "#F59E0B",
      placeholder: "Set constraints and operational rules...",
    },
    {
      label: "User Prompt",
      key: "user",
      enabled: true,
      value: "",
      accent: "#4ADE80",
      placeholder: "Enter the user's message or question...",
    },
  ]);

  const [result, setResult] = useState<{ final_prompt: string; output: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const update = (key: string, field: "enabled" | "value", val: boolean | string) => {
    setBlocks((prev) =>
      prev.map((b) => (b.key === key ? { ...b, [field]: val } : b))
    );
  };

  const handleRun = async () => {
    if (loading) return;
    const sys = blocks.find((b) => b.key === "system");
    const dev = blocks.find((b) => b.key === "developer");
    const usr = blocks.find((b) => b.key === "user");
    try {
      setLoading(true);
      const res = await api.post("/generate/roles", {
        system_prompt: sys?.enabled ? sys.value : "",
        developer_prompt: dev?.enabled ? dev.value : "",
        user_prompt: usr?.enabled ? usr.value : "",
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setBlocks((prev) => prev.map((b) => ({ ...b, value: "", enabled: true })));
    setResult(null);
  };

  const hasOutput = !!result;

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-[calc(100vh-57px)] bg-[#0A0A0A] px-8 py-8"
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            <span
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
              className="text-white/30 tracking-[0.2em] uppercase"
            >
              Technique
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(1.5rem,3vw,2rem)",
            }}
            className="font-extrabold text-white"
          >
            Roles Prompting
          </h1>
          <p className="text-white/30 text-sm font-light mt-1">
            Layer system, developer, and user roles to shape model behavior
          </p>
        </div>
        <ModuleSelector />
      </div>

      {/* Prompt blocks */}
      <div className="space-y-4 mb-6">
        {blocks.map((block) => (
          <div key={block.key}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                {/* Toggle */}
                <button
                  onClick={() => update(block.key, "enabled", !block.enabled)}
                  className={`w-8 h-4 rounded-full transition-all duration-200 relative ${
                    block.enabled ? "bg-white/20" : "bg-white/5"
                  }`}
                >
                  <span
                    className="absolute top-0.5 w-3 h-3 rounded-full transition-all duration-200"
                    style={{
                      left: block.enabled ? "calc(100% - 14px)" : "2px",
                      backgroundColor: block.enabled ? block.accent : "rgba(255,255,255,0.2)",
                    }}
                  />
                </button>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "10px",
                    color: block.enabled ? block.accent : "rgba(255,255,255,0.15)",
                  }}
                  className="tracking-[0.2em] uppercase transition-colors"
                >
                  {block.label}
                </span>
              </div>
              <span
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
                className="text-white/15"
              >
                {block.value.length} chars
              </span>
            </div>

            <div
              className="relative rounded-xl overflow-hidden transition-all duration-200"
              style={{
                border: `1px solid ${block.enabled ? block.accent + "22" : "rgba(255,255,255,0.04)"}`,
                background: block.enabled
                  ? `linear-gradient(135deg, ${block.accent}06 0%, transparent 60%)`
                  : "rgba(255,255,255,0.02)",
              }}
            >
              {/* Accent left bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-xl transition-all duration-200"
                style={{
                  backgroundColor: block.enabled ? block.accent + "60" : "transparent",
                }}
              />
              <textarea
                disabled={!block.enabled}
                value={block.value}
                onChange={(e) => update(block.key, "value", e.target.value)}
                placeholder={block.enabled ? block.placeholder : "Disabled"}
                rows={3}
                className="w-full bg-transparent text-white/80 placeholder-white/15 text-sm resize-none outline-none px-5 py-4 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={handleRun}
          disabled={loading || blocks.every((b) => !b.enabled || !b.value.trim())}
          className="group flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-white/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <Play size={13} className="group-hover:scale-110 transition-transform" />
          )}
          <span
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
            className="tracking-widest uppercase"
          >
            {loading ? "Running..." : "Generate"}
          </span>
        </button>

        {hasOutput && (
          <button
            onClick={handleClear}
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
            className="text-white/20 hover:text-white/40 tracking-widest uppercase transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px flex-1 bg-white/5" />
        <span
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
          className="text-white/15 tracking-[0.2em] uppercase shrink-0"
        >
          Output
        </span>
        <div className="h-px flex-1 bg-white/5" />
      </div>

      {/* Output grid */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            {/* Final Prompt */}
            <div
              className="rounded-xl p-5 flex flex-col gap-3"
              style={{
                border: "1px solid rgba(245,158,11,0.12)",
                background: "linear-gradient(135deg, rgba(245,158,11,0.04) 0%, transparent 60%)",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-yellow-400" />
                <span
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
                  className="text-yellow-400/70 tracking-[0.2em] uppercase"
                >
                  Final Prompt
                </span>
              </div>
              <pre
                className="whitespace-pre-wrap text-white/50 text-xs leading-relaxed"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {result.final_prompt}
              </pre>
            </div>

            {/* LLM Output */}
            <div
              className="rounded-xl p-5 flex flex-col gap-3"
              style={{
                border: "1px solid rgba(74,222,128,0.12)",
                background: "linear-gradient(135deg, rgba(74,222,128,0.04) 0%, transparent 60%)",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-green-400" />
                <span
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
                  className="text-green-400/70 tracking-[0.2em] uppercase"
                >
                  LLM Output
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">
                {result.output}
              </p>
            </div>
          </motion.div>
        )}

        {/* Empty state */}
        {!result && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 gap-3"
          >
            <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
            </div>
            <span
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
              className="text-white/15 tracking-[0.2em] uppercase"
            >
              No output yet
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}