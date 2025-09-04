"use client";

import "./styles/globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-black text-black dark:text-white min-h-screen transition-colors duration-300">
        <Providers>
        <Header />
        <main>{children}</main>
        <Footer />
        </Providers>
      </body>
    </html>
  );
}
