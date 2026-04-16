"use client";

import { useState } from "react";
import api from "@/services/api";

import ModuleSelector from "@/components/ModuleSelector";
import PromptBox from "@/components/PromptBox";
import TreeView from "@/components/TreeView";
import BestPathPanel from "@/components/BestPathPanel";

export default function ToTPage() {
  const [input, setInput] = useState("");
  const [branches, setBranches] = useState(3);
  const [depth, setDepth] = useState(2);

  const [result, setResult] = useState<any>(null);

  const handleRun = async () => {
    try {
      const res = await api.post("/generate/tree-of-thoughts", {
        input,
        num_branches: branches,
        max_depth: depth,
      });

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
        <h1 className="text-2xl font-bold">
          Tree-of-Thoughts Lab
        </h1>
        <ModuleSelector />
      </div>

      {/* Inputs */}
      <PromptBox
        value={input}
        onChange={setInput}
        placeholder="Enter problem..."
      />

      <div className="flex gap-3">
        <input
          type="number"
          value={branches}
          onChange={(e) =>
            setBranches(Number(e.target.value))
          }
          className="p-2 bg-gray-900 border rounded text-white"
          placeholder="Branches"
        />

        <input
          type="number"
          value={depth}
          onChange={(e) =>
            setDepth(Number(e.target.value))
          }
          className="p-2 bg-gray-900 border rounded text-white"
          placeholder="Depth"
        />

        <button
          onClick={handleRun}
          className="bg-blue-600 px-4 py-2 rounded text-white"
        >
          Run ToT
        </button>
      </div>

      {/* Output */}
      {result && (
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <TreeView
              tree={result.tree}
            />
          </div>

          <BestPathPanel
            bestPath={result.best_path}
            finalAnswer={result.final_answer}
          />
        </div>
      )}
    </div>
  );
}