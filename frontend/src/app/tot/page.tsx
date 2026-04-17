"use client";

import { useState } from "react";
import api from "@/services/api";
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

interface TreeNodeData {
  thought: string;
  score: number;
  depth: number;
  children: TreeNodeData[];
  isBest?: boolean;
}

interface TotResult {
  tree: TreeNodeData;
  bestPath: string[];
  finalAnswer: string;
}

interface BackendTreeNode {
  thought: string;
  score: number;
  children?: BackendTreeNode[];
}

interface BackendTotResponse {
  input: string;
  tree: BackendTreeNode;
  best_path: string[];
  final_answer: string | null;
}

const MIN_BRANCHES = 2;
const MAX_BRANCHES = 4;
const MIN_DEPTH = 2;
const MAX_DEPTH = 4;

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
  return "low";
}

function getMaxScore(node: BackendTreeNode): number {
  const childScores = (node.children ?? []).map(getMaxScore);
  return Math.max(node.score, ...childScores);
}

function normalizeTree(
  node: BackendTreeNode,
  depth: number,
  maxScore: number,
  bestPathSet: Set<string>
): TreeNodeData {
  const normalizedScore =
    maxScore > 0 ? Math.max(0, Math.min(node.score / maxScore, 1)) : 0;

  return {
    thought: node.thought,
    score: normalizedScore,
    depth,
    isBest: bestPathSet.has(node.thought),
    children: (node.children ?? []).map((child) =>
      normalizeTree(child, depth + 1, maxScore, bestPathSet)
    ),
  };
}

function normalizeTotResult(data: BackendTotResponse): TotResult {
  const bestPath = (data.best_path ?? []).filter(
    (step) => step && step !== "Start solving the problem"
  );
  const bestPathSet = new Set(bestPath);

  return {
    tree: normalizeTree(data.tree, 0, getMaxScore(data.tree), bestPathSet),
    bestPath,
    finalAnswer: data.final_answer ?? "No final answer returned by the backend.",
  };
}

function countTreeNodes(node: TreeNodeData): number {
  return 1 + node.children.reduce((sum, child) => sum + countTreeNodes(child), 0);
}

function findBestScore(node: TreeNodeData): number {
  return Math.max(node.score, ...node.children.map(findBestScore));
}

function TreeNode({
  node,
  depth = 0,
}: {
  node: TreeNodeData;
  depth?: number;
}) {
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = node.children.length > 0;
  const color = scoreColor(node.score);

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: depth * 0.05 }}
      className="relative"
    >
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
        className={`group relative mb-1 flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-all ${
          node.isBest
            ? "border-green-500/30 bg-green-500/5"
            : "border-white/6 bg-white/2 hover:border-white/15 hover:bg-white/4"
        }`}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        <div
          className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
          style={{ background: color, opacity: 0.8 }}
        />

        <div className="min-w-0 flex-1 pl-2">
          <div className="mb-1.5 flex items-center gap-2">
            <span
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
              className="shrink-0 tracking-widest text-white/20"
            >
              D{node.depth}
            </span>

            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px",
                color,
                border: `1px solid ${color}40`,
              }}
              className="shrink-0 rounded px-1.5 py-0.5 text-white/60"
            >
              {(node.score * 100).toFixed(0)}
            </span>

            <span
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color }}
              className="shrink-0 uppercase tracking-widest opacity-60"
            >
              {scoreLabel(node.score)}
            </span>

            {node.isBest && (
              <span
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
                className="ml-auto shrink-0 uppercase tracking-widest text-green-400"
              >
                best
              </span>
            )}

            {hasChildren && (
              <div className="ml-auto shrink-0 text-white/20 transition-colors group-hover:text-white/50">
                {expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              </div>
            )}
          </div>

          <p className="text-sm font-light leading-relaxed text-white/55">{node.thought}</p>
        </div>
      </div>

      <AnimatePresence>
        {expanded && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-6 border-l border-white/6 pl-5"
          >
            {node.children.map((child, index) => (
              <TreeNode key={`${child.thought}-${index}`} node={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

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
      className="overflow-hidden rounded-xl border border-green-500/20 bg-green-500/3"
    >
      <div className="flex items-center gap-3 border-b border-green-500/15 px-5 py-3.5">
        <Trophy size={13} className="text-green-400" />
        <span
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
          className="uppercase tracking-[0.15em] text-green-400/80"
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

      <div className="space-y-2 p-5">
        {bestPath.length > 0 ? (
          bestPath.map((step, index) => (
            <div key={`${step}-${index}`} className="flex items-start gap-3">
              <div className="flex shrink-0 flex-col items-center pt-0.5">
                <div
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
                  className="flex h-5 w-5 items-center justify-center rounded-full border border-green-500/40 text-green-400/70"
                >
                  {index + 1}
                </div>
                {index < bestPath.length - 1 && (
                  <div className="mt-1 min-h-[16px] w-px flex-1 bg-green-500/15" />
                )}
              </div>
              <p className="pb-2 text-sm font-light leading-relaxed text-white/55">
                {step}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm font-light leading-relaxed text-white/45">
            The backend returned a tree, but no best path steps were provided.
          </p>
        )}
      </div>

      <div className="border-t border-green-500/15 px-5 py-4">
        <div
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
          className="mb-2 uppercase tracking-[0.15em] text-white/25"
        >
          Final Answer
        </div>
        <p className="text-sm leading-relaxed text-white/85">{finalAnswer}</p>
      </div>
    </motion.div>
  );
}

function StatChip({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="rounded-lg border border-white/6 bg-white/2 px-4 py-3">
      <div
        style={{ fontFamily: "'Syne', sans-serif", color: accent }}
        className="text-lg font-bold"
      >
        {value}
      </div>
      <div
        style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
        className="mt-0.5 uppercase tracking-widest text-white/25"
      >
        {label}
      </div>
    </div>
  );
}

export default function TreeOfThoughtsPage() {
  const [problem, setProblem] = useState("");
  const [branches, setBranches] = useState(3);
  const [depth, setDepth] = useState(3);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TotResult | null>(null);
  const [activeTab, setActiveTab] = useState<"tree" | "path">("tree");
  const [error, setError] = useState("");

  const handleRun = async () => {
    if (!problem.trim() || loading) return;

    try {
      setLoading(true);
      setError("");
      setResult(null);
      setActiveTab("tree");

      const res = await api.post<BackendTotResponse>("/generate/tree-of-thoughts", {
        input: problem,
        num_branches: branches,
        max_depth: depth,
      });

      setResult(normalizeTotResult(res.data));
    } catch (err) {
      console.error("ToT generation error:", err);
      setError("Unable to fetch Tree of Thoughts results from the backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setProblem("");
    setResult(null);
    setError("");
    setActiveTab("tree");
  };

  const totalNodes = result ? countTreeNodes(result.tree) : 0;
  const bestScore = result ? `${Math.round(findBestScore(result.tree) * 100)}%` : "0%";

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-screen bg-[#0A0A0A] text-white"
    >
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "128px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-400/5">
              <GitBranch size={15} className="text-blue-400" />
            </div>
            <span
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
              className="tracking-[0.2em] text-white/25 uppercase"
            >
              AGENT FRAMEWORK - TREE OF THOUGHTS
            </span>
          </div>

          <h1
            style={{ fontFamily: "'Syne', sans-serif", lineHeight: 1.05 }}
            className="mb-3 text-5xl font-extrabold tracking-tight text-white"
          >
            Tree of Thoughts
            <span className="text-white/15">.</span>
          </h1>
          <p className="max-w-xl text-base font-light leading-relaxed text-white/35">
            Branch reasoning into multiple parallel trajectories, score each path,
            and converge on the optimal solution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="space-y-4 lg:col-span-2"
          >
            <div className="overflow-hidden rounded-xl border border-white/8 bg-white/2">
              <div className="flex items-center gap-2 border-b border-white/6 px-4 py-3">
                <Terminal size={12} className="text-white/25" />
                <span
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                  className="uppercase tracking-[0.15em] text-white/25"
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
                  className="w-full resize-none bg-transparent text-sm font-light leading-relaxed text-white/70 outline-none placeholder:text-white/15"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/8 bg-white/2">
              <div className="flex items-center gap-2 border-b border-white/6 px-4 py-3">
                <span
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                  className="uppercase tracking-[0.15em] text-white/25"
                >
                  Parameters
                </span>
              </div>
              <div className="space-y-5 p-4">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                      className="uppercase tracking-widest text-white/30"
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
                    min={MIN_BRANCHES}
                    max={MAX_BRANCHES}
                    value={branches}
                    onChange={(e) => setBranches(Number(e.target.value))}
                    className="h-1 w-full cursor-pointer rounded-full bg-white/10 accent-blue-400 outline-none"
                  />
                  <div className="mt-1 flex justify-between">
                    {[2, 3, 4].map((value) => (
                      <span
                        key={value}
                        style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px" }}
                        className="text-white/15"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                      className="uppercase tracking-widest text-white/30"
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
                    min={MIN_DEPTH}
                    max={MAX_DEPTH}
                    value={depth}
                    onChange={(e) => setDepth(Number(e.target.value))}
                    className="h-1 w-full cursor-pointer rounded-full bg-white/10 accent-blue-400 outline-none"
                  />
                  <div className="mt-1 flex justify-between">
                    {[2, 3, 4].map((value) => (
                      <span
                        key={value}
                        style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px" }}
                        className="text-white/15"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-blue-400/10 bg-blue-400/3 p-4">
              <div className="flex items-start gap-3">
                <Info size={13} className="mt-0.5 shrink-0 text-blue-400/60" />
                <p
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                  className="leading-relaxed text-white/25"
                >
                  ToT explores multiple reasoning paths simultaneously, scoring each
                  branch and selecting the strongest path returned by the backend.
                  Parameters are capped to keep tree growth and runtime predictable.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleRun}
                disabled={loading || !problem.trim()}
                className="flex-1 group flex items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-medium text-black transition-all hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-30"
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

              {(result || error) && (
                <button
                  onClick={handleReset}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-white/30 transition-all hover:border-white/25 hover:text-white/60"
                >
                  <RotateCcw size={13} />
                </button>
              )}
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
                <p
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                  className="uppercase tracking-[0.08em] text-red-300/80"
                >
                  {error}
                </p>
              </div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-3 gap-2"
              >
                <StatChip label="Branches" value={`${branches}`} accent="#60A5FA" />
                <StatChip label="Nodes" value={`${totalNodes}`} accent="#60A5FA" />
                <StatChip label="Best Score" value={bestScore} accent="#4ADE80" />
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {!result && !loading && (
              <div className="flex min-h-[480px] h-full flex-col items-center justify-center gap-4 rounded-xl border border-white/6 bg-white/1">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/15 bg-blue-400/5">
                  <GitBranch size={22} className="text-blue-400/50" />
                </div>
                <div className="text-center">
                  <p
                    style={{ fontFamily: "'Syne', sans-serif" }}
                    className="text-lg font-semibold text-white/20"
                  >
                    No tree generated yet
                  </p>
                  <p
                    style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                    className="mt-1 uppercase tracking-widest text-white/15"
                  >
                    Enter a problem and run ToT
                  </p>
                </div>
              </div>
            )}

            {loading && (
              <div className="flex min-h-[480px] h-full flex-col items-center justify-center gap-5 rounded-xl border border-white/6 bg-white/1">
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/5">
                    <GitBranch size={20} className="text-blue-400/60" />
                  </div>
                  <div className="absolute -inset-1 rounded-2xl border border-blue-400/20 opacity-30 animate-ping" />
                </div>
                <div className="space-y-1.5 text-center">
                  {[
                    "Spawning branches...",
                    "Evaluating trajectories...",
                    "Scoring backend results...",
                  ].map((message, index) => (
                    <motion.p
                      key={message}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.4 }}
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                      className="uppercase tracking-widest text-white/25"
                    >
                      {message}
                    </motion.p>
                  ))}
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
                <div className="flex items-center gap-1 rounded-xl border border-white/6 bg-white/2 p-1">
                  {(["tree", "path"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm transition-all ${
                        activeTab === tab
                          ? "bg-white/8 text-white"
                          : "text-white/30 hover:text-white/55"
                      }`}
                    >
                      {tab === "tree" ? <GitBranch size={13} /> : <Trophy size={13} />}
                      <span
                        style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                        className="uppercase tracking-[0.12em]"
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
                      className="overflow-hidden rounded-xl border border-white/6 bg-white/1"
                    >
                      <div className="flex items-center justify-between border-b border-white/6 px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <Sparkles size={12} className="text-blue-400/60" />
                          <span
                            style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
                            className="uppercase tracking-[0.15em] text-white/25"
                          >
                            Reasoning Tree
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          {[
                            { color: "#4ADE80", label: "strong" },
                            { color: "#FACC15", label: "moderate" },
                            { color: "#F87171", label: "low" },
                          ].map((item) => (
                            <div key={item.label} className="flex items-center gap-1.5">
                              <div
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ background: item.color }}
                              />
                              <span
                                style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px" }}
                                className="uppercase tracking-widest text-white/20"
                              >
                                {item.label}
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
