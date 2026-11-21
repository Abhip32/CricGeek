'use client';

import React, { useState } from 'react';
import ImageWithFallback from '../common/ImageWithFallback';
import { ScorecardSummary } from '@/types/match';
import { X, Share2, Copy, Check, Download, Trophy, Flame } from 'lucide-react';

interface ShareCardModalProps {
  summary: ScorecardSummary;
  onClose: () => void;
}

export const ShareCardModal: React.FC<ShareCardModalProps> = ({ summary, onClose }) => {
  const [copied, setCopied] = useState(false);
  const team1 = summary.teams?.[0];
  const team2 = summary.teams?.[1];

  const handleCopy = () => {
    const text = `🏏 ${summary.matchTitle}\n${team1?.teamName}: ${team1?.score} (${team1?.overs || ''})\n${team2?.teamName}: ${team2?.score} (${team2?.overs || ''})\n${summary.result || summary.status}\n\nLive on CricGeek: ${window.location.href}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-950 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-slate-700/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-300">
              Shareable Match Graphic
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Graphic View */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-inner">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded tracking-wider">
              CRICGEEK
            </div>
            <span className="text-[11px] text-slate-400 font-medium truncate max-w-[220px]">
              {summary.venue || 'International Arena'}
            </span>
          </div>

          <h3 className="text-sm font-black text-slate-200 uppercase tracking-tight mb-5 line-clamp-1">
            {summary.matchTitle}
          </h3>

          {/* Teams and Scores */}
          <div className="space-y-4 my-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {team1?.teamLogo && (
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800 p-0.5 flex items-center justify-center">
                    <ImageWithFallback
                      src={team1.teamLogo}
                      alt={team1.teamName}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                )}
                <span className="font-black text-base text-white tracking-wide">
                  {team1?.teamName}
                </span>
              </div>
              <div className="text-right">
                <span className="font-mono text-xl font-black text-white">
                  {team1?.score || '—'}
                </span>
                {team1?.overs && (
                  <span className="text-xs text-slate-400 font-mono ml-1.5">
                    ({team1.overs})
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {team2?.teamLogo && (
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800 p-0.5 flex items-center justify-center">
                    <ImageWithFallback
                      src={team2.teamLogo}
                      alt={team2.teamName}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                )}
                <span className="font-black text-base text-white tracking-wide">
                  {team2?.teamName}
                </span>
              </div>
              <div className="text-right">
                <span className="font-mono text-xl font-black text-white">
                  {team2?.score || '—'}
                </span>
                {team2?.overs && (
                  <span className="text-xs text-slate-400 font-mono ml-1.5">
                    ({team2.overs})
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Status & Result Banner */}
          <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs font-bold text-red-500 uppercase tracking-wide">
              {summary.result || summary.status}
            </span>
            {summary.playerOfTheMatch && (
              <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5" />
                <span>POTM: {summary.playerOfTheMatch}</span>
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>COPIED TO CLIPBOARD</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-white" />
                <span>COPY MATCH SUMMARY</span>
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareCardModal;
