"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Movie = {
  id: string;
  title: string;
  description: string;
  releaseYear: number;
  rating: number;
  directorId: string;
  genreId: string;
};

type SortOption =
  | "rating-desc"
  | "rating-asc"
  | "year-desc"
  | "year-asc"
  | "title-asc"
  | "title-desc";

export default function Movies({ initialMovies }: { initialMovies: Movie[] }) {
  const [movies, setMovies] = useState(initialMovies);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("rating-desc");
  const [decadeFilter, setDecadeFilter] = useState("all");

  // Get unique years and decades for filters
  const years = [
    ...new Set(initialMovies.map((movie) => movie.releaseYear)),
  ].sort((a, b) => b - a);
  const decades = [
    ...new Set(years.map((year) => Math.floor(year / 10) * 10)),
  ].sort((a, b) => b - a);

  useEffect(() => {
    let filtered = [...initialMovies];

    // Apply search filter (now includes partial matches)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchLower) ||
          movie.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply decade filter
    if (decadeFilter !== "all") {
      const decade = parseInt(decadeFilter);
      filtered = filtered.filter(
        (movie) => Math.floor(movie.releaseYear / 10) * 10 === decade
      );
    }

    // Apply specific year filter
    if (yearFilter !== "all") {
      filtered = filtered.filter(
        (movie) => movie.releaseYear === parseInt(yearFilter)
      );
    }

    // Apply rating filter
    if (ratingFilter !== "all") {
      const [min, max] = ratingFilter.split("-").map(Number);
      filtered = filtered.filter(
        (movie) => movie.rating >= min && movie.rating <= max
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating-desc":
          return b.rating - a.rating;
        case "rating-asc":
          return a.rating - b.rating;
        case "year-desc":
          return b.releaseYear - a.releaseYear;
        case "year-asc":
          return a.releaseYear - b.releaseYear;
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    setMovies(filtered);
  }, [
    searchTerm,
    yearFilter,
    ratingFilter,
    sortBy,
    decadeFilter,
    initialMovies,
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Movies Collection
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            This page is pre-generated and super-fast
          </p>
        </div>

        {/* Enhanced Filters */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow mb-8">
          {/* Search and Sort Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Search Input */}
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Search Movies
              </label>
              <input
                type="text"
                id="search"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Sort Options */}
            <div>
              <label
                htmlFor="sort"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Sort By
              </label>
              <select
                id="sort"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <option value="rating-desc">Highest Rated First</option>
                <option value="rating-asc">Lowest Rated First</option>
                <option value="year-desc">Newest First</option>
                <option value="year-asc">Oldest First</option>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
              </select>
            </div>
          </div>

          {/* Time Period Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Decade Filter */}
            <div>
              <label
                htmlFor="decade"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Filter by Decade
              </label>
              <select
                id="decade"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={decadeFilter}
                onChange={(e) => {
                  setDecadeFilter(e.target.value);
                  setYearFilter("all"); // Reset year filter when decade changes
                }}
              >
                <option value="all">All Decades</option>
                {decades.map((decade) => (
                  <option key={decade} value={decade}>
                    {decade}s
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Filter by Specific Year
              </label>
              <select
                id="year"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                disabled={decadeFilter !== "all"} // Disable if decade is selected
              >
                <option value="all">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Filter by Rating
              </label>
              <select
                id="rating"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
              >
                <option value="all">All Ratings</option>
                <option value="9-10">Exceptional (9+)</option>
                <option value="8-8.9">Excellent (8-8.9)</option>
                <option value="7-7.9">Very Good (7-7.9)</option>
                <option value="6-6.9">Good (6-6.9)</option>
                <option value="0-5.9">Mixed or Below (Below 6)</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-500">
            Showing {movies.length} of {initialMovies.length} movies
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <Link
                key={movie.id}
                href={`/movies/${movie.id}`}
                className="block"
                style={{ textDecoration: "none" }}
              >
                <div
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full"
                  tabIndex={0}
                  role="link"
                  aria-label={`View details for ${movie.title}`}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {movie.title}
                      </h2>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {movie.rating}/10
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">
                      Released: {movie.releaseYear}
                    </p>
                    <p className="text-gray-600">{movie.description}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-12">
              No movies found matching your filters
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
