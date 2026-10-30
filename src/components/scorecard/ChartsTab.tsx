'use client';

import React, { useState, useMemo } from 'react';
import { useManhattan, useWorm } from '@/hooks/useCricketQueries';
import { ManhattanInnings, WormTrajectory } from '@/types/match';
import { BarChart2, TrendingUp, CircleAlert, Info } from 'lucide-react';

interface ChartsTabProps {
  matchUrl?: string;
  scoreData?: any;
}

export const ChartsTab: React.FC<ChartsTabProps> = ({ matchUrl, scoreData }) => {
  const { data: manhattanData, isLoading: isManhattanLoading } = useManhattan(matchUrl);
  const { data: wormData, isLoading: isWormLoading } = useWorm(matchUrl);

  const [activeChart, setActiveChart] = useState<'both' | 'manhattan' | 'worm'>('both');
  const [selectedInning, setSelectedInning] = useState<number>(0);
  const [hoveredOver, setHoveredOver] = useState<any | null>(null);

  // Extract Manhattan innings
  const manhattanInnings: ManhattanInnings[] = useMemo(() => {
    if (manhattanData?.innings && Array.isArray(manhattanData.innings)) {
      return manhattanData.innings;
    }
    return [];
  }, [manhattanData]);

  // Extract Worm trajectories
  const wormTrajectories: WormTrajectory[] = useMemo(() => {
    if (wormData?.trajectories && Array.isArray(wormData.trajectories)) {
      return wormData.trajectories;
    }
    if (wormData?.innings && Array.isArray(wormData.innings)) {
      return wormData.innings;
    }
    return [];
  }, [wormData]);

  const activeManhattan = manhattanInnings[selectedInning] || manhattanInnings[0];

  const isLoading = isManhattanLoading || isWormLoading;

  if (isLoading && !manhattanData && !wormData) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-64 rounded-xl bg-white border border-slate-200" />
        <div className="h-64 rounded-xl bg-white border border-slate-200" />
      </div>
    );
  }

  const hasManhattan = manhattanInnings.length > 0 && activeManhattan?.overs?.length > 0;
  const hasWorm = wormTrajectories.length > 0 && wormTrajectories.some(t => t.trajectory?.length > 1);

  if (!hasManhattan && !hasWorm) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-3 shadow-2xs">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
          <BarChart2 className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900">Over-by-Over Charts Unavailable</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Over-by-over Manhattan bar charts and Worm trajectory curves will be rendered once the commentary and ball progression data is published.
        </p>
      </div>
    );
  }

  // Calculate Manhattan Chart SVG Dimensions & Scaling
  const oversList = activeManhattan?.overs || [];
  const maxRunsInOver = Math.max(12, ...oversList.map(o => o.runs));
  const chartHeight = 220;
  const barWidth = 14;
  const gap = 6;
  const paddingLeft = 32;
  const paddingBottom = 30;
  const chartWidth = Math.max(500, oversList.length * (barWidth + gap) + paddingLeft + 30);

  // Calculate Worm Chart Dimensions & Scaling
  const wormMaxOvers = Math.max(
    20,
    ...wormTrajectories.map(t => Math.max(...(t.trajectory || []).map(p => p.over)))
  );
  const wormMaxScore = Math.max(
    100,
    ...wormTrajectories.map(t => Math.max(...(t.trajectory || []).map(p => p.score)))
  );
  const wormWidth = 650;
  const wormHeight = 220;
  const wormPaddingLeft = 40;
  const wormPaddingBottom = 30;
  const wormPaddingTop = 20;
  const wormPaddingRight = 20;

  const trajectoryColors = ['#DC2626', '#2563EB', '#059669', '#7C3AED'];

  return (
    <div className="space-y-6">
      {/* Chart View Mode Controls */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-50 text-red-600 border border-red-100">
            <BarChart2 className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-slate-900">Match Analytics & Visual Charts</span>
        </div>

        <div className="flex items-center gap-1.5">
          {[
            { id: 'both', label: 'All Charts' },
            { id: 'manhattan', label: 'Manhattan' },
            { id: 'worm', label: 'Worm' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveChart(mode.id as any)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeChart === mode.id
                  ? 'bg-red-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Manhattan Bar Chart */}
      {(activeChart === 'both' || activeChart === 'manhattan') && hasManhattan && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
          {/* Header & Inning Switcher */}
          <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span>Manhattan</span>
                <span className="text-slate-500 font-medium text-xs lowercase first-letter:uppercase">
                  (Runs per Over)
                </span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Red dots indicate wickets fell in that over. Hover on any bar for bowler breakdown.
              </p>
            </div>

            {/* Innings Tabs */}
            {manhattanInnings.length > 1 && (
              <div className="flex items-center gap-1.5">
                {manhattanInnings.map((inn, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedInning(idx);
                      setHoveredOver(null);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedInning === idx
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {inn.team || inn.period || `Inn ${idx + 1}`}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SVG Manhattan Chart */}
          <div className="p-4 sm:p-5 overflow-x-auto no-scrollbar">
            <div className="min-w-[500px] relative">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight + paddingBottom}`}
                className="w-full h-auto overflow-visible"
              >
                {/* Horizontal Grid lines */}
                {[0, 5, 10, 15, 20].map((tick) => {
                  if (tick > maxRunsInOver + 2) return null;
                  const y = chartHeight - (tick / (maxRunsInOver + 2)) * chartHeight;
                  return (
                    <g key={tick}>
                      <line
                        x1={paddingLeft}
                        y1={y}
                        x2={chartWidth - 10}
                        y2={y}
                        stroke="#E2E8F0"
                        strokeDasharray={tick === 0 ? 'none' : '3 3'}
                        strokeWidth="1"
                      />
                      <text
                        x={paddingLeft - 8}
                        y={y + 3}
                        fontSize="10"
                        fill="#64748B"
                        textAnchor="end"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {tick}
                      </text>
                    </g>
                  );
                })}

                {/* Over Bars */}
                {oversList.map((item, idx) => {
                  const x = paddingLeft + idx * (barWidth + gap);
                  const barH = Math.max(4, (item.runs / (maxRunsInOver + 2)) * chartHeight);
                  const y = chartHeight - barH;
                  const isHovered = hoveredOver?.over === item.over;

                  return (
                    <g
                      key={item.over}
                      className="cursor-pointer group"
                      onMouseEnter={() => setHoveredOver(item)}
                      onMouseLeave={() => setHoveredOver(null)}
                    >
                      {/* Bar */}
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barH}
                        rx={2}
                        className={`transition-all duration-150 ${
                          isHovered
                            ? 'fill-red-700'
                            : item.wickets > 0
                            ? 'fill-red-600'
                            : 'fill-slate-800 hover:fill-slate-700'
                        }`}
                      />

                      {/* Wicket Indicator Pill */}
                      {item.wickets > 0 && (
                        <circle
                          cx={x + barWidth / 2}
                          cy={Math.max(10, y - 8)}
                          r={5}
                          fill="#DC2626"
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                        />
                      )}

                      {/* Over Label under the axis */}
                      {(item.over % 5 === 0 || item.over === 1 || item.over === oversList.length) && (
                        <text
                          x={x + barWidth / 2}
                          y={chartHeight + 16}
                          fontSize="10"
                          fill="#475569"
                          textAnchor="middle"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          {item.over}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Bottom Baseline */}
                <line
                  x1={paddingLeft}
                  y1={chartHeight}
                  x2={chartWidth - 10}
                  y2={chartHeight}
                  stroke="#94A3B8"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Hover Tooltip Card */}
              {hoveredOver && (
                <div className="mt-3 p-3 rounded-lg bg-slate-900 text-white text-xs flex flex-wrap items-center justify-between gap-4 shadow-md animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white font-mono font-bold text-[11px]">
                      Over {hoveredOver.over}
                    </span>
                    <span className="font-bold">{hoveredOver.bowler ? `Bowler: ${hoveredOver.bowler}` : 'Bowler'}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[11px]">
                    <span>
                      Runs: <strong className="text-amber-400 font-extrabold">{hoveredOver.runs}</strong>
                    </span>
                    <span>
                      Wickets:{' '}
                      <strong className={hoveredOver.wickets > 0 ? 'text-red-400 font-extrabold' : 'text-slate-300'}>
                        {hoveredOver.wickets}
                      </strong>
                    </span>
                    <span>
                      Cumulative: <strong className="text-white font-bold">{hoveredOver.cumulativeRuns}</strong>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Worm Trajectory Chart */}
      {(activeChart === 'both' || activeChart === 'worm') && hasWorm && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span>Worm Chart</span>
                <span className="text-slate-500 font-medium text-xs lowercase first-letter:uppercase">
                  (Cumulative Runs Trajectory)
                </span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Comparative curve comparing score progression across overs.
              </p>
            </div>

            {/* Team Legend */}
            <div className="flex items-center gap-3">
              {wormTrajectories.map((t, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: trajectoryColors[idx % trajectoryColors.length] }}
                  />
                  <span>{t.team || t.period || `Team ${idx + 1}`}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SVG Worm Dual-Line Chart */}
          <div className="p-4 sm:p-5 overflow-x-auto no-scrollbar">
            <div className="min-w-[600px]">
              <svg
                viewBox={`0 0 ${wormWidth} ${wormHeight + wormPaddingBottom + wormPaddingTop}`}
                className="w-full h-auto overflow-visible"
              >
                {/* Horizontal Score Grid lines */}
                {[0, 50, 100, 150, 200, 250].map((score) => {
                  if (score > wormMaxScore + 20) return null;
                  const y =
                    wormPaddingTop +
                    (wormHeight - (score / (wormMaxScore + 20)) * wormHeight);
                  return (
                    <g key={score}>
                      <line
                        x1={wormPaddingLeft}
                        y1={y}
                        x2={wormWidth - wormPaddingRight}
                        y2={y}
                        stroke="#F1F5F9"
                        strokeDasharray="3 3"
                        strokeWidth="1"
                      />
                      <text
                        x={wormPaddingLeft - 8}
                        y={y + 3}
                        fontSize="10"
                        fill="#94A3B8"
                        textAnchor="end"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {score}
                      </text>
                    </g>
                  );
                })}

                {/* Vertical Over Grid lines */}
                {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((over) => {
                  if (over > wormMaxOvers) return null;
                  const x =
                    wormPaddingLeft +
                    (over / wormMaxOvers) * (wormWidth - wormPaddingLeft - wormPaddingRight);
                  return (
                    <g key={over}>
                      <line
                        x1={x}
                        y1={wormPaddingTop}
                        x2={x}
                        y2={wormPaddingTop + wormHeight}
                        stroke="#F8FAFC"
                        strokeWidth="1"
                      />
                      <text
                        x={x}
                        y={wormPaddingTop + wormHeight + 16}
                        fontSize="10"
                        fill="#64748B"
                        textAnchor="middle"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {over} ov
                      </text>
                    </g>
                  );
                })}

                {/* Trajectory Polylines */}
                {wormTrajectories.map((item, tIdx) => {
                  const points = item.trajectory || [];
                  const color = trajectoryColors[tIdx % trajectoryColors.length];

                  const pathD = points.reduce((acc, pt, i) => {
                    const x =
                      wormPaddingLeft +
                      (pt.over / wormMaxOvers) * (wormWidth - wormPaddingLeft - wormPaddingRight);
                    const y =
                      wormPaddingTop +
                      (wormHeight - (pt.score / (wormMaxScore + 20)) * wormHeight);
                    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
                  }, '');

                  return (
                    <g key={tIdx}>
                      <path
                        d={pathD}
                        fill="none"
                        stroke={color}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Wicket dots */}
                      {points
                        .filter(p => p.wickets > 0)
                        .map((pt, pIdx) => {
                          const x =
                            wormPaddingLeft +
                            (pt.over / wormMaxOvers) * (wormWidth - wormPaddingLeft - wormPaddingRight);
                          const y =
                            wormPaddingTop +
                            (wormHeight - (pt.score / (wormMaxScore + 20)) * wormHeight);

                          return (
                            <g key={pIdx}>
                              <circle
                                cx={x}
                                cy={y}
                                r={4}
                                fill={color}
                                stroke="#FFFFFF"
                                strokeWidth="1.5"
                              />
                            </g>
                          );
                        })}
                    </g>
                  );
                })}

                {/* Bottom Baseline */}
                <line
                  x1={wormPaddingLeft}
                  y1={wormPaddingTop + wormHeight}
                  x2={wormWidth - wormPaddingRight}
                  y2={wormPaddingTop + wormHeight}
                  stroke="#CBD5E1"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartsTab;
