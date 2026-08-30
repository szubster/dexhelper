import type React from 'react';
import { cn } from '../../../utils/cn';
import { HoverScanner } from '../../HoverScanner';
import { LcdGrid } from '../../LcdGrid';
import { TacticalLed } from '../../TacticalLed';

interface LocationRowProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  iconColorClass: string;
  label: React.ReactNode;
  badge: React.ReactNode;
  variant?: 'primary' | 'red' | 'amber' | 'emerald';
}

export function LocationRow({
  icon,
  iconColorClass,
  label,
  badge,
  className,
  variant = 'primary',
  ...props
}: LocationRowProps) {
  return (
    <div
      className={cn(
        'group relative flex flex-col justify-between gap-4 overflow-hidden rounded-none border border-zinc-800 border-dashed bg-black/40 p-4 pl-6 transition-all hover:bg-zinc-900/60 sm:flex-row sm:items-center',
        variant === 'primary' && 'hover:border-[var(--theme-primary)]/50',
        variant === 'red' && 'hover:border-red-500/50',
        variant === 'amber' && 'hover:border-amber-500/50',
        variant === 'emerald' && 'hover:border-emerald-500/50',
        className,
      )}
      {...props}
    >
      <LcdGrid className="opacity-[0.03] transition-opacity group-hover:opacity-[0.08]" />
      <HoverScanner />

      <TacticalLed variant={variant} pipe position="top-1/2" />

      <div className="relative z-10 flex items-center gap-4">
        <div
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-none border border-dashed bg-zinc-950/80',
            iconColorClass,
          )}
        >
          {icon}
        </div>
        <span className="font-bold font-display text-lg text-white uppercase tracking-tight transition-colors">
          {label}
        </span>
      </div>
      <div className="relative z-10 self-start sm:self-auto">{badge}</div>
    </div>
  );
}
