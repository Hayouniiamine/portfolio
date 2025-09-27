"use client"

interface AnalyticsEvent {
  type: "page_view" | "section_view" | "button_click" | "form_submit" | "language_change"
  data: {
    timestamp: number
    page?: string
    section?: string
    button?: string
    language?: string
    userAgent?: string
    referrer?: string
  }
}

class Analytics {
  private events: AnalyticsEvent[] = []
  private sessionId: string
  private startTime: number

  constructor() {
    this.sessionId = this.generateSessionId()
    this.startTime = Date.now()
    this.loadStoredEvents()
    this.trackPageView()
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  private loadStoredEvents() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("analytics_events")
      if (stored) {
        try {
          this.events = JSON.parse(stored)
        } catch (e) {
          this.events = []
        }
      }
    }
  }

  private saveEvents() {
    if (typeof window !== "undefined") {
      localStorage.setItem("analytics_events", JSON.stringify(this.events))
    }
  }

  track(type: AnalyticsEvent["type"], data: Partial<AnalyticsEvent["data"]> = {}) {
    const event: AnalyticsEvent = {
      type,
      data: {
        timestamp: Date.now(),
        userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "",
        referrer: typeof window !== "undefined" ? document.referrer : "",
        ...data,
      },
    }

    this.events.push(event)
    this.saveEvents()
  }

  trackPageView(page?: string) {
    this.track("page_view", {
      page: page || (typeof window !== "undefined" ? window.location.pathname : ""),
    })
  }

  trackSectionView(section: string) {
    this.track("section_view", { section })
  }

  trackButtonClick(button: string) {
    this.track("button_click", { button })
  }

  trackFormSubmit() {
    this.track("form_submit")
  }

  trackLanguageChange(language: string) {
    this.track("language_change", { language })
  }

  getStats() {
    const now = Date.now()
    const today = new Date().toDateString()

    const todayEvents = this.events.filter((event) => new Date(event.data.timestamp).toDateString() === today)

    const pageViews = this.events.filter((event) => event.type === "page_view").length
    const todayPageViews = todayEvents.filter((event) => event.type === "page_view").length

    const sectionViews = this.events.filter((event) => event.type === "section_view")
    const buttonClicks = this.events.filter((event) => event.type === "button_click")
    const formSubmits = this.events.filter((event) => event.type === "form_submit").length
    const languageChanges = this.events.filter((event) => event.type === "language_change")

    const sessionDuration = Math.floor((now - this.startTime) / 1000)

    // Most viewed sections
    const sectionCounts = sectionViews.reduce(
      (acc, event) => {
        const section = event.data.section || "unknown"
        acc[section] = (acc[section] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    // Most clicked buttons
    const buttonCounts = buttonClicks.reduce(
      (acc, event) => {
        const button = event.data.button || "unknown"
        acc[button] = (acc[button] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    // Language preferences
    const languageCounts = languageChanges.reduce(
      (acc, event) => {
        const language = event.data.language || "unknown"
        acc[language] = (acc[language] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return {
      sessionId: this.sessionId,
      sessionDuration,
      totalEvents: this.events.length,
      pageViews,
      todayPageViews,
      formSubmits,
      sectionViews: sectionCounts,
      buttonClicks: buttonCounts,
      languagePreferences: languageCounts,
      totalSessions: new Set(this.events.map((e) => e.data.timestamp)).size,
    }
  }

  getAllEvents() {
    return this.events
  }

  clearData() {
    this.events = []
    this.saveEvents()
  }
}

export const analytics = typeof window !== "undefined" ? new Analytics() : null
