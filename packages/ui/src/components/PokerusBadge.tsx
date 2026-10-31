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
        <span aria-hidden="true">[</span>PKRS STRN: 0<span aria-hidden="true">]</span>
      </TacticalBadge>
    );
  }

  if (strain > 0 && daysRemaining > 0) {
    return (
      <TacticalBadge variant="pink" pulse className={className}>
        <span aria-hidden="true">[</span>PKRS INF: {daysRemaining}D<span aria-hidden="true">]</span>
      </TacticalBadge>
    );
  }

  return (
    <TacticalBadge variant="zinc" className={className}>
      <span aria-hidden="true">[</span>PKRS CURED<span aria-hidden="true">]</span>
    </TacticalBadge>
  );
}
