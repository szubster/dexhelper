import { getGenerationConfig } from '../../utils/generationConfig';
import type { SaveData } from '../saveParser/parsers/common';

export function getLivingDexGhosts(saveData: SaveData, regionalOnly = false): number[] {
  if (regionalOnly) {
    throw new Error('NotImplemented: Regional dex filtering is not yet supported.');
  }

  const genConfig = getGenerationConfig(saveData.generation);
  const maxDex = genConfig.maxDex;

  const physicalOwned = new Set<number>();

  for (const id of saveData.party) {
    if (id > 0 && id <= maxDex) {
      physicalOwned.add(id);
    }
  }

  for (const id of saveData.pc) {
    if (id > 0 && id <= maxDex) {
      physicalOwned.add(id);
    }
  }

  const ghosts: number[] = [];
  for (let i = 1; i <= maxDex; i++) {
    if (!physicalOwned.has(i)) {
      ghosts.push(i);
    }
  }

  return ghosts;
}
