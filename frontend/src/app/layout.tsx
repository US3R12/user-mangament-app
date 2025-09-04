"use client";

import "./styles/globals.css";
import Header from "@/components/Header";
import { useState, useEffect } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (
      typeof window !== "undefined" &&
      (localStorage.theme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches))
    ) {
      setDark(true);
    } else {
      setDark(false);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark, mounted]);

  if (!mounted) {
    // Prevent hydration mismatch by rendering null till mounted
    return null;
  }

  return (
    <html lang="en" className={dark ? "dark" : ""} suppressHydrationWarning>
      <body className="bg-white dark:bg-black text-black dark:text-white min-h-screen transition-colors duration-300">
        <Header dark={dark} setDark={setDark} />
        <main>{children}</main>
      </body>
    </html>
  );
}
