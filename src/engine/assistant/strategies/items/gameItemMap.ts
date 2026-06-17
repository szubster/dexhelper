export const EVO_ITEM_NAMES: Record<number, string> = {
  80: 'Sun Stone',
  81: 'Moon Stone',
  82: 'Fire Stone',
  83: 'Thunder Stone',
  84: 'Water Stone',
  85: 'Leaf Stone',
  198: "King's Rock",
  210: 'Metal Coat',
  212: 'Dragon Scale',
  229: 'Up-Grade',
};

const POKEAPI_TO_GEN1_ITEM: Record<number, number> = {
  81: 0x0a, // Moon Stone
  82: 0x20, // Fire Stone
  83: 0x21, // Thunder Stone
  84: 0x22, // Water Stone
  85: 0x2f, // Leaf Stone
};

const POKEAPI_TO_GEN2_ITEM: Record<number, number> = {
  80: 0x11, // Sun Stone
  81: 0x08, // Moon Stone
  82: 0x16, // Fire Stone
  83: 0x17, // Thunder Stone
  84: 0x18, // Water Stone
  85: 0x22, // Leaf Stone
  198: 0x5a, // King's Rock
  210: 0x8f, // Metal Coat
  212: 0x82, // Dragon Scale
  229: 0xac, // Up-Grade
};

/**
 * Maps a modern PokeAPI evolution item ID to its corresponding internal item ID
 * for a specific game generation. This is necessary because Gen 1 and Gen 2 use
 * distinct hex values for items (e.g., Moon Stone is 0x0A in Gen 1, but 0x08 in Gen 2).
 *
 * @param pokeApiId - The item ID returned from the modern PokeAPI data source.
 * @param generation - The target game generation (1 or 2).
 * @returns The internal game item ID for the given generation, or the original ID as a fallback.
 */
export function getGameItemId(pokeApiId: number, generation: number): number {
  if (generation === 1) return POKEAPI_TO_GEN1_ITEM[pokeApiId] || pokeApiId;
  if (generation === 2) return POKEAPI_TO_GEN2_ITEM[pokeApiId] || pokeApiId;
  return pokeApiId;
}
