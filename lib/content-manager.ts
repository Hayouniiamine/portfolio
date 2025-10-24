"use client"

export interface PersonalInfo {
  name: string
  tagline: string
  location: string
  heroDescription: string
  email: string
  github: string
  linkedin: string
}

export interface Project {
  id: string
  title: string
  description: string
  period: string
  tech: string[]
  github: string
  demo: string
  video?: string
  images: string[] // Added images field
  gradient: string
  icon: string
}

export interface Experience {
  id: string
  title: string
  company: string
  period: string
  location: string
  description: string[]
}

export interface Education {
  id: string
  degree: string
  institution: string
  period: string
  location: string
}

export interface Skills {
  programmingLanguages: string[]
  frameworksLibraries: string[]
  databases: string[]
  toolsTechnologies: string[]
  aiMl: string[]
}

export interface MultiLanguageContent {
  en: PortfolioContent
  fr: PortfolioContent
  ar: PortfolioContent
}

export interface PortfolioContent {
  personalInfo: PersonalInfo
  projects: Project[]
  experience: Experience[]
  education: Education[]
  skills: Skills
}

const defaultContent: MultiLanguageContent = {
  en: {
    personalInfo: {
      name: "Amine Hayouni",
      tagline: "Full-stack Developer",
      location: "Gafsa, Tunisia",
      heroDescription:
        "Third-year Computer Science student and junior full-stack developer. Skilled in Python, Flask, React, JavaScript, SQL, and REST APIs. Experienced in AI and IoT-based projects with strong problem-solving and software design abilities.",
      email: "hayouniamine11@gmail.com",
      github: "github.com/Hayouniiamine",
      linkedin: "linkedin.com/in/amin-hayouni-419482351",
    },
    projects: [
      {
        id: "iot-radar",
        title: "IoT Radar Simulation",
        description:
          "Built IoT radar using ESP32 for real-time object detection and tracking. Integrated ultrasonic sensors and a live web dashboard with defense response algorithms simulation.",
        period: "Mar 2024 - Jun 2024",
        tech: ["ESP32", "Ultrasonic Sensors", "IoT", "Web Dashboard", "Real-time Detection"],
        github: "#",
        demo: "#",
        video: "",
        images: [],
        gradient: "from-blue-500 to-indigo-500",
        icon: "Code",
      },
      {
        id: "mooder-ai",
        title: "Mooder AI",
        description:
          "AI web app detecting emotions via facial recognition to generate Spotify playlists. Implemented TensorFlow, Keras, and DeepFace; deployed via Flask and face-api.js.",
        period: "Jan 2025 - Mar 2025",
        tech: ["TensorFlow", "Keras", "DeepFace", "Flask", "face-api.js", "Spotify API"],
        github: "#",
        demo: "#",
        video: "",
        images: [],
        gradient: "from-purple-500 to-pink-500",
        icon: "Brain",
      },
      {
        id: "souktek-shop",
        title: "Souktek.shop",
        description:
          "Full-stack e-commerce platform with shopping cart, secure checkout, and comprehensive admin dashboard. Built with React, Node.js, Express, and PostgreSQL.",
        period: "Mar 2025 - Apr 2025",
        tech: ["React", "Node.js", "Express", "PostgreSQL", "REST APIs"],
        github: "#",
        demo: "#",
        video: "",
        images: [],
        gradient: "from-emerald-500 to-cyan-500",
        icon: "ShoppingCart",
      },
    ],
    experience: [
      {
        id: "software-intern",
        title: "Software Development Intern",
        company: "La Poste Tunisienne",
        period: "Jun 2024 - Sep 2024",
        location: "Tunis, Tunisia",
        description: [
          "Assisted IT team in developing and maintaining internal web applications",
          "Contributed to debugging and improving legacy systems using Python and SQL",
          "Participated in digitization of service workflows to optimize document handling",
          "Gained exposure to enterprise-level system architecture",
        ],
      },
    ],
    education: [
      {
        id: "bsc-computer",
        degree: "BSc in Computer Science",
        institution: "Faculty of Sciences of Gafsa",
        period: "Sep 2023 - Present",
        location: "Gafsa, Tunisia",
      },
      {
        id: "baccalaureate",
        degree: "Baccalaureate - Experimental Sciences",
        institution: "Avicenna Private School",
        period: "Jun 2023",
        location: "Gafsa, Tunisia",
      },
    ],
    skills: {
      programmingLanguages: ["Python", "JavaScript", "TypeScript", "C", "Java", "SQL", "PL/SQL", "HTML", "CSS"],
      frameworksLibraries: [
        "React",
        "React Native",
        "Next.js",
        "Node.js",
        "Express.js",
        "Flask",
        "Bootstrap",
        "Tailwind CSS",
        "Redux",
      ],
      databases: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "SQLite"],
      toolsTechnologies: [
        "Git",
        "GitHub",
        "Docker",
        "Linux",
        "VS Code",
        "REST APIs",
        "GraphQL",
        "Postman",
        "npm",
        "Web Management",
        "Responsive Design",
        "Software Design Patterns",
      ],
      aiMl: [
        "TensorFlow",
        "Keras",
        "DeepFace",
        "PyTorch",
        "Scikit-learn",
        "Computer Vision",
        "Face Recognition",
        "Emotion Detection",
        "Neural Networks",
        "Deep Learning",
      ],
    },
  },
  fr: {
    personalInfo: {
      name: "Amine Hayouni",
      tagline: "Développeur Full-Stack IA",
      location: "Gafsa, Tunisie",
      heroDescription:
        "Étudiant passionné en informatique avec une expérience pratique en développement web full-stack et intégration de l'IA. Je conçois des solutions innovantes avec des technologies modernes.",
      email: "hayouniamine11@gmail.com",
      github: "#",
      linkedin: "#",
    },
    projects: [
      {
        id: "mooder-ai",
        title: "Mooder AI",
        description:
          "Expérience musicale alimentée par l'IA qui détecte les émotions des utilisateurs grâce à la reconnaissance faciale et génère des playlists Spotify basées sur l'analyse d'humeur en temps réel.",
        period: "Jan 2025 - Mar 2025",
        tech: ["TensorFlow", "Keras", "DeepFace", "Flask", "face-api.js", "Spotify API"],
        github: "#",
        demo: "#",
        video: "",
        images: [], // Added images field
        gradient: "from-purple-500 to-pink-500",
        icon: "Brain",
      },
      {
        id: "digishop",
        title: "Constructeur Digishop",
        description:
          "Plateforme e-commerce full-stack avec navigation de produits, fonctionnalité de panier d'achat, paiement sécurisé et outils d'administration complets.",
        period: "Mar 2025 - Avr 2025",
        tech: ["React.js", "Node.js", "Express", "PostgreSQL", "REST APIs"],
        github: "#",
        demo: "#",
        video: "",
        images: [], // Added images field
        gradient: "from-emerald-500 to-cyan-500",
        icon: "ShoppingCart",
      },
      {
        id: "laposte",
        title: "Solutions numériques La Poste",
        description:
          "Contribution aux applications web internes pour les opérations de services postaux, en me concentrant sur la numérisation des flux de travail et l'optimisation des systèmes.",
        period: "Juin 2024 - Sep 2024",
        tech: ["Python", "SQL", "Web Development", "System Architecture"],
        github: "#",
        demo: "#",
        video: "",
        images: [], // Added images field
        gradient: "from-blue-500 to-indigo-500",
        icon: "Code",
      },
      {
        id: "portfolio",
        title: "Site portfolio",
        description:
          "Site portfolio moderne et responsive construit avec Next.js, offrant un support multilingue, des analyses et des performances optimisées.",
        period: "2025",
        tech: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
        github: "#",
        demo: "#",
        video: "",
        images: [], // Added images field
        gradient: "from-orange-500 to-red-500",
        icon: "Sparkles",
      },
    ],
    experience: [
      {
        id: "laposte-intern",
        title: "Stagiaire en développement logiciel",
        company: "La Poste Tunisienne",
        period: "Juin 2024 - Sep 2024",
        location: "Tunis",
        description: [
          "Assistance à l'équipe informatique dans le développement et la maintenance d'applications web internes",
          "Contribution au débogage et à l'amélioration des systèmes existants en utilisant Python et SQL",
          "Participation à la numérisation des flux de travail pour optimiser le traitement des documents",
          "Exposition à l'architecture de systèmes de niveau entreprise",
        ],
      },
    ],
    education: [
      {
        id: "bsc-computer",
        degree: "Licence en informatique",
        institution: "Faculté des sciences de Gafsa",
        period: "Sep 2023 - Présent",
        location: "Gafsa, Tunisie",
      },
      {
        id: "baccalaureate",
        degree: "Baccalauréat - Sciences expérimentales",
        institution: "École privée Avicenne",
        period: "Jun 2023",
        location: "Gafsa, Tunisie",
      },
    ],
    skills: {
      programmingLanguages: ["Python", "JavaScript", "TypeScript", "C", "Java", "SQL", "PL/SQL", "HTML", "CSS"],
      frameworksLibraries: [
        "React",
        "React Native",
        "Next.js",
        "Node.js",
        "Express.js",
        "Flask",
        "Bootstrap",
        "Tailwind CSS",
        "Redux",
      ],
      databases: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "SQLite"],
      toolsTechnologies: [
        "Git",
        "GitHub",
        "Docker",
        "Linux",
        "VS Code",
        "REST APIs",
        "GraphQL",
        "Postman",
        "npm",
        "Web Management",
        "Responsive Design",
        "Software Design Patterns",
      ],
      aiMl: [
        "TensorFlow",
        "Keras",
        "DeepFace",
        "PyTorch",
        "Scikit-learn",
        "Computer Vision",
        "Face Recognition",
        "Emotion Detection",
        "Neural Networks",
        "Deep Learning",
      ],
    },
  },
  ar: {
    personalInfo: {
      name: "أمين حيوني",
      tagline: "مطور ذكاء اصطناعي متكامل",
      location: "قفصة، تونس",
      heroDescription:
        "طالب شغوف في علوم الحاسوب مع خبرة عملية في تطوير الويب المتكامل ودمج الذكاء الاصطناعي. أقوم ببناء حلول مبتكرة باستخدام التقنيات الحديثة.",
      email: "hayouniamine11@gmail.com",
      github: "#",
      linkedin: "#",
    },
    projects: [
      {
        id: "mooder-ai",
        title: "مودر AI",
        description:
          "تجربة موسيقية مدعومة بالذكاء الاصطناعي تكتشف مشاعر المستخدمين من خلال التعرف على الوجه وتولد قوائم تشغيل Spotify بناءً على تحليل المزاج في الوقت الفعلي.",
        period: "يناير 2025 - مارس 2025",
        tech: ["TensorFlow", "Keras", "DeepFace", "Flask", "face-api.js", "Spotify API"],
        github: "#",
        demo: "#",
        video: "",
        images: [], // Added images field
        gradient: "from-purple-500 to-pink-500",
        icon: "Brain",
      },
      {
        id: "digishop",
        title: "منشئ ديجي شوب",
        description:
          "منصة تجارة إلكترونية متكاملة مع تصفح المنتجات ووظائف سلة التسوق والدفع الآمن وأدوات الإدارة الشاملة.",
        period: "مارس 2025 - أبريل 2025",
        tech: ["React.js", "Node.js", "Express", "PostgreSQL", "REST APIs"],
        github: "#",
        demo: "#",
        video: "",
        images: [], // Added images field
        gradient: "from-emerald-500 to-cyan-500",
        icon: "ShoppingCart",
      },
      {
        id: "laposte",
        title: "الحلول الرقمية للبريد",
        description:
          "المساهمة في تطبيقات الويب الداخلية لعمليات الخدمات البريدية، مع التركيز على رقمنة سير العمل وتحسين الأنظمة.",
        period: "يونيو 2024 - سبتمبر 2024",
        tech: ["Python", "SQL", "Web Development", "System Architecture"],
        github: "#",
        demo: "#",
        video: "",
        images: [], // Added images field
        gradient: "from-blue-500 to-indigo-500",
        icon: "Code",
      },
      {
        id: "portfolio",
        title: "موقع المحفظة الشخصية",
        description: "موقع محفظة حديث ومتجاوب مبني بـ Next.js، يتميز بالدعم متعدد اللغات والتحليلات والأداء المحسن.",
        period: "2025",
        tech: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
        github: "#",
        demo: "#",
        video: "",
        images: [], // Added images field
        gradient: "from-orange-500 to-red-500",
        icon: "Sparkles",
      },
    ],
    experience: [
      {
        id: "laposte-intern",
        title: "متدرب تطوير البرمجيات",
        company: "البريد التونسي",
        period: "يونيو 2024 - سبتمبر 2024",
        location: "تونس",
        description: [
          "مساعدة فريق تكنولوجيا المعلومات في تطوير وصيانة تطبيقات الويب الداخلية",
          "المساهمة في تصحيح وتحسين الأنظمة الموجودة باستخدام Python و SQL",
          "المشاركة في رقمنة سير العمل لتحسين معالجة المستندات",
          "التعرض لهندسة الأنظمة على مستوى المؤسسة",
        ],
      },
    ],
    education: [
      {
        id: "bsc-computer",
        degree: "بكالوريوس في علوم الحاسوب",
        institution: "كلية العلوم بقفصة",
        period: "سبتمبر 2023 - الحاضر",
        location: "قفصة، تونس",
      },
      {
        id: "baccalaureate",
        degree: "البكالوريا - العلوم التجريبية",
        institution: "مدرسة ابن سينا الخاصة",
        period: "يونيو 2023",
        location: "قفصة، تونس",
      },
    ],
    skills: {
      programmingLanguages: ["Python", "JavaScript", "TypeScript", "C", "Java", "SQL", "PL/SQL", "HTML", "CSS"],
      frameworksLibraries: [
        "React",
        "React Native",
        "Next.js",
        "Node.js",
        "Express.js",
        "Flask",
        "Bootstrap",
        "Tailwind CSS",
        "Redux",
      ],
      databases: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "SQLite"],
      toolsTechnologies: [
        "Git",
        "GitHub",
        "Docker",
        "Linux",
        "VS Code",
        "REST APIs",
        "GraphQL",
        "Postman",
        "npm",
        "Web Management",
        "Responsive Design",
        "Software Design Patterns",
      ],
      aiMl: [
        "TensorFlow",
        "Keras",
        "DeepFace",
        "PyTorch",
        "Scikit-learn",
        "Computer Vision",
        "Face Recognition",
        "Emotion Detection",
        "Neural Networks",
        "Deep Learning",
      ],
    },
  },
}

class ContentManager {
  private content: MultiLanguageContent
  private initialized = false

  constructor() {
    this.content = defaultContent
    this.initialize()
  }

  private initialize() {
    if (typeof window !== "undefined" && !this.initialized) {
      this.content = this.loadContent()
      this.initialized = true
    }
  }

  private loadContent(): MultiLanguageContent {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("portfolio_content_multilang")
      if (stored) {
        try {
          return { ...defaultContent, ...JSON.parse(stored) }
        } catch (e) {
          console.error("Error loading content:", e)
        }
      }
    }
    return defaultContent
  }

  private saveContent() {
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_content_multilang", JSON.stringify(this.content))
    }
  }

  getContent(language: "en" | "fr" | "ar" = "en"): PortfolioContent {
    if (!this.initialized) {
      this.initialize()
    }
    return this.content[language]
  }

  getAllContent(): MultiLanguageContent {
    if (!this.initialized) {
      this.initialize()
    }
    return this.content
  }

  updatePersonalInfo(language: "en" | "fr" | "ar", info: Partial<PersonalInfo>) {
    this.content[language].personalInfo = { ...this.content[language].personalInfo, ...info }
    this.saveContent()
    this.notifyUpdate()
  }

  updateProject(language: "en" | "fr" | "ar", id: string, project: Partial<Project>) {
    const index = this.content[language].projects.findIndex((p) => p.id === id)
    if (index !== -1) {
      this.content[language].projects[index] = { ...this.content[language].projects[index], ...project }
    }
    this.saveContent()
    this.notifyUpdate()
  }

  updateExperience(language: "en" | "fr" | "ar", id: string, experience: Partial<Experience>) {
    const index = this.content[language].experience.findIndex((e) => e.id === id)
    if (index !== -1) {
      this.content[language].experience[index] = { ...this.content[language].experience[index], ...experience }
    }
    this.saveContent()
    this.notifyUpdate()
  }

  updateEducation(language: "en" | "fr" | "ar", id: string, education: Partial<Education>) {
    const index = this.content[language].education.findIndex((e) => e.id === id)
    if (index !== -1) {
      this.content[language].education[index] = { ...this.content[language].education[index], ...education }
    }
    this.saveContent()
    this.notifyUpdate()
  }

  updateSkills(language: "en" | "fr" | "ar", skills: Partial<Skills>) {
    this.content[language].skills = { ...this.content[language].skills, ...skills }
    this.saveContent()
    this.notifyUpdate()
  }

  addProject(language: "en" | "fr" | "ar", project: Project) {
    this.content[language].projects.push(project)
    this.saveContent()
    this.notifyUpdate()
  }

  deleteProject(language: "en" | "fr" | "ar", id: string) {
    this.content[language].projects = this.content[language].projects.filter((p) => p.id !== id)
    this.saveContent()
    this.notifyUpdate()
  }

  addExperience(language: "en" | "fr" | "ar", experience: Experience) {
    this.content[language].experience.push(experience)
    this.saveContent()
    this.notifyUpdate()
  }

  deleteExperience(language: "en" | "fr" | "ar", id: string) {
    this.content[language].experience = this.content[language].experience.filter((e) => e.id !== id)
    this.saveContent()
    this.notifyUpdate()
  }

  addEducation(language: "en" | "fr" | "ar", education: Education) {
    this.content[language].education.push(education)
    this.saveContent()
    this.notifyUpdate()
  }

  deleteEducation(language: "en" | "fr" | "ar", id: string) {
    this.content[language].education = this.content[language].education.filter((e) => e.id !== id)
    this.saveContent()
    this.notifyUpdate()
  }

  private notifyUpdate() {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("contentUpdated"))
    }
  }

  resetToDefaults() {
    this.content = defaultContent
    this.saveContent()
    this.notifyUpdate()
  }
}

// Create a function to get the content manager instance
export const getContentManager = (): ContentManager | null => {
  if (typeof window !== "undefined") {
    if (!window.contentManagerInstance) {
      window.contentManagerInstance = new ContentManager()
    }
    return window.contentManagerInstance
  }
  return null
}

// Add type declaration for window
declare global {
  interface Window {
    contentManagerInstance?: ContentManager
  }
}

export const contentManager = getContentManager()
