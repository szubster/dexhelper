export type InteractionType = 'land' | 'water' | 'rockSmash' | 'fishing';

export interface Gen3WildEncounter {
  pokemonId: number;
  chance: number;
  minLevel: number;
  maxLevel: number;
}

export interface Gen3HeldItemDrop {
  itemId: number;
  chance: number;
}
