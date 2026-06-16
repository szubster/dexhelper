import { X } from 'lucide-react';
import React from 'react';
import { cn } from '../utils/cn';
import { CornerCrosshairs } from './CornerCrosshairs';
import { LcdGrid } from './LcdGrid';

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
      <div className={cn('group relative flex flex-col', containerClassName)}>
        {/* Tactical Data Pipe */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-[3px] bg-[var(--theme-primary)]/50 transition-colors group-focus-within:bg-[var(--theme-primary)]" />
        <div className="pointer-events-none absolute top-1/2 -left-1 h-2 w-2 -translate-y-1/2 border border-[var(--theme-primary)] bg-zinc-950 transition-colors group-focus-within:bg-[var(--theme-primary)]" />

        {label && (
          <div className="pointer-events-none mb-1 pl-4 font-mono text-[9px] text-zinc-500 uppercase tracking-widest transition-colors group-focus-within:text-[var(--theme-primary)]">
            [ {label} ]
          </div>
        )}

        <div className="relative ml-3 flex items-center border border-white/20 border-dashed bg-zinc-900/50 transition-all group-focus-within:border-[var(--theme-primary)]/50 group-focus-within:bg-zinc-900/80">
          <LcdGrid className="pointer-events-none opacity-[0.05]" />

          {icon && (
            <div className="pointer-events-none relative z-10 pr-2 pl-4 text-zinc-500 transition-colors group-focus-within:text-[var(--theme-primary)]">
              {React.isValidElement<{ className?: string }>(icon)
                ? React.cloneElement(icon, {
                    className: cn(icon.props.className, 'transition-transform group-focus-within:scale-110'),
                  })
                : icon}
            </div>
          )}

          <div className="relative flex-1">
            <input
              ref={ref}
              value={value}
              className={cn(
                'relative z-10 w-full bg-transparent py-4 font-black font-mono text-white text-xs uppercase tracking-[0.2em] outline-none placeholder:text-zinc-600',
                !icon ? 'pl-4' : '',
                onClear && value ? 'pr-12' : 'pr-4',
                className,
              )}
              {...props}
            />
            {/* Blinking Terminal Cursor when empty and focused */}
            {!value && (
              <div className="pointer-events-none absolute top-1/2 left-4 h-4 w-2 -translate-y-1/2 animate-pulse bg-[var(--theme-primary)]/50 opacity-0 transition-opacity group-focus-within:opacity-100" />
            )}
          </div>

          {onClear && value && (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear input"
              title="Clear input"
              className="relative z-10 p-4 text-zinc-500 transition-all hover:text-[var(--theme-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <X size={14} />
            </button>
          )}

          <CornerCrosshairs
            thickness={2}
            className="h-2 w-2 border-white/40 transition-colors group-focus-within:border-[var(--theme-primary)]"
          />
        </div>

        {children}
      </div>
    );
  },
);

TacticalInput.displayName = 'TacticalInput';
