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
  type: string
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
    <div className="bg-white rounded-xl p-6 m-2 hover:border-red-600 transition-all duration-200 backdrop-blur-sm">
      <div className="space-y-4">
        {/* Series & Title */}
        <div>
          <h3 className="text-lg font-semibold ">{title}</h3>
          <p className="text-sm ">{series}</p>
          <p className="text-xs  mt-1">{matchInfo?.replace('Today - Today', '')}</p>
        </div>

        {/* Teams & Scores */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <ImageComponent src={flagA} alt={teamA} />
            <div>
              <p className="font-medium ">{teamA}</p>
              <p className=" font-semibold">{scoreA}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-medium ">{teamB}</p>
              <p className=" font-semibold">{scoreB}</p>
            </div>
            <ImageComponent src={flagB} alt={teamB} />
          </div>
        </div>

        {/* Status & Links */}
        <div>
          <p className="text-zinc-900 text-sm font-medium">{status}</p>
          <div className="flex space-x-4 mt-3">
            {type !== 'getUpcomingMatches' && (
              <>
                <Link 
                  href={`/scorecard/${links?.scorecard}`}
                  className="text-xs  hover:bg-red-900 bg-red-600 p-2 font-bold text-white rounded-xl"
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