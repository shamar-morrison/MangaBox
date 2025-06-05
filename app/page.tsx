import { Suspense } from "react"
import { MangaGrid } from "@/components/manga-grid"
import { SearchBar } from "@/components/search-bar"
import { Skeleton } from "@/components/ui/skeleton"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
            MangaReader
          </h1>
          <p className="text-gray-300 text-lg font-light">Discover and read your favorite manga</p>
        </div>

        <div className="mb-8">
          <SearchBar />
        </div>

        <Suspense fallback={<MangaGridSkeleton />}>
          <MangaGrid />
        </Suspense>
      </div>
    </div>
  )
}

function MangaGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-64 w-full bg-gray-900" />
          <Skeleton className="h-4 w-full bg-gray-900" />
          <Skeleton className="h-3 w-2/3 bg-gray-900" />
        </div>
      ))}
    </div>
  )
}
