import { EnhancedSearchBar } from "@/components/enhanced-search-bar"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Logo />
          
          {/* Mobile Search Icon */}
          <div className="block md:hidden">
            <Link href="/search">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          {/* Desktop Search Bar */}
          <div className="hidden md:block flex-1 max-w-xs ml-8">
            <EnhancedSearchBar />
          </div>
        </div>
      </div>
    </header>
  )
} 