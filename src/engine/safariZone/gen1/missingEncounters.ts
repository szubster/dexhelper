import { Gen1SafariZone } from '../../data/gen1/safariZone';
import type { SafariArea, SafariEncounter } from '../../data/shared/safariZoneTypes';
import type { SaveData } from '../../saveParser/parsers/common';

/**
 * Calculates missing Safari Zone encounters based on the player's current save data.
 * It filters the static Gen 1 Safari Zone encounter tables to show only Pokémon
 * that the player does not currently own (in Pokedex, Party, or PC).
 *
 * @param saveData - The parsed Gen 1 save file data.
 * @returns A list of Safari Zone areas containing the missing encounters for the player's game version.
 */
export function getMissingGen1SafariEncounters(saveData: SaveData): SafariArea[] {
  const missingAreas: SafariArea[] = [];
  const { gameVersion, owned, party, pc } = saveData;

  if (gameVersion !== 'red' && gameVersion !== 'blue' && gameVersion !== 'yellow') {
    return [];
  }

  for (const area of Gen1SafariZone) {
    const versionEncounters = area.encounters[gameVersion] || [];
    const missingEncounters: SafariEncounter[] = [];

    for (const encounter of versionEncounters) {
      const isOwned = owned.has(encounter.pokemon);
      const inParty = party.includes(encounter.pokemon);
      const inPc = pc.includes(encounter.pokemon);

      if (!isOwned && !inParty && !inPc) {
        missingEncounters.push(encounter);
      }
    }

    if (missingEncounters.length > 0) {
      missingAreas.push({
        name: area.name,
        encounters: {
          [gameVersion]: missingEncounters,
        },
      });
    }
  }

  return missingAreas;
}
