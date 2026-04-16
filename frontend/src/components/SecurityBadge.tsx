"use client";

export default function SecurityBadge({ status }: { status: string }) {
  const color =
    status === "safe"
      ? "bg-green-600"
      : "bg-red-600";

  return (
    <span className={`${color} px-3 py-1 rounded text-sm`}>
      {status}
    </span>
  );
}