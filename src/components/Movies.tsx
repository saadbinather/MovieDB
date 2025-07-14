"use client";

import { useState } from "react";
import { data } from "../app/data/movies";
import Link from "next/link";

export default function Movies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [yearRange, setYearRange] = useState({
    min: 1900,
    max: new Date().getFullYear(),
  });

  // Get unique genres for filter dropdown
  const uniqueGenres = Array.from(
    new Set(data.genres.map((genre) => genre.name))
  );

  // Filter movies based on search and filters
  const filteredMovies = data.movies.filter((movie) => {
    const genre = data.genres.find((g) => g.id === movie.genreId);
    const matchesSearch =
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = !selectedGenre || genre?.name === selectedGenre;
    const matchesRating = movie.rating >= minRating;
    const matchesYear =
      movie.releaseYear >= yearRange.min && movie.releaseYear <= yearRange.max;

    return matchesSearch && matchesGenre && matchesRating && matchesYear;
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Search and Filter Controls */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full p-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Genre Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Genre
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">All Genres</option>
              {uniqueGenres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Rating: {minRating}
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={minRating}
              onChange={(e) => setMinRating(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Year Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year Range: {yearRange.min} - {yearRange.max}
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min year"
                className="w-1/2 p-2 border rounded-md"
                value={yearRange.min}
                onChange={(e) =>
                  setYearRange({
                    ...yearRange,
                    min: parseInt(e.target.value) || 1900,
                  })
                }
              />
              <input
                type="number"
                placeholder="Max year"
                className="w-1/2 p-2 border rounded-md"
                value={yearRange.max}
                onChange={(e) =>
                  setYearRange({
                    ...yearRange,
                    max: parseInt(e.target.value) || new Date().getFullYear(),
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-gray-600">
        Showing {filteredMovies.length} of {data.movies.length} movies
      </div>

      {/* Movies Grid */}
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMovies.map((movie) => {
            const director = data.directors.find(
              (d) => d.id === movie.directorId
            );
            const genre = data.genres.find((g) => g.id === movie.genreId);

            return (
              <Link
                key={movie.id}
                href={`/movies/${movie.id}`}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
                  <div className="flex items-center gap-2 text-sm mb-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {genre?.name}
                    </span>
                    <span className="text-yellow-500">⭐ {movie.rating}</span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {movie.description}
                  </p>
                  <div className="text-sm text-gray-500">
                    <p>Director: {director?.name}</p>
                    <p>Year: {movie.releaseYear}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No movies found matching your filters.
        </div>
      )}
    </div>
  );
}
