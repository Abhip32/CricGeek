'use client';

import React from 'react';
import { RefreshCw, Trophy, Radio, Calendar, FileText } from 'lucide-react';

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
        return <Radio className="w-8 h-8 text-red-500" />;
      case 'schedule':
        return <Calendar className="w-8 h-8 text-red-500" />;
      case 'rankings':
        return <Trophy className="w-8 h-8 text-amber-400" />;
      case 'scorecard':
        return <FileText className="w-8 h-8 text-red-500" />;
      default:
        return <Radio className="w-8 h-8 text-slate-400" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 text-center rounded-2xl bg-white/[0.035] backdrop-blur-xl border border-white/[0.08] shadow-lg my-6 max-w-md mx-auto">
      <div className="p-4 rounded-full bg-white/[0.06] border border-white/10 mb-3.5 shadow-[0_0_20px_rgba(220,38,38,0.2)]">
        {getIcon()}
      </div>
      <h3 className="text-base font-bold text-white mb-1.5">{title}</h3>
      <p className="text-xs text-slate-400 max-w-sm mb-5 leading-relaxed">{displayMessage}</p>
      {handleAction && (
        <button
          onClick={handleAction}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)] border border-red-400/30"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
