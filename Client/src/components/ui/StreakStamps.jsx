import React from 'react';
import { Flame, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * StreakStamps - Vintage tactile ink-stamped streak strip
 * Shows 7 consecutive days with stamped ink circles instead of a bare number
 */
export function StreakStamps({
  days = [
    { day: 'Mon', completed: true, date: '18' },
    { day: 'Tue', completed: true, date: '19' },
    { day: 'Wed', completed: true, date: '20' },
    { day: 'Thu', completed: true, date: '21' },
    { day: 'Fri', completed: true, date: '22' },
    { day: 'Sat', completed: true, date: '23', today: true },
    { day: 'Sun', completed: false, date: '24' },
  ],
  streakCount = 14,
  className,
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-desk-border bg-desk-card p-4 shadow-desk-sm',
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-tangerine/15 text-tangerine">
            <Flame className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-xl font-bold text-desk-ink">
                {streakCount}
              </span>
              <span className="text-xs font-medium text-desk-muted uppercase tracking-wider">
                Day Study Streak
              </span>
            </div>
          </div>
        </div>
        <span className="text-[11px] font-mono text-tangerine bg-tangerine/10 px-2 py-0.5 rounded-full border border-tangerine/20 font-medium">
          Personal Best: 21 days
        </span>
      </div>

      {/* Row of 7 Ink Stamps */}
      <div className="grid grid-cols-7 gap-2 pt-1">
        {days.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1.5">
            <span className="text-[10px] font-mono text-desk-muted font-medium">
              {item.day}
            </span>

            {/* The circular tactile stamp */}
            <div
              className={cn(
                'relative flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 select-none',
                item.completed &&
                  'bg-mint/15 text-mint border-2 border-mint/60 shadow-[inset_0_0_0_1px_rgba(46,196,160,0.2)]',
                !item.completed &&
                  'border border-dashed border-desk-border text-desk-muted/40 bg-desk-sub/30',
                item.today &&
                  'ring-2 ring-tangerine ring-offset-2 ring-offset-desk-card'
              )}
            >
              {item.completed ? (
                <div className="flex items-center justify-center rotate-[-8deg]">
                  <Check className="h-4 w-4 stroke-[2.5]" />
                </div>
              ) : (
                <span className="text-[10px] font-mono font-normal">
                  {item.date}
                </span>
              )}

              {item.today && (
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tangerine opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tangerine"></span>
                </span>
              )}
            </div>

            <span className="text-[9px] font-mono text-desk-muted/70">
              {item.completed ? 'Done' : item.today ? 'Today' : item.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
