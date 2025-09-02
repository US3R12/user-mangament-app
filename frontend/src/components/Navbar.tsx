"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow px-6 py-3 flex items-center justify-between">
      <h1 className="text-lg font-bold">User Portal</h1>
      <div className="space-x-4">
        <Link href="/form" className="text-sm font-medium hover:underline">
          Add User
        </Link>
        <Link href="/users" className="text-sm font-medium hover:underline">
          User List
        </Link>
      </div>
    </nav>
  );
}
