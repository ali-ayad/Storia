"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Link from "next/link"

export default function StoriesPage() {
  const stories = [
    {
      id: 1,
      title: "The Crimson Lantern",
      author: "Maya Chen",
      genre: "Fantasy",
      rating: 4.9,
      cover: "/fantasy-book-cover-with-red-lantern.png",
    },
    {
      id: 2,
      title: "Garden of Whispers",
      author: "Elena Rodriguez",
      genre: "Dark Fantasy",
      rating: 4.8,
      cover: "/dark-fantasy-book-cover-with-flowers.png",
    },
    {
      id: 3,
      title: "Lavender Dreams",
      author: "James Morrison",
      genre: "Epic Fantasy",
      rating: 4.7,
      cover: "/epic-fantasy-book-cover-with-lavender-field.png",
    },
    {
      id: 4,
      title: "Temple of Seasons",
      author: "Akira Tanaka",
      genre: "High Fantasy",
      rating: 4.9,
      cover: "/high-fantasy-book-cover-with-japanese-temple.png",
    },
  ]

  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header row */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold text-foreground">All Stories</h1>
          <Button variant="ghost" className="text-primary hover:text-primary/80">
            Sort by Rating
          </Button>
        </div>

        {/* Stories Grid - reuse your story card style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story) => (
            <Link
              key={story.id}
              href={`/stories/${story.id}`}
              className="group bg-card border border-border/40 rounded-xl overflow-hidden hover:border-primary/40 transition-colors"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={story.cover || "/placeholder.svg"}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-secondary/90 text-secondary-foreground">
                    {story.genre}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 rounded-full px-2 py-1">
                  <Star className="h-3 w-3 fill-secondary text-secondary" />
                  <span className="text-xs text-white font-medium">{story.rating}</span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-card-foreground mb-1 line-clamp-1">{story.title}</h3>
                <p className="text-sm text-muted-foreground">by {story.author}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
