interface Player {
  name: string;
  role?: string;
  battingStyle?: string;
  bowlingStyle?: string;
  captain?: boolean;
  wicketkeeper?: boolean;
  image?: string;
}

interface Team {
  name: string;
  players: Player[];
}

interface SquadsTabProps {
  squadsData: {
    team1?: Team;
    team2?: Team;
  } | null;
  loading: boolean;
}

export const SquadsTab = ({ squadsData, loading }: SquadsTabProps) => {
  if (loading) return <div>Loading...</div>;
  if (!squadsData) return <div>No squad data available</div>;

  const renderTeam = (team?: Team) => {
    if (!team) return null;

    return (
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-4 ">{team.name}</h3>
        <div className="bg-white border border-gray-700 rounded-lg overflow-hidden">
          {team.players.map((player, index) => (
            <div
              key={player.name}
              className="p-4 border-b border-gray-700 last:border-b-0 flex flex-col sm:flex-row sm:items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                {player.image && (
                  <img 
                    src={player.image} 
                    alt={player.name} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <span className=" font-medium">
                  {player.name}
                  {player.captain && <span className="ml-2 text-yellow-500">(C)</span>}
                  {player.wicketkeeper && <span className="ml-2 text-blue-500">(WK)</span>}
                </span>
              </div>
              <div className="text-sm  mt-2 sm:mt-0">
                {[
                  player.role,
                  player.battingStyle,
                  player.bowlingStyle
                ].filter(Boolean).join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
      {renderTeam(squadsData.team1)}
      {renderTeam(squadsData.team2)}
    </div>
  );
}; 