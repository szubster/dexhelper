import React from 'react';
import { cn } from '../utils/cn';

interface TacticalIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const TacticalIconButton = React.forwardRef<HTMLButtonElement, TacticalIconButtonProps>(
  ({ className, children, type = 'button', ...props }, ref) => {
    return (
      <button ref={ref} type={type} className={cn('focus-visible:tactical-focus transition-all', className)} {...props}>
        {children}
      </button>
    );
  },
);

TacticalIconButton.displayName = 'TacticalIconButton';
