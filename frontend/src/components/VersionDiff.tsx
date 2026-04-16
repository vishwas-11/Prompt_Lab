"use client";

import { useState } from "react";
import api from "@/services/api";
import DiffViewer from "./DiffViewer";

export default function VersionDiff() {
    const [name, setName] = useState("");
    const [diff, setDiff] = useState<any>(null);

    const handleDiff = async () => {
        const res = await api.get(`/version/diff/${name}`);
        setDiff(res.data);
    };

    return (
        <div className="bg-gray-900 p-4 rounded space-y-3">
            <h2 className="text-lg font-semibold">🔍 Compare Versions</h2>

            <div className="flex gap-2">
                <input
                    placeholder="Prompt Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 p-2 bg-gray-800 rounded"
                />

                <button
                    onClick={handleDiff}
                    className="bg-red-600 px-3 py-2 rounded"
                >
                    Compare
                </button>
            </div>

            {diff && (
                <div>
                    <p className="text-yellow-400">
                        v{diff.old_version} → v{diff.new_version}
                    </p>

                    <DiffViewer diff={diff.diff} />
                </div>
            )}
        </div>
    );
}