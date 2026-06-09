import type React from 'react';
import { cn } from '../utils/cn';

interface DataPointProps {
  label: React.ReactNode;
  value?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

export function DataPoint({ label, value, children, className, labelClassName, valueClassName }: DataPointProps) {
  return (
    <div className={cn('relative flex flex-col border-zinc-800 border-l border-dashed pl-3', className)}>
      <div className="absolute top-1.5 left-[-2px] h-1.5 w-1.5 border border-zinc-500 bg-zinc-950" />
      <span
        className={cn('mb-0.5 font-black font-mono text-[9px] text-zinc-500 uppercase tracking-widest', labelClassName)}
      >
        {label}
      </span>
      <span className={cn('font-bold font-mono text-[11px] text-zinc-300 uppercase tracking-tight', valueClassName)}>
        {value || children}
      </span>
    </div>
  );
}
