import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Hand-drawn SVG flourishes for editorial typography accents
 */
export function UnderlineScribble({ className, color = "currentColor" }) {
  return (
    <svg
      viewBox="0 0 240 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('inline-block w-full max-w-[240px] h-3 overflow-visible', className)}
      aria-hidden="true"
    >
      <path
        d="M2.5 12.5C45.5 4.5 142.5 2 237.5 14C178.5 7.5 73.5 8 18.5 16"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CircleScribble({ className, color = "currentColor" }) {
  return (
    <svg
      viewBox="0 0 160 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('absolute inset-0 -m-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none', className)}
      aria-hidden="true"
    >
      <path
        d="M14.5 32C12 18 36.5 8 83 7.5C129.5 7 151 18.5 147.5 35C144 51.5 111.5 56 65.5 54.5C28.7 53.3 5 44 8 26"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="400"
        strokeDashoffset="0"
      />
    </svg>
  );
}

export function HandDrawnArrow({ className, color = "currentColor" }) {
  return (
    <svg
      viewBox="0 0 80 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('inline-block w-16 h-8', className)}
      aria-hidden="true"
    >
      <path
        d="M5 28C24 16 52 14 74 20M74 20L60 10M74 20L62 32"
        stroke={color}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
