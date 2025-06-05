import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className="relative">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform group-hover:scale-105"
        >
          {/* Outer box with gradient */}
          <rect
            x="2"
            y="2"
            width="36"
            height="36"
            rx="8"
            fill="url(#gradient1)"
            stroke="url(#gradient2)"
            strokeWidth="2"
          />
          
          {/* Inner manga pages */}
          <rect x="8" y="10" width="8" height="20" rx="1" fill="white" opacity="0.9" />
          <rect x="18" y="10" width="8" height="20" rx="1" fill="white" opacity="0.8" />
          <rect x="28" y="10" width="4" height="20" rx="1" fill="white" opacity="0.7" />
          
          {/* Reading lines */}
          <line x1="10" y1="14" x2="14" y2="14" stroke="#666" strokeWidth="1" />
          <line x1="10" y1="17" x2="14" y2="17" stroke="#666" strokeWidth="1" />
          <line x1="10" y1="20" x2="14" y2="20" stroke="#666" strokeWidth="1" />
          
          <line x1="20" y1="14" x2="24" y2="14" stroke="#666" strokeWidth="1" />
          <line x1="20" y1="17" x2="24" y2="17" stroke="#666" strokeWidth="1" />
          <line x1="20" y1="20" x2="24" y2="20" stroke="#666" strokeWidth="1" />
          
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
          MangaBox
        </h1>
        <span className="text-xs text-gray-400 -mt-1">Read & Discover</span>
      </div>
    </Link>
  )
} 