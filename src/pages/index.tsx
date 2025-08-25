
import Layout from "@/components/Layout";
import HeroSection from "@/sections/Home/HeroSection";
import FeaturedStories from "@/sections/stories/FeaturedStories";
import TrendingStories from "@/sections/stories/TrendingStories";




export default function Home() {
  return (
    <>
     <Layout>
    <main className="container mx-auto px-6 py-16 relative z-10">
      <HeroSection />
      <FeaturedStories />
      <TrendingStories />
    </main>
    </Layout>
    </>
  );
}
