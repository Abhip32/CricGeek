import React from 'react';

const SkeletonLoader = () => (
  <div className="animate-pulse">
    {/* Teams Header Skeleton */}
    <div className="flex items-center justify-center gap-4 mb-6">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-200 rounded mr-2" />
        <div className="w-24 h-6 bg-gray-200 rounded" />
      </div>
      <div className="w-8 h-8 bg-gray-200 rounded" />
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-200 rounded mr-2" />
        <div className="w-24 h-6 bg-gray-200 rounded" />
      </div>
    </div>

    {/* Title and Venue Skeleton */}
    <div className="w-3/4 h-8 bg-gray-200 rounded mx-auto mb-4" />
    <div className="w-1/2 h-6 bg-gray-200 rounded mx-auto mb-4" />

    {/* Scores Section Skeleton */}
    <div className="space-y-6">
      {/* Batting Team Skeleton */}
      <div className="bg-gray-200 p-4 rounded-lg">
        <div className="w-40 h-6 bg-gray-200 rounded mb-2" />
        <div className="w-24 h-8 bg-gray-200 rounded mb-4" />
        <div className="w-48 h-6 bg-gray-200 rounded mb-2" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((index) => (
            <div key={index} className="bg-gray-200 p-3 rounded-md">
              {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                <div key={item} className="w-full h-4 bg-gray-200 rounded mb-2" />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bowling Team Skeleton */}
      <div className="bg-gray-200 p-4 rounded-lg">
        <div className="w-40 h-6 bg-gray-200 rounded mb-2" />
        <div className="w-24 h-8 bg-gray-200 rounded mb-4" />
        <div className="w-48 h-6 bg-gray-200 rounded mb-2" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((index) => (
            <div key={index} className="bg-gray-200 p-3 rounded-md">
              {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                <div key={item} className="w-full h-4 bg-gray-200 rounded mb-2" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Match Info Skeleton */}
    <div className="mt-6 bg-gray-200 p-4 rounded-lg">
      <div className="w-32 h-6 bg-gray-200 rounded mb-2" />
      <div className="w-48 h-4 bg-gray-200 rounded mb-1" />
      <div className="w-40 h-4 bg-gray-200 rounded" />
    </div>
  </div>
);

const MiniScoreCard = (data:any) => {
  const { batting, bowling, matchInfo, title, venue } = data.data || {};
  const { team: battingTeam, score: battingScore, currentBatsmen } = batting || {};
  const { team: bowlingTeam, score: bowlingScore, currentBowlers } = bowling || {};
  const { team1, team2 } = matchInfo?.teams || {};

  // Show skeleton if data is not loaded
  if (!data.data) {
    return (
      <div className=" w-full mx-auto bg-white text-black shadow-lg">
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto bg-white shadow-lg">
      {/* Teams Header with VS */}
      <div className="flex items-center justify-center gap-4 mt-6 mb-6">
        <div className="flex items-center">
          <img
            src={team1?.flag}
            alt={team1?.name}
            className="w-12 h-12 mr-2 rounded"
          />
          <span className="text-xl font-bold">{team1?.name}</span>
        </div>
        <span className="text-2xl font-bold">VS</span>
        <div className="flex items-center">
          <img
            src={team2?.flag}
            alt={team2?.name}
            className="w-12 h-12 mr-2 rounded"
          />
          <span className="text-xl font-bold">{team2?.name}</span>
        </div>
      </div>

      {/* Match Title and Venue */}
      <h1 className="text-2xl font-bold text-center border-b border-gray-600 pb-2 mb-4">{title}</h1>
      <h2 className="text-lg font-semibold text-center mb-4">{venue}</h2>

      {/* Scores Section */}
      <div className="space-y-6">
        {/* Batting Team Score */}
        <div className="bg-gray-200 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">{battingTeam}</h3>
          <p className="text-2xl font-bold mb-4">{battingScore}</p>
          
          {currentBatsmen && currentBatsmen.length > 0 && (
            <>
              <h4 className="text-lg font-semibold mb-2">Current Batsmen</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-center">R</th>
                      <th className="px-4 py-2 text-center">B</th>
                      <th className="px-4 py-2 text-center">4s</th>
                      <th className="px-4 py-2 text-center">6s</th>
                      <th className="px-4 py-2 text-center">SR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBatsmen.map((batsman:any, index:any) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-200/50' : 'bg-gray-200/30'}`}>
                        <td className="px-4 py-2">{batsman.name}</td>
                        <td className="px-4 py-2 text-center">{batsman.runs}</td>
                        <td className="px-4 py-2 text-center">{batsman.balls}</td>
                        <td className="px-4 py-2 text-center">{batsman.fours}</td>
                        <td className="px-4 py-2 text-center">{batsman.sixes}</td>
                        <td className="px-4 py-2 text-center">{batsman.strikeRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Bowling Team Score */}
        <div className="bg-gray-200 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">{bowlingTeam}</h3>
          <p className="text-2xl font-bold mb-4">{bowlingScore}</p>
          
          {currentBowlers && currentBowlers.length > 0 && (
            <>
              <h4 className="text-lg font-semibold mb-2">Current Bowlers</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-center">O</th>
                      <th className="px-4 py-2 text-center">M</th>
                      <th className="px-4 py-2 text-center">R</th>
                      <th className="px-4 py-2 text-center">W</th>
                      <th className="px-4 py-2 text-center">Econ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBowlers.map((bowler:any, index:any) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-200/50' : 'bg-gray-200/30'}`}>
                        <td className="px-4 py-2">{bowler.name}</td>
                        <td className="px-4 py-2 text-center">{bowler.overs}</td>
                        <td className="px-4 py-2 text-center">{bowler.maidens}</td>
                        <td className="px-4 py-2 text-center">{bowler.runs}</td>
                        <td className="px-4 py-2 text-center">{bowler.wickets}</td>
                        <td className="px-4 py-2 text-center">{bowler.economy}</td>
       
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Match Info Section */}
      <div className="mt-6 bg-gray-200 p-4 rounded-lg">
        <h4 className="text-lg font-semibold mb-2">Match Info</h4>
        <p className="mb-1">Date & Time: {matchInfo?.dateTime}</p>
        <p>Series: {matchInfo?.series}</p>
      </div>
    </div>
  );
};

export default MiniScoreCard;
