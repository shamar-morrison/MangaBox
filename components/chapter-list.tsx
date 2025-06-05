import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, User } from "lucide-react"

interface Chapter {
  id: string
  attributes: {
    chapter: string | null
    title: string | null
    publishAt: string
    pages: number
  }
  relationships: Array<{
    type: string
    attributes?: {
      name?: string
    }
  }>
}

interface ChapterListProps {
  chapters: Chapter[]
  mangaId: string
}

export function ChapterList({ chapters, mangaId }: ChapterListProps) {
  if (chapters.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No chapters available</p>
      </div>
    )
  }

  return (
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {chapters.map((chapter) => {
        const chapterNumber = chapter.attributes.chapter || "Unknown"
        const chapterTitle = chapter.attributes.title || ""
        const scanlationGroup = chapter.relationships.find((rel) => rel.type === "scanlation_group")
        const publishDate = new Date(chapter.attributes.publishAt).toLocaleDateString()

        return (
          <Link key={chapter.id} href={`/manga/${mangaId}/chapter/${chapter.id}`}>
            <Button
              variant="ghost"
              className="w-full justify-start h-auto p-4 text-left hover:bg-gray-800/50 border border-transparent hover:border-purple-500/50"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-white">Chapter {chapterNumber}</span>
                  {chapterTitle && <span className="text-gray-400">- {chapterTitle}</span>}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {scanlationGroup && (
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{scanlationGroup.attributes?.name || "Unknown Group"}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{publishDate}</span>
                  </div>
                  <span>{chapter.attributes.pages} pages</span>
                </div>
              </div>
            </Button>
          </Link>
        )
      })}
    </div>
  )
}
