"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border border-green-500/20 rounded-xl bg-green-500/3 overflow-hidden"
    >
      {/* header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-green-500/15">
        <Sparkles size={12} className="text-green-400/60" />
        <span
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
          className="text-green-400/70 tracking-[0.15em] uppercase"
        >
          {title}
        </span>
      </div>

      {/* value */}
      <div className="p-4">
        <div className="border-l-2 border-green-500/40 pl-4">
          <p
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            className="text-white/80 text-sm leading-relaxed font-light"
          >
            {value || "Processing..."}
          </p>
        </div>
      </div>

      {/* verified strip */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-green-500/10">
        <span
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px" }}
          className="text-white/15 tracking-widest uppercase"
        >
          Verified Status
        </span>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-green-500/40" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}