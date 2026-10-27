'use client';

import React from 'react';
import ImageWithFallback from '../common/ImageWithFallback';
import EmptyState from '../common/EmptyState';
import { Users, Shield } from 'lucide-react';

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
  squadsData?: {
    team1?: Team;
    team2?: Team;
  } | null;
  loading?: boolean;
}

export const SquadsTab: React.FC<SquadsTabProps> = ({ squadsData, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
        <div className="h-64 rounded-xl bg-white border border-slate-200" />
        <div className="h-64 rounded-xl bg-white border border-slate-200" />
      </div>
    );
  }

  if (!squadsData || (!squadsData.team1 && !squadsData.team2)) {
    return (
      <EmptyState
        type="scorecard"
        title="Squads Not Available"
        message="Full squad and playing XI details are not available for this archived fixture."
      />
    );
  }

  const renderTeamSquad = (team?: Team) => {
    if (!team) return null;

    return (
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-red-600" />
            <h3 className="text-sm font-bold text-slate-900">{team.name}</h3>
          </div>
          <span className="text-xs text-slate-500 font-semibold">
            {team.players?.length || 0} Players
          </span>
        </div>

        <div className="divide-y divide-slate-100 max-h-[550px] overflow-y-auto">
          {team.players?.map((player, idx) => (
            <div
              key={idx}
              className="p-3.5 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ImageWithFallback
                  src={player.image}
                  alt={player.name}
                  width={34}
                  height={34}
                  fallbackText={player.name}
                />

                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    {player.name}
                    {player.captain && (
                      <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-300">
                        C
                      </span>
                    )}
                    {player.wicketkeeper && (
                      <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 border border-blue-300">
                        WK
                      </span>
                    )}
                  </div>
                  {player.role && (
                    <div className="text-xs text-slate-500 mt-0.5">
                      {player.role}
                    </div>
                  )}
                </div>
              </div>

              {(player.battingStyle || player.bowlingStyle) && (
                <div className="text-right text-[11px] text-slate-400 hidden sm:block max-w-[150px] truncate">
                  {player.battingStyle && <div>{player.battingStyle}</div>}
                  {player.bowlingStyle && <div>{player.bowlingStyle}</div>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {renderTeamSquad(squadsData.team1)}
      {renderTeamSquad(squadsData.team2)}
    </div>
  );
};

export default SquadsTab;
