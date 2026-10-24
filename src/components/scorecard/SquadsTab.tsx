'use client';

import React from 'react';
import ImageWithFallback from '../common/ImageWithFallback';
import EmptyState from '../common/EmptyState';
import { Users, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
        <div className="h-64 rounded-2xl glass-panel bg-white/5" />
        <div className="h-64 rounded-2xl glass-panel bg-white/5" />
      </div>
    );
  }

  if (!squadsData || (!squadsData.team1 && !squadsData.team2)) {
    return (
      <EmptyState
        title="Squads Not Announced"
        description="Playing XI and squad lineups have not been announced yet or are not available for this fixture."
      />
    );
  }

  const renderTeamSquad = (team?: Team, teamIdx: number = 1) => {
    if (!team) return null;

    return (
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-white/10 bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">{team.name}</h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {team.players?.length || 0} Players
          </span>
        </div>

        <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
          {team.players?.map((player, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-800 border border-white/10 flex items-center justify-center text-xs font-bold text-slate-300">
                  {player.image ? (
                    <ImageWithFallback
                      src={player.image}
                      alt={player.name}
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    player.name.slice(0, 2).toUpperCase()
                  )}
                </div>

                <div>
                  <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                    {player.name}
                    {player.captain && (
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        C
                      </span>
                    )}
                    {player.wicketkeeper && (
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
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
                  <div>{player.battingStyle}</div>
                  <div className="text-slate-500">{player.bowlingStyle}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {renderTeamSquad(squadsData.team1, 1)}
      {renderTeamSquad(squadsData.team2, 2)}
    </motion.div>
  );
};

export default SquadsTab;
