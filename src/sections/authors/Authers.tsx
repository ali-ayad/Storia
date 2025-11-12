"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useGetAuthorsPaginatedQuery } from "@/Api/authorsApi";
import Spinner from "@/components/spinner";

const FeaturedAuthors: FC = () => {
  // Fetch authors (page 1, small page size)
  const { data, error, isLoading } = useGetAuthorsPaginatedQuery({
    page: 1,
    pageSize: 4,
  });

 if (isLoading) {
  return (
    <div className="flex items-center justify-center h-40">
      <Spinner size="lg" />
    </div>
  );
}

  if (error || !data?.data?.length) {
    return <p className="text-center text-muted-foreground">No authors available.</p>;
  }

  const authors = data.data.slice(-4).reverse(); // Show the latest 4 authors

  

  return (
    <section className="mb-20">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl font-bold text-white">Featured Authors</h2>

        {/* 🔗 Link to authors page */}
        <Button
          asChild
          variant="outline"
          className="hidden md:flex bg-transparent text-sm"
        >
          <Link href="/authors">View All Authors</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {authors.map((author) => (
          <Link
            key={author.id}
            href={`/author/${author.id}`}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-xl bg-card border border-border/20 hover:border-primary/30 transition-all duration-300 p-6 text-center">
              {/* 🖼 Author Avatar */}
              <div className="w-24 h-24 mx-auto mb-4 relative overflow-hidden rounded-full">
                <Image
                  src={author.image_url || "/placeholder.jpg"}
                  alt={author.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* 🧾 Author Info */}
              <h3 className="font-bold text-lg mb-2 text-white group-hover:text-primary transition-colors">
                {author.name}
              </h3>

              <p className="text-sm text-muted-foreground">{author.email}</p>

              {author.bio && (
                <p className="text-xs text-white/70 mt-3 line-clamp-3 group-hover:text-white/90 transition-colors duration-500">
                  {author.bio}
                </p>
              )}

              <Button
                size="sm"
                variant="outline"
                className="mt-4 w-full bg-transparent group-hover:bg-primary/10 transition-colors"
              >
                View Profile
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedAuthors;
