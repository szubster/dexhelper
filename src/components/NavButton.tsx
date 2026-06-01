import { Link } from '@tanstack/react-router';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../utils/cn';

interface NavButtonProps {
  ariaLabel: string;
  to?: string;
  isActive: boolean;
  onClick?: () => void;
  icon: LucideIcon;
  label: string;
  activeLabel: string;
}

export function NavButton({ to, isActive, onClick, icon: Icon, label, activeLabel, ariaLabel }: NavButtonProps) {
  const content = (
    <>
      {isActive && <div className="lcd-flicker absolute inset-0 bg-[var(--theme-primary)]/5" />}
      <div className={cn('transition-transform', isActive ? 'animate-pulse' : 'active:scale-90')}>
        <Icon
          size={20}
          strokeWidth={isActive ? 2.5 : 2}
          className={cn(isActive && 'drop-shadow-[0_0_10px_rgba(var(--theme-primary-rgb),1)]')}
        />
      </div>
      <span className="font-bold font-mono text-[9px] uppercase tracking-[0.2em]">
        {isActive ? activeLabel : label}
      </span>
    </>
  );

  const className = cn(
    'group relative z-10 flex flex-col items-center gap-1.5 rounded-none py-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
    isActive ? 'text-[var(--theme-primary)]' : 'text-zinc-600 hover:text-zinc-400',
  );

  if (to) {
    return (
      <Link
        to={to}
        aria-label={ariaLabel}
        title={ariaLabel}
        aria-current={isActive ? 'page' : undefined}
        className={className}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      title={ariaLabel}
      aria-expanded={isActive}
      className={className}
    >
      {content}
    </button>
  );
}
