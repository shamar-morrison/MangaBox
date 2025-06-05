"use client"

import { FilterOptions, MangaFilters } from "@/components/manga-filters"
import { OptimizedMangaCard } from "@/components/optimized-manga-card"
import { SearchBar } from "@/components/search-bar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Filter } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Manga {
  id: string;
  attributes: {
    title: {
      en?: string;
      [key: string]: string | undefined;
    };
    description: {
      en?: string;
      [key: string]: string | undefined;
    };
    status: string;
    year: number | null;
    contentRating: string;
  };
  relationships: Array<{
    type: string;
    id: string;
    attributes?: any;
  }>;
}

function buildApiUrl(filters: FilterOptions): string {
  const baseUrl = "https://api.mangadex.org/manga"
  const params = new URLSearchParams()

  // Basic parameters
  params.append("limit", "50")
  params.append("includes[]", "cover_art")

  // Content rating
  filters.contentRating.forEach(rating => {
    params.append("contentRating[]", rating)
  })

  // Status filter
  filters.status.forEach(status => {
    params.append("status[]", status)
  })

  // Publication demographic
  filters.publicationDemographic.forEach(demo => {
    params.append("publicationDemographic[]", demo)
  })

  // Sorting
  params.append(`order[${filters.sortBy}]`, filters.sortOrder)

  return `${baseUrl}?${params.toString()}`
}

async function fetchFilteredManga(filters: FilterOptions): Promise<Manga[]> {
  try {
    const url = buildApiUrl(filters)
    const response = await fetch(url, { 
      next: { revalidate: 1800 },
      cache: 'force-cache'
    })

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

function BrowseResults({ filters }: { filters: FilterOptions }) {
  const [manga, setManga] = useState<Manga[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadManga = async () => {
      setIsLoading(true)
      const results = await fetchFilteredManga(filters)
      setManga(results)
      setIsLoading(false)
    }

    loadManga()
  }, [filters])

  if (isLoading) {
    return <BrowseSkeleton />
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-white">
          Browse All Manga ({manga.length} titles)
        </h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
        {manga.map((item) => (
          <OptimizedMangaCard key={item.id} manga={item} />
        ))}
      </div>

      {manga.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No manga found with the current filters</p>
          <p className="text-gray-500 mt-2">Try adjusting your filter settings</p>
        </div>
      )}
    </div>
  )
}

function BrowseSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-6 w-48 bg-gray-900" />
        <Skeleton className="h-8 w-20 bg-gray-900" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-64 w-full bg-gray-900" />
            <Skeleton className="h-4 w-full bg-gray-900" />
            <Skeleton className="h-3 w-2/3 bg-gray-900" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function BrowsePage() {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({
    status: [],
    contentRating: ["safe", "suggestive"],
    publicationDemographic: [],
    sortBy: "followedCount",
    sortOrder: "desc",
  })

  const getActiveFiltersCount = () => {
    return (
      filters.status.length +
      (filters.contentRating.length !== 2 ? 1 : 0) +
      filters.publicationDemographic.length +
      (filters.sortBy !== "followedCount" || filters.sortOrder !== "desc" ? 1 : 0)
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-4 md:mb-6 text-white hover:bg-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
            Browse All Manga
          </h1>
          <p className="text-gray-300 font-light text-sm md:text-base max-w-2xl mx-auto">
            Discover thousands of manga titles across all genres. Find your next favorite read from our extensive collection.
          </p>
        </div>

        <div className="mb-6 md:mb-8">
          <SearchBar />
        </div>

        {/* Filter Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(true)}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {getActiveFiltersCount() > 0 && (
                <Badge variant="secondary" className="ml-2 bg-purple-600 text-white">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </Button>
          </div>

          {/* Active filters preview */}
          {getActiveFiltersCount() > 0 && (
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
              <span>Active filters:</span>
              {filters.status.length > 0 && (
                <Badge variant="outline" className="border-gray-600 text-gray-300">
                  Status: {filters.status.length}
                </Badge>
              )}
              {filters.publicationDemographic.length > 0 && (
                <Badge variant="outline" className="border-gray-600 text-gray-300">
                  Demo: {filters.publicationDemographic.length}
                </Badge>
              )}
              {(filters.sortBy !== "followedCount" || filters.sortOrder !== "desc") && (
                <Badge variant="outline" className="border-gray-600 text-gray-300">
                  Custom Sort
                </Badge>
              )}
            </div>
          )}
        </div>

        <BrowseResults filters={filters} />

        <MangaFilters
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          onFiltersChange={setFilters}
        />
      </div>
    </div>
  )
} 