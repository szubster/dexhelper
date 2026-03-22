// This file maps internal game IDs to standard names or PokeAPI slugs

export const GEN1_MAP_TO_SLUG: Record<number, string> = {
  // Common Gen 1 Maps -> PokeAPI location-area slugs
  0x00: 'pallet-town-area',
  0x01: 'viridian-city-area',
  0x02: 'pewter-city-area',
  0x03: 'cerulean-city-area',
  0x04: 'lavender-town-area',
  0x05: 'vermilion-city-area',
  0x06: 'celadon-city-area',
  0x07: 'fuchsia-city-area',
  0x08: 'cinnabar-island-area',
  0x0A: 'saffron-city-area',
  0x0C: 'route-1-area',
  0x0D: 'route-2-area',
  0x0E: 'route-3-area',
  0x0F: 'route-4-area',
  0x10: 'route-5-area',
  0x11: 'route-6-area',
  0x12: 'route-7-area',
  0x13: 'route-8-area',
  0x14: 'route-9-area',
  0x15: 'route-10-area',
  0x16: 'route-11-area',
  0x17: 'route-12-area',
  0x18: 'route-13-area',
  0x19: 'route-14-area',
  0x1A: 'route-15-area',
  0x1B: 'route-16-area',
  0x1C: 'route-17-area',
  0x1D: 'route-18-area',
  0x1E: 'route-19-area',
  0x1F: 'route-20-area',
  0x20: 'route-21-area',
  0x21: 'route-22-area',
  0x22: 'route-23-area',
  0x23: 'route-24-area',
  0x24: 'route-25-area',
  0x28: 'route-8-area', // Example fallback
  0x5A: 'viridian-forest-area',
  0x5C: 'mt-moon-b1f', // Using closest approximation or region
  0xCA: 'rock-tunnel-1f',
  0xC1: 'power-plant-area',
  0xD4: 'saffron-city-area', // Silph Co maps to Saffron since there are no encounters in Silph Co normally, but it resolves the map location.
  0xD6: 'kanto-safari-zone-center',
  0xE2: 'cerulean-cave-1f',
  // Note: There are many more map IDs; these represent a mapping foundation.
};

export const GEN2_MAP_TO_SLUG: Record<number, Record<number, string>> = {
  // Map Group -> Map Number -> slug
  // Simplified mapping for demonstration/core areas 
  3: { // Group 3 often correlates with Johto towns
    1: 'new-bark-town-area',
    2: 'cherrygrove-city-area',
    3: 'violet-city-area',
    4: 'azalea-town-area',
    5: 'cianwood-city-area',
    6: 'goldenrod-city-area',
    7: 'olivine-city-area',
    8: 'ecruteak-city-area',
    9: 'mahogany-town-area',
    10: 'lake-of-rage-area',
    11: 'blackthorn-city-area',
  },
  // Route Group mappings can be similarly structured. We fallback gracefully if not found.
};

// Internal Gen 1 Key/Evolution Items
export const GEN1_ITEMS = {
  MOON_STONE: 0x0A,
  FIRE_STONE: 0x20,
  THUNDER_STONE: 0x21,
  WATER_STONE: 0x22,
  LEAF_STONE: 0x2F,
  OLD_ROD: 0x3F,
  GOOD_ROD: 0x40,
  SUPER_ROD: 0x41,
};

export const GEN2_ITEMS = {
  MOON_STONE: 0x08,
  FIRE_STONE: 0x16,
  THUNDER_STONE: 0x17,
  WATER_STONE: 0x18,
  LEAF_STONE: 0x22,
  SUN_STONE: 0xB0,
  KINGS_ROCK: 0x51,
  METAL_COAT: 0x94,
  DRAGON_SCALE: 0x9C,
  UP_GRADE: 0xB3,
  OLD_ROD: 0x39,
  GOOD_ROD: 0x3A,
  SUPER_ROD: 0x3C,
};

// Useful lists for checking logic
export const EVOLUTION_STONES_SLUGS = [
  'moon-stone', 'fire-stone', 'thunder-stone', 'water-stone', 'leaf-stone', 'sun-stone'
];

export const TRADE_EVOLUTION_ITEMS_SLUGS = [
  'kings-rock', 'metal-coat', 'dragon-scale', 'up-grade'
];
