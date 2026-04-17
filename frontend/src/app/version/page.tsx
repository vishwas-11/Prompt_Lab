// "use client";

// import ModuleSelector from "@/components/ModuleSelector";
// import VersionCreate from "@/components/VersionCreate";
// import VersionHistory from "@/components/VersionHistory";
// import VersionTest from "@/components/VersionTest";
// import VersionDiff from "@/components/VersionDiff";

// export default function VersionPage() {
//   return (
//     <div className="space-y-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Prompt Versioning</h1>
//         <ModuleSelector current="version" />
//       </div>

//       {/* MODULES */}
//       <VersionCreate />
//       <VersionHistory />
//       <VersionTest />
//       <VersionDiff />

//     </div>
//   );
// }









"use client";

import { motion } from "framer-motion";
import { GitCommit } from "lucide-react";
import VersionCreate from "@/components/VersionCreate";
import VersionHistory from "@/components/VersionHistory";
import VersionTest from "@/components/VersionTest";
import VersionDiff from "@/components/VersionDiff";

export default function VersionPage() {
  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-screen bg-[#0A0A0A] text-white"
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
      {/* noise overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        {/* PAGE HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-amber-400/20 bg-amber-400/5">
              <GitCommit size={15} className="text-amber-400" />
            </div>
            <span
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
              className="text-white/25 tracking-[0.2em] uppercase"
            >
              AGENT FRAMEWORK - PROMPT VERSIONING
            </span>
          </div>
          <h1
            style={{ fontFamily: "'Syne', sans-serif", lineHeight: 1.05 }}
            className="text-5xl font-extrabold text-white tracking-tight mb-3"
          >
            Prompt Versioning
            <span className="text-white/15">.</span>
          </h1>
          <p className="text-white/35 text-base font-light max-w-xl leading-relaxed">
            Create, track, test, and diff prompt versions across iterations with
            full rollback support.
          </p>
        </motion.div>

        {/* TOP ROW: Create + History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            <VersionCreate />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.14 }}
          >
            <VersionHistory />
          </motion.div>
        </div>

        {/* BOTTOM ROW: Test + Diff */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <VersionTest />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.26 }}
          >
            <VersionDiff />
          </motion.div>
        </div>
      </div>
    </div>
  );
}