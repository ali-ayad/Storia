"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { TrendingUp, BookOpen, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetStoriesQuery } from "@/Api/storiesApi";
import Spinner from "@/components/spinner";

const TrendingStories: FC = () => {
  const { data: stories, error, isLoading } = useGetStoriesQuery();

  // 🧠 Handle loading & error states
 if (isLoading) {
  return (
    <div className="flex items-center justify-center h-40">
      <Spinner size="lg" />
    </div>
  );
}

  if (error || !stories?.length) {
    return <p className="text-center text-muted-foreground">No stories available.</p>;
  }

  // 🎲 Pick 3 random stories from the data
  const shuffled = [...stories].sort(() => Math.random() - 0.5);
  const randomStories = shuffled.slice(0, 3);

  return (
    <section className="mb-20">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-bold text-white">Trending This Week</h2>
        </div>

        {/* 🔗 Link to stories page */}
        <Button
          asChild
          variant="outline"
          className="hidden md:flex bg-transparent text-sm"
        >
          <Link href="/stories">View All</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {randomStories.map((story) => (
          <Link
            key={story.id}
            href={`/stories/${story.id}`}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm border border-border/30 hover:border-primary/50 transition-all duration-700 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/20 group-hover:bg-card/90">
              
              {/* 🖼 Story Image */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={story.image_url || "/placeholder.jpg"}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw,
                         (max-width: 1024px) 50vw,
                         33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              </div>

              {/* 📝 Story Info */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                  {story.title}
                </h3>
                <p className="text-white/60 text-sm mb-3">
                  by {story.authors?.name || "Unknown Author"}
                </p>

                <div className="flex items-center justify-between text-xs text-white/70">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {/* <span>{story.chapters || 0}</span> */}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {/* <span>{story.readers || "—"}</span> */}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-3 h-3 fill-current" />
                    {/* <span className="text-white/80">{story.rating || "4.8"}</span> */}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TrendingStories;
