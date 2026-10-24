'use client';

import React from 'react';
import EmptyState from '../common/EmptyState';

interface CommentaryItem {
  over?: string;
  ball?: number;
  text: string;
  timestamp?: string;
  runs?: number;
  wicket?: boolean;
  boundary?: 'four' | 'six';
}

interface CommentaryTabProps {
  commentaryData?: CommentaryItem[] | any;
  loading?: boolean;
}

export const CommentaryTab: React.FC<CommentaryTabProps> = ({ commentaryData, loading }) => {
  if (loading) {
    return (
      <div className="space-y-3 animate-pulse">
        <div className="h-16 rounded-xl bg-white border border-slate-200" />
        <div className="h-16 rounded-xl bg-white border border-slate-200" />
        <div className="h-16 rounded-xl bg-white border border-slate-200" />
      </div>
    );
  }

  const list: CommentaryItem[] = Array.isArray(commentaryData) ? commentaryData : [];

  if (list.length === 0) {
    return (
      <EmptyState
        type="scorecard"
        title="Live Commentary Not Available"
        message="Ball-by-ball commentary is not active for this fixture or will commence when the match starts."
      />
    );
  }

  const getBallBadgeStyle = (item: CommentaryItem) => {
    if (item.wicket) {
      return 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-[0_0_12px_rgba(239,68,68,0.4)] font-extrabold';
    }
    if (item.boundary === 'six' || (item.runs && item.runs === 6)) {
      return 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.4)] font-extrabold';
    }
    if (item.boundary === 'four' || (item.runs && item.runs === 4)) {
      return 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-[0_0_12px_rgba(59,130,246,0.4)] font-extrabold';
    }
    if (item.runs && item.runs > 0) {
      return 'bg-white/10 text-white font-bold border border-white/10';
    }
    return 'bg-white/[0.04] text-slate-400 font-bold border border-white/[0.06]';
  };

  return (
    <div className="space-y-3">
      {list.map((item, idx) => {
        return (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-white/[0.035] backdrop-blur-xl border border-white/[0.08] shadow-md hover:border-white/20 transition-all"
          >
            <div className="flex items-start gap-3.5">
              {item.over && (
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs flex-shrink-0 font-mono shadow-sm ${getBallBadgeStyle(
                    item
                  )}`}
                >
                  {item.over}
                </div>
              )}

              <div className="flex-1">
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {item.text}
                </p>
                {item.timestamp && (
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    {item.timestamp}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentaryTab;
