export interface MapNode {
  id: number;
  slug: string;
  name: string;
  connections: number[];
}

export const GEN1_MAPS: Record<number, MapNode> = {
  0x00: { id: 0x00, slug: 'pallet-town-area', name: 'Pallet Town', connections: [0x0c, 0x20] },
  0x01: {
    id: 0x01,
    slug: 'viridian-city-area',
    name: 'Viridian City',
    connections: [0x0c, 0x0d, 0x21],
  },
  0x02: { id: 0x02, slug: 'pewter-city-area', name: 'Pewter City', connections: [0x0d, 0x0e] },
  0x03: {
    id: 0x03,
    slug: 'cerulean-city-area',
    name: 'Cerulean City',
    connections: [0x0f, 0x10, 0x14, 0x23],
  },
  0x04: {
    id: 0x04,
    slug: 'lavender-town-area',
    name: 'Lavender Town',
    connections: [0x13, 0x15, 0x17],
  },
  0x05: {
    id: 0x05,
    slug: 'vermilion-city-area',
    name: 'Vermilion City',
    connections: [0x11, 0x16],
  },
  0x06: { id: 0x06, slug: 'celadon-city-area', name: 'Celadon City', connections: [0x12, 0x1b] },
  0x07: {
    id: 0x07,
    slug: 'fuchsia-city-area',
    name: 'Fuchsia City',
    connections: [0x1a, 0x1d, 0x1e],
  },
  0x08: {
    id: 0x08,
    slug: 'cinnabar-island-area',
    name: 'Cinnabar Island',
    connections: [0x1f, 0x20],
  },
  0x09: { id: 0x09, slug: 'indigo-plateau-area', name: 'Indigo Plateau', connections: [0x22] },
  0x0a: {
    id: 0x0a,
    slug: 'saffron-city-area',
    name: 'Saffron City',
    connections: [0x10, 0x11, 0x12, 0x13],
  },

  0x0c: { id: 0x0c, slug: 'route-1-area', name: 'Route 1', connections: [0x00, 0x01] },
  0x0d: { id: 0x0d, slug: 'route-2-area', name: 'Route 2', connections: [0x01, 0x02, 0x5a] }, // Connects to Viridian Forest
  0x0e: { id: 0x0e, slug: 'route-3-area', name: 'Route 3', connections: [0x02, 0x0f, 0x3a] }, // Connects to Mt Moon
  0x0f: { id: 0x0f, slug: 'route-4-area', name: 'Route 4', connections: [0x03, 0x0e, 0x3a] },
  0x10: { id: 0x10, slug: 'route-5-area', name: 'Route 5', connections: [0x03, 0x0a] },
  0x11: { id: 0x11, slug: 'route-6-area', name: 'Route 6', connections: [0x05, 0x0a] },
  0x12: { id: 0x12, slug: 'route-7-area', name: 'Route 7', connections: [0x06, 0x0a] },
  0x13: { id: 0x13, slug: 'route-8-area', name: 'Route 8', connections: [0x04, 0x0a] },
  0x14: { id: 0x14, slug: 'route-9-area', name: 'Route 9', connections: [0x03, 0x15, 0xca] }, // Connects to Rock Tunnel
  0x15: {
    id: 0x15,
    slug: 'route-10-area',
    name: 'Route 10',
    connections: [0x14, 0x04, 0xca, 0xc1],
  }, // Connects Rock Tunnel & Power Plant
  0x16: { id: 0x16, slug: 'route-11-area', name: 'Route 11', connections: [0x05, 0x17] },
  0x17: { id: 0x17, slug: 'route-12-area', name: 'Route 12', connections: [0x04, 0x16, 0x18] },
  0x18: { id: 0x18, slug: 'route-13-area', name: 'Route 13', connections: [0x17, 0x19] },
  0x19: { id: 0x19, slug: 'route-14-area', name: 'Route 14', connections: [0x18, 0x1a] },
  0x1a: { id: 0x1a, slug: 'route-15-area', name: 'Route 15', connections: [0x19, 0x07] },
  0x1b: { id: 0x1b, slug: 'route-16-area', name: 'Route 16', connections: [0x06, 0x1c] },
  0x1c: { id: 0x1c, slug: 'route-17-area', name: 'Route 17', connections: [0x1b, 0x1d] },
  0x1d: { id: 0x1d, slug: 'route-18-area', name: 'Route 18', connections: [0x1c, 0x07] },
  0x1e: { id: 0x1e, slug: 'route-19-area', name: 'Route 19', connections: [0x07, 0x1f] },
  0x1f: { id: 0x1f, slug: 'route-20-area', name: 'Route 20', connections: [0x1e, 0x08, 0xaa] }, // Connects to Seafoam
  0x20: { id: 0x20, slug: 'route-21-area', name: 'Route 21', connections: [0x08, 0x00] },
  0x21: { id: 0x21, slug: 'route-22-area', name: 'Route 22', connections: [0x01, 0x22] },
  0x22: { id: 0x22, slug: 'route-23-area', name: 'Route 23', connections: [0x21, 0x09] }, // Victory Road is inside this
  0x23: { id: 0x23, slug: 'route-24-area', name: 'Route 24', connections: [0x03, 0x24] },
  0x24: { id: 0x24, slug: 'route-25-area', name: 'Route 25', connections: [0x23] },

  // Key Dungeons
  0x5a: { id: 0x5a, slug: 'viridian-forest-area', name: 'Viridian Forest', connections: [0x0d] },
  0x3a: { id: 0x3a, slug: 'mt-moon-1f', name: 'Mt. Moon', connections: [0x0e, 0x0f, 0x5c] },
  0x5c: { id: 0x5c, slug: 'mt-moon-b1f', name: 'Mt. Moon B1F', connections: [0x3a] },
  0xca: { id: 0xca, slug: 'rock-tunnel-1f', name: 'Rock Tunnel', connections: [0x14, 0x15] },
  0xc1: { id: 0xc1, slug: 'power-plant-area', name: 'Power Plant', connections: [0x15] },
  0xaa: { id: 0xaa, slug: 'seafoam-islands-1f', name: 'Seafoam Islands', connections: [0x1f] },
  0xd6: { id: 0xd6, slug: 'kanto-safari-zone-center', name: 'Safari Zone', connections: [0x07] }, // Fuchsia
  0xe2: { id: 0xe2, slug: 'cerulean-cave-1f', name: 'Cerulean Cave', connections: [0x03] }, // Cerulean
};

export const INDOOR_TO_PARENT_MAP: Record<number, number> = {
  // Pallet Town Interiors
  0x25: 0x00,
  0x26: 0x00,
  0x27: 0x00,
  // Viridian City Interiors
  0x28: 0x01,
  0x29: 0x01,
  0x2a: 0x01,
  0x2b: 0x01,
  0x2c: 0x01,
  // Pewter
  0x34: 0x02,
  0x35: 0x02,
  0x36: 0x02,
  0x37: 0x02,
  // Cerulean
  0x3c: 0x03,
  0x3d: 0x03,
  0x3e: 0x03,
  0x3f: 0x03,
  0x40: 0x03,
  0x41: 0x03,
  // Lavender
  0x52: 0x04,
  0x53: 0x04,
  0x8e: 0x04,
  0x8f: 0x04,
  0x90: 0x04,
  0x91: 0x04,
  0x92: 0x04,
  0x93: 0x04,
  0x94: 0x04,
  // Vermilion
  0x54: 0x05,
  0x55: 0x05,
  0x56: 0x05,
  0x5d: 0x05,
  0x5e: 0x05,
  // Celadon
  0x68: 0x06,
  0x73: 0x06,
  0x74: 0x06,
  0x75: 0x06,
  0x76: 0x06,
  0x82: 0x06,
  // Fuchsia
  0x9b: 0x07,
  0x9c: 0x07,
  0x9d: 0x07,
  0x9e: 0x07,
  0x9f: 0x07,
  0xa0: 0x07,
  // Cinnabar
  0xa5: 0x08,
  0xa6: 0x08,
  0xaf: 0x08,
  0xb0: 0x08,
  // Saffron (including Silph Co)
  0xad: 0x0a,
  0xae: 0x0a,
  0xb8: 0x0a,
  0xb9: 0x0a,
  0xba: 0x0a,
  0xbb: 0x0a,
  0xbc: 0x0a,
  0xbd: 0x0a,
  0xbe: 0x0a,
  0xbf: 0x0a,
  0xc0: 0x0a,
  0xd4: 0x0a,
  0xfb: 0x0a,
  0xfc: 0x0a,
  0xfd: 0x0a,
  0xfe: 0x0a,
  0xff: 0x0a,
  // General rule: If it's not a major outer map, we map it back to the last known exterior or Saffron by default if unknown,
  // but the function below handles the fallback gracefully.
};

export function getDistanceToMap(currentMapId: number, targetSlug: string): { distance: number; name: string } | null {
  let startId = currentMapId;
  if (INDOOR_TO_PARENT_MAP[startId] !== undefined) {
    startId = INDOOR_TO_PARENT_MAP[startId]!;
  }

  if (!GEN1_MAPS[startId]) {
    startId = 0x0a; // Saffron City
  }

  // Clean the pokeapi slug to match our internal slugs
  const cleanTarget = targetSlug.replace('kanto-', '').replace('sea-', '');

  const queue: { id: number; distance: number }[] = [{ id: startId, distance: 0 }];
  const visited = new Set<number>();
  visited.add(startId);

  while (queue.length > 0) {
    const { id, distance } = queue.shift()!;
    const node = GEN1_MAPS[id];

    if (!node) continue;

    const nodeBase = node.slug.replace('-area', '');
    const targetBase = cleanTarget.replace('-area', '');

    if (nodeBase === targetBase || targetBase.startsWith(nodeBase + '-')) {
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
