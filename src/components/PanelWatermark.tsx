import type React from 'react';
import { cn } from '../utils/cn';

interface PanelWatermarkProps {
  icon: React.ReactNode;
  className?: string;
}

export function PanelWatermark({ icon, className }: PanelWatermarkProps) {
  return (
    <div className={cn('absolute top-0 right-0 p-4 opacity-5 transition-transform duration-500', className)}>
      {icon}
    </div>
  );
}
