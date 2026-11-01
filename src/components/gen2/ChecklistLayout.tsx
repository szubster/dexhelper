import React from 'react';
import { cn } from '../../utils/cn';
import { TacticalPanel } from '../TacticalPanel';

interface ChecklistLayoutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  children?: React.ReactNode;
}

// ⚡ Bolt: Wrapped ChecklistLayout in React.memo to prevent unnecessary re-renders of the checklist layout tree
// when parent component updates without title or layout props changing.
export const ChecklistLayout = React.memo(
  React.forwardRef<HTMLDivElement, ChecklistLayoutProps>(({ title, children, className, ...props }, ref) => {
    return (
      <TacticalPanel
        ref={ref}
        className={cn('flex flex-col gap-4 rounded-none border border-dashed p-4 font-mono', className)}
        {...props}
      >
        {title && (
          <div className="mb-2 border-b border-dashed border-zinc-700 pb-2 text-lg font-bold tracking-wider text-zinc-200 uppercase">
            {title}
          </div>
        )}
        <div className="flex flex-col gap-2">{children}</div>
      </TacticalPanel>
    );
  }),
);

ChecklistLayout.displayName = 'ChecklistLayout';
