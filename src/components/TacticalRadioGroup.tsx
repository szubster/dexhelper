import type React from 'react';
import { createContext, useContext } from 'react';
import { cn } from '../utils/cn';

interface RadioGroupContextType {
  value: string;
  onChange: (value: string) => void;
  variant: 'emerald' | 'blue' | 'amber' | 'primary' | 'zinc';
  layout: 'grid' | 'flex';
}

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

function useRadioGroupContext() {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('TacticalRadioGroupItem must be used within a TacticalRadioGroup');
  }
  return context;
}

export interface TacticalRadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  variant?: 'emerald' | 'blue' | 'amber' | 'primary' | 'zinc';
  layout?: 'grid' | 'flex';
  columns?: number;
  'aria-label': string;
}

export function TacticalRadioGroup({
  value,
  onChange,
  variant = 'emerald',
  layout = 'grid',
  columns = 3,
  className,
  children,
  'aria-label': ariaLabel,
  ...props
}: TacticalRadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onChange, variant, layout }}>
      <div
        role="radiogroup"
        aria-label={ariaLabel}
        className={cn(
          layout === 'flex' ? 'flex border border-zinc-800 border-dashed' : 'grid gap-2',
          layout === 'grid' && {
            'grid-cols-2': columns === 2,
            'grid-cols-3': columns === 3,
            'grid-cols-4': columns === 4,
          },
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export interface TacticalRadioGroupItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onChange'> {
  value: string;
  className?: string;
  activeClassName?: string;
}

export function TacticalRadioGroupItem({
  value,
  className,
  activeClassName,
  children,
  ...props
}: TacticalRadioGroupItemProps) {
  const { value: selectedValue, onChange, variant, layout } = useRadioGroupContext();
  const isActive = selectedValue === value;

  const baseItemClasses = cn(
    'font-black font-mono text-[9px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
    {
      'flex-1 border-zinc-800 border-l border-dashed px-2 py-2 first:border-l-0': layout === 'flex',
      'rounded-none border border-dashed px-3 py-3': layout === 'grid',
      'focus-visible:ring-emerald-500': variant === 'emerald',
      'focus-visible:ring-blue-500': variant === 'blue',
      'focus-visible:ring-amber-500': variant === 'amber',
      'focus-visible:ring-[var(--theme-primary)]': variant === 'primary',
      'focus-visible:ring-zinc-500': variant === 'zinc',
    },
  );

  const activeStyles = cn(
    {
      'border-emerald-400 bg-emerald-500 text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]': variant === 'emerald',
      'border-blue-500 bg-blue-500/20 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]': variant === 'blue',
      'border-amber-500 bg-amber-500/20 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]': variant === 'amber',
      'border-[var(--theme-primary)] bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] shadow-[0_0_10px_rgba(var(--theme-primary-rgb),0.3)]':
        variant === 'primary',
      'border-zinc-500 bg-zinc-500/20 text-zinc-400 shadow-[0_0_10px_rgba(113,113,122,0.3)]': variant === 'zinc',
    },
    activeClassName,
  );

  const inactiveStyles = cn({
    'bg-zinc-950 text-zinc-600 hover:bg-zinc-900/50 hover:text-zinc-400': layout === 'flex',
    'border-zinc-800 bg-zinc-950 text-zinc-500 hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-300':
      layout === 'grid',
  });

  return (
    // oxlint-disable jsx-a11y/prefer-tag-over-role
    // biome-ignore lint/a11y/useSemanticElements: custom radio segmented control needs proper styling
    <button
      role="radio"
      type="button"
      aria-checked={isActive}
      onClick={() => onChange(value)}
      className={cn(baseItemClasses, isActive ? activeStyles : inactiveStyles, className)}
      {...props}
    >
      {children}
    </button>
  );
}
