import type React from 'react';
import { cn } from '../utils/cn';

export interface MultiSelectControlItem<T> {
  id: T;
  label: React.ReactNode;
  activeClassName?: string;
  inactiveClassName?: string;
  className?: string;
  disabled?: boolean;
  testId?: string;
}

export interface TacticalMultiSelectControlProps<T> {
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

export function TacticalMultiSelectControl<T>({
  items,
  selectedValues,
  onValueToggle,
  ariaLabel,
  legendLabel,
  containerClassName,
  buttonBaseClassName,
  defaultActiveClassName = 'bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] shadow-[inset_0_0_10px_rgba(var(--theme-primary-rgb),0.3)]',
  defaultInactiveClassName = 'bg-zinc-950/50 text-zinc-600 hover:bg-zinc-900 hover:text-zinc-400',
  renderPrefixItem,
}: TacticalMultiSelectControlProps<T>) {
  return (
    <fieldset className={cn('m-0 flex min-w-0 flex-col gap-2 border-none p-0', containerClassName)}>
      {legendLabel && (
        <>
          <legend className="sr-only">{ariaLabel || legendLabel}</legend>
          <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">{legendLabel}</span>
        </>
      )}
      {!legendLabel && ariaLabel && <legend className="sr-only">{ariaLabel}</legend>}

      <div className="flex flex-wrap border border-zinc-800 border-dashed sm:flex-nowrap">
        {renderPrefixItem?.()}
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
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
              title={typeof item.label === 'string' ? `${item.label} filter` : undefined}
              className={cn(
                'flex-1 px-2 py-3 font-black font-mono text-[10px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
                !isLast && 'border-zinc-800 border-r border-dashed',
                isActive ? activeClass : inactiveClass,
                buttonBaseClassName,
                item.className,
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
