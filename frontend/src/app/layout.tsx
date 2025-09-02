import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "User Portal",
  description: "Take Home Assignment frontend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900 antialiased">
        <Navbar />
        <main className="flex-1 container mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
