import type React from 'react';
import { cn } from '../utils/cn';
import { CornerCrosshairs } from './CornerCrosshairs';

interface EmptyStateProps {
  label: string;
  icon?: React.ReactNode;
  className?: string;
  labelClassName?: string;
}

export function EmptyState({ label, icon, className, labelClassName }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'relative col-span-full flex flex-col items-center justify-center rounded-none border border-zinc-800/50 border-dashed bg-zinc-950/20 p-6 text-center',
        className,
      )}
    >
      <CornerCrosshairs className="h-1.5 w-1.5 border-zinc-700/50" />
      {icon && <div className="mb-3 text-zinc-600">{icon}</div>}
      <span className={cn('font-mono text-xs text-zinc-500 uppercase', labelClassName)}>{label}</span>
    </div>
  );
}
