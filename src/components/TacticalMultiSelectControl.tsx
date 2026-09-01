import type React from 'react';
import { cn } from '../utils/cn';
import { HardwareScrews } from './HardwareScrews';

export interface MultiSelectControlItem<T extends string | number | readonly string[]> {
  id: T;
  label: React.ReactNode;
  ariaLabel?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  className?: string;
  disabled?: boolean;
  testId?: string;
}

export interface TacticalMultiSelectControlProps<T extends string | number | readonly string[]> {
  items: MultiSelectControlItem<T>[];
  selectedValues: Set<T>;
  onValueToggle: (value: T) => void;
  ariaLabel?: string;
  legendLabel?: string;
  containerClassName?: string;
  buttonBaseClassName?: string;
  defaultActiveClassName?: string;
  defaultInactiveClassName?: string;
  renderPrefixItem?: () => React.ReactNode;
}

export function TacticalMultiSelectControl<T extends string | number | readonly string[]>({
  items,
  selectedValues,
  onValueToggle,
  ariaLabel,
  legendLabel,
  containerClassName,
  buttonBaseClassName,
  defaultActiveClassName = 'bg-zinc-950 shadow-[inset_0_4px_8px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.02)] text-[var(--theme-primary)] translate-y-[2px] border-t-zinc-950 border-b-zinc-800',
  defaultInactiveClassName = 'bg-zinc-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.4)] text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300 border-t-zinc-700 border-b-zinc-950',
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

            const activeClass = item.activeClassName ?? defaultActiveClassName;
            const inactiveClass = item.inactiveClassName ?? defaultInactiveClassName;

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
                  'tactical-badge flex-1 border border-zinc-950 px-2 py-2.5 transition-all duration-75',
                  isActive ? activeClass : inactiveClass,
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
