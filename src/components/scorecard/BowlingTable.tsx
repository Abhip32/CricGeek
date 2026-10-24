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
      <div className="py-6 text-center text-slate-500 text-sm">
        No bowling data available for this innings.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 glass-panel">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-slate-900/60 text-slate-400 font-semibold text-xs tracking-wider uppercase">
            <th className="py-3 px-4">Bowler</th>
            <th className="py-3 px-3 text-right">O</th>
            <th className="py-3 px-3 text-right">M</th>
            <th className="py-3 px-3 text-right">R</th>
            <th className="py-3 px-3 text-right">W</th>
            <th className="py-3 px-4 text-right">ECON</th>
            <th className="py-3 px-3 text-right hidden sm:table-cell">WD</th>
            <th className="py-3 px-3 text-right hidden sm:table-cell">NB</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.map((bowler, idx) => {
            const wicketsNum = parseInt(String(bowler.wickets), 10);
            const hasMultipleWickets = !isNaN(wicketsNum) && wicketsNum >= 3;

            return (
              <tr 
                key={idx}
                className="transition-colors hover:bg-white/[0.03] group"
              >
                <td className="py-3 px-4 font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  {bowler.name}
                </td>
                <td className="py-3 px-3 text-right text-slate-300 font-medium">
                  {bowler.overs}
                </td>
                <td className="py-3 px-3 text-right text-slate-400 font-medium">
                  {bowler.maidens}
                </td>
                <td className="py-3 px-3 text-right text-slate-300 font-medium">
                  {bowler.runs}
                </td>
                <td className="py-3 px-3 text-right">
                  <span className={`font-bold ${
                    hasMultipleWickets 
                      ? 'text-rose-400 font-extrabold px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30' 
                      : wicketsNum > 0 
                      ? 'text-rose-300 font-bold' 
                      : 'text-slate-400'
                  }`}>
                    {bowler.wickets}
                  </span>
                </td>
                <td className="py-3 px-4 text-right text-slate-300 font-mono text-xs">
                  {bowler.economy}
                </td>
                <td className="py-3 px-3 text-right text-slate-400 font-medium hidden sm:table-cell">
                  {bowler.wd}
                </td>
                <td className="py-3 px-3 text-right text-slate-400 font-medium hidden sm:table-cell">
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
