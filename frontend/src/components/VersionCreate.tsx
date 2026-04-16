"use client";

import { useState } from "react";
import api from "@/services/api";

export default function VersionCreate() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleCreate = async () => {
    const res = await api.post("/version/create", {
      name,
      content
    });

    setResult(res.data);
  };

  return (
    <div className="bg-gray-900 p-4 rounded space-y-3">
      <h2 className="text-lg font-semibold">➕ Create Prompt</h2>

      <input
        placeholder="Prompt Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 bg-gray-800 rounded"
      />

      <textarea
        placeholder="Prompt Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 bg-gray-800 rounded"
      />

      <button
        onClick={handleCreate}
        className="bg-green-600 px-3 py-2 rounded"
      >
        Create
      </button>

      {result && (
        <div className="bg-black p-2 rounded text-green-400">
          Version Created: {result.data.version}
        </div>
      )}
    </div>
  );
}