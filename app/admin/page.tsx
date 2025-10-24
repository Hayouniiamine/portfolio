"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Eye,
  MousePointer,
  MessageSquare,
  Clock,
  TrendingUp,
  Activity,
  Trash2,
  Edit3,
  Plus,
  User,
  Briefcase,
  GraduationCap,
  FolderOpen,
  Video,
  ImageIcon,
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
          // Initialize analytics
          if (analytics) {
            const updateStats = () => {
              setStats(analytics.getStats())
              setEvents(analytics.getAllEvents().slice(-50))
            }
            updateStats()
            const interval = setInterval(updateStats, 5000)

            // Initialize content manager
            const manager = getContentManager()
            if (manager) {
              setContent(manager.getAllContent())
            }

            setIsLoading(false)

            return () => clearInterval(interval)
          } else {
            // If analytics is not available, still load content
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

  const handleLogin = () => {
    if (password === "admin123") {
      setIsAuthenticated(true)
    } else {
      alert("Invalid password")
    }
  }

  const clearAnalytics = () => {
    if (analytics && confirm("Are you sure you want to clear all analytics data?")) {
      analytics.clearData()
      setStats(analytics.getStats())
      setEvents([])
    }
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  const handlePersonalInfoUpdate = (field: string, value: string) => {
    const manager = getContentManager()
    if (manager) {
      manager.updatePersonalInfo(editingLanguage, { [field]: value })
      setContent(manager.getAllContent())
    }
  }

  const handleSkillsUpdate = (category: string, skills: string[]) => {
    const manager = getContentManager()
    if (manager) {
      manager.updateSkills(editingLanguage, { [category]: skills })
      setContent(manager.getAllContent())
    }
  }

  const handleProjectUpdate = (id: string, field: string, value: any) => {
    const manager = getContentManager()
    if (manager) {
      manager.updateProject(editingLanguage, id, { [field]: value })
      setContent(manager.getAllContent())
    }
  }

  const handleExperienceUpdate = (id: string, field: string, value: any) => {
    const manager = getContentManager()
    if (manager) {
      manager.updateExperience(editingLanguage, id, { [field]: value })
      setContent(manager.getAllContent())
    }
  }

  const handleEducationUpdate = (id: string, field: string, value: any) => {
    const manager = getContentManager()
    if (manager) {
      manager.updateEducation(editingLanguage, id, { [field]: value })
      setContent(manager.getAllContent())
    }
  }

  const addNewProject = () => {
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
  }

  const deleteProject = (id: string) => {
    if (contentManager && confirm("Are you sure you want to delete this project?")) {
      const manager = getContentManager()
      if (manager) {
        manager.deleteProject(editingLanguage, id)
        setContent(manager.getAllContent())
      }
    }
  }

  const addNewExperience = () => {
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
  }

  const deleteExperience = (id: string) => {
    if (contentManager && confirm("Are you sure you want to delete this experience?")) {
      const manager = getContentManager()
      if (manager) {
        manager.deleteExperience(editingLanguage, id)
        setContent(manager.getAllContent())
      }
    }
  }

  const addNewEducation = () => {
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
  }

  const deleteEducation = (id: string) => {
    if (contentManager && confirm("Are you sure you want to delete this education?")) {
      const manager = getContentManager()
      if (manager) {
        manager.deleteEducation(editingLanguage, id)
        setContent(manager.getAllContent())
      }
    }
  }

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

  // Add fallback content if content is still null
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
            {/* Language Selector */}
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
                {/* Overview Stats */}
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Section Views */}
                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
                        Section Views
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(stats.sectionViews).map(([section, count]) => (
                          <div key={section} className="flex justify-between items-center">
                            <span className="text-slate-300 capitalize">{section}</span>
                            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                              {count}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Button Clicks */}
                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <MousePointer className="w-5 h-5 mr-2 text-green-400" />
                        Button Clicks
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(stats.buttonClicks).map(([button, count]) => (
                          <div key={button} className="flex justify-between items-center">
                            <span className="text-slate-300">{button}</span>
                            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                              {count}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={clearAnalytics}
                    variant="outline"
                    className="border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Analytics
                  </Button>
                </div>
              </>
            )}
          </TabsContent>

          {/* Personal Info Tab */}
          <TabsContent value="personal" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Personal Information</CardTitle>
                <CardDescription className="text-slate-400">
                  Edit your personal details and hero section for {editingLanguage.toUpperCase()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Name</Label>
                    <Input
                      value={currentContent.personalInfo.name}
                      onChange={(e) => handlePersonalInfoUpdate("name", e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Tagline</Label>
                    <Input
                      value={currentContent.personalInfo.tagline}
                      onChange={(e) => handlePersonalInfoUpdate("tagline", e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Location</Label>
                    <Input
                      value={currentContent.personalInfo.location}
                      onChange={(e) => handlePersonalInfoUpdate("location", e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Email</Label>
                    <Input
                      value={currentContent.personalInfo.email}
                      onChange={(e) => handlePersonalInfoUpdate("email", e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">GitHub URL</Label>
                    <Input
                      value={currentContent.personalInfo.github}
                      onChange={(e) => handlePersonalInfoUpdate("github", e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">LinkedIn URL</Label>
                    <Input
                      value={currentContent.personalInfo.linkedin}
                      onChange={(e) => handlePersonalInfoUpdate("linkedin", e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Hero Description</Label>
                  <Textarea
                    value={currentContent.personalInfo.heroDescription}
                    onChange={(e) => handlePersonalInfoUpdate("heroDescription", e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Skills</CardTitle>
                <CardDescription className="text-slate-400">
                  Manage your technical skills by category for {editingLanguage.toUpperCase()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(currentContent.skills).map(([category, skills]) => (
                  <div key={category} className="space-y-2">
                    <Label className="text-slate-300 capitalize">{category.replace(/([A-Z])/g, " $1").trim()}</Label>
                    <Input
                      value={skills.join(", ")}
                      onChange={(e) =>
                        handleSkillsUpdate(
                          category,
                          e.target.value.split(", ").filter((s) => s.trim()),
                        )
                      }
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Separate skills with commas"
                    />
                  </div>
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
              {currentContent.projects.map((project) => (
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-slate-300">Title</Label>
                          <Input
                            value={project.title}
                            onChange={(e) => handleProjectUpdate(project.id, "title", e.target.value)}
                            className="bg-slate-700 border-slate-600 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-300">Period</Label>
                          <Input
                            value={project.period}
                            onChange={(e) => handleProjectUpdate(project.id, "period", e.target.value)}
                            className="bg-slate-700 border-slate-600 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-300">GitHub URL</Label>
                          <Input
                            value={project.github}
                            onChange={(e) => handleProjectUpdate(project.id, "github", e.target.value)}
                            className="bg-slate-700 border-slate-600 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-300">Demo URL</Label>
                          <Input
                            value={project.demo}
                            onChange={(e) => handleProjectUpdate(project.id, "demo", e.target.value)}
                            className="bg-slate-700 border-slate-600 text-white"
                          />
                        </div>
                      </div>

                      {/* Project Images Slideshow */}
                      <div className="space-y-3 border-t border-slate-600 pt-4">
                        <Label className="text-slate-300 flex items-center gap-2">
                          <ImageIcon className="w-4 h-4" />
                          Project Images (Up to 3 images for slideshow)
                        </Label>
                        <p className="text-xs text-slate-400">
                          Enter image URLs separated by line breaks (max 3 images)
                        </p>
                        <Textarea
                          value={project.images?.join("\n") || ""}
                          onChange={(e) =>
                            handleProjectUpdate(
                              project.id,
                              "images",
                              e.target.value
                                .split("\n")
                                .filter((img) => img.trim() !== "")
                                .slice(0, 3),
                            )
                          }
                          className="bg-slate-700 border-slate-600 text-white font-mono text-sm"
                          rows={4}
                          placeholder="https://example.com/image1.jpg
https://example.com/image2.jpg
https://example.com/image3.jpg"
                        />
                        <div className="bg-slate-700/50 p-3 rounded text-xs text-slate-300">
                          <p className="font-medium mb-1">📝 Usage Tips:</p>
                          <ul className="list-disc list-inside space-y-1">
                            <li>Add image URLs one per line</li>
                            <li>Maximum 3 images per project</li>
                            <li>Use direct image URLs (jpg, png, etc.)</li>
                            <li>Images will auto-rotate every 5 seconds</li>
                          </ul>
                        </div>
                        {project.images && project.images.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-xs text-emerald-400">✓ {project.images.length} image(s) added</p>
                            <div className="grid grid-cols-3 gap-2">
                              {project.images.map((img, idx) => (
                                <div
                                  key={idx}
                                  className="w-full h-20 bg-slate-600 rounded border border-slate-500 flex items-center justify-center text-xs text-slate-400 overflow-hidden"
                                >
                                  {img ? (
                                    <img
                                      src={img || "/placeholder.svg"}
                                      alt={`Preview ${idx + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <span>Empty</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Video Section */}
                      <div className="space-y-2 border-t border-slate-600 pt-4">
                        <Label className="text-slate-300 flex items-center gap-2">
                          <Video className="w-4 h-4" />
                          Video URL (YouTube or direct video file)
                        </Label>
                        <Input
                          value={project.video || ""}
                          onChange={(e) => handleProjectUpdate(project.id, "video", e.target.value)}
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="https://youtube.com/watch?v=... or https://example.com/video.mp4"
                        />
                        <p className="text-xs text-slate-400">Supports YouTube URLs and direct video file links</p>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-slate-300">Description</Label>
                        <Textarea
                          value={project.description}
                          onChange={(e) => handleProjectUpdate(project.id, "description", e.target.value)}
                          className="bg-slate-700 border-slate-600 text-white"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300">Technologies</Label>
                        <Input
                          value={project.tech.join(", ")}
                          onChange={(e) =>
                            handleProjectUpdate(
                              project.id,
                              "tech",
                              e.target.value.split(", ").filter((t) => t.trim()),
                            )
                          }
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="Separate technologies with commas"
                        />
                      </div>
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
              {currentContent.experience.map((exp) => (
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-slate-300">Job Title</Label>
                          <Input
                            value={exp.title}
                            onChange={(e) => handleExperienceUpdate(exp.id, "title", e.target.value)}
                            className="bg-slate-700 border-slate-600 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-300">Company</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => handleExperienceUpdate(exp.id, "company", e.target.value)}
                            className="bg-slate-700 border-slate-600 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-300">Period</Label>
                          <Input
                            value={exp.period}
                            onChange={(e) => handleExperienceUpdate(exp.id, "period", e.target.value)}
                            className="bg-slate-700 border-slate-600 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-300">Location</Label>
                          <Input
                            value={exp.location}
                            onChange={(e) => handleExperienceUpdate(exp.id, "location", e.target.value)}
                            className="bg-slate-700 border-slate-600 text-white"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300">Job Description (one per line)</Label>
                        <Textarea
                          value={exp.description.join("\n")}
                          onChange={(e) =>
                            handleExperienceUpdate(
                              exp.id,
                              "description",
                              e.target.value.split("\n").filter((d) => d.trim()),
                            )
                          }
                          className="bg-slate-700 border-slate-600 text-white"
                          rows={4}
                          placeholder="Enter each responsibility on a new line"
                        />
                      </div>
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
              {currentContent.education.map((edu) => (
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-slate-300">Degree</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) => handleEducationUpdate(edu.id, "degree", e.target.value)}
                            className="bg-slate-700 border-slate-600 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-300">Institution</Label>
                          <Input
                            value={edu.institution}
                            onChange={(e) => handleEducationUpdate(edu.id, "institution", e.target.value)}
                            className="bg-slate-700 border-slate-600 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-300">Period</Label>
                          <Input
                            value={edu.period}
                            onChange={(e) => handleEducationUpdate(edu.id, "period", e.target.value)}
                            className="bg-slate-700 border-slate-600 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-300">Location</Label>
                          <Input
                            value={edu.location}
                            onChange={(e) => handleEducationUpdate(edu.id, "location", e.target.value)}
                            className="bg-slate-700 border-slate-600 text-white"
                          />
                        </div>
                      </div>
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
