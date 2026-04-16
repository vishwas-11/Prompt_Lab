export default function StatCard({
  title,
  value,
}: {
  title: string;
  value: any;
}) {
  return (
    <div className="bg-gray-900 p-4 rounded-lg text-center shadow">
      <h3 className="text-sm text-gray-400">{title}</h3>
      <p className="text-xl font-bold text-green-400 mt-2">{value}</p>
    </div>
  );
}