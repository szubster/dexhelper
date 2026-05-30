import React from 'react';
import { cn } from '../utils/cn';

interface SegmentedControlProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  ariaLabel?: string;
}

export function SegmentedControl({ children, ariaLabel, className, ...props }: SegmentedControlProps) {
  // If it's a grid, don't apply the flex border logic
  const isGrid = className?.includes('grid');

  return (
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: dynamic role maps to valid aria-label
    <div
      className={cn(isGrid ? '' : 'flex border border-zinc-800 border-dashed', className)}
      role={ariaLabel ? 'radiogroup' : undefined}
      aria-label={ariaLabel}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        const isFirst = index === 0;

        // biome-ignore lint/suspicious/noExplicitAny: required for cloneElement
        const childElement = child as React.ReactElement<any>;
        return React.cloneElement(childElement, {
          className: cn(childElement.props.className, !isGrid && !isFirst && 'border-zinc-800 border-l border-dashed'),
        });
      })}
    </div>
  );
}

interface SegmentedControlButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  activeClassName?: string;
  inactiveClassName?: string;
  isRadio?: boolean;
}

export const SegmentedControlButton = React.forwardRef<HTMLButtonElement, SegmentedControlButtonProps>(
  ({ className, isActive, activeClassName, inactiveClassName, isRadio = true, children, ...props }, ref) => {
    return (
      // oxlint-disable jsx-a11y/prefer-tag-over-role
      // biome-ignore lint/a11y/useAriaPropsSupportedByRole: dynamic roles map to valid aria props
      <button
        ref={ref}
        type="button"
        role={isRadio ? 'radio' : undefined}
        aria-checked={isRadio ? isActive : undefined}
        aria-pressed={!isRadio ? isActive : undefined}
        className={cn(
          'flex-1 rounded-none px-2 py-2 font-black font-mono text-[9px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
          isActive
            ? activeClassName ||
                'bg-emerald-500 text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.4)] focus-visible:ring-emerald-500'
            : inactiveClassName ||
                'bg-zinc-950 text-zinc-600 hover:bg-zinc-900/50 hover:text-zinc-400 focus-visible:ring-emerald-500',
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
SegmentedControlButton.displayName = 'SegmentedControlButton';
