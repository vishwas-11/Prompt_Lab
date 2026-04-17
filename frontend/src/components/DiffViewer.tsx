"use client";

import { motion } from "framer-motion";
import { ArrowRight, Minus, Plus } from "lucide-react";

interface DiffLine {
  type: "added" | "removed" | "unchanged";
  old?: string;
  new?: string;
}

export default function DiffViewer({ diff }: { diff: DiffLine[] }) {
  if (!Array.isArray(diff)) {
    return (
      <div className="border border-rose-500/20 bg-rose-500/5 p-4 rounded-xl text-rose-400 text-xs font-mono">
        Invalid diff format received.
      </div>
    );
  }

  return (
    <div className="border border-white/8 bg-white/2 rounded-xl overflow-hidden backdrop-blur-sm">
      {/* --- HEADER --- */}
      <div className="grid grid-cols-2 bg-white/5 border-b border-white/6 py-3 px-5">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500/50" />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }} className="text-white/30 tracking-[0.2em] uppercase">
            Old Version
          </span>
        </div>
        <div className="flex items-center gap-2 pl-4 border-l border-white/6">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }} className="text-white/30 tracking-[0.2em] uppercase">
            New Version
          </span>
        </div>
      </div>

      {/* --- DIFF ROWS --- */}
      <div className="divide-y divide-white/4">
        {diff.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="grid grid-cols-2 group"
          >
            {/* LEFT (OLD) */}
            <div 
              className={`px-5 py-3 whitespace-pre-wrap text-[13px] leading-relaxed transition-colors ${
                line.type === "removed" 
                ? "bg-rose-500/10 text-rose-200/70" 
                : "text-white/20"
              }`}
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              <div className="flex gap-3">
                {line.type === "removed" && <Minus size={12} className="mt-1 shrink-0 opacity-40" />}
                <span>{line.old || (line.type === "unchanged" ? line.new : "")}</span>
              </div>
            </div>

            {/* RIGHT (NEW) */}
            <div 
              className={`px-5 py-3 whitespace-pre-wrap text-[13px] leading-relaxed border-l border-white/6 transition-colors ${
                line.type === "added" 
                ? "bg-emerald-500/10 text-emerald-200/70" 
                : "text-white/20"
              }`}
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              <div className="flex gap-3">
                {line.type === "added" && <Plus size={12} className="mt-1 shrink-0 opacity-40" />}
                <span>{line.new || (line.type === "unchanged" ? line.old : "")}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- FOOTER / STATS --- */}
      {diff.length > 0 && (
        <div className="px-5 py-2 border-t border-white/6 bg-white/[0.01] flex justify-end gap-4">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px" }} className="text-white/10 tracking-widest uppercase">
                Lines Analyzed: {diff.length}
            </span>
        </div>
      )}
    </div>
  );
}