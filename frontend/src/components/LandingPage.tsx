"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h2 className="text-3xl font-bold mb-4">Welcome to User Management</h2>
      <p className="text-lg mb-8 max-w-xl">
        This is a simple app to manage users. You can add new users and view
        existing ones easily.
      </p>

      <div className="flex gap-6">
        <button
          onClick={() => router.push("/user")}
          className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-500"
        >
          Add User
        </button>
        <button
          onClick={() => router.push("/user-list")}
          className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-500"
        >
          View Users
        </button>
      </div>
    </div>
  );
}
