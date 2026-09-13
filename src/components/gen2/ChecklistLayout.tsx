import React from 'react';
import { cn } from '../../utils/cn';
import { TacticalPanel } from '../TacticalPanel';

interface ChecklistLayoutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  children?: React.ReactNode;
}

export const ChecklistLayout = React.forwardRef<HTMLDivElement, ChecklistLayoutProps>(
  ({ title, children, className, ...props }, ref) => {
    return (
      <TacticalPanel
        ref={ref}
        className={cn('flex flex-col gap-4 rounded-none border border-dashed p-4 font-mono', className)}
        {...props}
      >
        {title && (
          <div className="mb-2 border-zinc-700 border-b border-dashed pb-2 font-bold text-lg text-zinc-200 uppercase tracking-wider">
            {title}
          </div>
        )}
        <div className="flex flex-col gap-2">{children}</div>
      </TacticalPanel>
    );
  },
);

ChecklistLayout.displayName = 'ChecklistLayout';
