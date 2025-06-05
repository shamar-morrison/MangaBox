"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface OptimizedMangaCardProps {
  manga: {
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
  };
}

export function OptimizedMangaCard({ manga }: OptimizedMangaCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const title =
    manga.attributes.title.en ||
    Object.values(manga.attributes.title)[0] ||
    "Unknown Title";
  const coverArt = manga.relationships.find((rel) => rel.type === "cover_art");

  const coverUrl = coverArt?.attributes?.fileName
    ? `https://uploads.mangadex.org/covers/${manga.id}/${coverArt.attributes.fileName}.512.jpg`
    : "/placeholder.svg?height=300&width=200";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef}>
      <Link href={`/manga/${manga.id}`}>
        <Card className="group cursor-pointer transition-transform duration-200 hover:scale-[1.02] bg-gray-900/50 border-gray-800 hover:border-purple-500 overflow-hidden will-change-transform">
          <CardContent className="p-0">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-800">
              {isVisible && (
                <img
                  src={coverUrl}
                  alt={title}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg?height=300&width=200";
                    setImageLoaded(true);
                  }}
                />
              )}

              {!imageLoaded && isVisible && (
                <div className="absolute inset-0 bg-gray-800 animate-pulse" />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-2 right-2">
                <Badge
                  variant="secondary"
                  className="bg-purple-600/80 text-white text-xs"
                >
                  {manga.attributes.status}
                </Badge>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-white text-sm line-clamp-2 mb-1">
                {title}
              </h3>
              {manga.attributes.year && (
                <p className="text-gray-400 text-xs">{manga.attributes.year}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
