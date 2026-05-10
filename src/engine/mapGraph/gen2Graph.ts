import type { UnifiedLocation } from '../../db/schema';

export interface MapNode {
  id: number;
  name: string;
  connections: number[];
}

export const gen2MapGraph: Record<number, MapNode> = {
  // Johto locations (using encoded group/id)
  0x0301: { id: 0x0301, name: 'New Bark Town', connections: [0x1803] }, // Rd 29
  0x0302: { id: 0x0302, name: 'Cherrygrove City', connections: [0x1803, 0x1a01] }, // Rd 29, Rd 30
  0x0303: { id: 0x0303, name: 'Violet City', connections: [0x1a02, 0x0a02] }, // Rd 31, Rd 32
  0x0304: { id: 0x0304, name: 'Azalea Town', connections: [0x0a03, 0x0334, 0x0328] }, // Rd 33, Well, Ilex
  0x0305: { id: 0x0305, name: 'Cianwood City', connections: [0x1602] }, // Rd 41
  0x0306: { id: 0x0306, name: 'Goldenrod City', connections: [0x0a04, 0x0b01] }, // Rd 34, Rd 35
  0x0307: { id: 0x0307, name: 'Olivine City', connections: [0x010a, 0x1601] }, // Rd 39, Rd 40
  0x0308: { id: 0x0308, name: 'Ecruteak City', connections: [0x0109, 0x0204] }, // Rd 38, Rd 42
  0x0309: { id: 0x0309, name: 'Mahogany Town', connections: [0x0204, 0x0903, 0x0205] }, // Rd 42, Rd 43, Rd 44
  0x030a: { id: 0x030a, name: 'Lake of Rage', connections: [0x0903] }, // Rd 43
  0x030b: { id: 0x030b, name: 'Blackthorn City', connections: [0x033d, 0x0508] }, // Ice Path, Rd 45
  0x030f: { id: 0x030f, name: 'National Park', connections: [0x0b01] }, // Rd 35
  0x0316: { id: 0x0316, name: 'Ruins of Alph', connections: [0x0a02] }, // Rd 32
  0x0325: { id: 0x0325, name: 'Union Cave', connections: [0x0a02, 0x0a03] }, // Rd 32, Rd 33
  0x0328: { id: 0x0328, name: 'Slowpoke Well', connections: [0x0304] }, // Azalea
  0x0334: { id: 0x0334, name: 'Ilex Forest', connections: [0x0304, 0x0a04] }, // Azalea, Rd 34
  0x0339: { id: 0x0339, name: 'Mt. Mortar', connections: [0x0204] }, // Rd 42
  0x033d: { id: 0x033d, name: 'Ice Path', connections: [0x0205, 0x030b] }, // Rd 44, Blackthorn
  0x0342: { id: 0x0342, name: 'Whirl Islands', connections: [0x1602] }, // Rd 41
  0x034a: { id: 0x034a, name: 'Silver Cave', connections: [0x1302] }, // Silver Cave Outside
  0x034e: { id: 0x034e, name: 'Dark Cave', connections: [0x1a02, 0x0508] }, // Rd 31, Rd 45
  0x0350: { id: 0x0350, name: "Dragon's Den", connections: [0x030b] }, // Blackthorn
  0x0353: { id: 0x0353, name: 'Tohjo Falls', connections: [0x1802] }, // Rd 27

  // Routes
  0x0a01: { id: 0x0a01, name: 'Route 31', connections: [0x1a01, 0x0303, 0x034e] },
  0x0a02: { id: 0x0a02, name: 'Route 32', connections: [0x0303, 0x0316, 0x0325] },
  0x0a03: { id: 0x0a03, name: 'Route 33', connections: [0x0325, 0x0304] },
  0x0a04: { id: 0x0a04, name: 'Route 34', connections: [0x0334, 0x0306] },
  0x1801: { id: 0x1801, name: 'Route 26', connections: [0x1802, 0x1701] }, // Connects to Route 27 and Victory Road Gate (Kanto)
  0x1802: { id: 0x1802, name: 'Route 27', connections: [0x1803, 0x0353, 0x1801] },
  0x1803: { id: 0x1803, name: 'Route 29', connections: [0x0301, 0x1802, 0x0302] },
  0x1a01: { id: 0x1a01, name: 'Route 30', connections: [0x0302, 0x1a02] },
  0x1a02: { id: 0x1a02, name: 'Route 31', connections: [0x1a01, 0x0303, 0x034e] },
  0x0109: { id: 0x0109, name: 'Route 38', connections: [0x0308, 0x010a] },
  0x010a: { id: 0x010a, name: 'Route 39', connections: [0x0109, 0x0307] },
  0x0204: { id: 0x0204, name: 'Route 42', connections: [0x0308, 0x0339, 0x0309] },
  0x0205: { id: 0x0205, name: 'Route 44', connections: [0x0309, 0x033d] },
  0x0b01: { id: 0x0b01, name: 'Route 35', connections: [0x0306, 0x030f, 0x0b02] },
  0x0b02: { id: 0x0b02, name: 'Route 36', connections: [0x0b01, 0x0b03] },
  0x0b03: { id: 0x0b03, name: 'Route 37', connections: [0x0b02, 0x0308] },
  0x0508: { id: 0x0508, name: 'Route 45', connections: [0x030b, 0x034e, 0x0509] },
  0x0509: { id: 0x0509, name: 'Route 46', connections: [0x0508, 0x1803] },
  0x0903: { id: 0x0903, name: 'Route 43', connections: [0x0309, 0x030a] },
  0x1601: { id: 0x1601, name: 'Route 40', connections: [0x0307, 0x1602] },
  0x1602: { id: 0x1602, name: 'Route 41', connections: [0x1601, 0x0305, 0x0342] },
  0x1301: { id: 0x1301, name: 'Route 28', connections: [0x1801, 0x1302] }, // Connects to Route 27 and Silver Cave Outside
  0x1302: { id: 0x1302, name: 'Silver Cave Outside', connections: [0x1301, 0x034a] },

  // Kanto locations in Gen 2 (using their respective map group/id in Gen 2)
  0x0d02: { id: 0x0d02, name: 'Pallet Town', connections: [0x0d01, 0x0607] }, // Rd 1, Rd 21
  0x1703: { id: 0x1703, name: 'Viridian City', connections: [0x0d01, 0x1701, 0x1702] }, // Rd 1, Rd 2, Rd 22
  0x0e02: { id: 0x0e02, name: 'Pewter City', connections: [0x1702, 0x0e01] }, // Rd 2, Rd 3
  0x0701: { id: 0x0701, name: 'Cerulean City', connections: [0x0e03, 0x0706, 0x0704] }, // Rd 4, Rd 9, Rd 5
  0x1204: { id: 0x1204, name: 'Lavender Town', connections: [0x0707, 0x1202, 0x1103] }, // Rd 10, Rd 8, Rd 12
  0x0c03: { id: 0x0c03, name: 'Vermilion City', connections: [0x0c01, 0x0c02] }, // Rd 6, Rd 11
  0x1504: { id: 0x1504, name: 'Celadon City', connections: [0x1502, 0x1501] }, // Rd 7, Rd 16
  0x1106: { id: 0x1106, name: 'Fuchsia City', connections: [0x1104, 0x1105, 0x0605] }, // Rd 15, Rd 18, Rd 19
  0x0608: { id: 0x0608, name: 'Cinnabar Island', connections: [0x0606, 0x0607] }, // Rd 20, Rd 21
  0x1902: { id: 0x1902, name: 'Saffron City', connections: [0x0704, 0x0c01, 0x1502, 0x1202] }, // Rd 5, Rd 6, Rd 7, Rd 8

  // Kanto Routes
  0x0d01: { id: 0x0d01, name: 'Route 1', connections: [0x0d02, 0x1703] },
  0x1702: { id: 0x1702, name: 'Route 2', connections: [0x1703, 0x0e02, 0x1707] }, // Includes Diglett's Cave
  0x0e01: { id: 0x0e01, name: 'Route 3', connections: [0x0e02, 0x0e06] }, // Mt. Moon
  0x0e03: { id: 0x0e03, name: 'Route 4', connections: [0x0e06, 0x0701] },
  0x0704: { id: 0x0704, name: 'Route 5', connections: [0x0701, 0x1902] },
  0x0c01: { id: 0x0c01, name: 'Route 6', connections: [0x1902, 0x0c03] },
  0x1502: { id: 0x1502, name: 'Route 7', connections: [0x1504, 0x1902] },
  0x1202: { id: 0x1202, name: 'Route 8', connections: [0x1902, 0x1204] },
  0x0706: { id: 0x0706, name: 'Route 9', connections: [0x0701, 0x0707] },
  0x0707: { id: 0x0707, name: 'Route 10', connections: [0x0706, 0x1204, 0x070c] }, // Rock Tunnel
  0x0c02: { id: 0x0c02, name: 'Route 11', connections: [0x0c03, 0x1103] },
  0x1103: { id: 0x1103, name: 'Route 12', connections: [0x1204, 0x0c02, 0x1101] },
  0x1101: { id: 0x1101, name: 'Route 13', connections: [0x1103, 0x1102] },
  0x1102: { id: 0x1102, name: 'Route 14', connections: [0x1101, 0x1104] },
  0x1104: { id: 0x1104, name: 'Route 15', connections: [0x1102, 0x1106] },
  0x1501: { id: 0x1501, name: 'Route 16', connections: [0x1504, 0x1503] },
  0x1503: { id: 0x1503, name: 'Route 17', connections: [0x1501, 0x1105] },
  0x1105: { id: 0x1105, name: 'Route 18', connections: [0x1503, 0x1106] },
  0x0605: { id: 0x0605, name: 'Route 19', connections: [0x1106, 0x0606] },
  0x0606: { id: 0x0606, name: 'Route 20', connections: [0x0605, 0x0608] }, // Seafoam
  0x0607: { id: 0x0607, name: 'Route 21', connections: [0x0608, 0x0d02] },
  0x1701: { id: 0x1701, name: 'Route 22', connections: [0x1703, 0x1801] }, // Connects to Route 26 (Victory Road Gate)
  0x070c: { id: 0x070c, name: 'Rock Tunnel', connections: [0x0707] },
  0x0e06: { id: 0x0e06, name: 'Mt. Moon', connections: [0x0e01, 0x0e03] },
  0x1707: { id: 0x1707, name: 'Digletts Cave', connections: [0x1702, 0x0c02] },
};

/**
 * Resolves an indoor map to its connected outdoor parent map in Gen 2.
 * Falls back to self if already an outdoor map.
 */

/**
 * Calculates the shortest path distance (in graph edges/hops) between the player's
 * current location and a target area.
 *
 * @param allLocations - The unified list of all map locations, pre-populated with Floyd-Warshall distances (`dist`).
 * @param startMapId - The internal Map ID where the player is currently standing.
 * @param targetAid - The location Area ID (aid) where the target Pokémon can be found.
 * @returns An object containing the `distance` (number of hops) and the `name` of the target area, or `null` if unreachable.
 */
const locationCache = new Map<number, UnifiedLocation>();
let lastLocationsRef: UnifiedLocation[] | null = null;

function getLocation(allLocations: UnifiedLocation[], id: number): UnifiedLocation | undefined {
  if (lastLocationsRef !== allLocations) {
    locationCache.clear();
    for (const loc of allLocations) {
      locationCache.set(loc.id, loc);
    }
    lastLocationsRef = allLocations;
  }
  return locationCache.get(id);
}

export function getDistanceToMap(
  allLocations: UnifiedLocation[],
  startMapId: number,
  targetAid: number,
): { distance: number; name: string } | null {
  const targetLoc = getLocation(allLocations, targetAid);
  if (!targetLoc) return null;

  const targetDisplayName = targetLoc.n;

  const outdoorStartMapId = getOutdoorMapId(allLocations, startMapId);
  let startLoc = getLocation(allLocations, outdoorStartMapId);

  // Fallback if unknown
  if (!startLoc) {
    // Goldenrod City (Map ID 0x0306 in Gen 2 mapping logic)
    startLoc = getLocation(allLocations, 0x0306);
  }

  if (!startLoc) return null;

  if (startLoc.id === targetLoc.id) {
    return { distance: 0, name: targetDisplayName };
  }

  const distance = startLoc.dist?.[targetLoc.id];
  if (distance !== undefined) {
    return { distance, name: targetDisplayName };
  }

  return null;
}

function getOutdoorMapId(allLocations: UnifiedLocation[], mapId: number): number {
  const loc = getLocation(allLocations, mapId);
  if (loc?.prnt !== undefined) {
    return loc.prnt;
  }
  return mapId;
}
