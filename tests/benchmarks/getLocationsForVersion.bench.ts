import { bench, describe } from 'vitest';
import type { LocationAreaEncounter, VersionEncounterDetail } from 'pokenode-ts';

// Mock data
const mockEncounters: LocationAreaEncounter[] = [];
for (let i = 0; i < 100; i++) {
  mockEncounters.push({
    location_area: { name: `location-area-${i}`, url: '' },
    version_details: [
      {
        version: { name: 'red', url: '' },
        max_chance: 100,
        encounter_details: [
          {
            min_level: 5,
            max_level: 10,
            condition_values: [],
            chance: 20,
            method: { name: 'walk', url: '' }
          }
        ]
      },
      {
        version: { name: 'blue', url: '' },
        max_chance: 100,
        encounter_details: [
          {
            min_level: 5,
            max_level: 10,
            condition_values: [],
            chance: 20,
            method: { name: 'walk', url: '' }
          }
        ]
      },
      {
        version: { name: 'yellow', url: '' },
        max_chance: 100,
        encounter_details: []
      },
      {
        version: { name: 'gold', url: '' },
        max_chance: 100,
        encounter_details: []
      },
      {
        version: { name: 'silver', url: '' },
        max_chance: 100,
        encounter_details: []
      },
      {
        version: { name: 'crystal', url: '' },
        max_chance: 100,
        encounter_details: []
      }
    ]
  });
}

const staticEncounters = {};
const pokemonId = 1;

function getLocationsForVersionOriginal(version: string, encounters: LocationAreaEncounter[]) {
  const locations: { name: string; details: string }[] = [];

  const staticData = staticEncounters[pokemonId];
  if (staticData?.[version as keyof typeof staticData]) {
    staticData[version as keyof typeof staticData]?.forEach((loc) => {
      locations.push({ name: loc, details: 'Static Encounter / Gift / Trade' });
    });
  }

  encounters.forEach((enc) => {
    const versionDetail = enc.version_details.find((vd) => vd.version.name === version);
    if (versionDetail) {
      const name = enc.location_area.name
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase())
        .replace(' Area', '')
        .replace('Kanto ', '')
        .replace('Johto ', '');

      const methodMap = new Map<string, { chance: number; min: number; max: number; conditions: string[] }>();
      versionDetail.encounter_details.forEach((detail) => {
        const method = detail.method.name.replace(/-/g, ' ');
        const conditions = detail.condition_values.map((cv) => cv.name.replace(/-/g, ' '));
        const key = `${method}${conditions.length > 0 ? ` (${conditions.join(', ')})` : ''}`;

        const existing = methodMap.get(key);
        if (existing) {
          existing.chance += detail.chance;
          existing.min = Math.min(existing.min, detail.min_level);
          existing.max = Math.max(existing.max, detail.max_level);
        } else {
          methodMap.set(key, {
            chance: detail.chance,
            min: detail.min_level,
            max: detail.max_level,
            conditions,
          });
        }
      });

      const detailStrings = Array.from(methodMap.entries()).map(([key, data]) => {
        const lvl = data.min === data.max ? `Lv ${data.min}` : `Lv ${data.min}-${data.max}`;
        return `${data.chance}% chance, ${lvl} (${key})`;
      });

      locations.push({ name, details: detailStrings.join(' | ') });
    }
  });

  return locations;
}

function getLocationsForVersionOptimizedMap(version: string, encounters: LocationAreaEncounter[]) {
  const locations: { name: string; details: string }[] = [];

  const staticData = staticEncounters[pokemonId];
  if (staticData?.[version as keyof typeof staticData]) {
    staticData[version as keyof typeof staticData]?.forEach((loc) => {
      locations.push({ name: loc, details: 'Static Encounter / Gift / Trade' });
    });
  }

  encounters.forEach((enc) => {
    // Optimized: using a Map? But we can't really pre-build the Map without an extra pass, unless it's memoized outside
    // The instructions say: "encounters is iterated and then enc.version_details.find(...) is called for each iteration. It could be optimized using a Map for O(1) lookups."

    // We can just convert enc.version_details to a Map once for each encounter... but wait, recreating a Map is O(N).
    // What if we do it inline? That wouldn't be faster unless the Map is reused.
    // Let's implement the Map optimization inside the getLocationsForVersion closure as suggested.
    // Actually, if we just build a Map outside... wait, getLocationsForVersion is a callback inside useMemo.
    // We can construct the map once per `encounters` change in React.useMemo.

    // Let's test the inner Map vs array find.
  });
}

function fullComponentMapOptimization(encounters: LocationAreaEncounter[]) {
  // We simulate React.useMemo(() => { ... return encounters.map(...) }, [encounters])
  // Create a map of version name to detail for each encounter, or just a Map for getLocationsForVersion.

  // The user says: "encounters is iterated and then enc.version_details.find(...) is called for each iteration. It could be optimized using a Map for O(1) lookups."
  // Wait! The user means pre-processing the encounters array into a Map where keys are versions, and values are the version details? Or keys are encounters and values are Map of versions?
  // Let's pre-process encounters:
  const encountersWithMap = encounters.map(enc => {
    const versionMap = new Map<string, VersionEncounterDetail>();
    enc.version_details.forEach(vd => versionMap.set(vd.version.name, vd));
    return { ...enc, versionMap };
  });

  // Then inside getLocationsForVersion:
  const getLocations = (version: string) => {
    const locations: { name: string; details: string }[] = [];
    encountersWithMap.forEach((enc) => {
      const versionDetail = enc.versionMap.get(version);
      if (versionDetail) {
        const name = enc.location_area.name
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase())
          .replace(' Area', '')
          .replace('Kanto ', '')
          .replace('Johto ', '');
        // ... (rest is same)
      }
    });
    return locations;
  };

  getLocations('red');
  getLocations('blue');
  getLocations('yellow');
  getLocations('gold');
  getLocations('silver');
  getLocations('crystal');
}

describe('getLocationsForVersion', () => {
  bench('original', () => {
    getLocationsForVersionOriginal('red', mockEncounters);
    getLocationsForVersionOriginal('blue', mockEncounters);
    getLocationsForVersionOriginal('yellow', mockEncounters);
    getLocationsForVersionOriginal('gold', mockEncounters);
    getLocationsForVersionOriginal('silver', mockEncounters);
    getLocationsForVersionOriginal('crystal', mockEncounters);
  });

  bench('optimized map per encounter', () => {
    fullComponentMapOptimization(mockEncounters);
  });
});

function fullComponentMapOptimizationV2(encounters: LocationAreaEncounter[]) {
  // Try another approach: a single map for ALL versions
  // Map<versionName, LocationAreaEncounter[]> or Map<versionName, VersionEncounterDetail[]>

  const versionDetailsMap = new Map<string, { enc: LocationAreaEncounter; vd: VersionEncounterDetail }[]>();
  encounters.forEach((enc) => {
    enc.version_details.forEach(vd => {
      let list = versionDetailsMap.get(vd.version.name);
      if (!list) {
        list = [];
        versionDetailsMap.set(vd.version.name, list);
      }
      list.push({ enc, vd });
    });
  });

  const getLocations = (version: string) => {
    const locations: { name: string; details: string }[] = [];
    const detailsList = versionDetailsMap.get(version) || [];

    detailsList.forEach(({ enc, vd }) => {
      const name = enc.location_area.name
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase())
        .replace(' Area', '')
        .replace('Kanto ', '')
        .replace('Johto ', '');

      const methodMap = new Map<string, { chance: number; min: number; max: number; conditions: string[] }>();
      vd.encounter_details.forEach((detail) => {
        const method = detail.method.name.replace(/-/g, ' ');
        const conditions = detail.condition_values.map((cv) => cv.name.replace(/-/g, ' '));
        const key = `${method}${conditions.length > 0 ? ` (${conditions.join(', ')})` : ''}`;

        const existing = methodMap.get(key);
        if (existing) {
          existing.chance += detail.chance;
          existing.min = Math.min(existing.min, detail.min_level);
          existing.max = Math.max(existing.max, detail.max_level);
        } else {
          methodMap.set(key, {
            chance: detail.chance,
            min: detail.min_level,
            max: detail.max_level,
            conditions,
          });
        }
      });

      const detailStrings = Array.from(methodMap.entries()).map(([key, data]) => {
        const lvl = data.min === data.max ? `Lv ${data.min}` : `Lv ${data.min}-${data.max}`;
        return `${data.chance}% chance, ${lvl} (${key})`;
      });

      locations.push({ name, details: detailStrings.join(' | ') });
    });
    return locations;
  };

  getLocations('red');
  getLocations('blue');
  getLocations('yellow');
  getLocations('gold');
  getLocations('silver');
  getLocations('crystal');
}

bench('optimized map of lists', () => {
  fullComponentMapOptimizationV2(mockEncounters);
});

function memoizedHookStyleOptimization(encounters: LocationAreaEncounter[]) {
  // Let's mimic what React would do:
  // We can pre-calculate the whole result object for all versions that exist in encounters
  // because encounters doesn't change unless pokemonId changes.
  // Then getLocationsForVersion just does a Map lookup!

  const versionLocationsMap = new Map<string, { name: string; details: string }[]>();

  encounters.forEach((enc) => {
    // Process string replacement once per location
    const name = enc.location_area.name
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase())
        .replace(' Area', '')
        .replace('Kanto ', '')
        .replace('Johto ', '');

    enc.version_details.forEach(vd => {
      const versionName = vd.version.name;
      const methodMap = new Map<string, { chance: number; min: number; max: number; conditions: string[] }>();

      vd.encounter_details.forEach((detail) => {
        const method = detail.method.name.replace(/-/g, ' ');
        const conditions = detail.condition_values.map((cv) => cv.name.replace(/-/g, ' '));
        const key = `${method}${conditions.length > 0 ? ` (${conditions.join(', ')})` : ''}`;

        const existing = methodMap.get(key);
        if (existing) {
          existing.chance += detail.chance;
          existing.min = Math.min(existing.min, detail.min_level);
          existing.max = Math.max(existing.max, detail.max_level);
        } else {
          methodMap.set(key, {
            chance: detail.chance,
            min: detail.min_level,
            max: detail.max_level,
            conditions,
          });
        }
      });

      const detailStrings = Array.from(methodMap.entries()).map(([key, data]) => {
        const lvl = data.min === data.max ? `Lv ${data.min}` : `Lv ${data.min}-${data.max}`;
        return `${data.chance}% chance, ${lvl} (${key})`;
      });

      let locations = versionLocationsMap.get(versionName);
      if (!locations) {
        locations = [];
        versionLocationsMap.set(versionName, locations);
      }
      locations.push({ name, details: detailStrings.join(' | ') });
    });
  });

  const getLocations = (version: string) => {
    const locations: { name: string; details: string }[] = [];
    // Static locations logic goes here...

    const dynamicLocations = versionLocationsMap.get(version);
    if (dynamicLocations) {
      locations.push(...dynamicLocations);
    }
    return locations;
  };

  getLocations('red');
  getLocations('blue');
  getLocations('yellow');
  getLocations('gold');
  getLocations('silver');
  getLocations('crystal');
}

bench('fully pre-calculated map', () => {
  memoizedHookStyleOptimization(mockEncounters);
});

function hookPrecalculatedMap(encounters: LocationAreaEncounter[]) {
  // Let's test the memoized approach: pre-calculating the map string inside the useMemo,
  // then getLocationsForVersion just queries the map.

  // 1. Build a Map where keys are versionName and values are array of Location Details.
  const versionMap = new Map<string, { name: string; details: string }[]>();

  encounters.forEach((enc) => {
    // String replaces on location name
    const name = enc.location_area.name
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase())
      .replace(' Area', '')
      .replace('Kanto ', '')
      .replace('Johto ', '');

    enc.version_details.forEach((vd) => {
      const methodMap = new Map<string, { chance: number; min: number; max: number; conditions: string[] }>();
      vd.encounter_details.forEach((detail) => {
        const method = detail.method.name.replace(/-/g, ' ');
        const conditions = detail.condition_values.map((cv) => cv.name.replace(/-/g, ' '));
        const key = `${method}${conditions.length > 0 ? ` (${conditions.join(', ')})` : ''}`;

        const existing = methodMap.get(key);
        if (existing) {
          existing.chance += detail.chance;
          existing.min = Math.min(existing.min, detail.min_level);
          existing.max = Math.max(existing.max, detail.max_level);
        } else {
          methodMap.set(key, {
            chance: detail.chance,
            min: detail.min_level,
            max: detail.max_level,
            conditions,
          });
        }
      });

      const detailStrings = Array.from(methodMap.entries()).map(([key, data]) => {
        const lvl = data.min === data.max ? `Lv ${data.min}` : `Lv ${data.min}-${data.max}`;
        return `${data.chance}% chance, ${lvl} (${key})`;
      });

      const versionName = vd.version.name;
      let locs = versionMap.get(versionName);
      if (!locs) {
        locs = [];
        versionMap.set(versionName, locs);
      }
      locs.push({ name, details: detailStrings.join(' | ') });
    });
  });

  const getLocationsForVersion = (version: string) => {
    const locations: { name: string; details: string }[] = [];

    const staticData = staticEncounters[pokemonId];
    if (staticData?.[version as keyof typeof staticData]) {
      staticData[version as keyof typeof staticData]?.forEach((loc) => {
        locations.push({ name: loc, details: 'Static Encounter / Gift / Trade' });
      });
    }

    const versionLocations = versionMap.get(version);
    if (versionLocations) {
      locations.push(...versionLocations);
    }
    return locations;
  };

  getLocationsForVersion('red');
  getLocationsForVersion('blue');
  getLocationsForVersion('yellow');
  getLocationsForVersion('gold');
  getLocationsForVersion('silver');
  getLocationsForVersion('crystal');
}

bench('hook precalculated map', () => {
  hookPrecalculatedMap(mockEncounters);
});

function memoizedHookStyleOptimizationV2(encounters: LocationAreaEncounter[]) {
  // Let's mimic what React would do:

  const versionLocationsMap = new Map<string, { name: string; details: string }[]>();

  encounters.forEach((enc) => {
    // Process string replacement once per location
    const name = enc.location_area.name
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase())
        .replace(' Area', '')
        .replace('Kanto ', '')
        .replace('Johto ', '');

    enc.version_details.forEach(vd => {
      const versionName = vd.version.name;
      const methodMap = new Map<string, { chance: number; min: number; max: number; conditions: string[] }>();

      vd.encounter_details.forEach((detail) => {
        const method = detail.method.name.replace(/-/g, ' ');
        const conditions = detail.condition_values.map((cv) => cv.name.replace(/-/g, ' '));
        const key = `${method}${conditions.length > 0 ? ` (${conditions.join(', ')})` : ''}`;

        const existing = methodMap.get(key);
        if (existing) {
          existing.chance += detail.chance;
          existing.min = Math.min(existing.min, detail.min_level);
          existing.max = Math.max(existing.max, detail.max_level);
        } else {
          methodMap.set(key, {
            chance: detail.chance,
            min: detail.min_level,
            max: detail.max_level,
            conditions,
          });
        }
      });

      const detailStrings = Array.from(methodMap.entries()).map(([key, data]) => {
        const lvl = data.min === data.max ? `Lv ${data.min}` : `Lv ${data.min}-${data.max}`;
        return `${data.chance}% chance, ${lvl} (${key})`;
      });

      let locations = versionLocationsMap.get(versionName);
      if (!locations) {
        locations = [];
        versionLocationsMap.set(versionName, locations);
      }
      locations.push({ name, details: detailStrings.join(' | ') });
    });
  });

  const getLocations = (version: string) => {
    const locations: { name: string; details: string }[] = [];
    // Static locations logic goes here...

    const dynamicLocations = versionLocationsMap.get(version);
    if (dynamicLocations) {
      locations.push(...dynamicLocations);
    }
    return locations;
  };

  getLocations('red');
  getLocations('blue');
  getLocations('yellow');
  getLocations('gold');
  getLocations('silver');
  getLocations('crystal');
}
