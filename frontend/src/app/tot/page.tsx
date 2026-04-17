"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitBranch,
  Play,
  Loader2,
  ChevronRight,
  ChevronDown,
  Trophy,
  Sparkles,
  Terminal,
  RotateCcw,
  Info,
} from "lucide-react";

// ── TYPES ──────────────────────────────────────────────────────────────────
interface TreeNodeData {
  thought: string;
  score: number;
  depth: number;
  children: TreeNodeData[];
  isPruned?: boolean;
  isBest?: boolean;
}

interface TotResult {
  tree: TreeNodeData;
  bestPath: string[];
  finalAnswer: string;
}

// ── SCORE COLOR HELPER ──────────────────────────────────────────────────────
function scoreColor(score: number): string {
  if (score >= 0.8) return "#4ADE80";
  if (score >= 0.6) return "#FACC15";
  if (score >= 0.4) return "#FB923C";
  return "#F87171";
}

function scoreLabel(score: number): string {
  if (score >= 0.8) return "strong";
  if (score >= 0.6) return "moderate";
  if (score >= 0.4) return "weak";
  return "pruned";
}

// ── TREE NODE COMPONENT ────────────────────────────────────────────────────
function TreeNode({
  node,
  depth = 0,
  isLast = false,
}: {
  node: TreeNodeData;
  depth?: number;
  isLast?: boolean;
}) {
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;
  const color = scoreColor(node.score);

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: depth * 0.05 }}
      className="relative"
    >
      {/* connector line */}
      {depth > 0 && (
        <div
          className="absolute left-0 top-0 bottom-0 pointer-events-none"
          style={{
            width: "1px",
            background: `linear-gradient(to bottom, ${color}40, transparent)`,
            left: "-20px",
          }}
        />
      )}

      <div
        className={`group relative flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer mb-1 ${
          node.isBest
            ? "border-green-500/30 bg-green-500/5"
            : node.isPruned
            ? "border-white/4 bg-white/1 opacity-40"
            : "border-white/6 bg-white/2 hover:border-white/15 hover:bg-white/4"
        }`}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        {/* score bar on left edge */}
        <div
          className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
          style={{ background: color, opacity: node.isPruned ? 0.3 : 0.8 }}
        />

        <div className="flex-1 min-w-0 pl-2">
          <div className="flex items-center gap-2 mb-1.5">
            {/* depth badge */}
            <span
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
              className="text-white/20 tracking-widest shrink-0"
            >
              D{node.depth}
            </span>

            {/* score chip */}
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px",
                color,
                border: `1px solid ${color}40`,
              }}
              className="px-1.5 py-0.5 rounded text-white/60 shrink-0"
            >
              {(node.score * 100).toFixed(0)}
            </span>

            {/* label */}
            <span
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color }}
              className="tracking-widest uppercase opacity-60 shrink-0"
            >
              {scoreLabel(node.score)}
            </span>

            {node.isBest && (
              <span
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
                className="text-green-400 tracking-widest uppercase ml-auto shrink-0"
              >
                ★ best
              </span>
            )}

            {/* expand toggle */}
            {hasChildren && (
              <div className="ml-auto text-white/20 group-hover:text-white/50 transition-colors shrink-0">
                {expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              </div>
            )}
          </div>

          <p className="text-white/55 text-sm leading-relaxed font-light">
            {node.thought}
          </p>
        </div>
      </div>

      {/* children */}
      <AnimatePresence>
        {expanded && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-6 pl-5 border-l border-white/6"
          >
            {node.children.map((child, i) => (
              <TreeNode
                key={i}
                node={child}
                depth={depth + 1}
                isLast={i === node.children.length - 1}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── BEST PATH PANEL ────────────────────────────────────────────────────────
function BestPathPanel({
  bestPath,
  finalAnswer,
}: {
  bestPath: string[];
  finalAnswer: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="border border-green-500/20 rounded-xl overflow-hidden bg-green-500/3"
    >
      {/* header */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-green-500/15">
        <Trophy size={13} className="text-green-400" />
        <span
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
          className="text-green-400/80 tracking-[0.15em] uppercase"
        >
          Optimal Path
        </span>
        <span
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
          className="ml-auto text-white/20"
        >
          {bestPath.length} steps
        </span>
      </div>

      <div className="p-5 space-y-2">
        {bestPath.map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            {/* step number + connector */}
            <div className="flex flex-col items-center shrink-0 pt-0.5">
              <div
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
                className="w-5 h-5 rounded-full border border-green-500/40 flex items-center justify-center text-green-400/70"
              >
                {i + 1}
              </div>
              {i < bestPath.length - 1 && (
                <div className="w-px flex-1 bg-green-500/15 mt-1 min-h-[16px]" />
              )}
            </div>
            <p className="text-white/55 text-sm leading-relaxed font-light pb-2">
              {step}
            </p>
          </div>
        ))}
      </div>

      {/* final answer */}
      <div className="border-t border-green-500/15 px-5 py-4">
        <div
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
          className="text-white/25 tracking-[0.15em] uppercase mb-2"
        >
          Final Answer
        </div>
        <p className="text-white/85 text-sm leading-relaxed">{finalAnswer}</p>
      </div>
    </motion.div>
  );
}

// ── MOCK DATA GENERATOR ────────────────────────────────────────────────────
function generateMockTree(problem: string): TotResult {
  const root: TreeNodeData = {
    thought: `Initial analysis of: "${problem.slice(0, 60)}..."`,
    score: 0.72,
    depth: 0,
    isBest: false,
    children: [
      {
        thought: "Break the problem into sub-components and address each systematically using deductive reasoning.",
        score: 0.88,
        depth: 1,
        isBest: true,
        children: [
          {
            thought: "Identify core variables and constraints that bound the solution space.",
            score: 0.91,
            depth: 2,
            isBest: true,
            children: [
              {
                thought: "Apply constraint propagation to eliminate invalid states and converge on optimal solution.",
                score: 0.94,
                depth: 3,
                isBest: true,
                children: [],
              },
              {
                thought: "Use heuristic evaluation to estimate remaining cost and prune low-value branches.",
                score: 0.61,
                depth: 3,
                isBest: false,
                children: [],
              },
            ],
          },
          {
            thought: "Enumerate candidate solutions and evaluate each against the objective function.",
            score: 0.55,
            depth: 2,
            isBest: false,
            isPruned: true,
            children: [],
          },
        ],
      },
      {
        thought: "Apply analogical reasoning from similar known problems to transfer solution patterns.",
        score: 0.63,
        depth: 1,
        isBest: false,
        children: [
          {
            thought: "Search for structural similarities in solution space that enable pattern transfer.",
            score: 0.58,
            depth: 2,
            isBest: false,
            isPruned: true,
            children: [],
          },
        ],
      },
      {
        thought: "Use divide and conquer — recursively solve smaller sub-problems and combine results.",
        score: 0.34,
        depth: 1,
        isBest: false,
        isPruned: true,
        children: [],
      },
    ],
  };

  return {
    tree: root,
    bestPath: [
      "Decompose the problem into its fundamental sub-components.",
      "Identify core variables and constraints bounding the solution space.",
      "Apply constraint propagation to eliminate invalid states.",
      "Converge on the optimal solution via systematic evaluation.",
    ],
    finalAnswer: `Through structured tree-of-thoughts reasoning, the optimal approach to "${problem.slice(0, 50)}..." involves systematic decomposition followed by constraint-driven convergence, yielding a high-confidence solution path.`,
  };
}

// ── STAT CHIP ──────────────────────────────────────────────────────────────
function StatChip({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="border border-white/6 rounded-lg px-4 py-3 bg-white/2">
      <div style={{ fontFamily: "'Syne', sans-serif", color: accent }} className="text-lg font-bold">
        {value}
      </div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }} className="text-white/25 tracking-widest uppercase mt-0.5">
        {label}
      </div>
    </div>
  );
}

// ── MAIN PAGE ──────────────────────────────────────────────────────────────
export default function TreeOfThoughtsPage() {
  const [problem, setProblem] = useState("");
  const [branches, setBranches] = useState(3);
  const [depth, setDepth] = useState(3);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TotResult | null>(null);
  const [activeTab, setActiveTab] = useState<"tree" | "path">("tree");

  const handleRun = async () => {
    if (!problem.trim()) return;
    setLoading(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 1800));
    setResult(generateMockTree(problem));
    setLoading(false);
  };

  const handleReset = () => {
    setResult(null);
    setProblem("");
  };

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
        {/* ── PAGE HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-blue-400/20 bg-blue-400/5"
            >
              <GitBranch size={15} className="text-blue-400" />
            </div>
            <div>
              <span
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
                className="text-white/25 tracking-[0.2em] uppercase"
              >
                AGENT FRAMEWORK - TREE OF THOUGHTS
              </span>
            </div>
          </div>

          <h1
            style={{ fontFamily: "'Syne', sans-serif", lineHeight: 1.05 }}
            className="text-5xl font-extrabold text-white tracking-tight mb-3"
          >
            Tree of Thoughts
            <span className="text-white/15">.</span>
          </h1>
          <p className="text-white/35 text-base font-light max-w-xl leading-relaxed">
            Branch reasoning into multiple parallel trajectories, score each path,
            and converge on the optimal solution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* ── LEFT PANEL: CONFIG ── */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* problem input */}
            <div className="border border-white/8 rounded-xl bg-white/2 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/6">
                <Terminal size={12} className="text-white/25" />
                <span
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                  className="text-white/25 tracking-[0.15em] uppercase"
                >
                  Problem Statement
                </span>
              </div>
              <div className="p-4">
                <textarea
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="Describe a complex problem requiring multi-step reasoning..."
                  rows={6}
                  className="w-full bg-transparent text-white/70 text-sm placeholder-white/15 resize-none outline-none leading-relaxed font-light"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>
            </div>

            {/* params */}
            <div className="border border-white/8 rounded-xl bg-white/2 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/6">
                <span
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                  className="text-white/25 tracking-[0.15em] uppercase"
                >
                  Parameters
                </span>
              </div>
              <div className="p-4 space-y-5">
                {/* branches */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                      className="text-white/30 tracking-widest uppercase"
                    >
                      Branches
                    </label>
                    <span
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px" }}
                      className="text-blue-400"
                    >
                      {branches}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={6}
                    value={branches}
                    onChange={(e) => setBranches(Number(e.target.value))}
                    className="w-full accent-blue-400 h-1 rounded-full bg-white/10 outline-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-1">
                    {[2, 3, 4, 5, 6].map((v) => (
                      <span
                        key={v}
                        style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px" }}
                        className="text-white/15"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

                {/* depth */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                      className="text-white/30 tracking-widest uppercase"
                    >
                      Max Depth
                    </label>
                    <span
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px" }}
                      className="text-blue-400"
                    >
                      {depth}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={5}
                    value={depth}
                    onChange={(e) => setDepth(Number(e.target.value))}
                    className="w-full accent-blue-400 h-1 rounded-full bg-white/10 outline-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-1">
                    {[2, 3, 4, 5].map((v) => (
                      <span
                        key={v}
                        style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px" }}
                        className="text-white/15"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* info card */}
            <div className="border border-blue-400/10 rounded-xl bg-blue-400/3 p-4">
              <div className="flex items-start gap-3">
                <Info size={13} className="text-blue-400/60 mt-0.5 shrink-0" />
                <p
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                  className="text-white/25 leading-relaxed"
                >
                  ToT explores multiple reasoning paths simultaneously, scoring each
                  branch and pruning low-value trajectories to find the optimal chain.
                </p>
              </div>
            </div>

            {/* action buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleRun}
                disabled={loading || !problem.trim()}
                className="flex-1 group flex items-center justify-center gap-2 bg-white text-black py-3 rounded-xl font-medium text-sm transition-all hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Branching...</span>
                  </>
                ) : (
                  <>
                    <Play size={13} />
                    <span>Run ToT</span>
                  </>
                )}
              </button>
              {result && (
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center w-11 h-11 border border-white/10 rounded-xl text-white/30 hover:text-white/60 hover:border-white/25 transition-all"
                >
                  <RotateCcw size={13} />
                </button>
              )}
            </div>

            {/* stats — shown after result */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-3 gap-2"
              >
                <StatChip label="Branches" value={`${branches}`} accent="#60A5FA" />
                <StatChip label="Depth" value={`${depth}`} accent="#60A5FA" />
                <StatChip label="Best Score" value="94%" accent="#4ADE80" />
              </motion.div>
            )}
          </motion.div>

          {/* ── RIGHT PANEL: RESULTS ── */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {!result && !loading && (
              <div className="h-full min-h-[480px] border border-white/6 rounded-xl bg-white/1 flex flex-col items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-2xl border border-blue-400/15 bg-blue-400/5 flex items-center justify-center">
                  <GitBranch size={22} className="text-blue-400/50" />
                </div>
                <div className="text-center">
                  <p
                    style={{ fontFamily: "'Syne', sans-serif" }}
                    className="text-white/20 font-semibold text-lg"
                  >
                    No tree generated yet
                  </p>
                  <p
                    style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                    className="text-white/15 tracking-widest uppercase mt-1"
                  >
                    Enter a problem and run ToT
                  </p>
                </div>
              </div>
            )}

            {loading && (
              <div className="h-full min-h-[480px] border border-white/6 rounded-xl bg-white/1 flex flex-col items-center justify-center gap-5">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl border border-blue-400/20 bg-blue-400/5 flex items-center justify-center">
                    <GitBranch size={20} className="text-blue-400/60" />
                  </div>
                  <div className="absolute -inset-1 rounded-2xl border border-blue-400/20 animate-ping opacity-30" />
                </div>
                <div className="text-center space-y-1.5">
                  {["Spawning branches...", "Evaluating trajectories...", "Pruning weak paths..."].map(
                    (msg, i) => (
                      <motion.p
                        key={msg}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.4 }}
                        style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                        className="text-white/25 tracking-widest uppercase"
                      >
                        {msg}
                      </motion.p>
                    )
                  )}
                </div>
              </div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* tabs */}
                <div className="flex items-center gap-1 border border-white/6 rounded-xl bg-white/2 p-1">
                  {(["tree", "path"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm transition-all ${
                        activeTab === tab
                          ? "bg-white/8 text-white"
                          : "text-white/30 hover:text-white/55"
                      }`}
                    >
                      {tab === "tree" ? (
                        <GitBranch size={13} />
                      ) : (
                        <Trophy size={13} />
                      )}
                      <span
                        style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                        className="tracking-[0.12em] uppercase"
                      >
                        {tab === "tree" ? "Thought Tree" : "Best Path"}
                      </span>
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === "tree" ? (
                    <motion.div
                      key="tree"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="border border-white/6 rounded-xl bg-white/1 overflow-hidden"
                    >
                      {/* tree header */}
                      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/6">
                        <div className="flex items-center gap-2">
                          <Sparkles size={12} className="text-blue-400/60" />
                          <span
                            style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                            className="text-white/25 tracking-[0.15em] uppercase"
                          >
                            Reasoning Tree
                          </span>
                        </div>
                        {/* legend */}
                        <div className="flex items-center gap-4">
                          {[
                            { color: "#4ADE80", label: "strong" },
                            { color: "#FACC15", label: "moderate" },
                            { color: "#F87171", label: "pruned" },
                          ].map((l) => (
                            <div key={l.label} className="flex items-center gap-1.5">
                              <div
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ background: l.color }}
                              />
                              <span
                                style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px" }}
                                className="text-white/20 tracking-widest uppercase"
                              >
                                {l.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-5">
                        <TreeNode node={result.tree} depth={0} />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="path"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                    >
                      <BestPathPanel
                        bestPath={result.bestPath}
                        finalAnswer={result.finalAnswer}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}