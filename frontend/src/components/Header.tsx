import { useState } from "react";
import Link from "next/link";
import { UserIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ThemeSwitch from "./ThemeSwitch";

const nav = [
  { name: "Home", href: "/" },
  { name: "Users", href: "/user-list" },
  { name: "Add User", href: "/user" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-neutral-900 dark:bg-black border-b border-neutral-800/80 sticky top-0 z-50 transition-colors duration-300">
      <nav className="flex items-center justify-between h-16 max-w-screen-2xl mx-auto px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2 min-w-[210px]">
          <UserIcon className="h-6 w-6 text-white" />
          <span className="text-lg md:text-xl font-bold text-white">User Management</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-2 md:space-x-4">
          {nav.map((item) => (
            <Link key={item.name} href={item.href}
              className="px-4 py-1.5 rounded-md font-medium text-sm text-white hover:bg-neutral-800 dark:hover:bg-neutral-700/80 hover:text-blue-300 transition"
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        {/* Hamburger for Mobile */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6 text-white" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-white" />
          )}
        </button>
        
        {/* Dark Mode, Avatar (always right) */}
        <div className="hidden md:flex items-center space-x-4 min-w-[92px] justify-end">
          <ThemeSwitch />
          <img src="https://i.ibb.co/9kBkZqRP/avatar1.jpg" className="rounded-full w-8 h-8 bg-neutral-700 ring-2 ring-neutral-900" alt="User avatar" />
        </div>
      </nav>
      
      {/* Mobile navigation (shows when menuOpen) */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-neutral-900 dark:bg-black px-4">
          {nav.map((item) => (
            <Link key={item.name} href={item.href}
              className="px-4 py-3 rounded-md font-medium text-sm text-white hover:bg-neutral-800 dark:hover:bg-neutral-700/80 hover:text-blue-300 transition"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex items-center space-x-4 pt-4">
            <ThemeSwitch />
            <img src="https://i.ibb.co/9kBkZqRP/avatar1.jpg" className="rounded-full w-8 h-8 bg-neutral-700 ring-2 ring-neutral-900" alt="User avatar" />
          </div>
        </div>
      )}
    </header>
  );
}
