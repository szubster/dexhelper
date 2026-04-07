// This file maps internal game IDs to standard names or PokeAPI slugs

/** Map slugs keyed by generation number. Gen 1 uses flat mapId→slug, Gen 2 uses mapGroup→mapId→slug */
export const MAP_TO_SLUG: Record<
  number,
  Record<number, string> | Record<number, Record<number, string>>
> = {
  1: {
    0: "pallet-town-area",
    1: "viridian-city-area",
    2: "pewter-city-area",
    3: "cerulean-city-area",
    4: "lavender-town-area",
    5: "vermilion-city-area",
    6: "celadon-city-area",
    7: "fuchsia-city-area",
    8: "cinnabar-island-area",
    10: "saffron-city-area",
    12: "route-1-area",
    13: "route-2-area",
    14: "route-3-area",
    15: "route-4-area",
    16: "route-5-area",
    17: "route-6-area",
    18: "route-7-area",
    19: "route-8-area",
    20: "route-9-area",
    21: "kanto-route-10-area",
    22: "kanto-route-11-area",
    23: "kanto-route-12-area",
    24: "kanto-route-13-area",
    25: "kanto-route-14-area",
    26: "kanto-route-15-area",
    27: "kanto-route-16-area",
    28: "kanto-route-17-area",
    29: "kanto-route-18-area",
    30: "kanto-route-19-area",
    31: "kanto-route-20-area",
    32: "kanto-route-21-area",
    33: "kanto-route-22-area",
    34: "kanto-route-23-area",
    35: "kanto-route-24-area",
    36: "kanto-route-25-area",
    40: "route-8-area",
    90: "viridian-forest-area",
    92: "mt-moon-b1f",
    202: "rock-tunnel-1f",
    193: "power-plant-area",
    212: "saffron-city-area",
    214: "kanto-safari-zone-center",
    226: "cerulean-cave-1f",
  } as Record<number, string>,
  2: {
    3: {
      1: "new-bark-town-area",
      2: "cherrygrove-city-area",
      3: "violet-city-area",
      4: "azalea-town-area",
      5: "cianwood-city-area",
      6: "goldenrod-city-area",
      7: "olivine-city-area",
      8: "ecruteak-city-area",
      9: "mahogany-town-area",
      10: "lake-of-rage-area",
      11: "blackthorn-city-area",
    },
  } as Record<number, Record<number, string>>,
};

// Convenience re-exports for backward compatibility
export const GEN1_MAP_TO_SLUG = MAP_TO_SLUG[1] as Record<number, string>;
export const GEN2_MAP_TO_SLUG = MAP_TO_SLUG[2] as Record<
  number,
  Record<number, string>
>;

export const GEN1_ITEMS = {
  MOON_STONE: 0x0a,
  FIRE_STONE: 0x20,
  THUNDER_STONE: 0x21,
  WATER_STONE: 0x22,
  LEAF_STONE: 0x2f,
};

export const OBEDIENCE_CAPS = [
  { badges: 0, level: 10 },
  { badges: 2, level: 30 },
  { badges: 4, level: 50 },
  { badges: 6, level: 70 },
  { badges: 8, level: 100 },
];

export const STATIC_GIFT_DATA: Record<
  number,
  {
    name: string;
    location: string;
    reason: string;
    gen?: number;
    eventFlag?: number;
  }
> = {
  // Gen 1
  1: {
    name: "Bulbasaur",
    location: "Cerulean City",
    reason: "Gift from NPC (Yellow only)",
    gen: 1,
    eventFlag: 0x2a1,
  },
  4: {
    name: "Charmander",
    location: "Route 24",
    reason: "Gift from NPC (Yellow only)",
    gen: 1,
    eventFlag: 0x217,
  },
  7: {
    name: "Squirtle",
    location: "Vermilion City",
    reason: "Gift from Officer Jenny (Yellow only)",
    gen: 1,
    eventFlag: 0x221,
  },
  131: {
    name: "Lapras",
    location: "Silph Co. 7F",
    reason: "Gift from NPC during Silph Co. invasion",
    gen: 1,
    eventFlag: 0x190,
  },
  133: {
    name: "Eevee",
    location: "Celadon Mansion",
    reason: "Gift from the back entrance",
    gen: 1,
    eventFlag: 0x2fd,
  },
  106: {
    name: "Hitmonlee",
    location: "Saffron Fighting Dojo",
    reason: "Reward",
    gen: 1,
    eventFlag: 0x23b,
  },
  107: {
    name: "Hitmonchan",
    location: "Saffron Fighting Dojo",
    reason: "Reward",
    gen: 1,
    eventFlag: 0x23b,
  }, // Shared flag for Dojo? Yes, you pick one.
  138: {
    name: "Omanyte",
    location: "Cinnabar Lab",
    reason: "Fossil",
    gen: 1,
    eventFlag: 0x232,
  }, // Dome Fossil? No, shared flag for choosing fossil?
  140: {
    name: "Kabuto",
    location: "Cinnabar Lab",
    reason: "Fossil",
    gen: 1,
    eventFlag: 0x232,
  },
  142: {
    name: "Aerodactyl",
    location: "Cinnabar Lab",
    reason: "Fossil",
    gen: 1,
    eventFlag: 0x234,
  },
  143: {
    name: "Snorlax",
    location: "Route 12 / 16",
    reason: "Static",
    gen: 1,
    eventFlag: 0x23f,
  }, // One of the Snorlaxes
  144: {
    name: "Articuno",
    location: "Seafoam",
    reason: "Static",
    gen: 1,
    eventFlag: 0x228,
  },
  145: {
    name: "Zapdos",
    location: "Power Plant",
    reason: "Static",
    gen: 1,
    eventFlag: 0x227,
  },
  146: {
    name: "Moltres",
    location: "Victory Road",
    reason: "Static",
    gen: 1,
    eventFlag: 0x230,
  },
  150: {
    name: "Mewtwo",
    location: "Cerulean Cave",
    reason: "Static",
    gen: 1,
    eventFlag: 0x231,
  },

  // Gen 2 (Placeholder: event flags for Gen 2 are at different offsets and not yet mapped)
  152: {
    name: "Chikorita",
    location: "New Bark Town",
    reason: "Starter",
    gen: 2,
  },
  155: {
    name: "Cyndaquil",
    location: "New Bark Town",
    reason: "Starter",
    gen: 2,
  },
  158: {
    name: "Totodile",
    location: "New Bark Town",
    reason: "Starter",
    gen: 2,
  },
  185: {
    name: "Sudowoodo",
    location: "Route 36",
    reason: "Static (Requires SquirtBottle)",
    gen: 2,
  },
  130: {
    name: "Gyarados",
    location: "Lake of Rage",
    reason: "Static (Shiny)",
    gen: 2,
  },
  249: { name: "Lugia", location: "Whirl Islands", reason: "Static", gen: 2 },
  250: { name: "Ho-oh", location: "Tin Tower", reason: "Static", gen: 2 },
  245: {
    name: "Suicune",
    location: "Tin Tower",
    reason: "Static (Crystal)",
    gen: 2,
  },
  213: {
    name: "Shuckle",
    location: "Cianwood City",
    reason: "Gift from NPC",
    gen: 2,
  },
  236: {
    name: "Tyrogue",
    location: "Mt. Mortar",
    reason: "Gift from Kiyo",
    gen: 2,
  },
  147: {
    name: "Dratini",
    location: "Dragon's Den",
    reason: "Gift from Dragon Elder",
    gen: 2,
  },
};

/**
 * In-game NPC trades (not via link cable). These are one-time trades with NPCs in the game world.
 * `receivedId`   — pokémon species ID you receive
 * `offeredId`    — pokémon species ID you must hand over
 * `location`     — human-readable location description
 * `versions`     — which game versions this trade exists in (empty = all versions in that gen)
 * `receivedOtName` — the OT name the game assigns to the received pokémon (used to detect if claimed)
 * `gen`          — generation the trade belongs to
 */
export interface NpcTradeEntry {
  receivedId: number;
  offeredId: number;
  location: string;
  versions?: string[];
  receivedOtName: string;
  gen: number;
  tradeIndex?: number; // The index of the trade in wCompletedInGameTradeFlags
}

export const STATIC_NPC_TRADE_DATA: NpcTradeEntry[] = [
  // ── Gen 1 ────────────────────────────────────────────────────────────────
  // The bit indices correspond to the order in data/events/trades.asm in the pokered disassembly.
  // Farfetch'd for Spearow — Vermilion City (TRADE_FOR_DUX)
  {
    receivedId: 83,
    offeredId: 21,
    location: "Vermilion City (trade house)",
    receivedOtName: "DUX",
    gen: 1,
    tradeIndex: 4,
  },
  // Jynx for Poliwhirl — Cerulean City (underground path house) (TRADE_FOR_LOLA)
  {
    receivedId: 124,
    offeredId: 60,
    location: "Cerulean City (trade house)",
    receivedOtName: "LOLA",
    gen: 1,
    tradeIndex: 6,
  },
  // Mr. Mime for Clefairy — Route 2 (south gate) (TRADE_FOR_MARCEL)
  {
    receivedId: 122,
    offeredId: 35,
    location: "Route 2 (south gate)",
    receivedOtName: "MARCEL",
    gen: 1,
    tradeIndex: 1,
  },
  // Lickitung for Slowbro — Cinnabar Island (trade house) (TRADE_FOR_MARC)
  {
    receivedId: 108,
    offeredId: 80,
    location: "Cinnabar Island (trade house)",
    receivedOtName: "MARC",
    gen: 1,
    tradeIndex: 5,
  },
  // Tangela for Venonat — Route 18 (trade house) — Yellow version only (TRADE_FOR_CRINKLES)
  {
    receivedId: 114,
    offeredId: 49,
    location: "Route 18 (trade house)",
    receivedOtName: "CRINKLES",
    gen: 1,
    versions: ["yellow"],
    tradeIndex: 8,
  },

  // ── Gen 2 ────────────────────────────────────────────────────────────────
  // Machop for Drowzee — Goldenrod City (trade house) — Gold/Silver/Crystal
  {
    receivedId: 66,
    offeredId: 96,
    location: "Goldenrod City (trade house)",
    receivedOtName: "KYLE",
    gen: 2,
  },
  // Onix for Bellsprout — Violet City (trade house) — Gold/Silver/Crystal
  {
    receivedId: 95,
    offeredId: 69,
    location: "Violet City (trade house)",
    receivedOtName: "KYLE",
    gen: 2,
  },
  // Haunter for Drowzee — Sprout Tower? No — actually Goldenrod trade house has Abra trade too
  // Abra for Drowzee — Goldenrod City (2F of trade house) — Gold/Silver/Crystal
  {
    receivedId: 63,
    offeredId: 96,
    location: "Goldenrod City (trade center, 2F)",
    receivedOtName: "NOB",
    gen: 2,
  },
  // Voltorb for Krabby — New Bark Town neighbor — Crystal only
  {
    receivedId: 100,
    offeredId: 98,
    location: "Fisher's house (Route 30 area)",
    receivedOtName: "TOM",
    gen: 2,
    versions: ["crystal"],
  },
];
