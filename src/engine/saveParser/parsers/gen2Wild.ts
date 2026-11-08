import type { Gen2HeldItemDrop, Gen2WildEncounter } from '../../data/gen2/wildModels';

export const GEN2_WILD_GRASS_CHANCES = [30, 30, 20, 10, 5, 4, 1];
export const GEN2_WILD_WATER_CHANCES = [60, 30, 10];

export const GEN2_HELD_ITEM_NONE_CHANCE = 75;
export const GEN2_HELD_ITEM_COMMON_CHANCE = 23;
export const GEN2_HELD_ITEM_RARE_CHANCE = 2;

export const GEN2_HELD_ITEM_COMMON_INDEX = 0;
export const GEN2_HELD_ITEM_RARE_INDEX = 1;

/**
 * Calculates the wild encounter probabilities given a list of slots and interaction type.
 * @param interactionType 'grass' or 'water'
 * @param slots An array of partially formed Gen2WildEncounter objects (missing chance)
 * @returns Array of Gen2WildEncounter objects with probabilities assigned.
 */
export function parseGen2WildEncounterProbabilities(
  interactionType: string,
  slots: Omit<Gen2WildEncounter, 'chance'>[],
): Gen2WildEncounter[] {
  const chances = interactionType === 'water' ? GEN2_WILD_WATER_CHANCES : GEN2_WILD_GRASS_CHANCES;

  return slots.map((slot, index) => ({
    ...slot,
    chance: chances[index] ?? 0,
  }));
}

/**
 * Determines the held item drop probabilities based on the base item data.
 * @param item1 ID of the common item (or 0 if none)
 * @param item2 ID of the rare item (or 0 if none)
 * @returns Array of Gen2HeldItemDrop objects.
 */
export function determineGen2HeldItemProbabilities(item1: number, item2: number): Gen2HeldItemDrop[] {
  const drops: Gen2HeldItemDrop[] = [];

  if (item1 > 0 && item2 > 0 && item1 === item2) {
    drops.push({ itemId: item1, chance: GEN2_HELD_ITEM_COMMON_CHANCE + GEN2_HELD_ITEM_RARE_CHANCE });
  } else {
    if (item1 > 0) {
      drops.push({ itemId: item1, chance: GEN2_HELD_ITEM_COMMON_CHANCE });
    }
    if (item2 > 0) {
      drops.push({ itemId: item2, chance: GEN2_HELD_ITEM_RARE_CHANCE });
    }
  }

  return drops;
}

/**
 * Extracts a wild encounter area definition given a DataView and a specific offset.
 *
 * @param view DataView of the save block
 * @param offset Current memory offset
 * @param areaId The location ID
 * @param versionId Game version ID
 * @param method Encounter method (e.g. 'grass', 'water')
 * @returns Gen2EncounterArea object
 */
export function extractGen2WildEncounterArea(
  view: DataView,
  offset: number,
  areaId: number,
  versionId: number,
  method: string,
): import('../../data/gen2/wildModels').Gen2EncounterArea {
  try {
    const encounters: import('../../data/gen2/wildModels').Gen2WildEncounter[] = [];
    const numSlots = method === 'water' ? 3 : 7;
    const chances = method === 'water' ? GEN2_WILD_WATER_CHANCES : GEN2_WILD_GRASS_CHANCES;

    for (let i = 0; i < numSlots; i++) {
      const chance = chances[i] ?? 0;
      const pokemonId = view.getUint8(offset + i * 2 + 1);
      const level = view.getUint8(offset + i * 2);

      // 0 means no encounter in this slot
      if (pokemonId > 0) {
        encounters.push({
          chance,
          pokemonId,
          minLevel: level,
          maxLevel: level,
        });
      }
    }

    return {
      areaId,
      versionId,
      method,
      encounters,
    };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}
