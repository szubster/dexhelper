import { Activity } from 'lucide-react';
import type React from 'react';
import { cn } from '../utils/cn';
import { CornerCrosshairs } from './CornerCrosshairs';
import { HoverScanner } from './HoverScanner';
import { LcdGrid } from './LcdGrid';
import { ScanlineOverlay } from './ScanlineOverlay';
import { TelemetrySparkline } from './TelemetrySparkline';

interface DiagnosticCardProps {
  label: string;
  value: React.ReactNode;
  subValue?: React.ReactNode;
  valueClassName?: string;
  className?: string;
}

export function DiagnosticCard({ label, value, subValue, valueClassName, className }: DiagnosticCardProps) {
  return (
    <div
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-none border border-zinc-800/80 border-dashed bg-black/40 p-4 transition-all duration-300 hover:border-[var(--theme-primary)]/50 hover:bg-zinc-900/80',
        className,
      )}
    >
      <LcdGrid className="opacity-[0.03] transition-opacity group-hover:opacity-[0.08]" />
      <ScanlineOverlay opacityClass="opacity-10 group-hover:opacity-20" />
      <HoverScanner />

      <CornerCrosshairs
        thickness={2}
        className="h-2 w-2 border-white/40 transition-colors group-hover:border-[var(--theme-primary)]"
      />

      {/* Decorative corners */}
      <div className="absolute top-0 left-0 h-1.5 w-1.5 border-zinc-700/80 border-t-[1.5px] border-l-[1.5px] transition-colors group-hover:border-[var(--theme-primary)]" />
      <div className="absolute top-0 right-0 h-1.5 w-1.5 border-zinc-700/80 border-t-[1.5px] border-r-[1.5px] transition-colors group-hover:border-[var(--theme-primary)]" />
      <div className="absolute bottom-0 left-0 h-1.5 w-1.5 border-zinc-700/80 border-b-[1.5px] border-l-[1.5px] transition-colors group-hover:border-[var(--theme-primary)]" />
      <div className="absolute right-0 bottom-0 h-1.5 w-1.5 border-zinc-700/80 border-r-[1.5px] border-b-[1.5px] transition-colors group-hover:border-[var(--theme-primary)]" />

      {/* Background glow on hover */}
      <div className="absolute top-0 bottom-0 left-0 w-0 bg-[var(--theme-primary)]/10 opacity-0 transition-all duration-700 group-hover:w-full group-hover:opacity-100" />

      <div className="relative z-10 flex h-full w-full flex-col">
        <div className="mb-4 flex items-center justify-between border-zinc-800/50 border-b border-dashed pb-2">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 border border-[var(--theme-primary)]/50 bg-[var(--theme-primary)]/20 transition-colors group-hover:bg-[var(--theme-primary)]" />
            <span className="font-black font-mono text-[9px] text-zinc-500 uppercase tracking-widest transition-colors group-hover:text-[var(--theme-primary)]">
              [ {label} ]
            </span>
          </div>
          <Activity size={12} className="text-zinc-600 transition-colors group-hover:text-[var(--theme-primary)]" />
        </div>

        <div className="relative flex flex-1 flex-col justify-end">
          <p
            className={cn(
              'font-black font-display text-2xl text-white tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.05)] transition-colors group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.1)]',
              valueClassName,
            )}
          >
            {value}
          </p>

          <div className="mt-1 flex items-center gap-2">
            <span className="font-bold font-mono text-[10px] text-[var(--theme-primary)]/60" aria-hidden="true">
              {'>>'}
            </span>
            {subValue ? (
              <span className="font-bold font-mono text-[9px] text-zinc-500 uppercase tracking-wider transition-colors group-hover:text-zinc-400">
                {subValue}
              </span>
            ) : (
              <span className="font-bold font-mono text-[9px] text-zinc-700 uppercase tracking-wider">NULL</span>
            )}
          </div>

          <TelemetrySparkline />
        </div>
      </div>
    </div>
  );
}
