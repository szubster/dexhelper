import { CornerCrosshairs, ScanlineOverlay } from '@dexhelper/ui';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { useRef } from 'react';
import { cn } from '../utils/cn';
import { HardwareScrews } from './HardwareScrews';

export const tacticalSegmentedItemVariants = cva(
  'tactical-badge relative flex-1 border border-dashed border-zinc-950 px-2.5 py-2 transition-all duration-150 overflow-hidden group',
  {
    variants: {
      active: {
        true: 'bg-zinc-950 shadow-[inset_0_4px_12px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.05)] translate-y-[1px]',
        false:
          'bg-zinc-900/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_4px_rgba(0,0,0,0.4)] text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border-zinc-800',
      },
      variant: {
        default: '',
        emerald: '',
        amber: '',
        blue: '',
        red: '',
        purple: '',
      },
    },
    compoundVariants: [
      {
        active: true,
        variant: 'default',
        className: 'border-t-zinc-950 border-b-zinc-800 text-[var(--theme-primary)] border-[var(--theme-primary)]/40',
      },
      {
        active: true,
        variant: 'emerald',
        className:
          'border-t-zinc-950 border-b-emerald-950 text-emerald-400 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.25)]',
      },
      {
        active: true,
        variant: 'amber',
        className:
          'border-t-zinc-950 border-b-amber-950 text-amber-400 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.25)]',
      },
      {
        active: true,
        variant: 'blue',
        className:
          'border-t-zinc-950 border-b-blue-950 text-blue-400 border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.25)]',
      },
      {
        active: true,
        variant: 'red',
        className:
          'border-t-zinc-950 border-b-red-950 text-red-400 border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.25)]',
      },
      {
        active: true,
        variant: 'purple',
        className:
          'border-t-zinc-950 border-b-purple-950 text-purple-400 border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.25)]',
      },
    ],
    defaultVariants: {
      active: false,
      variant: 'default',
    },
  },
);

const ledVariantStyles = {
  default: 'bg-[var(--theme-primary)] shadow-[0_0_6px_var(--theme-primary)]',
  emerald: 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]',
  amber: 'bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]',
  blue: 'bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.8)]',
  red: 'bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.8)]',
  purple: 'bg-purple-400 shadow-[0_0_6px_rgba(192,132,252,0.8)]',
};

const crosshairVariantStyles = {
  default: 'border-[var(--theme-primary)]/50',
  emerald: 'border-emerald-500/50',
  amber: 'border-amber-500/50',
  blue: 'border-blue-500/50',
  red: 'border-red-500/50',
  purple: 'border-purple-500/50',
};

export interface SegmentedControlItem<T extends string | number | readonly string[]>
  extends Omit<VariantProps<typeof tacticalSegmentedItemVariants>, 'active'> {
  id: T;
  label: React.ReactNode;
  sublabel?: React.ReactNode;
  ariaLabel?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  className?: string;
  disabled?: boolean;
  testId?: string;
  codeTag?: string;
}

export interface TacticalSegmentedControlProps<T extends string | number | readonly string[]> {
  items: SegmentedControlItem<T>[];
  selectedValue: T;
  onValueChange: (value: T) => void;
  variant?: 'default' | 'emerald' | 'amber' | 'blue' | 'red' | 'purple';
  ariaLabel?: string;
  legendLabel?: string;
  containerClassName?: string;
  buttonBaseClassName?: string;
  /** @deprecated Use CVA variants instead of overriding active/inactive classes directly */
  defaultActiveClassName?: string;
  /** @deprecated Use CVA variants instead of overriding active/inactive classes directly */
  defaultInactiveClassName?: string;
}

// ⚡ Bolt: Wrapped in React.memo to eliminate redundant re-renders when parent state updates without props changing.
export const TacticalSegmentedControl = React.memo(function TacticalSegmentedControl<
  T extends string | number | readonly string[],
>({
  items,
  selectedValue,
  onValueChange,
  variant = 'default',
  ariaLabel,
  legendLabel,
  containerClassName,
  buttonBaseClassName,
  defaultActiveClassName,
  defaultInactiveClassName,
}: TacticalSegmentedControlProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    // Find all non-disabled radio buttons
    const buttonsList = containerRef.current.querySelectorAll<HTMLButtonElement>(
      'button[role="radio"]:not([disabled])',
    );
    const buttons = Array.from(buttonsList);
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
          <div className="flex items-center justify-between px-0.5">
            <span className="tactical-text font-bold text-[9px] text-zinc-500 tracking-widest">{legendLabel}</span>
            <span className="font-mono text-[8px] text-zinc-600">[CH.SEL]</span>
          </div>
        </>
      )}
      {!legendLabel && ariaLabel && <legend className="sr-only">{ariaLabel}</legend>}

      <div className="relative border border-zinc-800 border-dashed bg-zinc-950/90 p-2 shadow-[inset_0_0_20px_rgba(0,0,0,0.9),0_2px_8px_rgba(0,0,0,0.6)]">
        <HardwareScrews />
        <CornerCrosshairs className="h-1.5 w-1.5 border-zinc-700/60" />

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
            const itemVariant = item.variant || variant;

            const activeClass = item.activeClassName ?? defaultActiveClassName;
            const inactiveClass = item.inactiveClassName ?? defaultInactiveClassName;

            const customOverrideClass = isActive ? activeClass : inactiveClass;

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
                  tacticalSegmentedItemVariants({ active: isActive, variant: itemVariant }),
                  customOverrideClass,
                  buttonBaseClassName,
                  item.className,
                )}
              >
                {isActive && (
                  <>
                    <ScanlineOverlay opacityClass="opacity-15" />
                    <CornerCrosshairs
                      className={cn('h-1 w-1', crosshairVariantStyles[itemVariant] || crosshairVariantStyles.default)}
                    />
                  </>
                )}

                <div className="relative z-10 flex w-full flex-col items-center justify-center gap-0.5">
                  <div className="flex items-center justify-center gap-1.5">
                    {isActive ? (
                      <div
                        className={cn(
                          'h-1.5 w-1.5 shrink-0 animate-pulse rounded-full',
                          ledVariantStyles[itemVariant] || ledVariantStyles.default,
                        )}
                      />
                    ) : (
                      <div className="h-1 w-1 shrink-0 rounded-full bg-zinc-700" />
                    )}
                    <span className="whitespace-nowrap font-mono">{item.label}</span>
                    {item.codeTag && (
                      <span className="font-mono text-[8px] text-zinc-500 uppercase">[{item.codeTag}]</span>
                    )}
                  </div>
                  {item.sublabel && (
                    <span className="font-mono text-[8px] text-zinc-500 tracking-normal">{item.sublabel}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </fieldset>
  );
}) as <T extends string | number | readonly string[]>(props: TacticalSegmentedControlProps<T>) => React.ReactElement;
