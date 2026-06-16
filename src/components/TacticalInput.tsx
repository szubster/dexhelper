import { X } from 'lucide-react';
import React from 'react';
import { cn } from '../utils/cn';
import { CornerCrosshairs } from './CornerCrosshairs';

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
            'w-full rounded-none border border-white/20 border-dashed bg-zinc-900/50 py-4 font-black font-mono text-white text-xs uppercase tracking-[0.2em] outline-none transition-all placeholder:text-zinc-600 focus:border-[var(--theme-primary)] focus:bg-zinc-900/80',
            icon ? 'pl-14' : 'pl-4',
            onClear && value ? 'pr-12' : 'pr-4',
            className,
          )}
          {...props}
        />

        {label && (
          <div className="pointer-events-none absolute -top-2 left-4 bg-zinc-950 px-1 font-mono text-[9px] text-zinc-500 uppercase tracking-widest transition-colors group-focus-within:text-[var(--theme-primary)]">
            {label}
          </div>
        )}

        {onClear && value && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear input"
            title="Clear input"
            className="absolute top-1/2 right-4 -translate-y-1/2 p-2 text-zinc-500 transition-all hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            <X size={14} />
          </button>
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
