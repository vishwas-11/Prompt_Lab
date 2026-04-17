// export default function ReasoningPanel({ steps }: { steps: string[] }) {
//   return (
//     <div className="bg-white/3 border border-white/6 rounded-xl overflow-hidden flex flex-col h-full">
//       <div className="flex items-center gap-2.5 px-5 py-3 border-b border-white/6">
//         <div className="w-1.5 h-1.5 rounded-full bg-purple-400/60" />
//         <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }} className="text-white/40 tracking-[0.2em] uppercase">
//           CoT Thought Process
//         </span>
//       </div>
//       <div className="flex-1 p-5 min-h-45">
//         {steps.length > 0 ? (
//           <div className="space-y-3">
//             {steps.map((step, i) => (
//               <div key={i} className="flex gap-3">
//                 <div className="shrink-0 mt-0.5">
//                   <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }} className="text-white/20">
//                     {String(i + 1).padStart(2, "0")}
//                   </span>
//                 </div>
//                 <div className="flex-1 border-l border-white/6 pl-3">
//                   <p className="text-white/60 text-sm leading-relaxed font-light">{step}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="h-full flex items-center justify-center">
//             <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }} className="text-white/15 tracking-widest uppercase">
//               No steps yet...
//             </span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }







"use client";

import { motion } from "framer-motion";

export default function ReasoningPanel({ steps, loading }: { steps: string[], loading?: boolean }) {
  return (
    <div className="bg-white/2 border border-white/8 rounded-xl overflow-hidden flex flex-col h-full">
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/6 bg-white/2">
        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }} className="text-white/40 tracking-[0.2em] uppercase">
          Logic Sequence
        </span>
      </div>

      <div className="flex-1 p-5 overflow-y-auto custom-scrollbar">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-4 h-4 rounded bg-white/5 animate-pulse shrink-0" />
                <div className="h-4 flex-1 bg-white/5 animate-pulse rounded" />
              </div>
            ))}
          </div>
        ) : steps.length > 0 ? (
          <div className="space-y-4">
            {steps.map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 group"
              >
                <div className="flex flex-col items-center">
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }} className="text-white/20 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-px flex-1 bg-white/10 my-1 group-last:hidden" />
                </div>
                <div className="pb-4">
                  <p className="text-white/60 text-sm leading-relaxed font-light border-l border-white/10 pl-4">
                    {step}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
             <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }} className="text-white/10 tracking-widest uppercase italic text-center">
              Internal logic trace<br/>will appear here
            </span>
          </div>
        )}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
      `}</style>
    </div>
  );
}