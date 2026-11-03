/**
 * @module gen3Wild
 *
 * Generation 3 wild encounter slot distribution and held item drop rate calculations.
 *
 * **Domain Logic:**
 * In Generation 3 games (Ruby, Sapphire, Emerald, FireRed, LeafGreen), wild encounters
 * are defined in fixed-size slot arrays per terrain type (Land: 12 slots, Water: 5 slots,
 * Rock Smash: 5 slots, Fishing: 10 slots). When an encounter triggers, the game generates a
 * pseudo-random number from 0 to 99 to pick a specific slot according to hardcoded cumulative
 * probability thresholds.
 *
 * Similarly, wild Pokémon hold items according to species data tables with up to two item slots:
 * a Common item (50% base chance) and a Rare item (5% base chance). When the lead party Pokémon
 * has the Compound Eyes ability (e.g., Butterfree, Nincada), the encounter engine boosts these
 * drop rates to 60% and 20% respectively.
 *
 * When inspecting Pokémon in save files, held items are stored in Substructure 0 (Growth / "G"),
 * at relative byte offset 2 (`GEN3_POKEMON_ITEM_OFFSET_IN_G`).
 */

import type { Gen3HeldItemDrop, Gen3WildEncounter, InteractionType } from '../../data/gen3/wildModels';
import { GEN3_POKEMON_ITEM_OFFSET_IN_G } from './gen3';

/**
 * Probability distribution percentage for the 12 wild Land (tall grass/cave) encounter slots.
 * Cumulative ranges: 0-19 (20%), 20-39 (20%), 40-49 (10%), 50-59 (10%), 60-69 (10%),
 * 70-79 (10%), 80-84 (5%), 85-89 (5%), 90-93 (4%), 94-97 (4%), 98 (1%), 99 (1%).
 */
export const GEN3_WILD_LAND_CHANCES = [20, 20, 10, 10, 10, 10, 5, 5, 4, 4, 1, 1];

/**
 * Probability distribution percentage for the 5 wild Surfing encounter slots.
 * Cumulative ranges: 0-59 (60%), 60-89 (30%), 90-94 (5%), 95-98 (4%), 99 (1%).
 */
export const GEN3_WILD_WATER_CHANCES = [60, 30, 5, 4, 1];

/**
 * Probability distribution percentage for the 5 wild Rock Smash encounter slots.
 * Cumulative ranges: 0-59 (60%), 60-89 (30%), 90-94 (5%), 95-98 (4%), 99 (1%).
 */
export const GEN3_WILD_ROCK_SMASH_CHANCES = [60, 30, 5, 4, 1];

/**
 * Probability distribution percentage for the 10 wild Fishing encounter slots across rods.
 * - Old Rod slots (0-1): 70%, 30%
 * - Good Rod slots (2-4): 60%, 20%, 20%
 * - Super Rod slots (5-9): 40%, 40%, 15%, 4%, 1%
 */
export const GEN3_WILD_FISHING_CHANCES = [70, 30, 60, 20, 20, 40, 40, 15, 4, 1];

/**
 * Standard base probability (percentage) for wild Pokémon to hold their common item.
 */
export const GEN3_ITEM_CHANCE_COMMON = 50;

/**
 * Standard base probability (percentage) for wild Pokémon to hold their rare item.
 */
export const GEN3_ITEM_CHANCE_RARE = 5;

/**
 * Boosted probability (percentage) for common held item when the lead Pokémon has Compound Eyes.
 */
export const GEN3_ITEM_CHANCE_COMMON_COMPOUND_EYES = 60;

/**
 * Boosted probability (percentage) for rare held item when the lead Pokémon has Compound Eyes.
 */
export const GEN3_ITEM_CHANCE_RARE_COMPOUND_EYES = 20;

/**
 * Byte offset of the common held item ID within the ROM's Species Info structure.
 */
export const SPECIES_INFO_ITEM_COMMON_OFFSET = 0x0c;

/**
 * Byte offset of the rare held item ID within the ROM's Species Info structure.
 */
export const SPECIES_INFO_ITEM_RARE_OFFSET = 0x0e;

/**
 * Maps raw encounter slots to their corresponding encounter rates based on terrain interaction type.
 *
 * In Gen 3 ROMs, encounter tables provide ordered slot entries without explicit probabilities.
 * This function pairs each slot with its canonical encounter chance determined by the terrain type.
 * If the input slots array exceeds the predefined table size, excess slots are ignored.
 *
 * @param interactionType - The encounter environment or method ('land', 'water', 'rockSmash', 'fishing').
 * @param slots - Array of encounter slot metadata (species, min level, max level).
 * @returns Array of encounter definitions augmented with probability percentages.
 *
 * @example
 * ```ts
 * const encounters = parseGen3WildEncounterProbabilities('land', [
 *   { pokemonId: 263, minLevel: 2, maxLevel: 3 }, // Zigzagoon Slot 0 (20%)
 *   { pokemonId: 265, minLevel: 2, maxLevel: 3 }, // Wurmple Slot 1 (20%)
 * ]);
 * // encounters[0].chance === 20
 * ```
 */
export function parseGen3WildEncounterProbabilities(
  interactionType: InteractionType,
  slots: { pokemonId: number; minLevel: number; maxLevel: number }[],
): Gen3WildEncounter[] {
  let chances: number[] = [];
  if (interactionType === 'land') chances = GEN3_WILD_LAND_CHANCES;
  if (interactionType === 'water') chances = GEN3_WILD_WATER_CHANCES;
  if (interactionType === 'rockSmash') chances = GEN3_WILD_ROCK_SMASH_CHANCES;
  if (interactionType === 'fishing') chances = GEN3_WILD_FISHING_CHANCES;

  const encounters: Gen3WildEncounter[] = [];
  slots.forEach((slot, index) => {
    if (index < chances.length) {
      encounters.push({
        pokemonId: slot.pokemonId,
        minLevel: slot.minLevel,
        maxLevel: slot.maxLevel,
        chance: chances[index] ?? 0,
      });
    }
  });

  return encounters;
}

/**
 * Determines the held item drop chances for wild Pokémon, accounting for abilities like Compound Eyes.
 *
 * **Domain Logic:**
 * - If both common and rare slots define the same non-zero item ID, the item is guaranteed to drop (100%).
 * - If an item ID is 0 (`ITEM_NONE`), the slot is empty and produces no drop entry.
 * - Having a lead Pokémon with Compound Eyes shifts common drop rate from 50% -> 60% and rare drop rate from 5% -> 20%.
 *
 * @param itemCommon - 16-bit item index from common slot (0 if none).
 * @param itemRare - 16-bit item index from rare slot (0 if none).
 * @param hasCompoundEyes - Whether the player's active lead Pokémon possesses the Compound Eyes ability.
 * @returns Array of available held item drops with their calculated percentage chances.
 *
 * @example
 * ```ts
 * // Magnetite with Metal Coat (Rare: 5%, Common: None)
 * const drops = determineGen3HeldItemProbabilities(0, 198, false);
 * // drops === [{ itemId: 198, chance: 5 }]
 *
 * // With Compound Eyes lead
 * const boosted = determineGen3HeldItemProbabilities(0, 198, true);
 * // boosted === [{ itemId: 198, chance: 20 }]
 * ```
 */
export function determineGen3HeldItemProbabilities(
  itemCommon: number,
  itemRare: number,
  hasCompoundEyes: boolean,
): Gen3HeldItemDrop[] {
  const drops: Gen3HeldItemDrop[] = [];
  const ITEM_NONE = 0;

  // When both slots specify the identical item, it is guaranteed (50% + 5% normalized to 100% in Gen 3 mechanics)
  if (itemCommon === itemRare && itemCommon !== ITEM_NONE) {
    drops.push({ itemId: itemCommon, chance: 100 });
    return drops;
  }

  if (itemCommon !== ITEM_NONE) {
    drops.push({
      itemId: itemCommon,
      chance: hasCompoundEyes ? GEN3_ITEM_CHANCE_COMMON_COMPOUND_EYES : GEN3_ITEM_CHANCE_COMMON,
    });
  }

  if (itemRare !== ITEM_NONE) {
    drops.push({
      itemId: itemRare,
      chance: hasCompoundEyes ? GEN3_ITEM_CHANCE_RARE_COMPOUND_EYES : GEN3_ITEM_CHANCE_RARE,
    });
  }

  return drops;
}

/**
 * Extracts the 16-bit held item ID from a decrypted Generation 3 Growth (Substructure 0 / "G") buffer.
 *
 * In Generation 3, each Pokémon's 48-byte data block is divided into 4 substructures of 12 bytes each
 * (Growth, Attacks, Effort/Condition, Misc). The held item index is stored as a 16-bit little-endian integer
 * at byte offset 2 (`GEN3_POKEMON_ITEM_OFFSET_IN_G`) within the Growth substructure.
 *
 * @param substruct0DataView - DataView pointing to the decrypted 12-byte Growth substructure.
 * @param offset - Optional byte offset within `substruct0DataView` where the 12-byte Growth substructure begins.
 * @returns The 16-bit held item ID (0 if holding no item).
 * @throws {Error} If `offset + GEN3_POKEMON_ITEM_OFFSET_IN_G` exceeds the buffer boundaries.
 *
 * @example
 * ```ts
 * const itemId = extractHeldItemFromSubstruct0(growthDataView, 0);
 * if (itemId !== 0) {
 *   console.log(`Held item ID: ${itemId}`);
 * }
 * ```
 */
export function extractHeldItemFromSubstruct0(substruct0DataView: DataView, offset: number = 0): number {
  try {
    return substruct0DataView.getUint16(offset + GEN3_POKEMON_ITEM_OFFSET_IN_G, true);
  } catch {
    throw new Error('The save file is corrupted or incomplete.');
  }
}
