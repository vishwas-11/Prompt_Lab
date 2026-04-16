"use client";

import { useState } from "react";
import api from "@/services/api";

import ModuleSelector from "@/components/ModuleSelector";
import PromptBox from "@/components/PromptBox";
import ReactTimeline from "@/components/ReactTimeline";
import StatCard from "@/components/StatCard";

export default function ReactPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleRun = async () => {
    try {
      const res = await api.post("/generate/react", { input });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Backend error");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">ReAct Agent Lab</h1>
        <ModuleSelector />
      </div>

      {/* Input */}
      <PromptBox
        value={input}
        onChange={setInput}
        placeholder="Ask something..."
      />

      <button
        onClick={handleRun}
        className="bg-blue-600 px-4 py-2 rounded text-white"
      >
        Run Agent
      </button>

      {/* Output */}
      {result && (
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <ReactTimeline steps={result.steps} />
          </div>

          <StatCard title="Final Answer" value={result.final_answer} />
        </div>
      )}
    </div>
  );
}