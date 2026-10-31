import React from 'react';
import { cn } from '../utils/cn';

export interface TacticalHeaderDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const TacticalHeaderDivider = React.forwardRef<HTMLDivElement, TacticalHeaderDividerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-between border-b border-dashed border-zinc-800 pb-2', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

TacticalHeaderDivider.displayName = 'TacticalHeaderDivider';
