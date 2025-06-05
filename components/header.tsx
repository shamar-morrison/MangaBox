import { EnhancedSearchBar } from "@/components/enhanced-search-bar"
import { Logo } from "@/components/logo"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />
          
          {/* Search Bar */}
          <div className="flex-1 max-w-md ml-8">
            <EnhancedSearchBar />
          </div>
        </div>
      </div>
    </header>
  )
} 