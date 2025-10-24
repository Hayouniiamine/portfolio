"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Eye,
  MessageSquare,
  Clock,
  Activity,
  Trash2,
  Edit3,
  Plus,
  User,
  Briefcase,
  GraduationCap,
  FolderOpen,
} from "lucide-react"
import { analytics } from "@/lib/analytics"
import { contentManager, type Project, type Experience, type Education } from "@/lib/content-manager"

interface Stats {
  sessionId: string
  sessionDuration: number
  totalEvents: number
  pageViews: number
  todayPageViews: number
  formSubmits: number
  sectionViews: Record<string, number>
  buttonClicks: Record<string, number>
  languagePreferences: Record<string, number>
  totalSessions: number
}

const useDebounce = (callback: Function, delay: number) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const debouncedCallback = useCallback(
    (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId)
      const newTimeoutId = setTimeout(() => {
        callback(...args)
      }, delay)
      setTimeoutId(newTimeoutId)
    },
    [callback, delay, timeoutId],
  )

  return debouncedCallback
}

const EditableField = ({ value, onChange, label, placeholder, type = "text" }: any) => {
  const [localValue, setLocalValue] = useState(value)

  const debouncedOnChange = useDebounce((val: string) => {
    onChange(val)
  }, 500)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setLocalValue(newValue)
    debouncedOnChange(newValue)
  }

  return (
    <div className="space-y-2">
      <Label className="text-slate-300">{label}</Label>
      {type === "textarea" ? (
        <Textarea
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="bg-slate-700 border-slate-600 text-white"
          rows={3}
        />
      ) : (
        <Input
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="bg-slate-700 border-slate-600 text-white"
        />
      )}
    </div>
  )
}

const getContentManager = () => {
  return contentManager
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [events, setEvents] = useState<any[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [content, setContent] = useState<any | null>(null)
  const [activeTab, setActiveTab] = useState("analytics")
  const [editingProject, setEditingProject] = useState<string | null>(null)
  const [editingExperience, setEditingExperience] = useState<string | null>(null)
  const [editingEducation, setEditingEducation] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [editingLanguage, setEditingLanguage] = useState<"en" | "fr" | "ar">("en")

  useEffect(() => {
    if (isAuthenticated) {
      const initializeData = async () => {
        try {
          if (analytics) {
            const updateStats = () => {
              setStats(analytics.getStats())
              setEvents(analytics.getAllEvents().slice(-50))
            }
            updateStats()
            const interval = setInterval(updateStats, 5000)

            const manager = getContentManager()
            if (manager) {
              setContent(manager.getAllContent())
            }

            setIsLoading(false)

            return () => clearInterval(interval)
          } else {
            const manager = getContentManager()
            if (manager) {
              setContent(manager.getAllContent())
            }
            setIsLoading(false)
          }
        } catch (error) {
          console.error("Error initializing dashboard:", error)
          setIsLoading(false)
        }
      }

      initializeData()
    }
  }, [isAuthenticated])

  const handleLogin = useCallback(() => {
    if (password === "admin123") {
      setIsAuthenticated(true)
    } else {
      alert("Invalid password")
    }
  }, [password])

  const clearAnalytics = useCallback(() => {
    if (analytics && confirm("Are you sure you want to clear all analytics data?")) {
      analytics.clearData()
      setStats(analytics.getStats())
      setEvents([])
    }
  }, [])

  const formatDuration = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }, [])

  const handlePersonalInfoUpdate = useCallback(
    (field: string, value: string) => {
      const manager = getContentManager()
      if (manager) {
        manager.updatePersonalInfo(editingLanguage, { [field]: value })
        setContent(manager.getAllContent())
      }
    },
    [editingLanguage],
  )

  const handleSkillsUpdate = useCallback(
    (category: string, skills: string[]) => {
      const manager = getContentManager()
      if (manager) {
        manager.updateSkills(editingLanguage, { [category]: skills })
        setContent(manager.getAllContent())
      }
    },
    [editingLanguage],
  )

  const handleProjectUpdate = useCallback(
    (id: string, field: string, value: any) => {
      const manager = getContentManager()
      if (manager) {
        manager.updateProject(editingLanguage, id, { [field]: value })
        setContent(manager.getAllContent())
      }
    },
    [editingLanguage],
  )

  const handleExperienceUpdate = useCallback(
    (id: string, field: string, value: any) => {
      const manager = getContentManager()
      if (manager) {
        manager.updateExperience(editingLanguage, id, { [field]: value })
        setContent(manager.getAllContent())
      }
    },
    [editingLanguage],
  )

  const handleEducationUpdate = useCallback(
    (id: string, field: string, value: any) => {
      const manager = getContentManager()
      if (manager) {
        manager.updateEducation(editingLanguage, id, { [field]: value })
        setContent(manager.getAllContent())
      }
    },
    [editingLanguage],
  )

  const addNewProject = useCallback(() => {
    if (contentManager && content) {
      const newProject: Project = {
        id: `project-${Date.now()}`,
        title: "New Project",
        description: "Project description",
        period: "2025",
        tech: ["Technology"],
        github: "#",
        demo: "#",
        video: "",
        gradient: "from-blue-500 to-purple-500",
        icon: "Code",
        images: [],
      }
      const manager = getContentManager()
      if (manager) {
        manager.addProject(editingLanguage, newProject)
        setContent(manager.getAllContent())
      }
    }
  }, [content, editingLanguage])

  const deleteProject = useCallback(
    (id: string) => {
      if (contentManager && confirm("Are you sure you want to delete this project?")) {
        const manager = getContentManager()
        if (manager) {
          manager.deleteProject(editingLanguage, id)
          setContent(manager.getAllContent())
        }
      }
    },
    [editingLanguage],
  )

  const addNewExperience = useCallback(() => {
    if (contentManager && content) {
      const newExperience: Experience = {
        id: `experience-${Date.now()}`,
        title: "New Position",
        company: "Company Name",
        period: "2025",
        location: "Location",
        description: ["Job responsibility"],
      }
      const manager = getContentManager()
      if (manager) {
        manager.addExperience(editingLanguage, newExperience)
        setContent(manager.getAllContent())
      }
    }
  }, [content, editingLanguage])

  const deleteExperience = useCallback(
    (id: string) => {
      if (contentManager && confirm("Are you sure you want to delete this experience?")) {
        const manager = getContentManager()
        if (manager) {
          manager.deleteExperience(editingLanguage, id)
          setContent(manager.getAllContent())
        }
      }
    },
    [editingLanguage],
  )

  const addNewEducation = useCallback(() => {
    if (contentManager && content) {
      const newEducation: Education = {
        id: `education-${Date.now()}`,
        degree: "New Degree",
        institution: "Institution Name",
        period: "2025",
        location: "Location",
      }
      const manager = getContentManager()
      if (manager) {
        manager.addEducation(editingLanguage, newEducation)
        setContent(manager.getAllContent())
      }
    }
  }, [content, editingLanguage])

  const deleteEducation = useCallback(
    (id: string) => {
      if (contentManager && confirm("Are you sure you want to delete this education?")) {
        const manager = getContentManager()
        if (manager) {
          manager.deleteEducation(editingLanguage, id)
          setContent(manager.getAllContent())
        }
      }
    },
    [editingLanguage],
  )

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800 border-slate-700">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-emerald-400" />
            </div>
            <CardTitle className="text-white">Admin Dashboard</CardTitle>
            <CardDescription className="text-slate-400">Enter password to access admin panel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <Button onClick={handleLogin} className="w-full bg-emerald-600 hover:bg-emerald-700">
              Access Dashboard
            </Button>
            <p className="text-xs text-slate-500 text-center">Demo password: admin123</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <div className="text-white">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  const currentContent = content?.[editingLanguage] || {
    personalInfo: {
      name: "Amine Hayouni",
      tagline: "Full-stack AI Developer",
      location: "Gafsa, Tunisia",
      heroDescription: "Loading...",
      email: "hayouniamine11@gmail.com",
      github: "#",
      linkedin: "#",
    },
    projects: [],
    experience: [],
    education: [],
    skills: {
      programmingLanguages: [],
      frameworksLibraries: [],
      databases: [],
      toolsTechnologies: [],
      aiMl: [],
    },
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-400">Portfolio management and analytics</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-sm">Editing Language:</span>
              <select
                value={editingLanguage}
                onChange={(e) => setEditingLanguage(e.target.value as "en" | "fr" | "ar")}
                className="bg-slate-800 border border-slate-600 text-white px-3 py-2 rounded-md text-sm min-w-[140px]"
              >
                <option value="en">🇬🇧 English</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="ar">🇹🇳 العربية</option>
              </select>
            </div>
            <Button onClick={() => setIsAuthenticated(false)} variant="outline">
              Logout
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800 border-slate-700">
            <TabsTrigger value="analytics" className="data-[state=active]:bg-emerald-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="personal" className="data-[state=active]:bg-emerald-600">
              <User className="w-4 h-4 mr-2" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-emerald-600">
              <FolderOpen className="w-4 h-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="experience" className="data-[state=active]:bg-emerald-600">
              <Briefcase className="w-4 h-4 mr-2" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:bg-emerald-600">
              <GraduationCap className="w-4 h-4 mr-2" />
              Education
            </TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {stats && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-400">Total Page Views</CardTitle>
                      <Eye className="h-4 w-4 text-blue-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{stats.pageViews}</div>
                      <p className="text-xs text-slate-400">{stats.todayPageViews} today</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-400">Session Duration</CardTitle>
                      <Clock className="h-4 w-4 text-green-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{formatDuration(stats.sessionDuration)}</div>
                      <p className="text-xs text-slate-400">Current session</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-400">Total Events</CardTitle>
                      <Activity className="h-4 w-4 text-purple-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{stats.totalEvents}</div>
                      <p className="text-xs text-slate-400">All interactions</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-400">Form Submissions</CardTitle>
                      <MessageSquare className="h-4 w-4 text-orange-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{stats.formSubmits}</div>
                      <p className="text-xs text-slate-400">Contact forms</p>
                    </CardContent>
                  </Card>
                </div>

                <Button
                  onClick={clearAnalytics}
                  variant="outline"
                  className="border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Analytics
                </Button>
              </>
            )}
          </TabsContent>

          {/* Personal Info Tab */}
          <TabsContent value="personal" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Personal Information</CardTitle>
                <CardDescription className="text-slate-400">
                  Edit your personal details for {editingLanguage.toUpperCase()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <EditableField
                  label="Name"
                  value={currentContent.personalInfo.name}
                  onChange={(val: string) => handlePersonalInfoUpdate("name", val)}
                  placeholder="Your name"
                />
                <EditableField
                  label="Tagline"
                  value={currentContent.personalInfo.tagline}
                  onChange={(val: string) => handlePersonalInfoUpdate("tagline", val)}
                  placeholder="Your tagline"
                />
                <EditableField
                  label="Location"
                  value={currentContent.personalInfo.location}
                  onChange={(val: string) => handlePersonalInfoUpdate("location", val)}
                  placeholder="Your location"
                />
                <EditableField
                  label="Email"
                  value={currentContent.personalInfo.email}
                  onChange={(val: string) => handlePersonalInfoUpdate("email", val)}
                  placeholder="Your email"
                />
                <EditableField
                  label="GitHub URL"
                  value={currentContent.personalInfo.github}
                  onChange={(val: string) => handlePersonalInfoUpdate("github", val)}
                  placeholder="GitHub profile URL"
                />
                <EditableField
                  label="LinkedIn URL"
                  value={currentContent.personalInfo.linkedin}
                  onChange={(val: string) => handlePersonalInfoUpdate("linkedin", val)}
                  placeholder="LinkedIn profile URL"
                />
                <EditableField
                  label="Hero Description"
                  value={currentContent.personalInfo.heroDescription}
                  onChange={(val: string) => handlePersonalInfoUpdate("heroDescription", val)}
                  placeholder="Your hero section description"
                  type="textarea"
                />
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Skills</CardTitle>
                <CardDescription className="text-slate-400">
                  Manage your technical skills for {editingLanguage.toUpperCase()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(currentContent.skills).map(([category, skills]) => (
                  <EditableField
                    key={category}
                    label={category.replace(/([A-Z])/g, " $1").trim()}
                    value={skills.join(", ")}
                    onChange={(val: string) =>
                      handleSkillsUpdate(
                        category,
                        val.split(", ").filter((s: string) => s.trim()),
                      )
                    }
                    placeholder="Separate skills with commas"
                  />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white">Projects</h3>
                <p className="text-slate-400 text-sm">Editing {editingLanguage.toUpperCase()} version</p>
              </div>
              <Button onClick={addNewProject} className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {currentContent.projects.map((project: any) => (
                <Card key={project.id} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white">{project.title}</CardTitle>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingProject(editingProject === project.id ? null : project.id)}
                          className="border-slate-600"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteProject(project.id)}
                          className="border-red-500 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  {editingProject === project.id && (
                    <CardContent className="space-y-4">
                      <EditableField
                        label="Title"
                        value={project.title}
                        onChange={(val: string) => handleProjectUpdate(project.id, "title", val)}
                        placeholder="Project title"
                      />
                      <EditableField
                        label="Description"
                        value={project.description}
                        onChange={(val: string) => handleProjectUpdate(project.id, "description", val)}
                        placeholder="Project description"
                        type="textarea"
                      />
                      <EditableField
                        label="Period"
                        value={project.period}
                        onChange={(val: string) => handleProjectUpdate(project.id, "period", val)}
                        placeholder="Project period"
                      />
                      <EditableField
                        label="GitHub URL"
                        value={project.github}
                        onChange={(val: string) => handleProjectUpdate(project.id, "github", val)}
                        placeholder="GitHub URL"
                      />
                      <EditableField
                        label="Demo URL"
                        value={project.demo}
                        onChange={(val: string) => handleProjectUpdate(project.id, "demo", val)}
                        placeholder="Demo URL"
                      />
                      <EditableField
                        label="Video URL"
                        value={project.video || ""}
                        onChange={(val: string) => handleProjectUpdate(project.id, "video", val)}
                        placeholder="YouTube or direct video link"
                      />
                      <EditableField
                        label="Technologies (comma separated)"
                        value={project.tech.join(", ")}
                        onChange={(val: string) =>
                          handleProjectUpdate(
                            project.id,
                            "tech",
                            val.split(", ").filter((t: string) => t.trim()),
                          )
                        }
                        placeholder="Separate with commas"
                      />
                      <EditableField
                        label="Project Images URLs (one per line, max 3)"
                        value={project.images?.join("\n") || ""}
                        onChange={(val: string) =>
                          handleProjectUpdate(
                            project.id,
                            "images",
                            val
                              .split("\n")
                              .filter((img: string) => img.trim() !== "")
                              .slice(0, 3),
                          )
                        }
                        placeholder="https://example.com/image1.jpg"
                        type="textarea"
                      />
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white">Work Experience</h3>
                <p className="text-slate-400 text-sm">Editing {editingLanguage.toUpperCase()} version</p>
              </div>
              <Button onClick={addNewExperience} className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {currentContent.experience.map((exp: any) => (
                <Card key={exp.id} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white">{exp.title}</CardTitle>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingExperience(editingExperience === exp.id ? null : exp.id)}
                          className="border-slate-600"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteExperience(exp.id)}
                          className="border-red-500 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  {editingExperience === exp.id && (
                    <CardContent className="space-y-4">
                      <EditableField
                        label="Job Title"
                        value={exp.title}
                        onChange={(val: string) => handleExperienceUpdate(exp.id, "title", val)}
                        placeholder="Job title"
                      />
                      <EditableField
                        label="Company"
                        value={exp.company}
                        onChange={(val: string) => handleExperienceUpdate(exp.id, "company", val)}
                        placeholder="Company name"
                      />
                      <EditableField
                        label="Period"
                        value={exp.period}
                        onChange={(val: string) => handleExperienceUpdate(exp.id, "period", val)}
                        placeholder="Period"
                      />
                      <EditableField
                        label="Location"
                        value={exp.location}
                        onChange={(val: string) => handleExperienceUpdate(exp.id, "location", val)}
                        placeholder="Location"
                      />
                      <EditableField
                        label="Responsibilities (one per line)"
                        value={exp.description.join("\n")}
                        onChange={(val: string) =>
                          handleExperienceUpdate(
                            exp.id,
                            "description",
                            val.split("\n").filter((d: string) => d.trim()),
                          )
                        }
                        placeholder="One per line"
                        type="textarea"
                      />
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white">Education</h3>
                <p className="text-slate-400 text-sm">Editing {editingLanguage.toUpperCase()} version</p>
              </div>
              <Button onClick={addNewEducation} className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Education
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {currentContent.education.map((edu: any) => (
                <Card key={edu.id} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white">{edu.degree}</CardTitle>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingEducation(editingEducation === edu.id ? null : edu.id)}
                          className="border-slate-600"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteEducation(edu.id)}
                          className="border-red-500 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  {editingEducation === edu.id && (
                    <CardContent className="space-y-4">
                      <EditableField
                        label="Degree"
                        value={edu.degree}
                        onChange={(val: string) => handleEducationUpdate(edu.id, "degree", val)}
                        placeholder="Degree"
                      />
                      <EditableField
                        label="Institution"
                        value={edu.institution}
                        onChange={(val: string) => handleEducationUpdate(edu.id, "institution", val)}
                        placeholder="Institution"
                      />
                      <EditableField
                        label="Period"
                        value={edu.period}
                        onChange={(val: string) => handleEducationUpdate(edu.id, "period", val)}
                        placeholder="Period"
                      />
                      <EditableField
                        label="Location"
                        value={edu.location}
                        onChange={(val: string) => handleEducationUpdate(edu.id, "location", val)}
                        placeholder="Location"
                      />
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
