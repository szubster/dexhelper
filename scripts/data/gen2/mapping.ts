/**
 * Build-time mapping data for Gen 2 (Johto).
 * Maps mapGroup -> mapId -> PokeAPI Area ID (aid).
 */

interface Gen2MapNode {
  name: string;
  aid: number;
  connections?: number[];
}

export const GEN2_MAP_TO_AID: Record<number, Record<number, Gen2MapNode>> = {
  3: {
    1: { name: 'New Bark Town', aid: 184, connections: [0x1803] }, // Rd 29
    2: { name: 'Cherrygrove City', aid: 186, connections: [0x1803, 0x1a01] }, // Rd 29, Rd 30
    3: { name: 'Violet City', aid: 189, connections: [0x1a02, 0x0a02] }, // Rd 31, Rd 32
    4: { name: 'Azalea Town', aid: 798, connections: [0x0a03, 0x0334, 0x0328] }, // Rd 33, Well, Ilex
    5: { name: 'Cianwood City', aid: 235, connections: [0x1602] }, // Rd 41
    6: { name: 'Goldenrod City', aid: 765, connections: [0x0a04, 0x0b01] }, // Rd 34, Rd 35
    7: { name: 'Olivine City', aid: 224, connections: [0x010a, 0x1601] }, // Rd 39, Rd 40
    8: { name: 'Ecruteak City', aid: 211, connections: [0x0109, 0x0204] }, // Rd 38, Rd 42
    9: { name: 'Mahogany Town', aid: 247, connections: [0x0204, 0x0903, 0x0205] }, // Rd 42, Rd 43, Rd 44
    10: { name: 'Lake of Rage', aid: 242, connections: [0x0903] }, // Rd 43
    11: { name: 'Blackthorn City', aid: 249, connections: [0x033d, 0x0508] }, // Ice Path, Rd 45
    15: { name: 'National Park', aid: 440, connections: [0x0b01] }, // Rd 35
    22: { name: 'Ruins of Alph', aid: 200, connections: [0x0a02] }, // Rd 32
    37: { name: 'Union Cave', aid: 799, connections: [0x0a02, 0x0a03] }, // Rd 32, Rd 33
    40: { name: 'Slowpoke Well', aid: 801, connections: [0x0304] }, // Azalea
    52: { name: 'Ilex Forest', aid: 441, connections: [0x0304, 0x0a04] }, // Azalea, Rd 34
    57: { name: 'Mt. Mortar', aid: 248, connections: [0x0204] }, // Rd 42
    61: { name: 'Ice Path', aid: 250, connections: [0x0205, 0x030b] }, // Rd 44, Blackthorn
    66: { name: 'Whirl Islands', aid: 237, connections: [0x1602] }, // Rd 41
    74: { name: 'Silver Cave', aid: 252, connections: [] }, 
    78: { name: 'Dark Cave', aid: 191, connections: [0x1a02, 0x0508] }, // Rd 31, Rd 45
    80: { name: "Dragon's Den", aid: 251, connections: [0x030b] }, // Blackthorn
    83: { name: 'Tohjo Falls', aid: 843, connections: [0x1802] }, // Rd 27
  },
  10: { 
    1: { name: 'Route 31', aid: 415, connections: [0x1a01, 0x0303, 0x034e] }, 
    2: { name: 'Route 32', aid: 418, connections: [0x0303, 0x0316, 0x0325] }, 
    3: { name: 'Route 33', aid: 419, connections: [0x0325, 0x0304] }, 
    4: { name: 'Route 34', aid: 420, connections: [0x0334, 0x0306] } 
  },
  24: { 
    1: { name: 'Route 26', aid: 409, connections: [0x1802] }, 
    2: { name: 'Route 27', aid: 410, connections: [0x1803, 0x0353, 0x1801] }, 
    3: { name: 'Route 29', aid: 412, connections: [0x0301, 0x1802, 0x0302] }, 
    4: { name: 'New Bark Town', aid: 184, connections: [0x1803] } 
  },
  26: { 
    1: { name: 'Route 30', aid: 413, connections: [0x0302, 0x1a02] }, 
    2: { name: 'Route 31', aid: 414, connections: [0x1a01, 0x0303, 0x034e] } 
  },
  1: { 
    9: { name: 'Route 38', aid: 421, connections: [0x0308, 0x010a] }, 
    10: { name: 'Route 39', aid: 422, connections: [0x0109, 0x0307] } 
  },
  2: { 
    4: { name: 'Route 42', aid: 425, connections: [0x0308, 0x0339, 0x0309] }, 
    5: { name: 'Route 44', aid: 425, connections: [0x0309, 0x033d] }, 
    6: { name: 'Route 44', aid: 427, connections: [0x0309, 0x033d] } 
  },
  11: { 
    1: { name: 'Route 35', aid: 417, connections: [0x0306, 0x030f] }, 
    22: { name: 'Route 34', aid: 420 }, 
    23: { name: 'Route 34', aid: 420 } 
  },
  5: { 
    8: { name: 'Route 45', aid: 428, connections: [0x030b, 0x034e, 0x0509] }, 
    9: { name: 'Route 46', aid: 429, connections: [0x0508, 0x1803] } 
  },
  9: { 
    3: { name: 'Route 43', aid: 426, connections: [0x0309, 0x030a] }, 
    4: { name: 'Route 43', aid: 426, connections: [0x0309, 0x030a] }, 
    5: { name: 'Route 43', aid: 426, connections: [0x0309, 0x030a] } 
  },
  22: { 
    1: { name: 'Route 40', aid: 423, connections: [0x0307, 0x1602] }, 
    2: { name: 'Route 41', aid: 424, connections: [0x1601, 0x0305, 0x0342] } 
  },
};

export const decodeGen2Id = (encoded: number) => ({ group: encoded >> 8, id: encoded & 0xff });
