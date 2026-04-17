// "use client";

// import { useState } from "react";
// import api from "@/services/api";

// export default function RolesPage() {
//   const [system, setSystem] = useState("");
//   const [developer, setDeveloper] = useState("");
//   const [user, setUser] = useState("");

//   const [enableSystem, setEnableSystem] = useState(true);
//   const [enableDeveloper, setEnableDeveloper] = useState(true);
//   const [enableUser, setEnableUser] = useState(true);

//   const [result, setResult] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const handleRun = async () => {
//     try {
//       setLoading(true);

//       const res = await api.post("/generate/roles", {
//         system_prompt: system,
//         developer_prompt: developer,
//         user_prompt: user,
//         enable_system: enableSystem,
//         enable_developer: enableDeveloper,
//         enable_user: enableUser
//       });

//       setResult(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold">🎭 Roles Playground</h1>

//       {/* SYSTEM */}
//       <div className="bg-gray-900 p-4 rounded space-y-2">
//         <div className="flex justify-between">
//           <h2 className="font-semibold text-blue-400">SYSTEM</h2>
//           <input
//             type="checkbox"
//             checked={enableSystem}
//             onChange={() => setEnableSystem(!enableSystem)}
//           />
//         </div>

//         <textarea
//           value={system}
//           onChange={(e) => setSystem(e.target.value)}
//           className="w-full bg-gray-800 p-2 rounded"
//           placeholder="System prompt..."
//         />
//       </div>

//       {/* DEVELOPER */}
//       <div className="bg-gray-900 p-4 rounded space-y-2">
//         <div className="flex justify-between">
//           <h2 className="font-semibold text-purple-400">DEVELOPER</h2>
//           <input
//             type="checkbox"
//             checked={enableDeveloper}
//             onChange={() => setEnableDeveloper(!enableDeveloper)}
//           />
//         </div>

//         <textarea
//           value={developer}
//           onChange={(e) => setDeveloper(e.target.value)}
//           className="w-full bg-gray-800 p-2 rounded"
//           placeholder="Developer instructions..."
//         />
//       </div>

//       {/* USER */}
//       <div className="bg-gray-900 p-4 rounded space-y-2">
//         <div className="flex justify-between">
//           <h2 className="font-semibold text-green-400">USER</h2>
//           <input
//             type="checkbox"
//             checked={enableUser}
//             onChange={() => setEnableUser(!enableUser)}
//           />
//         </div>

//         <textarea
//           value={user}
//           onChange={(e) => setUser(e.target.value)}
//           className="w-full bg-gray-800 p-2 rounded"
//           placeholder="User prompt..."
//         />
//       </div>

//       {/* RUN BUTTON */}
//       <button
//         onClick={handleRun}
//         className="bg-blue-600 px-4 py-2 rounded"
//       >
//         {loading ? "Running..." : "Run Roles"}
//       </button>

//       {/* OUTPUT */}
//       {result && (
//         <div className="grid grid-cols-2 gap-4">

//           {/* FINAL PROMPT */}
//           <div className="bg-gray-900 p-4 rounded">
//             <h3 className="text-yellow-400 font-semibold mb-2">
//               🧠 Final Prompt
//             </h3>
//             <pre className="text-sm text-gray-300 whitespace-pre-wrap">
//               {result.final_prompt}
//             </pre>
//           </div>

//           {/* OUTPUT */}
//           <div className="bg-gray-900 p-4 rounded">
//             <h3 className="text-green-400 font-semibold mb-2">
//               🤖 Model Output
//             </h3>
//             <pre className="text-sm text-green-300 whitespace-pre-wrap">
//               {result.output}
//             </pre>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }









"use client";

import { useState } from "react";
import api from "@/services/api";
import ModuleSelector from "@/components/ModuleSelector";

export default function RolesPage() {
    const [system, setSystem] = useState("");
    const [developer, setDeveloper] = useState("");
    const [user, setUser] = useState("");

    const [enableSystem, setEnableSystem] = useState(true);
    const [enableDeveloper, setEnableDeveloper] = useState(true);
    const [enableUser, setEnableUser] = useState(true);

    const [result, setResult] = useState<any>(null);

    const handleRun = async () => {
        const res = await api.post("/generate/roles", {
            system_prompt: enableSystem ? system : "",
            developer_prompt: enableDeveloper ? developer : "",
            user_prompt: enableUser ? user : "",
        });

        setResult(res.data);
    };

    return (
        <div className="space-y-6">

            {/* ✅ ADD THIS (same as other modules) */}
            <div className="flex justify-end">
                <ModuleSelector />
            </div>

            <h1 className="text-2xl font-bold">🎭 Roles Prompting</h1>

            {/* SYSTEM */}
            <div className="space-y-2">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={enableSystem}
                        onChange={() => setEnableSystem(!enableSystem)}
                    />
                    System Prompt
                </label>
                <textarea
                    disabled={!enableSystem}
                    value={system}
                    onChange={(e) => setSystem(e.target.value)}
                    className="w-full p-2 bg-gray-800 rounded"
                    placeholder="System role..."
                />
            </div>

            {/* DEVELOPER */}
            <div className="space-y-2">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={enableDeveloper}
                        onChange={() => setEnableDeveloper(!enableDeveloper)}
                    />
                    Developer Prompt
                </label>
                <textarea
                    disabled={!enableDeveloper}
                    value={developer}
                    onChange={(e) => setDeveloper(e.target.value)}
                    className="w-full p-2 bg-gray-800 rounded"
                    placeholder="Developer instructions..."
                />
            </div>

            {/* USER */}
            <div className="space-y-2">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={enableUser}
                        onChange={() => setEnableUser(!enableUser)}
                    />
                    User Prompt
                </label>
                <textarea
                    disabled={!enableUser}
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="w-full p-2 bg-gray-800 rounded"
                    placeholder="User input..."
                />
            </div>

            <button
                onClick={handleRun}
                className="bg-blue-600 px-4 py-2 rounded"
            >
                Generate
            </button>

            {/* OUTPUT */}
            {result && (
                <div className="bg-black p-4 rounded space-y-3">
                    <div>
                        <h2 className="text-yellow-400">Final Prompt</h2>
                        <pre className="whitespace-pre-wrap text-gray-300">
                            {result.final_prompt}
                        </pre>
                    </div>

                    <div>
                        <h2 className="text-green-400">LLM Output</h2>
                        <pre className="whitespace-pre-wrap">
                            {result.output}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
}