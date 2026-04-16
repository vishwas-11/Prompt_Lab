"use client";

export default function DiffViewer({ diff }: any) {
  if (!Array.isArray(diff)) {
    return (
      <div className="text-red-400 bg-black p-4 rounded">
        Invalid diff format
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded overflow-hidden text-sm">
      {/* Header */}
      <div className="grid grid-cols-2 bg-gray-800 text-gray-400 px-3 py-2">
        <div>Old Version</div>
        <div>New Version</div>
      </div>

      {/* Diff Rows */}
      {diff.map((line: any, i: number) => (
        <div
          key={i}
          className="grid grid-cols-2 border-t border-gray-800"
        >
          {/* LEFT (OLD) */}
          <div
            className={`px-3 py-1 whitespace-pre-wrap ${
              line.type === "removed"
                ? "bg-red-900/40 text-red-300"
                : "bg-transparent text-gray-300"
            }`}
          >
            {line.old}
          </div>

          {/* RIGHT (NEW) */}
          <div
            className={`px-3 py-1 whitespace-pre-wrap ${
              line.type === "added"
                ? "bg-green-900/40 text-green-300"
                : "bg-transparent text-gray-300"
            }`}
          >
            {line.new}
          </div>
        </div>
      ))}
    </div>
  );
}