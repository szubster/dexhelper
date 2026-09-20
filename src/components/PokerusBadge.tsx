import { TacticalBadge } from './TacticalBadge';

interface PokerusBadgeProps {
  strain: number;
  className?: string;
}

export function PokerusBadge({ strain, className }: PokerusBadgeProps) {
  return (
    <TacticalBadge variant={strain === 0 ? 'zinc' : 'pink'} className={className}>
      [PKRS STRN: {strain}]
    </TacticalBadge>
  );
}
