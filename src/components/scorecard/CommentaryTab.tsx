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
      return 'bg-red-600 text-white font-extrabold';
    }
    if (item.boundary === 'six' || (item.runs && item.runs === 6)) {
      return 'bg-purple-600 text-white font-extrabold';
    }
    if (item.boundary === 'four' || (item.runs && item.runs === 4)) {
      return 'bg-blue-600 text-white font-extrabold';
    }
    if (item.runs && item.runs > 0) {
      return 'bg-slate-800 text-white font-bold';
    }
    return 'bg-slate-100 text-slate-700 font-bold border border-slate-200';
  };

  return (
    <div className="space-y-3">
      {list.map((item, idx) => {
        return (
          <div
            key={idx}
            className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors"
          >
            <div className="flex items-start gap-3.5">
              {item.over && (
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs flex-shrink-0 font-mono shadow-2xs ${getBallBadgeStyle(
                    item
                  )}`}
                >
                  {item.over}
                </div>
              )}

              <div className="flex-1">
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {item.text}
                </p>
                {item.timestamp && (
                  <span className="text-[10px] text-slate-400 mt-1 block">
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
