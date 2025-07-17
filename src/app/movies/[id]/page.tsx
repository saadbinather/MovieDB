"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

interface Movie {
  id: string;
  title: string;
  description: string;
  rating: number;
  releaseYear: number;
  posterUrl: string;
  genreId: string;
  directorId: string;
  url?: string;
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

interface ApiData {
  movies: Movie[];
  genres: Genre[];
  directors: Director[];
}

export default function MovieDetailPage() {
  const params = useParams();
  const movieId = params.id as string;

  const [data, setData] = useState<ApiData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data");
        if (response.ok) {
          const apiData = await response.json();
          setData(apiData);
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch movie data",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch movie data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            <div className="lg:w-1/3">
              <Skeleton className="aspect-[2/3] w-full rounded-lg" />
            </div>
            <div className="lg:w-2/3 space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!data) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Error Loading Movie</h1>
            <p className="text-muted-foreground mb-4">
              Failed to load movie data. Please try again.
            </p>
            <Button onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const movie = data.movies.find((m) => m.id === movieId);

  if (!movie) {
    notFound();
  }

  const genre = data.genres.find((g) => g.id === movie.genreId);
  const director = data.directors.find((d) => d.id === movie.directorId);

  const relatedMovies = data.movies
    .filter((m) => m.genreId === movie.genreId && m.id !== movie.id)
    .slice(0, 3);

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

          {genre && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">About {genre.name}</h3>
              <p className="text-sm text-muted-foreground">
                {genre.description}
              </p>
            </div>
          )}
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

      {/* Related Movies */}
      {relatedMovies.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">More {genre?.name} Movies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedMovies.map((relatedMovie) => (
              <Link key={relatedMovie.id} href={`/movies/${relatedMovie.id}`}>
                <Card className="hover:shadow-lg transition-shadow">
                  <div className="aspect-[2/3] relative overflow-hidden rounded-t-lg">
                    <Image
                      src={relatedMovie.posterUrl}
                      alt={`${relatedMovie.title} poster`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {relatedMovie.title}
                    </CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{relatedMovie.rating.toFixed(1)}/10</span>
                        <span>• {relatedMovie.releaseYear}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

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
