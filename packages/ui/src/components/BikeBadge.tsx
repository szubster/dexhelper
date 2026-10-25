import type React from 'react';
import { TacticalBadge } from './TacticalBadge';

export interface BikeBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  type: 'mach' | 'acro' | 'both';
}

export const BikeBadge: React.FC<BikeBadgeProps> = ({ type, className, ...props }) => {
  let variant: 'emerald' | 'rose' | 'blue' = 'blue';
  let label = 'BOTH BIKES';

  if (type === 'mach') {
    variant = 'emerald';
    label = 'MACH BIKE';
  } else if (type === 'acro') {
    variant = 'rose';
    label = 'ACRO BIKE';
  }

  return (
    <TacticalBadge variant={variant} className={className} {...props}>
      {label}
    </TacticalBadge>
  );
};
