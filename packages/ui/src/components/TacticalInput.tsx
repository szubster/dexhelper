import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import React from 'react';
import { cn } from '../utils/cn';
import { CornerCrosshairs } from './CornerCrosshairs';
import { EdgeLabel } from './EdgeLabel';
import { ScanlineOverlay } from './ScanlineOverlay';
import { TacticalIconButton } from './TacticalIconButton';

export const inputVariants = cva('tactical-input w-full relative z-10 transition-all duration-200', {
  variants: {
    variant: {
      default: 'focus:border-[var(--theme-primary)] focus:bg-zinc-900/80',
      emerald:
        'border-emerald-500/40 text-emerald-100 focus:border-emerald-500 focus:bg-emerald-950/40 focus:ring-1 focus:ring-emerald-500/30',
      amber:
        'border-amber-500/40 text-amber-100 focus:border-amber-500 focus:bg-amber-950/40 focus:ring-1 focus:ring-amber-500/30',
      red: 'border-red-500/40 text-red-100 focus:border-red-500 focus:bg-red-950/40 focus:ring-1 focus:ring-red-500/30',
      blue: 'border-blue-500/40 text-blue-100 focus:border-blue-500 focus:bg-blue-950/40 focus:ring-1 focus:ring-blue-500/30',
      purple:
        'border-purple-500/40 text-purple-100 focus:border-purple-500 focus:bg-purple-950/40 focus:ring-1 focus:ring-purple-500/30',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const crosshairsVariantStyles: Record<string, string> = {
  default: 'group-focus-within:border-[var(--theme-primary)]',
  emerald: 'group-focus-within:border-emerald-400',
  amber: 'group-focus-within:border-amber-400',
  red: 'group-focus-within:border-red-400',
  blue: 'group-focus-within:border-blue-400',
  purple: 'group-focus-within:border-purple-400',
};

const iconVariantStyles: Record<string, string> = {
  default:
    'bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] group-focus-within:bg-[var(--theme-primary)] group-focus-within:text-zinc-950',
  emerald: 'bg-emerald-500/10 text-emerald-400 group-focus-within:bg-emerald-500 group-focus-within:text-zinc-950',
  amber: 'bg-amber-500/10 text-amber-400 group-focus-within:bg-amber-500 group-focus-within:text-zinc-950',
  red: 'bg-red-500/10 text-red-400 group-focus-within:bg-red-500 group-focus-within:text-zinc-950',
  blue: 'bg-blue-500/10 text-blue-400 group-focus-within:bg-blue-500 group-focus-within:text-zinc-950',
  purple: 'bg-purple-500/10 text-purple-400 group-focus-within:bg-purple-500 group-focus-within:text-zinc-950',
};

const ledStatusStyles: Record<string, string> = {
  online: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]',
  busy: 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]',
  offline: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]',
  warning: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]',
};

export interface TacticalInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  sublabel?: string;
  codeTag?: string;
  showLed?: boolean;
  ledStatus?: 'online' | 'busy' | 'offline' | 'warning';
  icon?: React.ReactNode;
  onClear?: () => void;
  containerClassName?: string;
  value?: string;
  children?: React.ReactNode;
}

export const TacticalInput = React.forwardRef<HTMLInputElement, TacticalInputProps>(
  (
    {
      className,
      variant = 'default',
      containerClassName,
      label,
      sublabel,
      codeTag,
      showLed,
      ledStatus = 'online',
      icon,
      onClear,
      value,
      children,
      ...props
    },
    ref,
  ) => {
    const selectedVariant = variant || 'default';
    const hasRightElements = Boolean((onClear && value) || showLed);

    return (
      <div className={cn('group relative flex flex-col gap-1', containerClassName)}>
        <div className="relative w-full">
          {icon && (
            <div
              aria-hidden="true"
              className={cn(
                'absolute top-1/2 left-4 z-20 flex -translate-y-1/2 items-center justify-center p-1.5 transition-all duration-300',
                iconVariantStyles[selectedVariant] || iconVariantStyles['default'],
              )}
            >
              {React.isValidElement<{ className?: string }>(icon)
                ? React.cloneElement(icon, {
                    className: cn(
                      icon.props.className,
                      'transition-transform duration-300 group-focus-within:scale-110',
                    ),
                  })
                : icon}
            </div>
          )}

          <input
            ref={ref}
            value={value}
            className={cn(
              inputVariants({ variant }),
              icon ? 'pl-14' : 'pl-4',
              hasRightElements ? 'pr-16' : 'pr-4',
              className,
            )}
            {...props}
          />

          <ScanlineOverlay opacityClass="opacity-0 group-hover:opacity-10 group-focus-within:opacity-20 transition-opacity duration-300 pointer-events-none" />

          {label && (
            <EdgeLabel className="pointer-events-none -top-2 left-4 z-20 transition-colors group-focus-within:text-[var(--theme-primary)]">
              {label}
            </EdgeLabel>
          )}

          {codeTag && (
            <EdgeLabel className="pointer-events-none -top-2 right-4 z-20 transition-colors group-focus-within:text-[var(--theme-primary)]">
              {codeTag}
            </EdgeLabel>
          )}

          <div className="absolute top-1/2 right-4 z-20 flex -translate-y-1/2 items-center gap-2">
            {showLed && (
              <span
                aria-hidden="true"
                className={cn('h-1.5 w-1.5 rounded-full transition-all duration-300', ledStatusStyles[ledStatus])}
              />
            )}

            {onClear && value && (
              <TacticalIconButton
                onClick={onClear}
                aria-label="Clear input"
                title="Clear input"
                className="p-1 text-zinc-500 hover:text-white"
              >
                <X size={14} />
              </TacticalIconButton>
            )}
          </div>

          <CornerCrosshairs
            thickness={2}
            className={cn(
              'z-20 h-2 w-2 border-white/40 transition-colors',
              crosshairsVariantStyles[selectedVariant] || crosshairsVariantStyles['default'],
            )}
          />

          {children}
        </div>

        {sublabel && (
          <div className="flex items-center justify-between px-1 font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
            <span>{sublabel}</span>
          </div>
        )}
      </div>
    );
  },
);

TacticalInput.displayName = 'TacticalInput';
