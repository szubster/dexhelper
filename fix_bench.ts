import { writeFileSync } from 'fs';

const content = `import type { LocationAreaEncounter, VersionEncounterDetail } from 'pokenode-ts';
import { bench, describe } from 'vitest';

// Mock data
const mockEncounters: LocationAreaEncounter[] = [];
for (let i = 0; i < 100; i++) {
  mockEncounters.push({
    location_area: { name: \`location-area-\${i}\`, url: '' },
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
            method: { name: 'walk', url: '' },
          },
        ],
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
            method: { name: 'walk', url: '' },
          },
        ],
      },
      {
        version: { name: 'yellow', url: '' },
        max_chance: 100,
        encounter_details: [],
      },
      {
        version: { name: 'gold', url: '' },
        max_chance: 100,
        encounter_details: [],
      },
      {
        version: { name: 'silver', url: '' },
        max_chance: 100,
        encounter_details: [],
      },
      {
        version: { name: 'crystal', url: '' },
        max_chance: 100,
        encounter_details: [],
      },
    ],
  });
}

const staticEncounters: Record<number, Record<string, string[]>> = {};
const pokemonId = 1;

function getLocationsForVersionOriginal(version: string, encounters: LocationAreaEncounter[]) {
  const locations: { name: string; details: string }[] = [];

  const staticData = staticEncounters[pokemonId];
  if (staticData?.[version]) {
    staticData[version]?.forEach((loc) => {
      locations.push({ name: loc, details: 'Static Encounter / Gift / Trade' });
    });
  }

  encounters.forEach((enc) => {
    const versionDetail = enc.version_details.find((vd) => vd.version.name === version);
    if (versionDetail) {
      const name = enc.location_area.name
        .replace(/-/g, ' ')
        .replace(/\\b\\w/g, (l) => l.toUpperCase())
        .replace(' Area', '')
        .replace('Kanto ', '')
        .replace('Johto ', '');

      const methodMap = new Map<string, { chance: number; min: number; max: number; conditions: string[] }>();
      versionDetail.encounter_details.forEach((detail) => {
        const method = detail.method.name.replace(/-/g, ' ');
        const conditions = detail.condition_values.map((cv) => cv.name.replace(/-/g, ' '));
        const key = \`\${method}\${conditions.length > 0 ? \` (\${conditions.join(', ')})\` : ''}\`;

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
        const lvl = data.min === data.max ? \`Lv \${data.min}\` : \`Lv \${data.min}-\${data.max}\`;
        return \`\${data.chance}% chance, \${lvl} (\${key})\`;
      });

      locations.push({ name, details: detailStrings.join(' | ') });
    }
  });

  return locations;
}

function _getLocationsForVersionOptimizedMap(version: string, encounters: LocationAreaEncounter[]) {
  const locations: { name: string; details: string }[] = [];

  const staticData = staticEncounters[pokemonId];
  if (staticData?.[version]) {
    staticData[version]?.forEach((loc) => {
      locations.push({ name: loc, details: 'Static Encounter / Gift / Trade' });
    });
  }

  encounters.forEach((_enc) => {
    // Intentionally empty logic since it's unused testing structure
  });
}

function fullComponentMapOptimization(encounters: LocationAreaEncounter[]) {
  const encountersWithMap = encounters.map((enc) => {
    const versionMap = new Map<string, VersionEncounterDetail>();
    enc.version_details.forEach((vd) => {
      versionMap.set(vd.version.name, vd);
    });
    return { ...enc, versionMap };
  });

  const getLocations = (version: string) => {
    const locations: { name: string; details: string }[] = [];
    encountersWithMap.forEach((enc) => {
      const versionDetail = enc.versionMap.get(version);
      if (versionDetail) {
        const _name = enc.location_area.name
          .replace(/-/g, ' ')
          .replace(/\\b\\w/g, (l) => l.toUpperCase())
          .replace(' Area', '')
          .replace('Kanto ', '')
          .replace('Johto ', '');
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

function fullComponentMapOptimizationV2(encounters: LocationAreaEncounter[]) {
  const versionDetailsMap = new Map<string, { enc: LocationAreaEncounter; vd: VersionEncounterDetail }[]>();
  encounters.forEach((enc) => {
    enc.version_details.forEach((vd) => {
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
        .replace(/\\b\\w/g, (l) => l.toUpperCase())
        .replace(' Area', '')
        .replace('Kanto ', '')
        .replace('Johto ', '');

      const methodMap = new Map<string, { chance: number; min: number; max: number; conditions: string[] }>();
      vd.encounter_details.forEach((detail) => {
        const method = detail.method.name.replace(/-/g, ' ');
        const conditions = detail.condition_values.map((cv) => cv.name.replace(/-/g, ' '));
        const key = \`\${method}\${conditions.length > 0 ? \` (\${conditions.join(', ')})\` : ''}\`;

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
        const lvl = data.min === data.max ? \`Lv \${data.min}\` : \`Lv \${data.min}-\${data.max}\`;
        return \`\${data.chance}% chance, \${lvl} (\${key})\`;
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

function memoizedHookStyleOptimization(encounters: LocationAreaEncounter[]) {
  const versionLocationsMap = new Map<string, { name: string; details: string }[]>();

  encounters.forEach((enc) => {
    const name = enc.location_area.name
        .replace(/-/g, ' ')
        .replace(/\\b\\w/g, (l) => l.toUpperCase())
        .replace(' Area', '')
        .replace('Kanto ', '')
        .replace('Johto ', '');

    enc.version_details.forEach((vd) => {
      const versionName = vd.version.name;
      const methodMap = new Map<string, { chance: number; min: number; max: number; conditions: string[] }>();

      vd.encounter_details.forEach((detail) => {
        const method = detail.method.name.replace(/-/g, ' ');
        const conditions = detail.condition_values.map((cv) => cv.name.replace(/-/g, ' '));
        const key = \`\${method}\${conditions.length > 0 ? \` (\${conditions.join(', ')})\` : ''}\`;

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
        const lvl = data.min === data.max ? \`Lv \${data.min}\` : \`Lv \${data.min}-\${data.max}\`;
        return \`\${data.chance}% chance, \${lvl} (\${key})\`;
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

function hookPrecalculatedMap(encounters: LocationAreaEncounter[]) {
  const versionMap = new Map<string, { name: string; details: string }[]>();

  encounters.forEach((enc) => {
    const name = enc.location_area.name
      .replace(/-/g, ' ')
      .replace(/\\b\\w/g, (l) => l.toUpperCase())
      .replace(' Area', '')
      .replace('Kanto ', '')
      .replace('Johto ', '');

    enc.version_details.forEach((vd) => {
      const methodMap = new Map<string, { chance: number; min: number; max: number; conditions: string[] }>();
      vd.encounter_details.forEach((detail) => {
        const method = detail.method.name.replace(/-/g, ' ');
        const conditions = detail.condition_values.map((cv) => cv.name.replace(/-/g, ' '));
        const key = \`\${method}\${conditions.length > 0 ? \` (\${conditions.join(', ')})\` : ''}\`;

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
        const lvl = data.min === data.max ? \`Lv \${data.min}\` : \`Lv \${data.min}-\${data.max}\`;
        return \`\${data.chance}% chance, \${lvl} (\${key})\`;
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
    if (staticData?.[version]) {
      staticData[version]?.forEach((loc) => {
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

function _memoizedHookStyleOptimizationV2(encounters: LocationAreaEncounter[]) {
  const versionLocationsMap = new Map<string, { name: string; details: string }[]>();

  encounters.forEach((enc) => {
    const name = enc.location_area.name
        .replace(/-/g, ' ')
        .replace(/\\b\\w/g, (l) => l.toUpperCase())
        .replace(' Area', '')
        .replace('Kanto ', '')
        .replace('Johto ', '');

    enc.version_details.forEach((vd) => {
      const versionName = vd.version.name;
      const methodMap = new Map<string, { chance: number; min: number; max: number; conditions: string[] }>();

      vd.encounter_details.forEach((detail) => {
        const method = detail.method.name.replace(/-/g, ' ');
        const conditions = detail.condition_values.map((cv) => cv.name.replace(/-/g, ' '));
        const key = \`\${method}\${conditions.length > 0 ? \` (\${conditions.join(', ')})\` : ''}\`;

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
        const lvl = data.min === data.max ? \`Lv \${data.min}\` : \`Lv \${data.min}-\${data.max}\`;
        return \`\${data.chance}% chance, \${lvl} (\${key})\`;
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

  bench('optimized map of lists', () => {
    fullComponentMapOptimizationV2(mockEncounters);
  });

  bench('fully pre-calculated map', () => {
    memoizedHookStyleOptimization(mockEncounters);
  });

  bench('hook precalculated map', () => {
    hookPrecalculatedMap(mockEncounters);
  });
});
`

writeFileSync('tests/benchmarks/getLocationsForVersion.bench.ts', content);
