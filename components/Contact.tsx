"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Send } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { analytics } from "@/lib/analytics"
import { contentManager } from "@/lib/content-manager"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const { t, language } = useLanguage()
  const [content, setContent] = useState(contentManager?.getContent(language))

  useEffect(() => {
    analytics?.trackSectionView("contact")

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    analytics?.trackFormSubmit()
    console.log("Form submitted:", formData)
    alert("Thank you for your message! I'll get back to you soon.")
    setFormData({ name: "", email: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent mb-4">
            {t("contactTitle")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">{t("contactDescription")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">{t("letsConnect")}</h3>
            <p className="text-slate-300 mb-8">{t("connectDescription")}</p>

            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-emerald-400 mr-3" />
                <span className="text-slate-300">{content?.personalInfo.email}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-emerald-400 mr-3" />
                <span className="text-slate-300">{content?.personalInfo.location}</span>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-white mb-4">{t("lookingFor")}</h4>
              <ul className="space-y-2 text-slate-300">
                {t("opportunities").map((opportunity: string, index: number) => (
                  <li key={index}>• {opportunity}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-slate-700 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white">{t("sendMessage")}</CardTitle>
              <CardDescription className="text-slate-300">{t("formDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-300">
                    {t("name")}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="bg-slate-600 border-slate-500 text-white placeholder-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">
                    {t("email")}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="bg-slate-600 border-slate-500 text-white placeholder-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-slate-300">
                    {t("message")}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or just say hello..."
                    rows={5}
                    required
                    className="bg-slate-600 border-slate-500 text-white placeholder-slate-400"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {t("send")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
