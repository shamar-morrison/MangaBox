import { OptimizedMangaCard } from "@/components/optimized-manga-card"

interface Manga {
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

async function getPopularManga(): Promise<Manga[]> {
  try {
    const response = await fetch(
      "https://api.mangadex.org/manga?limit=20&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive&includes[]=cover_art",
      { next: { revalidate: 3600 } },
    )

    if (!response.ok) {
      throw new Error("Failed to fetch manga")
    }

    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error("Error fetching manga:", error)
    return []
  }
}

export async function MangaGrid() {
  const manga = await getPopularManga()

  if (manga.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No manga found</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Popular Manga</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {manga.map((item) => (
          <OptimizedMangaCard key={item.id} manga={item} />
        ))}
      </div>
    </div>
  )
}
