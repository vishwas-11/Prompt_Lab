"use client";

import { useState } from "react";
import api from "@/services/api";
import SecurityPanel from "@/components/SecurityPanel";
import ModuleSelector from "@/components/ModuleSelector";

export default function SecurityPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);

    try {
      const res = await api.post("/security/check", {
        input,
      });

      setResult(res.data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 text-white">

      {/* ✅ MODULE SELECTOR (FIX) */}
      <div className="flex justify-end mb-4">
        <ModuleSelector current="security" />
      </div>

      <h1 className="text-2xl font-bold mb-4">
        🛡️ Prompt Injection Lab
      </h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Try malicious prompt..."
        className="w-full p-3 bg-gray-800 rounded mb-4"
      />

      <button
        onClick={handleRun}
        className="bg-red-600 px-4 py-2 rounded"
      >
        {loading ? "Checking..." : "Check Security"}
      </button>

      {result && <SecurityPanel data={result} />}
    </div>
  );
}