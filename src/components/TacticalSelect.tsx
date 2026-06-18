import { ChevronDown } from 'lucide-react';
import React from 'react';
import { cn } from '../utils/cn';

export interface TacticalSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  containerClassName?: string;
}

export const TacticalSelect = React.forwardRef<HTMLSelectElement, TacticalSelectProps>(
  ({ className, containerClassName, children, ...props }, ref) => {
    return (
      <div className={cn('relative w-full', containerClassName)}>
        <select
          ref={ref}
          className={cn(
            'tactical-text focus-visible:tactical-focus w-full appearance-none rounded-none border border-zinc-800 border-dashed bg-zinc-950 px-3 py-2 pr-8 font-black text-[9px] text-zinc-500 transition-all hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-300 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-500">
          <ChevronDown size={14} />
        </div>
      </div>
    );
  },
);

TacticalSelect.displayName = 'TacticalSelect';
