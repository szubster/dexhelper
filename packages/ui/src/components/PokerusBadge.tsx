import { TacticalBadge } from './TacticalBadge';

interface PokerusBadgeProps {
  strain: number;
  daysRemaining?: number;
  className?: string;
}

export function PokerusBadge({ strain, daysRemaining = 0, className }: PokerusBadgeProps) {
  if (strain === 0) {
    return (
      <TacticalBadge variant="zinc" className={className}>
        [PKRS STRN: 0]
      </TacticalBadge>
    );
  }

  if (strain > 0 && daysRemaining > 0) {
    return (
      <TacticalBadge variant="pink" pulse className={className}>
        [PKRS INF: {daysRemaining}D]
      </TacticalBadge>
    );
  }

  return (
    <TacticalBadge variant="zinc" className={className}>
      [PKRS CURED]
    </TacticalBadge>
  );
}
