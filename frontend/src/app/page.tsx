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
  ArrowRight,
  Terminal,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    tag: "01",
    title: "Chain-of-Thought",
    desc: "Force step-by-step reasoning. Reduce hallucinations. Get auditable outputs.",
    accent: "#4ADE80",
  },
  {
    icon: GitBranch,
    tag: "02",
    title: "Tree-of-Thoughts",
    desc: "Branch into multiple reasoning paths and score each trajectory.",
    accent: "#60A5FA",
  },
  {
    icon: Zap,
    tag: "03",
    title: "Prompt Optimization",
    desc: "Automated prompt rewriting with diff comparison and scoring.",
    accent: "#FACC15",
  },
  {
    icon: Layers,
    tag: "04",
    title: "Prompt Versioning",
    desc: "Git-style version history. A/B test prompts. Roll back instantly.",
    accent: "#F472B6",
  },
  {
    icon: Shield,
    tag: "05",
    title: "Injection Guard",
    desc: "Real-time detection and sanitization of adversarial prompt inputs.",
    accent: "#FB923C",
  },
  {
    icon: Sparkles,
    tag: "06",
    title: "Role Prompting",
    desc: "Layer system, developer, and user context with fine-grained control.",
    accent: "#A78BFA",
  },
];

const featureRoutes: Record<string, string> = {
  "Chain-of-Thought": "/cot",
  "Tree-of-Thoughts": "/tot",
  "Prompt Optimization": "/optimize",
  "Prompt Versioning": "/version",
  "Injection Guard": "/security",
  "Role Prompting": "/roles",
};

const ticker = [
  "Chain-of-Thought",
  "Tree-of-Thoughts",
  "Self-Consistency",
  "Prompt Injection Guard",
  "Role Prompting",
  "Versioning",
  "Optimization",
  "React Prompting",
];

export default function HomePage() {
  const router = useRouter();
  const handleExplore = (title: string) => {
    const hasToken =
      typeof window !== "undefined" &&
      Boolean(window.localStorage.getItem("auth_token"));
    const targetRoute = featureRoutes[title] ?? "/cot";

    router.push(hasToken ? targetRoute : "/login");
  };

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden"
    >
      {/* ── NOISE TEXTURE OVERLAY ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* ── GRID LINE BACKGROUND ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      {/* ── HEADER BAR ── */}
      <header className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/6">
        <div className="flex items-center gap-2.5">
          <Terminal size={16} className="text-white/40" />
          <span
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px" }}
            className="text-white/50 tracking-widest uppercase"
          >
            prompt_lab
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/login")}
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px" }}
            className="text-white/40 hover:text-white/70 transition-colors tracking-wider uppercase"
          >
            Sign in
          </button>
          <button
            onClick={() => router.push("/register")}
            className="px-4 py-2 border border-white/15 rounded-lg text-white/80 text-sm hover:border-white/40 hover:bg-white/5 transition-all"
          >
            Get access →
          </button>
        </div>
      </header>

      {/* ── TICKER STRIP ── */}
      <div className="relative z-10 border-b border-white/6 py-2.5 overflow-hidden bg-white/2">
        <div className="flex gap-12 animate-[ticker_30s_linear_infinite] whitespace-nowrap">
          {[...ticker, ...ticker].map((item, i) => (
            <span
              key={i}
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
              className="text-white/25 tracking-[0.15em] uppercase shrink-0"
            >
              ◆ {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative z-10 px-8 pt-24 pb-16 max-w-6xl mx-auto">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
            className="text-white/35 tracking-[0.2em] uppercase"
          >
            Open Beta — Free Access
          </span>
        </motion.div>

        {/* headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          style={{ fontFamily: "'Syne', sans-serif", lineHeight: 1.05 }}
          className="text-[clamp(3rem,8vw,7rem)] font-extrabold text-white tracking-tight max-w-4xl"
        >
          Engineer
          <br />
          <span className="text-white/20">your prompts.</span>
          <br />
          <span
            style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.3)",
              color: "transparent",
            }}
          >
            Ship faster.
          </span>
        </motion.h1>

        {/* sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 text-white/40 text-lg max-w-lg leading-relaxed font-light"
        >
          A focused workbench for advanced prompt engineering — test techniques,
          iterate fast, and build reliable AI workflows.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-10 flex items-center gap-4 flex-wrap"
        >
          <button
            onClick={() => router.push("/register")}
            className="group flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-medium text-sm hover:bg-white/90 transition-all"
          >
            Start for free
            <ArrowRight
              size={14}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
          <button
            onClick={() => router.push("/login")}
            className="flex items-center gap-2 text-white/40 text-sm hover:text-white/70 transition-colors"
          >
            <span
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px" }}
            >
              Already have an account?
            </span>
          </button>
        </motion.div>

        {/* stat strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-16 flex gap-10 flex-wrap border-t border-white/6 pt-10"
        >
          {[
            { val: "6+", label: "Prompt Techniques" },
            { val: "∞", label: "Versions tracked" },
            { val: "1-click", label: "Optimization" },
          ].map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                }}
                className="font-bold text-white"
              >
                {s.val}
              </div>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "11px",
                }}
                className="text-white/30 tracking-widest uppercase mt-1"
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="relative z-10 px-8 pb-24 max-w-6xl mx-auto">
        {/* section label */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-white/6" />
          <span
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
            className="text-white/25 tracking-[0.2em] uppercase shrink-0"
          >
            Techniques
          </span>
          <div className="h-px flex-1 bg-white/6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="group bg-[#0A0A0A] p-8 hover:bg-white/3 transition-colors cursor-pointer relative overflow-hidden"
              >
                {/* accent corner */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at top right, ${f.accent}18, transparent 70%)`,
                  }}
                />

                {/* tag + icon */}
                <div className="flex items-start justify-between mb-6">
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "11px",
                    }}
                    className="text-white/20 tracking-widest"
                  >
                    {f.tag}
                  </span>
                  <Icon
                    size={18}
                    style={{ color: f.accent }}
                    className="opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "18px",
                  }}
                  className="font-bold text-white/85 mb-3 group-hover:text-white transition-colors"
                >
                  {f.title}
                </h3>
                <p className="text-white/35 text-sm leading-relaxed font-light">
                  {f.desc}
                </p>

                <button
                  type="button"
                  onClick={() => handleExplore(f.title)}
                  className="mt-6 flex items-center gap-2 text-white/20 group-hover:text-white/50 transition-colors"
                >
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "11px",
                    }}
                    className="tracking-widest uppercase"
                  >
                    Explore
                  </span>
                  <ArrowRight size={11} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── BOTTOM CTA BAND ── */}
      <section className="relative z-10 border-t border-white/6 px-8 py-16 max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-6">
        <div>
          <h2
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            className="font-bold text-white"
          >
            Ready to build?
          </h2>
          <p className="text-white/30 text-sm mt-1 font-light">
            No credit card. No fluff. Just prompts.
          </p>
        </div>
        <button
          onClick={() => router.push("/register")}
          className="group flex items-center gap-2 border border-white/15 text-white/70 px-6 py-3 rounded-xl text-sm hover:border-white/40 hover:text-white hover:bg-white/5 transition-all"
        >
          Create account
          <ArrowRight
            size={13}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </button>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-white/6 px-8 py-5 flex items-center justify-between flex-wrap gap-3">
        <span
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
          className="text-white/20 tracking-widest uppercase"
        >
          prompt_lab
        </span>
        <span
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
          className="text-white/15"
        >
          FastAPI + Next.js
        </span>
      </footer>

      {/* ── TICKER KEYFRAME ── */}
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}