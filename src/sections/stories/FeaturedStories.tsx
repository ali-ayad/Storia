"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetStoriesQuery } from "@/Api/storiesApi";
import Spinner from "@/components/spinner";

export default function FeaturedStories() {
  const { data: stories, error, isLoading } = useGetStoriesQuery();

  // 🧠 Handle loading or empty state
if (isLoading) {
  return (
    <div className="flex items-center justify-center h-40">
      <Spinner size="lg" />
    </div>
  );
}

  if (error || !stories?.length) {
    return (
      <p className="text-center text-muted-foreground">No stories available.</p>
    );
  }

  // 🧩 Take the last 4 stories (most recent)
  const latestStories = [...stories].slice(-4).reverse();

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-white">Featured Stories</h2>
        <Link href="/stories">
          <Button
            variant="outline"
            className="hidden md:flex bg-transparent text-sm cursor-pointer"
          >
            View All
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {latestStories.map((story) => (
          <Link
            key={story.id}
            href={`/stories/${story.id}`}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-xl bg-card/80 backdrop-blur-sm border border-border/30 hover:border-primary/50 transition-all duration-700 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20 group-hover:bg-card/90">
              {/* 🖼 Image */}
              <div className="aspect-[3/3.8] relative overflow-hidden">
                <Image
                  src={story.image_url || "/placeholder.jpg"}
                  alt={story.title}
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-110"
                  sizes="(max-width: 768px) 100vw,
                         (max-width: 1024px) 50vw,
                         25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent group-hover:from-black/95 transition-all duration-700" />
              </div>

              {/* 📝 Story Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>

                <div className="mb-3">
                  <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-primary transition-all duration-500 line-clamp-1">
                    {story.title}
                  </h3>
                  <p className="text-white/70 text-xs group-hover:text-white/90 transition-colors duration-500">
                    by {story.authors?.name || "Unknown Author"}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-white/60 mb-3 group-hover:text-white/80 transition-colors duration-500">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                  </div>
                </div>

                <Button
                  size="sm"
                  className="w-full bg-primary/20 hover:bg-primary border border-primary/40 hover:border-primary text-xs text-white backdrop-blur-md transition-all duration-500 font-medium hover:shadow-md hover:shadow-primary/30"
                >
                  READ NOW
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
