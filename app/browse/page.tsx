import { OptimizedMangaCard } from "@/components/optimized-manga-card"
import { SearchBar } from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Filter } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

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

async function fetchAllManga(): Promise<Manga[]> {
  try {
    const response = await fetch(
      `https://api.mangadex.org/manga?limit=50&contentRating[]=safe&contentRating[]=suggestive&includes[]=cover_art&order[followedCount]=desc`,
      { next: { revalidate: 1800 } }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch manga");
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching manga:", error);
    return [];
  }
}

async function BrowseResults() {
  const manga = await fetchAllManga();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-white">
          Browse All Manga ({manga.length} titles)
        </h2>
        <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
        {manga.map((item) => (
          <OptimizedMangaCard key={item.id} manga={item} />
        ))}
      </div>
    </div>
  );
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
  );
}

export default function BrowsePage() {
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

        <Suspense fallback={<BrowseSkeleton />}>
          <BrowseResults />
        </Suspense>
      </div>
    </div>
  )
} 