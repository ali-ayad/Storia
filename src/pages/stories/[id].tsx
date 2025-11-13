"use client";

import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useGetStoryByIdQuery } from "@/Api/storiesApi";
import Spinner from "@/components/spinner";

export default function StoryPage() {
  const router = useRouter();
  const { id } = router.query;

  // Fetch single story data
  const { data: story, isLoading, error } = useGetStoryByIdQuery(id as string, {
    skip: !id,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spinner size="lg" />
      </div>
    );

  if (error || !story)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-muted-foreground">
        <p>Story not found.</p>
        <Button variant="ghost" onClick={() => router.push("/stories")}>
          Go Back
        </Button>
      </div>
    );

  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/stories"
          className="flex items-center text-muted-foreground mb-8 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Stories
        </Link>

        {/* Story Cover */}
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl mb-6">
          <Image
            src={story.image_url || "/placeholder.jpg"}
            alt={story.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Story Info */}
        <h1 className="text-4xl font-bold mb-2 text-foreground">{story.title}</h1>
        <p className="text-muted-foreground mb-6">
          by {story.authors?.name || "Unknown Author"}
        </p>

        {/* Story Content */}
        <div className="prose prose-invert max-w-none leading-relaxed text-foreground/90">
          {story.content ? (
            <p>{story.content}</p>
          ) : (
            <p className="italic text-muted-foreground">
              This story doesn’t have content yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
