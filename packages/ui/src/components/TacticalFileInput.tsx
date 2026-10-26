import React from 'react';
import { cn } from '../utils/cn';

interface TacticalFileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'> {
  className?: string;
}

export const TacticalFileInput = React.forwardRef<HTMLInputElement, TacticalFileInputProps>(
  ({ className = 'sr-only', accept = '.sav', tabIndex = -1, ...props }, ref) => {
    return <input ref={ref} type="file" accept={accept} tabIndex={tabIndex} className={cn(className)} {...props} />;
  },
);

TacticalFileInput.displayName = 'TacticalFileInput';
