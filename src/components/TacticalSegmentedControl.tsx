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
  defaultActiveClassName = 'bg-zinc-950 shadow-[inset_0_4px_8px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.02)] text-[var(--theme-primary)] translate-y-[2px] border-t-zinc-950 border-b-zinc-800',
  defaultInactiveClassName = 'bg-zinc-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.4)] text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300 border-t-zinc-700 border-b-zinc-950',
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

      <div className="relative border border-zinc-700 bg-zinc-900 p-2 shadow-[inset_0_0_15px_rgba(0,0,0,0.8),0_2px_4px_rgba(0,0,0,0.5)]">
        {/* Hardware structural screws */}
        <div className="absolute top-1 left-1 h-1 w-1 rounded-full bg-zinc-950/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />
        <div className="absolute top-1 right-1 h-1 w-1 rounded-full bg-zinc-950/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />
        <div className="absolute bottom-1 left-1 h-1 w-1 rounded-full bg-zinc-950/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />
        <div className="absolute right-1 bottom-1 h-1 w-1 rounded-full bg-zinc-950/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />

        <div
          ref={containerRef}
          className="relative z-10 flex flex-wrap gap-1.5 sm:flex-nowrap"
          role="radiogroup"
          tabIndex={-1}
          aria-label={ariaLabel}
          onKeyDown={handleKeyDown}
        >
          {items.map((item) => {
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
