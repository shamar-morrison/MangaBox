"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Home, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

interface EnhancedChapterReaderProps {
  chapterData: {
    baseUrl: string
    chapter: {
      hash: string
      data: string[]
      dataSaver: string[]
    }
  }
  chapterInfo: {
    id: string
    attributes: {
      chapter: string | null
      title: string | null
    }
  }
  mangaId: string
}

export function EnhancedChapterReader({ chapterData, chapterInfo, mangaId }: EnhancedChapterReaderProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [imageLoaded, setImageLoaded] = useState<boolean[]>([])
  const [imageErrors, setImageErrors] = useState<boolean[]>([])

  const pages = chapterData.chapter.data
  const baseUrl = chapterData.baseUrl
  const hash = chapterData.chapter.hash

  const chapterNumber = chapterInfo.attributes.chapter || "Unknown"
  const chapterTitle = chapterInfo.attributes.title || ""

  useEffect(() => {
    setImageLoaded(new Array(pages.length).fill(false))
    setImageErrors(new Array(pages.length).fill(false))
  }, [pages.length])

  const handleImageLoad = useCallback((index: number) => {
    setImageLoaded((prev) => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }, [])

  const handleImageError = useCallback((index: number) => {
    setImageErrors((prev) => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }, [])

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault()
        nextPage()
      } else if (event.key === "ArrowLeft") {
        event.preventDefault()
        prevPage()
      }
    },
    [currentPage, pages.length],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)
    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [handleKeyPress])

  // Use the chapter page API route
  const currentImageUrl = `/api/chapter-page?baseUrl=${encodeURIComponent(baseUrl)}&hash=${encodeURIComponent(hash)}&filename=${encodeURIComponent(pages[currentPage])}`

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/manga/${mangaId}`}>
                <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Manga
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                  <Home className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="text-center">
              <h1 className="text-white font-medium">
                Chapter {chapterNumber}
                {chapterTitle && ` - ${chapterTitle}`}
              </h1>
              <p className="text-gray-400 text-sm">
                Page {currentPage + 1} of {pages.length}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevPage}
                disabled={currentPage === 0}
                className="text-white hover:bg-gray-800 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextPage}
                disabled={currentPage === pages.length - 1}
                className="text-white hover:bg-gray-800 disabled:opacity-50"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Reader */}
      <div className="flex justify-center items-start min-h-[calc(100vh-80px)] p-4">
        <div className="relative max-w-4xl w-full">
          {!imageLoaded[currentPage] && !imageErrors[currentPage] && (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          )}

          {imageErrors[currentPage] ? (
            <div className="flex flex-col justify-center items-center h-96 text-white">
              <p className="text-lg mb-2 font-montserrat">Failed to load page {currentPage + 1}</p>
              <Button
                onClick={() => {
                  setImageErrors((prev) => {
                    const newState = [...prev]
                    newState[currentPage] = false
                    return newState
                  })
                  setImageLoaded((prev) => {
                    const newState = [...prev]
                    newState[currentPage] = false
                    return newState
                  })
                }}
                className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700"
              >
                Retry
              </Button>
            </div>
          ) : (
            <img
              src={currentImageUrl || "/placeholder.svg"}
              alt={`Page ${currentPage + 1}`}
              className={`w-full h-auto max-h-[90vh] object-contain mx-auto transition-opacity duration-300 ${
                imageLoaded[currentPage] ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => handleImageLoad(currentPage)}
              onError={() => handleImageError(currentPage)}
            />
          )}

          {/* Navigation overlays */}
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="absolute left-0 top-0 w-1/3 h-full bg-transparent hover:bg-black/10 transition-colors disabled:cursor-not-allowed"
            aria-label="Previous page"
          />
          <button
            onClick={nextPage}
            disabled={currentPage === pages.length - 1}
            className="absolute right-0 top-0 w-1/3 h-full bg-transparent hover:bg-black/10 transition-colors disabled:cursor-not-allowed"
            aria-label="Next page"
          />
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
        <Card className="bg-gray-900/95 backdrop-blur border-gray-800 p-2">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevPage}
              disabled={currentPage === 0}
              className="text-white hover:bg-gray-800 disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <span className="text-white text-sm px-3 font-montserrat">
              {currentPage + 1} / {pages.length}
            </span>

            <Button
              variant="ghost"
              size="sm"
              onClick={nextPage}
              disabled={currentPage === pages.length - 1}
              className="text-white hover:bg-gray-800 disabled:opacity-50"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
