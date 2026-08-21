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
        <select ref={ref} className={cn('tactical-select', className)} {...props}>
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
