// "use client";

// export default function SecurityBadge({ status }: { status: string }) {
//   const color =
//     status === "safe"
//       ? "bg-green-600"
//       : "bg-red-600";

//   return (
//     <span className={`${color} px-3 py-1 rounded text-sm`}>
//       {status}
//     </span>
//   );
// }





"use client";

import { motion } from "framer-motion";

export default function SecurityBadge({ status }: { status: string }) {
  // Define colors and labels based on status
  const getStatusConfig = (s: string) => {
    switch (s?.toLowerCase()) {
      case "safe":
        return {
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/20",
          text: "text-emerald-400",
          label: "Status: Secure",
        };
      case "blocked":
      case "blocked_or_sanitized":
        return {
          bg: "bg-rose-500/10",
          border: "border-rose-500/20",
          text: "text-rose-400",
          label: "Threat Detected",
        };
      case "sanitized":
        return {
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/20",
          text: "text-yellow-400",
          label: "Input Sanitized",
        };
      default:
        return {
          bg: "bg-white/5",
          border: "border-white/10",
          text: "text-white/40",
          label: status,
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${config.border} ${config.bg} backdrop-blur-md`}
    >
      {/* Pulse Dot Indicator */}
      <span className="relative flex h-1.5 w-1.5">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.text.replace('text', 'bg')}`}></span>
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${config.text.replace('text', 'bg')}`}></span>
      </span>

      <span
        style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
        className={`tracking-[0.1em] uppercase font-bold ${config.text}`}
      >
        {config.label}
      </span>
    </motion.div>
  );
}