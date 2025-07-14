"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-purple-700 dark:bg-gray-800 shadow-md z-50">
      <div className="max-w-6xl mx-auto flex items-center h-16 px-4">
        <div className="flex-1 flex justify-center items-center gap-4">
          <Link
            href="/"
            className={`text-2xl px-4 py-2 rounded-lg transition-colors hover:bg-gray-200 ${
              pathname === "/" ? "bg-blue-600" : ""
            }`}
          >
            🏠
          </Link>

          <Link
            href="/movies"
            className={`px-6 py-2 rounded-lg transition-colors ${
              pathname === "/movies"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            Movies
          </Link>
          <Link
            href="/genres"
            className={`px-6 py-2 rounded-lg transition-colors ${
              pathname === "/genres"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            Genres
          </Link>
          <Link
            href="/directors"
            className={`px-6 py-2 rounded-lg transition-colors ${
              pathname === "/directors"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            Directors
          </Link>
        </div>
      </div>
    </nav>
  );
}
