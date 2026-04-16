"use client";

import { useState } from "react";
import api from "@/services/api";
import PromptListInput from "@/components/PromptListInput";
import OptimizationResults from "@/components/OptimizationResults";
import BestPromptCard from "@/components/BestPromptCard";
import ModuleSelector from "@/components/ModuleSelector"; // ✅ ADD THIS

export default function OptimizePage() {
  const [input, setInput] = useState("");
  const [prompts, setPrompts] = useState<string[]>([""]);
  const [result, setResult] = useState<any>(null);

  const handleRun = async () => {
    const res = await api.post("/optimize/prompts", {
      input,
      prompts
    });

    setResult(res.data);
  };

  return (
    <div className="space-y-6">

      {/* ✅ MODULE SELECTOR (TOP RIGHT) */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Prompt Optimization Lab
        </h1>

        <ModuleSelector current="optimize" />
      </div>

      {/* INPUT */}
      <textarea
        placeholder="Enter input..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-3 bg-gray-900 border border-gray-700 rounded"
      />

      <PromptListInput prompts={prompts} setPrompts={setPrompts} />

      <button
        onClick={handleRun}
        className="bg-blue-600 px-4 py-2 rounded text-white"
      >
        Run Optimization
      </button>

      {/* OUTPUT */}
      {result && (
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <OptimizationResults results={result.results} />
          </div>

          <BestPromptCard best={result.best_prompt} />
        </div>
      )}
    </div>
  );
}