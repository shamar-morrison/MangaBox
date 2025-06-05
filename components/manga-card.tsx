"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface MangaCardProps {
  manga: {
    id: string
    attributes: {
      title: {
        en?: string
        [key: string]: string | undefined
      }
      description: {
        en?: string
        [key: string]: string | undefined
      }
      status: string
      year: number | null
      contentRating: string
    }
    relationships: Array<{
      type: string
      id: string
      attributes?: any
    }>
  }
}

export function MangaCard({ manga }: MangaCardProps) {
  const title = manga.attributes.title.en || Object.values(manga.attributes.title)[0] || "Unknown Title"
  const coverArt = manga.relationships.find((rel) => rel.type === "cover_art")
  const coverUrl = coverArt
    ? `/api/proxy-image?url=${encodeURIComponent(`https://uploads.mangadex.org/covers/${manga.id}/${coverArt.attributes?.fileName}`)}`
    : "/placeholder.svg?height=300&width=200"

  return (
    <Link href={`/manga/${manga.id}`}>
      <Card className="group cursor-pointer transition-all duration-300 hover:scale-105 bg-gray-800/50 border-gray-700 hover:border-purple-500 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={coverUrl || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=300&width=200"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-purple-600/80 text-white text-xs">
                {manga.attributes.status}
              </Badge>
            </div>
          </div>
          <div className="p-3">
            <h3 className="font-semibold text-white text-sm line-clamp-2 mb-1">{title}</h3>
            {manga.attributes.year && <p className="text-gray-400 text-xs">{manga.attributes.year}</p>}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
