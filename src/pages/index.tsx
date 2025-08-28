import FeaturedAuthors from "@/sections/authors/Authers";
import HeroSection from "@/sections/Home/HeroSection";
import FeaturedStories from "@/sections/stories/FeaturedStories";
import TrendingStories from "@/sections/stories/TrendingStories";

export default function Home() {
  return (
    <main className="container mx-auto px-6 py-16 relative z-10">
      <HeroSection />
      <FeaturedStories />
      <TrendingStories />
      <FeaturedAuthors />
    </main>
  );
}
