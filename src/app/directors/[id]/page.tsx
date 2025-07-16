"use client";

import { useParams } from "next/navigation";
import data from "../../data/movies.json";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Star } from "lucide-react";

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
      <div className="container mx-auto p-8 text-center">
        <Card className="max-w-2xl mx-auto border border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">
              Director Not Found
            </CardTitle>
            <CardDescription className="text-gray-600">
              Sorry, we couldn't find the director you're looking for.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild className="mt-4">
              <Link href="/directors">Return to Directors Gallery</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const avgRating =
    directorMovies.length > 0
      ? (
          directorMovies.reduce((acc, m) => acc + m.rating, 0) /
          directorMovies.length
        ).toFixed(1)
      : "N/A";

  const content = (
    <div className="container mx-auto px-4 py-8">
      {/* Director Header */}
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="lg:w-1/3">
          <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
            <Image
              src={director.url}
              alt={`${director.name} photo`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="lg:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{director.name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <span className="text-lg font-semibold">
                {directorMovies.length} Movies
              </span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-lg font-semibold">{avgRating}</span>
            </div>
          </div>

          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            {director.biography}
          </p>
        </div>
      </div>

      {/* Movies Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Movies Directed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {directorMovies.map((movie) => (
            <Link key={movie.id} href={`/movies/${movie.id}`}>
              <Card className="hover:shadow-lg transition-shadow">
                <div className="aspect-[2/3] relative overflow-hidden rounded-t-lg">
                  <Image
                    src={movie.posterUrl}
                    alt={`${movie.title} poster`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{movie.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{movie.rating.toFixed(1)}/10</span>
                      <span>• {movie.releaseYear}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-12 flex justify-center">
        <Link href="/directors">
          <Button variant="outline">← Back to Directors</Button>
        </Link>
      </div>
    </div>
  );

  return <ProtectedRoute>{content}</ProtectedRoute>;
}
