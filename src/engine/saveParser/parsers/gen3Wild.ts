import type { Gen3HeldItemDrop, Gen3WildEncounter, InteractionType } from '../../data/gen3/wildModels';
import { GEN3_POKEMON_ITEM_OFFSET_IN_G } from './gen3';

// Constants as per ADR for Save File Parsing
export const GEN3_WILD_LAND_CHANCES = [20, 20, 10, 10, 10, 10, 5, 5, 4, 4, 1, 1];
export const GEN3_WILD_WATER_CHANCES = [60, 30, 5, 4, 1];
export const GEN3_WILD_ROCK_SMASH_CHANCES = [60, 30, 5, 4, 1];
export const GEN3_WILD_FISHING_CHANCES = [70, 30, 60, 20, 20, 40, 40, 15, 4, 1];

export const GEN3_ITEM_CHANCE_COMMON = 50; // out of remaining 55, typically simplified to 50% flat
export const GEN3_ITEM_CHANCE_RARE = 5;

export const GEN3_ITEM_CHANCE_COMMON_COMPOUND_EYES = 60;
export const GEN3_ITEM_CHANCE_RARE_COMPOUND_EYES = 20;

export const SPECIES_INFO_ITEM_COMMON_OFFSET = 0x0c;
export const SPECIES_INFO_ITEM_RARE_OFFSET = 0x0e;

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
        chance: chances[index],
      });
    }
  });

  return encounters;
}

export function determineGen3HeldItemProbabilities(
  itemCommon: number,
  itemRare: number,
  hasCompoundEyes: boolean,
): Gen3HeldItemDrop[] {
  const drops: Gen3HeldItemDrop[] = [];
  const ITEM_NONE = 0;

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

export function extractHeldItemFromSubstruct0(substruct0DataView: DataView, offset: number = 0): number {
  try {
    return substruct0DataView.getUint16(offset + GEN3_POKEMON_ITEM_OFFSET_IN_G, true);
  } catch (_err) {
    throw new Error('The save file is corrupted or incomplete.');
  }
}
