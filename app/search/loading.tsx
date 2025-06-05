export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-64 w-full bg-gray-900 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-900 rounded animate-pulse"></div>
              <div className="h-3 w-2/3 bg-gray-900 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
