import React from 'react';
import { cn } from '../utils/cn';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'emerald' | 'red' | 'purple' | 'blue' | 'pink' | 'white' | 'default';
  className?: string;
  children?: React.ReactNode;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'glass-card relative overflow-hidden',
          {
            'border-emerald-500/10 bg-emerald-500/5': variant === 'emerald',
            'border-red-500/10 bg-red-500/5': variant === 'red',
            'border-purple-500/10 bg-purple-500/5': variant === 'purple',
            'border-blue-500/10 bg-blue-500/5': variant === 'blue',
            'border-pink-500/10 bg-pink-500/5': variant === 'pink',
            'border border-white/10 bg-white/5': variant === 'white',
            'border border-white/5 bg-white/5': variant === 'default',
          },
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
GlassCard.displayName = 'GlassCard';
