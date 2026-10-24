export type InteractionType = 'land' | 'water' | 'rockSmash' | 'fishing';

export interface Gen3WildEncounter {
  pokemonId: number;
  chance: number;
  minLevel: number;
  maxLevel: number;
}

export interface Gen3EncounterArea {
  mapGroup: number;
  mapNum: number;
  versionId: number;
  method: InteractionType;
  encounters: Gen3WildEncounter[];
}

export interface Gen3HeldItemDrop {
  itemId: number;
  chance: number;
}

export interface Gen3SpeciesHeldItem {
  pokemonId: number;
  items: Gen3HeldItemDrop[];
}
