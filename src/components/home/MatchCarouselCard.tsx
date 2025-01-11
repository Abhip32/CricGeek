'use client'
import Image from 'next/image';
import Link from 'next/link';
import { Match } from '@/types/match';

const isGoogleDriveImage = (url: string) => url.includes('drive.google.com');

const ImageComponent = ({ src, alt }: { src: string; alt: string }) => {
  if (isGoogleDriveImage(src)) {
    return (
      <img 
        src={src} 
        alt={alt} 
        className="w-6 h-4"
      />
    );
  }
  
  return (
    <Image
      src={src}
      alt={alt}
      width={24}
      height={24}
    />
  );
};

const MatchCarouselCard = ({ match }: { match: Match }) => {
  const CardContent = (
    <div className="min-w-[300px] sm:min-w-[400px] w-full sm:w-[400px] h-full rounded-lg p-4 hover:bg-gray-700 transition-colors shadow-lg bg-white">
      <div className="flex flex-col gap-2">
        <div className="text-sm text-bold ">{match.series}</div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ImageComponent src={match.flagA} alt={match.teamA} />
            <span className="font-semibold ">{match.teamA}</span>
            <span className="">{match.scoreA}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ImageComponent src={match.flagB} alt={match.teamB} />
            <span className="font-semibold ">{match.teamB}</span>
            <span className="">{match.scoreB}</span>
          </div>
        </div>

        <div className="text-sm text-red-500 mt-2">{match.status}</div>
      </div>
    </div>
  );

  return match.links?.livescore ? (
    <Link href={match.links.livescore} target="_blank">
      {CardContent}
    </Link>
  ) : (
    CardContent
  );
};

export default MatchCarouselCard; 