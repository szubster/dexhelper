import React from 'react';
import { cn } from '../utils/cn';

export interface RackHandleProps extends React.HTMLAttributes<HTMLDivElement> {}

export const RackHandle = React.forwardRef<HTMLDivElement, RackHandleProps>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex w-4 shrink-0 flex-col justify-between border-zinc-700/50 border-r border-dashed pr-2',
        className,
      )}
      {...props}
    >
      <div className="h-2 w-2 rounded-full border border-zinc-600 bg-zinc-800 shadow-inner" />
      <div className="my-2 w-1.5 flex-1 rounded-none bg-gradient-to-b from-zinc-700 via-zinc-600 to-zinc-700 shadow-[inset_1px_0_2px_rgba(255,255,255,0.2)]" />
      <div className="h-2 w-2 rounded-full border border-zinc-600 bg-zinc-800 shadow-inner" />
    </div>
  );
});

RackHandle.displayName = 'RackHandle';
