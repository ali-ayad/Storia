"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function StoriesPage() {
  const stories = [
    {
      id: 1,
      title: "The Crimson Lantern",
      author: "Maya Chen",
      genre: "Fantasy",
      rating: 4.9,
      cover:
        "https://img.freepik.com/free-photo/ancient-castle-mountains_1150-10841.jpg?w=1380&t=st=1692813200~exp=1692813800~hmac=7b8a1c8f4f8f3c5b6d8f9b8b8d9c8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8",
    },
    {
      id: 2,
      title: "Garden of Whispers",
      author: "Elena Rodriguez",
      genre: "Dark Fantasy",
      rating: 4.8,
      cover:
        "https://img.freepik.com/free-photo/medieval-knight-armor_1150-10842.jpg?w=1380&t=st=1692813200~exp=1692813800~hmac=7b8a1c8f4f8f3c5b6d8f9b8b8d9c8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8",
    },
    {
      id: 3,
      title: "Lavender Dreams",
      author: "James Morrison",
      genre: "Epic Fantasy",
      rating: 4.7,
      cover:
        "https://img.freepik.com/free-photo/fantasy-forest-path_1150-10843.jpg?w=1380&t=st=1692813200~exp=1692813800~hmac=7b8a1c8f4f8f3c5b6d8f9b8b8d9c8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8",
    },
    {
      id: 4,
      title: "Temple of Seasons",
      author: "Akira Tanaka",
      genre: "High Fantasy",
      rating: 4.9,
      cover:
        "https://img.freepik.com/free-photo/dragon-flying-over-castle_1150-10844.jpg?w=1380&t=st=1692813200~exp=1692813800~hmac=7b8a1c8f4f8f3c5b6d8f9b8b8d9c8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8",
    },
    {
      id: 5,
      title: "Moonlit Shadows",
      author: "Nina Harper",
      genre: "Fantasy",
      rating: 4.6,
      cover:
        "https://img.freepik.com/free-photo/fantasy-castle-night_1150-10845.jpg?w=1380&t=st=1692813200~exp=1692813800~hmac=abcd1234",
    },
    {
      id: 6,
      title: "Thorns of Fate",
      author: "Liam Stone",
      genre: "Dark Fantasy",
      rating: 4.8,
      cover:
        "https://img.freepik.com/free-photo/dark-knight-silhouette_1150-10846.jpg?w=1380&t=st=1692813200~exp=1692813800~hmac=abcd1234",
    },
    {
      id: 7,
      title: "Skyward Realms",
      author: "Ella Monroe",
      genre: "Epic Fantasy",
      rating: 4.7,
      cover:
        "https://img.freepik.com/free-photo/fantasy-sky-islands_1150-10847.jpg?w=1380&t=st=1692813200~exp=1692813800~hmac=abcd1234",
    },
    {
      id: 8,
      title: "Crown of Ember",
      author: "Rafael Torres",
      genre: "High Fantasy",
      rating: 4.9,
      cover:
        "https://img.freepik.com/free-photo/mystical-kingdom_1150-10848.jpg?w=1380&t=st=1692813200~exp=1692813800~hmac=abcd1234",
    },
    {
      id: 9,
      title: "Whispering Woods",
      author: "Sofia Nguyen",
      genre: "Fantasy",
      rating: 4.5,
      cover:
        "https://img.freepik.com/free-photo/enchanted-forest_1150-10849.jpg?w=1380&t=st=1692813200~exp=1692813800~hmac=abcd1234",
    },
    {
      id: 10,
      title: "Veil of Darkness",
      author: "Kai Morgan",
      genre: "Dark Fantasy",
      rating: 4.6,
      cover:
        "https://img.freepik.com/free-photo/mysterious-castle-night_1150-10850.jpg?w=1380&t=st=1692813200~exp=1692813800~hmac=abcd1234",
    },
    {
      id: 11,
      title: "Dragon's Path",
      author: "Aria Black",
      genre: "Epic Fantasy",
      rating: 4.8,
      cover:
        "https://img.freepik.com/free-photo/dragon-fantasy-art_1150-10851.jpg?w=1380&t=st=1692813200~exp=1692813800~hmac=abcd1234",
    },
    {
      id: 12,
      title: "Kingdom of Frost",
      author: "Leo Ramirez",
      genre: "High Fantasy",
      rating: 4.7,
      cover:
        "https://img.freepik.com/free-photo/frozen-castle_1150-10852.jpg?w=1380&t=st=1692813200~exp=1692813800~hmac=abcd1234",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold text-foreground">All Stories</h1>
          <Button
            variant="ghost"
            className="text-primary hover:text-primary/80"
          >
            Sort by Rating
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story) => (
            <Link
              key={story.id}
              href={`/stories/${story.id}`}
              className="group bg-card border border-border/40 rounded-xl overflow-hidden hover:border-primary/40 transition-colors"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src={story.cover}
                  alt={story.title}
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-110"
                  sizes="(max-width: 768px) 100vw,
                                       (max-width: 1024px) 50vw,
                                       25vw"
                />
                <div className="absolute top-3 left-3">
                  <Badge
                    variant="secondary"
                    className="bg-secondary/90 text-secondary-foreground"
                  >
                    {story.genre}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 rounded-full px-2 py-1">
                  <Star className="h-3 w-3 fill-secondary text-secondary" />
                  <span className="text-xs text-white font-medium">
                    {story.rating}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-card-foreground mb-1 line-clamp-1">
                  {story.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  by {story.author}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
