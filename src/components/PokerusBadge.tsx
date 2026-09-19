import { cn } from '../utils/cn';

interface PokerusBadgeProps {
  strain: number;
  daysRemaining?: number;
  className?: string;
}

export function PokerusBadge({ strain, daysRemaining = 0, className }: PokerusBadgeProps) {
  if (strain === 0) {
    return (
      <div className={cn('tactical-badge border-zinc-800 bg-zinc-950 text-zinc-500', className)}>[PKRS STRN: 0]</div>
    );
  }

  if (strain > 0 && daysRemaining > 0) {
    return (
      <div className={cn('tactical-badge border-pink-500/50 bg-pink-500/10 text-pink-400', className)}>
        [PKRS INF: {daysRemaining}D]
      </div>
    );
  }

  return (
    <div className={cn('tactical-badge border-zinc-500/50 bg-zinc-500/10 text-zinc-400', className)}>[PKRS CURED]</div>
  );
}
