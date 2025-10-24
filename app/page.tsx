"use client"

import { useEffect } from "react"
import Hero from "@/components/Hero"
import Projects from "@/components/Projects"
import Resume from "@/components/Resume"
import Contact from "@/components/Contact"
import Navigation from "@/components/Navigation"
import { analytics } from "@/lib/analytics"

export default function Home() {
  useEffect(() => {
    analytics?.trackPageView("/")
  }, [])

  return (
    <main className="min-h-screen bg-slate-900 text-white transition-colors">
      <Navigation />
      <Hero />
      <Projects />
      <Resume />
      <Contact />
    </main>
  )
}
