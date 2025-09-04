"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SunIcon, MoonIcon, UserIcon } from "@heroicons/react/24/outline";

type HeaderProps = {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
};

const nav = [
  { name: "Home", href: "/" },
  { name: "Users", href: "/user-list" },
  { name: "Add User", href: "/user" },
];

export default function Header({ dark, setDark }: HeaderProps) {
  const pathname = usePathname();

  const toggleDark = () => {
    setDark(!dark);
  };

  return (
    <header className="w-full bg-neutral-900 dark:bg-black border-b border-neutral-800/80 sticky top-0 z-50 transition-colors duration-300">
      <nav className="flex items-center justify-between h-16 max-w-screen-2xl mx-auto px-4">
        {/* Left: Logo and App name */}
        <div className="flex items-center space-x-2 min-w-[210px]">
          <UserIcon className="h-6 w-6 text-white" />
          <span className="text-lg md:text-xl font-bold text-white">User Management</span>
        </div>
        {/* Center: Navigation */}
        <div className="flex space-x-2 md:space-x-4">
          {nav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`px-4 py-1.5 rounded-md font-medium text-sm ${
                pathname === item.href
                  ? "bg-white text-neutral-900 dark:bg-neutral-200 dark:text-neutral-900 shadow"
                  : "text-white hover:bg-neutral-800 dark:hover:bg-neutral-700/80 hover:text-blue-300 transition"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        {/* Right: Dark mode toggle and avatar */}
        <div className="flex items-center space-x-4 min-w-[92px] justify-end">
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-700 text-yellow-400 transition"
            type="button"
          >
            {dark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
          <img
            src="https://i.ibb.co/9kBkZqRP/avatar1.jpg"
            className="rounded-full w-8 h-8 bg-neutral-700 ring-2 ring-neutral-900"
            alt="User avatar"
          />
        </div>
      </nav>
    </header>
  );
}
