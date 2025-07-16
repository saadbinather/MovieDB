"use client";

import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Star, Clock, Film } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface Movie {
  id: string;
  title: string;
  description: string;
  rating: number;
  releaseYear: number;
  posterUrl: string;
  genreId: string;
  directorId: string;
}

interface Genre {
  id: string;
  name: string;
  description: string;
}

interface Director {
  id: string;
  name: string;
  biography: string;
  url: string;
}

interface MovieData {
  movies: Movie[];
  genres: Genre[];
  directors: Director[];
}

export default async function MovieDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const filePath = path.join(process.cwd(), "src/app/data/movies.json");
  const data = await fs.readFile(filePath, "utf8");
  const movieData: MovieData = JSON.parse(data);

  const movie = movieData.movies.find((m) => m.id === params.id);
  if (!movie) {
    notFound();
  }

  const genre = movieData.genres.find((g) => g.id === movie.genreId);
  const director = movieData.directors.find((d) => d.id === movie.directorId);

  const relatedMovies = movieData.movies
    .filter((m) => m.genreId === movie.genreId && m.id !== movie.id)
    .slice(0, 2);

  const content = (
    <div className="container mx-auto px-4 py-8">
      {/* Movie Header */}
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="lg:w-1/3">
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={movie.posterUrl}
              alt={`${movie.title} poster`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="lg:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-lg font-semibold">
                {movie.rating.toFixed(1)}
              </span>
            </div>
            <Badge variant="secondary">{movie.releaseYear}</Badge>
            <Badge variant="outline">{genre?.name || "Unknown"}</Badge>
          </div>

          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            {movie.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Director</h3>
              <Link
                href={`/directors/${director?.id}`}
                className="text-blue-600 hover:underline"
              >
                {director?.name || "Unknown"}
              </Link>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Genre</h3>
              <Link href={`/genres`} className="text-blue-600 hover:underline">
                {genre?.name || "Unknown"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">About This Movie</h2>
          <p className="text-gray-600 leading-relaxed">{movie.description}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Movie Details</h2>
          <div className="space-y-3">
            <div>
              <span className="font-semibold">Release Year:</span>
              <span className="ml-2">{movie.releaseYear}</span>
            </div>
            <div>
              <span className="font-semibold">Rating:</span>
              <span className="ml-2">{movie.rating.toFixed(1)}/10</span>
            </div>
            <div>
              <span className="font-semibold">Director:</span>
              <span className="ml-2">{director?.name || "Unknown"}</span>
            </div>
            <div>
              <span className="font-semibold">Genre:</span>
              <span className="ml-2">{genre?.name || "Unknown"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-12 flex justify-center">
        <Link href="/movies">
          <Button variant="outline">← Back to Movies</Button>
        </Link>
      </div>
    </div>
  );

  return <ProtectedRoute>{content}</ProtectedRoute>;
}
