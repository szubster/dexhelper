import React from 'react';
import { cn } from '../utils/cn';

export interface TacticalBlockHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: 'primary' | 'red' | 'purple' | 'blue' | 'pink' | 'amber';
  icon?: React.ReactNode;
  trackingLabel: React.ReactNode;
  title: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export function TacticalBlockHeader({
  variant = 'primary',
  icon,
  trackingLabel,
  title,
  trailingIcon,
  className,
  ...props
}: TacticalBlockHeaderProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'red':
        return {
          wrapper: 'border-red-500/20',
          text: 'group-hover:text-red-400',
          label: 'text-red-500',
          trailingIconWrapper: 'border-red-500/20 bg-red-500/5 shadow-[inset_0_0_10px_rgba(239,68,68,0.1)]',
          trailingIcon: 'text-red-500/60 group-hover:text-red-500',
        };
      case 'purple':
        return {
          wrapper: 'border-purple-500/20',
          text: 'group-hover:text-purple-400',
          label: 'text-purple-400',
          trailingIconWrapper: 'border-purple-500/20 bg-purple-500/5 shadow-[inset_0_0_10px_rgba(168,85,247,0.1)]',
          trailingIcon: 'text-purple-500/60 group-hover:text-purple-500',
        };
      case 'blue':
        return {
          wrapper: 'border-blue-500/20',
          text: 'group-hover:text-blue-400',
          label: 'text-blue-400',
          trailingIconWrapper: 'border-blue-500/20 bg-blue-500/5 shadow-[inset_0_0_10px_rgba(59,130,246,0.1)]',
          trailingIcon: 'text-blue-500/60 group-hover:text-blue-500',
        };
      case 'pink':
        return {
          wrapper: 'border-pink-500/20',
          text: 'group-hover:text-pink-400',
          label: 'text-pink-400',
          trailingIconWrapper: 'border-pink-500/20 bg-pink-500/5 shadow-[inset_0_0_10px_rgba(236,72,153,0.1)]',
          trailingIcon: 'text-pink-500/60 group-hover:text-pink-500',
        };
      case 'amber':
        return {
          wrapper: 'border-amber-500/20',
          text: 'group-hover:text-amber-400',
          label: 'text-amber-500',
          trailingIconWrapper: 'border-amber-500/20 bg-amber-500/5 shadow-[inset_0_0_10px_rgba(245,158,11,0.1)]',
          trailingIcon: 'text-amber-500/60 group-hover:text-amber-500',
        };
      default:
        return {
          wrapper: 'border-[var(--theme-primary)]/20',
          text: 'group-hover:text-[var(--theme-primary)]',
          label: 'text-[var(--theme-primary)]',
          trailingIconWrapper:
            'border-[var(--theme-primary)]/20 bg-[var(--theme-primary)]/5 shadow-[inset_0_0_10px_rgba(var(--theme-primary-rgb),0.1)]',
          trailingIcon: 'text-[var(--theme-primary)]/60 group-hover:text-[var(--theme-primary)]',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div
      className={cn('flex items-start justify-between border-b border-dashed pb-3', styles.wrapper, className)}
      {...props}
    >
      <div className="flex flex-col gap-1">
        <span className={cn('flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest', styles.label)}>
          {icon}
          {trackingLabel}
        </span>
        <span
          className={cn(
            'font-black font-display text-white text-xl uppercase tracking-tight drop-shadow-[0_0_5px_rgba(255,255,255,0.1)] transition-colors',
            styles.text,
          )}
        >
          {title}
        </span>
      </div>
      {trailingIcon && (
        <div className={cn('flex h-8 w-8 items-center justify-center rounded-none border', styles.trailingIconWrapper)}>
          {/* We'll pass the icon with the correct classes, or clone it to inject the classes */}
          {React.isValidElement<{ className?: string }>(trailingIcon)
            ? React.cloneElement(trailingIcon, {
                className: cn(styles.trailingIcon, 'transition-colors', trailingIcon.props.className),
              })
            : trailingIcon}
        </div>
      )}
    </div>
  );
}
