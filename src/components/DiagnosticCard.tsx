import { Activity } from 'lucide-react';
import type React from 'react';
import { cn } from '../utils/cn';
import { HoverScanner } from './HoverScanner';
import { LcdGrid } from './LcdGrid';

interface DiagnosticCardProps {
  label: string;
  value: React.ReactNode;
  subValue?: React.ReactNode;
  valueClassName?: string;
}

export function DiagnosticCard({ label, value, subValue, valueClassName }: DiagnosticCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-none border border-zinc-800 border-dashed bg-zinc-950/80 transition-colors duration-300 hover:border-[var(--theme-primary)]/50 hover:bg-zinc-900/90">
      {/* Background FX */}
      <LcdGrid className="opacity-[0.03] transition-opacity duration-300 group-hover:opacity-[0.08]" />
      <HoverScanner colorClass="via-[var(--theme-primary)]/10" />

      {/* Data Pipe Line */}
      <div className="absolute top-0 bottom-0 left-0 w-1 border-[var(--theme-primary)]/20 border-r border-dashed bg-[var(--theme-primary)]/5 transition-colors group-hover:border-[var(--theme-primary)] group-hover:bg-[var(--theme-primary)]/20" />

      {/* Pulsing Status LED */}
      <div className="absolute top-3 left-[-1px] flex h-3 w-3 items-center justify-center border border-[var(--theme-primary)] bg-black shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.5)]">
        <div className="h-1 w-1 animate-pulse bg-[var(--theme-primary)]" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-4 pl-6">
        <div className="mb-3 flex items-center justify-between border-zinc-800/50 border-b border-dashed pb-2">
          <p className="font-black font-mono text-[9px] text-zinc-500 uppercase tracking-widest transition-colors group-hover:text-[var(--theme-primary)]">
            [ {label} ]
          </p>
          <Activity size={10} className="text-zinc-600 transition-colors group-hover:text-[var(--theme-primary)]" />
        </div>

        <div className="relative flex flex-1 flex-col justify-end">
          <p
            className={cn(
              'font-black font-display text-2xl text-white tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] transition-transform duration-300 group-hover:-translate-y-1',
              valueClassName,
            )}
          >
            {value}
          </p>
          {subValue && (
            <p className="mt-1 font-bold font-mono text-[9px] text-zinc-500 uppercase tracking-wider">{subValue}</p>
          )}

          {/* Faux telemetry sparkline visible on hover */}
          <svg
            className="absolute right-0 bottom-0 left-0 h-6 w-full translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 20 L 10 15 L 20 18 L 30 10 L 40 12 L 50 5 L 60 8 L 70 2 L 80 15 L 90 8 L 100 20"
              fill="none"
              stroke="var(--theme-primary)"
              strokeWidth="1"
              strokeOpacity="0.4"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M0 20 L 10 15 L 20 18 L 30 10 L 40 12 L 50 5 L 60 8 L 70 2 L 80 15 L 90 8 L 100 20 L 100 20 L 0 20 Z"
              fill="var(--theme-primary)"
              fillOpacity="0.05"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
