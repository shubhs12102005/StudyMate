import React from 'react';
import { cn } from '../../lib/utils';

export function Card({ className, variant = 'default', children, ...props }) {
  const variants = {
    default: 'bg-desk-card border border-desk-border shadow-desk-card text-desk-ink',
    elevated: 'bg-desk-card border border-desk-border shadow-desk-md text-desk-ink',
    subtle: 'bg-desk-sub/60 border border-desk-border/80 shadow-desk-sm text-desk-ink',
    sticky: 'bg-[#FFFBEA] dark:bg-[#1D1B13] border border-[#F3E7A8] dark:border-[#3D3720] shadow-desk-sticky text-desk-ink rotate-[-1deg] hover:rotate-0 transition-transform duration-200',
    indexCard: 'bg-desk-card border border-desk-border shadow-desk-md ruled-lines text-desk-ink',
  };

  return (
    <div
      className={cn(
        'rounded-2xl p-5 transition-all duration-150',
        variants[variant] || variants.default,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn('flex flex-col space-y-1.5 pb-3', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3
      className={cn('font-serif text-lg font-semibold tracking-tight text-desk-ink', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }) {
  return (
    <p className={cn('text-xs text-desk-muted', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn('pt-1', className)} {...props}>
      {children}
    </div>
  );
}
