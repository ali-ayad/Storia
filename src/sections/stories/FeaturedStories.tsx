"use client";

import Link from "next/link";
import Image from "next/image"; // ✅ import Next.js Image
import { Star, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetStoriesQuery } from "@/Api/storiesApi";


const featuredStories = [
  {
    id: 1,
    title: "The Forgotten Kingdom",
    author: "E. Valen",
    genre: "Fantasy",
    rating: "4.9",
    chapters: 42,
    readers: "120K",
    image:
      "https://img.freepik.com/free-photo/ancient-castle-mountains_1150-10841.jpg?w=1380&t=st=1692813200~exp=1692813800~hmac=7b8a1c8f4f8f3c5b6d8f9b8b8d9c8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8",
  },
  {
    id: 2,
    title: "Blades of the Fallen",
    author: "K. Aramis",
    genre: "Dark Fantasy",
    rating: "4.8",
    chapters: 36,
    readers: "98K",
    image:
      "https://img.freepik.com/free-photo/medieval-knight-armor_1150-10842.jpg?w=1380&t=st=1692813200~exp=1692813800~hmac=7b8a1c8f4f8f3c5b6d8f9b8b8d9c8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8",
  },
  {
    id: 3,
    title: "The Shadow Realms",
    author: "L. Maren",
    genre: "Epic Fantasy",
    rating: "4.7",
    chapters: 55,
    readers: "150K",
    image:
      "https://img.freepik.com/free-photo/fantasy-forest-path_1150-10843.jpg?w=1380&t=st=1692813200~exp=1692813800~hmac=7b8a1c8f4f8f3c5b6d8f9b8b8d9c8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8",
  },
  {
    id: 4,
    title: "Crown of Ashes",
    author: "D. Aelor",
    genre: "High Fantasy",
    rating: "4.9",
    chapters: 61,
    readers: "200K",
    image:
      "https://img.freepik.com/free-photo/dragon-flying-over-castle_1150-10844.jpg?w=1380&t=st=1692813200~exp=1692813800~hmac=7b8a1c8f4f8f3c5b6d8f9b8b8d9c8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8",
  },
];

  


export default function FeaturedStories() {

  const { data: stories, error, isLoading } = useGetStoriesQuery();

  console.log(stories)
  return (
    <section className="mb-20">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl font-bold text-white">Featured Stories</h2>
        <Button variant="outline" className="hidden md:flex bg-transparent">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredStories.map((story) => (
          <Link key={story.id} href={`/story/${story.id}`} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm border border-border/30 hover:border-primary/50 transition-all duration-700 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/20 group-hover:bg-card/90">
              {/* Use Next.js Image */}
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-110"
                  sizes="(max-width: 768px) 100vw,
                         (max-width: 1024px) 50vw,
                         25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-black/95 transition-all duration-700" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs bg-primary/20 text-primary-foreground px-3 py-1.5 rounded-full font-medium backdrop-blur-sm border border-primary/30">
                    {story.genre}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm text-white font-medium">{story.rating}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-white font-bold text-xl mb-2 group-hover:text-primary transition-all duration-500 line-clamp-1">
                    {story.title}
                  </h3>
                  <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors duration-500">
                    by {story.author}
                  </p>
                </div>

                <div className="flex items-center gap-6 text-xs text-white/60 mb-4 group-hover:text-white/80 transition-colors duration-500">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <span>{story.chapters} chapters</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{story.readers}</span>
                  </div>
                </div>

                <Button
                  size="sm"
                  className="w-full bg-primary/20 hover:bg-primary border border-primary/40 hover:border-primary text-white backdrop-blur-md transition-all duration-500 font-medium hover:shadow-lg hover:shadow-primary/30"
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
