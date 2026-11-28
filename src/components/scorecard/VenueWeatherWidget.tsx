'use client';

import React from 'react';
import { useMatchVenue, useMatchWeather } from '@/hooks/useCricketQueries';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import {
  MapPin,
  CloudRain,
  Wind,
  Droplets,
  Thermometer,
  Shield,
  AlertTriangle,
  Users2,
  Building
} from 'lucide-react';

interface VenueWeatherWidgetProps {
  matchUrl?: string;
  isLive?: boolean;
  className?: string;
}

export const VenueWeatherWidget: React.FC<VenueWeatherWidgetProps> = ({
  matchUrl,
  isLive = false,
  className = ''
}) => {
  const { data: venueData, isLoading: isVenueLoading } = useMatchVenue(matchUrl);
  const { data: weatherData, isLoading: isWeatherLoading } = useMatchWeather(matchUrl, undefined, undefined, isLive);

  const venue = (venueData as any)?.venue || venueData;
  const officials = venueData?.officials || [];

  if (isVenueLoading && isWeatherLoading) {
    return (
      <div className={`bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 ${className}`}>
        <div className="h-40 shimmer-block rounded-xl" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="h-16 shimmer-block-subtle rounded-lg" />
          <div className="h-16 shimmer-block-subtle rounded-lg" />
          <div className="h-16 shimmer-block-subtle rounded-lg" />
          <div className="h-16 shimmer-block-subtle rounded-lg" />
        </div>
      </div>
    );
  }

  if (!venue?.name && !weatherData?.temperatureC) {
    return null;
  }

  // Ensure photoUrl is https
  const photoUrl = venue?.photoUrl ? venue.photoUrl.replace(/^http:\/\//i, 'https://') : null;

  return (
    <div className={`bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs space-y-0 ${className}`}>
      {/* Stadium Photo Banner or Header */}
      {photoUrl ? (
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
          <img
            src={photoUrl}
            alt={venue?.name || 'Match Stadium'}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-1.5 text-xs text-red-400 font-bold uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>Official Stadium Profile</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white leading-tight">
              {venue?.name}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              {[venue?.city, venue?.country].filter(Boolean).join(', ')}
              {venue?.capacity ? ` • Capacity: ${venue.capacity.toLocaleString()} spectators` : ''}
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-5 bg-red-600 rounded-full flex-shrink-0" />
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Building className="w-4 h-4 text-red-600" />
                <span>Stadium & Ground Information</span>
              </h3>
              <p className="text-xs text-slate-500">
                {venue?.name || 'Match Venue'} • {[venue?.city, venue?.country].filter(Boolean).join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Live Venue Weather Radar */}
      {weatherData && (
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-50">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-sky-600" />
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Ground Weather & Conditions
              </h4>
            </div>
            {weatherData.rainInterruptionAlert ? (
              <span className="flex items-center gap-1 text-[11px] font-black text-amber-700 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full animate-pulse">
                <AlertTriangle className="w-3 h-3 text-amber-600" />
                Rain Delay Risk
              </span>
            ) : (
              <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                {weatherData.condition || 'Clear Play'}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {/* Temperature */}
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase mb-0.5">
                <Thermometer className="w-3.5 h-3.5 text-red-500" />
                <span>Temp</span>
              </div>
              <p className="text-sm sm:text-base font-black text-slate-900 font-mono">
                {weatherData.temperatureC}°C
                <span className="text-slate-400 text-xs font-normal ml-1">({weatherData.temperatureF}°F)</span>
              </p>
            </div>

            {/* Rain Probability */}
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase mb-0.5">
                <CloudRain className="w-3.5 h-3.5 text-sky-500" />
                <span>Rain Risk</span>
              </div>
              <p className="text-sm sm:text-base font-black text-slate-900 font-mono">
                {weatherData.rainProbability}%
              </p>
            </div>

            {/* Humidity */}
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase mb-0.5">
                <Droplets className="w-3.5 h-3.5 text-blue-500" />
                <span>Humidity</span>
              </div>
              <p className="text-sm sm:text-base font-black text-slate-900 font-mono">
                {weatherData.humidityPct}%
              </p>
            </div>

            {/* Wind Speed */}
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase mb-0.5">
                <Wind className="w-3.5 h-3.5 text-teal-500" />
                <span>Wind</span>
              </div>
              <p className="text-sm sm:text-base font-black text-slate-900 font-mono">
                {weatherData.windSpeedKmh} <span className="text-[10px] text-slate-500 font-normal">km/h</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Match Officials */}
      {officials.length > 0 && (
        <div className="p-4 sm:p-5 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <Users2 className="w-4 h-4 text-slate-600" />
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
              Match Officials & Umpires
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {officials.map((official, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-extrabold text-slate-900 truncate">{official.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{official.role}</p>
                </div>
                {official.countryFlag && (
                  <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 border border-slate-200 bg-white flex items-center justify-center p-0.5 shadow-2xs">
                    <ImageWithFallback
                      src={official.countryFlag}
                      alt={official.country || official.name}
                      width={20}
                      height={20}
                      className="w-full h-full object-contain rounded-full"
                      fallbackText={official.country || official.name}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueWeatherWidget;
