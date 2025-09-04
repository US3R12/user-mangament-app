import Analytics from "@/components/analytics";
import {
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white">
      {/* Hero Section */}
      <main className="flex flex-col items-center pt-20 px-4 pb-10">
        <div className="mb-4">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm bg-neutral-800 text-neutral-200 shadow font-semibold">
            <span className="mr-2">📋</span> Professional User Management System
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-3 text-center">
          User Management<br />
          <span className="text-blue-400 tracking-tight drop-shadow">Dashboard</span>
        </h1>
        <p className="mt-2 text-lg max-w-2xl mx-auto text-center text-neutral-300">
          A comprehensive solution for managing user information, registration, and data organization.
          Built with modern technologies for optimal performance and user experience.
        </p>
        {/* Main actions */}
        <div className="flex flex-wrap gap-4 mt-12">
          <a
            href="/user"
            className="flex items-center px-6 py-3 rounded-lg text-base bg-white text-neutral-900 hover:bg-neutral-200 font-semibold shadow transition"
          >
            <UserPlusIcon className="w-5 h-5 mr-2 text-neutral-700" />
            Add New User <span className="ml-2">→</span>
          </a>
          <a
            href="/user-list"
            className="flex items-center px-6 py-3 rounded-lg text-base bg-neutral-800 text-white hover:bg-neutral-700 font-semibold shadow transition"
          >
            <UsersIcon className="w-5 h-5 mr-2 text-neutral-300" />
            View All Users <span className="ml-2">→</span>
          </a>
        </div>
      </main>
      {/* Analytics Dashboard (renders badges and all stats below hero) */}
      <Analytics />
    </div>
  );
}
