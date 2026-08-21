import React from 'react';
import { cn } from '../utils/cn';
import { CornerCrosshairs } from './CornerCrosshairs';
import { LcdGrid } from './LcdGrid';
import { ScanlineOverlay } from './ScanlineOverlay';

interface TacticalPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'emerald' | 'amber' | 'red' | 'purple' | 'blue' | 'pink' | 'white' | 'default' | 'cyan';
  className?: string;
  children?: React.ReactNode;
}

export const TacticalPanel = React.forwardRef<HTMLDivElement, TacticalPanelProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'tactical-panel group relative',
          {
            'border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50 hover:bg-emerald-500/10':
              variant === 'emerald',
            'border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50 hover:bg-amber-500/10': variant === 'amber',
            'border-cyan-500/30 bg-cyan-500/5 hover:border-cyan-500/50 hover:bg-cyan-500/10': variant === 'cyan',
            'border-red-500/30 bg-red-500/5 hover:border-red-500/50 hover:bg-red-500/10': variant === 'red',
            'border-purple-500/30 bg-purple-500/5 hover:border-purple-500/50 hover:bg-purple-500/10':
              variant === 'purple',
            'border-blue-500/30 bg-blue-500/5 hover:border-blue-500/50 hover:bg-blue-500/10': variant === 'blue',
            'border-pink-500/30 bg-pink-500/5 hover:border-pink-500/50 hover:bg-pink-500/10': variant === 'pink',
            'border-white/30 bg-white/5 hover:border-white/50 hover:bg-white/10': variant === 'white',
            'border-zinc-500/30 bg-zinc-500/5 hover:border-zinc-500/50 hover:bg-zinc-500/10': variant === 'default',
          },
          className,
        )}
        {...props}
      >
        {/* Subtle LCD Grid Background */}
        <LcdGrid className="opacity-[0.03]" />

        {/* Scanline overlay */}
        <ScanlineOverlay opacityClass="opacity-10" />

        {/* Corner Crosshairs */}
        <CornerCrosshairs
          thickness={2}
          className={cn('h-2 w-2 transition-colors', {
            'border-emerald-500/40 group-hover:border-emerald-400': variant === 'emerald',
            'border-amber-500/40 group-hover:border-amber-400': variant === 'amber',
            'border-cyan-500/40 group-hover:border-cyan-400': variant === 'cyan',
            'border-red-500/40 group-hover:border-red-400': variant === 'red',
            'border-purple-500/40 group-hover:border-purple-400': variant === 'purple',
            'border-blue-500/40 group-hover:border-blue-400': variant === 'blue',
            'border-pink-500/40 group-hover:border-pink-400': variant === 'pink',
            'border-white/40 group-hover:border-white': variant === 'white',
            'border-zinc-500/40 group-hover:border-zinc-400': variant === 'default',
          })}
        />

        {children}
      </div>
    );
  },
);
TacticalPanel.displayName = 'TacticalPanel';
