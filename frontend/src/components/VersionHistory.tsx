"use client";

import { useState } from "react";
import api from "@/services/api";

export default function VersionHistory() {
  const [name, setName] = useState("");
  const [versions, setVersions] = useState<any[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const fetchHistory = async () => {
    const res = await api.get(`/version/history/${name}`);
    setVersions(res.data.versions);
  };

  const rollback = async (version: number) => {
    await api.post(`/version/rollback?name=${name}&version=${version}`);
    fetchHistory();
  };

  return (
    <div className="bg-gray-900 p-4 rounded space-y-3">
      <h2>📜 Version History</h2>

      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Prompt Name"
          className="p-2 bg-gray-800"
        />
        <button onClick={fetchHistory} className="bg-blue-600 px-3">
          Fetch
        </button>
      </div>

      {versions.map((v) => (
        <div
          key={v.version}
          className={`p-2 rounded ${
            selected === v.version ? "bg-blue-800" : "bg-black"
          }`}
        >
          <div className="flex justify-between">
            <p>Version {v.version}</p>

            <div className="flex gap-2">
              <button
                onClick={() => setSelected(v.version)}
                className="text-yellow-400"
              >
                Select
              </button>

              <button
                onClick={() => rollback(v.version)}
                className="text-red-400"
              >
                Rollback
              </button>
            </div>
          </div>

          <p className="text-gray-400 text-sm">{v.content}</p>
        </div>
      ))}
    </div>
  );
}