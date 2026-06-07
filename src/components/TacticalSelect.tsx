import { ChevronDown } from 'lucide-react';
import React from 'react';
import { cn } from '../utils/cn';

export interface TacticalSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  containerClassName?: string;
  iconClassName?: string;
}

export const TacticalSelect = React.forwardRef<HTMLSelectElement, TacticalSelectProps>(
  ({ className, containerClassName, iconClassName, children, ...props }, ref) => {
    return (
      <div className={cn('relative w-full', containerClassName)}>
        <select
          ref={ref}
          className={cn(
            'peer w-full cursor-pointer appearance-none rounded-none border border-zinc-800 border-dashed bg-zinc-950 px-3 py-2 pr-8 font-black font-mono text-[9px] text-zinc-500 uppercase tracking-widest transition-all hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-zinc-500 transition-colors peer-hover:text-zinc-300">
          <ChevronDown size={14} className={iconClassName} />
        </div>
      </div>
    );
  },
);

TacticalSelect.displayName = 'TacticalSelect';
