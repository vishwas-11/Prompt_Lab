"use client";

import { useState } from "react";
import api from "@/services/api";

export default function VersionTest() {
  const [name, setName] = useState("");
  const [input, setInput] = useState("");
  const [version, setVersion] = useState<number | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    try {
      setLoading(true);

      const payload: any = {
        name,
        input,
      };

      // ✅ Only include version if user entered it
      if (version) {
        payload.version = version;
      }

      const res = await api.post("/version/test", payload);

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error testing prompt");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded space-y-4">
      <h2 className="text-lg font-semibold">🧪 Test Prompt</h2>

      {/* Prompt Name */}
      <input
        placeholder="Prompt Name (e.g. math_solver)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 bg-gray-800 rounded"
      />

      {/* Version Selector */}
      <input
        type="number"
        placeholder="Version (optional — leave empty for latest)"
        onChange={(e) =>
          setVersion(e.target.value ? Number(e.target.value) : null)
        }
        className="w-full p-2 bg-gray-800 rounded"
      />

      {/* Input */}
      <textarea
        placeholder="Enter input for the prompt..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 bg-gray-800 rounded"
      />

      {/* Button */}
      <button
        onClick={handleTest}
        disabled={loading}
        className="bg-purple-600 px-4 py-2 rounded text-white"
      >
        {loading ? "Running..." : "Run Test"}
      </button>

      {/* Output */}
      {result && (
        <div className="bg-black p-4 rounded space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-yellow-400 font-semibold">
              Version: {result.version}
            </p>
          </div>

          {/* Prompt Used */}
          {result.prompt && (
            <div>
              <p className="text-gray-400 text-sm mb-1">Prompt Used:</p>
              <pre className="text-xs text-blue-300 bg-gray-800 p-2 rounded whitespace-pre-wrap">
                {result.prompt}
              </pre>
            </div>
          )}

          {/* Output */}
          <div>
            <p className="text-gray-400 text-sm mb-1">Output:</p>
            <pre className="text-green-400 whitespace-pre-wrap">
              {result.output}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}