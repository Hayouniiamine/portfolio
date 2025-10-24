"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, MapPin, Code, Database, Brain, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { analytics } from "@/lib/analytics"
import { contentManager } from "@/lib/content-manager"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const { t, language } = useLanguage()
  const [content, setContent] = useState<any>(null)

  useEffect(() => {
    setIsVisible(true)
    analytics?.trackSectionView("hero")

    // Initialize content
    const manager = contentManager
    if (manager) {
      setContent(manager.getContent(language))
    }

    // Update content when it changes
    const updateContent = () => {
      const manager = contentManager
      if (manager) {
        setContent(manager.getContent(language))
      }
    }

    // Listen for storage changes and language changes
    window.addEventListener("storage", updateContent)
    window.addEventListener("contentUpdated", updateContent)

    return () => {
      window.removeEventListener("storage", updateContent)
      window.removeEventListener("contentUpdated", updateContent)
    }
  }, [language])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      analytics?.trackButtonClick(`hero-${sectionId}`)
    }
  }

  return (
    <section
      id="hero"
      className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900/20"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Code className="absolute top-1/4 left-1/4 w-6 h-6 text-emerald-400/30 animate-bounce delay-300" />
        <Database className="absolute top-1/3 right-1/4 w-5 h-5 text-cyan-400/30 animate-bounce delay-700" />
        <Brain className="absolute bottom-1/3 left-1/3 w-7 h-7 text-teal-400/30 animate-bounce delay-1000" />
        <Sparkles className="absolute top-1/2 right-1/3 w-4 h-4 text-emerald-300/30 animate-bounce delay-1300" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center">
          <div
            className={`mb-8 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full blur-lg opacity-30 animate-pulse"></div>
              <Image
                src="/profile-new.jpg"
                alt="Amine Hayouni"
                width={200}
                height={200}
                className="rounded-full mx-auto shadow-2xl border-4 border-slate-700 relative z-10 hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
          </div>

          <div
            className={`transform transition-all duration-1000 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <h1
              className={`text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent mb-6 animate-gradient hero-name ${language === "ar" ? "mb-8" : "mb-4"}`}
            >
              {content?.personalInfo.name || t("name")}
            </h1>
          </div>

          <div
            className={`transform transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className={`relative inline-block ${language === "ar" ? "mb-8" : "mb-6"}`}>
              <p className="text-xl md:text-2xl text-emerald-300 font-medium">
                {content?.personalInfo.tagline || t("tagline")}
              </p>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full transform scale-x-0 animate-scale-x"></div>
            </div>
          </div>

          <div
            className={`flex items-center justify-center text-slate-400 mb-8 transform transition-all duration-1000 delay-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <MapPin className="w-4 h-4 mr-2 animate-pulse text-emerald-400" />
            <span>{content?.personalInfo.location || t("location")}</span>
          </div>

          <div
            className={`transform transition-all duration-1000 delay-900 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              {content?.personalInfo.heroDescription || t("heroDescription")}
            </p>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 transform transition-all duration-1000 delay-1100 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"} ${language === "ar" ? "sm:flex-row-reverse" : ""}`}
          >
            <Button
              onClick={() => scrollToSection("projects")}
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white px-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Code className="w-4 h-4 mr-2" />
              {t("viewWork")}
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              variant="outline"
              size="lg"
              className="px-8 border-2 border-emerald-400/50 text-emerald-300 hover:bg-emerald-400/10 hover:border-emerald-400 transform hover:scale-105 transition-all duration-300"
            >
              {t("getInTouch")}
            </Button>
          </div>

          <div
            className={`flex justify-center space-x-6 transform transition-all duration-1000 delay-1300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"} ${language === "ar" ? "space-x-reverse" : ""}`}
          >
            <a
              href={`mailto:${content?.personalInfo.email || "hayouniamine11@gmail.com"}`}
              onClick={() => analytics?.trackButtonClick("hero-email")}
              className="p-3 rounded-full bg-slate-800 shadow-lg text-slate-400 hover:text-emerald-400 hover:shadow-xl transform hover:scale-110 transition-all duration-300 border border-slate-700 hover:border-emerald-400/50"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href={content?.personalInfo.github || "#"}
              onClick={() => analytics?.trackButtonClick("hero-github")}
              className="p-3 rounded-full bg-slate-800 shadow-lg text-slate-400 hover:text-emerald-400 hover:shadow-xl transform hover:scale-110 transition-all duration-300 border border-slate-700 hover:border-emerald-400/50"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href={content?.personalInfo.linkedin || "#"}
              onClick={() => analytics?.trackButtonClick("hero-linkedin")}
              className="p-3 rounded-full bg-slate-800 shadow-lg text-slate-400 hover:text-emerald-400 hover:shadow-xl transform hover:scale-110 transition-all duration-300 border border-slate-700 hover:border-emerald-400/50"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
