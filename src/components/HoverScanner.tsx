import React from 'react';
import { cn } from '../utils/cn';

interface HoverScannerProps {
  className?: string;
  colorClass?: string;
}

export const HoverScanner = React.forwardRef<HTMLDivElement, HoverScannerProps>(
  ({ className, colorClass = 'via-[var(--theme-primary)]/20' }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-transparent opacity-0 transition-opacity group-hover:animate-[scan_2s_linear_infinite] group-hover:opacity-100',
          colorClass,
          className,
        )}
      />
    );
  },
);
HoverScanner.displayName = 'HoverScanner';
