"use client";

import { useState } from "react";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Terminal, ArrowRight, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (loading) return;
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await login(email, password);
      router.replace("/cot");
      router.refresh();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError((err.response?.data as { detail?: string } | undefined)?.detail || "Login failed");
        return;
      }
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center overflow-hidden relative"
    >
      {/* grid bg */}
      <div className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      {/* noise */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* top bar */}
      <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-5 border-b border-white/[0.06]">
        <button onClick={() => router.push("/")} className="flex items-center gap-2.5 hover:opacity-70 transition-opacity">
          <Terminal size={16} className="text-white/40" />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px" }} className="text-white/50 tracking-widest uppercase">
            prompt_lab
          </span>
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 w-full max-w-sm px-6"
      >
        {/* eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }} className="text-white/35 tracking-[0.2em] uppercase">
            Secure Sign In
          </span>
        </div>

        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem,5vw,2.75rem)", lineHeight: 1.1 }} className="font-extrabold text-white mb-2">
          Welcome<br />
          <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.25)", color: "transparent" }}>back.</span>
        </h1>
        <p className="text-white/30 text-sm font-light mb-10">Continue your prompt engineering session.</p>

        <div className="space-y-3">
          <div>
            <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }} className="text-white/25 tracking-[0.2em] uppercase block mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="you@example.com"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/25 focus:bg-white/[0.06] transition-all"
            />
          </div>

          <div>
            <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }} className="text-white/25 tracking-[0.2em] uppercase block mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="••••••••"
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 pr-10 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/25 focus:bg-white/[0.06] transition-all"
              />
              <button
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
              >
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5"
            >
              <div className="w-1 h-1 rounded-full bg-red-400 shrink-0" />
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }} className="text-red-400">
                {error}
              </p>
            </motion.div>
          )}

          <div className="pt-2">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="group w-full flex items-center justify-center gap-2 bg-white text-black py-3 rounded-lg text-sm font-medium hover:bg-white/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px" }} className="tracking-widest">
                  Signing in...
                </span>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-center gap-2">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }} className="text-white/20">
            No account?
          </span>
          <button
            onClick={() => router.push("/register")}
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
            className="text-white/50 hover:text-white/80 transition-colors tracking-wide"
          >
            Register →
          </button>
        </div>
      </motion.div>
    </div>
  );
}