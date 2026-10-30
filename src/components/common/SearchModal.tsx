'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { usePlayerSearch, useUniversalSearch } from '@/hooks/useCricketQueries';
import ImageWithFallback from './ImageWithFallback';
import PlayerProfileModal from '../scorecard/PlayerProfileModal';
import { Search, X, User, Trophy, Shield, ArrowRight, Sparkles, Loader2 } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_SEARCH_TAGS = [
  'Virat Kohli',
  'Rohit Sharma',
  'Jasprit Bumrah',
  'Travis Head',
  'Pat Cummins',
  'Women\'s Big Bash League',
  'Sheffield Shield'
];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'player' | 'team' | 'league'>('all');
  const [selectedPlayer, setSelectedPlayer] = useState<{ id?: string | null; name: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Global ESC key listener to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Queries for players and universal entities
  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length >= 2;

  const { data: playerResults = [], isLoading: isPlayersLoading } = usePlayerSearch(
    hasQuery ? trimmedQuery : '',
    8
  );

  const { data: universalData, isLoading: isUniversalLoading } = useUniversalSearch(
    hasQuery ? trimmedQuery : '',
    activeFilter === 'all' ? undefined : activeFilter,
    8
  );

  if (!isOpen) return null;

  const isLoading = hasQuery && (isPlayersLoading || isUniversalLoading);
  const universalResults = universalData?.results || {};

  // Extract categorised results
  const playersList = playerResults.length > 0 ? playerResults : (universalResults.player || []);
  const teamsList = universalResults.team || [];
  const leaguesList = universalResults.league || [];

  const handleSelectPlayer = (player: { id?: string | null; name: string }) => {
    setSelectedPlayer(player);
  };

  const handleSelectTeamOrLeague = (item: any) => {
    onClose();
    if (item.type === 'league') {
      router.push(`/matches?tab=standings`);
    } else {
      router.push(`/matches?tab=recent`);
    }
  };

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Search Input */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center gap-3 bg-slate-50/50">
            <Search className="w-5 h-5 text-red-600 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search cricketers, teams, series or tournaments..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm sm:text-base font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            {isLoading && <Loader2 className="w-4 h-4 text-red-600 animate-spin flex-shrink-0" />}
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-black uppercase text-slate-500 bg-slate-200/80 rounded border border-slate-300">
              ESC
            </kbd>
          </div>

          {/* Filter Pills */}
          <div className="px-4 sm:px-5 py-2.5 bg-white border-b border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'All Results' },
              { id: 'player', label: 'Cricketers' },
              { id: 'team', label: 'Teams' },
              { id: 'league', label: 'Tournaments' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id as any)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-red-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:text-red-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Modal Results Container */}
          <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-5">
            {!hasQuery ? (
              /* Suggested / Popular Searches */
              <div className="space-y-3 py-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-red-600" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Trending Cricket Searches
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {QUICK_SEARCH_TAGS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 border border-slate-200/80 text-slate-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* 1. Cricketers Category */}
                {(activeFilter === 'all' || activeFilter === 'player') && playersList.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-red-600" />
                        Cricketers ({playersList.length})
                      </span>
                    </div>

                    <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                      {playersList.map((player: any) => (
                        <button
                          key={player.id || player.name}
                          type="button"
                          onClick={() => handleSelectPlayer({ id: player.id, name: player.name })}
                          className="w-full text-left p-3 flex items-center justify-between hover:bg-red-50/60 transition-colors group cursor-pointer focus:outline-none"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0 flex items-center justify-center group-hover:border-red-300 transition-colors">
                              <ImageWithFallback
                                src={player.headshot || player.image}
                                alt={player.name}
                                width={36}
                                height={36}
                                className="object-cover w-full h-full"
                                fallbackText={player.name?.slice(0, 1)}
                              />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-red-600 transition-colors truncate">
                                {player.name}
                              </h4>
                              {player.team && (
                                <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                                  {player.team}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 text-[11px] font-bold text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span>Dossier</span>
                            <ArrowRight className="w-3 h-3" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Teams Category */}
                {(activeFilter === 'all' || activeFilter === 'team') && teamsList.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-red-600" />
                        Teams ({teamsList.length})
                      </span>
                    </div>

                    <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                      {teamsList.map((team: any) => (
                        <button
                          key={team.id || team.name}
                          type="button"
                          onClick={() => handleSelectTeamOrLeague(team)}
                          className="w-full text-left p-3 flex items-center justify-between hover:bg-red-50/60 transition-colors group cursor-pointer focus:outline-none"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0 flex items-center justify-center">
                              {team.image ? (
                                <ImageWithFallback
                                  src={team.image}
                                  alt={team.name}
                                  width={36}
                                  height={36}
                                  className="object-contain"
                                  fallbackText={team.name?.slice(0, 1)}
                                />
                              ) : (
                                <Shield className="w-4 h-4 text-red-600" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-red-600 transition-colors truncate">
                                {team.name}
                              </h4>
                              {team.subtitle && (
                                <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                                  {team.subtitle}
                                </p>
                              )}
                            </div>
                          </div>

                          <span className="text-[11px] font-bold text-slate-400 group-hover:text-red-600 transition-colors">
                            View Matches →
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Leagues / Tournaments Category */}
                {(activeFilter === 'all' || activeFilter === 'league') && leaguesList.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Trophy className="w-3.5 h-3.5 text-red-600" />
                        Tournaments & Series ({leaguesList.length})
                      </span>
                    </div>

                    <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                      {leaguesList.map((league: any) => (
                        <button
                          key={league.id || league.name}
                          type="button"
                          onClick={() => handleSelectTeamOrLeague(league)}
                          className="w-full text-left p-3 flex items-center justify-between hover:bg-red-50/60 transition-colors group cursor-pointer focus:outline-none"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0 flex items-center justify-center">
                              <Trophy className="w-4 h-4 text-red-600" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-red-600 transition-colors truncate">
                                {league.name}
                              </h4>
                              {league.subtitle && (
                                <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                                  {league.subtitle}
                                </p>
                              )}
                            </div>
                          </div>

                          <span className="text-[11px] font-bold text-slate-400 group-hover:text-red-600 transition-colors">
                            Points Table →
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty State when no results found */}
                {!isLoading &&
                  playersList.length === 0 &&
                  teamsList.length === 0 &&
                  leaguesList.length === 0 && (
                    <div className="p-8 text-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                        <Search className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">No Results Found</h4>
                      <p className="text-xs text-slate-500">
                        No cricketers, teams, or series matched &ldquo;{query}&rdquo;. Check spelling or try a different keyword.
                      </p>
                    </div>
                  )}
              </>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              Universal Cricket Search
            </span>
            <span className="font-mono text-slate-400">Powered by ESPN Cricket Engine</span>
          </div>
        </div>
      </div>

      {/* Embedded Player Profile Modal if a player is selected */}
      {selectedPlayer && (
        <PlayerProfileModal
          playerId={selectedPlayer.id}
          playerName={selectedPlayer.name}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </>
  );
};

export default SearchModal;
