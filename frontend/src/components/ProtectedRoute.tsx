// "use client";

// import axios from "axios";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// import { AUTH_TOKEN_EVENT, getSession } from "@/services/auth";

// const PUBLIC_ROUTES = ["/", "/login", "/register"];

// export default function ProtectedRoute({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const isPublic = PUBLIC_ROUTES.includes(pathname);
//     let isMounted = true;

//     const syncAuthState = async () => {
//       try {
//         const session = await getSession();

//         if (!isMounted) {
//           return;
//         }

//         setIsAuthenticated(Boolean(session.authenticated));

//         if (isPublic && (pathname === "/login" || pathname === "/register")) {
//           router.replace("/cot");
//           return;
//         }
//       } catch (err: unknown) {
//         if (!isMounted) {
//           return;
//         }

//         if (axios.isAxiosError(err) && err.response?.status !== 401) {
//           console.error("Unable to verify session", err);
//         }

//         setIsAuthenticated(false);

//         if (!isPublic) {
//           router.replace("/login");
//           return;
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     const handleAuthChange = () => {
//       setLoading(true);
//       void syncAuthState();
//     };

//     void syncAuthState();
//     window.addEventListener(AUTH_TOKEN_EVENT, handleAuthChange);

//     return () => {
//       isMounted = false;
//       window.removeEventListener(AUTH_TOKEN_EVENT, handleAuthChange);
//     };
//   }, [pathname, router]);

//   if (loading) {
//     return null;
//   }

//   if (!PUBLIC_ROUTES.includes(pathname) && !isAuthenticated) {
//     return null;
//   }

//   return <>{children}</>;
// }









"use client";

import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AUTH_TOKEN_EVENT, getSession } from "@/services/auth";

const PUBLIC_ROUTES = ["/", "/login", "/register"];

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isPublic = PUBLIC_ROUTES.includes(pathname);
    let isMounted = true;

    const syncAuthState = async () => {
      try {
        const session = await getSession();

        if (!isMounted) return;

        setIsAuthenticated(Boolean(session.authenticated));

        // Redirect logged-in users away from login/register
        if (isPublic && (pathname === "/login" || pathname === "/register")) {
          router.replace("/cot");
          return;
        }
      } catch (err: unknown) {
        if (!isMounted) return;

        if (axios.isAxiosError(err)) {
          const status = err.response?.status;

          if (status === 401) {
            // Token is definitively invalid — log out
            setIsAuthenticated(false);
            if (!isPublic) {
              router.replace("/login");
            }
          } else {
            // Network error, timeout, 502 (Render cold start) — do NOT clear
            // token. Treat as unauthenticated for routing only.
            console.error("Session check failed (non-auth error):", err.message);
            setIsAuthenticated(false);
            if (!isPublic) {
              router.replace("/login");
            }
          }
        } else {
          setIsAuthenticated(false);
          if (!isPublic) {
            router.replace("/login");
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const handleAuthChange = () => {
      setLoading(true);
      void syncAuthState();
    };

    void syncAuthState();
    window.addEventListener(AUTH_TOKEN_EVENT, handleAuthChange);

    return () => {
      isMounted = false;
      window.removeEventListener(AUTH_TOKEN_EVENT, handleAuthChange);
    };
  }, [pathname, router]);

  if (loading) {
    return null;
  }

  if (!PUBLIC_ROUTES.includes(pathname) && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}