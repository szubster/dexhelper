import type React from 'react';
import { cn } from '../utils/cn';

interface DiagnosticCardProps {
  label: string;
  value: React.ReactNode;
  subValue?: React.ReactNode;
  valueClassName?: string;
}

export function DiagnosticCard({ label, value, subValue, valueClassName }: DiagnosticCardProps) {
  return (
    <div className="rounded-none border border-white/10 border-dashed bg-zinc-800/50 p-4 shadow-sm">
      <p className="mb-1 font-black font-mono text-[10px] text-[var(--theme-primary)] uppercase tracking-widest">
        {label}
      </p>
      <p className={cn('font-black font-display text-lg text-white', valueClassName)}>{value}</p>
      {subValue && <p className="font-mono text-[10px] text-zinc-600">{subValue}</p>}
    </div>
  );
}
