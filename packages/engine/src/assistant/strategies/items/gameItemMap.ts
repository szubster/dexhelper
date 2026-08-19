import { pokeDB } from '@/db/PokeDB';

/**
 * Maps a modern PokeAPI evolution item ID to its corresponding internal item ID
 * for a specific game generation. This is necessary because Gen 1 and Gen 2 use
 * distinct hex values for items (e.g., Moon Stone is 0x0A in Gen 1, but 0x08 in Gen 2).
 *
 * Rather than checking hardcoded constants, this function queries the items store in PokeDB.
 *
 * @param pokeApiId - The item ID returned from the modern PokeAPI data source.
 * @param generation - The target game generation (1, 2, or 3).
 * @returns The internal game item ID for the given generation, or the original ID as a fallback.
 */
export async function getGameItemId(pokeApiId: number, generation: number): Promise<number> {
  const item = await pokeDB.getItem(pokeApiId);
  if (!item) return pokeApiId;
  if (generation === 1) return item.gen1_id ?? pokeApiId;
  if (generation === 2) return item.gen2_id ?? pokeApiId;
  if (generation === 3) return item.gen3_id ?? pokeApiId;
  return pokeApiId;
}
