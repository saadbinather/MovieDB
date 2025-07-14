"use client";

import { useParams } from "next/navigation";
import { data } from "../../data/movies";
import Link from "next/link";

export default function MovieDetails() {
  const params = useParams();
  const id = params.id as string;

  // Find the movie by ID
  const movie = data.movies.find((m) => m.id === id);

  // Find related director and genre
  const director = movie
    ? data.directors.find((d) => d.id === movie.directorId)
    : null;
  const genre = movie ? data.genres.find((g) => g.id === movie.genreId) : null;

  if (!movie) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Movie Not Found
        </h1>
        <p className="mb-4">
          Sorry, we couldn't find the movie you're looking for.
        </p>
        <Link
          href="/movies"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Back to Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <Link
            href="/movies"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Back to Movies
          </Link>
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {genre?.name}
            </span>
            <span>•</span>
            <span>{movie.releaseYear}</span>
            <span>•</span>
            <span className="text-yellow-500">⭐ {movie.rating}/10</span>
          </div>
          <p className="text-gray-700 text-lg mb-8">{movie.description}</p>
        </div>

        {director && (
          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">About the Director</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <Link
                href={`/directors/${director.id}`}
                className="text-xl font-semibold mb-2 text-blue-600 hover:underline"
              >
                {director.name}
              </Link>

              <p className="text-gray-700">{director.biography}</p>
            </div>
          </div>
        )}

        <div className="border-t mt-8 pt-8">
          <h2 className="text-2xl font-bold mb-4">More from {genre?.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.movies
              .filter((m) => m.genreId === movie.genreId && m.id !== movie.id)
              .slice(0, 2)
              .map((relatedMovie) => (
                <Link
                  key={relatedMovie.id}
                  href={`/movies/${relatedMovie.id}`}
                  className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-semibold mb-1">{relatedMovie.title}</h3>
                  <p className="text-sm text-gray-600">
                    {relatedMovie.releaseYear}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
