import React from 'react';
import { cn } from '../utils/cn';

export interface EdgeLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const EdgeLabel = React.forwardRef<HTMLDivElement, EdgeLabelProps>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('tactical-text absolute bg-zinc-950 px-1 text-[9px] text-zinc-500', className)}
      {...props}
    >
      <span aria-hidden="true">[ </span>
      {children}
      <span aria-hidden="true"> ]</span>
    </div>
  );
});

EdgeLabel.displayName = 'EdgeLabel';
