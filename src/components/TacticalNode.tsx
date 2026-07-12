import type React from 'react';
import { cn } from '../utils/cn';
import { HoverScanner } from './HoverScanner';
import { LcdGrid } from './LcdGrid';

export interface TacticalNodeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'red' | 'purple' | 'blue' | 'pink';
}

export function TacticalNode({ variant = 'primary', className, children, ...props }: TacticalNodeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'red':
        return {
          wrapper: 'border-red-500/30 hover:border-red-500/50',
          pipe: 'border-red-500/30 bg-red-500/10 group-hover:border-red-500 group-hover:bg-red-500/20',
          ledOuter: 'border-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]',
          ledInner: 'bg-red-500',
        };
      case 'purple':
        return {
          wrapper: 'border-purple-500/30 hover:border-purple-500/50',
          pipe: 'border-purple-500/30 bg-purple-500/10 group-hover:border-purple-500 group-hover:bg-purple-500/20',
          ledOuter: 'border-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]',
          ledInner: 'bg-purple-500',
        };
      case 'blue':
        return {
          wrapper: 'border-blue-500/30 hover:border-blue-500/50',
          pipe: 'border-blue-500/30 bg-blue-500/10 group-hover:border-blue-500 group-hover:bg-blue-500/20',
          ledOuter: 'border-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]',
          ledInner: 'bg-blue-500',
        };
      case 'pink':
        return {
          wrapper: 'border-pink-500/30 hover:border-pink-500/50',
          pipe: 'border-pink-500/30 bg-pink-500/10 group-hover:border-pink-500 group-hover:bg-pink-500/20',
          ledOuter: 'border-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.5)]',
          ledInner: 'bg-pink-500',
        };
      default:
        return {
          wrapper: 'border-zinc-800 hover:border-[var(--theme-primary)]/50',
          pipe: 'border-[var(--theme-primary)]/30 bg-[var(--theme-primary)]/10 group-hover:border-[var(--theme-primary)] group-hover:bg-[var(--theme-primary)]/20',
          ledOuter: 'border-[var(--theme-primary)] shadow-[0_0_8px_var(--theme-primary)]',
          ledInner: 'bg-[var(--theme-primary)]',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-none border border-dashed bg-black/40 transition-all duration-300 hover:bg-zinc-900/60',
        styles.wrapper,
        className,
      )}
      {...props}
    >
      <LcdGrid className="opacity-[0.03] transition-opacity group-hover:opacity-[0.08]" />
      <HoverScanner />

      {/* Heavy Tactical Data Pipe */}
      <div
        className={cn('absolute top-0 bottom-0 left-0 w-1.5 border-r-2 border-dashed transition-colors', styles.pipe)}
      />

      {/* Active LED */}
      <div
        className={cn(
          'absolute top-3 left-[-2px] flex h-2.5 w-2.5 items-center justify-center border bg-black',
          styles.ledOuter,
        )}
      >
        <div className={cn('h-1 w-1 animate-[pulse_2s_ease-in-out_infinite]', styles.ledInner)} />
      </div>

      {children}
    </div>
  );
}
