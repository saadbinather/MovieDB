"use client";

import { useParams } from "next/navigation";
import { data } from "../../../app/data/movies";
import Link from "next/link";

export default function DirectorDetails() {
  const params = useParams();
  const id = params.id as string;

  // Find the director by ID
  const director = data.directors.find((d) => d.id === id);

  // Find all movies by this director
  const directorMovies = director
    ? data.movies.filter((m) => m.directorId === director.id)
    : [];

  if (!director) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Director Not Found
        </h1>
        <p className="mb-4">
          Sorry, we couldn't find the director you're looking for.
        </p>
        <Link
          href="/directors"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Back to Directors
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <Link
            href="/directors"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Back to Directors
          </Link>
          <h1 className="text-4xl font-bold mb-4">{director.name}</h1>
          <p className="text-gray-700 text-lg mb-8">{director.biography}</p>
        </div>

        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Filmography</h2>
          <div className="grid grid-cols-1 gap-4">
            {directorMovies
              .sort((a, b) => b.releaseYear - a.releaseYear) // Sort by year, newest first
              .map((movie) => {
                const genre = data.genres.find((g) => g.id === movie.genreId);

                return (
                  <Link
                    key={movie.id}
                    href={`/movies/${movie.id}`}
                    className="block bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {movie.title}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          {movie.description}
                        </p>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                            {genre?.name}
                          </span>
                          <span>{movie.releaseYear}</span>
                        </div>
                      </div>
                      <div className="text-yellow-500 text-xl font-bold">
                        ⭐ {movie.rating}
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>

        {directorMovies.length > 0 && (
          <div className="border-t mt-8 pt-8">
            <h2 className="text-2xl font-bold mb-4">Career Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-blue-600">
                  ⭐{" "}
                  {(
                    directorMovies.reduce((acc, m) => acc + m.rating, 0) /
                    directorMovies.length
                  ).toFixed(1)}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Movies Directed</p>
                <p className="text-2xl font-bold text-green-600">
                  {directorMovies.length}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Years Active</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.min(...directorMovies.map((m) => m.releaseYear))} -{" "}
                  {Math.max(...directorMovies.map((m) => m.releaseYear))}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
