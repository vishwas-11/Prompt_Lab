export default function ScoreBadge({ score }: { score: number }) {
  let color = "bg-gray-600";

  if (score > 100) color = "bg-green-600";
  else if (score > 60) color = "bg-yellow-600";
  else color = "bg-red-600";

  return (
    <span className={`px-2 py-1 rounded text-xs ${color}`}>
      {score}
    </span>
  );
}