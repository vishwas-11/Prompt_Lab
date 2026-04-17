"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">

      {/* HERO SECTION */}
      <div className="text-center space-y-6 max-w-2xl">

        <h1 className="text-4xl md:text-5xl font-bold">
          🚀 Prompt Engineering Lab
        </h1>

        <p className="text-gray-400 text-lg">
          Experiment with advanced prompting techniques like Chain-of-Thought,
          ReAct, Tree-of-Thoughts, Prompt Optimization, and more — all in one place.
        </p>

        {/* CTA BUTTON */}
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-semibold transition"
        >
          Get Started
        </button>
      </div>

      {/* FOOTER */}
      <div className="absolute bottom-6 text-sm text-gray-500">
        Built with using FastAPI + Next.js
      </div>
    </div>
  );
}