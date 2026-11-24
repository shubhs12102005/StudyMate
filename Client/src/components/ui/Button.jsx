import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-tangerine focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-tangerine text-white shadow-desk-sm hover:bg-tangerine-hover hover:shadow-desk-md active:bg-[#E04F18]',
        secondary:
          'bg-desk-card text-desk-ink border border-desk-border shadow-desk-sm hover:bg-desk-sub hover:border-desk-ink/20',
        ghost:
          'text-desk-ink hover:bg-desk-sub/80 active:bg-desk-sub',
        outline:
          'border border-desk-border text-desk-ink bg-transparent hover:bg-desk-card hover:border-desk-ink/30',
        ai:
          'bg-violet text-white shadow-desk-sm hover:bg-violet-hover hover:shadow-desk-md active:bg-[#522FE0]',
        mint:
          'bg-mint text-white shadow-desk-sm hover:bg-mint-hover hover:shadow-desk-md',
        rose:
          'bg-rose text-white shadow-desk-sm hover:bg-rose-hover hover:shadow-desk-md',
        highlighter:
          'bg-highlighter text-desk-ink font-semibold border border-[#E5BE30] hover:bg-highlighter-hover shadow-desk-sm',
      },
      size: {
        sm: 'h-8 px-3 text-xs gap-1.5',
        md: 'h-10 px-4 text-sm gap-2',
        lg: 'h-12 px-6 text-base gap-2.5 font-semibold',
        icon: 'h-10 w-10 p-0',
        'icon-sm': 'h-8 w-8 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

/**
 * Custom tactile Button component
 */
export const Button = React.forwardRef(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
