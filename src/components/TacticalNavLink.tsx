import { Link } from '@tanstack/react-router';
import type React from 'react';
import { CornerCrosshairs } from './CornerCrosshairs';

interface TacticalNavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

export function TacticalNavLink({ to, icon, label }: TacticalNavLinkProps) {
  return (
    <Link
      to={to}
      activeProps={{
        className: 'bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border-b-[var(--theme-primary)]',
      }}
      inactiveProps={{
        className: 'border-b-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/5',
      }}
      className="group relative flex flex-col items-center gap-1 border-b-2 border-dashed px-8 py-3 font-black font-mono text-[10px] uppercase tracking-[0.2em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
    >
      <CornerCrosshairs className="h-1 w-1 border-current opacity-50" />
      {icon}[ {label} ]
    </Link>
  );
}
