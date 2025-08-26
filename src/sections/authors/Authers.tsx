"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Author = {
  name: string;
  avatar: string;
  stories: number;
  followers: number;
};

const topAuthors: Author[] = [
  {
    name: "Ava Stone",
    avatar: "https://img.freepik.com/free-photo/woman-smiling_23-2148172457.jpg?w=1380&t=st=1692813200~exp=1692813800~hmac=abcd1234",
    stories: 12,
    followers: 3200,
  },
  {
    name: "Liam Carter",
    avatar: "https://img.freepik.com/free-photo/man-portrait_23-2148172450.jpg?w=1380&t=st=1692813200~exp=1692813800~hmac=abcd5678",
    stories: 8,
    followers: 2100,
  },
  {
    name: "Sophia Winters",
    avatar: "https://img.freepik.com/free-photo/portrait-of-a-young-woman_23-2148172443.jpg?w=1380&t=st=1692813200~exp=1692813800~hmac=abcd9012",
    stories: 15,
    followers: 4500,
  },
  {
    name: "Ethan Blackwood",
    avatar: "https://img.freepik.com/free-photo/man-smiling_23-2148172455.jpg?w=1380&t=st=1692813200~exp=1692813800~hmac=abcd3456",
    stories: 10,
    followers: 3800,
  },
];

const FeaturedAuthors: FC = () => {
  return (
    <section className="mb-20">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl font-bold">Featured Authors</h2>
        <Button variant="outline" className="hidden md:flex bg-transparent">
          View All Authors
        </Button>
      </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {topAuthors.map((author) => (
    <Link
      key={author.name}
      href={`/author/${author.name.toLowerCase().replace(/\s+/g, "-")}`}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-xl bg-card border border-border/20 hover:border-primary/30 transition-all duration-300 p-6 text-center">
        <div className="w-24 h-24 mx-auto mb-4 relative overflow-hidden rounded-full">
          <Image
            src={author.avatar || "/placeholder.svg"}
            alt={author.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
          {author.name}
        </h3>
        <div className="text-sm text-muted-foreground space-y-1">
          <div>{author.stories} stories</div>
          <div>{author.followers} followers</div>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="mt-4 w-full bg-transparent group-hover:bg-primary/10 transition-colors"
        >
          Follow
        </Button>
      </div>
    </Link>
  ))}
</div>

    </section>
  );
};

export default FeaturedAuthors;
