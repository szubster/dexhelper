import type { LocationAreaEncounters, PokemonMetadata, UnifiedLocation } from '../../db/schema';

export interface AssistantApiData {
  localAid: number | null;
  localEncounters: LocationAreaEncounters[] | null;
  missingEncounters: Record<number, LocationAreaEncounters | null>;
  pokemonMetadata: Record<number, PokemonMetadata | null>;
  ancestralEncounters: Record<number, Record<number, LocationAreaEncounters | null>>;
  areaNames: Record<number, string>;
  allLocations: UnifiedLocation[];
}
