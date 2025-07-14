"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 bg-purple-700 dark:bg-gray-800 shadow-md p-4 mb-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-8">
        {/* Home Button - Left Corner */}
        <Link
          href="/"
          className={`flex items-center justify-center w-10 h-10 text-2xl hover:scale-125 transition-transform bg-gray-100 rounded-full shadow-sm hover:shadow-md ${
            pathname === "/" ? "ring-2 ring-white" : ""
          }`}
          title="Go to Home"
        >
          🏠
        </Link>

        {/* Centered Navigation Links */}
        <div className="flex gap-4">
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
