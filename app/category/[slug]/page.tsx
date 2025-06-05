import { OptimizedMangaCard } from "@/components/optimized-manga-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Clock, Sparkles, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

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

const categoryConfig: {
  [key: string]: {
    title: string;
    endpoint: string;
    description: string;
  };
} = {
  "popular-manga": {
    title: "Popular Manga",
    endpoint:
      "https://api.mangadex.org/manga?limit=50&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive&includes[]=cover_art",
    description: "Most followed manga",
  },
  "recently-updated": {
    title: "Recently Updated",
    endpoint:
      "https://api.mangadex.org/manga?limit=50&order[updatedAt]=desc&contentRating[]=safe&contentRating[]=suggestive&includes[]=cover_art",
    description: "Latest updates from ongoing series",
  },
  "highest-rated": {
    title: "Highest Rated",
    endpoint:
      "https://api.mangadex.org/manga?limit=50&order[rating]=desc&contentRating[]=safe&contentRating[]=suggestive&includes[]=cover_art",
    description: "Top-rated manga by the community",
  },
  "newest-additions": {
    title: "Newest Additions",
    endpoint:
      "https://api.mangadex.org/manga?limit=50&order[createdAt]=desc&contentRating[]=safe&contentRating[]=suggestive&includes[]=cover_art",
    description: "Fresh manga just added",
  },
};

async function fetchCategoryManga(endpoint: string): Promise<Manga[]> {
  try {
    const response = await fetch(endpoint, {
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch manga: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching category manga:", error);
    return [];
  }
}

async function CategoryContent({ slug }: { slug: string }) {
  const config = categoryConfig[slug];

  if (!config) {
    notFound();
  }

  const manga = await fetchCategoryManga(config.endpoint);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6 text-white hover:bg-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="flex items-center gap-4 mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {config.title}
            </h1>
            <p className="text-gray-300 text-lg">{config.description}</p>
          </div>
        </div>

        <div className="text-gray-400 text-sm">
          Showing {manga.length} manga
        </div>
      </div>

      {manga.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            No manga found in this category
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
          {manga.map((item) => (
            <OptimizedMangaCard key={item.id} manga={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CategoryContent slug={params.slug} />
    </Suspense>
  );
}

function CategorySkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-32 bg-gray-900 mb-6" />

        <div className="flex items-center gap-4 mb-4">
          <Skeleton className="h-6 w-6 bg-gray-900" />
          <div>
            <Skeleton className="h-10 w-64 bg-gray-900 mb-2" />
            <Skeleton className="h-6 w-96 bg-gray-900" />
          </div>
        </div>

        <Skeleton className="h-4 w-32 bg-gray-900" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
        {Array.from({ length: 50 }).map((_, i) => (
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
