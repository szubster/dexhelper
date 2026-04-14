/**
 * Build-time mapping data for Gen 2 (Johto).
 * Maps mapGroup -> mapId -> PokeAPI Area ID (aid).
 */

export const GEN2_MAP_TO_AID: Record<number, Record<number, number>> = {
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
    15: 440, // National Park
    22: 200, // Ruins of Alph
    37: 799, // Union Cave
    40: 801, // Slowpoke Well
    52: 441, // Ilex Forest
    57: 248, // Mt. Mortar
    61: 250, // Ice Path
    66: 237, // Whirl Islands
    74: 252, // Silver Cave
    78: 191, // Dark Cave
    80: 251, // Dragon's Den
    83: 843, // Tohjo Falls
  },
  10: { 1: 415, 2: 418, 3: 419, 4: 420 }, // Routes near Violet
  24: { 1: 409, 2: 410, 3: 412, 4: 184 }, // Route 26, 27, 29, New Bark
  26: { 1: 413, 2: 414 }, // Route 30, 31
  1: { 9: 421, 10: 422 }, // Route 38, 39
  2: { 4: 425, 5: 425, 6: 427 }, // Route 42, 44
  11: { 1: 417, 22: 420, 23: 420 }, // Route 34
  5: { 8: 428, 9: 429 }, // Route 45, 46
  9: { 3: 426, 4: 426, 5: 426 }, // Route 43
  22: { 1: 423, 2: 424 }, // Route 40, 41
};

export const encodeGen2Id = (group: number, id: number) => (group << 8) | id;
export const decodeGen2Id = (encoded: number) => ({ group: encoded >> 8, id: encoded & 0xff });
