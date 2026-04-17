"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  //  Hide navbar on public pages
  const hideNavbar =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/register";

  return (
    <html lang="en">
      <body className="bg-black text-white">
        <ProtectedRoute>
          {!hideNavbar && <Navbar />}

          <div className="p-6">{children}</div>
        </ProtectedRoute>
      </body>
    </html>
  );
}