export default function BestPromptCard({ best }: { best: any }) {
  if (!best) return null;

  return (
    <div className="bg-blue-900 p-4 rounded">
      <h2 className="font-bold mb-3">🏆 Best Prompt</h2>

      <p className="text-blue-300 mb-2">{best.prompt}</p>

      <div className="space-y-1 text-sm text-gray-200">
        {best.structured_output?.steps.map((s: string, i: number) => (
          <p key={i}>• {s}</p>
        ))}
      </div>

      <div className="mt-3 text-green-300 font-semibold">
        Final Answer: {best.structured_output?.final_answer}
      </div>

      <p className="mt-2 text-sm">Score: {best.score}</p>
    </div>
  );
}