export interface LivingDexSlot {
  speciesId: number;
  inParty: boolean;
  inPC: boolean;
  isShiny: boolean;
  isGhost: boolean;
}

export interface TacticalStylingProps {
  isGhost?: boolean;
  tacticalVariant?: 'default' | 'ghost' | 'secured';
}
