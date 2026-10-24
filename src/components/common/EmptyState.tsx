'use client';

import React from 'react';
import { RefreshCw, Trophy, Radio, Calendar, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  description?: string;
  type?: 'live' | 'matches' | 'schedule' | 'news' | 'rankings' | 'scorecard';
  actionLabel?: string;
  onRetry?: () => void;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No matches found',
  message,
  description,
  type = 'matches',
  actionLabel = 'Refresh Now',
  onRetry,
  onAction
}) => {
  const displayMessage = description || message || 'There are no active matches in this section at the moment. Check back soon!';
  const handleAction = onAction || onRetry;

  const getIcon = () => {
    switch (type) {
      case 'live':
        return <Radio className="w-10 h-10 text-emerald-400" />;
      case 'schedule':
        return <Calendar className="w-10 h-10 text-cyan-400" />;
      case 'rankings':
        return <Trophy className="w-10 h-10 text-amber-400" />;
      case 'scorecard':
        return <Sparkles className="w-10 h-10 text-emerald-400" />;
      default:
        return <Radio className="w-10 h-10 text-slate-400" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl glass-panel border border-white/5 my-6 max-w-lg mx-auto">
      <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/40 mb-4 shadow-inner">
        {getIcon()}
      </div>
      <h3 className="text-lg font-bold text-white mb-1.5">{title}</h3>
      <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">{displayMessage}</p>
      {handleAction && (
        <button
          onClick={handleAction}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all duration-200"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
