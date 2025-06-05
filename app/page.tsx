import { Header } from "@/components/header"
import { MultiCategoryMangaGrid } from "@/components/multi-category-manga-grid"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Welcome to <span className="bg-gradient-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent">MangaBox</span>
          </h1>
          <p className="text-gray-300 text-lg">Discover and read your favorite manga across multiple categories</p>
        </div>

        <Suspense fallback={<MangaGridSkeleton />}>
          <MultiCategoryMangaGrid />
        </Suspense>
      </main>
    </div>
  )
}

function MangaGridSkeleton() {
  return (
    <div className="space-y-12">
      {Array.from({ length: 4 }).map((_, categoryIndex) => (
        <div key={categoryIndex} className="space-y-6">
          {/* Category header skeleton */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-6 bg-gray-900" />
              <Skeleton className="h-8 w-48 bg-gray-900" />
              <Skeleton className="h-4 w-64 bg-gray-900 hidden md:block" />
            </div>
            <Skeleton className="h-8 w-20 bg-gray-900" />
          </div>
          
          {/* Category grid skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-64 w-full bg-gray-900" />
                <Skeleton className="h-4 w-full bg-gray-900" />
                <Skeleton className="h-3 w-2/3 bg-gray-900" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
