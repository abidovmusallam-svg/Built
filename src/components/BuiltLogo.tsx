import React from 'react';

interface BuiltLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
  showSubtitle?: boolean;
  className?: string;
}

export const BuiltLogo: React.FC<BuiltLogoProps> = ({
  size = 'md',
  variant = 'dark',
  showSubtitle = true,
  className = ''
}) => {
  // Size mapping
  const iconSize = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-14 h-14'
  }[size];

  const titleSize = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  }[size];

  const subtitleSize = {
    sm: 'text-[8px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    xl: 'text-xs'
  }[size];

  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Modern Architectural Geometric SVG Emblem */}
      <div
        className={`${iconSize} rounded-xl relative flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-xs overflow-hidden ${
          isLight ? 'bg-white/10 ring-1 ring-white/20' : 'bg-[#173B32]'
        }`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1.5"
        >
          {/* Base structural foundation block */}
          <path
            d="M8 38L24 45L40 38V32L24 39L8 32V38Z"
            fill="#F59E0B"
          />
          {/* Middle cantilevered building level */}
          <path
            d="M8 26L24 33L40 26V20L24 27L8 20V26Z"
            fill={isLight ? '#E2E8F0' : '#2DD4BF'}
          />
          {/* Top structural slab */}
          <path
            d="M8 14L24 21L40 14L24 7L8 14Z"
            fill={isLight ? '#FFFFFF' : '#34D399'}
          />
          {/* Central architectural pillar beam forming B shape */}
          <rect
            x="11"
            y="9"
            width="5"
            height="27"
            rx="2.5"
            fill="#F59E0B"
          />
          {/* Geometric cross-truss accents */}
          <path
            d="M16 14C23 14 27 16 27 19.5C27 23 23 25 16 25"
            stroke="#F59E0B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M16 25C24.5 25 29 27.5 29 31.5C29 35.5 24 37.5 16 37.5"
            stroke="#F59E0B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col text-left">
        <div
          className={`${titleSize} font-black tracking-tight font-heading leading-none flex items-center gap-0.5 ${
            isLight ? 'text-white' : 'text-[#173B32]'
          }`}
        >
          <span>BUILT</span>
          <span className="text-[#F59E0B] font-extrabold">.UZ</span>
        </div>
        {showSubtitle && (
          <div
            className={`${subtitleSize} tracking-wider font-semibold uppercase mt-0.5 ${
              isLight ? 'text-emerald-300/90' : 'text-neutral-500'
            }`}
          >
            Qurilish Materiallari Bozori
          </div>
        )}
      </div>
    </div>
  );
};
