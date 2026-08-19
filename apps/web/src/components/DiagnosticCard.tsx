import { Activity } from 'lucide-react';
import type React from 'react';
import { cn } from '../utils/cn';
import { TacticalNode } from './TacticalNode';
import { TelemetrySparkline } from './TelemetrySparkline';

interface DiagnosticCardProps {
  label: string;
  value: React.ReactNode;
  subValue?: React.ReactNode;
  valueClassName?: string;
}

export function DiagnosticCard({ label, value, subValue, valueClassName }: DiagnosticCardProps) {
  return (
    <TacticalNode variant="primary" className="bg-zinc-950/80 hover:bg-zinc-900/90">
      <div className="relative z-10 flex flex-1 flex-col p-4 pl-6">
        <div className="mb-3 flex items-center justify-between border-zinc-800/50 border-b border-dashed pb-2">
          <p className="tactical-text font-black text-[9px] text-zinc-500 transition-colors group-hover:text-[var(--theme-primary)]">
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

          <TelemetrySparkline />
        </div>
      </div>
    </TacticalNode>
  );
}
