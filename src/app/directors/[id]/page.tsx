"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";
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
import { Star } from "lucide-react";
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

export default function DirectorDetailPage() {
  const params = useParams();
  const directorId = params.id as string;
  
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
            description: "Failed to fetch director data",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch director data",
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
              <Skeleton className="aspect-square w-full rounded-lg" />
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
            <h1 className="text-2xl font-bold mb-4">Error Loading Director</h1>
            <p className="text-muted-foreground mb-4">
              Failed to load director data. Please try again.
            </p>
            <Button onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const director = data.directors.find((d) => d.id === directorId);
  
  if (!director) {
    notFound();
  }

  const directorMovies = data.movies.filter((m) => m.directorId === director.id);

  const avgRating = directorMovies.length > 0 ? (
    (
      directorMovies.reduce((acc, m) => acc + m.rating, 0) /
      directorMovies.length
    ).toFixed(1)
  ) : (
    "N/A"
  );

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
              <span className="text-lg font-semibold">{directorMovies.length} Movies</span>
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

      {/* Career Statistics */}
      {directorMovies.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Career Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Average Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold flex items-center">
                  <Star className="h-6 w-6 fill-yellow-400 text-yellow-400 mr-2" />
                  {avgRating}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Films Directed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {directorMovies.length}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Years Active</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {Math.min(...directorMovies.map((m) => m.releaseYear))} -{" "}
                  {Math.max(...directorMovies.map((m) => m.releaseYear))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Movies Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Complete Filmography</h2>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            {directorMovies
              .sort((a, b) => b.releaseYear - a.releaseYear)
              .map((movie) => {
                const genre = data.genres.find((g) => g.id === movie.genreId);

                return (
                  <Card
                    key={movie.id}
                    className="group hover:shadow-lg transition-all duration-300"
                  >
                    <Link href={`/movies/${movie.id}`}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="relative w-full md:w-32 h-48 rounded overflow-hidden">
                            <Image
                              src={movie.posterUrl}
                              alt={movie.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-600 transition-colors">
                              {movie.title}
                            </h3>
                            <p className="text-gray-600 mt-3 line-clamp-2">
                              {movie.description}
                            </p>
                            <div className="flex items-center gap-4 mt-4">
                              <Badge
                                variant="secondary"
                                className="bg-gray-100 text-gray-700"
                              >
                                {genre?.name}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {movie.releaseYear}
                              </span>
                              <span className="text-gray-700 font-medium">
                                ★ {movie.rating.toFixed(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                );
              })}
          </div>
        </ScrollArea>
      </div>

      {/* Navigation */}
      <div className="mt-12 flex justify-center">
        <Link href="/directors">
          <Button variant="outline">
            ← Back to Directors
          </Button>
        </Link>
      </div>
    </div>
  );

  return <ProtectedRoute>{content}</ProtectedRoute>;
}
