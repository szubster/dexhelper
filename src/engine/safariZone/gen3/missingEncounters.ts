import { HoennSafariZone, KantoSafariZoneGen3 } from '../../data/gen3/safariZone';
import type { SafariArea, SafariEncounter } from '../../data/shared/safariZoneTypes';
import type { SaveData } from '../../saveParser/parsers/common';

/**
 * Calculates missing Safari Zone encounters based on the player's current Gen 3 save data.
 * It filters the static Gen 3 Safari Zone encounter tables (Hoenn or Kanto) to show only Pokémon
 * that the player does not currently own (in Pokedex, Party, or PC).
 *
 * @param saveData - The parsed Gen 3 save file data.
 * @returns A list of Safari Zone areas containing the missing encounters for the player's game version.
 */
export function getMissingGen3SafariEncounters(saveData: SaveData): SafariArea[] {
  const missingAreas: SafariArea[] = [];
  const { gameVersion, owned, party, pc } = saveData;

  let encounterAreas: SafariArea[] = [];

  if (gameVersion === 'ruby' || gameVersion === 'sapphire' || gameVersion === 'emerald') {
    encounterAreas = HoennSafariZone;
  } else if (gameVersion === 'firered' || gameVersion === 'leafgreen') {
    encounterAreas = KantoSafariZoneGen3;
  } else {
    return [];
  }

  for (const area of encounterAreas) {
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
