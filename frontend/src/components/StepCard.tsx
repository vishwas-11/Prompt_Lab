type Props = {
  type: string;
  content?: string;
  tool?: string;
  input?: string;
};

export default function StepCard({ type, content, tool, input }: Props) {
  const colors: any = {
    thought: "border-blue-500",
    action: "border-yellow-500",
    observation: "border-green-500",
  };

  return (
    <div className={`bg-gray-900 p-3 rounded border-l-4 ${colors[type]}`}>
      <p className="text-xs uppercase text-gray-400">{type}</p>

      {type === "action" ? (
        <p className="text-yellow-400 text-sm">
          {tool}({input})
        </p>
      ) : (
        <pre className="text-sm text-green-400 whitespace-pre-wrap">
          {content}
        </pre>
      )}
    </div>
  );
}