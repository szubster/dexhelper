import React from 'react';
import { cn } from '../utils/cn';

interface LcdGridProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  size?: number;
}

export const LcdGrid = React.forwardRef<HTMLDivElement, LcdGridProps>(
  ({ color = 'white', size = 4, className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('pointer-events-none absolute inset-0', className)}
        style={{
          backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
          backgroundSize: `${size}px ${size}px`,
          ...style,
        }}
        {...props}
      />
    );
  },
);

LcdGrid.displayName = 'LcdGrid';
