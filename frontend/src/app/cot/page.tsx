"use client";

import { useState } from "react";
import api from "@/services/api";
import PromptBox from "@/components/PromptBox";
import ModuleSelector from "@/components/ModuleSelector";
import OutputCard from "@/components/OutputCard";
import ReasoningPanel from "@/components/ReasoningPanel";

export default function CoTPage() {
  const [input, setInput] = useState("");
  const [normal, setNormal] = useState("");
  const [cot, setCot] = useState("");
  const [steps, setSteps] = useState<string[]>([]);

  const extractSteps = (text: string) => {
    // simple step extraction
    return text
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .slice(0, 6);
  };

  const handleRun = async () => {
    try {
      const res = await api.post("/generate/cot", { input });

      setNormal(res.data.normal_output);
      setCot(res.data.cot_output);

      const extracted = extractSteps(res.data.cot_output);
      setSteps(extracted);
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Top Controls */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Prompt Engineering Lab</h1>
        <ModuleSelector />
      </div>

      {/* Input */}
      <div>
        <PromptBox
          value={input}
          onChange={setInput}
          placeholder="Enter your prompt..."
        />

        <button
          onClick={handleRun}
          className="mt-3 bg-blue-600 px-4 py-2 rounded text-white"
        >
          Run Prompt
        </button>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-3 gap-4">
        {/* Outputs */}
        <div className="col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <OutputCard title="Normal Output" content={normal} />
            <OutputCard title="CoT Output" content={cot} />
          </div>
        </div>

        {/* Reasoning Panel */}
        <ReasoningPanel steps={steps} />
      </div>
    </div>
  );
}