import { Suspense } from "react"
import { SearchResults } from "@/components/search-results"
import { SearchBar } from "@/components/search-bar"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6 text-white hover:bg-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
            Search Results
          </h1>
          {query && (
            <p className="text-gray-300 font-light">
              Results for: <span className="font-medium">"{query}"</span>
            </p>
          )}
        </div>

        <div className="mb-8">
          <SearchBar />
        </div>

        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResults query={query} />
        </Suspense>
      </div>
    </div>
  )
}

function SearchResultsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-64 w-full bg-gray-900" />
          <Skeleton className="h-4 w-full bg-gray-900" />
          <Skeleton className="h-3 w-2/3 bg-gray-900" />
        </div>
      ))}
    </div>
  )
}
