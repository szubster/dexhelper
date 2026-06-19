import { getGenerationConfig } from '../../../utils/generationConfig';
import type { PokemonInstance, SaveData } from '../../saveParser/index';
import type { Suggestion } from '../strategies/types';
import type { AssistantApiData } from '../suggestionEngineTypes';

/**
 * Evaluates Gen 2 Daycare breeding logic.
 * Checks if the player can breed a missing base Pokémon from an owned evolution.
 *
 * It mutates the provided `suggestions` array.
 * This mutation-in-place pattern is a critical architectural optimization (O(1) memory)
 * that prevents the O(N) garbage collection overhead of allocating and merging massive
 * arrays during the hot path.
 *
 * @param queryTargets - The top priority missing Pokémon IDs to evaluate.
 * @param saveData - The player's parsed save file, used to check Daycare status.
 * @param apiData - Pre-fetched metadata containing evolution chains.
 * @param instancesBySpecies - A Map of the player's physical Pokémon.
 * @param suggestions - The shared array where new breeding suggestions are pushed in-place.
 */
export function generateBreedingSuggestions(
  queryTargets: number[],
  saveData: SaveData,
  apiData: AssistantApiData,
  instancesBySpecies: Map<number, PokemonInstance[]>,
  suggestions: Suggestion[],
) {
  // F. Breeding (Gen 2 Only)
  const genConfig = getGenerationConfig(saveData.generation);
  if (genConfig.hasBreeding) {
    // ⚡ Bolt: Replaced .forEach with for loop to avoid closure creation and function call overhead
    for (let i = 0; i < queryTargets.length; i++) {
      const targetId = queryTargets[i];
      if (targetId === undefined) continue;

      const p = apiData.pokemonMetadata?.[targetId];
      if (!p) continue;

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
    }
  }
}
