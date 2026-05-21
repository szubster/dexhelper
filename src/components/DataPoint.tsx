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
    <div className={cn('flex flex-col', className)}>
      <span className={cn('font-black text-[9px] text-zinc-500 uppercase tracking-widest', labelClassName)}>
        {label}
      </span>
      <span className={cn('font-bold text-xs text-zinc-300 uppercase', valueClassName)}>{value || children}</span>
    </div>
  );
}
