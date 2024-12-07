'use client'
import { useEffect, useState, useRef } from 'react';
import { cricketApi } from '@/services/api';
import { Match } from '@/types/match';
import MatchCarouselCard from './MatchCarouselCard';
import SkeletonCard from './SkeletonCard';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const MatchCarousel = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await cricketApi.getLiveMatches();
        // Filter out matches that don't have all required fields or have empty strings
        const validMatches = data.filter((match: Match) => {
          return (
            match.title &&
            match.teamA &&
            match.teamB &&
            (match.scoreA || match.scoreB) &&
            match.status &&
            match.flagA &&
            match.flagB &&
            match.links?.livescore
          );
        });
        setMatches(validMatches);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch matches');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 800; // Adjust this value as needed
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (loading) return (
    <div className="relative w-full max-w-[95vw] mx-auto">
      <div className="flex gap-4 p-4 overflow-x-auto">
        {[...Array(10)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  );

  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="relative w-full mx-auto">
      {showLeftButton && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black hover:bg-gray-700 p-2 rounded-r-lg shadow-lg transition-all"
        >
          <ChevronLeftIcon className="w-6 h-6 text-white" />
        </button>
      )}
      <div className='justify-center items-center'>
        <h2 className="text-3xl font-bold text-left">Live Matches</h2>

        <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-4 p-4 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {matches.map((match, index) => (
          <MatchCarouselCard match={match} key={index} />
        ))}
      </div>
        </div>

     

      {showRightButton && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black hover:bg-gray-700 p-2 rounded-l-lg shadow-lg transition-all"
        >
          <ChevronRightIcon className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
  );
};

export default MatchCarousel; 