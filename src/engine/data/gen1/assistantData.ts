import { GEN1_MAPS } from '../../mapGraph/gen1Graph';

// This file maps internal game IDs to standard names or PokeAPI slugs

/** Map Area IDs keyed by generation number. Gen 1 uses flat mapId→aid, Gen 2 uses mapGroup→mapId→aid */
export const MAP_TO_AID: Record<number, Record<number, number> | Record<number, Record<number, number>>> = {
  1: {
    0x00: 285, // Pallet Town
    0x01: 280, // Viridian City
    0x02: 1200, // Pewter City
    0x03: 281, // Cerulean City
    0x04: 336, // Pokémon Tower (Closest for LavenderTown)
    0x05: 282, // Vermilion City
    0x06: 1300, // Celadon City
    0x07: 284, // Fuchsia City
    0x08: 279, // Cinnabar Island
    0x0a: 762, // Saffron City
    0x0c: 295, // Route 1
    0x0d: 1040, // Route 2
    0x0e: 297, // Route 3
    0x0f: 298, // Route 4
    0x10: 1047, // Route 5
    0x11: 300, // Route 6
    0x12: 301, // Route 7
    0x13: 302, // Route 8
    0x14: 303, // Route 9
    0x15: 304, // Route 10
    0x16: 305, // Route 11
    0x17: 276, // Route 12
    0x18: 306, // Route 13
    0x19: 307, // Route 14
    0x1a: 308, // Route 15
    0x1b: 309, // Route 16
    0x1c: 310, // Route 17
    0x1d: 311, // Route 18
    0x1e: 730, // Route 19
    0x1f: 731, // Route 20
    0x20: 732, // Route 21
    0x21: 313, // Route 22
    0x22: 329, // Route 23
    0x23: 314, // Route 24
    0x24: 315, // Route 25
    0x28: 302, // Route 8
    0x5a: 321, // Viridian Forest
    0x5c: 290, // Mt. Moon
    0xca: 292, // Rock Tunnel
    0xc1: 330, // Power Plant
    0xd4: 762, // Saffron City
    0xd6: 431, // Safari Zone
    0xe2: 323, // Cerulean Cave
  } as Record<number, number>,
  2: {
    3: {
      1: 184, // New Bark Town
      2: 186, // Cherrygrove City
      3: 189, // Violet City
      4: 798, // Azalea Town
      5: 235, // Cianwood City
      6: 765, // Goldenrod City
      7: 224, // Olivine City
      8: 211, // Ecruteak City
      9: 247, // Mahogany Town
      10: 242, // Lake of Rage
      11: 249, // Blackthorn City
    },
  } as Record<number, Record<number, number>>,
};

// Convenience re-exports for backward compatibility and internal tools
export const GEN1_MAP_TO_AID = MAP_TO_AID[1] as Record<number, number>;
export const GEN2_MAP_TO_AID = MAP_TO_AID[2] as Record<number, Record<number, number>>;

// Create a mapping from PokeAPI Area ID (aid) to human-readable names
// This is used for UI components that display encounter locations
export const GEN1_AID_TO_NAME: Record<number, string> = Object.fromEntries(
  Object.entries(GEN1_MAP_TO_AID).map(([mid, aid]) => [aid, GEN1_MAPS[Number(mid)]?.name || 'Unknown Location']),
);

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
  { name: string; location: string; reason: string; gen?: number; eventFlag?: number }
> = {
  // Gen 1
  1: {
    name: 'Bulbasaur',
    location: 'Cerulean City',
    reason: 'Gift from NPC (Yellow only)',
    gen: 1,
    eventFlag: 0x2a1,
  },
  4: {
    name: 'Charmander',
    location: 'Route 24',
    reason: 'Gift from NPC (Yellow only)',
    gen: 1,
    eventFlag: 0x217,
  },
  7: {
    name: 'Squirtle',
    location: 'Vermilion City',
    reason: 'Gift from Officer Jenny (Yellow only)',
    gen: 1,
    eventFlag: 0x221,
  },
  131: {
    name: 'Lapras',
    location: 'Silph Co. 7F',
    reason: 'Gift from NPC during Silph Co. invasion',
    gen: 1,
    eventFlag: 0x190,
  },
  133: {
    name: 'Eevee',
    location: 'Celadon Mansion',
    reason: 'Gift from the back entrance',
    gen: 1,
    eventFlag: 0x2fd,
  },
  106: {
    name: 'Hitmonlee',
    location: 'Saffron Fighting Dojo',
    reason: 'Reward',
    gen: 1,
    eventFlag: 0x23b,
  },
  107: {
    name: 'Hitmonchan',
    location: 'Saffron Fighting Dojo',
    reason: 'Reward',
    gen: 1,
    eventFlag: 0x23b,
  }, // Shared flag for Dojo? Yes, you pick one.
  138: { name: 'Omanyte', location: 'Cinnabar Lab', reason: 'Fossil', gen: 1, eventFlag: 0x232 }, // Dome Fossil? No, shared flag for choosing fossil?
  140: { name: 'Kabuto', location: 'Cinnabar Lab', reason: 'Fossil', gen: 1, eventFlag: 0x232 },
  142: { name: 'Aerodactyl', location: 'Cinnabar Lab', reason: 'Fossil', gen: 1, eventFlag: 0x234 },
  143: { name: 'Snorlax', location: 'Route 12 / 16', reason: 'Static', gen: 1, eventFlag: 0x23f }, // One of the Snorlaxes
  144: { name: 'Articuno', location: 'Seafoam', reason: 'Static', gen: 1, eventFlag: 0x228 },
  145: { name: 'Zapdos', location: 'Power Plant', reason: 'Static', gen: 1, eventFlag: 0x227 },
  146: { name: 'Moltres', location: 'Victory Road', reason: 'Static', gen: 1, eventFlag: 0x230 },
  150: { name: 'Mewtwo', location: 'Cerulean Cave', reason: 'Static', gen: 1, eventFlag: 0x231 },

  // Gen 2 (Placeholder: event flags for Gen 2 are at different offsets and not yet mapped)
  152: { name: 'Chikorita', location: 'New Bark Town', reason: 'Starter', gen: 2 },
  155: { name: 'Cyndaquil', location: 'New Bark Town', reason: 'Starter', gen: 2 },
  158: { name: 'Totodile', location: 'New Bark Town', reason: 'Starter', gen: 2 },
  185: {
    name: 'Sudowoodo',
    location: 'Route 36',
    reason: 'Static (Requires SquirtBottle)',
    gen: 2,
  },
  130: { name: 'Gyarados', location: 'Lake of Rage', reason: 'Static (Shiny)', gen: 2 },
  249: { name: 'Lugia', location: 'Whirl Islands', reason: 'Static', gen: 2 },
  250: { name: 'Ho-oh', location: 'Tin Tower', reason: 'Static', gen: 2 },
  245: { name: 'Suicune', location: 'Tin Tower', reason: 'Static (Crystal)', gen: 2 },
  213: { name: 'Shuckle', location: 'Cianwood City', reason: 'Gift from NPC', gen: 2 },
  236: { name: 'Tyrogue', location: 'Mt. Mortar', reason: 'Gift from Kiyo', gen: 2 },
  147: { name: 'Dratini', location: "Dragon's Den", reason: 'Gift from Dragon Elder', gen: 2 },
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
  // Farfetch'd for Spearow — Vermilion City (TRADE_FOR_DUX) — Red/Blue only (Wild in Yellow)
  {
    receivedId: 83,
    offeredId: 21,
    location: 'Vermilion City (trade house)',
    receivedOtName: 'DUX',
    gen: 1,
    versions: ['red', 'blue'],
    tradeIndex: 4,
  },
  // Jynx for Poliwhirl — Cerulean City (underground path house) (TRADE_FOR_LOLA) — Red/Blue only (Not in Yellow)
  {
    receivedId: 124,
    offeredId: 61,
    location: 'Cerulean City (trade house)',
    receivedOtName: 'LOLA',
    gen: 1,
    versions: ['red', 'blue'],
    tradeIndex: 6,
  },
  // Mr. Mime for Abra — Route 2 (south gate) (TRADE_FOR_MARCEL) — Red/Blue only
  {
    receivedId: 122,
    offeredId: 63,
    location: 'Route 2 (south gate)',
    receivedOtName: 'MARCEL',
    gen: 1,
    versions: ['red', 'blue'],
    tradeIndex: 1,
  },
  // Mr. Mime for Clefairy — Route 2 (south gate) (TRADE_FOR_MILES) — Yellow only
  {
    receivedId: 122,
    offeredId: 35,
    location: 'Route 2 (south gate)',
    receivedOtName: 'MILES',
    gen: 1,
    versions: ['yellow'],
    tradeIndex: 1,
  },
  // Lickitung for Slowbro — Route 18 (TRADE_FOR_MARC) — Red/Blue only (Wild in Yellow)
  {
    receivedId: 108,
    offeredId: 80,
    location: 'Route 18 (gatehouse upstairs)',
    receivedOtName: 'MARC',
    gen: 1,
    versions: ['red', 'blue'],
    tradeIndex: 5,
  },
  // Tangela for Venonat — Route 18 (trade house) — Yellow version only (TRADE_FOR_CRINKLES)
  {
    receivedId: 114,
    offeredId: 49,
    location: 'Route 18 (trade house)',
    receivedOtName: 'CRINKLES',
    gen: 1,
    versions: ['yellow'],
    tradeIndex: 8,
  },
  // Cubone for Machoke — Route 5 (south gate) — Yellow only
  {
    receivedId: 67,
    offeredId: 104,
    location: 'Route 5 (south gate)',
    receivedOtName: 'RICKY',
    gen: 1,
    versions: ['yellow'],
    tradeIndex: 2,
  },
  // Lickitung for Dugtrio — Route 11 (east gate) — Yellow only
  {
    receivedId: 108,
    offeredId: 51,
    location: 'Route 11 (east gate)',
    receivedOtName: 'GURIO',
    gen: 1,
    versions: ['yellow'],
    tradeIndex: 3,
  },
  // Growlithe for Dewgong — Cinnabar Island (Lab) — Yellow only
  {
    receivedId: 87,
    offeredId: 58,
    location: 'Cinnabar Lab (3rd room)',
    receivedOtName: 'CEZANNE',
    gen: 1,
    versions: ['yellow'],
    tradeIndex: 7,
  },
  // Kangaskhan for Muk — Cinnabar Island (Lab) — Yellow only
  {
    receivedId: 89,
    offeredId: 115,
    location: 'Cinnabar Lab (1st room)',
    receivedOtName: 'STICKLY',
    gen: 1,
    versions: ['yellow'],
    tradeIndex: 9,
  },
  // Golduck for Rhydon — Cinnabar Island (Lab) — Yellow only
  {
    receivedId: 112,
    offeredId: 55,
    location: 'Cinnabar Lab (3rd room)',
    receivedOtName: 'BUFFY',
    gen: 1,
    versions: ['yellow'],
    tradeIndex: 10,
  },

  // ── Gen 2 ────────────────────────────────────────────────────────────────
  // Machop for Drowzee — Goldenrod City (trade house) — Gold/Silver/Crystal
  {
    receivedId: 66,
    offeredId: 96,
    location: 'Goldenrod City (trade house)',
    receivedOtName: 'KYLE',
    gen: 2,
  },
  // Onix for Bellsprout — Violet City (trade house) — Gold/Silver/Crystal
  {
    receivedId: 95,
    offeredId: 69,
    location: 'Violet City (trade house)',
    receivedOtName: 'KYLE',
    gen: 2,
  },
  // Haunter for Drowzee — Sprout Tower? No — actually Goldenrod trade house has Abra trade too
  // Abra for Drowzee — Goldenrod City (2F of trade house) — Gold/Silver/Crystal
  {
    receivedId: 63,
    offeredId: 96,
    location: 'Goldenrod City (trade center, 2F)',
    receivedOtName: 'NOB',
    gen: 2,
  },
  // Voltorb for Krabby — New Bark Town neighbor — Crystal only
  {
    receivedId: 100,
    offeredId: 98,
    location: "Fisher's house (Route 30 area)",
    receivedOtName: 'TOM',
    gen: 2,
    versions: ['crystal'],
  },
];
