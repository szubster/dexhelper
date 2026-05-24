import type { PokemonInstance, SaveData } from '../saveParser/parsers/common';

/**
 * Represents a grouping of Pokémon caught in a specific location.
 * Used to enforce the Nuzlocke 'One Catch per Route' rule.
 */
export interface LocationEncounters {
  locationId: number;
  locationName: string;
  encounters: PokemonInstance[];
}

/**
 * Aggregates all physically owned Pokémon (Party + PC) by the location where they were caught.
 *
 * @param saveData - The parsed save data.
 * @returns An array of locations and the Pokémon caught in them.
 *
 * @remarks
 * This function relies on the `caughtData.location` property, which is fully supported in
 * Generation 2 (Crystal) and forward. It is the core heuristic used to detect Nuzlocke
 * multiple-catch violations.
 */
export function aggregateEncountersByLocation(saveData: SaveData): LocationEncounters[] {
  const locationMap = new Map<number, LocationEncounters>();

  const allInstances = [...(saveData.partyDetails || []), ...(saveData.pcDetails || [])];

  for (const instance of allInstances) {
    if (instance.caughtData?.location) {
      const { location, locationName } = instance.caughtData;

      let entry = locationMap.get(location);
      if (!entry) {
        entry = {
          locationId: location,
          locationName: locationName || `Location ${location}`,
          encounters: [],
        };
        locationMap.set(location, entry);
      }
      entry.encounters.push(instance);
    }
  }

  return Array.from(locationMap.values());
}

/**
 * Scans the player's save data for violations of the 'One Catch per Route' Nuzlocke rule.
 *
 * @param saveData - The parsed save data.
 * @returns An array of locations where more than one Pokémon was caught.
 *
 * @remarks
 * Any location grouping that contains more than 1 Pokémon is flagged as a violation,
 * regardless of whether the Pokémon is currently in the party or PC.
 */
export function detectNuzlockeViolations(saveData: SaveData): LocationEncounters[] {
  return aggregateEncountersByLocation(saveData).filter((location) => location.encounters.length > 1);
}

/**
 * Retrieves any Pokémon in the player's active party that have fainted (0 HP).
 *
 * @param saveData - The parsed save data.
 * @returns An array of dead Pokémon instances.
 *
 * @remarks
 * In Nuzlocke rules, a fainted Pokémon is considered dead and must be released or permanently boxed.
 * This function only checks the active party, as Pokémon deposited in the PC have their HP fully restored.
 */
export function getDeadPokemon(saveData: SaveData): PokemonInstance[] {
  return (saveData.partyDetails || []).filter((p) => p.currentHp === 0);
}

/**
 * Retrieves all Pokémon stored in the player's designated Graveyard PC box.
 *
 * @param saveData - The parsed save data.
 * @param graveyardBox - The string identifier of the PC Box used as the graveyard (e.g., 'Box 14').
 * @returns An array of permanently dead Pokémon instances.
 *
 * @remarks
 * Because PC deposition restores a Pokémon's HP to full, death cannot be tracked
 * via `currentHp === 0` once boxed. Instead, this tracker relies on the player moving
 * dead Pokémon into a specific string-matched PC Box.
 */
export function getGraveyardPokemon(saveData: SaveData, graveyardBox: string): PokemonInstance[] {
  return (saveData.pcDetails || []).filter((p) => p.storageLocation === graveyardBox);
}
