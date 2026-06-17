import React from 'react';
import { cn } from '../utils/cn';

interface TacticalIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const TacticalIconButton = React.forwardRef<HTMLButtonElement, TacticalIconButtonProps>(
  ({ className, children, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

TacticalIconButton.displayName = 'TacticalIconButton';
