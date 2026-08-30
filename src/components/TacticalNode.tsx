import type React from 'react';
import { cn } from '../utils/cn';
import { HoverScanner } from './HoverScanner';
import { LcdGrid } from './LcdGrid';
import { TacticalLed } from './TacticalLed';

export interface TacticalNodeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'red' | 'purple' | 'blue' | 'pink';
}

export function TacticalNode({ variant = 'primary', className, children, ...props }: TacticalNodeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'red':
        return 'border-red-500/30 hover:border-red-500/50';
      case 'purple':
        return 'border-purple-500/30 hover:border-purple-500/50';
      case 'blue':
        return 'border-blue-500/30 hover:border-blue-500/50';
      case 'pink':
        return 'border-pink-500/30 hover:border-pink-500/50';
      default:
        return 'border-zinc-800 hover:border-[var(--theme-primary)]/50';
    }
  };

  const wrapperStyle = getVariantStyles();

  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-none border border-dashed bg-black/40 transition-all duration-300 hover:bg-zinc-900/60',
        wrapperStyle,
        className,
      )}
      {...props}
    >
      <LcdGrid className="opacity-[0.03] transition-opacity group-hover:opacity-[0.08]" />
      <HoverScanner />

      <TacticalLed variant={variant} pipe position="top-3" />

      {children}
    </div>
  );
}
