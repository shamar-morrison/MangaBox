import { ExternalLink, Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950/50 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent mb-2">
              MangaBox
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your gateway to discovering and reading amazing manga. Built with
              passion for the manga community.
            </p>
          </div>

          {/* Credits */}
          <div>
            <h4 className="text-white font-semibold mb-3">Data Source</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span>Manga data provided by</span>
                <Link
                  href="https://mangadex.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  MangaDex
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
              <p className="text-xs text-gray-500">
                MangaDex is an ad-free manga reader offering high-quality
                images.
              </p>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-3">Important</h4>
            <div className="text-sm text-gray-400 space-y-2">
              <p>
                This site respects scanlation groups and their removal requests.
              </p>
              <p>
                All manga content is sourced from MangaDex API under their
                acceptable usage policy.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>for manga readers</span>
            </div>

            <div className="text-sm text-gray-500">
              © 2024 MangaBox. Data provided by{" "}
              <Link
                href="https://mangadex.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                MangaDex
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
