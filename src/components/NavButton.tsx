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
      <div
        className={cn(
          'relative z-10 flex flex-col items-center gap-1.5 transition-transform',
          isActive ? 'animate-pulse' : 'active:scale-90',
        )}
      >
        <Icon
          size={18}
          strokeWidth={isActive ? 2.5 : 2}
          className={cn(isActive && 'drop-shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.8)]')}
        />
        <span className="font-black font-mono text-[9px] uppercase tracking-[0.2em]">
          [ {isActive ? activeLabel : label} ]
        </span>
      </div>
    </>
  );

  const className = cn(
    'group focus-visible:tactical-focus relative z-10 flex h-full flex-col items-center justify-center rounded-none transition-all duration-300',
    isActive
      ? 'border-2 border-zinc-900 bg-zinc-950 text-[var(--theme-primary)] shadow-[inset_0_4px_10px_rgba(0,0,0,0.8)]'
      : 'border-2 border-t-zinc-700 border-r-zinc-900 border-b-zinc-900 border-l-zinc-700 bg-zinc-800 text-zinc-500 shadow-[2px_2px_0px_rgba(0,0,0,0.5)] hover:bg-zinc-700 hover:text-zinc-300',
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
