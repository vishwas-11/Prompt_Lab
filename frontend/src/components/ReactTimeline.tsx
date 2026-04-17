"use client";

import { motion } from "framer-motion";
import StepCard from "./StepCard";

export default function ReactTimeline({ steps }: { steps: any[] }) {
  if (!steps.length) return null;

  return (
    <div className="relative">
      {/* vertical connector line */}
      <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-yellow-400/30 via-white/6 to-transparent pointer-events-none" />

      <div className="space-y-3">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.25 }}
          >
            <StepCard index={i + 1} {...step} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}