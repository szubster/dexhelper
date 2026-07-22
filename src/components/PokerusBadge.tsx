import { cn } from '../utils/cn';

interface PokerusBadgeProps {
  strain: number;
  className?: string;
}

export function PokerusBadge({ strain, className }: PokerusBadgeProps) {
  return (
    <div
      className={cn(
        'tactical-badge',
        strain === 0 ? 'border-zinc-800 bg-zinc-950 text-zinc-500' : 'border-pink-500/50 bg-pink-500/10 text-pink-400',
        className,
      )}
    >
      [PKRS STRN: {strain}]
    </div>
  );
}
