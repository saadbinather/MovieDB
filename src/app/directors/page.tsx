"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Director = {
  id: string;
  name: string;
  biography: string;
};

type Movie = {
  id: string;
  title: string;
  directorId: string;
  rating: number;
};

type MovieData = {
  movies: Movie[];
  directors: Director[];
};

export default function Directors() {
  const [data, setData] = useState<MovieData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data.json");
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load directors data");
      }
    };

    fetchData();
  }, []);

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!data) return <p className="text-center">Loading...</p>;

  return (
    <div className="grid grid-cols-1 gap-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Directors</h1>
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
                  {directorMovies.length > 0
                    ? (
                        directorMovies.reduce((acc, m) => acc + m.rating, 0) /
                        directorMovies.length
                      ).toFixed(1)
                    : "N/A"}{" "}
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
