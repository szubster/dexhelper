/**
 * Build-time mapping data for Gen 1 (Kanto).
 * Moved out of src/ to keep client bundle lean.
 */

export interface MapNode {
  id: number;
  aid: number;
  slug: string;
  name: string;
  connections: number[];
}

export const GEN1_MAPS: Record<number, MapNode> = {
  0x00: { id: 0x00, aid: 285, slug: 'pallet-town-area', name: 'Pallet Town', connections: [0x0c, 0x20] },
  0x01: { id: 0x01, aid: 280, slug: 'viridian-city-area', name: 'Viridian City', connections: [0x0c, 0x19, 0x1d] },
  0x02: { id: 0x02, aid: 1200, slug: 'pewter-city-area', name: 'Pewter City', connections: [0x0d, 0x19] },
  0x03: { id: 0x03, aid: 281, slug: 'cerulean-city-area', name: 'Cerulean City', connections: [0x0e, 0x10, 0x18, 0x1c] },
  0x04: { id: 0x04, aid: 336, slug: 'lavender-town-area', name: 'Lavender Town', connections: [0x0f, 0x11, 0x15] },
  0x05: { id: 0x05, aid: 282, slug: 'vermilion-city-area', name: 'Vermilion City', connections: [0x0e, 0x12] },
  0x06: { id: 0x06, aid: 284, slug: 'celadon-city-area', name: 'Celadon City', connections: [0x10, 0x11] },
  0x07: { id: 0x07, aid: 283, slug: 'fuchsia-city-area', name: 'Fuchsia City', connections: [0x12, 0x13, 0x14, 0x17, 0x1c] },
  0x08: { id: 0x08, aid: 287, slug: 'cinnabar-island-area', name: 'Cinnabar Island', connections: [0x14, 0x15] },
  0x0a: { id: 0x0a, aid: 762, slug: 'saffron-city-area', name: 'Saffron City', connections: [0x0e, 0x0f, 0x10, 0x11] },
  0x0c: { id: 0x0c, aid: 295, slug: 'route-1-area', name: 'Route 1', connections: [0x00, 0x01] },
  0x0d: { id: 0x0d, aid: 296, slug: 'route-2-area', name: 'Route 2', connections: [0x01, 0x02, 0x1d] },
  0x0e: { id: 0x0e, aid: 1046, slug: 'route-4-area', name: 'Route 4', connections: [0x02, 0x03, 0x3b] },
  0x0f: { id: 0x0f, aid: 1047, slug: 'route-5-area', name: 'Route 5', connections: [0x03, 0x0a] },
  0x10: { id: 0x10, aid: 1048, slug: 'route-6-area', name: 'Route 6', connections: [0x0a, 0x05] },
  0x11: { id: 0x11, aid: 1049, slug: 'route-7-area', name: 'Route 7', connections: [0x0a, 0x06] },
  0x12: { id: 0x12, aid: 1050, slug: 'route-8-area', name: 'Route 8', connections: [0x0a, 0x04] },
  0x13: { id: 0x13, aid: 1051, slug: 'route-9-area', name: 'Route 9', connections: [0x03, 0x11] },
  0x14: { id: 0x14, aid: 275, slug: 'route-10-area', name: 'Route 10', connections: [0x11, 0x04, 0x3d] },
  0x15: { id: 0x15, aid: 276, slug: 'route-11-area', name: 'Route 11', connections: [0x05, 0x12] },
  0x16: { id: 0x16, aid: 277, slug: 'route-12-area', name: 'Route 12', connections: [0x04, 0x13] },
  0x17: { id: 0x17, aid: 278, slug: 'route-13-area', name: 'Route 13', connections: [0x12, 0x14] },
  0x18: { id: 0x18, aid: 279, slug: 'route-14-area', name: 'Route 14', connections: [0x13, 0x15] },
  0x19: { id: 0x19, aid: 310, slug: 'route-15-area', name: 'Route 15', connections: [0x15, 0x07] },
  0x1a: { id: 0x1a, aid: 311, slug: 'route-16-area', name: 'Route 16', connections: [0x06, 0x17] },
  0x1b: { id: 0x1b, aid: 312, slug: 'route-17-area', name: 'Route 17', connections: [0x16, 0x18] },
  0x1c: { id: 0x1c, aid: 313, slug: 'route-18-area', name: 'Route 18', connections: [0x17, 0x07] },
  0x1d: { id: 0x1d, aid: 314, slug: 'route-19-area', name: 'Route 19', connections: [0x07, 0x1a] },
  0x1e: { id: 0x1e, aid: 315, slug: 'route-20-area', name: 'Route 20', connections: [0x19, 0x08, 0x3e] },
  0x1f: { id: 0x1f, aid: 732, slug: 'route-21-area', name: 'Route 21', connections: [0x08, 0x00] },
  0x20: { id: 0x20, aid: 317, slug: 'route-22-area', name: 'Route 22', connections: [0x01, 0x21] },
  0x21: { id: 0x21, aid: 286, slug: 'indigo-plateau-area', name: 'Indigo Plateau', connections: [0x20, 0x3f] },
  0x22: { id: 0x22, aid: 318, slug: 'route-24-area', name: 'Route 24', connections: [0x03, 0x23] },
  0x23: { id: 0x23, aid: 319, slug: 'route-25-area', name: 'Route 25', connections: [0x22, 0x34] },
  0x34: { id: 0x34, aid: 325, slug: 'mt-moon-area', name: 'Mt. Moon', connections: [0x0e] },
  0x3b: { id: 0x3b, aid: 326, slug: 'rock-tunnel-area', name: 'Rock Tunnel', connections: [0x11] },
  0x3d: { id: 0x3d, aid: 334, slug: 'seafoam-islands-area', name: 'Seafoam Islands', connections: [0x1e] },
  0x3e: { id: 0x3e, aid: 333, slug: 'victory-road-area', name: 'Victory Road', connections: [0x21] },
  0x3f: { id: 0x3f, aid: 328, slug: 'digletts-cave-area', name: 'Digletts Cave', connections: [0x01, 0x0d] },
  0x8e: { id: 0x8e, aid: 335, slug: 'pokemon-mansion-area', name: 'Pokémon Mansion', connections: [0x08] },
  0x9b: { id: 0x9b, aid: 330, slug: 'safari-zone-area', name: 'Safari Zone', connections: [0x07] },
  0xa2: { id: 0xa2, aid: 331, slug: 'cerulean-cave-area', name: 'Cerulean Cave', connections: [0x03] },
  0xa4: { id: 0xa4, aid: 327, slug: 'power-plant-area', name: 'Power Plant', connections: [0x11] },
};

export const INDOOR_TO_PARENT_MAP: Record<number, number> = {
  0x25: 0x00, 0x26: 0x00, 0x27: 0x00, 0x28: 0x00, // Pallet
  0x2d: 0x01, 0x2e: 0x01, 0x2f: 0x01, 0x30: 0x01, // Viridian
  0x38: 0x02, 0x39: 0x02, 0x3a: 0x02, 0x3b: 0x02, 0x3c: 0x02, 0x3d: 0x02, // Pewter
  0x41: 0x03, 0x42: 0x03, 0x43: 0x03, 0x44: 0x03, 0x45: 0x03, // Cerulean
  0x94: 0x04, 0x95: 0x04, 0x96: 0x04, 0x97: 0x04, 0x98: 0x04, 0x99: 0x04, 0x9a: 0x04, 0x9b: 0x04, // Lavender
};
