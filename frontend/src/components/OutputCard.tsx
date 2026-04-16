export default function OutputCard({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>

      <div className="bg-black text-green-400 p-3 rounded overflow-auto max-h-[250px]">
        {content}
      </div>
    </div>
  );
}