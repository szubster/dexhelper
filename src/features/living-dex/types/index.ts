export interface LivingDexGhostSlot {
  /** The Pokémon species ID that is missing from the physical Living Dex. */
  speciesId: number;
  /** Whether a pre-evolution duplicate exists in storage that could be evolved to fill this slot. */
  hasEvolvableDuplicate: boolean;
  /** The species ID of the duplicate pre-evolution, if available. */
  duplicateSpeciesId?: number;
}

export interface TacticalLivingDexCellProps {
  /** The Pokémon species ID. */
  id: number;
  /** Whether the Pokémon is currently in the player's party. */
  inParty: boolean;
  /** Whether the Pokémon is currently in the player's PC storage. */
  inPC: boolean;
  /** Whether the Pokémon is shiny. */
  isShiny: boolean;
  /** Whether this cell represents a "ghost" (missing from physical Living Dex). */
  isGhost?: boolean;
  /** Additional tactical CSS class overrides. */
  className?: string;
}
