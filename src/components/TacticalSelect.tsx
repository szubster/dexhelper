import React from 'react';
import { cn } from '../utils/cn';

export interface TacticalSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  containerClassName?: string;
}

export const TacticalSelect = React.forwardRef<HTMLSelectElement, TacticalSelectProps>(
  ({ className, containerClassName, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'w-full appearance-none rounded-none border border-zinc-800 border-dashed bg-zinc-950 px-3 py-2 font-black font-mono text-[9px] text-zinc-500 uppercase tracking-widest transition-all hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
          className,
          containerClassName,
        )}
        {...props}
      >
        {children}
      </select>
    );
  },
);

TacticalSelect.displayName = 'TacticalSelect';
