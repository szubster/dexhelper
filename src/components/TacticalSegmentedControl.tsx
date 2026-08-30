import type React from 'react';
import { useRef } from 'react';
import { cn } from '../utils/cn';

interface SegmentedControlItem<T extends string | number | readonly string[]> {
  id: T;
  label: React.ReactNode;
  ariaLabel?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  className?: string;
  disabled?: boolean;
  testId?: string;
}

interface TacticalSegmentedControlProps<T extends string | number | readonly string[]> {
  items: SegmentedControlItem<T>[];
  selectedValue: T;
  onValueChange: (value: T) => void;
  ariaLabel?: string;
  legendLabel?: string;
  containerClassName?: string;
  buttonBaseClassName?: string;
  defaultActiveClassName?: string;
  defaultInactiveClassName?: string;
}

export function TacticalSegmentedControl<T extends string | number | readonly string[]>({
  items,
  selectedValue,
  onValueChange,
  ariaLabel,
  legendLabel,
  containerClassName,
  buttonBaseClassName,
  defaultActiveClassName = 'bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] shadow-[inset_0_0_10px_rgba(var(--theme-primary-rgb),0.3)]',
  defaultInactiveClassName = 'bg-zinc-950/50 text-zinc-600 hover:bg-zinc-900 hover:text-zinc-400',
}: TacticalSegmentedControlProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    // Find all non-disabled radio buttons
    const buttons = Array.from(
      containerRef.current.querySelectorAll<HTMLButtonElement>('button[role="radio"]:not([disabled])'),
    );
    if (buttons.length === 0) return;

    const currentIndex =
      document.activeElement instanceof HTMLButtonElement ? buttons.indexOf(document.activeElement) : -1;

    let nextIndex = currentIndex;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % buttons.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = currentIndex === -1 ? buttons.length - 1 : (currentIndex - 1 + buttons.length) % buttons.length;
    }

    if (nextIndex !== currentIndex && nextIndex >= 0 && nextIndex < buttons.length) {
      const nextButton = buttons[nextIndex];
      if (nextButton) {
        nextButton.focus();
        nextButton.click();
      }
    }
  };

  return (
    <fieldset className={cn('m-0 flex min-w-0 flex-col gap-2 border-none p-0', containerClassName)}>
      {legendLabel && (
        <>
          <legend className="sr-only">{ariaLabel || legendLabel}</legend>
          <span className="tactical-text text-[9px] text-zinc-500">{legendLabel}</span>
        </>
      )}
      {!legendLabel && ariaLabel && <legend className="sr-only">{ariaLabel}</legend>}

      <div
        ref={containerRef}
        className="flex flex-wrap border border-zinc-800 border-dashed sm:flex-nowrap"
        role="radiogroup"
        tabIndex={-1}
        aria-label={ariaLabel}
        onKeyDown={handleKeyDown}
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const isActive = selectedValue === item.id;

          const activeClass = item.activeClassName ?? defaultActiveClassName;
          const inactiveClass = item.inactiveClassName ?? defaultInactiveClassName;

          return (
            // oxlint-disable jsx-a11y/prefer-tag-over-role
            // biome-ignore lint/a11y/useSemanticElements: segmented control needs proper styling
            <button
              key={String(item.id)}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={item.ariaLabel || (typeof item.label === 'string' ? item.label : undefined)}
              title={item.ariaLabel || (typeof item.label === 'string' ? item.label : undefined)}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onValueChange(item.id)}
              disabled={item.disabled}
              data-testid={item.testId}
              className={cn(
                'tactical-badge flex-1 border-0 px-2 py-3',
                !isLast && 'border-r border-r-zinc-800 border-dashed',
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
