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
