/**
 * Data structures for Gen 2 wild encounters and held items.
 *
 * Compliant with PokeData Property Naming Schema.
 * Intended for MsgPack serialization (`useRecords: true`).
 */

export type TimeOfDay = 'morning' | 'day' | 'night' | 'all';

export interface Gen2WildEncounter {
  pokemonId: number;
  chance: number;
  minLevel: number;
  maxLevel: number;
  timeOfDay?: TimeOfDay;
}

export interface Gen2EncounterArea {
  areaId: number;
  versionId: number;
  method: string;
  encounters: Gen2WildEncounter[];
}

export interface Gen2HeldItemDrop {
  itemId: number;
  chance: number;
}

export interface Gen2SpeciesHeldItem {
  pokemonId: number;
  items: Gen2HeldItemDrop[];
}
