import type React from 'react';
import { cn } from '../utils/cn';

export interface TacticalLedProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'red' | 'purple' | 'blue' | 'pink' | 'amber' | 'emerald' | 'zinc';
  pipe?: boolean;
  position?: 'top-1/2' | 'top-3';
}

export function TacticalLed({
  variant = 'primary',
  pipe = true,
  position = 'top-3',
  className,
  ...props
}: TacticalLedProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'red':
        return {
          pipe: 'border-red-500/30 bg-red-500/10 group-hover:border-red-500 group-hover:bg-red-500/20',
          ledOuter: 'border-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]',
          ledInner: 'bg-red-500',
        };
      case 'purple':
        return {
          pipe: 'border-purple-500/30 bg-purple-500/10 group-hover:border-purple-500 group-hover:bg-purple-500/20',
          ledOuter: 'border-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]',
          ledInner: 'bg-purple-500',
        };
      case 'blue':
        return {
          pipe: 'border-blue-500/30 bg-blue-500/10 group-hover:border-blue-500 group-hover:bg-blue-500/20',
          ledOuter: 'border-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]',
          ledInner: 'bg-blue-500',
        };
      case 'pink':
        return {
          pipe: 'border-pink-500/30 bg-pink-500/10 group-hover:border-pink-500 group-hover:bg-pink-500/20',
          ledOuter: 'border-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.5)]',
          ledInner: 'bg-pink-500',
        };
      case 'amber':
        return {
          pipe: 'border-amber-500/30 bg-amber-500/10 group-hover:border-amber-500 group-hover:bg-amber-500/20',
          ledOuter: 'border-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]',
          ledInner: 'bg-amber-500',
        };
      case 'emerald':
        return {
          pipe: 'border-emerald-500/30 bg-emerald-500/10 group-hover:border-emerald-500 group-hover:bg-emerald-500/20',
          ledOuter: 'border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]',
          ledInner: 'bg-emerald-500',
        };
      case 'zinc':
        return {
          pipe: 'border-zinc-500/30 bg-zinc-500/10 group-hover:border-zinc-500 group-hover:bg-zinc-500/20',
          ledOuter: 'border-zinc-500 shadow-[0_0_8px_rgba(113,113,122,0.5)]',
          ledInner: 'bg-zinc-500',
        };
      default:
        return {
          pipe: 'border-[var(--theme-primary)]/30 bg-[var(--theme-primary)]/10 group-hover:border-[var(--theme-primary)] group-hover:bg-[var(--theme-primary)]/20',
          ledOuter: 'border-[var(--theme-primary)] shadow-[0_0_8px_var(--theme-primary)]',
          ledInner: 'bg-[var(--theme-primary)]',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <>
      {pipe && (
        <div
          className={cn('absolute top-0 bottom-0 left-0 w-1.5 border-r-2 border-dashed transition-colors', styles.pipe)}
        />
      )}
      <div
        className={cn(
          'absolute left-[-2px] flex h-2.5 w-2.5 items-center justify-center border bg-black',
          position === 'top-1/2' ? 'top-1/2 -translate-y-1/2' : position,
          styles.ledOuter,
          className,
        )}
        {...props}
      >
        <div className={cn('h-1 w-1 animate-[pulse_2s_ease-in-out_infinite]', styles.ledInner)} />
      </div>
    </>
  );
}
