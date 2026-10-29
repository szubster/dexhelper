import { cva, type VariantProps } from 'class-variance-authority';
import type React from 'react';
import { cn } from '../utils/cn';

import { HardwareScrews } from './HardwareScrews';

export const tacticalMultiSelectItemVariants = cva(
  'tactical-badge flex-1 border border-zinc-950 px-2 py-2.5 transition-all duration-75',
  {
    variants: {
      active: {
        true: 'bg-zinc-950 shadow-[inset_0_4px_8px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.02)] text-[var(--theme-primary)] translate-y-[2px] border-t-zinc-950 border-b-zinc-800',
        false:
          'bg-zinc-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.4)] text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300 border-t-zinc-700 border-b-zinc-950',
      },
      variant: {
        default: '',
        cyan: '',
        ghost: '',
        emerald: '',
        amber: '',
        red: '',
      },
    },
    compoundVariants: [
      {
        active: true,
        variant: 'cyan',
        className: '!border-cyan-500 bg-cyan-950 text-cyan-300 shadow-[inset_0_4px_10px_rgba(6,182,212,0.15)]',
      },
      {
        active: false,
        variant: 'cyan',
        className:
          '!border-zinc-800 bg-zinc-900 text-zinc-500 hover:!border-zinc-600 hover:bg-zinc-800 hover:text-zinc-300 shadow-[inset_0_-2px_5px_rgba(0,0,0,0.5)]',
      },
      {
        active: true,
        variant: 'ghost',
        className: 'border-[var(--theme-primary)] text-[var(--theme-primary)] bg-transparent shadow-none',
      },
      {
        active: false,
        variant: 'ghost',
        className: 'border-zinc-800 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-400 bg-transparent shadow-none',
      },
      {
        active: true,
        variant: 'emerald',
        className: 'border-emerald-500 text-emerald-500 bg-transparent shadow-none',
      },
      {
        active: false,
        variant: 'emerald',
        className: 'border-zinc-800 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-400 bg-transparent shadow-none',
      },
      {
        active: true,
        variant: 'amber',
        className: 'border-amber-500 text-amber-500 bg-transparent shadow-none',
      },
      {
        active: false,
        variant: 'amber',
        className: 'border-zinc-800 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-400 bg-transparent shadow-none',
      },
      {
        active: true,
        variant: 'red',
        className: 'border-red-500 text-red-500 bg-transparent shadow-none',
      },
      {
        active: false,
        variant: 'red',
        className: 'border-zinc-800 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-400 bg-transparent shadow-none',
      },
    ],
    defaultVariants: {
      active: false,
      variant: 'default',
    },
  },
);

export interface MultiSelectControlItem<T extends string | number | readonly string[]>
  extends Omit<VariantProps<typeof tacticalMultiSelectItemVariants>, 'active'> {
  id: T;
  label: React.ReactNode;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  testId?: string;
}

export interface TacticalMultiSelectControlProps<T extends string | number | readonly string[]> {
  items: MultiSelectControlItem<T>[];
  selectedValues: Set<T>;
  onValueToggle: (value: T) => void;
  variant?: 'default' | 'cyan' | 'ghost' | 'emerald' | 'amber' | 'red';
  ariaLabel?: string;
  legendLabel?: string;
  containerClassName?: string;
  buttonBaseClassName?: string;
  renderPrefixItem?: () => React.ReactNode;
}

export function TacticalMultiSelectControl<T extends string | number | readonly string[]>({
  items,
  selectedValues,
  onValueToggle,
  variant = 'default',
  ariaLabel,
  legendLabel,
  containerClassName,
  buttonBaseClassName,
  renderPrefixItem,
}: TacticalMultiSelectControlProps<T>) {
  return (
    <fieldset className={cn('m-0 flex min-w-0 flex-col gap-2 border-none p-0', containerClassName)}>
      {legendLabel && (
        <>
          <legend className="sr-only">{ariaLabel || legendLabel}</legend>
          <span className="tactical-text text-[9px] text-zinc-500">{legendLabel}</span>
        </>
      )}
      {!legendLabel && ariaLabel && <legend className="sr-only">{ariaLabel}</legend>}

      <div className="relative border border-zinc-700 bg-zinc-900 p-2 shadow-[inset_0_0_15px_rgba(0,0,0,0.8),0_2px_4px_rgba(0,0,0,0.5)]">
        <HardwareScrews />

        <div className="relative z-10 flex flex-wrap gap-1.5 sm:flex-nowrap">
          {renderPrefixItem?.()}
          {items.map((item) => {
            const isActive = selectedValues.has(item.id);
            const itemVariant = item.variant || variant;

            return (
              <button
                key={String(item.id)}
                type="button"
                aria-pressed={isActive}
                onClick={() => onValueToggle(item.id)}
                disabled={item.disabled}
                data-testid={item.testId}
                title={item.ariaLabel || (typeof item.label === 'string' ? `${item.label} filter` : undefined)}
                aria-label={item.ariaLabel || (typeof item.label === 'string' ? `${item.label} filter` : undefined)}
                className={cn(
                  tacticalMultiSelectItemVariants({ active: isActive, variant: itemVariant }),
                  buttonBaseClassName,
                  item.className,
                )}
              >
                <div className="flex items-center justify-center gap-1.5">
                  {isActive && (
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--theme-primary)] shadow-[0_0_5px_var(--theme-primary)]" />
                  )}
                  {item.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </fieldset>
  );
}
