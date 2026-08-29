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
    <div className="relative flex h-full w-full flex-col items-center justify-center pt-1 pb-1">
      {/* Physical Hardware LED Indicator */}
      <div className="absolute top-1.5 flex h-[3px] w-8 justify-center border border-zinc-900 bg-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
        <div
          className={cn(
            'h-full w-full transition-colors duration-300',
            isActive ? 'bg-[var(--theme-primary)] shadow-[0_0_8px_var(--theme-primary)]' : 'bg-zinc-800',
          )}
        />
      </div>

      <div
        className={cn(
          'relative z-10 mt-2 flex flex-col items-center gap-1 transition-transform',
          isActive ? 'translate-y-[2px]' : 'group-active:scale-95',
        )}
      >
        <Icon
          size={20}
          strokeWidth={isActive ? 2.5 : 2}
          className={cn(
            'transition-colors duration-300',
            isActive
              ? 'text-[var(--theme-primary)] drop-shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.8)]'
              : 'text-zinc-500 group-hover:text-zinc-300',
          )}
        />
        <span
          className={cn(
            'font-black font-mono text-[9px] uppercase tracking-[0.2em] transition-colors',
            isActive ? 'text-[var(--theme-primary)]' : 'text-zinc-500 group-hover:text-zinc-400',
          )}
        >
          <span aria-hidden="true">[ </span>
          {isActive ? activeLabel : label}
          <span aria-hidden="true"> ]</span>
        </span>
      </div>
    </div>
  );

  const className = cn(
    'group focus-visible:tactical-focus relative z-10 flex h-full w-full flex-col items-center justify-center rounded-none transition-all duration-300',
    'border-[3px]',
    isActive
      ? 'border-t-black border-r-zinc-700/30 border-b-zinc-700/30 border-l-black bg-zinc-950 shadow-[inset_4px_4px_10px_rgba(0,0,0,0.9),inset_-1px_-1px_2px_rgba(255,255,255,0.05)]'
      : 'border-t-zinc-600 border-r-black border-b-black border-l-zinc-600 bg-zinc-800 shadow-[2px_2px_4px_rgba(0,0,0,0.8),inset_1px_1px_1px_rgba(255,255,255,0.1)] hover:bg-zinc-700',
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
