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
      <div className="bg-white/[0.035] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-white/[0.06] bg-white/[0.02] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-red-500" />
            <h3 className="text-sm font-bold text-white">{team.name}</h3>
          </div>
          <span className="text-xs text-slate-400 font-semibold px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10">
            {team.players?.length || 0} Players
          </span>
        </div>

        <div className="divide-y divide-white/[0.05] max-h-[550px] overflow-y-auto">
          {team.players?.map((player, idx) => (
            <div
              key={idx}
              className="p-3.5 flex items-center justify-between hover:bg-white/[0.03] transition-colors"
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
                  <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                    {player.name}
                    {player.captain && (
                      <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                        C
                      </span>
                    )}
                    {player.wicketkeeper && (
                      <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-400/40">
                        WK
                      </span>
                    )}
                  </div>
                  {player.role && (
                    <div className="text-xs text-slate-400 mt-0.5">
                      {player.role}
                    </div>
                  )}
                </div>
              </div>

              {(player.battingStyle || player.bowlingStyle) && (
                <div className="text-right text-xs text-slate-400 hidden sm:block">
                  <div className="font-medium text-slate-300">{player.battingStyle}</div>
                  <div className="text-[11px] text-slate-500">{player.bowlingStyle}</div>
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
