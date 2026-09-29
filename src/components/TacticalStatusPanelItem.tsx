import React from 'react';
import { cn } from '../utils/cn';

export interface TacticalStatusPanelItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  active?: boolean;
  statusText?: React.ReactNode;
  activeClassName?: string;
  inactiveClassName?: string;
}

export const TacticalStatusPanelItem = React.forwardRef<HTMLDivElement, TacticalStatusPanelItemProps>(
  (
    {
      label,
      active = false,
      statusText,
      activeClassName = 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]',
      inactiveClassName = 'border-zinc-700 bg-black/40 text-zinc-500',
      className,
      ...props
    },
    ref,
  ) => {
    const defaultStatusText = active ? '[X]' : '[ ]';
    const resolvedStatusText = statusText ?? defaultStatusText;

    return (
      <div
        ref={ref}
        className={cn(
          'tactical-panel flex items-center justify-between border-2 p-2 text-xs',
          active ? activeClassName : inactiveClassName,
          className,
        )}
        {...props}
      >
        <span className="truncate">{label}</span>
        <span className="flex-shrink-0 font-black">{resolvedStatusText}</span>
      </div>
    );
  },
);

TacticalStatusPanelItem.displayName = 'TacticalStatusPanelItem';
