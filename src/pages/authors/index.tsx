"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Author = {
  name: string;
  avatar: string;
  stories: number;
  followers: number;
};

export default function AuthorsPage() {
  const authors: Author[] = [
    { name: "Ava Stone", avatar: "https://img.freepik.com/free-photo/woman-smiling_23-2148172457.jpg?w=1380", stories: 12, followers: 3200 },
    { name: "Liam Carter", avatar: "https://img.freepik.com/free-photo/man-portrait_23-2148172450.jpg?w=1380", stories: 8, followers: 2100 },
    { name: "Sophia Winters", avatar: "https://img.freepik.com/free-photo/portrait-of-a-young-woman_23-2148172443.jpg?w=1380", stories: 15, followers: 4500 },
    { name: "Ethan Blackwood", avatar: "https://img.freepik.com/free-photo/man-smiling_23-2148172455.jpg?w=1380", stories: 10, followers: 3800 },
    { name: "Mia Rodriguez", avatar: "https://img.freepik.com/free-photo/beautiful-young-woman-outdoors_23-2148172448.jpg?w=1380", stories: 9, followers: 2500 },
    { name: "Noah Bennett", avatar: "https://img.freepik.com/free-photo/portrait-of-man_23-2148172451.jpg?w=1380", stories: 14, followers: 4100 },
    { name: "Olivia Harper", avatar: "https://img.freepik.com/free-photo/young-woman-portrait_23-2148172445.jpg?w=1380", stories: 11, followers: 3300 },
    { name: "Lucas Mason", avatar: "https://img.freepik.com/free-photo/man-with-beard-smiling_23-2148172452.jpg?w=1380", stories: 7, followers: 1900 },
    { name: "Isabella Grey", avatar: "https://img.freepik.com/free-photo/young-woman-smiling_23-2148172446.jpg?w=1380", stories: 13, followers: 3900 },
    { name: "Ethan Drake", avatar: "https://img.freepik.com/free-photo/man-portrait-smile_23-2148172453.jpg?w=1380", stories: 10, followers: 2800 },
    { name: "Lily Evans", avatar: "https://img.freepik.com/free-photo/portrait-of-young-woman_23-2148172449.jpg?w=1380", stories: 8, followers: 2200 },
    { name: "James Whitman", avatar: "https://img.freepik.com/free-photo/man-portrait_23-2148172454.jpg?w=1380", stories: 9, followers: 2600 },
  ];

  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold text-foreground">All Authors</h1>
          <Button variant="ghost" className="text-primary hover:text-primary/80">
            Sort by Followers
          </Button>
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {authors.map((author) => (
            <Link
              key={author.name}
              href={`/author/${author.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="group cursor-pointer bg-card border border-border/20 rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 p-6 text-center"
            >
              <div className="w-24 h-24 mx-auto mb-4 relative overflow-hidden rounded-full">
                <Image
                  src={author.avatar}
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
