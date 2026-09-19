import { Terminal } from 'lucide-react';
import type React from 'react';
import { cn } from '../utils/cn';
import { CornerCrosshairs } from './CornerCrosshairs';
import { LcdGrid } from './LcdGrid';
import { ScanlineOverlay } from './ScanlineOverlay';
import { TelemetrySparkline } from './TelemetrySparkline';

interface DiagnosticCardProps {
  label: string;
  value: React.ReactNode;
  subValue?: React.ReactNode;
  valueClassName?: string;
}

export function DiagnosticCard({ label, value, subValue, valueClassName }: DiagnosticCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-none border border-zinc-800/80 border-dashed bg-black/40 transition-all duration-500 hover:border-[var(--theme-primary)]/50 hover:bg-zinc-950/60">
      <LcdGrid className="opacity-[0.03] transition-opacity duration-500 group-hover:opacity-[0.08]" />
      <ScanlineOverlay opacityClass="opacity-10" />
      <CornerCrosshairs className="h-2 w-2 border-zinc-700/50 transition-colors duration-500 group-hover:border-[var(--theme-primary)]/80" />

      {/* Hover Illumination Bar */}
      <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-transparent via-[var(--theme-primary)]/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-[var(--theme-primary)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Laser Scan Effect on Hover */}
      <div className="absolute top-0 bottom-0 left-0 w-full -translate-x-[100%] bg-gradient-to-r from-transparent via-[var(--theme-primary)]/10 to-transparent opacity-0 transition-all duration-1000 ease-in-out group-hover:translate-x-[100%] group-hover:opacity-100" />

      <div className="relative z-10 flex flex-1 flex-col">
        {/* Header Tab */}
        <div className="flex items-center justify-between border-zinc-800/50 border-b border-dashed bg-zinc-900/50 px-4 py-2 transition-colors duration-500 group-hover:border-[var(--theme-primary)]/30 group-hover:bg-[var(--theme-primary)]/5">
          <p className="tactical-text font-black text-[9px] text-zinc-500 transition-colors duration-500 group-hover:text-[var(--theme-primary)]">
            [ {label} ]
          </p>
          <Terminal
            size={10}
            className="text-zinc-600 transition-colors duration-500 group-hover:text-[var(--theme-primary)]"
          />
        </div>

        {/* Value Section */}
        <div className="relative flex flex-1 flex-col justify-end p-4 pl-5">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[var(--theme-primary)] text-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {'>'}
            </span>
            <p
              className={cn(
                'font-black font-mono text-3xl text-zinc-200 tracking-tighter drop-shadow-[0_0_8px_rgba(255,255,255,0.05)] transition-all duration-300 group-hover:text-white',
                valueClassName,
              )}
            >
              {value}
            </p>
            <span className="h-4 w-2 animate-pulse bg-[var(--theme-primary)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          {subValue && (
            <p className="mt-1 flex items-center gap-2 font-bold font-mono text-[9px] text-zinc-500 uppercase tracking-widest transition-colors duration-500 group-hover:text-zinc-400">
              <span className="h-[1px] w-2 bg-zinc-700 transition-colors duration-500 group-hover:bg-[var(--theme-primary)]/50" />
              {subValue}
            </p>
          )}

          <div className="absolute right-0 bottom-0 w-full translate-y-1 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <TelemetrySparkline />
          </div>
        </div>
      </div>
    </div>
  );
}
