"use client";

import { useState } from "react";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (loading) {
      return;
    }

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await login(email, password);
      router.replace("/cot");
      router.refresh();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError((err.response?.data as { detail?: string } | undefined)?.detail || "Login failed");
        return;
      }

      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-gray-900 p-6 rounded w-full max-w-md space-y-4">
        <h1 className="text-xl font-semibold">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 bg-gray-800 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 bg-gray-800 rounded"
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 disabled:opacity-70"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        <p className="text-sm text-gray-400">
          Need an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-400 cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
