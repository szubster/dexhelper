import React from 'react';
import { cn } from '../utils/cn';

interface DataLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const DataLabel = React.forwardRef<HTMLSpanElement, DataLabelProps>(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        'group relative inline-flex w-fit items-center gap-2 border-zinc-800 border-l-[2px] border-dashed bg-zinc-950/80 px-1.5 py-0.5 font-black font-mono text-[9px] text-zinc-400 uppercase tracking-widest transition-colors hover:border-[var(--theme-primary)]/50 hover:bg-black',
        className,
      )}
      {...props}
    >
      <span className="absolute top-1/2 left-[-3px] h-1.5 w-1.5 -translate-y-1/2 bg-zinc-700 transition-colors group-hover:bg-[var(--theme-primary)]" />
      {children}
    </span>
  );
});

DataLabel.displayName = 'DataLabel';
