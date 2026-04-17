// export default function AttemptsPanel({
//   attempts,
// }: {
//   attempts: any[];
// }) {
//   return (
//     <div className="bg-gray-900 p-4 rounded-lg h-full overflow-auto">
//       <h2 className="text-lg font-semibold mb-3">🔁 All Attempts</h2>

//       <div className="space-y-3">
//         {attempts.map((a, i) => (
//           <div
//             key={i}
//             className="bg-gray-800 p-3 rounded border-l-4 border-purple-500"
//           >
//             <p className="text-sm text-gray-400">
//               Attempt {i + 1}
//             </p>

//             <p className="text-green-400 text-sm mt-1">
//               Answer: {a.answer}
//             </p>

//             <details className="mt-2 text-xs">
//               <summary className="cursor-pointer text-blue-400">
//                 View Reasoning
//               </summary>

//               <pre className="mt-1 whitespace-pre-wrap">
//                 {a.full_output}
//               </pre>
//             </details>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }










"use client";

import { motion } from "framer-motion";

interface Attempt {
  answer: string;
  full_output: string;
}

interface AttemptsPanelProps {
  attempts: Attempt[];
}

export default function AttemptsPanel({ attempts }: AttemptsPanelProps) {
  return (
    <div className="h-full flex flex-col bg-transparent">
      {/* Custom Scrollable Area */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar p-4">
        {attempts?.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group relative border border-white/6 bg-white/2 rounded-lg p-4 hover:bg-white/4 hover:border-white/10 transition-all"
          >
            {/* Index Badge */}
            <div
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
              className="text-white/20 tracking-widest uppercase mb-2"
            >
              Attempt {String(i + 1).padStart(2, "0")}
            </div>

            {/* Answer Section */}
            <div className="flex items-start gap-2 mb-3">
              <span
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                className="text-emerald-400/70 uppercase tracking-tight shrink-0 mt-0.5"
              >
                Result:
              </span>
              <p className="text-white/80 text-sm font-medium leading-relaxed">
                {a.answer}
              </p>
            </div>

            {/* Collapsible Reasoning */}
            <details className="group/details">
              <summary className="list-none cursor-pointer flex items-center gap-2 text-white/30 hover:text-white/50 transition-colors">
                <div className="w-1 h-1 rounded-full bg-emerald-500/40" />
                <span
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
                  className="tracking-widest uppercase"
                >
                  View Chain of Thought
                </span>
              </summary>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 pt-3 border-t border-white/5"
              >
                <pre
                  style={{ fontFamily: "'DM Mono', monospace" }}
                  className="text-[11px] leading-relaxed text-white/40 whitespace-pre-wrap bg-black/20 p-3 rounded-md border border-white/5"
                >
                  {a.full_output}
                </pre>
              </motion.div>
            </details>

            {/* Subtle side glow on hover */}
            <div className="absolute inset-y-0 left-0 w-0.5 bg-emerald-500/0 group-hover:bg-emerald-500/40 transition-all rounded-full" />
          </motion.div>
        ))}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}