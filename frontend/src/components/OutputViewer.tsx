export default function OutputViewer({ data }: { data: any }) {
  return (
    <pre className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}