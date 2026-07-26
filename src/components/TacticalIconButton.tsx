import React from 'react';
import { cn } from '../utils/cn';

interface TacticalIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const TacticalIconButton = React.forwardRef<HTMLButtonElement, TacticalIconButtonProps>(
  ({ className, children, type = 'button', ...props }, ref) => {
    const title = props.title || props['aria-label'];

    // Omit title from props passed to button to avoid native browser tooltip
    const { title: _title, ...restProps } = props;

    return (
      <button
        ref={ref}
        type={type}
        aria-label={title}
        className={cn('tactical-icon-button group relative', className)}
        {...restProps}
      >
        {children}
        {title && (
          <span
            aria-hidden="true"
            className="tactical-tooltip pointer-events-none absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            {title}
          </span>
        )}
      </button>
    );
  },
);

TacticalIconButton.displayName = 'TacticalIconButton';
