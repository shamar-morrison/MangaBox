"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  attributes: {
    title: {
      en?: string;
      [key: string]: string | undefined;
    };
    status: string;
    year: number | null;
  };
  relationships: Array<{
    type: string;
    id: string;
    attributes?: any;
  }>;
}

interface SearchBarProps {
  className?: string;
}

export function EnhancedSearchBar({ className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null,
  );

  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Debounced search function
  const searchManga = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.mangadex.org/manga?title=${encodeURIComponent(searchQuery)}&limit=5&includes[]=cover_art&order[relevance]=desc&contentRating[]=safe&contentRating[]=suggestive`,
      );

      if (response.ok) {
        const data = await response.json();
        setResults(data.data || []);
        setShowDropdown(true);
      }
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    }
    setIsLoading(false);
  };

  const handleInputChange = (value: string) => {
    setQuery(value);

    // Clear existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set new timer for debounced search
    const timer = setTimeout(() => {
      searchManga(value);
    }, 300);

    setDebounceTimer(timer);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim()) {
      setShowDropdown(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const getTitle = (manga: SearchResult) => {
    return (
      manga.attributes.title.en ||
      Object.values(manga.attributes.title)[0] ||
      "Unknown Title"
    );
  };

  return (
    <div ref={searchRef} className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search manga..."
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => query && results.length > 0 && setShowDropdown(true)}
          className="pl-10 pr-10 bg-gray-900/80 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 backdrop-blur-sm"
        />

        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>
          </div>
        )}
      </div>

      {/* Dropdown Results */}
      {showDropdown && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 border-gray-700 backdrop-blur-sm z-50 max-h-80 overflow-y-auto">
          <div className="p-2">
            {results.map((manga) => (
              <Link
                key={manga.id}
                href={`/manga/${manga.id}`}
                onClick={() => setShowDropdown(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors group"
              >
                <div className="flex-1">
                  <h4 className="text-white text-sm font-medium group-hover:text-purple-400 transition-colors">
                    {getTitle(manga)}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400 capitalize">
                      {manga.attributes.status}
                    </span>
                    {manga.attributes.year && (
                      <>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-400">
                          {manga.attributes.year}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
              </Link>
            ))}

            {query && (
              <div className="border-t border-gray-700 mt-2 pt-2">
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center justify-center gap-2 p-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  View all results for "{query}"
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
