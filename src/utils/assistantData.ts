// This file maps internal game IDs to standard names or PokeAPI slugs

export const GEN1_MAP_TO_SLUG: Record<number, string> = {
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
  0x15: 'kanto-route-10-area',
  0x16: 'kanto-route-11-area',
  0x17: 'kanto-route-12-area',
  0x18: 'kanto-route-13-area',
  0x19: 'kanto-route-14-area',
  0x1A: 'kanto-route-15-area',
  0x1B: 'kanto-route-16-area',
  0x1C: 'kanto-route-17-area',
  0x1D: 'kanto-route-18-area',
  0x1E: 'kanto-route-19-area',
  0x1F: 'kanto-route-20-area',
  0x20: 'kanto-route-21-area',
  0x21: 'kanto-route-22-area',
  0x22: 'kanto-route-23-area',
  0x23: 'kanto-route-24-area',
  0x24: 'kanto-route-25-area',
  0x28: 'route-8-area', 
  0x5A: 'viridian-forest-area',
  0x5C: 'mt-moon-b1f', 
  0xCA: 'rock-tunnel-1f',
  0xC1: 'power-plant-area',
  0xD4: 'saffron-city-area', 
  0xD6: 'kanto-safari-zone-center',
  0xE2: 'cerulean-cave-1f',
};

export const GEN2_MAP_TO_SLUG: Record<number, Record<number, string>> = {
  3: { 
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
};

export const GEN1_ITEMS = {
  MOON_STONE: 0x0A,
  FIRE_STONE: 0x20,
  THUNDER_STONE: 0x21,
  WATER_STONE: 0x22,
  LEAF_STONE: 0x2F,
};

export const OBEDIENCE_CAPS = [
  { badges: 0, level: 10 },
  { badges: 2, level: 30 }, 
  { badges: 4, level: 50 }, 
  { badges: 6, level: 70 }, 
  { badges: 8, level: 100 }, 
];

export const STATIC_GIFT_DATA: Record<number, { name: string, location: string, reason: string, gen?: number, eventFlag?: number }> = {
  // Gen 1
  1: { name: 'Bulbasaur', location: 'Cerulean City', reason: 'Gift from NPC (Yellow only)', gen: 1, eventFlag: 0x2A1 },
  4: { name: 'Charmander', location: 'Route 24', reason: 'Gift from NPC (Yellow only)', gen: 1, eventFlag: 0x217 },
  7: { name: 'Squirtle', location: 'Vermilion City', reason: 'Gift from Officer Jenny (Yellow only)', gen: 1, eventFlag: 0x221 },
  131: { name: 'Lapras', location: 'Silph Co. 7F', reason: 'Gift from NPC during Silph Co. invasion', gen: 1, eventFlag: 0x190 },
  133: { name: 'Eevee', location: 'Celadon Mansion', reason: 'Gift from the back entrance', gen: 1, eventFlag: 0x2FD },
  106: { name: 'Hitmonlee', location: 'Saffron Fighting Dojo', reason: 'Reward', gen: 1, eventFlag: 0x23B }, 
  107: { name: 'Hitmonchan', location: 'Saffron Fighting Dojo', reason: 'Reward', gen: 1, eventFlag: 0x23B }, // Shared flag for Dojo? Yes, you pick one.
  138: { name: 'Omanyte', location: 'Cinnabar Lab', reason: 'Fossil', gen: 1, eventFlag: 0x232 }, // Dome Fossil? No, shared flag for choosing fossil?
  140: { name: 'Kabuto', location: 'Cinnabar Lab', reason: 'Fossil', gen: 1, eventFlag: 0x232 },
  142: { name: 'Aerodactyl', location: 'Cinnabar Lab', reason: 'Fossil', gen: 1, eventFlag: 0x234 },
  143: { name: 'Snorlax', location: 'Route 12 / 16', reason: 'Static', gen: 1, eventFlag: 0x23F }, // One of the Snorlaxes
  144: { name: 'Articuno', location: 'Seafoam', reason: 'Static', gen: 1, eventFlag: 0x228 },
  145: { name: 'Zapdos', location: 'Power Plant', reason: 'Static', gen: 1, eventFlag: 0x227 },
  146: { name: 'Moltres', location: 'Victory Road', reason: 'Static', gen: 1, eventFlag: 0x230 },
  150: { name: 'Mewtwo', location: 'Cerulean Cave', reason: 'Static', gen: 1, eventFlag: 0x231 },

  // Gen 2 (Placeholder: event flags for Gen 2 are at different offsets and not yet mapped)
  152: { name: 'Chikorita', location: 'New Bark Town', reason: 'Starter', gen: 2 },
  155: { name: 'Cyndaquil', location: 'New Bark Town', reason: 'Starter', gen: 2 },
  158: { name: 'Totodile', location: 'New Bark Town', reason: 'Starter', gen: 2 },
  185: { name: 'Sudowoodo', location: 'Route 36', reason: 'Static (Requires SquirtBottle)', gen: 2 },
  130: { name: 'Gyarados', location: 'Lake of Rage', reason: 'Static (Shiny)', gen: 2 },
  249: { name: 'Lugia', location: 'Whirl Islands', reason: 'Static', gen: 2 },
  250: { name: 'Ho-oh', location: 'Tin Tower', reason: 'Static', gen: 2 },
  245: { name: 'Suicune', location: 'Tin Tower', reason: 'Static (Crystal)', gen: 2 },
  213: { name: 'Shuckle', location: 'Cianwood City', reason: 'Gift from NPC', gen: 2 },
  236: { name: 'Tyrogue', location: 'Mt. Mortar', reason: 'Gift from Kiyo', gen: 2 },
  147: { name: 'Dratini', location: "Dragon's Den", reason: 'Gift from Dragon Elder', gen: 2 },
};

export const GEN1_ROD_IDS = {
  OLD: 76,
  GOOD: 77,
  SUPER: 78
};

export const GEN2_ROD_IDS = {
  OLD: 57,
  GOOD: 58,
  SUPER: 60
};
