"use client";

import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useGetAuthorByIdQuery } from "@/Api/authorsApi";
import Spinner from "@/components/spinner";

export default function AuthorPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: author, isLoading, error } = useGetAuthorByIdQuery(id as string, {
    skip: !id,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spinner size="lg" />
      </div>
    );

  if (error || !author)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-muted-foreground">
        <p>Author not found.</p>
        <Button variant="ghost" onClick={() => router.push("/authors")}>
          Go Back
        </Button>
      </div>
    );

  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/authors"
          className="flex items-center text-muted-foreground mb-8 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Authors
        </Link>

        <div className="flex flex-col items-center text-center">
          <div className="w-32 h-32 relative mb-6 rounded-full overflow-hidden">
            <Image
              src={author.image_url || "/placeholder.jpg"}
              alt={author.name}
              fill
              className="object-cover"
            />
          </div>

          <h1 className="text-3xl font-bold mb-2">{author.name}</h1>
          <p className="text-muted-foreground mb-6">{author.email}</p>

          {author.bio && (
            <p className="text-sm text-foreground/80 leading-relaxed max-w-lg">
              {author.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
