import type { PokemonInstance, SaveData } from '../saveParser/index';

/**
 * Extracts all Pokemon instances from a save data object, combining party, PC box, and Daycare members.
 */
export function extractAllInstances(saveData: SaveData): PokemonInstance[] {
  const party = saveData.partyDetails || [];
  const pc = saveData.pcDetails || [];
  const daycare =
    saveData.generation === 2
      ? saveData.daycare || []
      : saveData.generation === 3
        ? saveData.gen3Daycare?.mons || []
        : [];

  return [party, pc, daycare].flat().filter((p): p is PokemonInstance => Boolean(p));
}

/**
 * Builds a Map grouping Pokemon instances by their species ID.
 */
export function buildInventoryBySpecies(instances: PokemonInstance[]): Map<number, PokemonInstance[]> {
  return instances.reduce((inventory, pokemon) => {
    if (!pokemon) return inventory;
    const speciesGroup = inventory.get(pokemon.speciesId) ?? [];
    speciesGroup.push(pokemon);
    inventory.set(pokemon.speciesId, speciesGroup);
    return inventory;
  }, new Map<number, PokemonInstance[]>());
}
