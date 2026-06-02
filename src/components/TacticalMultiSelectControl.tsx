import type React from 'react';
import { cn } from '../utils/cn';

export interface MultiSelectControlItem {
  id: string;
  label: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  activeClassName?: string;
  inactiveClassName?: string;
  className?: string;
  disabled?: boolean;
  testId?: string;
  title?: string;
  ariaLabel?: string;
}

export interface TacticalMultiSelectControlProps {
  items: MultiSelectControlItem[];
  ariaLabel?: string;
  legend?: React.ReactNode;
  containerClassName?: string;
  wrapperClassName?: string;
  buttonBaseClassName?: string;
  defaultActiveClassName?: string;
  defaultInactiveClassName?: string;
  hideSeparators?: boolean;
}

export function TacticalMultiSelectControl({
  items,
  ariaLabel,
  legend,
  containerClassName,
  wrapperClassName,
  buttonBaseClassName,
  defaultActiveClassName = 'bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] shadow-[inset_0_0_10px_rgba(var(--theme-primary-rgb),0.3)]',
  defaultInactiveClassName = 'bg-zinc-950/50 text-zinc-600 hover:bg-zinc-900 hover:text-zinc-400',
  hideSeparators = false,
}: TacticalMultiSelectControlProps) {
  return (
    <fieldset className={cn('m-0 flex min-w-0 flex-col gap-2 border-none p-0', containerClassName)}>
      {legend && typeof legend === 'string' ? (
        <>
          <legend className="sr-only">{ariaLabel || legend}</legend>
          <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">{legend}</span>
        </>
      ) : legend ? (
        <>
          <legend className="sr-only">{ariaLabel}</legend>
          {legend}
        </>
      ) : ariaLabel ? (
        <legend className="sr-only">{ariaLabel}</legend>
      ) : null}

      <div
        className={cn(
          !wrapperClassName && 'flex flex-wrap border border-zinc-800 border-dashed sm:flex-nowrap',
          wrapperClassName,
        )}
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const isActive = item.isActive;

          const activeClass = item.activeClassName ?? defaultActiveClassName;
          const inactiveClass = item.inactiveClassName ?? defaultInactiveClassName;

          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={isActive}
              aria-label={item.ariaLabel}
              title={item.title}
              onClick={item.onClick}
              disabled={item.disabled}
              data-testid={item.testId}
              className={cn(
                'px-2 py-3 font-black font-mono text-[10px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
                !hideSeparators && !wrapperClassName && 'flex-1',
                !hideSeparators && !isLast && 'border-zinc-800 border-r border-dashed',
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
