import type { PokemonMetadata } from '../../db/schema';
import type { PokemonInstance } from '../saveParser/parsers/common';

export const THIEF_MOVE_ID = 168;
export const COVET_MOVE_ID = 343;

export interface ItemStealer {
  instance: PokemonInstance;
  metadata?: PokemonMetadata;
  stealingMoveId: number;
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
  const stealers: ItemStealer[] = [];

  for (const instance of instances) {
    if (!instance.moves) continue;

    let stealingMoveId: number | null = null;
    if (instance.moves.includes(THIEF_MOVE_ID)) {
      stealingMoveId = THIEF_MOVE_ID;
    } else if (instance.moves.includes(COVET_MOVE_ID)) {
      stealingMoveId = COVET_MOVE_ID;
    }

    if (stealingMoveId !== null) {
      const itemStealer: ItemStealer = {
        instance,
        stealingMoveId,
      };

      const metadata = metadataMap?.get(instance.speciesId);
      if (metadata) {
        itemStealer.metadata = metadata;
      }

      stealers.push(itemStealer);
    }
  }

  return stealers;
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
