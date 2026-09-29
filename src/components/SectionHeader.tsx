import React from 'react';
import { cn } from '../utils/cn';

export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  colorClass?: string;
  variant?: 'primary' | 'red' | 'purple' | 'blue' | 'pink' | 'amber' | 'emerald';
}

export const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ icon, title, subtitle, badge, action, colorClass, variant = 'primary', className, ...props }, ref) => {
    const getVariantStyles = () => {
      switch (variant) {
        case 'red':
          return {
            border: 'border-red-500/30',
            bg: 'bg-red-950/20',
            accentBar: 'bg-red-500',
            text: 'text-red-400',
            icon: 'text-red-400',
            corner: 'border-red-500/50',
            led: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]',
          };
        case 'purple':
          return {
            border: 'border-purple-500/30',
            bg: 'bg-purple-950/20',
            accentBar: 'bg-purple-500',
            text: 'text-purple-400',
            icon: 'text-purple-400',
            corner: 'border-purple-500/50',
            led: 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]',
          };
        case 'blue':
          return {
            border: 'border-blue-500/30',
            bg: 'bg-blue-950/20',
            accentBar: 'bg-blue-500',
            text: 'text-blue-400',
            icon: 'text-blue-400',
            corner: 'border-blue-500/50',
            led: 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]',
          };
        case 'pink':
          return {
            border: 'border-pink-500/30',
            bg: 'bg-pink-950/20',
            accentBar: 'bg-pink-500',
            text: 'text-pink-400',
            icon: 'text-pink-400',
            corner: 'border-pink-500/50',
            led: 'bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]',
          };
        case 'amber':
          return {
            border: 'border-amber-500/30',
            bg: 'bg-amber-950/20',
            accentBar: 'bg-amber-500',
            text: 'text-amber-400',
            icon: 'text-amber-400',
            corner: 'border-amber-500/50',
            led: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]',
          };
        case 'emerald':
          return {
            border: 'border-emerald-500/30',
            bg: 'bg-emerald-950/20',
            accentBar: 'bg-emerald-500',
            text: 'text-emerald-400',
            icon: 'text-emerald-400',
            corner: 'border-emerald-500/50',
            led: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]',
          };
        default:
          return {
            border: 'border-[var(--theme-primary)]/30',
            bg: 'bg-[var(--theme-primary)]/5',
            accentBar: 'bg-[var(--theme-primary)]',
            text: 'text-[var(--theme-primary)]',
            icon: 'text-[var(--theme-primary)]',
            corner: 'border-[var(--theme-primary)]/50',
            led: 'bg-[var(--theme-primary)] shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.8)]',
          };
      }
    };

    const styles = getVariantStyles();

    return (
      <div
        ref={ref}
        className={cn(
          'group relative flex items-center justify-between border border-dashed px-4 py-2.5 transition-colors',
          styles.border,
          styles.bg,
          className,
        )}
        {...props}
      >
        {/* Corner Hardware Accent Ticks */}
        <div className={cn('absolute -top-0.5 -left-0.5 h-1.5 w-1.5 border-t-2 border-l-2', styles.corner)} />
        <div className={cn('absolute -top-0.5 -right-0.5 h-1.5 w-1.5 border-t-2 border-r-2', styles.corner)} />
        <div className={cn('absolute -bottom-0.5 -left-0.5 h-1.5 w-1.5 border-b-2 border-l-2', styles.corner)} />
        <div className={cn('absolute -right-0.5 -bottom-0.5 h-1.5 w-1.5 border-r-2 border-b-2', styles.corner)} />

        {/* Left Accent Bar */}
        <div className={cn('absolute top-0 bottom-0 left-0 w-1', styles.accentBar)} />

        {/* Left Side: LED + Icon + Title + Subtitle */}
        <div className="flex items-center gap-3 pl-2">
          {/* Status LED */}
          <div className="relative flex h-2 w-2 shrink-0 items-center justify-center">
            <span className={cn('h-1.5 w-1.5 animate-pulse rounded-full', styles.led)} />
          </div>

          {icon && (
            <div
              className={cn(
                'flex shrink-0 items-center justify-center transition-transform group-hover:scale-110',
                colorClass || styles.icon,
              )}
            >
              {icon}
            </div>
          )}

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3
                className={cn(
                  'font-black font-display text-xs uppercase tracking-[0.2em] transition-colors',
                  colorClass || styles.text,
                )}
              >
                {title}
              </h3>
              {badge && <div className="shrink-0">{badge}</div>}
            </div>
            {subtitle && (
              <span className="font-bold font-mono text-[9px] text-zinc-500 uppercase tracking-widest">{subtitle}</span>
            )}
          </div>
        </div>

        {/* Right Side: Optional Action or Telemetry Tag */}
        {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
      </div>
    );
  },
);
SectionHeader.displayName = 'SectionHeader';
