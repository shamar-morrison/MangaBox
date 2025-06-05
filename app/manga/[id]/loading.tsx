export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          <div className="space-y-4">
            <div className="h-96 bg-gray-900 rounded-lg animate-pulse"></div>
            <div className="h-32 bg-gray-900 rounded-lg animate-pulse"></div>
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="h-8 bg-gray-900 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-900 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-900 rounded animate-pulse w-3/4"></div>
            </div>
            <div className="h-96 bg-gray-900 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
