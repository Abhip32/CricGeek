'use client';

import React, { useState } from 'react';
import { ScorecardTable } from '@/types/match';
import ImageWithFallback from '../common/ImageWithFallback';
import { findPlayerInSquads } from '@/lib/playerMatcher';
import PlayerProfileModal from './PlayerProfileModal';

interface BowlingRow {
  name?: string;
  overs?: string | number;
  maidens?: string | number;
  runs?: string | number;
  wickets?: string | number;
  noBalls?: string | number;
  wides?: string | number;
  economy?: string | number;
}

interface BowlingTableProps {
  table?: ScorecardTable;
  bowlingData?: BowlingRow[];
  squads?: Record<string, any[]> | null;
}

export const BowlingTable: React.FC<BowlingTableProps> = ({ table, bowlingData, squads }) => {
  const [activePlayer, setActivePlayer] = useState<{ id?: string | null; name: string } | null>(null);

  const rows = React.useMemo(() => {
    if (bowlingData && Array.isArray(bowlingData)) {
      return bowlingData.map((r) => ({
        name: r.name || '',
        overs: r.overs ?? '-',
        maidens: r.maidens ?? '-',
        runs: r.runs ?? '-',
        wickets: r.wickets ?? '-',
        economy: r.economy ?? '-',
        wd: r.wides ?? '-',
        nb: r.noBalls ?? '-'
      }));
    }

    if (table && Array.isArray(table.rows)) {
      return table.rows.map((row) => {
        const name = row['BOWLING'] || row['Bowling'] || row['Bowler'] || Object.values(row)[0] || '';
        const overs = row['O'] || row['o'] || row['Overs'] || '-';
        const maidens = row['M'] || row['m'] || row['Maidens'] || '-';
        const runs = row['R'] || row['r'] || row['Runs'] || '-';
        const wickets = row['W'] || row['w'] || row['Wickets'] || '-';
        const economy = row['ECON'] || row['econ'] || row['Economy'] || '-';
        const wd = row['WD'] || row['wd'] || row['Wides'] || '-';
        const nb = row['NB'] || row['nb'] || row['NoBalls'] || '-';

        return {
          name,
          overs,
          maidens,
          runs,
          wickets,
          economy,
          wd,
          nb
        };
      });
    }

    return [];
  }, [table, bowlingData]);

  if (!rows || rows.length === 0) {
    return (
      <div className="py-5 text-center text-slate-500 text-xs">
        No bowling data recorded for this innings.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-slate-100/80 text-slate-700 text-xs font-black uppercase tracking-wider border-b border-slate-200">
            <th className="py-2.5 px-4">BOWLING</th>
            <th className="py-2.5 px-3 text-right">O</th>
            <th className="py-2.5 px-3 text-right">M</th>
            <th className="py-2.5 px-3 text-right">R</th>
            <th className="py-2.5 px-3 text-right">W</th>
            <th className="py-2.5 px-4 text-right">ECON</th>
            <th className="py-2.5 px-3 text-right hidden sm:table-cell">WD</th>
            <th className="py-2.5 px-3 text-right hidden sm:table-cell">NB</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((bowler, idx) => {
            const wicketsNum = parseInt(String(bowler.wickets), 10);
            const hasWickets = !isNaN(wicketsNum) && wicketsNum > 0;
            const matchedPlayer = findPlayerInSquads(bowler.name, squads);

            return (
              <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-2.5 px-4 font-bold text-slate-900">
                  <div className="flex items-center gap-2.5">
                    {/* Circular player headshot or monogram */}
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0 flex items-center justify-center shadow-2xs">
                      {matchedPlayer?.image ? (
                        <ImageWithFallback
                          src={matchedPlayer.image}
                          alt={bowler.name}
                          width={28}
                          height={28}
                          fallbackText={bowler.name.slice(0, 1)}
                        />
                      ) : (
                        <span className="text-[10px] font-black text-slate-600">
                          {bowler.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setActivePlayer({ id: matchedPlayer?.id || null, name: bowler.name })}
                      className="truncate font-bold text-slate-900 hover:text-red-600 transition-colors text-left cursor-pointer"
                      title="View Player Profile"
                    >
                      {bowler.name}
                    </button>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-right text-slate-700 font-medium">
                  {bowler.overs}
                </td>
                <td className="py-2.5 px-3 text-right text-slate-600 font-medium">
                  {bowler.maidens}
                </td>
                <td className="py-2.5 px-3 text-right text-slate-600 font-medium">
                  {bowler.runs}
                </td>
                <td className="py-2.5 px-3 text-right">
                  <span
                    className={`font-black tracking-tight ${
                      hasWickets
                        ? 'text-red-600 font-extrabold text-base'
                        : 'text-slate-900 font-bold'
                    }`}
                  >
                    {bowler.wickets}
                  </span>
                </td>
                <td className="py-2.5 px-4 text-right text-slate-600 font-mono text-xs font-semibold">
                  {bowler.economy}
                </td>
                <td className="py-2.5 px-3 text-right text-slate-500 text-xs hidden sm:table-cell">
                  {bowler.wd}
                </td>
                <td className="py-2.5 px-3 text-right text-slate-500 text-xs hidden sm:table-cell">
                  {bowler.nb}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Athlete Profile Modal */}
      <PlayerProfileModal
        isOpen={Boolean(activePlayer)}
        playerId={activePlayer?.id}
        playerName={activePlayer?.name}
        onClose={() => setActivePlayer(null)}
      />
    </div>
  );
};

export default BowlingTable;
