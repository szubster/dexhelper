import type React from 'react';
import { cn } from '../utils/cn';
import { CornerCrosshairs } from './CornerCrosshairs';
import { HardwareScrews } from './HardwareScrews';
import { LcdGrid } from './LcdGrid';

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
        'group relative flex flex-col justify-between gap-4 border-2 border-zinc-800 bg-zinc-950 p-5 shadow-[inset_0_4px_10px_rgba(0,0,0,0.6),0_2px_4px_rgba(0,0,0,0.5)] transition-colors hover:border-zinc-700 sm:flex-row sm:items-center',
        className,
      )}
      {...props}
    >
      <LcdGrid className="pointer-events-none opacity-5" />
      <HardwareScrews className="opacity-40" />
      <CornerCrosshairs className="h-2 w-2 border-zinc-600 transition-colors group-hover:border-[var(--theme-primary)]" />

      <div className="z-10 flex items-center gap-4">
        <div
          className={cn(
            'flex items-center justify-center border-2 border-dashed p-3 shadow-[0_0_10px_rgba(0,0,0,0.5)]',
            iconColorClass,
          )}
        >
          {icon}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-bold font-mono text-xs text-zinc-300 uppercase tracking-[0.2em] group-hover:text-white">
            {label}
          </span>
          <div className="flex items-center gap-2 font-mono text-[9px] text-zinc-600">
            <span className="animate-pulse text-zinc-500">{'>'}</span>
            <span className="uppercase">PARAMETER_OVERRIDE</span>
          </div>
        </div>
      </div>
      <div className="z-10 w-full sm:w-auto">{children}</div>
    </div>
  );
}
