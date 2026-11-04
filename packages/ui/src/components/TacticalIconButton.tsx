import React from 'react';
import { cn } from '../utils/cn';

interface TacticalIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const TacticalIconButton = React.forwardRef<HTMLButtonElement, TacticalIconButtonProps>(
  ({ className, children, type = 'button', ...props }, ref) => {
    const title = props.title || props['aria-label'];

    return (
      <button
        ref={ref}
        type={type}
        aria-label={title}
        className={cn('tactical-icon-button group focus-visible:tactical-focus relative', className)}
        {...props}
      >
        {children}
        {title && (
          <span aria-hidden="true" className="tactical-tooltip">
            {title}
          </span>
        )}
      </button>
    );
  },
);

TacticalIconButton.displayName = 'TacticalIconButton';
