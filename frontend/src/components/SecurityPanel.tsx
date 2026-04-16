"use client";

import SecurityBadge from "./SecurityBadge";

export default function SecurityPanel({ data }: any) {
  const { input, security, execution } = data;

  return (
    <div className="grid grid-cols-3 gap-4 mt-6">

      {/* LEFT - SECURITY */}
      <div className="bg-gray-900 p-4 rounded space-y-3">
        <h2 className="text-lg font-semibold">🔐 Security Analysis</h2>

        <SecurityBadge status={security.status} />

        <p className="text-sm text-gray-400">
          <strong>Detected Pattern:</strong>
        </p>
        <div className="bg-black p-2 rounded text-red-400 text-sm">
          {security.detected_pattern || "None"}
        </div>
      </div>

      {/* CENTER - INPUT */}
      <div className="bg-gray-900 p-4 rounded space-y-3">
        <h2 className="text-lg font-semibold">📥 Input</h2>

        <div className="bg-black p-3 rounded text-sm">
          {input}
        </div>

        {execution.sanitized_input && (
          <>
            <h3 className="text-yellow-400 text-sm">
              Sanitized Input
            </h3>
            <div className="bg-black p-3 rounded text-sm text-yellow-300">
              {execution.sanitized_input}
            </div>
          </>
        )}
      </div>

      {/* RIGHT - OUTPUT */}
      <div className="bg-gray-900 p-4 rounded space-y-3">
        <h2 className="text-lg font-semibold">🤖 LLM Response</h2>

        <div className="bg-black p-3 rounded text-green-400 text-sm whitespace-pre-wrap max-h-[400px] overflow-y-auto">
          {execution.llm_response}
        </div>
      </div>
    </div>
  );
}