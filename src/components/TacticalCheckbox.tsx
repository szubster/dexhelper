import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '../utils/cn';

export const checkboxVariants = cva(
  'h-4 w-4 cursor-pointer rounded-none border border-dashed border-zinc-700 bg-transparent accent-[var(--theme-primary)] transition-colors focus:border-[var(--theme-primary)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
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
  ({ className, variant = 'default', containerClassName, label, labelClassName, id: customId, ...props }, ref) => {
    const defaultId = React.useId();
    const inputId = customId || defaultId;

    const inputNode = (
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        className={cn(checkboxVariants({ variant }), className)}
        {...props}
      />
    );

    if (!label) {
      return inputNode;
    }

    return (
      <label
        htmlFor={inputId}
        className={cn(
          'flex cursor-pointer items-center gap-2 select-none',
          props.disabled && 'cursor-not-allowed opacity-50',
          containerClassName,
        )}
      >
        {inputNode}
        <span className={cn('tactical-text', labelClassName)}>{label}</span>
      </label>
    );
  },
);

TacticalCheckbox.displayName = 'TacticalCheckbox';
