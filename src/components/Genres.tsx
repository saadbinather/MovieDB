"use client";

import { data } from "../app/data/movies";

export default function Genres() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.genres.map((genre) => {
        const moviesInGenre = data.movies.filter((m) => m.genreId === genre.id);

        return (
          <div key={genre.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">{genre.name}</h2>
            <div className="space-y-2">
              <p className="text-gray-600">Movies in this genre:</p>
              <ul className="list-disc list-inside text-gray-500">
                {moviesInGenre.map((movie) => (
                  <li key={movie.id}>
                    {movie.title} ({movie.releaseYear})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
