"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"

interface MangaCoverProps {
  src: string
  alt: string
  className?: string
}

export function MangaCover({ src, alt, className = "" }: MangaCoverProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setError(true)
  }

  return (
    <div className={`relative ${className}`}>
      {/* Loading skeleton that maintains aspect ratio */}
      {isLoading && (
        <div className="absolute inset-0 z-10">
          <Skeleton className="w-full h-full bg-gray-800" />
        </div>
      )}
      
      {/* Actual image */}
      <img
        src={error ? "/placeholder.svg?height=400&width=300" : src || "/placeholder.svg"}
        alt={alt}
        className={`w-full h-auto transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        style={{ aspectRatio: '3/4' }} // Maintain consistent aspect ratio
      />
      
      {/* Fallback for extreme error cases */}
      {error && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-400">
          <div className="text-center">
            <div className="text-2xl mb-2">📚</div>
            <div className="text-sm">Cover not available</div>
          </div>
        </div>
      )}
    </div>
  )
} 