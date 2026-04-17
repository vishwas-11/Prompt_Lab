type Props = {
  node: any;
};

export default function TreeNode({ node }: Props) {
  if (!node) return null;

  return (
    <div className="ml-4 border-l border-gray-600 pl-4">
      <div className="bg-gray-900 p-2 rounded mb-2">
        <p className="text-green-400 text-sm">
          {node.thought || "No thought"}
        </p>

        <p className="text-xs text-gray-400">
          Score: {node.score ?? 0}
        </p>
      </div>

      {node.children?.length > 0 && (
        <div className="ml-4">
          {node.children.map((child: any, i: number) => (
            <TreeNode key={i} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}