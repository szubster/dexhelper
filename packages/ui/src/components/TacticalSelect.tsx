import { CornerCrosshairs, EdgeLabel, ScanlineOverlay } from '@dexhelper/ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
import React from 'react';
import { cn } from '../utils/cn';

export const selectVariants = cva(
  'tactical-select peer relative z-10 w-full cursor-pointer transition-all duration-200',
  {
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
  },
);

const crosshairsVariantStyles: Record<string, string> = {
  default: 'group-focus-within:border-[var(--theme-primary)]',
  emerald: 'group-focus-within:border-emerald-400',
  amber: 'group-focus-within:border-amber-400',
  red: 'group-focus-within:border-red-400',
  blue: 'group-focus-within:border-blue-400',
  purple: 'group-focus-within:border-purple-400',
};

const chevronVariantStyles: Record<string, string> = {
  default: 'text-zinc-500 group-hover:text-zinc-300 group-focus-within:text-[var(--theme-primary)]',
  emerald: 'text-emerald-500/70 group-hover:text-emerald-400 group-focus-within:text-emerald-300',
  amber: 'text-amber-500/70 group-hover:text-amber-400 group-focus-within:text-amber-300',
  red: 'text-red-500/70 group-hover:text-red-400 group-focus-within:text-red-300',
  blue: 'text-blue-500/70 group-hover:text-blue-400 group-focus-within:text-blue-300',
  purple: 'text-purple-500/70 group-hover:text-purple-400 group-focus-within:text-purple-300',
};

const ledStatusStyles: Record<string, string> = {
  online: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]',
  busy: 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]',
  offline: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]',
  warning: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]',
};

export interface TacticalSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {
  containerClassName?: string;
  label?: string;
  sublabel?: string;
  codeTag?: string;
  showLed?: boolean;
  ledStatus?: 'online' | 'busy' | 'offline' | 'warning';
}

export const TacticalSelect = React.forwardRef<HTMLSelectElement, TacticalSelectProps>(
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
      children,
      ...props
    },
    ref,
  ) => {
    const selectedVariant = variant || 'default';

    return (
      <div className={cn('group relative flex flex-col gap-1', containerClassName)}>
        <div className="relative w-full">
          <select
            ref={ref}
            className={cn(selectVariants({ variant }), showLed ? 'pr-12' : 'pr-8', className)}
            {...props}
          >
            {children}
          </select>

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

          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center gap-1.5 pr-3 peer-disabled:opacity-50">
            {showLed && (
              <span
                aria-hidden="true"
                className={cn('h-1.5 w-1.5 rounded-full transition-all duration-300', ledStatusStyles[ledStatus])}
              />
            )}
            <ChevronDown
              size={14}
              aria-hidden="true"
              className={cn(
                'transition-transform duration-200 group-hover:translate-y-0.5',
                chevronVariantStyles[selectedVariant] || chevronVariantStyles['default'],
              )}
            />
          </div>

          <CornerCrosshairs
            thickness={2}
            className={cn(
              'z-20 h-2 w-2 border-white/40 transition-colors',
              crosshairsVariantStyles[selectedVariant] || crosshairsVariantStyles['default'],
            )}
          />
        </div>

        {sublabel && (
          <div className="flex items-center justify-between px-1 font-mono text-[10px] tracking-wider text-zinc-500 uppercase">
            <span>{sublabel}</span>
          </div>
        )}
      </div>
    );
  },
);

TacticalSelect.displayName = 'TacticalSelect';
