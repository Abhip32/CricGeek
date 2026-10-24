'use client';

import React from 'react';
import EmptyState from '../common/EmptyState';
import { motion } from 'framer-motion';

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
      <div className="space-y-4 animate-pulse">
        <div className="h-20 rounded-xl glass-panel bg-white/5" />
        <div className="h-20 rounded-xl glass-panel bg-white/5" />
        <div className="h-20 rounded-xl glass-panel bg-white/5" />
      </div>
    );
  }

  const list: CommentaryItem[] = Array.isArray(commentaryData) ? commentaryData : [];

  if (list.length === 0) {
    return (
      <EmptyState
        title="No Live Commentary"
        description="Ball-by-ball commentary is not available for this match or will start when the match goes live."
      />
    );
  }

  const getBallBadgeStyle = (item: CommentaryItem) => {
    if (item.wicket) {
      return 'bg-rose-500/20 text-rose-400 border border-rose-500/40';
    }
    if (item.boundary === 'six' || (item.runs && item.runs === 6)) {
      return 'bg-purple-500/20 text-purple-300 border border-purple-500/40';
    }
    if (item.boundary === 'four' || (item.runs && item.runs === 4)) {
      return 'bg-blue-500/20 text-blue-300 border border-blue-500/40';
    }
    if (item.runs && item.runs > 0) {
      return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
    }
    return 'bg-white/5 text-slate-400 border border-white/10';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-3"
    >
      {list.map((item, idx) => {
        const isOverSummary = !item.over?.includes('.');
        return (
          <div
            key={idx}
            className={`p-4 rounded-xl border transition-colors ${
              isOverSummary 
                ? 'glass-panel border-white/10 bg-slate-900/60' 
                : 'glass-card border-white/5 hover:border-white/10'
            }`}
          >
            <div className="flex items-start gap-4">
              {item.over && (
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 font-mono shadow-md ${getBallBadgeStyle(
                    item
                  )}`}
                >
                  {item.over}
                </div>
              )}

              <div className="flex-1">
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  {item.text}
                </p>
                {item.timestamp && (
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    {item.timestamp}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default CommentaryTab;
