import React from 'react';
import { cn } from '../utils/cn';

interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'title'> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  colorClass?: string;
}

export const SectionHeader = React.forwardRef<HTMLHeadingElement, SectionHeaderProps>(
  ({ icon, title, colorClass, className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(
          'flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.3em]',
          colorClass || 'text-zinc-500',
          className,
        )}
        {...props}
      >
        {icon}
        {title}
      </h3>
    );
  },
);
SectionHeader.displayName = 'SectionHeader';
