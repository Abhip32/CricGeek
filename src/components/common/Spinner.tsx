'use client';

import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', label }) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  }[size];

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-4">
      <div
        className={`${sizeClasses} rounded-full border-slate-200 border-t-red-600 border-r-red-500 animate-spin`}
      />
      {label && <span className="text-xs font-semibold text-slate-500">{label}</span>}
    </div>
  );
};

export default Spinner;
