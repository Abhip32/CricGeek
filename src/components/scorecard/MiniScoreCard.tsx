import React, { useEffect, useState } from 'react';
import Spinner from '../common/Spinner';
import NewsCard from '../common/NewsCard';

const MiniScoreCard = ({ data, scoreData }: any) => {
  console.log(scoreData);
  const { batting, bowling, matchInfo, title, venue, playerOfTheMatch, playerOfTheSeries } = data || {};
  const { team: battingTeam, score: battingScore, currentBatsmen } = batting || {};
  const { team: bowlingTeam, score: bowlingScore, currentBowlers } = bowling || {};
  const { team1, team2 } = matchInfo?.teams || {};

  const [leftHeight, setLeftHeight] = useState(0);

  // UseEffect to get the height of the left container after render
  useEffect(() => {
    const leftDiv = document.getElementById('left-container');
    if (leftDiv) {
      console.log(leftDiv.clientHeight)
      if(leftDiv.clientHeight >300){
        setLeftHeight(leftDiv.clientHeight);
    }
    else{
      setLeftHeight(300)
    }
  }}, [data, scoreData]); // Recalculate if data or scoreData change

  return (
    <div className="w-full mx-auto bg-white m-2  shadow-lg flex flex-col md:flex-row">
      {/* Left Div */}
      <div
        id="left-container"
        className="flex flex-col md:min-w-[50%] p-3"
        style={{ minHeight:'300px' }}
      >
        <div className="flex items-center justify-center gap-4 mt-6 mb-6">
          <div className="flex items-center">
            {team1?.flag && (
              <img
                src={team1.flag}
                alt={team1.name}
                className="w-12 h-12 mr-2 rounded"
              />
            )}
            <span className="text-xl font-bold">{team1?.name}</span>
          </div>
          <span className="text-2xl font-bold">VS</span>
          <div className="flex items-center">
            {team2?.flag && (
              <img
                src={team2.flag}
                alt={team2.name}
                className="w-12 h-12 mr-2 rounded"
              />
            )}
            <span className="text-xl font-bold">{team2?.name}</span>
          </div>
        </div>


        {battingScore && (
          <div className="mt-4">
            <div>{`${battingTeam} ${battingScore}`}</div>
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
                      {currentBatsmen.map((batsman: any, index: any) => (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 0
                              ? 'bg-gray-200/50'
                              : 'bg-gray-200/30'
                          }`}
                        >
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
        )}

        {bowlingScore && (
          <div className="mt-4">
            <div className="font-bold">{bowlingTeam?.name}</div>
            <div>{`${bowlingTeam} ${bowlingScore}`}</div>
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
                      {currentBowlers.map((bowler: any, index: any) => (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 0
                              ? 'bg-gray-200/50'
                              : 'bg-gray-200/30'
                          }`}
                        >
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
        )}

      {playerOfTheMatch && <div className="text-lg font-semibold mt-2">Player of the match : {playerOfTheMatch.name}</div>}
      {playerOfTheSeries && <div className="text-lg font-semibold mt-2">Player of the series : {playerOfTheSeries.name}</div>}
      </div>

      {/* Right Div */}
      <div
        className="flex flex-col md:min-w-[50%] p-3"
        style={{
          maxHeight: `${leftHeight}px`,
          overflowY: 'auto', // Allow vertical overflow if content exceeds the height
        }}
      >
        <div className="flex items-center mb-3">
          <span className="text-xl font-bold">Trending Match Topics</span>
        </div>
        <div className="flex-col overflow-scroll overflow-x-hidden">
          {scoreData?.news?.map(
            (item: { id: number; [key: string]: any }, index: number) => (
              <NewsCard
                key={`news-${index}`}
                title={item.category}
                description={item.summary}
                image={item.image.url}
                headline={item.headline}
                id={0}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MiniScoreCard;
