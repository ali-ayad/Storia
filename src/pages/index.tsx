
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import HeroSection from "@/sections/Home/HeroSection";
import FeaturedStories from "@/sections/stories/FeaturedStories";




export default function Home() {
  return (
    <>
     <Layout>
    <main className="container mx-auto px-6 py-16 relative z-10">
      <HeroSection />
      <FeaturedStories />
    </main>
    </Layout>
    </>
  );
}
