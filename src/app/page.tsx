"use client";

import { data } from "./data/movies";
import Link from "next/link";

export default function Home() {
  const topMovies = [...data.movies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto mt-20">
      <h1 className="text-4xl font-bold mb-8 text-center text-black">
        Top Rated Movies
      </h1>
      <div className="space-y-6">
        {topMovies.map((movie, index) => {
          const director = data.directors.find(
            (d) => d.id === movie.directorId
          );
          const genre = data.genres.find((g) => g.id === movie.genreId);

          return (
            <Link key={movie.id} href={`/movies/${movie.id}`} className="block">
              <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform hover:shadow-xl cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">
                      #{index + 1}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                    <p className="text-gray-600 mb-4">{movie.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Director</p>
                        <p className="font-semibold">{director?.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Genre</p>
                        <p className="font-semibold">{genre?.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Year</p>
                        <p className="font-semibold">{movie.releaseYear}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Rating</p>
                        <p className="font-semibold text-blue-600">
                          ⭐ {movie.rating}/10
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
