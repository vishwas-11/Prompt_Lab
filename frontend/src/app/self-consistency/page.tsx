"use client";

import { useState } from "react";
import api from "@/services/api";
import ModuleSelector from "@/components/ModuleSelector";
import PromptBox from "@/components/PromptBox";
import StatCard from "@/components/StatCard";
import AttemptsPanel from "@/components/AttemptsPanel";

export default function SelfConsistencyPage() {
  const [input, setInput] = useState("");
  const [numRuns, setNumRuns] = useState(5);

  const [result, setResult] = useState<any>(null);

  const handleRun = async () => {
    try {
      const res = await api.post("/generate/self-consistency", {
        input,
        num_runs: numRuns,
      });

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Top */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Self-Consistency Lab
        </h1>
        <ModuleSelector />
      </div>

      {/* Inputs */}
      <div className="space-y-3">
        <PromptBox
          value={input}
          onChange={setInput}
          placeholder="Enter your question..."
        />

        <div className="flex gap-3 items-center">
          <label>Runs:</label>

          <input
            type="number"
            value={numRuns}
            onChange={(e) =>
              setNumRuns(Number(e.target.value))
            }
            className="p-2 border rounded bg-gray-900 text-white w-24"
          />

          <button
            onClick={handleRun}
            className="bg-blue-600 px-4 py-2 rounded text-white"
          >
            Run
          </button>
        </div>
      </div>

      {/* Main Layout */}
      {result && (
        <div className="grid grid-cols-3 gap-4">
          {/* Center Stats */}
          <div className="col-span-2 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <StatCard
                title="Final Answer"
                value={result.final_answer}
              />

              <StatCard
                title="Confidence"
                value={result.confidence}
              />

              <StatCard
                title="Consensus"
                value={
                  result.consensus_reached
                    ? "Yes"
                    : "No"
                }
              />
            </div>
          </div>

          {/* Sidebar */}
          <AttemptsPanel
            attempts={result.all_attempts}
          />
        </div>
      )}
    </div>
  );
}