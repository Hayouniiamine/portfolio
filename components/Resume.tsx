"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, GraduationCap, Code, Globe } from "lucide-react"
import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { analytics } from "@/lib/analytics"
import { contentManager } from "@/lib/content-manager"

export default function Resume() {
  const { t, language } = useLanguage()
  const [content, setContent] = useState(contentManager?.getContent(language))

  useEffect(() => {
    analytics?.trackSectionView("resume")

    const updateContent = () => {
      const manager = contentManager
      if (manager) {
        setContent(manager.getContent(language))
      }
    }

    window.addEventListener("storage", updateContent)
    window.addEventListener("contentUpdated", updateContent)

    return () => {
      window.removeEventListener("storage", updateContent)
      window.removeEventListener("contentUpdated", updateContent)
    }
  }, [language])

  const handleDownload = () => {
    analytics?.trackButtonClick("download-resume")
    window.open("https://github.com/Hayouniiamine/cv/blob/main/Amine%20Hayounii.pdf", "_blank")
  }

  const languages = [
    { name: t("arabic"), level: t("native") },
    { name: t("english"), level: t("proficient") },
    { name: t("french"), level: t("proficient") },
  ]

  return (
    <section id="resume" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent mb-4">
            {t("resumeSkills")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">{t("resumeDescription")}</p>
          <Button
            onClick={handleDownload}
            size="lg"
            className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700"
          >
            <Download className="w-4 h-4 mr-2" />
            {t("downloadResume")}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-12">
          {/* Education */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <GraduationCap className="w-5 h-5 mr-2 text-cyan-400" />
                {t("education")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {content?.education?.map((edu, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <h3 className="font-semibold text-lg text-white">{edu.degree}</h3>
                  <p className="text-cyan-400 font-medium">{edu.institution}</p>
                  <p className="text-sm text-slate-400">
                    {edu.period} • {edu.location}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Skills */}
        <Card className="bg-slate-800 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Code className="w-5 h-5 mr-2 text-purple-400" />
              {t("technicalSkills")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(content?.skills || {}).map(([category, skillList]) => (
                <div key={category}>
                  <h4 className="font-semibold text-white mb-3">{t(category)}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-slate-600 text-slate-300">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Languages */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Globe className="w-5 h-5 mr-2 text-teal-400" />
              {t("languages")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {languages.map((lang, index) => (
                <div key={index} className="text-center p-4 bg-slate-700 rounded-lg">
                  <h4 className="font-semibold text-white">{lang.name}</h4>
                  <p className="text-sm text-slate-300">{lang.level}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
