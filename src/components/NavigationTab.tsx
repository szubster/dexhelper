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
        className: 'bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border-b-[var(--theme-primary)]',
      }}
      inactiveProps={{
        className: 'border-b-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/5',
      }}
      className="group focus-visible:tactical-focus relative flex flex-col items-center gap-1 border-b-2 border-dashed px-8 py-3 font-black font-mono text-[10px] uppercase tracking-[0.2em] transition-all"
    >
      <CornerCrosshairs className="h-1 w-1 border-current opacity-50" />
      <div className="mb-1">{icon}</div>[ {label} ]
    </Link>
  );
}
