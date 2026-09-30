import React from 'react';
import { cn } from '../utils/cn';

export type TacticalStatusPanelItemVariant = 'primary' | 'emerald' | 'amber' | 'red' | 'purple';

export interface TacticalStatusPanelItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  sublabel?: React.ReactNode;
  active?: boolean;
  statusText?: React.ReactNode;
  variant?: TacticalStatusPanelItemVariant;
  activeClassName?: string;
  inactiveClassName?: string;
}

export const TacticalStatusPanelItem = React.forwardRef<HTMLDivElement, TacticalStatusPanelItemProps>(
  (
    {
      label,
      sublabel,
      active = false,
      statusText,
      variant = 'primary',
      activeClassName,
      inactiveClassName,
      className,
      ...props
    },
    ref,
  ) => {
    const defaultStatusText = active ? '[X]' : '[ ]';
    const resolvedStatusText = statusText ?? defaultStatusText;

    const variantStyles = {
      primary: {
        active: 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]',
        activeBar: 'bg-[var(--theme-primary)] shadow-[0_0_8px_var(--theme-primary)]',
        activeLed: 'bg-[var(--theme-primary)] shadow-[0_0_6px_var(--theme-primary)]',
        activeBadge: 'border-[var(--theme-primary)]/50 bg-[var(--theme-primary)]/20 text-[var(--theme-primary)]',
      },
      emerald: {
        active: 'border-emerald-500 bg-emerald-500/10 text-emerald-400',
        activeBar: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]',
        activeLed: 'bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.9)]',
        activeBadge: 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300',
      },
      amber: {
        active: 'border-amber-500 bg-amber-500/10 text-amber-400',
        activeBar: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]',
        activeLed: 'bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.9)]',
        activeBadge: 'border-amber-500/50 bg-amber-500/20 text-amber-300',
      },
      red: {
        active: 'border-red-500 bg-red-500/10 text-red-400',
        activeBar: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]',
        activeLed: 'bg-red-400 shadow-[0_0_6px_rgba(239,68,68,0.9)]',
        activeBadge: 'border-red-500/50 bg-red-500/20 text-red-300',
      },
      purple: {
        active: 'border-purple-500 bg-purple-500/10 text-purple-400',
        activeBar: 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]',
        activeLed: 'bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.9)]',
        activeBadge: 'border-purple-500/50 bg-purple-500/20 text-purple-300',
      },
    };

    const currentVariant = variantStyles[variant] || variantStyles.primary;

    const defaultActiveStyle = currentVariant.active;
    const defaultInactiveStyle = 'border-zinc-800 bg-zinc-950/70 text-zinc-500';

    const resolvedActiveClassName = activeClassName ?? defaultActiveStyle;
    const resolvedInactiveClassName = inactiveClassName ?? defaultInactiveStyle;

    return (
      <div
        ref={ref}
        className={cn(
          'tactical-panel group relative flex items-center justify-between overflow-hidden border border-dashed p-2.5 text-xs transition-all duration-200 hover:border-zinc-500/50',
          active ? resolvedActiveClassName : resolvedInactiveClassName,
          className,
        )}
        {...props}
      >
        {/* Hardware 4-Corner Crosshair Ticks */}
        <div className="pointer-events-none absolute top-0 left-0 h-1.5 w-1.5 border-current border-t-2 border-l-2 opacity-40 group-hover:opacity-100" />
        <div className="pointer-events-none absolute top-0 right-0 h-1.5 w-1.5 border-current border-t-2 border-r-2 opacity-40 group-hover:opacity-100" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-1.5 w-1.5 border-current border-b-2 border-l-2 opacity-40 group-hover:opacity-100" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-1.5 w-1.5 border-current border-r-2 border-b-2 opacity-40 group-hover:opacity-100" />

        {/* Left Status Bar Indicator */}
        <div
          className={cn(
            'absolute top-0 bottom-0 left-0 w-1 transition-colors duration-200',
            active ? currentVariant.activeBar : 'bg-zinc-800',
          )}
        />

        {/* Status Content */}
        <div className="z-10 flex min-w-0 flex-1 items-center gap-2 pl-2.5">
          {/* LED Indicator Dot */}
          <span
            className={cn(
              'h-2 w-2 shrink-0 rounded-full transition-all duration-200',
              active ? currentVariant.activeLed : 'bg-zinc-700/80',
            )}
          />
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-mono font-semibold uppercase tracking-wide">{label}</span>
            {sublabel && (
              <span className="truncate font-mono text-[10px] text-zinc-500 uppercase tracking-tight">{sublabel}</span>
            )}
          </div>
        </div>

        {/* Status Badge Tag */}
        <span
          className={cn(
            'z-10 ml-2 shrink-0 border border-dashed px-1.5 py-0.5 font-bold font-mono text-[11px] tracking-wider transition-colors duration-200',
            active ? currentVariant.activeBadge : 'border-zinc-800 bg-zinc-900/80 text-zinc-600',
          )}
        >
          {resolvedStatusText}
        </span>
      </div>
    );
  },
);

TacticalStatusPanelItem.displayName = 'TacticalStatusPanelItem';
