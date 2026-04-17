"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Brain,
  GitBranch,
  Shield,
  Zap,
  Layers,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  const features = [
    {
      icon: <Brain size={28} />,
      title: "Chain-of-Thought",
      desc: "Step-by-step reasoning for better accuracy",
    },
    {
      icon: <GitBranch size={28} />,
      title: "Tree-of-Thoughts",
      desc: "Explore multiple reasoning paths",
    },
    {
      icon: <Zap size={28} />,
      title: "Prompt Optimization",
      desc: "Automatically improve your prompts",
    },
    {
      icon: <Layers size={28} />,
      title: "Prompt Versioning",
      desc: "Track and compare prompt versions",
    },
    {
      icon: <Shield size={28} />,
      title: "Prompt Injection Guard",
      desc: "Detect and sanitize malicious inputs",
    },
    {
      icon: <Sparkles size={28} />,
      title: "Roles Prompting",
      desc: "System, developer & user role control",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[600px] h-[600px] bg-blue-600 opacity-20 blur-[150px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[500px] h-[500px] bg-purple-600 opacity-20 blur-[150px] rounded-full bottom-[-100px] right-[-100px]" />

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 max-w-3xl z-10"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Build Better Prompts with{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            AI Engineering Lab
          </span>
        </h1>

        <p className="text-gray-400 text-lg">
          A playground to experiment with advanced prompt engineering techniques,
          optimize outputs, and build production-ready AI workflows.
        </p>

        <button
          onClick={() => router.push("/login")}
          className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 rounded-xl text-lg font-semibold hover:scale-105 transition"
        >
           Get Started
        </button>
      </motion.div>

      {/* FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl z-10">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 transition"
          >
            <div className="mb-3 text-blue-400">{f.icon}</div>
            <h3 className="text-xl font-semibold">{f.title}</h3>
            <p className="text-gray-400 text-sm mt-2">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="absolute bottom-6 text-gray-500 text-sm">
        Built with FastAPI ⚡ + Next.js ⚡
      </div>
    </div>
  );
}