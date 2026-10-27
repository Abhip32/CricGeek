'use client';

import React, { useState, useMemo } from 'react';
import EmptyState from '../common/EmptyState';
import { MessageSquare, Flame, Zap, ShieldAlert, Award } from 'lucide-react';

interface CommentaryItem {
  over?: string;
  ball?: number;
  text?: string;
  shortText?: string;
  timestamp?: string;
  runs?: number;
  wicket?: boolean;
  boundary?: 'four' | 'six';
  batter?: string;
  bowler?: string;
  preText?: string;
  postText?: string;
}

interface CommentaryTabProps {
  commentaryData?: CommentaryItem[] | any;
  loading?: boolean;
}

export const CommentaryTab: React.FC<CommentaryTabProps> = ({ commentaryData, loading }) => {
  const [filter, setFilter] = useState<'all' | 'wickets' | 'boundaries'>('all');

  const rawList: CommentaryItem[] = Array.isArray(commentaryData) ? commentaryData : [];

  const filteredList = useMemo(() => {
    if (filter === 'wickets') {
      return rawList.filter((item) => item.wicket || /out|wicket|bowled|caught|lbw|run out|stumped/i.test(item.text || item.shortText || ''));
    }
    if (filter === 'boundaries') {
      return rawList.filter((item) => item.boundary || item.runs === 4 || item.runs === 6 || /four|six/i.test(item.shortText || ''));
    }
    return rawList;
  }, [rawList, filter]);

  if (loading) {
    return (
      <div className="space-y-3 animate-pulse">
        <div className="h-16 rounded-xl bg-white border border-slate-200" />
        <div className="h-16 rounded-xl bg-white border border-slate-200" />
        <div className="h-16 rounded-xl bg-white border border-slate-200" />
      </div>
    );
  }

  if (rawList.length === 0) {
    return (
      <EmptyState
        type="scorecard"
        title="Commentary In Progress"
        message="Live ball-by-ball commentary and play updates will appear here as the action unfolds."
      />
    );
  }

  const getBallBadge = (item: CommentaryItem) => {
    const isWicket = item.wicket || /out|bowled|caught|lbw|run out|stumped/i.test(item.shortText || '');
    const isSix = item.boundary === 'six' || item.runs === 6;
    const isFour = item.boundary === 'four' || item.runs === 4;

    if (isWicket) {
      return {
        style: 'bg-red-600 text-white font-black shadow-xs',
        label: 'W'
      };
    }
    if (isSix) {
      return {
        style: 'bg-purple-600 text-white font-black shadow-xs',
        label: '6'
      };
    }
    if (isFour) {
      return {
        style: 'bg-blue-600 text-white font-black shadow-xs',
        label: '4'
      };
    }
    if (item.runs && item.runs > 0) {
      return {
        style: 'bg-slate-800 text-white font-black shadow-2xs',
        label: String(item.runs)
      };
    }
    return {
      style: 'bg-slate-100 text-slate-700 font-bold border border-slate-200',
      label: '•'
    };
  };

  const getOutcomePill = (item: CommentaryItem) => {
    const text = (item.shortText || item.text || '').toLowerCase();
    const isWicket = item.wicket || /out|bowled|caught|lbw|run out|stumped/i.test(text);

    if (isWicket) {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-red-100 text-red-700 border border-red-200">
          Wicket
        </span>
      );
    }
    if (item.boundary === 'six' || item.runs === 6 || text.includes('six')) {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-700 border border-purple-200">
          Six
        </span>
      );
    }
    if (item.boundary === 'four' || item.runs === 4 || text.includes('four')) {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200">
          Four
        </span>
      );
    }
    if (item.runs && item.runs > 0) {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
          {item.runs} {item.runs === 1 ? 'run' : 'runs'}
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-50 text-slate-500 border border-slate-200">
        no run
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Commentary Filter Pills */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Balls', count: rawList.length },
            { id: 'wickets', label: 'Wickets', count: rawList.filter(i => i.wicket || /out|wicket|bowled|caught|lbw/i.test(i.shortText || '')).length },
            { id: 'boundaries', label: 'Boundaries (4s & 6s)', count: rawList.filter(i => i.boundary || i.runs === 4 || i.runs === 6).length },
          ].map(tab => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-red-600 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-red-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
          Latest Balls First
        </span>
      </div>

      {/* Ball by Ball Timeline Stream */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs divide-y divide-slate-100">
        {filteredList.map((item, idx) => {
          const badge = getBallBadge(item);
          const rawText = item.text || item.shortText || '';

          // Derive clean bowler to batter heading without duplication
          let matchUp = '';
          if (item.bowler && item.batter) {
            matchUp = `${item.bowler} to ${item.batter}`;
          } else if (item.bowler) {
            matchUp = item.bowler;
          } else {
            const toMatch = rawText.match(/^(.*?to\s+.*?),/i);
            if (toMatch) matchUp = toMatch[1].trim();
          }

          // Strip duplicate matchup prefix from description body if present
          let narrative = rawText;
          if (matchUp && narrative.toLowerCase().startsWith(matchUp.toLowerCase())) {
            narrative = narrative.slice(matchUp.length).replace(/^,\s*/, '').trim();
          }

          return (
            <div
              key={idx}
              className={`p-4 sm:p-4.5 flex items-start gap-3 sm:gap-4 hover:bg-slate-50/60 transition-colors ${
                item.wicket ? 'bg-red-50/20' : ''
              }`}
            >
              {/* Over & Outcome Badge Column */}
              <div className="flex flex-col items-center gap-1 flex-shrink-0 w-11 sm:w-12">
                <span className="font-mono text-xs font-black text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                  {item.over || `${idx + 1}`}
                </span>
                <span
                  className={`w-6.5 h-6.5 rounded-full flex items-center justify-center text-xs font-black ${badge.style}`}
                >
                  {badge.label}
                </span>
              </div>

              {/* Commentary Narrative */}
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  {matchUp && (
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                      {matchUp}
                    </h4>
                  )}
                  {getOutcomePill(item)}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {narrative}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentaryTab;
