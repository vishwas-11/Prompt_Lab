export default function AttemptsPanel({
  attempts,
}: {
  attempts: any[];
}) {
  return (
    <div className="bg-gray-900 p-4 rounded-lg h-full overflow-auto">
      <h2 className="text-lg font-semibold mb-3">🔁 All Attempts</h2>

      <div className="space-y-3">
        {attempts.map((a, i) => (
          <div
            key={i}
            className="bg-gray-800 p-3 rounded border-l-4 border-purple-500"
          >
            <p className="text-sm text-gray-400">
              Attempt {i + 1}
            </p>

            <p className="text-green-400 text-sm mt-1">
              Answer: {a.answer}
            </p>

            <details className="mt-2 text-xs">
              <summary className="cursor-pointer text-blue-400">
                View Reasoning
              </summary>

              <pre className="mt-1 whitespace-pre-wrap">
                {a.full_output}
              </pre>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}