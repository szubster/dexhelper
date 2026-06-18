import React from 'react';
import { cn } from '../utils/cn';

interface InlineLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'red' | 'purple' | 'blue' | 'pink' | 'emerald';
  children: React.ReactNode;
}

export const InlineLink = React.forwardRef<HTMLButtonElement, InlineLinkProps>(
  ({ className, variant = 'blue', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'focus-visible:tactical-focus rounded-none underline underline-offset-4 transition-colors',
          {
            'text-red-400 decoration-red-500/30 hover:text-white': variant === 'red',
            'text-white decoration-purple-500/30 hover:text-purple-400': variant === 'purple',
            'text-white decoration-blue-500/30 hover:text-blue-400': variant === 'blue',
            'text-white decoration-pink-500/30 hover:text-pink-400': variant === 'pink',
            'text-emerald-400 decoration-emerald-500/30 hover:text-white': variant === 'emerald',
          },
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
InlineLink.displayName = 'InlineLink';
