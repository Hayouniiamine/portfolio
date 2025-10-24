"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, Brain, ShoppingCart, Code, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { analytics } from "@/lib/analytics"
import { contentManager } from "@/lib/content-manager"
import ProjectSlideshow from "@/components/ProjectSlideshow"

const iconMap = {
  Brain: <Brain className="w-6 h-6" />,
  ShoppingCart: <ShoppingCart className="w-6 h-6" />,
  Code: <Code className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
}

export default function Projects() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([])
  const { t, language } = useLanguage()
  const [content, setContent] = useState(contentManager?.getContent(language))

  useEffect(() => {
    analytics?.trackSectionView("projects")

    const updateContent = () => {
      if (contentManager) {
        setContent(contentManager.getContent(language))
      }
    }

    window.addEventListener("storage", updateContent)
    window.addEventListener("contentUpdated", updateContent)

    const timer = setTimeout(() => {
      setVisibleCards((content?.projects || []).map(() => true))
    }, 200)

    return () => {
      window.removeEventListener("storage", updateContent)
      window.removeEventListener("contentUpdated", updateContent)
      clearTimeout(timer)
    }
  }, [content, language])

  const handleButtonClick = (type: string, projectKey: string) => {
    analytics?.trackButtonClick(`project-${type}-${projectKey}`)
  }

  const isYouTubeUrl = (url: string) => {
    return url.includes("youtube.com") || url.includes("youtu.be")
  }

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.includes("youtu.be")
      ? url.split("youtu.be/")[1]?.split("?")[0]
      : url.split("v=")[1]?.split("&")[0]
    return `https://www.youtube.com/embed/${videoId}`
  }

  return (
    <section id="projects" className="py-20 bg-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2310b981' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent mb-4">
            {t("featuredProjects")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">{t("projectsDescription")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content?.projects?.map((project, index) => (
            <Card
              key={project.id}
              className={`group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg relative overflow-hidden transform bg-slate-700/50 border-slate-600 ${
                visibleCards[index] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Gradient Border Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg`}
              />
              <div className="absolute inset-[1px] bg-slate-700 rounded-lg" />

              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 bg-gradient-to-r ${project.gradient} rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {iconMap[project.icon as keyof typeof iconMap] || <Code className="w-6 h-6" />}
                  </div>
                  <span className="text-sm text-slate-400 bg-slate-600 px-3 py-1 rounded-full">{project.period}</span>
                </div>
                <CardTitle className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-emerald-400 group-hover:to-cyan-400 transition-all duration-300">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-slate-300 leading-relaxed">{project.description}</CardDescription>
              </CardHeader>

              <CardContent className="relative z-10">
                {/* Slideshow Section */}
                {project.images && project.images.length > 0 && (
                  <div className="mb-6">
                    <ProjectSlideshow images={project.images} title={project.title} />
                  </div>
                )}

                {/* Video Section */}
                {project.video && (
                  <div className="mb-6">
                    <div className="video-container bg-slate-800 rounded-lg overflow-hidden">
                      {isYouTubeUrl(project.video) ? (
                        <iframe
                          src={getYouTubeEmbedUrl(project.video)}
                          title={`${project.title} Demo`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video controls preload="metadata" className="w-full h-full object-cover">
                          <source src={project.video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className="text-xs hover:scale-105 transition-transform duration-200 cursor-default bg-slate-600 text-slate-200"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="hover:scale-105 transition-transform duration-200 bg-transparent border-slate-500 text-slate-300 hover:border-emerald-400 hover:text-emerald-400"
                    onClick={() => handleButtonClick("code", project.id)}
                  >
                    <a href={project.github} className="flex items-center">
                      <Github className="w-4 h-4 mr-2" />
                      {t("code")}
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    asChild
                    className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 hover:scale-105 transition-all duration-200"
                    onClick={() => handleButtonClick("demo", project.id)}
                  >
                    <a href={project.demo} className="flex items-center">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t("demo")}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
