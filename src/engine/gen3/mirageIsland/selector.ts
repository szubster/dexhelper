import type { Gen3SaveData } from '../../saveParser/parsers/common.js';

export interface MirageIslandMatch {
  found: boolean;
  speciesId?: number;
  location?: string;
}

export function getMirageIslandMatch(saveData: Gen3SaveData): MirageIslandMatch {
  // Check Party
  if (saveData.partyDetails) {
    for (let i = 0; i < saveData.partyDetails.length; i++) {
      const pokemon = saveData.partyDetails[i];
      if (pokemon?.isMirageIslandKey) {
        return {
          found: true,
          speciesId: pokemon.speciesId,
          location: 'Party',
        };
      }
    }
  }

  // Check PC
  if (saveData.pcDetails) {
    for (let i = 0; i < saveData.pcDetails.length; i++) {
      const pokemon = saveData.pcDetails[i];
      if (pokemon?.isMirageIslandKey) {
        return {
          found: true,
          speciesId: pokemon.speciesId,
          location: pokemon.storageLocation || `Box ${Math.floor(i / 30) + 1}`,
        };
      }
    }
  }

  return { found: false };
}
