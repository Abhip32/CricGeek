'use client';

import React, { useMemo } from 'react';
import { useMatchNews } from '@/hooks/useCricketQueries';
import ImageWithFallback from '../common/ImageWithFallback';
import { Newspaper, Clock, User, ExternalLink, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface MatchNewsTabProps {
  scoreData?: any;
  matchUrl?: string;
  leagueId?: string;
  loading?: boolean;
}

export const MatchNewsTab: React.FC<MatchNewsTabProps> = ({
  scoreData,
  matchUrl,
  leagueId,
  loading: parentLoading
}) => {
  // Extract leagueId from matchUrl or scoreData if not explicitly provided
  const resolvedLeagueId = useMemo(() => {
    if (leagueId) return leagueId;
    if (matchUrl) {
      const match = matchUrl.match(/series\/(\d+)/i);
      if (match) return match[1];
    }
    const rawLeague = scoreData?.data?.raw?.header?.competitions?.[0]?.league?.id;
    if (rawLeague) return String(rawLeague);
    return '0';
  }, [leagueId, matchUrl, scoreData]);

  // Query tournament / match news
  const { data: queryNews, isLoading: isQueryLoading } = useMatchNews(resolvedLeagueId);

  // Normalize news articles from scoreData or queryNews
  const articles = useMemo(() => {
    const rawArticles: any[] = [];

    // 1. Direct articles from scorecard data
    const dataNews = scoreData?.data?.news;
    if (Array.isArray(dataNews) && dataNews.length > 0) {
      rawArticles.push(...dataNews);
    } else if (dataNews && typeof dataNews === 'object' && dataNews.headline) {
      rawArticles.push(dataNews);
    }

    const singleArticle = scoreData?.data?.article;
    if (singleArticle && typeof singleArticle === 'object' && singleArticle.headline) {
      if (!rawArticles.some(a => a.headline === singleArticle.headline)) {
        rawArticles.push(singleArticle);
      }
    }

    // 2. Query fallback from tournament / global news
    if (queryNews && Array.isArray(queryNews)) {
      for (const q of queryNews) {
        if (!rawArticles.some(a => (a.headline || a.title) === (q.headline || q.title))) {
          rawArticles.push(q);
        }
      }
    }

    // Format & sanitize
    return rawArticles.map((a) => {
      const headline = a.headline || a.title || 'Match Report';
      const description = a.description || a.summary || '';
      const image = a.images?.[0]?.url || a.image || a.coverImages || null;
      const byline = a.byline || a.author || 'ESPNcricinfo staff';
      const published = a.published || a.date || a.dateTime || '';
      const link = a.links?.web?.href || a.link || '#';

      return {
        headline,
        description,
        image,
        byline,
        published,
        link
      };
    });
  }, [scoreData, queryNews]);

  const loading = parentLoading || (isQueryLoading && articles.length === 0);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-64 rounded-xl bg-white border border-slate-200" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-48 rounded-xl bg-white border border-slate-200" />
          <div className="h-48 rounded-xl bg-white border border-slate-200" />
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-3 shadow-2xs">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
          <Newspaper className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900">No Match News Available</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Match preview notes, post-match analysis, and editorial reports will appear here as journalists publish coverage for this fixture.
        </p>
      </div>
    );
  }

  const [leadStory, ...secondaryStories] = articles;

  return (
    <div className="space-y-6">
      {/* Tab Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-red-50 text-red-600 border border-red-100">
            <Newspaper className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
              Match Coverage & Editorial Reports
            </h3>
            <span className="text-[11px] text-slate-400">
              Curated reports, match analysis, and player reactions
            </span>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
          {articles.length} Stories
        </span>
      </div>

      {/* Hero / Lead Match Report Card */}
      {leadStory && (
        <a
          href={leadStory.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Image Column */}
            <div className="lg:col-span-7 relative h-56 sm:h-72 lg:h-full min-h-[220px] bg-slate-100 overflow-hidden">
              <ImageWithFallback
                src={leadStory.image}
                alt={leadStory.headline}
                width={700}
                height={400}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                fallbackText="REPORT"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded bg-red-600 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Top Story
                </span>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-400" />
                    {leadStory.byline}
                  </span>
                  {leadStory.published && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {new Date(leadStory.published).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </>
                  )}
                </div>

                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-red-600 transition-colors leading-snug">
                  {leadStory.headline}
                </h2>

                {leadStory.description && (
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {leadStory.description}
                  </p>
                )}
              </div>

              <div className="pt-2 flex items-center gap-1 text-xs font-bold text-red-600 group-hover:underline">
                <span>Read Full Coverage</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </a>
      )}

      {/* Secondary Story Cards Grid */}
      {secondaryStories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {secondaryStories.map((story, idx) => (
            <a
              key={idx}
              href={story.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative h-40 bg-slate-100 overflow-hidden">
                  <ImageWithFallback
                    src={story.image}
                    alt={story.headline}
                    width={400}
                    height={220}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    fallbackText="NEWS"
                  />
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <User className="w-3 h-3" />
                    <span className="truncate max-w-[140px]">{story.byline}</span>
                    {story.published && (
                      <>
                        <span>•</span>
                        <span>
                          {new Date(story.published).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                    {story.headline}
                  </h3>

                  {story.description && (
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {story.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center gap-1 text-[11px] font-bold text-red-600 group-hover:underline">
                <span>Read Report</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchNewsTab;
