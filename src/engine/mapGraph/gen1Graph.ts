export interface MapNode {
  id: number;
  slug: string;
  name: string;
  connections: number[];
}

export const GEN1_MAPS: Record<number, MapNode> = {
  0: {
    id: 0x00,
    slug: "pallet-town-area",
    name: "Pallet Town",
    connections: [0x0c, 0x20],
  },
  1: {
    id: 0x01,
    slug: "viridian-city-area",
    name: "Viridian City",
    connections: [0x0c, 0x0d, 0x21],
  },
  2: {
    id: 0x02,
    slug: "pewter-city-area",
    name: "Pewter City",
    connections: [0x0d, 0x0e],
  },
  3: {
    id: 0x03,
    slug: "cerulean-city-area",
    name: "Cerulean City",
    connections: [0x0f, 0x10, 0x14, 0x23],
  },
  4: {
    id: 0x04,
    slug: "lavender-town-area",
    name: "Lavender Town",
    connections: [0x13, 0x15, 0x17],
  },
  5: {
    id: 0x05,
    slug: "vermilion-city-area",
    name: "Vermilion City",
    connections: [0x11, 0x16],
  },
  6: {
    id: 0x06,
    slug: "celadon-city-area",
    name: "Celadon City",
    connections: [0x12, 0x1b],
  },
  7: {
    id: 0x07,
    slug: "fuchsia-city-area",
    name: "Fuchsia City",
    connections: [0x1a, 0x1d, 0x1e],
  },
  8: {
    id: 0x08,
    slug: "cinnabar-island-area",
    name: "Cinnabar Island",
    connections: [0x1f, 0x20],
  },
  9: {
    id: 0x09,
    slug: "indigo-plateau-area",
    name: "Indigo Plateau",
    connections: [0x22],
  },
  10: {
    id: 0x0a,
    slug: "saffron-city-area",
    name: "Saffron City",
    connections: [0x10, 0x11, 0x12, 0x13],
  },

  12: {
    id: 0x0c,
    slug: "route-1-area",
    name: "Route 1",
    connections: [0x00, 0x01],
  },
  13: {
    id: 0x0d,
    slug: "route-2-area",
    name: "Route 2",
    connections: [0x01, 0x02, 0x5a],
  }, // Connects to Viridian Forest
  14: {
    id: 0x0e,
    slug: "route-3-area",
    name: "Route 3",
    connections: [0x02, 0x0f, 0x3a],
  }, // Connects to Mt Moon
  15: {
    id: 0x0f,
    slug: "route-4-area",
    name: "Route 4",
    connections: [0x03, 0x0e, 0x3a],
  },
  16: {
    id: 0x10,
    slug: "route-5-area",
    name: "Route 5",
    connections: [0x03, 0x0a],
  },
  17: {
    id: 0x11,
    slug: "route-6-area",
    name: "Route 6",
    connections: [0x05, 0x0a],
  },
  18: {
    id: 0x12,
    slug: "route-7-area",
    name: "Route 7",
    connections: [0x06, 0x0a],
  },
  19: {
    id: 0x13,
    slug: "route-8-area",
    name: "Route 8",
    connections: [0x04, 0x0a],
  },
  20: {
    id: 0x14,
    slug: "route-9-area",
    name: "Route 9",
    connections: [0x03, 0x15, 0xca],
  }, // Connects to Rock Tunnel
  21: {
    id: 0x15,
    slug: "route-10-area",
    name: "Route 10",
    connections: [0x14, 0x04, 0xca, 0xc1],
  }, // Connects Rock Tunnel & Power Plant
  22: {
    id: 0x16,
    slug: "route-11-area",
    name: "Route 11",
    connections: [0x05, 0x17],
  },
  23: {
    id: 0x17,
    slug: "route-12-area",
    name: "Route 12",
    connections: [0x04, 0x16, 0x18],
  },
  24: {
    id: 0x18,
    slug: "route-13-area",
    name: "Route 13",
    connections: [0x17, 0x19],
  },
  25: {
    id: 0x19,
    slug: "route-14-area",
    name: "Route 14",
    connections: [0x18, 0x1a],
  },
  26: {
    id: 0x1a,
    slug: "route-15-area",
    name: "Route 15",
    connections: [0x19, 0x07],
  },
  27: {
    id: 0x1b,
    slug: "route-16-area",
    name: "Route 16",
    connections: [0x06, 0x1c],
  },
  28: {
    id: 0x1c,
    slug: "route-17-area",
    name: "Route 17",
    connections: [0x1b, 0x1d],
  },
  29: {
    id: 0x1d,
    slug: "route-18-area",
    name: "Route 18",
    connections: [0x1c, 0x07],
  },
  30: {
    id: 0x1e,
    slug: "route-19-area",
    name: "Route 19",
    connections: [0x07, 0x1f],
  },
  31: {
    id: 0x1f,
    slug: "route-20-area",
    name: "Route 20",
    connections: [0x1e, 0x08, 0xaa],
  }, // Connects to Seafoam
  32: {
    id: 0x20,
    slug: "route-21-area",
    name: "Route 21",
    connections: [0x08, 0x00],
  },
  33: {
    id: 0x21,
    slug: "route-22-area",
    name: "Route 22",
    connections: [0x01, 0x22],
  },
  34: {
    id: 0x22,
    slug: "route-23-area",
    name: "Route 23",
    connections: [0x21, 0x09],
  }, // Victory Road is inside this
  35: {
    id: 0x23,
    slug: "route-24-area",
    name: "Route 24",
    connections: [0x03, 0x24],
  },
  36: {
    id: 0x24,
    slug: "route-25-area",
    name: "Route 25",
    connections: [0x23],
  },

  // Key Dungeons
  90: {
    id: 0x5a,
    slug: "viridian-forest-area",
    name: "Viridian Forest",
    connections: [0x0d],
  },
  58: {
    id: 0x3a,
    slug: "mt-moon-1f",
    name: "Mt. Moon",
    connections: [0x0e, 0x0f, 0x5c],
  },
  92: {
    id: 0x5c,
    slug: "mt-moon-b1f",
    name: "Mt. Moon B1F",
    connections: [0x3a],
  },
  202: {
    id: 0xca,
    slug: "rock-tunnel-1f",
    name: "Rock Tunnel",
    connections: [0x14, 0x15],
  },
  193: {
    id: 0xc1,
    slug: "power-plant-area",
    name: "Power Plant",
    connections: [0x15],
  },
  170: {
    id: 0xaa,
    slug: "seafoam-islands-1f",
    name: "Seafoam Islands",
    connections: [0x1f],
  },
  214: {
    id: 0xd6,
    slug: "kanto-safari-zone-center",
    name: "Safari Zone",
    connections: [0x07],
  }, // Fuchsia
  226: {
    id: 0xe2,
    slug: "cerulean-cave-1f",
    name: "Cerulean Cave",
    connections: [0x03],
  }, // Cerulean
};

export const INDOOR_TO_PARENT_MAP: Record<number, number> = {
  // Pallet Town Interiors
  37: 0x00,
  38: 0x00,
  39: 0x00,
  // Viridian City Interiors
  40: 0x01,
  41: 0x01,
  42: 0x01,
  43: 0x01,
  44: 0x01,
  // Pewter
  52: 0x02,
  53: 0x02,
  54: 0x02,
  55: 0x02,
  // Cerulean
  60: 0x03,
  61: 0x03,
  62: 0x03,
  63: 0x03,
  64: 0x03,
  65: 0x03,
  // Lavender
  82: 0x04,
  83: 0x04,
  142: 0x04,
  143: 0x04,
  144: 0x04,
  145: 0x04,
  146: 0x04,
  147: 0x04,
  148: 0x04,
  // Vermilion
  84: 0x05,
  85: 0x05,
  86: 0x05,
  93: 0x05,
  94: 0x05,
  // Celadon
  104: 0x06,
  115: 0x06,
  116: 0x06,
  117: 0x06,
  118: 0x06,
  130: 0x06,
  // Fuchsia
  155: 0x07,
  156: 0x07,
  157: 0x07,
  158: 0x07,
  159: 0x07,
  160: 0x07,
  // Cinnabar
  165: 0x08,
  166: 0x08,
  175: 0x08,
  176: 0x08,
  // Saffron (including Silph Co)
  173: 0x0a,
  174: 0x0a,
  184: 0x0a,
  185: 0x0a,
  186: 0x0a,
  187: 0x0a,
  188: 0x0a,
  189: 0x0a,
  190: 0x0a,
  191: 0x0a,
  192: 0x0a,
  212: 0x0a,
  251: 0x0a,
  252: 0x0a,
  253: 0x0a,
  254: 0x0a,
  255: 0x0a,
  // General rule: If it's not a major outer map, we map it back to the last known exterior or Saffron by default if unknown,
  // but the function below handles the fallback gracefully.
};

export function getDistanceToMap(
  currentMapId: number,
  targetSlug: string,
): { distance: number; name: string } | null {
  let startId = currentMapId;
  if (INDOOR_TO_PARENT_MAP[startId] !== undefined) {
    startId = INDOOR_TO_PARENT_MAP[startId]!;
  }

  if (!GEN1_MAPS[startId]) {
    startId = 0x0a; // Saffron City
  }

  // Clean the pokeapi slug to match our internal slugs
  const cleanTarget = targetSlug.replace("kanto-", "").replace("sea-", "");

  const queue: { id: number; distance: number }[] = [
    { id: startId, distance: 0 },
  ];
  const visited = new Set<number>();
  visited.add(startId);

  while (queue.length > 0) {
    const { id, distance } = queue.shift()!;
    const node = GEN1_MAPS[id];

    if (!node) continue;

    const nodeBase = node.slug.replace("-area", "");
    const targetBase = cleanTarget.replace("-area", "");

    if (nodeBase === targetBase || targetBase.startsWith(`${nodeBase}-`)) {
      return { distance, name: node.name };
    }

    for (const neighborId of node.connections) {
      if (!visited.has(neighborId)) {
        visited.add(neighborId);
        queue.push({ id: neighborId, distance: distance + 1 });
      }
    }
  }

  return null;
}
