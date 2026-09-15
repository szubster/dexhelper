import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
import React from 'react';
import { cn } from '../utils/cn';

const selectVariants = cva('tactical-select peer', {
  variants: {
    intent: {
      default: '',
    },
  },
  defaultVariants: {
    intent: 'default',
  },
});

export interface TacticalSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {
  containerClassName?: string;
}

export const TacticalSelect = React.forwardRef<HTMLSelectElement, TacticalSelectProps>(
  ({ className, containerClassName, children, intent, ...props }, ref) => {
    return (
      <div className={cn('relative w-full', containerClassName)}>
        <select ref={ref} className={cn(selectVariants({ intent }), className)} {...props}>
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-500 peer-disabled:opacity-50">
          <ChevronDown size={14} />
        </div>
      </div>
    );
  },
);

TacticalSelect.displayName = 'TacticalSelect';
