// src/engine/data/gen1/assistantData.ts

// This file maps internal game IDs to standard names or PokeAPI slugs

export const STATIC_GIFT_DATA: Record<
  number,
  { name: string; location: string; reason: string; gen?: number; eventFlag?: number; requiredBadges?: number }
> = {
  // Gen 1
  1: {
    name: 'Bulbasaur',
    location: 'Cerulean City',
    reason: 'Gift from NPC (Yellow only)',
    gen: 1,
    eventFlag: 0x2a1,
    requiredBadges: 1, // Need to reach Cerulean City (Brock)
  },
  4: {
    name: 'Charmander',
    location: 'Route 24',
    reason: 'Gift from NPC (Yellow only)',
    gen: 1,
    eventFlag: 0x217,
    requiredBadges: 1, // Need to reach Cerulean City (Brock)
  },
  7: {
    name: 'Squirtle',
    location: 'Vermilion City',
    reason: 'Gift from Officer Jenny (Yellow only)',
    gen: 1,
    eventFlag: 0x221,
    requiredBadges: 2, // Need Thunderbadge (Surge) actually not strictly required for city but makes sense
  },
  131: {
    name: 'Lapras',
    location: 'Silph Co. 7F',
    reason: 'Gift from NPC during Silph Co. invasion',
    gen: 1,
    eventFlag: 0x190,
    requiredBadges: 4, // Needs to reach Saffron / Silph Co (usually requires 4 badges)
  },
  133: {
    name: 'Eevee',
    location: 'Celadon Mansion',
    reason: 'Gift from the back entrance',
    gen: 1,
    eventFlag: 0x2fd,
    requiredBadges: 2, // Reach Celadon City (usually 2+ badges)
  },
  106: {
    name: 'Hitmonlee',
    location: 'Saffron Fighting Dojo',
    reason: 'Reward',
    gen: 1,
    eventFlag: 0x23b,
    requiredBadges: 4, // Reach Saffron City
  },
  107: {
    name: 'Hitmonchan',
    location: 'Saffron Fighting Dojo',
    reason: 'Reward',
    gen: 1,
    eventFlag: 0x23b,
    requiredBadges: 4, // Reach Saffron City
  }, // Shared flag for Dojo? Yes, you pick one.
  138: { name: 'Omanyte', location: 'Cinnabar Lab', reason: 'Fossil', gen: 1, eventFlag: 0x232, requiredBadges: 6 }, // Reach Cinnabar (usually 6 badges)
  140: { name: 'Kabuto', location: 'Cinnabar Lab', reason: 'Fossil', gen: 1, eventFlag: 0x232, requiredBadges: 6 },
  142: { name: 'Aerodactyl', location: 'Cinnabar Lab', reason: 'Fossil', gen: 1, eventFlag: 0x234, requiredBadges: 6 },
  143: { name: 'Snorlax', location: 'Route 12 / 16', reason: 'Static', gen: 1, eventFlag: 0x23f, requiredBadges: 3 }, // Need Poke Flute (Lavender Town, so 3+ badges usually)
  144: { name: 'Articuno', location: 'Seafoam', reason: 'Static', gen: 1, eventFlag: 0x228, requiredBadges: 5 }, // Need Surf/Strength (5+ badges)
  145: { name: 'Zapdos', location: 'Power Plant', reason: 'Static', gen: 1, eventFlag: 0x227, requiredBadges: 3 }, // Need Surf (from Safari Zone/Koga so usually 4, but let's say 3+)
  146: { name: 'Moltres', location: 'Victory Road', reason: 'Static', gen: 1, eventFlag: 0x230, requiredBadges: 8 }, // Need all 8 badges to reach Victory Road
  150: { name: 'Mewtwo', location: 'Cerulean Cave', reason: 'Static', gen: 1, eventFlag: 0x231, requiredBadges: 8 }, // Need to beat E4
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
  nickname?: string; // The nickname of the received Pokémon
  gen: number;
  tradeIndex?: number; // The index of the trade in wCompletedInGameTradeFlags
  gen3TradeKey?: string; // The string key returned by the Gen 3 parser (e.g. "RUSTBORO")
}

export const STATIC_NPC_TRADE_DATA: NpcTradeEntry[] = [
  // ── Gen 1 ────────────────────────────────────────────────────────────────
  // Red/Blue Trades
  {
    receivedId: 30, // Nidorina
    offeredId: 33, // Nidorino
    location: 'Route 11 (east gate)',
    receivedOtName: 'TERRY',
    nickname: 'TERRY',
    gen: 1,
    versions: ['red', 'blue'],
    tradeIndex: 0,
  },
  {
    receivedId: 122, // Mr. Mime
    offeredId: 63, // Abra
    location: 'Route 2 (south gate)',
    receivedOtName: 'MARCEL',
    nickname: 'MARCEL',
    gen: 1,
    versions: ['red', 'blue'],
    tradeIndex: 1,
  },
  {
    receivedId: 86, // Seel
    offeredId: 77, // Ponyta
    location: 'Cinnabar Lab (1st room)',
    receivedOtName: 'SAILOR',
    nickname: 'SAILOR',
    gen: 1,
    versions: ['red', 'blue'],
    tradeIndex: 3,
  },
  {
    receivedId: 83, // Farfetch'd
    offeredId: 21, // Spearow
    location: 'Vermilion City (trade house)',
    receivedOtName: 'DUX',
    nickname: 'DUX',
    gen: 1,
    versions: ['red', 'blue'],
    tradeIndex: 4,
  },
  {
    receivedId: 108, // Lickitung
    offeredId: 80, // Slowbro
    location: 'Route 18 (gatehouse upstairs)',
    receivedOtName: 'MARC',
    nickname: 'MARC',
    gen: 1,
    versions: ['red', 'blue'],
    tradeIndex: 5,
  },
  {
    receivedId: 124, // Jynx
    offeredId: 61, // Poliwhirl
    location: 'Cerulean City (trade house)',
    receivedOtName: 'LOLA',
    nickname: 'LOLA',
    gen: 1,
    versions: ['red', 'blue'],
    tradeIndex: 6,
  },
  {
    receivedId: 101, // Electrode
    offeredId: 26, // Raichu
    location: 'Cinnabar Lab (3rd room)',
    receivedOtName: 'DORIS',
    nickname: 'DORIS',
    gen: 1,
    versions: ['red', 'blue'],
    tradeIndex: 7,
  },
  {
    receivedId: 114, // Tangela
    offeredId: 48, // Venonat
    location: 'Route 18 (trade house)',
    receivedOtName: 'CRINKLES',
    nickname: 'CRINKLES',
    gen: 1,
    versions: ['red', 'blue'],
    tradeIndex: 8,
  },
  {
    receivedId: 29, // Nidoran F
    offeredId: 32, // Nidoran M
    location: 'Route 5 (south gate)',
    receivedOtName: 'SPOT',
    nickname: 'SPOT',
    gen: 1,
    versions: ['red', 'blue'],
    tradeIndex: 9,
  },

  // Yellow Trades
  {
    receivedId: 51, // Dugtrio
    offeredId: 108, // Lickitung
    location: 'Route 11 (east gate)',
    receivedOtName: 'GURIO',
    nickname: 'GURIO',
    gen: 1,
    versions: ['yellow'],
    tradeIndex: 0,
  },
  {
    receivedId: 122, // Mr. Mime
    offeredId: 35, // Clefairy
    location: 'Route 2 (south gate)',
    receivedOtName: 'MILES',
    nickname: 'MILES',
    gen: 1,
    versions: ['yellow'],
    tradeIndex: 1,
  },
  {
    receivedId: 89, // Muk
    offeredId: 115, // Kangaskhan
    location: 'Cinnabar Lab (1st room)',
    receivedOtName: 'STICKY',
    nickname: 'STICKY',
    gen: 1,
    versions: ['yellow'],
    tradeIndex: 3,
  },
  {
    receivedId: 47, // Parasect
    offeredId: 114, // Tangela
    location: 'Route 18 (trade house)',
    receivedOtName: 'SPIKE',
    nickname: 'SPIKE',
    gen: 1,
    versions: ['yellow'],
    tradeIndex: 5,
  },
  {
    receivedId: 112, // Rhydon
    offeredId: 55, // Golduck
    location: 'Cinnabar Lab (3rd room)',
    receivedOtName: 'BUFFY',
    nickname: 'BUFFY',
    gen: 1,
    versions: ['yellow'],
    tradeIndex: 7,
  },
  {
    receivedId: 87, // Dewgong
    offeredId: 58, // Growlithe
    location: 'Cinnabar Lab (3rd room)',
    receivedOtName: 'CEZANNE',
    nickname: 'CEZANNE',
    gen: 1,
    versions: ['yellow'],
    tradeIndex: 8,
  },
  {
    receivedId: 67, // Machoke
    offeredId: 104, // Cubone
    location: 'Route 5 (south gate)',
    receivedOtName: 'RICKY',
    nickname: 'RICKY',
    gen: 1,
    versions: ['yellow'],
    tradeIndex: 9,
  },
];
