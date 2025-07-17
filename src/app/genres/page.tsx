"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Film } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Genre {
  id: string;
  name: string;
}

export default function GenresPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch genres from API
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("/api/genres");
        if (response.ok) {
          const genresData = await response.json();
          setGenres(genresData);
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch genres data",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
        toast({
          title: "Error",
          description: "Failed to fetch genres data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenres();
  }, [toast]);

  const renderGenreCard = (genre: Genre) => {
    return (
      <Card
        key={genre.id}
        className="group relative overflow-hidden bg-gradient-to-br from-background to-muted/20 border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 rounded-xl cursor-pointer transform hover:scale-105"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardHeader className="relative z-10 text-center py-8">
          <div className="flex flex-col items-center space-y-3">
            <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
              <Film className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              {genre.name}
            </CardTitle>
          </div>
        </CardHeader>
      </Card>
    );
  };

  const content = (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col items-center mb-12">
        <div className="flex items-center space-x-3 mb-4">
          <Film className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Movie Genres</h1>
        </div>
        <p className="text-muted-foreground text-center text-lg max-w-2xl">
          Discover and explore different movie genres
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <Card key={i} className="overflow-hidden rounded-xl">
              <CardHeader className="text-center py-8">
                <div className="flex flex-col items-center space-y-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : genres.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {genres.map(renderGenreCard)}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 rounded-full bg-muted">
              <Film className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              No Genres Found
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              We couldn't find any genres at the moment. Please try again later.
            </p>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="px-6"
            >
              Reload Page
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  return <ProtectedRoute>{content}</ProtectedRoute>;
}
