import { TacticalButton } from '@dexhelper/ui';
import React from 'react';
import { cn } from '../utils/cn';

interface ClearFiltersBadgeProps {
  isActive: boolean;
  onClick: () => void;
}

// ⚡ Bolt: Wrapped ClearFiltersBadge in React.memo to prevent unnecessary re-renders when parent filter controls update without badge props changing.
export const ClearFiltersBadge = React.memo(function ClearFiltersBadge({ isActive, onClick }: ClearFiltersBadgeProps) {
  return (
    <TacticalButton
      onClick={onClick}
      aria-pressed={isActive}
      title="Clear filters"
      aria-label="Clear filters"
      variant="sidebar"
      hasCrosshairs={true}
      className={cn(
        'h-14 min-w-20 border-r-0 xl:min-w-25',
        isActive
          ? '!border-[var(--theme-primary)] bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] shadow-[inset_0_0_15px_rgba(var(--theme-primary-rgb),0.2)]'
          : '',
      )}
    >
      <div
        className={cn(
          'absolute top-1 right-1 h-1.5 w-1.5 rounded-none',
          isActive ? 'bg-[var(--theme-primary)] shadow-[0_0_5px_var(--theme-primary)]' : 'bg-zinc-800',
        )}
      />
      <span className="whitespace-nowrap">
        <span aria-hidden="true">[ </span>ALL<span aria-hidden="true"> ]</span>
      </span>
    </TacticalButton>
  );
});
