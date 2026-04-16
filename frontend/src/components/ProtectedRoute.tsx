"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useSyncExternalStore } from "react";
import { AUTH_TOKEN_EVENT } from "@/services/auth";

const PUBLIC_ROUTES = new Set(["/login", "/register"]);
const subscribeToStorage = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener(AUTH_TOKEN_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(AUTH_TOKEN_EVENT, callback);
  };
};

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isPublicRoute = PUBLIC_ROUTES.has(pathname);
  const hasToken = useSyncExternalStore<boolean | null>(
    isPublicRoute ? () => () => {} : subscribeToStorage,
    () => (isPublicRoute ? true : Boolean(window.localStorage.getItem("token"))),
    () => (isPublicRoute ? true : null)
  );

  useEffect(() => {
    if (!isPublicRoute && !hasToken) {
      router.replace("/login");
    }
  }, [hasToken, isPublicRoute, router]);

  if (!isPublicRoute && hasToken === null) {
    return null;
  }

  if (!isPublicRoute && !hasToken) {
    return null;
  }

  return children;
}
