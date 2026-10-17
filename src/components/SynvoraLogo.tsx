import React from 'react';

interface SynvoraLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  iconOnly?: boolean;
}

export const SynvoraLogo: React.FC<SynvoraLogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
  iconOnly = false,
}) => {
  // Height configurations
  const heightClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
  }[size];

  // Unique ID prefix for SVG gradient definitions to prevent collision
  const uid = React.useId().replace(/:/g, '');

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <svg
        viewBox="0 0 520 120"
        className={`${heightClasses} w-auto`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Synvora IT"
        role="img"
      >
        <defs>
          {/* Main 3D Ribbon S Gradients */}
          <linearGradient id={`${uid}-ribbon-top`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="45%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>

          <linearGradient id={`${uid}-ribbon-mid`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#18C6D9" />
            <stop offset="100%" stopColor="#16C79A" />
          </linearGradient>

          <linearGradient id={`${uid}-ribbon-bottom`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#18C6D9" />
            <stop offset="55%" stopColor="#16C79A" />
            <stop offset="100%" stopColor="#35D399" />
          </linearGradient>

          {/* Floating digital pixel cubes */}
          <linearGradient id={`${uid}-voxel-1`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#35D399" />
            <stop offset="100%" stopColor="#18C6D9" />
          </linearGradient>

          {/* Lettering Gradients */}
          <linearGradient id={`${uid}-text-synvora`} x1="0%" y1="0%" x2="100%" y2="0%">
            {variant === 'dark' ? (
              <>
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#E2E8F0" />
                <stop offset="85%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#18C6D9" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#1E3A8A" />
                <stop offset="45%" stopColor="#2563EB" />
                <stop offset="80%" stopColor="#0891B2" />
                <stop offset="100%" stopColor="#18C6D9" />
              </>
            )}
          </linearGradient>

          <linearGradient id={`${uid}-text-it`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#18C6D9" />
            <stop offset="100%" stopColor="#35D399" />
          </linearGradient>
        </defs>

        {/* --- ISOMETRIC 3D RIBBON "S" MARK --- */}
        <g transform="translate(10, 10)">
          {/* Top Diamond / Fold */}
          <path
            d="M 50 5 L 85 24 L 52 42 L 18 24 Z"
            fill={`url(#${uid}-ribbon-top)`}
          />
          {/* Top-Right Loop Facet */}
          <path
            d="M 85 24 L 85 45 L 53 64 L 52 42 Z"
            fill="#1D4ED8"
            opacity="0.85"
          />
          {/* Left Upper Fold Ribbon */}
          <path
            d="M 18 24 L 50 5 L 50 18 L 26 31 L 26 50 L 14 43 Z"
            fill={`url(#${uid}-ribbon-top)`}
          />
          {/* Main Diagonal S Fold */}
          <path
            d="M 14 43 L 53 64 L 82 48 L 82 60 L 53 76 L 14 55 Z"
            fill={`url(#${uid}-ribbon-mid)`}
          />
          {/* Lower Loop & Bottom Ribbon */}
          <path
            d="M 14 55 L 53 76 L 53 95 L 18 75 Z"
            fill="#0F766E"
            opacity="0.6"
          />
          <path
            d="M 18 75 L 53 95 L 86 76 L 52 57 L 53 70 L 32 81 Z"
            fill={`url(#${uid}-ribbon-bottom)`}
          />
          <path
            d="M 86 76 L 86 58 L 53 76 L 53 95 Z"
            fill={`url(#${uid}-ribbon-bottom)`}
          />

          {/* Floating Tech Voxels (4 cubes) */}
          {/* Voxel 1 (closest) */}
          <rect x="92" y="28" width="11" height="11" rx="2" fill={`url(#${uid}-voxel-1)`} />
          {/* Voxel 2 (mid) */}
          <rect x="106" y="20" width="9" height="9" rx="1.5" fill="#35D399" />
          {/* Voxel 3 (small) */}
          <rect x="98" y="14" width="7" height="7" rx="1.5" fill="#18C6D9" opacity="0.9" />
          {/* Voxel 4 (tiny top) */}
          <rect x="112" y="32" width="6" height="6" rx="1" fill="#38BDF8" opacity="0.85" />
        </g>

        {/* --- BRAND TYPOGRAPHY --- */}
        {!iconOnly && (
          <g transform="translate(145, 78)">
            {/* "SYNVORA" */}
            <text
              x="0"
              y="0"
              fill={`url(#${uid}-text-synvora)`}
              fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
              fontSize="48"
              fontWeight="800"
              letterSpacing="2.5"
            >
              SYNVOR
            </text>
            {/* Custom stylized chevron 'A' without crossbar as in official mark */}
            <g transform="translate(230, 0)">
              <path
                d="M 2 0 L 19 -44 L 23 -44 L 40 0 L 30 0 L 21 -25 L 12 0 Z"
                fill={`url(#${uid}-text-synvora)`}
              />
            </g>

            {/* "IT" */}
            <text
              x="290"
              y="0"
              fill={`url(#${uid}-text-it)`}
              fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
              fontSize="48"
              fontWeight="800"
              letterSpacing="3"
            >
              IT
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
