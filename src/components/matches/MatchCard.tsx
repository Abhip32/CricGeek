import { Match } from "@/types/match";
import Link from 'next/link'

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
    <img
      src={src}
      alt={alt}
      width={24}
      height={24}
    />
  );
};

type MatchCardProps = Match & {
  type: 'getLiveMatches' | 'getRecentMatches' | 'getUpcomingMatches'
};

const MatchCard = ({
  title,
  series,
  matchInfo,
  teamA,
  teamB,
  scoreA,
  scoreB,
  status,
  flagA,
  flagB,
  links,
  type
}: MatchCardProps) => {
  console.log(type)
  return (
    <div className="bg-gray-700/30 rounded-xl p-6 m-2 hover:bg-gray-700/40 transition-all duration-200 backdrop-blur-sm">
      <div className="space-y-4">
        {/* Series & Title */}
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-300">{series}</p>
          <p className="text-xs text-gray-400 mt-1">{matchInfo.replace('Today - Today', '')}</p>
        </div>

        {/* Teams & Scores */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <ImageComponent src={flagA} alt={teamA} />
            <div>
              <p className="font-medium text-white">{teamA}</p>
              <p className="text-blue-400 font-semibold">{scoreA}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-medium text-white">{teamB}</p>
              <p className="text-blue-400 font-semibold">{scoreB}</p>
            </div>
            <ImageComponent src={flagB} alt={teamB} />
          </div>
        </div>

        {/* Status & Links */}
        <div>
          <p className="text-yellow-400 text-sm font-medium">{status}</p>
          <div className="flex space-x-4 mt-3">
            {type !== 'getUpcomingMatches' && (
              <>
                <Link 
                  href={`/scorecard/${encodeURIComponent(links?.scorecard || '')}`}
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  Scorecard
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard; 