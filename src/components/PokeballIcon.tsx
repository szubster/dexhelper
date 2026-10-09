import React from 'react';
import type { PokeballType } from '../store';
import { cn } from '../utils/cn';

export interface PokeballIconProps extends React.HTMLAttributes<HTMLDivElement> {
  type: PokeballType;
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

const SIZE_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'h-4 w-4 border',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-2',
};

const GLOW_CLASSES: Record<string, string> = {
  emerald: 'shadow-[0_0_10px_rgba(16,185,129,0.5)]',
  yellow: 'shadow-[0_0_10px_rgba(234,179,8,0.5)]',
  blue: 'shadow-[0_0_10px_rgba(59,130,246,0.5)]',
  pink: 'shadow-[0_0_10px_rgba(236,72,153,0.5)]',
  red: 'shadow-[0_0_10px_rgba(239,68,68,0.5)]',
};

function getBallColorGroup(type: PokeballType): 'emerald' | 'yellow' | 'blue' | 'pink' | 'red' {
  switch (type) {
    case 'safari':
    case 'friend':
    case 'lure':
      return 'emerald';
    case 'ultra':
    case 'level':
      return 'yellow';
    case 'great':
    case 'heavy':
    case 'moon':
      return 'blue';
    case 'love':
      return 'pink';
    default:
      return 'red';
  }
}

const COLOR_CLASSES: Record<'emerald' | 'yellow' | 'blue' | 'pink' | 'red', string> = {
  emerald: 'border-emerald-500 bg-emerald-500/20',
  yellow: 'border-yellow-500 bg-yellow-500/20',
  blue: 'border-blue-500 bg-blue-500/20',
  pink: 'border-pink-500 bg-pink-500/20',
  red: 'border-red-500 bg-red-500/20',
};

export const PokeballIcon = React.forwardRef<HTMLDivElement, PokeballIconProps>(function PokeballIcon(
  { type, size = 'sm', glow = false, className, ...props },
  ref,
) {
  const colorGroup = getBallColorGroup(type);
  const colorClass = COLOR_CLASSES[colorGroup];
  const glowClass = glow ? GLOW_CLASSES[colorGroup] : '';

  return (
    <div
      ref={ref}
      className={cn('shrink-0 rounded-none', SIZE_CLASSES[size], colorClass, glowClass, className)}
      {...props}
    />
  );
});
