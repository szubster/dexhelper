import type React from 'react';
import { cn } from '../utils/cn';

interface TacticalStatCardProps {
  label: React.ReactNode;
  value: React.ReactNode;
  subtext?: React.ReactNode;
  className?: string;
}

export function TacticalStatCard({ label, value, subtext, className }: TacticalStatCardProps) {
  return (
    <div className={cn('rounded-none border border-white/10 border-dashed bg-zinc-800/50 p-4 shadow-sm', className)}>
      <p className="mb-1 font-black font-mono text-[10px] text-[var(--theme-primary)] uppercase tracking-widest">
        {label}
      </p>
      <p className="font-black font-display text-lg text-white">{value}</p>
      {subtext && <p className="font-mono text-[10px] text-zinc-600">{subtext}</p>}
    </div>
  );
}
