// "use client";

// import { usePathname, useRouter } from "next/navigation";
// import { ReactNode, useEffect, useSyncExternalStore } from "react";
// import { AUTH_TOKEN_EVENT } from "@/services/auth";

// const PUBLIC_ROUTES = new Set(["/login", "/register"]);
// const subscribeToStorage = (callback: () => void) => {
//   window.addEventListener("storage", callback);
//   window.addEventListener(AUTH_TOKEN_EVENT, callback);

//   return () => {
//     window.removeEventListener("storage", callback);
//     window.removeEventListener(AUTH_TOKEN_EVENT, callback);
//   };
// };

// export default function ProtectedRoute({ children }: { children: ReactNode }) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const isPublicRoute = PUBLIC_ROUTES.has(pathname);
//   const hasToken = useSyncExternalStore<boolean | null>(
//     isPublicRoute ? () => () => {} : subscribeToStorage,
//     () => (isPublicRoute ? true : Boolean(window.localStorage.getItem("token"))),
//     () => (isPublicRoute ? true : null)
//   );

//   useEffect(() => {
//     if (!isPublicRoute && !hasToken) {
//       router.replace("/login");
//     }
//   }, [hasToken, isPublicRoute, router]);

//   if (!isPublicRoute && hasToken === null) {
//     return null;
//   }

//   if (!isPublicRoute && !hasToken) {
//     return null;
//   }

//   return children;
// }








"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PUBLIC_ROUTES = ["/", "/login", "/register"];

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isPublic = PUBLIC_ROUTES.includes(pathname);

    // ❌ Not logged in & trying to access private route
    if (!token && !isPublic) {
      router.replace("/login");
      return;
    }

    // ❌ Logged in but trying to access login/register
    if (token && (pathname === "/login" || pathname === "/register")) {
      router.replace("/cot");
      return;
    }

    setLoading(false);
  }, [pathname, router]);

  //  Block UI until auth check completes
  if (loading) {
    return null;
  }

  return <>{children}</>;
}