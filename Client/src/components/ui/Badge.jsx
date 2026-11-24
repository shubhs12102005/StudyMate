import React from 'react';
import { cn } from '../../lib/utils';

export function Badge({ className, variant = 'default', children, ...props }) {
  const variants = {
    default: 'bg-desk-sub text-desk-ink border-desk-border',
    tangerine: 'bg-tangerine/15 text-tangerine border-tangerine/30 font-medium',
    highlighter: 'bg-highlighter/30 text-desk-ink border-highlighter/60 font-semibold',
    violet: 'bg-violet/15 text-violet border-violet/30 font-medium',
    mint: 'bg-mint/15 text-mint border-mint/30 font-medium',
    rose: 'bg-rose/15 text-rose border-rose/30 font-medium',
    outline: 'bg-transparent text-desk-muted border-desk-border',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-lg border px-2.5 py-0.5 text-xs font-mono transition-colors',
        variants[variant] || variants.default,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
