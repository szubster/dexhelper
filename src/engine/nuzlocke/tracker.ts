import type { PokemonInstance, SaveData } from '../saveParser/parsers/common';

export interface LocationEncounters {
  locationId: number;
  locationName: string;
  encounters: PokemonInstance[];
}

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

export function detectNuzlockeViolations(saveData: SaveData): LocationEncounters[] {
  return aggregateEncountersByLocation(saveData).filter((location) => location.encounters.length > 1);
}

export function getDeadPokemon(saveData: SaveData): PokemonInstance[] {
  return (saveData.partyDetails || []).filter((p) => p.currentHp === 0);
}

export function getGraveyardPokemon(saveData: SaveData, graveyardBox: string): PokemonInstance[] {
  return (saveData.pcDetails || []).filter((p) => p.storageLocation === graveyardBox);
}
