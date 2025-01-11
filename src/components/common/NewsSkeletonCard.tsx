const NewsSkeletonCard = () => {
  return (
    <article className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 w-full animate-pulse">
      {/* Image Section */}
      <div className="relative h-48 sm:h-auto bg-gray-300"></div>

      {/* Content Section */}
      <div className="sm:col-span-2 p-4 sm:p-6 flex flex-col justify-between">
        <div className="h-6 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mt-4"></div>
      </div>
    </article>
  );
};

export default NewsSkeletonCard;
