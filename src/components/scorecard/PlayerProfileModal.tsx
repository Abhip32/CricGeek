'use client';

import React, { useEffect } from 'react';
import { usePlayerProfile, usePlayerSearch } from '@/hooks/useCricketQueries';
import ImageWithFallback from '../common/ImageWithFallback';
import {
  X,
  ExternalLink,
  Shield,
  User,
  Calendar,
  Activity,
  Zap,
  Award,
  CheckCircle2,
  Globe
} from 'lucide-react';

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
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Clean the player name to improve search matching
  const cleanName = (playerName || '')
    .replace(/\s*\(c\)/i, '')
    .replace(/\s*†/g, '')
    .replace(/\s*\(wk\)/i, '')
    .replace(/►/g, '')
    .trim();

  // Search by player name if ID is missing or to obtain auxiliary metadata
  const shouldSearch = Boolean(cleanName && cleanName.length >= 2);
  const { data: searchResults, isLoading: isSearchLoading } = usePlayerSearch(
    shouldSearch ? cleanName : '',
    3
  );

  // Normalize search results (cricketApi.searchPlayers returns array)
  const searchList: any[] = Array.isArray(searchResults)
    ? searchResults
    : (searchResults as any)?.players || [];

  // Match the exact player or fall back to the top result
  const searchMatch =
    searchList.find((p: any) =>
      (p.name || '').toLowerCase().includes(cleanName.toLowerCase()) ||
      cleanName.toLowerCase().includes((p.name || '').toLowerCase())
    ) || searchList[0];

  // Resolve effective ID (prefer explicit ID, otherwise resolved search ID)
  const effectiveId = playerId || searchMatch?.id || null;

  // Query athlete profile
  const { data: profile, isLoading: isProfileLoading } = usePlayerProfile(
    effectiveId || undefined
  );

  if (!isOpen) return null;

  const loading = (isProfileLoading && !profile) || (isSearchLoading && !searchMatch && !profile);

  // Computed display data merging profile data and search metadata
  const displayName =
    profile?.name ||
    searchMatch?.name ||
    cleanName ||
    'Cricketer Profile';

  const fullLegalName =
    profile?.fullName && profile.fullName !== displayName
      ? profile.fullName
      : null;

  const headshot =
    profile?.headshot ||
    searchMatch?.headshot ||
    (effectiveId ? `https://a.espncdn.com/i/headshots/cricket/players/full/${effectiveId}.png` : null);

  const teamName = profile?.team?.name || searchMatch?.team || '';
  const teamFlag = profile?.team?.flag || null;
  const teamAbbr = profile?.team?.abbreviation || '';

  const role = profile?.position || 'Cricketer';
  const batStyle = profile?.battingStyle || null;
  const bowlStyle = profile?.bowlingStyle || null;

  // Format DOB and Age
  const age = profile?.age ? `${profile.age} years` : null;
  const dob = profile?.dateOfBirth || null;
  const dobFormatted = dob && age ? `${age} • Born ${dob}` : age || dob || 'Active Cricketer';

  const espnUrl =
    profile?.profileUrl ||
    searchMatch?.link ||
    (effectiveId ? `https://www.espncricinfo.com/player/${effectiveId}` : null);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner with Brand Athletic Gradient */}
        <div className="relative h-32 bg-gradient-to-r from-slate-950 via-slate-900 to-red-950 p-5 flex items-start justify-between border-b border-red-900/30">
          <div className="flex items-center gap-2">
            <span className="w-2 h-4 bg-red-600 rounded-full" />
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-red-500" />
              Official Athlete Dossier
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

        {/* Floating Athlete Avatar Card */}
        <div className="px-6 relative -mt-16 flex items-end justify-between">
          <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-4 border-white bg-slate-100 shadow-xl flex-shrink-0">
            <ImageWithFallback
              src={headshot}
              alt={displayName}
              width={112}
              height={112}
              className="object-cover w-full h-full"
              fallbackText={displayName}
            />
          </div>

          {/* Team Affiliation Badge */}
          {teamName && (
            <div className="flex items-center gap-2 pb-2 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-xl shadow-2xs">
              {teamFlag ? (
                <div className="w-6 h-4 overflow-hidden rounded shadow-2xs border border-slate-200 flex-shrink-0">
                  <ImageWithFallback
                    src={teamFlag}
                    alt={teamName}
                    width={24}
                    height={16}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <Globe className="w-4 h-4 text-red-600 flex-shrink-0" />
              )}
              <span className="text-xs font-black text-slate-800">
                {teamName} {teamAbbr && teamAbbr !== teamName ? `(${teamAbbr})` : ''}
              </span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Athlete Title & Role */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>{displayName}</span>
                <span title="Verified Athlete" className="inline-flex">
                  <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0" />
                </span>
              </h2>
            </div>
            {fullLegalName && (
              <p className="text-xs font-semibold text-slate-500">
                Full Name: {fullLegalName}
              </p>
            )}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                <Activity className="w-3.5 h-3.5 text-red-600" />
                {role}
              </span>
              {profile?.gender && (
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                  {profile.gender === 'F' ? 'Women’s Cricket' : 'Men’s Cricket'}
                </span>
              )}
            </div>
          </div>

          {/* Athletic Traits Grid */}
          {loading ? (
            <div className="grid grid-cols-2 gap-3 animate-pulse">
              <div className="h-20 rounded-xl bg-slate-100" />
              <div className="h-20 rounded-xl bg-slate-100" />
              <div className="h-20 rounded-xl bg-slate-100" />
              <div className="h-20 rounded-xl bg-slate-100" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Batting Style */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Zap className="w-3.5 h-3.5 text-red-600" />
                  <span className="text-[10px] font-black uppercase tracking-wider">
                    Batting Style
                  </span>
                </div>
                <strong className="text-sm font-bold text-slate-900 block truncate">
                  {batStyle || 'Right hand Bat'}
                </strong>
              </div>

              {/* Bowling Style */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Activity className="w-3.5 h-3.5 text-red-600" />
                  <span className="text-[10px] font-black uppercase tracking-wider">
                    Bowling Style
                  </span>
                </div>
                <strong className="text-sm font-bold text-slate-900 block truncate">
                  {bowlStyle || 'Specialist Batter'}
                </strong>
              </div>

              {/* Age & Birth Date */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-red-600" />
                  <span className="text-[10px] font-black uppercase tracking-wider">
                    Age & Birth Date
                  </span>
                </div>
                <strong className="text-sm font-bold text-slate-900 block truncate">
                  {dobFormatted}
                </strong>
              </div>

              {/* Team Representation */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Shield className="w-3.5 h-3.5 text-red-600" />
                  <span className="text-[10px] font-black uppercase tracking-wider">
                    Representation
                  </span>
                </div>
                <strong className="text-sm font-bold text-slate-900 block truncate">
                  {teamName || 'International / First-Class'}
                </strong>
              </div>
            </div>
          )}

          {/* Footer Action */}
          {espnUrl && (
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                Official Career Records & Stats
              </span>
              <a
                href={espnUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-red-600 transition-colors shadow-sm cursor-pointer ml-auto"
              >
                <span>View Full Career Records</span>
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
