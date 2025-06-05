import { notFound } from "next/navigation"
import { EnhancedChapterReader } from "@/components/enhanced-chapter-reader"

interface ChapterPageProps {
  params: {
    id: string
    chapterId: string
  }
}

async function getChapterData(chapterId: string) {
  try {
    const response = await fetch(`https://api.mangadex.org/at-home/server/${chapterId}`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching chapter data:", error)
    return null
  }
}

async function getChapterInfo(chapterId: string) {
  try {
    const response = await fetch(`https://api.mangadex.org/chapter/${chapterId}`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error("Error fetching chapter info:", error)
    return null
  }
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const [chapterData, chapterInfo] = await Promise.all([
    getChapterData(params.chapterId),
    getChapterInfo(params.chapterId),
  ])

  if (!chapterData || !chapterInfo) {
    notFound()
  }

  return <EnhancedChapterReader chapterData={chapterData} chapterInfo={chapterInfo} mangaId={params.id} />
}
