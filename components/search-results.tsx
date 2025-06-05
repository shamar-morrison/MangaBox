import { OptimizedMangaCard } from "@/components/optimized-manga-card"

interface SearchResultsProps {
  query: string
}

async function searchManga(query: string) {
  if (!query.trim()) {
    return []
  }

  try {
    const response = await fetch(
      `https://api.mangadex.org/manga?title=${encodeURIComponent(query)}&limit=20&contentRating[]=safe&contentRating[]=suggestive&includes[]=cover_art`,
      { next: { revalidate: 1800 } },
    )

    if (!response.ok) {
      throw new Error("Failed to search manga")
    }

    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error("Error searching manga:", error)
    return []
  }
}

export async function SearchResults({ query }: SearchResultsProps) {
  if (!query.trim()) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">Enter a search term to find manga</p>
      </div>
    )
  }

  const results = await searchManga(query)

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No manga found for "{query}"</p>
        <p className="text-gray-500 mt-2">Try different keywords or check your spelling</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">
        Found {results.length} result{results.length !== 1 ? "s" : ""}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {results.map((manga) => (
          <OptimizedMangaCard key={manga.id} manga={manga} />
        ))}
      </div>
    </div>
  )
}
