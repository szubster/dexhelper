/**
 * Build-time mapping data for Gen 2 (Johto).
 * Maps mapGroup -> mapId -> PokeAPI Area ID (aid).
 */

export interface Gen2MapNode {
  name: string;
  aid: number;
}

export const GEN2_MAP_TO_AID: Record<number, Record<number, Gen2MapNode>> = {
  3: {
    1: { name: 'New Bark Town', aid: 184 },
    2: { name: 'Cherrygrove City', aid: 186 },
    3: { name: 'Violet City', aid: 189 },
    4: { name: 'Azalea Town', aid: 798 },
    5: { name: 'Cianwood City', aid: 235 },
    6: { name: 'Goldenrod City', aid: 765 },
    7: { name: 'Olivine City', aid: 224 },
    8: { name: 'Ecruteak City', aid: 211 },
    9: { name: 'Mahogany Town', aid: 247 },
    10: { name: 'Lake of Rage', aid: 242 },
    11: { name: 'Blackthorn City', aid: 249 },
    15: { name: 'National Park', aid: 440 },
    22: { name: 'Ruins of Alph', aid: 200 },
    37: { name: 'Union Cave', aid: 799 },
    40: { name: 'Slowpoke Well', aid: 801 },
    52: { name: 'Ilex Forest', aid: 441 },
    57: { name: 'Mt. Mortar', aid: 248 },
    61: { name: 'Ice Path', aid: 250 },
    66: { name: 'Whirl Islands', aid: 237 },
    74: { name: 'Silver Cave', aid: 252 },
    78: { name: 'Dark Cave', aid: 191 },
    80: { name: "Dragon's Den", aid: 251 },
    83: { name: 'Tohjo Falls', aid: 843 },
  },
  10: { 
    1: { name: 'Route 31', aid: 415 }, 
    2: { name: 'Route 32', aid: 418 }, 
    3: { name: 'Route 33', aid: 419 }, 
    4: { name: 'Route 34', aid: 420 } 
  }, // Routes near Violet
  24: { 
    1: { name: 'Route 26', aid: 409 }, 
    2: { name: 'Route 27', aid: 410 }, 
    3: { name: 'Route 29', aid: 412 }, 
    4: { name: 'New Bark Town', aid: 184 } 
  }, // Route 26, 27, 29, New Bark
  26: { 
    1: { name: 'Route 30', aid: 413 }, 
    2: { name: 'Route 31', aid: 414 } 
  }, // Route 30, 31
  1: { 
    9: { name: 'Route 38', aid: 421 }, 
    10: { name: 'Route 39', aid: 422 } 
  }, // Route 38, 39
  2: { 
    4: { name: 'Route 42', aid: 425 }, 
    5: { name: 'Route 44', aid: 425 }, 
    6: { name: 'Route 44', aid: 427 } 
  }, // Route 42, 44
  11: { 
    1: { name: 'Route 34', aid: 417 }, 
    22: { name: 'Route 34', aid: 420 }, 
    23: { name: 'Route 34', aid: 420 } 
  }, // Route 34
  5: { 
    8: { name: 'Route 45', aid: 428 }, 
    9: { name: 'Route 46', aid: 429 } 
  }, // Route 45, 46
  9: { 
    3: { name: 'Route 43', aid: 426 }, 
    4: { name: 'Route 43', aid: 426 }, 
    5: { name: 'Route 43', aid: 426 } 
  }, // Route 43
  22: { 
    1: { name: 'Route 40', aid: 423 }, 
    2: { name: 'Route 41', aid: 424 } 
  }, // Route 40, 41
};

export const encodeGen2Id = (group: number, id: number) => (group << 8) | id;
export const decodeGen2Id = (encoded: number) => ({ group: encoded >> 8, id: encoded & 0xff });
