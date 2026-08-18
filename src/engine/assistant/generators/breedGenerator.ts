import { calculateGen2Gender, calculateGen3Gender } from '../../../utils/gender';
import { getGenerationConfig } from '../../../utils/generationConfig';
import type { PokemonInstance, SaveData } from '../../saveParser/index';
import type { Suggestion } from '../strategies/types';
import type { AssistantApiData } from '../suggestionEngineTypes';

/**
 * Evaluates Gen 2 Daycare breeding logic.
 * Checks if the player can breed a missing base Pokémon from an owned evolution.
 *
 * **Architecture Note: In-Place Mutation**
 * It mutates the provided `suggestions` array.
 * This mutation-in-place pattern is a critical architectural optimization (O(1) memory)
 * that prevents the O(N) garbage collection overhead of allocating and merging massive
 * arrays during the hot path.
 *
 * @param queryTargets - The top priority missing Pokémon IDs to evaluate.
 * @param saveData - The player's parsed save file, used to check Daycare status.
 * @param apiData - Pre-fetched metadata containing evolution chains.
 * @param instancesBySpecies - A Map of the player's physical Pokémon, used to verify ownership of evolutions in O(1) time.
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
            (instancesBySpecies.has(evo.id) ||
              (('daycare' in saveData ? saveData.daycare : undefined)?.some((d) => d.speciesId === evo.id) ?? false))
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
        const isInDaycare =
          ('daycare' in saveData ? saveData.daycare : undefined)?.some((d) => d.speciesId === evolutionIdToBreed) ??
          false;

        let incenseText = '';
        if (targetId === 298) incenseText = ' holding a Sea Incense';
        else if (targetId === 360) incenseText = ' holding a Lax Incense';

        let description = `Leave your #${evolutionIdToBreed}${incenseText} at the Daycare to get an Egg!`;
        let priority = 85;
        let title = `Breed: #${targetId}`;

        if (isInDaycare) {
          if (
            ('daycare' in saveData ? saveData.daycare : undefined) &&
            ('daycare' in saveData ? (saveData.daycare as PokemonInstance[]) : []).length === 2
          ) {
            if ('daycareHasEgg' in saveData ? saveData.daycareHasEgg : undefined) {
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
          description = `Leave your #${evolutionIdToBreed}${incenseText} and a compatible partner (like Ditto) at the Daycare to get an Egg!`;
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

      if (p.em) {
        const moveIds = Object.keys(p.em);
        for (let j = 0; j < moveIds.length; j++) {
          const moveIdStr = moveIds[j];
          if (!moveIdStr) continue;
          const moveId = parseInt(moveIdStr, 10);
          const chain = p.em[moveId];
          if (!chain || chain.length === 0) continue;

          for (let k = chain.length - 2; k >= 0; k--) {
            const stepSpeciesId = chain[k];
            if (stepSpeciesId !== undefined && instancesBySpecies.has(stepSpeciesId)) {
              const nextStepSpeciesId = chain[k + 1];
              if (nextStepSpeciesId === undefined) continue;

              const instances = instancesBySpecies.get(stepSpeciesId) || [];
              const hasMove = instances.some((inst) => {
                if (!inst.moves?.includes(moveId)) return false;

                const metadata = apiData.pokemonMetadata?.[inst.speciesId];
                if (!metadata || metadata.gr === undefined) return false;

                let gender: 'male' | 'female' | 'genderless' = 'genderless';
                if (saveData.generation === 2) {
                  gender = calculateGen2Gender(inst.dvs?.atk ?? 0, metadata.gr);
                } else if (saveData.generation === 3) {
                  gender = calculateGen3Gender(inst.personalityValue ?? 0, metadata.gr);
                }
                return gender === 'male';
              });

              // If it doesn't have the move, and it's not the base of the chain, keep traversing
              if (!hasMove && k > 0) continue;

              let description = `Breed your #${stepSpeciesId} to get a #${nextStepSpeciesId} with the Egg Move!`;
              const title = `Breed: #${nextStepSpeciesId}`;
              if (hasMove) {
                description = `Breed your #${stepSpeciesId} (which knows the Egg Move) to get a #${nextStepSpeciesId}!`;
              }

              suggestions.push({
                id: `egg-move-${targetId}-${moveId}-${stepSpeciesId}`,
                category: 'Breed',
                title,
                description,
                pokemonId: nextStepSpeciesId,
                priority: hasMove ? 88 : 82,
              });

              break;
            }
          }
        }
      }
    }
  }
}
