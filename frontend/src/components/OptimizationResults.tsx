export default function OptimizationResults({ results }: { results: any[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">All Results</h2>

      {results.map((r, i) => (
        <div
          key={i}
          className="bg-gray-900 p-4 rounded border border-gray-700"
        >
          <div className="flex justify-between mb-3">
            <p className="text-blue-400 font-medium">{r.prompt}</p>
            <span className="bg-green-600 px-2 py-1 text-xs rounded">
              {r.score}
            </span>
          </div>

          {/* STEPS */}
          <div className="space-y-1 text-sm text-gray-300">
            {r.structured_output?.steps.map((step: string, idx: number) => (
              <p key={idx}>• {step}</p>
            ))}
          </div>

          {/* FINAL ANSWER */}
          {r.structured_output?.final_answer && (
            <div className="mt-3 text-green-400 font-semibold">
              ✅ Final Answer: {r.structured_output.final_answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}