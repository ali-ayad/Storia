"use client";

import { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrendingUp, BookOpen, Users, Star } from "lucide-react";
import Image from "next/image";

type Story = {
  id: number;
  title: string;
  author: string;
  image: string;
  chapters: number;
  readers: number;
  rating: number;
};

const fakeTrendingStories: Story[] = [
{
  id: 1,
  title: "The Forgotten Citadel",
  author: "Ethan Blackwood",
  image:
    "https://img.freepik.com/free-photo/ancient-castle-mountains_1150-10841.jpg?w=826&t=st=1692813200~exp=1692816800~hmac=ab12cd34ef56gh78ij90klmnop1234567890qrstuv",
  chapters: 15,
  readers: 2750,
  rating: 4.6,
},

  {
    id: 2,
    title: "The Last Ember",
    author: "Liam Carter",
    image:
      "https://img.freepik.com/free-photo/mystical-forest-with-colorful-lights_23-2151152897.jpg?w=826&t=st=1692813200~exp=1692816800~hmac=2b7c7ef991f9b4ac0a8b2327c78e1a1f9b0c4e9dd8e6ffb3d123456789abcdef",
    chapters: 18,
    readers: 2100,
    rating: 4.5,
  },
  {
    id: 3,
    title: "Eclipsed by Shadows",
    author: "Sophia Winters",
    image:
      "https://img.freepik.com/free-photo/moody-dark-fantasy-landscape_23-2151152923.jpg?w=826&t=st=1692813200~exp=1692816800~hmac=f82b13f0f03ddc937b7a8db86ad987654321abcdef9876543210fedcba09876",
    chapters: 30,
    readers: 4500,
    rating: 4.9,
  },
];


const TrendingStories: FC = () => {
  return (
    <section className="mb-20">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-bold">Trending This Week</h2>
        </div>
        <Button variant="outline" className="hidden md:flex bg-transparent">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {fakeTrendingStories.map((story) => (
          <Link
            key={story.id}
            href={`/story/${story.id}`}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm border border-border/30 hover:border-primary/50 transition-all duration-700 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/20 group-hover:bg-card/90">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={story.image || "/placeholder.svg"}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                  {story.title}
                </h3>
                <p className="text-white/60 text-sm mb-3">by {story.author}</p>
                <div className="flex items-center justify-between text-xs text-white/70">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      <span>{story.chapters}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{story.readers}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-white/80">{story.rating}</span>
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
