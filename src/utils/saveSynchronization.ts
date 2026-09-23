/**
 * @module saveSynchronization
 *
 * Aggregates player progress state across multiple active save files.
 *
 * **Architecture & Purpose:**
 * When players manage multiple save files concurrently (e.g. trading across Generation 1 and 2 games,
 * or tracking progress in parallel playthroughs), this module merges individual save states into a
 * single unified `SynchronizedState`. This consolidated state represents the union of all owned Pokémon,
 * seen Pokédex entries, and held or PC stored items across all loaded saves, enabling cross-save
 * filtering and progress calculation in the UI.
 */

import type { SaveData } from '../engine/saveParser/parsers/common';

/**
 * Represents the merged cross-save progress state.
 */
export interface SynchronizedState {
  /** Set of species IDs marked as caught across any loaded save file. */
  owned: Set<number>;
  /** Set of species IDs marked as seen across any loaded save file. */
  seen: Set<number>;
  /** Set of item IDs present in inventory or PC storage with quantity > 0 across any loaded save file. */
  items: Set<number>;
}

/**
 * Calculates the combined union of Pokédex progress and available items from a collection of save files.
 *
 * @param saves - Map of save file identifiers to their parsed `SaveData` objects.
 * @returns A `SynchronizedState` containing the union of all owned/seen species and non-zero items.
 *
 * @example
 * ```ts
 * const aggregated = calculateSynchronizedState({
 *   red: redSaveData,
 *   blue: blueSaveData,
 * });
 * const totalUniqueOwned = aggregated.owned.size;
 * ```
 */
export function calculateSynchronizedState(saves: Record<string, SaveData>): SynchronizedState {
  const result: SynchronizedState = {
    owned: new Set<number>(),
    seen: new Set<number>(),
    items: new Set<number>(),
  };

  for (const save of Object.values(saves)) {
    // Merge owned Pokédex species IDs into the unified set
    save.owned?.forEach((id) => {
      result.owned.add(id);
    });

    // Merge seen Pokédex species IDs into the unified set
    save.seen?.forEach((id) => {
      result.seen.add(id);
    });

    // Collect non-zero items from player's inventory bag
    save.inventory?.forEach((item) => {
      if (item.quantity > 0) {
        result.items.add(item.id);
      }
    });

    // Collect non-zero items from player's PC item storage
    save.pcItems?.forEach((item) => {
      if (item.quantity > 0) {
        result.items.add(item.id);
      }
    });
  }

  return result;
}
