// "use client";

// import SecurityBadge from "./SecurityBadge";

// export default function SecurityPanel({ data }: any) {
//   const { input, security, execution } = data;

//   return (
//     <div className="grid grid-cols-3 gap-4 mt-6">

//       {/* LEFT - SECURITY */}
//       <div className="bg-gray-900 p-4 rounded space-y-3">
//         <h2 className="text-lg font-semibold">🔐 Security Analysis</h2>

//         <SecurityBadge status={security.status} />

//         <p className="text-sm text-gray-400">
//           <strong>Detected Pattern:</strong>
//         </p>
//         <div className="bg-black p-2 rounded text-red-400 text-sm">
//           {security.detected_pattern || "None"}
//         </div>
//       </div>

//       {/* CENTER - INPUT */}
//       <div className="bg-gray-900 p-4 rounded space-y-3">
//         <h2 className="text-lg font-semibold">📥 Input</h2>

//         <div className="bg-black p-3 rounded text-sm">
//           {input}
//         </div>

//         {execution.sanitized_input && (
//           <>
//             <h3 className="text-yellow-400 text-sm">
//               Sanitized Input
//             </h3>
//             <div className="bg-black p-3 rounded text-sm text-yellow-300">
//               {execution.sanitized_input}
//             </div>
//           </>
//         )}
//       </div>

//       {/* RIGHT - OUTPUT */}
//       <div className="bg-gray-900 p-4 rounded space-y-3">
//         <h2 className="text-lg font-semibold">🤖 LLM Response</h2>

//         <div className="bg-black p-3 rounded text-green-400 text-sm whitespace-pre-wrap max-h-[400px] overflow-y-auto">
//           {execution.llm_response}
//         </div>
//       </div>
//     </div>
//   );
// }








"use client";

import { motion } from "framer-motion";
import { ShieldAlert, ShieldCheck, Cpu, Database, AlertTriangle } from "lucide-react";
import SecurityBadge from "./SecurityBadge";

export default function SecurityPanel({ data }: { data: any }) {
  const { input, security, execution } = data;
  const isSafe = security.status === "safe";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 1. Security Analysis */}
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className={`border ${isSafe ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-rose-500/20 bg-rose-500/5'} rounded-xl p-5 space-y-4`}
      >
        <div className="flex items-center gap-2 mb-2">
          <ShieldAlert size={14} className={isSafe ? "text-emerald-400" : "text-rose-400"} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }} className="uppercase tracking-widest opacity-50">Security Analysis</span>
        </div>
        
        <SecurityBadge status={security.status} />
        
        <div className="space-y-2">
          <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }} className="uppercase text-white/30 tracking-widest">Detected Pattern:</label>
          <div className="p-3 bg-black/40 border border-white/5 rounded-lg font-mono text-xs text-rose-400/80 leading-relaxed">
            {security.detected_pattern || "None"}
          </div>
        </div>
      </motion.div>

      {/* 2. Sanitized Input */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="border border-white/8 bg-white/2 rounded-xl p-5 space-y-4"
      >
        <div className="flex items-center gap-2 mb-2">
          <Database size={14} className="text-blue-400" />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }} className="uppercase tracking-widest opacity-50">Input Handling</span>
        </div>

        <div className="space-y-4">
          <div>
            <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }} className="uppercase text-white/30 tracking-widest">Raw Input:</label>
            <p className="mt-1 text-sm text-white/60 line-clamp-3 italic">"{input}"</p>
          </div>
          
          {execution.sanitized_input && (
            <div className="pt-3 border-t border-white/5">
              <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }} className="uppercase text-yellow-500/60 tracking-widest block mb-2">Sanitized Input:</label>
              <div className="p-3 bg-yellow-500/5 border border-yellow-500/10 rounded-lg font-mono text-xs text-yellow-200/70">
                {execution.sanitized_input}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* 3. LLM Response */}
      <motion.div 
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="border border-white/8 bg-white/2 rounded-xl overflow-hidden flex flex-col"
      >
        <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-white/2">
          <Cpu size={14} className="text-violet-400" />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }} className="uppercase tracking-widest opacity-50">LLM Response</span>
        </div>
        
        <div className="p-5 flex-1 overflow-y-auto max-h-[300px] custom-scrollbar">
          <p className="text-emerald-400/90 font-mono text-xs leading-relaxed whitespace-pre-wrap">
            {execution.llm_response}
          </p>
        </div>
      </motion.div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
      `}</style>
    </div>
  );
}