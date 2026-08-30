import type React from 'react';
import { cn } from '../../../utils/cn';
import { HoverScanner } from '../../HoverScanner';
import { LcdGrid } from '../../LcdGrid';

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
  let pipeColor = 'border-[var(--theme-primary)]/30 bg-[var(--theme-primary)]/10';
  let ledColor = 'border-[var(--theme-primary)] bg-[var(--theme-primary)]';

  if (variant === 'red') {
    pipeColor = 'border-red-500/30 bg-red-500/10';
    ledColor = 'border-red-500 bg-red-500';
  } else if (variant === 'amber') {
    pipeColor = 'border-amber-500/30 bg-amber-500/10';
    ledColor = 'border-amber-500 bg-amber-500';
  } else if (variant === 'emerald') {
    pipeColor = 'border-emerald-500/30 bg-emerald-500/10';
    ledColor = 'border-emerald-500 bg-emerald-500';
  }

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

      {/* Left Data Pipe */}
      <div
        className={cn('absolute top-0 bottom-0 left-0 w-1.5 border-r-2 border-dashed transition-colors', pipeColor)}
      />

      {/* Active LED */}
      <div
        className={cn(
          'absolute top-1/2 left-[-2px] flex h-2.5 w-2.5 -translate-y-1/2 items-center justify-center border bg-black shadow-lg',
          ledColor.split(' ')[0],
        )}
      >
        <div className={cn('h-1 w-1 animate-[pulse_2s_ease-in-out_infinite]', ledColor.split(' ')[1])} />
      </div>

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
