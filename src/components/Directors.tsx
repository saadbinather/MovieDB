"use client";

import { data } from "../app/data/movies";
import Link from "next/link";

export default function Directors() {
  return (
    <div className="grid grid-cols-1 gap-6">
      {data.directors.map((director) => {
        const directorMovies = data.movies.filter(
          (m) => m.directorId === director.id
        );

        return (
          <Link
            key={director.id}
            href={`/directors/${director.id}`}
            className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all transform hover:-translate-y-1"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2">{director.name}</h2>
              <p className="text-gray-600 mb-4">{director.biography}</p>
              <div className="flex items-center gap-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {directorMovies.length} Movies
                </span>
                <span className="text-yellow-500">
                  ⭐{" "}
                  {(
                    directorMovies.reduce((acc, m) => acc + m.rating, 0) /
                    directorMovies.length
                  ).toFixed(1)}{" "}
                  avg
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
