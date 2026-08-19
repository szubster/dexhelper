import type { PokemonInstance, SaveData } from '../saveParser/index';

/**
 * Extracts all Pokemon instances from a save data object, combining party and PC box members.
 */
export function extractAllInstances(saveData: SaveData): PokemonInstance[] {
  const party = saveData.partyDetails || [];
  const pc = saveData.pcDetails || [];
  const result: PokemonInstance[] = [];
  result.length = party.length + pc.length;
  let index = 0;
  for (let i = 0; i < party.length; i++) {
    const p = party[i];
    if (p) result[index++] = p;
  }
  for (let i = 0; i < pc.length; i++) {
    const p = pc[i];
    if (p) result[index++] = p;
  }
  result.length = index;
  return result;
}

/**
 * Builds a Map grouping Pokemon instances by their species ID.
 */
export function buildInventoryBySpecies(instances: PokemonInstance[]): Map<number, PokemonInstance[]> {
  const instancesBySpecies = new Map<number, PokemonInstance[]>();
  for (let i = 0; i < instances.length; i++) {
    const p = instances[i];
    if (p) {
      if (!instancesBySpecies.has(p.speciesId)) instancesBySpecies.set(p.speciesId, []);
      instancesBySpecies.get(p.speciesId)?.push(p);
    }
  }
  return instancesBySpecies;
}
