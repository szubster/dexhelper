import type React from 'react';
import { cn } from '../utils/cn';
import { CornerCrosshairs } from './CornerCrosshairs';

interface SettingsRowProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  iconColorClass?: string;
  label: string;
  children: React.ReactNode;
}

export function SettingsRow({
  icon,
  iconColorClass = 'text-white border-white/20 bg-white/10',
  label,
  children,
  className,
  ...props
}: SettingsRowProps) {
  return (
    <div
      className={cn(
        'group relative flex items-center justify-between border border-zinc-800 border-dashed bg-zinc-900/50 p-4 transition-colors hover:bg-zinc-800/80',
        className,
      )}
      {...props}
    >
      <CornerCrosshairs className="h-1.5 w-1.5 border-zinc-600 transition-colors group-hover:border-[var(--theme-primary)]" />
      <div className="flex items-center gap-3">
        <div className={cn('border border-dashed p-2', iconColorClass)}>{icon}</div>
        <span className="font-bold text-xs uppercase tracking-wider">{label}</span>
      </div>
      {children}
    </div>
  );
}
