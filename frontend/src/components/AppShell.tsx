"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

const PUBLIC_ROUTES = new Set(["/login", "/register"]);

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPublicRoute = PUBLIC_ROUTES.has(pathname);

  if (isPublicRoute) {
    return <div className="p-6">{children}</div>;
  }

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="p-6">{children}</div>
    </ProtectedRoute>
  );
}
