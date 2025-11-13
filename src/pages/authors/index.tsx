"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useGetAuthorsPaginatedQuery } from "@/Api/authorsApi";
import Spinner from "@/components/spinner";

export default function AuthorsPage() {
  // 🔹 Pagination state
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // 🔹 Fetch real data
  const { data, isLoading, isFetching } = useGetAuthorsPaginatedQuery(
    { page, pageSize },
    { refetchOnMountOrArgChange: true }
  );

  const authors = data?.data || [];
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
  if (!authors.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-muted-foreground">
        <p>No authors found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold text-foreground">All Authors</h1>
          <Button
            variant="ghost"
            className="text-primary hover:text-primary/80"
          >
            Sort by Followers
          </Button>
        </div>

        {/* Authors Grid */}
        {isFetching ? (
          <div className="flex justify-center items-center py-20">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {authors.map((author) => (
              <Link
                key={author.id}
                href={`/authors/${author.id}`}
                className="group cursor-pointer bg-card border border-border/20 rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 p-6 text-center"
              >
                <div className="w-24 h-24 mx-auto mb-4 relative overflow-hidden rounded-full">
                  <Image
                    src={author.image_url || "/placeholder.jpg"}
                    alt={author.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {author.name}
                </h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  {author.email && (
                    <div className="truncate text-foreground/80">
                      {author.email}
                    </div>
                  )}
                  {author.bio && (
                    <p className="text-xs text-muted-foreground line-clamp-3 mt-1">
                      {author.bio}
                    </p>
                  )}
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
                  className={
                    page === totalPages ? "opacity-50 pointer-events-none" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
