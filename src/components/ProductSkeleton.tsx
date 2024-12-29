const ProductSkeleton = ({ count = 30 }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="relative">
            <div className="bg-gray-200 rounded-lg h-[210px] w-full animate-pulse" />
            <div className="p-2 space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
              <div className="flex gap-2 items-center">
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { ProductSkeleton }
