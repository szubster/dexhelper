import type React from 'react';
import { cn } from '../utils/cn';
import { CornerCrosshairs } from './CornerCrosshairs';
import { LcdGrid } from './LcdGrid';
import { ScanlineOverlay } from './ScanlineOverlay';

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
        'group relative col-span-full flex w-full flex-col items-center justify-center overflow-hidden rounded-none border border-zinc-800/80 border-dashed bg-black/40 p-12 text-center transition-colors duration-500 hover:border-zinc-700 hover:bg-zinc-950/60',
        className,
      )}
    >
      <LcdGrid className="opacity-[0.03]" />
      <ScanlineOverlay opacityClass="opacity-10" />
      <CornerCrosshairs className="h-2 w-2 border-zinc-700/50 transition-colors group-hover:border-[var(--theme-primary)]/50" />

      {/* Radar / Scanner Visual */}
      <div className="relative mb-8 flex h-24 w-24 items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border border-zinc-800/80 border-dashed transition-colors group-hover:border-zinc-700" />
        {/* Inner Ring */}
        <div className="absolute inset-4 rounded-full border border-zinc-800/50 transition-colors group-hover:border-zinc-700/80" />

        {/* Scanning beam */}
        <div className="absolute inset-0 origin-center animate-[spin_3s_linear_infinite] rounded-full border-[var(--theme-primary)]/30 border-t border-r bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(var(--theme-primary-rgb),0.05)_360deg)] opacity-0 transition-opacity duration-1000 group-hover:opacity-100" />

        {/* Center Icon or Default Blip */}
        <div className="relative z-10 flex h-10 w-10 items-center justify-center text-zinc-600 transition-colors duration-500 group-hover:text-[var(--theme-primary)]/70 group-hover:drop-shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.5)]">
          {icon ? (
            icon
          ) : (
            <div className="h-2 w-2 rounded-none bg-zinc-700 transition-colors group-hover:animate-pulse group-hover:bg-[var(--theme-primary)] group-hover:shadow-[0_0_8px_var(--theme-primary)]" />
          )}
        </div>

        {/* Crosshairs for the radar */}
        <div className="absolute top-1/2 left-[-20%] h-[1px] w-[140%] bg-zinc-800/50 transition-colors group-hover:bg-[var(--theme-primary)]/20" />
        <div className="absolute top-[-20%] left-1/2 h-[140%] w-[1px] bg-zinc-800/50 transition-colors group-hover:bg-[var(--theme-primary)]/20" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-none border border-red-900 bg-red-900/20 group-hover:animate-pulse group-hover:bg-red-500 group-hover:shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          <span className="font-black font-mono text-[10px] text-zinc-600 uppercase tracking-[0.3em] transition-colors group-hover:text-zinc-400">
            [ SIGNAL_LOST ]
          </span>
        </div>

        <span
          className={cn(
            'font-bold font-mono text-sm text-zinc-500 uppercase tracking-widest transition-colors group-hover:text-zinc-300',
            labelClassName,
          )}
        >
          {label}
        </span>

        {/* Data processing decoration */}
        <div className="mt-2 flex gap-1.5 opacity-50 transition-opacity group-hover:opacity-100">
          <div className="h-1 w-6 bg-zinc-800 transition-colors group-hover:bg-[var(--theme-primary)]/40" />
          <div className="h-1 w-1.5 bg-zinc-800 transition-colors delay-100 group-hover:bg-[var(--theme-primary)]/60" />
          <div className="h-1 w-1.5 bg-zinc-800 transition-colors delay-200 group-hover:bg-[var(--theme-primary)]/80" />
        </div>
      </div>
    </div>
  );
}
