import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Toast({
  title,
  message,
  type = 'info', // 'success' | 'warning' | 'info' | 'error'
  onClose,
  duration = 4000,
  className,
}) {
  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeConfig = {
    success: {
      icon: CheckCircle2,
      iconColor: 'text-mint',
      border: 'border-mint/40',
      bg: 'bg-desk-card',
      stamp: 'Stamp: Recorded',
    },
    warning: {
      icon: AlertTriangle,
      iconColor: 'text-amber-glow',
      border: 'border-amber-glow/40',
      bg: 'bg-desk-card',
      stamp: 'Notice',
    },
    error: {
      icon: AlertTriangle,
      iconColor: 'text-rose',
      border: 'border-rose/40',
      bg: 'bg-desk-card',
      stamp: 'Correction Needed',
    },
    info: {
      icon: Info,
      iconColor: 'text-violet',
      border: 'border-violet/40',
      bg: 'bg-desk-card',
      stamp: 'Study Note',
    },
  };

  const config = typeConfig[type] || typeConfig.info;
  const Icon = config.icon;

  return (
    <div
      role="status"
      className={cn(
        'relative flex items-start gap-3 rounded-2xl border p-4 shadow-desk-lg transition-all duration-200 min-w-[300px] max-w-sm',
        config.bg,
        config.border,
        className
      )}
    >
      <div className={cn('mt-0.5 flex-shrink-0', config.iconColor)}>
        <Icon className="h-5 w-5" />
      </div>

      <div className="flex-1 pr-2">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-serif text-sm font-semibold text-desk-ink">
            {title}
          </span>
          <span className="text-[9px] font-mono uppercase tracking-wider text-desk-muted px-1.5 py-0.2 rounded bg-desk-sub border border-desk-border">
            {config.stamp}
          </span>
        </div>
        {message && (
          <p className="text-xs text-desk-muted leading-relaxed">{message}</p>
        )}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-desk-muted hover:text-desk-ink p-1 rounded-lg hover:bg-desk-sub transition-colors"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
