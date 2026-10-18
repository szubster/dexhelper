import { cva, type VariantProps } from 'class-variance-authority';
import { Check } from 'lucide-react';
import React, { useId } from 'react';
import { cn } from '../utils/cn';

export const checkboxVariants = cva(
  'peer h-4 w-4 shrink-0 appearance-none rounded-none border border-zinc-800 border-dashed bg-zinc-950/80 transition-all focus-visible:tactical-focus checked:border-[var(--theme-primary)] checked:bg-[var(--theme-primary)]/20 disabled:cursor-not-allowed disabled:opacity-50 hover:border-zinc-600',
  {
    variants: {
      variant: {
        default: '',
        primary: 'checked:border-[var(--theme-primary)] checked:bg-[var(--theme-primary)]/20',
        emerald: 'checked:border-emerald-500 checked:bg-emerald-500/20',
        amber: 'checked:border-amber-500 checked:bg-amber-500/20',
        red: 'checked:border-red-500 checked:bg-red-500/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface TacticalCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>,
    VariantProps<typeof checkboxVariants> {
  label?: React.ReactNode;
  containerClassName?: string;
  labelClassName?: string;
}

export const TacticalCheckbox = React.forwardRef<HTMLInputElement, TacticalCheckboxProps>(
  (
    {
      className,
      variant = 'default',
      label,
      containerClassName,
      labelClassName,
      id: customId,
      checked,
      disabled,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = customId || generatedId;

    const checkboxElement = (
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          ref={ref}
          id={id}
          checked={checked}
          disabled={disabled}
          className={cn(checkboxVariants({ variant }), className)}
          {...props}
        />
        <Check
          size={12}
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute text-[var(--theme-primary)] opacity-0 transition-opacity peer-checked:opacity-100',
            variant === 'emerald' && 'text-emerald-400',
            variant === 'amber' && 'text-amber-400',
            variant === 'red' && 'text-red-400',
          )}
        />
      </div>
    );

    if (!label) {
      return checkboxElement;
    }

    return (
      <label
        htmlFor={id}
        className={cn(
          'group flex cursor-pointer select-none items-center gap-2 font-mono text-xs',
          disabled && 'cursor-not-allowed opacity-50',
          containerClassName,
        )}
      >
        {checkboxElement}
        <span className={cn('tactical-text text-zinc-300 group-hover:text-white', labelClassName)}>{label}</span>
      </label>
    );
  },
);

TacticalCheckbox.displayName = 'TacticalCheckbox';
