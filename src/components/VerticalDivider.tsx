import type React from 'react';
import { cn } from '../utils/cn';

interface VerticalDividerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function VerticalDivider({ className, ...props }: VerticalDividerProps) {
  return <div className={cn('w-[1px] border-zinc-800 border-r border-dashed bg-zinc-800', className)} {...props} />;
}
