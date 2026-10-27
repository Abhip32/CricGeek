'use client';

import React from 'react';
import EmptyState from '../common/EmptyState';
import { MessageSquare, ShieldAlert, Award } from 'lucide-react';

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
  if (loading) {
    return (
      <div className="space-y-3 animate-pulse">
        <div className="h-20 rounded-xl bg-white border border-slate-200" />
        <div className="h-20 rounded-xl bg-white border border-slate-200" />
        <div className="h-20 rounded-xl bg-white border border-slate-200" />
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
      return 'bg-red-600 text-white font-black';
    }
    if (item.boundary === 'six' || item.runs === 6) {
      return 'bg-purple-600 text-white font-black';
    }
    if (item.boundary === 'four' || item.runs === 4) {
      return 'bg-blue-600 text-white font-black';
    }
    if (item.runs && item.runs > 0) {
      return 'bg-slate-800 text-white font-bold';
    }
    return 'bg-slate-100 text-slate-700 font-bold border border-slate-200';
  };

  const getEventBadge = (item: CommentaryItem) => {
    if (item.wicket) {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-red-100 text-red-700 border border-red-200">
          Wicket
        </span>
      );
    }
    if (item.boundary === 'six' || item.runs === 6) {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-700 border border-purple-200">
          Six
        </span>
      );
    }
    if (item.boundary === 'four' || item.runs === 4) {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200">
          Four
        </span>
      );
    }
    if (item.shortText && item.shortText !== '•') {
      return (
        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
          {item.shortText}
        </span>
      );
    }
    return null;
  };

  return (
    <div className="space-y-3">
      {list.map((item, idx) => {
        const headline = [item.bowler, item.batter ? `to ${item.batter}` : null]
          .filter(Boolean)
          .join(' ');

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

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {headline && (
                    <span className="text-xs font-black text-slate-900 tracking-tight">
                      {headline}
                    </span>
                  )}
                  {getEventBadge(item)}
                  {item.timestamp && (
                    <span className="text-[10px] text-slate-400 ml-auto">
                      {item.timestamp}
                    </span>
                  )}
                </div>

                {item.preText && (
                  <p className="text-xs font-semibold text-slate-600 italic">
                    {item.preText}
                  </p>
                )}

                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {item.text || item.shortText}
                </p>

                {item.postText && (
                  <p className="text-xs font-semibold text-slate-600 italic pt-0.5">
                    {item.postText}
                  </p>
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
