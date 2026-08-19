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

  // ⚡ Bolt: Eliminate O(N) array spread allocation by using imperative loops
  const processInstances = (instances: PokemonInstance[]) => {
    for (let i = 0; i < instances.length; i++) {
      const instance = instances[i];
      const caughtData = instance?.caughtData;
      if (caughtData && (caughtData.location !== undefined || caughtData.metLocation !== undefined)) {
        const location = caughtData.metLocation ?? caughtData.location;
        if (location === undefined) continue;

        const locationName = caughtData.locationName;

        let entry = locationMap.get(location);
        if (!entry) {
          entry = {
            locationId: location,
            locationName: locationName || `Location ${location}`,
            encounters: [],
          };
          locationMap.set(location, entry);
        }
        if (instance) {
          entry.encounters.push(instance);
        }
      }
    }
  };

  if (saveData.partyDetails) {
    processInstances(saveData.partyDetails);
  }

  if (saveData.pcDetails) {
    processInstances(saveData.pcDetails);
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
  // ⚡ Bolt: Eliminate O(N) intermediate array allocation and .filter() overhead
  const violations: LocationEncounters[] = [];
  const aggregates = aggregateEncountersByLocation(saveData);
  for (let i = 0; i < aggregates.length; i++) {
    const location = aggregates[i];
    if (location && location.encounters.length > 1) {
      violations.push(location);
    }
  }
  return violations;
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
  // ⚡ Bolt: Eliminate O(N) intermediate array allocation and .filter() overhead
  const dead: PokemonInstance[] = [];
  if (saveData.partyDetails) {
    for (let i = 0; i < saveData.partyDetails.length; i++) {
      const p = saveData.partyDetails[i];
      if (p && p.currentHp === 0) {
        dead.push(p);
      }
    }
  }
  return dead;
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
  // ⚡ Bolt: Eliminate O(N) intermediate array allocation and .filter() overhead
  const dead: PokemonInstance[] = [];
  if (saveData.pcDetails) {
    for (let i = 0; i < saveData.pcDetails.length; i++) {
      const p = saveData.pcDetails[i];
      if (p && p.storageLocation === graveyardBox) {
        dead.push(p);
      }
    }
  }
  return dead;
}

/**
 * Aggregates caught Pokémon by their location (using metLocation as primary for Gen 3)
 * and identifies the first catch for each distinct location.
 *
 * @param saveData - The parsed save data.
 * @returns An array of locations with only the first catch in the encounters array.
 */
export function aggregateFirstCatchByRoute(saveData: SaveData): LocationEncounters[] {
  const aggregates = aggregateEncountersByLocation(saveData);

  const firstCatches: LocationEncounters[] = [];

  for (let i = 0; i < aggregates.length; i++) {
    const loc = aggregates[i];
    if (!loc || loc.encounters.length === 0) continue;

    // Determine the first catch based on storageLocation and slot
    let firstEncounter = loc.encounters[0];
    if (!firstEncounter) continue;

    for (let j = 1; j < loc.encounters.length; j++) {
      const current = loc.encounters[j];
      if (!current) continue;

      const isFirstBetter = compareEncounters(firstEncounter, current);
      if (!isFirstBetter) {
        firstEncounter = current;
      }
    }

    firstCatches.push({
      locationId: loc.locationId,
      locationName: loc.locationName,
      encounters: [firstEncounter],
    });
  }

  return firstCatches;
}

/**
 * Helper to compare two PokemonInstances to find which was caught earlier.
 * Party comes first.
 * Then PC Boxes ordered by box number ascending, then by slot ascending.
 *
 * @returns true if a is 'earlier' than b, false otherwise.
 */
function compareEncounters(a: PokemonInstance, b: PokemonInstance): boolean {
  if (a.storageLocation === 'Party' && b.storageLocation !== 'Party') return true;
  if (b.storageLocation === 'Party' && a.storageLocation !== 'Party') return false;

  const aBoxMatch = a.storageLocation ? a.storageLocation.match(/Box (\d+)/) : null;
  const bBoxMatch = b.storageLocation ? b.storageLocation.match(/Box (\d+)/) : null;

  const aBoxNum = aBoxMatch?.[1] ? parseInt(aBoxMatch[1], 10) : 999;
  const bBoxNum = bBoxMatch?.[1] ? parseInt(bBoxMatch[1], 10) : 999;

  if (aBoxNum !== bBoxNum) {
    return aBoxNum < bBoxNum;
  }

  const aSlot = a.slot ?? 999;
  const bSlot = b.slot ?? 999;

  return aSlot <= bSlot;
}
