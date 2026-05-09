import React from 'react';
import { cn } from '../utils/cn';
import { CornerCrosshairs } from './CornerCrosshairs';

interface TacticalPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'emerald' | 'red' | 'purple' | 'blue' | 'pink' | 'white' | 'default';
  className?: string;
  children?: React.ReactNode;
}

export const TacticalPanel = React.forwardRef<HTMLDivElement, TacticalPanelProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-none border border-dashed p-6 font-mono',
          {
            'border-emerald-500/30 bg-emerald-950/20': variant === 'emerald',
            'border-red-500/30 bg-red-950/20': variant === 'red',
            'border-purple-500/30 bg-purple-950/20': variant === 'purple',
            'border-blue-500/30 bg-blue-950/20': variant === 'blue',
            'border-pink-500/30 bg-pink-950/20': variant === 'pink',
            'border-white/30 bg-white/5': variant === 'white',
            'border-white/20 bg-zinc-900/50': variant === 'default',
          },
          className,
        )}
        {...props}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '4px 4px',
          }}
        />
        <div className="scanline-overlay pointer-events-none absolute inset-0 opacity-20" />
        <CornerCrosshairs
          thickness={2}
          className={cn('h-2 w-2', {
            'border-emerald-500/50': variant === 'emerald',
            'border-red-500/50': variant === 'red',
            'border-purple-500/50': variant === 'purple',
            'border-blue-500/50': variant === 'blue',
            'border-pink-500/50': variant === 'pink',
            'border-white/50': variant === 'white',
            'border-white/40': variant === 'default',
          })}
        />
        <div className="relative z-10">{children}</div>
      </div>
    );
  },
);
TacticalPanel.displayName = 'TacticalPanel';
