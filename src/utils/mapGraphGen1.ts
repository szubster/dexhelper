export interface MapNode {
  id: number;
  slug: string;
  name: string;
  connections: number[];
}

export const GEN1_MAPS: Record<number, MapNode> = {
  0x00: { id: 0x00, slug: 'pallet-town-area', name: 'Pallet Town', connections: [0x0C, 0x20] },
  0x01: { id: 0x01, slug: 'viridian-city-area', name: 'Viridian City', connections: [0x0C, 0x0D, 0x21] },
  0x02: { id: 0x02, slug: 'pewter-city-area', name: 'Pewter City', connections: [0x0D, 0x0E] },
  0x03: { id: 0x03, slug: 'cerulean-city-area', name: 'Cerulean City', connections: [0x0F, 0x10, 0x14, 0x23] },
  0x04: { id: 0x04, slug: 'lavender-town-area', name: 'Lavender Town', connections: [0x13, 0x15, 0x17] },
  0x05: { id: 0x05, slug: 'vermilion-city-area', name: 'Vermilion City', connections: [0x11, 0x16] },
  0x06: { id: 0x06, slug: 'celadon-city-area', name: 'Celadon City', connections: [0x12, 0x1B] },
  0x07: { id: 0x07, slug: 'fuchsia-city-area', name: 'Fuchsia City', connections: [0x1A, 0x1D, 0x1E] },
  0x08: { id: 0x08, slug: 'cinnabar-island-area', name: 'Cinnabar Island', connections: [0x1F, 0x20] },
  0x09: { id: 0x09, slug: 'indigo-plateau-area', name: 'Indigo Plateau', connections: [0x22] },
  0x0A: { id: 0x0A, slug: 'saffron-city-area', name: 'Saffron City', connections: [0x10, 0x11, 0x12, 0x13] },
  
  0x0C: { id: 0x0C, slug: 'route-1-area', name: 'Route 1', connections: [0x00, 0x01] },
  0x0D: { id: 0x0D, slug: 'route-2-area', name: 'Route 2', connections: [0x01, 0x02, 0x5A] }, // Connects to Viridian Forest
  0x0E: { id: 0x0E, slug: 'route-3-area', name: 'Route 3', connections: [0x02, 0x0F, 0x3A] }, // Connects to Mt Moon
  0x0F: { id: 0x0F, slug: 'route-4-area', name: 'Route 4', connections: [0x03, 0x0E, 0x3A] },
  0x10: { id: 0x10, slug: 'route-5-area', name: 'Route 5', connections: [0x03, 0x0A] },
  0x11: { id: 0x11, slug: 'route-6-area', name: 'Route 6', connections: [0x05, 0x0A] },
  0x12: { id: 0x12, slug: 'route-7-area', name: 'Route 7', connections: [0x06, 0x0A] },
  0x13: { id: 0x13, slug: 'route-8-area', name: 'Route 8', connections: [0x04, 0x0A] },
  0x14: { id: 0x14, slug: 'route-9-area', name: 'Route 9', connections: [0x03, 0x15, 0xCA] }, // Connects to Rock Tunnel
  0x15: { id: 0x15, slug: 'route-10-area', name: 'Route 10', connections: [0x14, 0x04, 0xCA, 0xC1] }, // Connects Rock Tunnel & Power Plant
  0x16: { id: 0x16, slug: 'route-11-area', name: 'Route 11', connections: [0x05, 0x17] },
  0x17: { id: 0x17, slug: 'route-12-area', name: 'Route 12', connections: [0x04, 0x16, 0x18] },
  0x18: { id: 0x18, slug: 'route-13-area', name: 'Route 13', connections: [0x17, 0x19] },
  0x19: { id: 0x19, slug: 'route-14-area', name: 'Route 14', connections: [0x18, 0x1A] },
  0x1A: { id: 0x1A, slug: 'route-15-area', name: 'Route 15', connections: [0x19, 0x07] },
  0x1B: { id: 0x1B, slug: 'route-16-area', name: 'Route 16', connections: [0x06, 0x1C] },
  0x1C: { id: 0x1C, slug: 'route-17-area', name: 'Route 17', connections: [0x1B, 0x1D] },
  0x1D: { id: 0x1D, slug: 'route-18-area', name: 'Route 18', connections: [0x1C, 0x07] },
  0x1E: { id: 0x1E, slug: 'route-19-area', name: 'Route 19', connections: [0x07, 0x1F] },
  0x1F: { id: 0x1F, slug: 'route-20-area', name: 'Route 20', connections: [0x1E, 0x08, 0xAA] }, // Connects to Seafoam
  0x20: { id: 0x20, slug: 'route-21-area', name: 'Route 21', connections: [0x08, 0x00] },
  0x21: { id: 0x21, slug: 'route-22-area', name: 'Route 22', connections: [0x01, 0x22] },
  0x22: { id: 0x22, slug: 'route-23-area', name: 'Route 23', connections: [0x21, 0x09] }, // Victory Road is inside this
  0x23: { id: 0x23, slug: 'route-24-area', name: 'Route 24', connections: [0x03, 0x24] },
  0x24: { id: 0x24, slug: 'route-25-area', name: 'Route 25', connections: [0x23] },

  // Key Dungeons
  0x5A: { id: 0x5A, slug: 'viridian-forest-area', name: 'Viridian Forest', connections: [0x0D] },
  0x3A: { id: 0x3A, slug: 'mt-moon-1f', name: 'Mt. Moon', connections: [0x0E, 0x0F, 0x5C] },
  0x5C: { id: 0x5C, slug: 'mt-moon-b1f', name: 'Mt. Moon B1F', connections: [0x3A] },
  0xCA: { id: 0xCA, slug: 'rock-tunnel-1f', name: 'Rock Tunnel', connections: [0x14, 0x15] },
  0xC1: { id: 0xC1, slug: 'power-plant-area', name: 'Power Plant', connections: [0x15] },
  0xAA: { id: 0xAA, slug: 'seafoam-islands-1f', name: 'Seafoam Islands', connections: [0x1F] },
  0xD6: { id: 0xD6, slug: 'kanto-safari-zone-center', name: 'Safari Zone', connections: [0x07] }, // Fuchsia
  0xE2: { id: 0xE2, slug: 'cerulean-cave-1f', name: 'Cerulean Cave', connections: [0x03] }, // Cerulean
};

export const INDOOR_TO_PARENT_MAP: Record<number, number> = {
  // Pallet Town Interiors
  0x25: 0x00, 0x26: 0x00, 0x27: 0x00,
  // Viridian City Interiors
  0x28: 0x01, 0x29: 0x01, 0x2A: 0x01, 0x2B: 0x01, 0x2C: 0x01,
  // Pewter
  0x34: 0x02, 0x35: 0x02, 0x36: 0x02, 0x37: 0x02,
  // Cerulean
  0x3C: 0x03, 0x3D: 0x03, 0x3E: 0x03, 0x3F: 0x03, 0x40: 0x03, 0x41: 0x03,
  // Lavender
  0x52: 0x04, 0x53: 0x04, 0x8E: 0x04, 0x8F: 0x04, 0x90: 0x04, 0x91: 0x04, 0x92: 0x04, 0x93: 0x04, 0x94: 0x04,
  // Vermilion
  0x54: 0x05, 0x55: 0x05, 0x56: 0x05, 0x5D: 0x05, 0x5E: 0x05,
  // Celadon
  0x68: 0x06, 0x73: 0x06, 0x74: 0x06, 0x75: 0x06, 0x76: 0x06, 0x82: 0x06,
  // Fuchsia
  0x9B: 0x07, 0x9C: 0x07, 0x9D: 0x07, 0x9E: 0x07, 0x9F: 0x07, 0xA0: 0x07,
  // Cinnabar
  0xA5: 0x08, 0xA6: 0x08, 0xAF: 0x08, 0xB0: 0x08,
  // Saffron (including Silph Co)
  0xAD: 0x0A, 0xAE: 0x0A, 0xB8: 0x0A, 0xB9: 0x0A, 0xBA: 0x0A, 0xBB: 0x0A, 0xBC: 0x0A, 0xBD: 0x0A, 
  0xBE: 0x0A, 0xBF: 0x0A, 0xC0: 0x0A, 0xD4: 0x0A, 0xFB: 0x0A, 0xFC: 0x0A, 0xFD: 0x0A, 0xFE: 0x0A, 0xFF: 0x0A,
  // General rule: If it's not a major outer map, we map it back to the last known exterior or Saffron by default if unknown, 
  // but the function below handles the fallback gracefully.
};

export function getDistanceToMap(
  currentMapId: number, 
  targetSlug: string
): { distance: number, name: string } | null {

  let startId = currentMapId;
  if (INDOOR_TO_PARENT_MAP[startId] !== undefined) {
    startId = INDOOR_TO_PARENT_MAP[startId];
  }
  
  if (!GEN1_MAPS[startId]) {
    startId = 0x00;
  }

  // Clean the pokeapi slug to match our internal slugs
  const cleanTarget = targetSlug.replace('kanto-', '').replace('sea-', '');

  const queue: { id: number, distance: number }[] = [{ id: startId, distance: 0 }];
  const visited = new Set<number>();
  visited.add(startId);

  while (queue.length > 0) {
    const { id, distance } = queue.shift()!;
    const node = GEN1_MAPS[id];
    
    if (!node) continue;

    if (cleanTarget.startsWith(node.slug.replace('-area', ''))) {
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
