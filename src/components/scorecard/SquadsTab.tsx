'use client';

import React, { useState } from 'react';
import ImageWithFallback from '../common/ImageWithFallback';
import EmptyState from '../common/EmptyState';
import { Users, Shield, Award, Sparkles } from 'lucide-react';

interface SquadPlayer {
  id?: string | null;
  name: string;
  fullName?: string;
  role?: string;
  position?: string;
  positionAbbr?: string;
  battingStyle?: string;
  bowlingStyle?: string;
  captain?: boolean;
  keeper?: boolean;
  wicketkeeper?: boolean;
  starter?: boolean;
  image?: string | null;
  headshot?: string | null;
  isDebut?: boolean;
}

interface TeamSquadGroup {
  team: {
    id?: string | null;
    name: string;
    logo?: string | null;
  };
  playingXI: SquadPlayer[];
  bench: SquadPlayer[];
}

interface SquadsTabProps {
  squadsData?: any;
  debuts?: Array<{ team: string; players: string[] }>;
  loading?: boolean;
}

export const SquadsTab: React.FC<SquadsTabProps> = ({ squadsData, debuts = [], loading }) => {
  const [selectedTeamIdx, setSelectedTeamIdx] = useState<number>(0);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
        <div className="h-96 rounded-xl bg-white border border-slate-200" />
        <div className="h-96 rounded-xl bg-white border border-slate-200" />
      </div>
    );
  }

  // Normalize squads into standard TeamSquadGroup[]
  const teamGroups: TeamSquadGroup[] = React.useMemo(() => {
    if (!squadsData) return [];

    // Case 1: /match/squads response (squadsData.squads object with playingXI & bench)
    const rawSquads = squadsData.squads || squadsData;

    // Check if it's already an array or dictionary
    const keys = Object.keys(rawSquads);
    if (keys.length === 0) return [];

    return keys.map((key) => {
      const entry = rawSquads[key];
      const teamName = entry?.team?.name || entry?.name || key;
      const teamLogo = entry?.team?.logo || null;

      let playingXI: SquadPlayer[] = [];
      let bench: SquadPlayer[] = [];

      if (entry?.playingXI && Array.isArray(entry.playingXI)) {
        playingXI = entry.playingXI;
        bench = entry.bench || [];
      } else {
        const playersList: SquadPlayer[] = Array.isArray(entry?.players)
          ? entry.players
          : Array.isArray(entry)
          ? entry
          : [];

        // If starters flagged, separate them; otherwise first 11 are playing XI
        const hasStarters = playersList.some((p) => p.starter);
        if (hasStarters) {
          playingXI = playersList.filter((p) => p.starter);
          bench = playersList.filter((p) => !p.starter);
        } else if (playersList.length > 11) {
          playingXI = playersList.slice(0, 11);
          bench = playersList.slice(11);
        } else {
          playingXI = playersList;
          bench = [];
        }
      }

      // Check debuts
      const teamDebuts = debuts.find((d) => d.team?.toLowerCase() === teamName.toLowerCase())?.players || [];
      if (teamDebuts.length > 0) {
        playingXI = playingXI.map((p) => ({
          ...p,
          isDebut: teamDebuts.some((dn) => dn.toLowerCase() === p.name.toLowerCase())
        }));
      }

      return {
        team: { name: teamName, logo: teamLogo },
        playingXI,
        bench
      };
    });
  }, [squadsData, debuts]);

  if (teamGroups.length === 0) {
    return (
      <EmptyState
        type="scorecard"
        title="Squads Not Available"
        message="Full squad and playing XI details are not available for this archived fixture."
      />
    );
  }

  const renderPlayerRow = (player: SquadPlayer, isStarter: boolean = true) => {
    const isCap = player.captain;
    const isWk = player.keeper || player.wicketkeeper;
    const imgSrc = player.headshot || player.image;
    const roleText = player.position || player.role || '';

    return (
      <div
        key={player.name}
        className="p-3.5 flex items-center justify-between hover:bg-slate-50/70 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-slate-200 bg-slate-100">
            <ImageWithFallback
              src={imgSrc}
              alt={player.name}
              width={32}
              height={32}
              className="object-cover w-full h-full"
              fallbackText={player.name}
            />
          </div>

          <div className="min-w-0">
            <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5 truncate">
              <span>{player.name}</span>
              {isCap && (
                <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-300 shadow-2xs">
                  C
                </span>
              )}
              {isWk && (
                <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 border border-blue-300 shadow-2xs">
                  WK
                </span>
              )}
              {player.isDebut && (
                <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                  DEBUT
                </span>
              )}
            </div>

            {roleText && (
              <div className="text-[11px] text-slate-500 truncate mt-0.5">
                {roleText}
              </div>
            )}
          </div>
        </div>

        {(player.battingStyle || player.bowlingStyle) && (
          <div className="text-right text-[11px] text-slate-400 hidden sm:block max-w-[150px] truncate">
            {player.battingStyle && <div className="truncate">{player.battingStyle}</div>}
            {player.bowlingStyle && <div className="truncate">{player.bowlingStyle}</div>}
          </div>
        )}
      </div>
    );
  };

  const renderTeamSquadCard = (group: TeamSquadGroup) => {
    return (
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        {/* Team Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-white border border-slate-200 flex items-center justify-center">
              {group.team.logo ? (
                <ImageWithFallback
                  src={group.team.logo}
                  alt={group.team.name}
                  width={24}
                  height={24}
                  className="object-cover"
                />
              ) : (
                <Shield className="w-3.5 h-3.5 text-red-600" />
              )}
            </div>
            <h3 className="text-sm font-bold text-slate-900">{group.team.name}</h3>
          </div>
          <span className="text-xs text-slate-500 font-semibold font-mono">
            {group.playingXI.length + group.bench.length} Players
          </span>
        </div>

        {/* Playing XI Section */}
        <div className="p-3 bg-slate-100/60 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
          <span className="uppercase tracking-wider text-[11px]">Playing XI</span>
          <span className="font-mono text-slate-500 text-[11px]">{group.playingXI.length}</span>
        </div>
        <div className="divide-y divide-slate-100">
          {group.playingXI.map((p) => renderPlayerRow(p, true))}
        </div>

        {/* Bench / Reserves Section if any */}
        {group.bench.length > 0 && (
          <>
            <div className="p-3 bg-slate-100/60 border-t border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700 mt-2">
              <span className="uppercase tracking-wider text-[11px]">Bench & Reserves</span>
              <span className="font-mono text-slate-500 text-[11px]">{group.bench.length}</span>
            </div>
            <div className="divide-y divide-slate-100">
              {group.bench.map((p) => renderPlayerRow(p, false))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Mobile Team Switcher */}
      <div className="md:hidden flex items-center gap-2 pb-1 overflow-x-auto no-scrollbar">
        {teamGroups.map((group, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedTeamIdx(idx)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              selectedTeamIdx === idx
                ? 'bg-red-600 text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-700'
            }`}
          >
            {group.team.name}
          </button>
        ))}
      </div>

      {/* Grid: 2 columns on desktop, 1 on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:block hidden">
          {teamGroups[0] && renderTeamSquadCard(teamGroups[0])}
        </div>
        <div className="md:block hidden">
          {teamGroups[1] && renderTeamSquadCard(teamGroups[1])}
        </div>

        {/* Mobile View Active Card */}
        <div className="md:hidden">
          {teamGroups[selectedTeamIdx] && renderTeamSquadCard(teamGroups[selectedTeamIdx])}
        </div>
      </div>
    </div>
  );
};

export default SquadsTab;
