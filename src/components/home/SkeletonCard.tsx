const SkeletonCard = () => (
  <div className="min-w-[300px] p-4 rounded-lg bg-gray-100 animate-pulse">
    <div className="flex justify-between mb-4">
      <div className="h-6 w-24 bg-gray-200 rounded"></div>
      <div className="h-6 w-24 bg-gray-200 rounded"></div>
    </div>
    <div className="space-y-3">
      <div className="h-4 w-full bg-gray-200 rounded"></div>
      <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
    </div>
  </div>
);

export default SkeletonCard; 