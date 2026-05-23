import type { PokemonInstance, SaveData } from '../../saveParser/index';
import type { Suggestion } from '../strategies/types';
import type { AssistantApiData } from './types';

/**
 * Evaluates whether a Pokémon is obtainable internally via breeding without requiring
 * external trades, even if it is technically "unobtainable" in the wild for that version.
 *
 * This explicitly processes Gen 2 logic (e.g. breeding a Raichu to get a Pichu).
 * It mutates the provided `suggestions` array.
 *
 * @param queryTargets - The top priority missing Pokémon IDs to evaluate.
 * @param saveData - The player's parsed save file.
 * @param apiData - Pre-fetched metadata for Pokémon definitions.
 * @param instancesBySpecies - A Map of the player's physical Pokémon, used to find breeding candidates.
 * @param suggestions - The shared array where new suggestions are pushed.
 */
export function generateBreedingSuggestions(
  queryTargets: number[],
  saveData: SaveData,
  apiData: AssistantApiData,
  instancesBySpecies: Map<number, PokemonInstance[]>,
  suggestions: Suggestion[],
) {
  // F. Breeding (Gen 2 Only)
  if (saveData.generation === 2) {
    queryTargets.forEach((targetId: number) => {
      const p = apiData.pokemonMetadata?.[targetId];
      if (!p) return;

      // Check if we are missing a base Pokemon, but we own an evolution of it
      let canBreed = false;
      let evolutionIdToBreed: number | null = null;

      // Only base Pokemon can be hatched from an egg
      if (p.efrm === undefined || p.efrm.length === 0) {
        // Look at all evolutions of the target (recursive)
        const stack = [...(p.eto || [])];
        while (stack.length > 0) {
          const evo = stack.pop();
          if (
            evo &&
            (instancesBySpecies.has(evo.id) || (saveData.daycare?.some((d) => d.speciesId === evo.id) ?? false))
          ) {
            canBreed = true;
            evolutionIdToBreed = evo.id;
            break;
          }
          if (evo?.eto && evo.eto.length > 0) {
            stack.push(...evo.eto);
          }
        }
      }

      if (canBreed && evolutionIdToBreed) {
        const isInDaycare = saveData.daycare?.some((d) => d.speciesId === evolutionIdToBreed) ?? false;

        let description = `Leave your #${evolutionIdToBreed} at the Daycare to get an Egg!`;
        let priority = 85;
        let title = `Breed: #${targetId}`;

        if (isInDaycare) {
          if (saveData.daycare && saveData.daycare.length === 2) {
            if (saveData.daycareHasEgg) {
              title = `Egg Ready: #${targetId}!`;
              description = `Pick up your Egg from the Daycare!`;
              priority = 95;
            } else {
              title = `Breeding in Progress: #${targetId}`;
              description = `Wait for an Egg from the Daycare!`;
              priority = 85;
            }
          } else {
            title = `Need Partner: #${targetId}`;
            description = `Leave a compatible partner (like Ditto) at the Daycare to get an Egg!`;
            priority = 80;
          }
        } else {
          description = `Leave your #${evolutionIdToBreed} and a compatible partner (like Ditto) at the Daycare to get an Egg!`;
        }

        suggestions.push({
          id: `breed-${targetId}`,
          category: 'Breed',
          title,
          description,
          pokemonId: targetId,
          priority,
        });
      }
    });
  }
}
