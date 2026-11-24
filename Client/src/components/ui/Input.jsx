import React from 'react';
import { cn } from '../../lib/utils';

export const Input = React.forwardRef(
  ({ className, type = 'text', error, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-xl border border-desk-border bg-desk-card px-3.5 py-2 text-sm text-desk-ink shadow-desk-sm transition-all duration-150',
          'placeholder:text-desk-muted/70',
          'focus:outline-none focus:border-tangerine focus:ring-2 focus:ring-tangerine/20',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-rose focus:border-rose focus:ring-rose/20',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export const Textarea = React.forwardRef(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'flex min-h-[90px] w-full rounded-xl border border-desk-border bg-desk-card px-3.5 py-2.5 text-sm text-desk-ink shadow-desk-sm transition-all duration-150',
          'placeholder:text-desk-muted/70',
          'focus:outline-none focus:border-tangerine focus:ring-2 focus:ring-tangerine/20',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-rose focus:border-rose focus:ring-rose/20',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
