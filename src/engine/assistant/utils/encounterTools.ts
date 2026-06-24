import type { PokemonInstance, SaveData } from '../../saveParser/index';
import type { Suggestion } from '../strategies/types';

export interface PlayerTools {
  hasHeadbutt: boolean;
  hasRockSmash: boolean;
  hasSurf: boolean;
  hasOldRod: boolean;
  hasGoodRod: boolean;
  hasSuperRod: boolean;
}

/**
 * Extracts tool availability (items and moves) from the player's save data.
 * Used to determine if the player can access certain map areas or encounter methods
 * (e.g., using Surf to cross water, or Old Rod to fish).
 *
 * @param saveData - The parsed save data containing the player's inventory and PC items.
 * @param allInstances - An array of all Pokémon currently owned by the player (Party + PC), used to check for learned HM moves.
 * @returns A `PlayerTools` object indicating which tools and HMs are currently accessible.
 *
 * @example
 * const tools = extractPlayerTools(saveData, [...saveData.partyDetails, ...saveData.pcDetails]);
 * if (tools.hasSurf) {
 *   // Player can access water encounters
 * }
 */
export function extractPlayerTools(saveData: SaveData, allInstances: PokemonInstance[]): PlayerTools {
  // ⚡ Bolt: Removed .some() chains and closures in favor of imperative loops to eliminate intermediate array/closure allocations (O(N) -> O(1) memory overhead)
  let hasHeadbutt = false;
  let hasRockSmash = false;
  let hasSurf = false;
  let hasOldRod = false;
  let hasGoodRod = false;
  let hasSuperRod = false;

  const inventory = saveData.inventory || [];
  for (let i = 0; i < inventory.length; i++) {
    const item = inventory[i];
    if (item && item.quantity > 0) {
      const id = item.id;
      if (id === 192) hasHeadbutt = true;
      else if (id === 198) {
        hasRockSmash = true;
        hasSurf = true;
      } else if (id === 245 || id === 341) hasSurf = true;
      else if (id === 52 || id === 69 || id === 260) hasOldRod = true;
      else if (id === 53 || id === 70 || id === 261) hasGoodRod = true;
      else if (id === 54 || id === 71 || id === 262) hasSuperRod = true;
    }
  }

  const pcItems = saveData.pcItems || [];
  for (let i = 0; i < pcItems.length; i++) {
    const item = pcItems[i];
    if (item && item.quantity > 0) {
      const id = item.id;
      if (id === 192) hasHeadbutt = true;
      else if (id === 198) {
        hasRockSmash = true;
        hasSurf = true;
      } else if (id === 245 || id === 341) hasSurf = true;
      else if (id === 52 || id === 69 || id === 260) hasOldRod = true;
      else if (id === 53 || id === 70 || id === 261) hasGoodRod = true;
      else if (id === 54 || id === 71 || id === 262) hasSuperRod = true;
    }
  }

  for (let i = 0; i < allInstances.length; i++) {
    const p = allInstances[i];
    if (p) {
      const moves = p.moves || [];
      for (let j = 0; j < moves.length; j++) {
        const m = moves[j];
        if (m === 29) hasHeadbutt = true;
        else if (m === 249) hasRockSmash = true;
        else if (m === 57) hasSurf = true;
      }
    }
  }

  return {
    hasHeadbutt,
    hasRockSmash,
    hasSurf,
    hasOldRod,
    hasGoodRod,
    hasSuperRod,
  };
}

/**
 * Filters out HM/Item dependent encounters (like Headbutt, Surf, Fishing) if the player lacks the required tools.
 *
 * If a Pokémon requires a missing tool to be encountered but is still conceptually valid,
 * its priority is heavily penalized rather than being removed entirely, serving as a hint
 * for future progression. If all possible encounter methods for a suggestion require missing tools
 * and no accessible method remains, the suggestion is removed completely.
 *
 * @param suggestions - The array of generated `Suggestion` objects to filter. This array is mutated in-place.
 * @param playerTools - The object defining which tools the player currently possesses.
 * @param localPids - A `Set` tracking which Pokémon IDs have been found locally. If a local encounter is removed, its ID is deleted from this set so it can be evaluated by fallback generators.
 * @returns void - The `suggestions` array and `localPids` set are mutated in-place to avoid array reallocation overhead.
 *
 * @example
 * filterSuggestionsByMissingTools(suggestions, playerTools, localPids);
 */
export function filterSuggestionsByMissingTools(
  suggestions: Suggestion[],
  playerTools: PlayerTools,
  localPids: Set<number>,
): void {
  // We iterate backwards through the array. This allows us to `splice` (remove)
  // elements in-place safely without skipping the next element, maintaining O(1) space.
  for (let i = suggestions.length - 1; i >= 0; i--) {
    const suggestion = suggestions[i];
    if (suggestion && suggestion.category === 'Catch' && suggestion.encounterInfo) {
      let hasValidEncounter = false;
      for (const pidStr in suggestion.encounterInfo) {
        const pid = parseInt(pidStr, 10);
        const details = suggestion.encounterInfo[pid];
        if (details) {
          const missingTools = new Set<string>();
          let hasAccessibleMethod = false;

          for (let dIdx = 0; dIdx < details.length; dIdx++) {
            const d = details[dIdx];
            if (d) {
              let methodAccessible = true;
              if (d.method === 'headbutt' && !playerTools.hasHeadbutt) {
                methodAccessible = false;
                missingTools.add('Headbutt');
              } else if (d.method === 'rock-smash' && !playerTools.hasRockSmash) {
                methodAccessible = false;
                missingTools.add('Rock Smash');
              } else if (d.method === 'surf' && !playerTools.hasSurf) {
                methodAccessible = false;
                missingTools.add('Surf');
              } else if (d.method === 'old-rod' && !playerTools.hasOldRod) {
                methodAccessible = false;
                missingTools.add('Old Rod');
              } else if (d.method === 'good-rod' && !playerTools.hasGoodRod) {
                methodAccessible = false;
                missingTools.add('Good Rod');
              } else if (d.method === 'super-rod' && !playerTools.hasSuperRod) {
                methodAccessible = false;
                missingTools.add('Super Rod');
              }

              if (methodAccessible) {
                hasAccessibleMethod = true;
              }
            }
          }

          if (!hasAccessibleMethod && missingTools.size > 0) {
            const warnings = Array.from(missingTools);
            const warningStr = `Requires ${warnings.join(' or ')}`;
            if (suggestion.warning) {
              suggestion.warning += `, ${warningStr}`;
            } else {
              suggestion.warning = warningStr;
            }
            // Penalize priority to 45 (below 'Ready-to-Evolve' and standard progression tasks).
            // We do not remove it completely, so the user still gets a hint that the Pokémon
            // is available here if they come back later with the right tool.
            suggestion.priority = Math.min(suggestion.priority, 45);
          }

          hasValidEncounter = true;
        }
      }

      // If no valid encounters remain for this suggestion, remove it completely.
      // (This will only happen if there were actually zero encounter details generated originally)
      if (!hasValidEncounter) {
        suggestions.splice(i, 1);
        // Also remove from localPids. Because this local encounter was physically impossible
        // to reach, deleting the PID from `localPids` allows the suggestion engine's later stages
        // (like evolution or trade generators) to try and find an alternative way to obtain it.
        if (suggestion.pokemonIds) {
          for (const pid of suggestion.pokemonIds) {
            localPids.delete(pid);
          }
        } else if (suggestion.pokemonId) {
          localPids.delete(suggestion.pokemonId);
        }
      } else {
        // Update pokemonIds if some were completely filtered out
        if (suggestion.pokemonIds) {
          suggestion.pokemonIds = suggestion.pokemonIds.filter((pid) => {
            if (suggestion.encounterInfo?.[pid] !== undefined) {
              return true;
            } else {
              localPids.delete(pid);
              return false;
            }
          });
        }
      }
    }
  }
}
