import React from 'react';
import { TacticalChecklistItem } from '../TacticalChecklistItem';

export interface ChecklistItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  acquired?: boolean;
}

export const ChecklistItem = React.forwardRef<HTMLDivElement, ChecklistItemProps>(
  ({ label, acquired = false, className, ...props }, ref) => {
    return <TacticalChecklistItem ref={ref} label={label} acquired={acquired} className={className} {...props} />;
  },
);

ChecklistItem.displayName = 'ChecklistItem';
