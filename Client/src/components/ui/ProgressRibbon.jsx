import React from 'react';
import { Bookmark } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * ProgressRibbon & InkFillBar - Physical desk progress indicators
 */
export function InkProgressBar({
  progress = 68,
  label = "Chapter 4 Mastery",
  sublabel = "34 of 50 concepts reviewed",
  color = "tangerine", // 'tangerine' | 'violet' | 'mint'
  className,
}) {
  const colorMap = {
    tangerine: 'bg-tangerine',
    violet: 'bg-violet',
    mint: 'bg-mint',
    highlighter: 'bg-highlighter',
  };

  return (
    <div className={cn('w-full space-y-1.5', className)}>
      <div className="flex items-center justify-between text-xs font-medium">
        <span className="text-desk-ink font-serif">{label}</span>
        <span className="font-mono text-desk-muted">{progress}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-desk-sub border border-desk-border/80 p-0.5">
        <div
          style={{ width: `${progress}%` }}
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out shadow-sm',
            colorMap[color] || colorMap.tangerine
          )}
        />
      </div>
      {sublabel && (
        <p className="text-[11px] font-mono text-desk-muted">{sublabel}</p>
      )}
    </div>
  );
}

export function RibbonBookmark({
  label = "P. 42",
  color = "tangerine",
  className,
}) {
  return (
    <div
      className={cn(
        'relative inline-flex flex-col items-center select-none shadow-desk-sm',
        className
      )}
    >
      <div className="bg-tangerine text-white px-2.5 py-1 text-[11px] font-mono font-semibold rounded-t-sm flex items-center gap-1">
        <Bookmark className="h-3 w-3 fill-white" />
        {label}
      </div>
      {/* V-shaped ribbon cutout */}
      <div className="w-full flex">
        <div className="w-1/2 h-2 bg-tangerine [clip-path:polygon(0_0,100%_0,100%_100%)]" />
        <div className="w-1/2 h-2 bg-tangerine [clip-path:polygon(0_0,100%_0,0_100%)]" />
      </div>
    </div>
  );
}
