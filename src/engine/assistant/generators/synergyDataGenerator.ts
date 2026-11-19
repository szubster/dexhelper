import { getGameExclusives } from '../../exclusives/index';
import type { SaveData } from '../../saveParser/index';

export interface SynergyTradeOpportunity {
  sourceSaveId: string;
  targetSaveId: string;
  pokemonId: number;
  priority: number;
  isExclusive: boolean;
}

export interface SynergyDataPayload {
  opportunities: SynergyTradeOpportunity[];
}

/**
 * Aggregates state from multiple loaded games and formats them into
 * a structured data payload highlighting potential trade opportunities.
 *
 * @param saves - A dictionary of SaveData objects keyed by save ID.
 * @returns A structured payload containing trade opportunities.
 */
export function generateSynergyData(saves: Record<string, SaveData>): SynergyDataPayload {
  const opportunities: SynergyTradeOpportunity[] = [];
  const saveIds = Object.keys(saves);

  // ⚡ Bolt: Precompute game exclusives as Set<number> to optimize inner loop lookups from O(N * M) to O(1) Set.has() checks.
  const targetExclusivesMap: Record<string, Set<number>> = {};
  for (const id of saveIds) {
    const save = saves[id];
    if (save) {
      targetExclusivesMap[id] = new Set(getGameExclusives(save).missing);
    }
  }

  for (let i = 0; i < saveIds.length; i++) {
    const sourceSaveId = saveIds[i] as string;
    const sourceSave = saves[sourceSaveId];
    if (!sourceSave) continue;

    for (let j = 0; j < saveIds.length; j++) {
      if (i === j) continue;

      const targetSaveId = saveIds[j] as string;
      const targetSave = saves[targetSaveId];
      if (!targetSave) continue;

      const missingExclusives = targetExclusivesMap[targetSaveId];

      for (const pokemonId of sourceSave.owned) {
        if (!targetSave.owned.has(pokemonId)) {
          const isExclusive = missingExclusives ? missingExclusives.has(pokemonId) : false;
          opportunities.push({
            sourceSaveId,
            targetSaveId,
            pokemonId,
            priority: isExclusive ? 100 : 50,
            isExclusive,
          });
        }
      }
    }
  }

  opportunities.sort((a, b) => b.priority - a.priority);

  return { opportunities };
}
