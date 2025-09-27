"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { analytics } from "@/lib/analytics"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Navigation() {
  const { language, setLanguage, t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      analytics?.trackSectionView(sectionId)
    }
    setIsMenuOpen(false)
  }

  const handleLanguageChange = (lang: "en" | "fr" | "ar") => {
    setLanguage(lang)
    analytics?.trackLanguageChange(lang)
  }

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧", label: "EN" },
    { code: "fr", name: "Français", flag: "🇫🇷", label: "FR" },
    { code: "ar", name: "العربية", flag: "🇹🇳", label: "عر" },
  ]

  const currentLanguage = languages.find((lang) => lang.code === language)

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-slate-900/95 backdrop-blur-lg shadow-lg border-b border-slate-700/50" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-16">
          {/* Logo */}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { key: "home", id: "hero" },
              { key: "projects", id: "projects" },
              { key: "resume", id: "resume" },
              { key: "contact", id: "contact" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.id)}
                className="relative text-slate-300 hover:text-emerald-400 transition-colors duration-200 group"
              >
                {t(item.key)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}

            {/* Enhanced Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="hover:scale-105 transition-transform duration-200 flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-600 hover:border-emerald-400/50 bg-slate-800/50"
                >
                  <span className="text-lg">{currentLanguage?.flag}</span>
                  <span className="text-sm font-medium text-slate-300">{currentLanguage?.label}</span>
                  <ChevronDown className="h-3 w-3 text-slate-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-800 border-slate-700 min-w-[160px]">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code as "en" | "fr" | "ar")}
                    className={`text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer flex items-center gap-3 px-3 py-2 ${
                      language === lang.code ? "bg-slate-700 text-emerald-400" : ""
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <div className="flex flex-col">
                      <span className="font-medium">{lang.name}</span>
                      <span className="text-xs text-slate-400">{lang.label}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="hover:scale-105 transition-transform duration-200 flex items-center gap-1 px-2 py-1 rounded border border-slate-600"
                >
                  <span className="text-sm">{currentLanguage?.flag}</span>
                  <span className="text-xs text-slate-300">{currentLanguage?.label}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-800 border-slate-700">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code as "en" | "fr" | "ar")}
                    className={`text-slate-300 hover:text-white hover:bg-slate-700 ${
                      language === lang.code ? "bg-slate-700 text-emerald-400" : ""
                    }`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:scale-110 transition-transform duration-200"
            >
              {isMenuOpen ? <X className="h-5 w-5 text-slate-300" /> : <Menu className="h-5 w-5 text-slate-300" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-2" dir={language === "ar" ? "rtl" : "ltr"}>
            {[
              { key: "home", id: "hero" },
              { key: "projects", id: "projects" },
              { key: "resume", id: "resume" },
              { key: "contact", id: "contact" },
            ].map((item, index) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full px-4 py-3 text-slate-300 hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-cyan-500/10 hover:text-emerald-400 rounded-md transition-all duration-200 transform hover:translate-x-2 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {t(item.key)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
