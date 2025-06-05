import { OptimizedMangaCard } from "@/components/optimized-manga-card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Clock, Sparkles, Star, TrendingUp } from "lucide-react"
import Link from "next/link"

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

interface MangaCategory {
  title: string
  icon: React.ReactNode
  endpoint: string
  description: string
}

const categories: MangaCategory[] = [
  {
    title: "Popular Manga",
    icon: <TrendingUp className="h-5 w-5" />,
    endpoint: "https://api.mangadex.org/manga?limit=10&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive&includes[]=cover_art",
    description: "Most followed manga on MangaDx"
  },
  {
    title: "Recently Updated",
    icon: <Clock className="h-5 w-5" />,
    endpoint: "https://api.mangadex.org/manga?limit=10&order[updatedAt]=desc&contentRating[]=safe&contentRating[]=suggestive&includes[]=cover_art",
    description: "Latest updates from ongoing series"
  },
  {
    title: "Highest Rated",
    icon: <Star className="h-5 w-5" />,
    endpoint: "https://api.mangadex.org/manga?limit=10&order[rating]=desc&contentRating[]=safe&contentRating[]=suggestive&includes[]=cover_art",
    description: "Top-rated manga by the community"
  },
  {
    title: "Newest Additions",
    icon: <Sparkles className="h-5 w-5" />,
    endpoint: "https://api.mangadex.org/manga?limit=10&order[createdAt]=desc&contentRating[]=safe&contentRating[]=suggestive&includes[]=cover_art",
    description: "Fresh manga just added to MangaDx"
  }
]

async function fetchMangaByCategory(endpoint: string): Promise<Manga[]> {
  try {
    const response = await fetch(endpoint, { 
      next: { revalidate: 1800 } // 30 minutes cache
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch manga: ${response.status}`)
    }

    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error("Error fetching manga category:", error)
    return []
  }
}

async function MangaCategorySection({ category }: { category: MangaCategory }) {
  const manga = await fetchMangaByCategory(category.endpoint)

  if (manga.length === 0) {
    return null
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-white">
            {category.icon}
            <h2 className="text-2xl font-bold">{category.title}</h2>
          </div>
          <span className="text-gray-400 text-sm hidden md:block">
            {category.description}
          </span>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm"
          className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
          asChild
        >
          <Link href={`/category/${encodeURIComponent(category.title.toLowerCase().replace(/\s+/g, '-'))}`}>
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
        {manga.map((item) => (
          <OptimizedMangaCard key={item.id} manga={item} />
        ))}
      </div>
    </section>
  )
}

export async function MultiCategoryMangaGrid() {
  return (
    <div className="space-y-8">
      {categories.map((category, index) => (
        <MangaCategorySection key={index} category={category} />
      ))}
      
      {/* Call to action */}
      <section className="text-center py-12 bg-gradient-to-r from-purple-900/20 to-fuchsia-900/20 rounded-lg border border-purple-500/20">
        <h3 className="text-2xl font-bold text-white mb-4">
          Discover More Amazing Manga
        </h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Explore thousands of manga titles across all genres. From action-packed adventures to heartwarming romances, 
          find your next favorite read on MangaBox.
        </p>
        <Button 
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700"
          asChild
        >
          <Link href="/browse">
            Browse All Manga
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  )
} 