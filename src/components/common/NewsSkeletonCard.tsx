const NewsSkeletonCard = () => {
  return (
    <div className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl p-4 sm:p-6 pb-6 sm:pb-8 pt-32 sm:pt-40 w-full h-[500px] bg-gray-800 animate-pulse">
      <div className="absolute inset-0 bg-gray-700"></div>
      <div className="relative z-10 mt-3 h-8 bg-gray-600 rounded w-3/4"></div>
      <div className="relative z-10 mt-2 h-4 bg-gray-600 rounded w-full"></div>
    </div>
  );
};

export default NewsSkeletonCard; 