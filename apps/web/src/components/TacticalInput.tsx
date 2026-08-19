import { X } from 'lucide-react';
import React from 'react';
import { cn } from '../utils/cn';
import { CornerCrosshairs } from './CornerCrosshairs';
import { EdgeLabel } from './EdgeLabel';
import { TacticalIconButton } from './TacticalIconButton';

interface TacticalInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  label?: string;
  icon?: React.ReactNode;
  onClear?: () => void;
  containerClassName?: string;
  value?: string;
  children?: React.ReactNode;
}

export const TacticalInput = React.forwardRef<HTMLInputElement, TacticalInputProps>(
  ({ className, containerClassName, label, icon, onClear, value, children, ...props }, ref) => {
    return (
      <div className={cn('group relative', containerClassName)}>
        {icon && (
          <div className="absolute top-1/2 left-4 flex -translate-y-1/2 items-center justify-center bg-[var(--theme-primary)]/10 p-1.5 text-[var(--theme-primary)] transition-all duration-300 group-focus-within:bg-[var(--theme-primary)] group-focus-within:text-zinc-950">
            {React.isValidElement<{ className?: string }>(icon)
              ? React.cloneElement(icon, {
                  className: cn(icon.props.className, 'transition-transform group-focus-within:scale-110'),
                })
              : icon}
          </div>
        )}

        <input
          ref={ref}
          value={value}
          className={cn(
            'tactical-input w-full',
            icon ? 'pl-14' : 'pl-4',
            onClear && value ? 'pr-12' : 'pr-4',
            className,
          )}
          {...props}
        />

        {label && (
          <EdgeLabel className="pointer-events-none -top-2 left-4 transition-colors group-focus-within:text-[var(--theme-primary)]">
            {label}
          </EdgeLabel>
        )}

        {onClear && value && (
          <TacticalIconButton
            onClick={onClear}
            aria-label="Clear input"
            title="Clear input"
            className="absolute top-1/2 right-4 -translate-y-1/2 p-2 text-zinc-500 hover:text-white"
          >
            <X size={14} />
          </TacticalIconButton>
        )}

        <CornerCrosshairs
          thickness={2}
          className="h-2 w-2 border-white/40 transition-colors group-focus-within:border-[var(--theme-primary)]"
        />

        {children}
      </div>
    );
  },
);

TacticalInput.displayName = 'TacticalInput';
