import type React from 'react';
import { cn } from '../utils/cn';

interface InlineDataPointProps {
  label: React.ReactNode;
  value?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

export function InlineDataPoint({
  label,
  value,
  children,
  className,
  labelClassName,
  valueClassName,
}: InlineDataPointProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className={cn('tactical-text font-black text-[8px] text-zinc-500', labelClassName)}>{label}</span>
      <span
        className={cn(
          'font-black font-mono text-[10px] text-[var(--theme-primary)] uppercase tracking-tight',
          valueClassName,
        )}
      >
        {value || children}
      </span>
    </div>
  );
}
