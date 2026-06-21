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
 * Used to determine if the player can access certain encounters.
 */
export function extractPlayerTools(saveData: SaveData, allInstances: PokemonInstance[]): PlayerTools {
  const hasItem = (ids: number[]) => {
    return (
      saveData.inventory.some((i) => ids.includes(i.id) && i.quantity > 0) ||
      (saveData.pcItems?.some((i) => ids.includes(i.id) && i.quantity > 0) ?? false)
    );
  };

  const hasMove = (ids: number[]) => {
    return allInstances.some((p) => p.moves?.some((m) => ids.includes(m)));
  };

  return {
    hasHeadbutt: hasItem([192]) || hasMove([29]),
    hasRockSmash: hasItem([198]) || hasMove([249]),
    hasSurf: hasItem([198, 245, 341]) || hasMove([57]),
    hasOldRod: hasItem([52, 69, 260]),
    hasGoodRod: hasItem([53, 70, 261]),
    hasSuperRod: hasItem([54, 71, 262]),
  };
}

/**
 * Filters out HM/Item dependent encounters (like Headbutt, Surf, Fishing) if the player lacks the required tools.
 * Penalizes priority if tools are missing but encounter might still be conceptually valid.
 * Removes suggestions entirely if no accessible encounter methods remain.
 */
export function filterSuggestionsByMissingTools(
  suggestions: Suggestion[],
  playerTools: PlayerTools,
  localPids: Set<number>,
): void {
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
            // Penalize priority since the user lacks the required tools
            suggestion.priority = Math.min(suggestion.priority, 45);
          }

          hasValidEncounter = true;
        }
      }

      // If no valid encounters remain for this suggestion, remove it completely.
      // (This will only happen if there were actually zero encounter details generated originally)
      if (!hasValidEncounter) {
        suggestions.splice(i, 1);
        // Also remove from localPids so it can be picked up by other suggestions if applicable
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
