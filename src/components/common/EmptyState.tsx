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
        return <Radio className="w-8 h-8 text-red-600" />;
      case 'schedule':
        return <Calendar className="w-8 h-8 text-red-600" />;
      case 'rankings':
        return <Trophy className="w-8 h-8 text-amber-500" />;
      case 'scorecard':
        return <FileText className="w-8 h-8 text-red-600" />;
      default:
        return <Radio className="w-8 h-8 text-slate-400" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 text-center rounded-xl bg-white border border-slate-200 shadow-xs my-6 max-w-md mx-auto">
      <div className="p-3.5 rounded-full bg-slate-50 border border-slate-200 mb-3 shadow-inner">
        {getIcon()}
      </div>
      <h3 className="text-base font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 max-w-sm mb-5 leading-relaxed">{displayMessage}</p>
      {handleAction && (
        <button
          onClick={handleAction}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
