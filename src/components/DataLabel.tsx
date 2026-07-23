import React from 'react';
import { cn } from '../utils/cn';

interface DataLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const DataLabel = React.forwardRef<HTMLSpanElement, DataLabelProps>(({ className, children, ...props }, ref) => {
  return (
    <span ref={ref} className={cn('tactical-text text-[9px] text-zinc-500', className)} {...props}>
      {children}
    </span>
  );
});

DataLabel.displayName = 'DataLabel';
