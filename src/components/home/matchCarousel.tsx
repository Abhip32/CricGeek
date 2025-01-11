'use client'
import { useEffect, useState, useRef } from 'react';
import { cricketApi } from '@/services/api';
import { Match } from '@/types/match';
import MatchCarouselCard from './MatchCarouselCard';
import SkeletonCard from './SkeletonCard';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function MatchCarousel() {

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




  return (
    <div>
      <Carousel>      
      <CarouselContent>
        {loading ? (
          [...Array(10)].map((_, index) => <SkeletonCard key={index} />)
        ) : (
          matches.map((match, index) => (
            <CarouselItem key={index} className="md:basis-1/3 basis-1/1">
              <MatchCarouselCard match={match} />
            </CarouselItem>
          ))
        )}
      </CarouselContent>

        
        {/* Previous button */}
        <CarouselPrevious 
          className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-200 cursor-pointer">
          <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
        </CarouselPrevious>

        {/* Next button */}
        <CarouselNext 
          className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-200 cursor-pointer">
          <ChevronRightIcon className="h-6 w-6 text-gray-600" />
        </CarouselNext>
      </Carousel>
    </div>
  );
}
