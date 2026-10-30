'use client';

import React from 'react';
import { usePlayerProfile, usePlayerSearch } from '@/hooks/useCricketQueries';
import ImageWithFallback from '../common/ImageWithFallback';
import { X, ExternalLink, Shield, User, Calendar, Activity, Zap, Award } from 'lucide-react';

interface PlayerProfileModalProps {
  playerId?: string | null;
  playerName?: string | null;
  isOpen?: boolean;
  onClose: () => void;
}

export const PlayerProfileModal: React.FC<PlayerProfileModalProps> = ({
  playerId,
  playerName,
  isOpen = true,
  onClose
}) => {
  // Query by ID if available
  const { data: profileById, isLoading: isProfileLoading } = usePlayerProfile(playerId || undefined);

  // If ID missing but name provided, search player to resolve ID
  const shouldSearch = !playerId && Boolean(playerName && playerName.trim().length >= 2);
  const { data: searchResults, isLoading: isSearchLoading } = usePlayerSearch(
    shouldSearch ? (playerName || '') : '',
    1
  );

  const resolvedSearchId = searchResults?.players?.[0]?.id;
  const { data: profileBySearch, isLoading: isSearchProfileLoading } = usePlayerProfile(
    resolvedSearchId || undefined
  );

  if (!isOpen) return null;

  const profile = profileById || profileBySearch;
  const loading = isProfileLoading || isSearchLoading || isSearchProfileLoading;

  const displayName = profile?.fullName || profile?.name || playerName || 'Cricketer Profile';
  const headshot =
    profile?.headshot ||
    (playerId ? `https://a.espncdn.com/i/headshots/cricket/players/full/${playerId}.png` : null);
  const team = profile?.team?.name || '';
  const teamFlag = profile?.team?.flag || null;
  const role = profile?.position || 'Cricketer';
  const batStyle = profile?.battingStyle || null;
  const bowlStyle = profile?.bowlingStyle || null;
  const age = profile?.age ? `${profile.age} years` : null;
  const dob = profile?.dateOfBirth || null;
  const espnUrl = profile?.profileUrl || (profile?.id ? `https://www.espncricinfo.com/player/${profile.id}` : null);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner with Brand Crimson Accent */}
        <div className="relative h-28 bg-gradient-to-r from-slate-900 via-slate-800 to-red-900 p-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-red-500 rounded-full" />
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-300">
              Player Dossier & Profile
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Floating Athlete Avatar */}
        <div className="px-6 relative -mt-14 flex items-end justify-between">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-4 border-white bg-slate-100 shadow-md flex-shrink-0">
            <ImageWithFallback
              src={headshot}
              alt={displayName}
              width={96}
              height={96}
              className="object-cover w-full h-full"
              fallbackText={displayName}
            />
          </div>

          {team && (
            <div className="flex items-center gap-2 pb-2">
              {teamFlag && (
                <div className="w-6 h-4 overflow-hidden rounded shadow-2xs border border-slate-200">
                  <ImageWithFallback
                    src={teamFlag}
                    alt={team}
                    width={24}
                    height={16}
                    className="object-cover"
                  />
                </div>
              )}
              <span className="text-xs font-bold text-slate-700">{team}</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Athlete Title & Role */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {displayName}
              </h2>
            </div>
            <div className="flex items-center gap-2 pt-0.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                <Activity className="w-3 h-3 text-red-600" />
                {role}
              </span>
              {profile?.gender && (
                <span className="text-[11px] font-medium text-slate-400">
                  {profile.gender === 'M' ? 'Men’s Cricket' : 'Women’s Cricket'}
                </span>
              )}
            </div>
          </div>

          {/* Athletic Traits Grid */}
          {loading && !profile ? (
            <div className="grid grid-cols-2 gap-3 animate-pulse">
              <div className="h-16 rounded-xl bg-slate-100" />
              <div className="h-16 rounded-xl bg-slate-100" />
              <div className="h-16 rounded-xl bg-slate-100" />
              <div className="h-16 rounded-xl bg-slate-100" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Batting Style */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 space-y-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Batting Style
                </span>
                <strong className="text-xs sm:text-sm font-bold text-slate-900 block truncate">
                  {batStyle || 'Right hand Bat'}
                </strong>
              </div>

              {/* Bowling Style */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 space-y-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Bowling Style
                </span>
                <strong className="text-xs sm:text-sm font-bold text-slate-900 block truncate">
                  {bowlStyle || 'Right arm Medium'}
                </strong>
              </div>

              {/* Age & Birth */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 space-y-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Age
                </span>
                <strong className="text-xs sm:text-sm font-bold text-slate-900 block">
                  {age || (dob ? dob : 'Active Cricketer')}
                </strong>
              </div>

              {/* Team Representation */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 space-y-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Affiliation
                </span>
                <strong className="text-xs sm:text-sm font-bold text-slate-900 block truncate">
                  {team || 'First-Class / International'}
                </strong>
              </div>
            </div>
          )}

          {/* Footer Action */}
          {espnUrl && (
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">
                Official Career Records
              </span>
              <a
                href={espnUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white hover:bg-red-600 transition-colors shadow-2xs"
              >
                <span>View Full Career Stats</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerProfileModal;
