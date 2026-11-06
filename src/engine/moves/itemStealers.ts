import type { PokemonMetadata } from '../../db/schema';
import type { PokemonInstance } from '../saveParser/parsers/common';

export const THIEF_MOVE_ID = 168;
export const COVET_MOVE_ID = 343;

/**
 * List of move IDs that can steal items in battle.
 */
export const ITEM_STEALING_MOVE_IDS: readonly number[] = [THIEF_MOVE_ID, COVET_MOVE_ID];

export interface ItemStealer {
  instance: PokemonInstance;
  metadata?: PokemonMetadata;
  stealingMoveId: number;
}

/**
 * Finds the first item-stealing move known in a list of move IDs.
 *
 * @param moves - Array of move IDs.
 * @returns The item-stealing move ID if found, or undefined.
 */
export function findStealingMove(moves: readonly number[]): number | undefined {
  return moves.find((moveId) => ITEM_STEALING_MOVE_IDS.includes(moveId));
}

/**
 * Scans a list of Pokemon instances and identifies those that know item-stealing moves (Thief or Covet).
 *
 * @param instances - The list of Pokemon instances to scan (from Party or PC).
 * @param metadataMap - Optional map of species IDs to PokemonMetadata for richer return data.
 * @returns An array of ItemStealer objects representing Pokemon with item-stealing moves.
 */
export function findItemStealers(
  instances: PokemonInstance[],
  metadataMap?: Map<number, PokemonMetadata>,
): ItemStealer[] {
  return instances.flatMap((instance) => {
    if (!instance.moves) return [];

    const stealingMoveId = findStealingMove(instance.moves);
    if (stealingMoveId === undefined) return [];

    const itemStealer: ItemStealer = {
      instance,
      stealingMoveId,
    };

    const metadata = metadataMap?.get(instance.speciesId);
    if (metadata) {
      itemStealer.metadata = metadata;
    }

    return [itemStealer];
  });
}

/**
 * Scans both Party and PC Pokemon for item stealers.
 *
 * @param partyDetails - The Pokemon in the player's active party.
 * @param pcDetails - The Pokemon stored in the player's PC boxes.
 * @param metadataMap - Optional map of species IDs to PokemonMetadata.
 * @returns An object containing arrays of ItemStealer from party and PC.
 */
export function findAllItemStealers(
  partyDetails: PokemonInstance[],
  pcDetails: PokemonInstance[],
  metadataMap?: Map<number, PokemonMetadata>,
) {
  return {
    party: findItemStealers(partyDetails, metadataMap),
    pc: findItemStealers(pcDetails, metadataMap),
  };
}
