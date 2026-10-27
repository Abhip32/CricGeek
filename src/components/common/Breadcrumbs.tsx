'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className = '',
  showHome = true,
}) => {
  const allItems: BreadcrumbItem[] = showHome
    ? [{ label: 'Home', href: '/' }, ...items]
    : items;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-xs font-semibold text-slate-500 overflow-x-auto no-scrollbar py-1 ${className}`}
    >
      <ol className="flex items-center gap-1.5 min-w-0">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1 || item.current;
          const isHome = showHome && index === 0;

          return (
            <li key={index} className="flex items-center gap-1.5 min-w-0">
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              )}
              {isLast || !item.href ? (
                <span
                  className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-[320px]"
                  title={item.label}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center gap-1 hover:text-red-600 transition-colors truncate whitespace-nowrap"
                  title={item.label}
                >
                  {isHome && <Home className="w-3.5 h-3.5 flex-shrink-0 text-slate-400 group-hover:text-red-600" />}
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
