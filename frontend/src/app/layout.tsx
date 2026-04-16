import "./globals.css";
import AppShell from "@/components/AppShell";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
