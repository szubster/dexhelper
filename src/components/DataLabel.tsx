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
        'group relative inline-flex w-fit items-center gap-1.5 border border-zinc-800/80 border-dashed bg-zinc-950/60 px-2 py-0.5 font-black font-mono text-[9px] text-zinc-400 uppercase tracking-widest transition-all duration-300 hover:border-[var(--theme-primary)]/50 hover:bg-zinc-900/80 hover:text-zinc-200',
        className,
      )}
      {...props}
    >
      <span className="absolute top-0 left-0 h-1 w-1 border-zinc-700/80 border-t border-l transition-colors group-hover:border-[var(--theme-primary)]" />
      <span className="absolute top-0 right-0 h-1 w-1 border-zinc-700/80 border-t border-r transition-colors group-hover:border-[var(--theme-primary)]" />
      <span className="absolute bottom-0 left-0 h-1 w-1 border-zinc-700/80 border-b border-l transition-colors group-hover:border-[var(--theme-primary)]" />
      <span className="absolute right-0 bottom-0 h-1 w-1 border-zinc-700/80 border-r border-b transition-colors group-hover:border-[var(--theme-primary)]" />

      <span
        className="font-bold text-[8px] text-[var(--theme-primary)]/60 transition-colors group-hover:text-[var(--theme-primary)]"
        aria-hidden="true"
      >
        {'>>'}
      </span>
      <span className="relative z-10 drop-shadow-[0_0_4px_rgba(255,255,255,0.05)]">{children}</span>
    </span>
  );
});

DataLabel.displayName = 'DataLabel';
