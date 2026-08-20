import { Link, type LinkProps } from '@tanstack/react-router';
import type React from 'react';
import { CornerCrosshairs } from './CornerCrosshairs';

interface NavigationTabProps extends Omit<LinkProps, 'activeProps' | 'inactiveProps' | 'className'> {
  icon: React.ReactNode;
  label: string;
}

export function NavigationTab({ icon, label, ...props }: NavigationTabProps) {
  return (
    <Link
      {...props}
      activeProps={{
        className:
          'bg-[var(--theme-primary)] text-black border-[var(--theme-primary)] shadow-[inset_0_4px_10px_rgba(0,0,0,0.4)]',
        style: {
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 2px, transparent 2px, transparent 4px)',
        },
      }}
      inactiveProps={{
        className: 'border-zinc-800 text-zinc-500 bg-black/60 hover:text-zinc-300 hover:bg-zinc-900',
      }}
      className="group focus-visible:tactical-focus relative flex flex-col items-center gap-1 border-t border-r border-l border-dashed px-8 py-3 font-black font-mono text-[10px] uppercase tracking-[0.2em] transition-all"
    >
      <CornerCrosshairs className="h-1 w-1 border-current opacity-50" />
      <div className="mb-1">{icon}</div>[ {label} ]
    </Link>
  );
}
