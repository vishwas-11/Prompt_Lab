export default function ReasoningPanel({ steps }: { steps: string[] }) {
  return (
    <div className="bg-gray-900 p-4 rounded-lg h-full">
      <h2 className="text-lg font-semibold mb-3">🧠 CoT Thought Process</h2>

      <div className="space-y-2">
        {steps.map((step, i) => (
          <div
            key={i}
            className="bg-gray-800 p-2 rounded text-sm border-l-4 border-blue-500"
          >
            <strong>Step {i + 1}:</strong> {step}
          </div>
        ))}
      </div>
    </div>
  );
}