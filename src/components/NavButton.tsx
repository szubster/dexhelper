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
          {isActive ? activeLabel : label}
        </span>
      </div>
    </>
  );

  const className = cn(
    'group focus-visible:tactical-focus relative z-10 flex h-full flex-col items-center justify-center rounded-none border border-dashed transition-all duration-300',
    isActive
      ? 'border-[var(--theme-primary)]/50 bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] shadow-[inset_0_0_15px_rgba(var(--theme-primary-rgb),0.3)]'
      : 'border-zinc-800 bg-zinc-950/80 text-zinc-600 shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)] hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-400',
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
