import { SearchBar } from "@/components/search-bar";
import { SearchResults } from "@/components/search-results";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

function SearchBarWrapper() {
  return <SearchBar />;
}

function SearchBarSkeleton() {
  return (
    <div className="flex gap-2 max-w-md mx-auto">
      <div className="relative flex-1">
        <Skeleton className="h-10 w-full bg-gray-900" />
      </div>
      <Skeleton className="h-10 w-20 bg-gray-900" />
    </div>
  );
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <Link href="/">
          <Button
            variant="ghost"
            className="mb-4 md:mb-6 text-white hover:bg-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
            Search Results
          </h1>
        </div>

        <div className="mb-6 md:mb-8">
          <Suspense fallback={<SearchBarSkeleton />}>
            <SearchBarWrapper />
          </Suspense>
        </div>

        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResults query={query} />
        </Suspense>
      </div>
    </div>
  );
}

function SearchResultsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-64 w-full bg-gray-900" />
          <Skeleton className="h-4 w-full bg-gray-900" />
          <Skeleton className="h-3 w-2/3 bg-gray-900" />
        </div>
      ))}
    </div>
  );
}
