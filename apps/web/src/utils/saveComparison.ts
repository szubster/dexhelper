import type { SaveData } from '@dexhelper/engine/saveParser';

export interface SaveComparisonResult {
  save1Missing: number[];
  save2Missing: number[];
}

export interface TradePossibility {
  sourceSaveId: string;
  targetSaveId: string;
  speciesIds: number[];
}

export function compareSaves(save1: SaveData, save2: SaveData): SaveComparisonResult {
  const save1Missing: number[] = [];
  const save2Missing: number[] = [];

  for (const speciesId of save2.owned) {
    if (!save1.owned.has(speciesId)) {
      save1Missing.push(speciesId);
    }
  }

  for (const speciesId of save1.owned) {
    if (!save2.owned.has(speciesId)) {
      save2Missing.push(speciesId);
    }
  }

  return {
    save1Missing,
    save2Missing,
  };
}

export function findTradePossibilities(saves: Record<string, SaveData>): TradePossibility[] {
  const possibilities: TradePossibility[] = [];
  const saveIds = Object.keys(saves);

  for (let i = 0; i < saveIds.length; i++) {
    for (let j = 0; j < saveIds.length; j++) {
      if (i === j) continue;

      const sourceId = saveIds[i];
      const targetId = saveIds[j];

      if (!sourceId || !targetId) continue;

      const sourceSave = saves[sourceId];
      const targetSave = saves[targetId];

      if (sourceSave && targetSave) {
        const targetNeeds: number[] = [];

        for (const speciesId of sourceSave.owned) {
          if (!targetSave.owned.has(speciesId)) {
            targetNeeds.push(speciesId);
          }
        }

        if (targetNeeds.length > 0) {
          possibilities.push({
            sourceSaveId: sourceId,
            targetSaveId: targetId,
            speciesIds: targetNeeds,
          });
        }
      }
    }
  }

  return possibilities;
}
