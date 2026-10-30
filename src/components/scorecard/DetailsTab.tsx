'use client';

import React, { useMemo } from 'react';
import { ScorecardSummary } from '@/types/match';
import { useMatchPreview } from '@/hooks/useCricketQueries';
import ImageWithFallback from '../common/ImageWithFallback';
import {
  Info,
  MapPin,
  Trophy,
  ShieldCheck,
  Flag,
  Users,
  Clock,
  Calendar,
  Star,
  CheckCircle2,
  CloudSun,
  Layers,
  Compass,
  Newspaper
} from 'lucide-react';

interface DetailsTabProps {
  scoreData: any;
  matchUrl?: string;
  loading?: boolean;
}

export const DetailsTab: React.FC<DetailsTabProps> = ({ scoreData, matchUrl, loading }) => {
  const { data: previewData } = useMatchPreview(matchUrl);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-48 rounded-xl bg-white border border-slate-200" />
        <div className="h-64 rounded-xl bg-white border border-slate-200" />
      </div>
    );
  }

  const summary: ScorecardSummary = scoreData?.data?.summary || scoreData?.summary || {};
  const scrapedDetails = scoreData?.data?.details || scoreData?.details || {};
  const legacyDetails = scoreData?.matchInfo?.details || {};
  const gameInfo = scoreData?.data?.gameInfo || {};
  const notes = scoreData?.data?.notes || scoreData?.notes || [];

  const pitchReport = previewData?.pitchReport || '';
  const captainQuotes = previewData?.captainQuotes || '';

  // Venue metadata
  const venue = gameInfo?.venue || {};
  const venueName = venue?.fullName || scrapedDetails['Ground'] || summary.venue || '';
  const venueCity = venue?.address?.city || '';
  const venueCountry = venue?.address?.country || '';
  const venueCapacity = venue?.capacity ? Number(venue.capacity).toLocaleString() : null;

  // Weather metadata
  const weather = gameInfo?.weather;

  // Toss result
  const tossResult = scrapedDetails['Toss'] || legacyDetails['Toss'] || summary.toss || previewData?.toss || '';

  // Match Details List
  const detailsList: Array<{ label: string; value: string; icon?: any }> = [];

  if (summary.matchTitle) {
    detailsList.push({ label: 'Match', value: summary.matchTitle, icon: Info });
  }

  if (scrapedDetails['Series'] || legacyDetails['Series']) {
    detailsList.push({ label: 'Series', value: scrapedDetails['Series'] || legacyDetails['Series'], icon: Flag });
  }

  if (summary.playerOfTheMatch || scrapedDetails['Player Of The Match']) {
    detailsList.push({ label: 'Player of the Match', value: summary.playerOfTheMatch || scrapedDetails['Player Of The Match'], icon: Star });
  }

  if (summary.result) {
    detailsList.push({ label: 'Match Result', value: summary.result, icon: ShieldCheck });
  }

  if (scrapedDetails['Season']) {
    detailsList.push({ label: 'Season', value: scrapedDetails['Season'], icon: Calendar });
  }

  if (scrapedDetails['Match days']) {
    detailsList.push({ label: 'Match Days', value: scrapedDetails['Match days'], icon: Calendar });
  }

  if (scrapedDetails['Hours of play (local time)']) {
    detailsList.push({ label: 'Hours of Play', value: scrapedDetails['Hours of play (local time)'], icon: Clock });
  }

  // Officials List
  const officials: Array<{ role: string; name: string }> = [];
  if (scrapedDetails['Umpires']) officials.push({ role: 'On-Field Umpire', name: scrapedDetails['Umpires'] });
  if (scrapedDetails['TV Umpire']) officials.push({ role: 'TV / Third Umpire', name: scrapedDetails['TV Umpire'] });
  if (scrapedDetails['Match Referee']) officials.push({ role: 'Match Referee', name: scrapedDetails['Match Referee'] });
  if (scrapedDetails['Reserve Umpire']) officials.push({ role: 'Reserve Umpire', name: scrapedDetails['Reserve Umpire'] });

  // Fallback to gameInfo officials
  if (officials.length === 0 && Array.isArray(gameInfo?.officials)) {
    for (const off of gameInfo.officials) {
      officials.push({
        role: off.position?.name || 'Match Official',
        name: off.displayName || off.name || 'Official'
      });
    }
  }

  // Match Coverage articles from scorecard payload
  const coverageArticles: Array<{ headline: string; description: string; image?: string; link?: string; byline?: string; date?: string }> = useMemo(() => {
    const list: any[] = [];
    const newsData = scoreData?.data?.news;
    if (Array.isArray(newsData)) {
      list.push(...newsData);
    } else if (newsData && typeof newsData === 'object' && newsData.headline) {
      list.push(newsData);
    }

    const singleArticle = scoreData?.data?.article;
    if (singleArticle && typeof singleArticle === 'object' && singleArticle.headline) {
      if (!list.some(a => a.headline === singleArticle.headline)) {
        list.push(singleArticle);
      }
    }

    return list.slice(0, 4).map(a => ({
      headline: a.headline || a.title || 'Match Report',
      description: a.description || '',
      image: a.images?.[0]?.url || a.image || null,
      link: a.links?.web?.href || a.link || '#',
      byline: a.byline || a.author || 'ESPNcricinfo staff',
      date: a.published || a.date || ''
    }));
  }, [scoreData]);

  return (
    <div className="space-y-6">
      {/* Toss Result Alert Banner */}
      {tossResult && (
        <div className="bg-gradient-to-r from-red-50 to-white border border-red-200/80 rounded-xl p-4 sm:p-4.5 flex items-start gap-3 shadow-2xs">
          <div className="p-2 rounded-lg bg-red-600 text-white flex-shrink-0 mt-0.5">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block">
              Toss Outcome
            </span>
            <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
              {tossResult}
            </p>
          </div>
        </div>
      )}

      {/* Pitch & Weather Insights Card (When Pitch Report or Weather is present) */}
      {(pitchReport || weather || captainQuotes) && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
          <div className="p-4 sm:p-4.5 border-b border-slate-100 bg-slate-50/60 flex items-center gap-2">
            <Layers className="w-4 h-4 text-red-600" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
              Pitch Assessment & Playing Conditions
            </h3>
          </div>

          <div className="p-4 sm:p-5 space-y-4">
            {pitchReport && (
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Commentator Pitch Report
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal bg-slate-50/70 p-3 rounded-lg border border-slate-100">
                  {pitchReport}
                </p>
              </div>
            )}

            {weather && (
              <div className="flex items-center gap-2.5 text-xs text-slate-700 pt-1">
                <CloudSun className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>
                  Weather:{' '}
                  <strong>{weather.displayValue || weather.condition || 'Clear'}</strong>
                  {weather.temperature && <span> ({weather.temperature}°C)</span>}
                </span>
              </div>
            )}

            {captainQuotes && (
              <div className="space-y-1 pt-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Captain Toss Quote
                </span>
                <p className="text-xs text-slate-600 italic bg-slate-50/70 p-3 rounded-lg border border-slate-100">
                  &ldquo;{captainQuotes}&rdquo;
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Match Details Key-Value Card */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="p-4 sm:p-4.5 border-b border-slate-200 bg-slate-50 flex items-center gap-2.5">
          <Info className="w-4 h-4 text-red-600" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
            Match Information
          </h3>
        </div>

        {detailsList.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            No match info details available for this match.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {detailsList.map((item, idx) => {
              const Icon = item.icon || Info;
              return (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-center gap-2.5 text-slate-600">
                    <Icon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span className="text-xs font-semibold">{item.label}</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 sm:text-right max-w-xl">
                    {item.value}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Match Officials Card */}
      {officials.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
          <div className="p-4 sm:p-4.5 border-b border-slate-200 bg-slate-50 flex items-center gap-2.5">
            <Users className="w-4 h-4 text-red-600" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
              Match Officials
            </h3>
          </div>
          <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {officials.map((off, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 p-3 rounded-lg flex items-center justify-between gap-2"
              >
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {off.role}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {off.name}
                  </span>
                </div>
                <div className="w-2 h-2 rounded-full bg-slate-300" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Venue Facts Card */}
      {venueName && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
          <div className="p-4 sm:p-4.5 border-b border-slate-200 bg-slate-50 flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-red-600" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
              Venue & Ground Facts
            </h3>
          </div>
          <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 text-[11px] font-medium block">Ground Name</span>
              <strong className="text-slate-900 text-sm block mt-0.5">{venueName}</strong>
              {(venueCity || venueCountry) && (
                <span className="text-slate-500 text-xs block mt-0.5">
                  {[venueCity, venueCountry].filter(Boolean).join(', ')}
                </span>
              )}
            </div>

            {venueCapacity && (
              <div>
                <span className="text-slate-400 text-[11px] font-medium block">Spectator Capacity</span>
                <strong className="text-slate-900 text-sm block mt-0.5 font-mono">{venueCapacity}</strong>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Match Coverage Reports */}
      {coverageArticles.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
          <div className="p-4 sm:p-4.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Newspaper className="w-4 h-4 text-red-600" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                Match Coverage & Reports
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">ESPNcricinfo desk</span>
          </div>

          <div className="divide-y divide-slate-100">
            {coverageArticles.map((article, idx) => (
              <a
                key={idx}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3.5 sm:p-4 flex items-center gap-3.5 sm:gap-4 hover:bg-slate-50/70 transition-colors"
              >
                <div className="w-20 sm:w-24 h-14 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.headline}
                    width={96}
                    height={64}
                    className="object-cover w-full h-full group-hover:scale-103 transition-transform duration-200"
                    fallbackText="NEWS"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                    {article.headline}
                  </h4>
                  {article.description && (
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {article.description}
                    </p>
                  )}
                  <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1.5">
                    <span>{article.byline}</span>
                    {article.date && (
                      <>
                        <span>•</span>
                        <span>{article.date}</span>
                      </>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Match Notes & Milestones */}
      {Array.isArray(notes) && notes.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
          <div className="p-4 sm:p-4.5 border-b border-slate-200 bg-slate-50 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-red-600" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
              Match Notes & Milestones
            </h3>
          </div>
          <div className="p-4 sm:p-5 space-y-2.5">
            {notes.map((note: any, idx: number) => {
              const text = typeof note === 'string' ? note : note.text || note.note || JSON.stringify(note);
              return (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 flex-shrink-0" />
                  <span>{text}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsTab;
