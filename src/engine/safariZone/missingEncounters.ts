import { Gen1SafariZone } from '../data/gen1/safariZone';
import { HoennSafariZone, KantoSafariZoneGen3 } from '../data/gen3/safariZone';
import type { SafariArea, SafariEncounter } from '../data/shared/safariZoneTypes';
import type { SaveData } from '../saveParser/parsers/common';

/**
 * Gets the static Safari Zone areas configuration for a given game version.
 */
export function getSafariAreasForVersion(gameVersion: SaveData['gameVersion']): SafariArea[] {
  if (gameVersion === 'red' || gameVersion === 'blue' || gameVersion === 'yellow') {
    return Gen1SafariZone;
  }
  if (gameVersion === 'ruby' || gameVersion === 'sapphire' || gameVersion === 'emerald') {
    return HoennSafariZone;
  }
  if (gameVersion === 'firered' || gameVersion === 'leafgreen') {
    return KantoSafariZoneGen3;
  }
  return [];
}

/**
 * Calculates missing Safari Zone encounters based on the player's current save data.
 * Filters static Safari Zone encounter tables to show only Pokémon that the player
 * does not currently own (in Pokedex, Party, or PC).
 *
 * @param saveData - The parsed save file data.
 * @returns A list of Safari Zone areas containing the missing encounters for the player's game version.
 */
export function getMissingSafariEncounters(saveData: SaveData): SafariArea[] {
  const missingAreas: SafariArea[] = [];
  const { gameVersion, owned, party, pc } = saveData;

  const encounterAreas = getSafariAreasForVersion(gameVersion);
  if (encounterAreas.length === 0) {
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

/**
 * Legacy wrapper for Gen 1 missing Safari encounters.
 */
export function getMissingGen1SafariEncounters(saveData: SaveData): SafariArea[] {
  if (saveData.generation !== 1) return [];
  return getMissingSafariEncounters(saveData);
}

/**
 * Legacy wrapper for Gen 3 missing Safari encounters.
 */
export function getMissingGen3SafariEncounters(saveData: SaveData): SafariArea[] {
  if (saveData.generation !== 3) return [];
  return getMissingSafariEncounters(saveData);
}
