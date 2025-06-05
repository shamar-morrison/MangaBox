"use client"

interface MangaCoverProps {
  src: string
  alt: string
  className?: string
}

export function MangaCover({ src, alt, className = "" }: MangaCoverProps) {
  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className={className}
      onError={(e) => {
        const target = e.target as HTMLImageElement
        target.src = "/placeholder.svg?height=400&width=300"
      }}
    />
  )
} 