"use client"

import { BookOpen, Users, Award } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="container mx-auto px-6 py-16 text-center relative z-10 mb-20">
      <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        Where Stories Come Alive
      </h1>

      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        Discover epic tales, connect with passionate authors, and immerse yourself in worlds beyond imagination.
      </p>

      <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          <span>10M+ Stories</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>2.5M+ Readers</span>
        </div>
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4" />
          <span>50K+ Authors</span>
        </div>
      </div>
    </section>
  )
}
