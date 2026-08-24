import type { SaveData } from '../../saveParser/index';

export interface SynergyTradeOpportunity {
  sourceSaveId: string;
  targetSaveId: string;
  pokemonId: number;
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

  for (let i = 0; i < saveIds.length; i++) {
    const sourceSaveId = saveIds[i] as string;
    const sourceSave = saves[sourceSaveId];
    if (!sourceSave) continue;

    for (let j = 0; j < saveIds.length; j++) {
      if (i === j) continue;

      const targetSaveId = saveIds[j] as string;
      const targetSave = saves[targetSaveId];
      if (!targetSave) continue;

      for (const pokemonId of sourceSave.owned) {
        if (!targetSave.owned.has(pokemonId)) {
          opportunities.push({
            sourceSaveId,
            targetSaveId,
            pokemonId,
          });
        }
      }
    }
  }

  return { opportunities };
}
