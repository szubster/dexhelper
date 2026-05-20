import React from 'react';
import { cn } from '../utils/cn';

interface ScanlineOverlayProps {
  className?: string;
  opacityClass?: string;
}

export const ScanlineOverlay = React.forwardRef<HTMLDivElement, ScanlineOverlayProps>(
  ({ className, opacityClass = 'opacity-20' }, ref) => {
    return (
      <div ref={ref} className={cn('scanline-overlay pointer-events-none absolute inset-0', opacityClass, className)} />
    );
  },
);
ScanlineOverlay.displayName = 'ScanlineOverlay';
