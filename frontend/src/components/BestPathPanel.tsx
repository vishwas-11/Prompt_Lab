export default function BestPathPanel({
  bestPath,
  finalAnswer,
}: {
  bestPath: string[];
  finalAnswer: string;
}) {
  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-3">
        🏆 Best Path
      </h2>

      {bestPath.map((step, i) => (
        <div
          key={i}
          className="bg-black text-green-400 p-2 rounded mb-2"
        >
          {step}
        </div>
      ))}

      <div className="mt-4 text-blue-400 font-bold">
        Final Answer: {finalAnswer}
      </div>
    </div>
  );
}