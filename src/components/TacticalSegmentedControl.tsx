import type React from 'react';
import { cn } from '../utils/cn';

export interface SegmentedControlOption<T extends string | number> {
  id: T;
  label: React.ReactNode;
  activeClassName?: string;
  inactiveClassName?: string;
  testId?: string;
}

export interface TacticalSegmentedControlProps<T extends string | number> {
  options: SegmentedControlOption<T>[];
  value: T | T[] | Set<T>;
  onChange: (value: T) => void;
  isMulti?: boolean;
  className?: string;
  buttonClassName?: string;
  defaultActiveClassName?: string;
  defaultInactiveClassName?: string;
  ariaLabel?: string;
}

export function TacticalSegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  isMulti = false,
  className,
  buttonClassName,
  defaultActiveClassName = 'bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] shadow-[inset_0_0_10px_rgba(var(--theme-primary-rgb),0.3)]',
  defaultInactiveClassName = 'bg-zinc-950/50 text-zinc-600 hover:bg-zinc-900 hover:text-zinc-400',
  ariaLabel,
}: TacticalSegmentedControlProps<T>) {
  const isSelected = (id: T) => {
    if (value instanceof Set) return value.has(id);
    if (Array.isArray(value)) return value.includes(id);
    return value === id;
  };

  return (
    <div
      className={cn('flex flex-wrap border border-zinc-800 border-dashed sm:flex-nowrap', className)}
      role={isMulti ? 'group' : 'radiogroup'}
      {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
    >
      {options.map((opt, idx) => {
        const isLast = idx === options.length - 1;
        const active = isSelected(opt.id);

        return (
          <button
            key={String(opt.id)}
            type="button"
            role={isMulti ? undefined : 'radio'}
            {...(isMulti ? { 'aria-pressed': active } : { 'aria-checked': active })}
            data-testid={opt.testId}
            onClick={() => onChange(opt.id)}
            className={cn(
              'flex-1 px-2 py-3 font-black font-mono text-[10px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
              !isLast ? 'border-zinc-800 border-r border-dashed' : '',
              active
                ? opt.activeClassName || defaultActiveClassName
                : opt.inactiveClassName || defaultInactiveClassName,
              buttonClassName,
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
