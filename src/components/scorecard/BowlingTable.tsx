'use client';

import React from 'react';
import { ScorecardTable } from '@/types/match';

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
}

export const BowlingTable: React.FC<BowlingTableProps> = ({ table, bowlingData }) => {
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
      <div className="py-5 text-center text-slate-400 text-xs">
        No bowling data recorded for this innings.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-white/[0.02] shadow-sm backdrop-blur-md">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-white/[0.04] text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-white/[0.08]">
            <th className="py-2.5 px-4">Bowler</th>
            <th className="py-2.5 px-3 text-right">O</th>
            <th className="py-2.5 px-3 text-right">M</th>
            <th className="py-2.5 px-3 text-right">R</th>
            <th className="py-2.5 px-3 text-right">W</th>
            <th className="py-2.5 px-4 text-right">ECON</th>
            <th className="py-2.5 px-3 text-right hidden sm:table-cell">WD</th>
            <th className="py-2.5 px-3 text-right hidden sm:table-cell">NB</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.05]">
          {rows.map((bowler, idx) => {
            const wicketsNum = parseInt(String(bowler.wickets), 10);
            const hasWickets = !isNaN(wicketsNum) && wicketsNum > 0;

            return (
              <tr 
                key={idx}
                className="hover:bg-red-500/[0.07] transition-colors"
              >
                <td className="py-2.5 px-4 font-bold text-white">
                  {bowler.name}
                </td>
                <td className="py-2.5 px-3 text-right text-slate-300 font-medium">
                  {bowler.overs}
                </td>
                <td className="py-2.5 px-3 text-right text-slate-400 font-medium">
                  {bowler.maidens}
                </td>
                <td className="py-2.5 px-3 text-right text-slate-300 font-medium">
                  {bowler.runs}
                </td>
                <td className="py-2.5 px-3 text-right">
                  <span className={`font-bold ${hasWickets ? 'text-red-400 font-extrabold text-base' : 'text-slate-400'}`}>
                    {bowler.wickets}
                  </span>
                </td>
                <td className="py-2.5 px-4 text-right text-slate-400 font-mono text-xs">
                  {bowler.economy}
                </td>
                <td className="py-2.5 px-3 text-right text-slate-500 font-medium hidden sm:table-cell">
                  {bowler.wd}
                </td>
                <td className="py-2.5 px-3 text-right text-slate-500 font-medium hidden sm:table-cell">
                  {bowler.nb}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BowlingTable;
