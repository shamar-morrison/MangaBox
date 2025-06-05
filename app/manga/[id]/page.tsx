import { ChapterList } from "@/components/chapter-list"
import { Header } from "@/components/header"
import { MangaCover } from "@/components/manga-cover"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, BookOpen, Calendar } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface MangaPageProps {
  params: {
    id: string
  }
}

async function getMangaDetails(id: string) {
  try {
    const [mangaResponse, chaptersResponse] = await Promise.all([
      fetch(`https://api.mangadex.org/manga/${id}?includes[]=cover_art&includes[]=author&includes[]=artist`, {
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.mangadex.org/manga/${id}/feed?limit=500&order[chapter]=asc&order[volume]=asc&translatedLanguage[]=en&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica`, {
        next: { revalidate: 1800 },
      }),
    ])

    if (!mangaResponse.ok) {
      throw new Error(`Manga API responded with ${mangaResponse.status}`)
    }

    const mangaData = await mangaResponse.json()
    
    if (!chaptersResponse.ok) {
      console.warn(`Chapters API responded with ${chaptersResponse.status}`)
      return {
        manga: mangaData.data,
        chapters: [],
      }
    }

    const chaptersData = await chaptersResponse.json()

    return {
      manga: mangaData.data,
      chapters: chaptersData.data || [],
    }
  } catch (error) {
    console.error("Error fetching manga details:", error)
    return null
  }
}

export default async function MangaPage({ params }: MangaPageProps) {
  const data = await getMangaDetails(params.id)

  if (!data) {
    notFound()
  }

  const { manga, chapters } = data
  const title = manga.attributes.title.en || Object.values(manga.attributes.title)[0] || "Unknown Title"
  const description =
    manga.attributes.description.en || Object.values(manga.attributes.description)[0] || "No description available"
  const coverArt = manga.relationships.find((rel: any) => rel.type === "cover_art")
  const coverUrl = coverArt
    ? `/api/proxy-image?url=${encodeURIComponent(`https://uploads.mangadex.org/covers/${manga.id}/${coverArt.attributes?.fileName}`)}`
    : "/placeholder.svg?height=400&width=300"

  const author = manga.relationships.find((rel: any) => rel.type === "author")
  const artist = manga.relationships.find((rel: any) => rel.type === "artist")

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6 text-white hover:bg-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          <div className="space-y-4">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-0">
                <MangaCover
                  src={coverUrl || "/placeholder.svg"}
                  alt={title}
                  className="w-full h-auto rounded-lg"
                />
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Quick Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-600 text-white">{manga.attributes.status}</Badge>
                  <Badge variant="outline" className="border-gray-700 text-gray-300">
                    {manga.attributes.contentRating}
                  </Badge>
                </div>
                {manga.attributes.year && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="h-4 w-4" />
                    <span>{manga.attributes.year}</span>
                  </div>
                )}
                {author && (
                  <div className="text-gray-300">
                    <span className="font-medium">Author:</span> {author.attributes?.name || "Unknown"}
                  </div>
                )}
                {artist && artist.id !== author?.id && (
                  <div className="text-gray-300">
                    <span className="font-medium">Artist:</span> {artist.attributes?.name || "Unknown"}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                {title}
              </h1>
              <p className="text-gray-300 leading-relaxed">{description}</p>
            </div>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Chapters ({chapters.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <ChapterList chapters={chapters} mangaId={manga.id} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
