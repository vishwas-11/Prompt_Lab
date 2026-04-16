import TreeNode from "./TreeNode";

export default function TreeView({ tree }: { tree: any }) {
  if (!tree) {
    return <p>No tree data available</p>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">
        🌳 Tree of Thoughts
      </h2>

      <TreeNode node={tree} />
    </div>
  );
}