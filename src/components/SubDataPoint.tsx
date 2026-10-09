import React from 'react';
import { cn } from '../utils/cn';

export interface SubDataPointProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value?: React.ReactNode;
  children?: React.ReactNode;
  labelClassName?: string;
  valueClassName?: string;
}

export const SubDataPoint = React.forwardRef<HTMLDivElement, SubDataPointProps>(function SubDataPoint(
  { label, value, children, className, labelClassName, valueClassName, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn('flex flex-col gap-1 bg-zinc-950/80 p-3', className)} {...props}>
      <span className={cn('font-mono text-[8px] text-zinc-500 uppercase tracking-widest', labelClassName)}>
        {label}
      </span>
      {value !== undefined || children !== undefined ? (
        <span className={cn('truncate font-mono text-[11px] text-zinc-300', valueClassName)}>{value ?? children}</span>
      ) : null}
    </div>
  );
});

SubDataPoint.displayName = 'SubDataPoint';
