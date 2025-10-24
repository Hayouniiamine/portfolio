"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react"

interface ProjectSlideshowProps {
  images: string[]
  title: string
}

export default function ProjectSlideshow({ images, title }: ProjectSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  // Filter out empty images
  const validImages = images.filter((img) => img && img.trim() !== "")

  useEffect(() => {
    if (!isAutoPlay || validImages.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % validImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, validImages.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length)
    setIsAutoPlay(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % validImages.length)
    setIsAutoPlay(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlay(false)
  }

  // If no images, show placeholder
  if (validImages.length === 0) {
    return (
      <div className="w-full bg-slate-700 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
        <div className="text-center">
          <ImageIcon className="w-12 h-12 text-slate-500 mx-auto mb-2" />
          <p className="text-slate-400 text-sm">No project images</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full rounded-lg overflow-hidden bg-slate-700">
      {/* Main Slideshow */}
      <div className="relative aspect-video bg-slate-800 overflow-hidden group">
        {/* Images */}
        <div className="relative w-full h-full">
          {validImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`${title} - Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {validImages.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
            {currentIndex + 1} / {validImages.length}
          </div>
        )}
      </div>

      {/* Indicator Dots */}
      {validImages.length > 1 && (
        <div className="flex justify-center items-center gap-2 p-3 bg-slate-800">
          {validImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-emerald-500 w-6" : "bg-slate-600 hover:bg-slate-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
