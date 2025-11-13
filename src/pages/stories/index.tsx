"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

import { useGetStoriesPaginatedQuery } from "@/Api/storiesApi";
import Spinner from "@/components/spinner";

export default function StoriesPage() {
  // 🔹 Pagination states
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // 🔹 Fetch real data
  const { data, isLoading, isFetching } = useGetStoriesPaginatedQuery(
    { page, pageSize, search: "" },
    { refetchOnMountOrArgChange: true }
  );

  const stories = data?.data || [];
  const totalCount = data?.count || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  // 🔹 Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  // 🔹 Empty state
  if (!stories.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-muted-foreground">
        <p>No stories found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold text-foreground">All Stories</h1>
          <Button variant="ghost" className="text-primary hover:text-primary/80">
            Sort by Rating
          </Button>
        </div>

        {/* Story Grid */}
        {isFetching ? (
          <div className="flex justify-center items-center py-20">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stories.map((story) => (
              <Link
                key={story.id}
                href={`/stories/${story.id}`}
                className="group bg-card border border-border/40 rounded-xl overflow-hidden hover:border-primary/40 transition-colors"
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <Image
                    src={story.image_url || "/placeholder.jpg"}
                    alt={story.title}
                    fill
                    className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-110"
                    sizes="(max-width: 768px) 100vw,
                           (max-width: 1024px) 50vw,
                           25vw"
                  />
                  <div className="absolute top-3 left-3">
                    {/* <Badge
                      variant="secondary"
                      className="bg-secondary/90 text-secondary-foreground"
                    >
                      {story.genre || "Fantasy"}
                    </Badge> */}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 rounded-full px-2 py-1">
                    <Star className="h-3 w-3  " />
                    {/* <span className="text-xs text-white font-medium">
                      {story.rating || "4.8"}
                    </span> */}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-card-foreground mb-1 line-clamp-1">
                    {story.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    by {story.authors?.name || "Unknown Author"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-10">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page > 1) setPage(page - 1);
                  }}
                  className={page === 1 ? "opacity-50 pointer-events-none" : ""}
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(pageNumber);
                      }}
                      isActive={pageNumber === page}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page < totalPages) setPage(page + 1);
                  }}
                  className={page === totalPages ? "opacity-50 pointer-events-none" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
