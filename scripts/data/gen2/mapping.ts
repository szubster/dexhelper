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
  1: {
    9: { name: 'Route 38', aid: 421, connections: [0x0308, 0x010a] },
    10: { name: 'Route 39', aid: 422, connections: [0x0109, 0x0307] },
  },
  2: {
    4: { name: 'Route 42', aid: 236, connections: [0x0308, 0x0339, 0x0309] },
    5: { name: 'Route 44', aid: 243, connections: [0x0309, 0x033d] },
    6: { name: 'Route 44', aid: 243, connections: [0x0309, 0x033d] },
  },
  3: {
    1: { name: 'New Bark Town', aid: 184, connections: [0x1803] },
    2: { name: 'Cherrygrove City', aid: 186, connections: [0x1803, 0x1a01] },
    3: { name: 'Violet City', aid: 189, connections: [0x1a02, 0x0a02] },
    4: { name: 'Azalea Town', aid: 798, connections: [0x0a03, 0x0334, 0x0328] },
    5: { name: 'Cianwood City', aid: 235, connections: [0x1602] },
    6: { name: 'Goldenrod City', aid: 765, connections: [0x0a04, 0x0b01] },
    7: { name: 'Olivine City', aid: 224, connections: [0x010a, 0x1601] },
    8: { name: 'Ecruteak City', aid: 211, connections: [0x0109, 0x0204] },
    9: { name: 'Mahogany Town', aid: 247, connections: [0x0204, 0x0903, 0x0205] },
    10: { name: 'Lake of Rage', aid: 242, connections: [0x0903] },
    11: { name: 'Blackthorn City', aid: 249, connections: [0x033d, 0x0508] },
    15: { name: 'National Park', aid: 440, connections: [0x0b01] },
    22: { name: 'Ruins of Alph', aid: 200, connections: [0x0a02] },
    37: { name: 'Union Cave', aid: 799, connections: [0x0a02, 0x0a03] },
    40: { name: 'Slowpoke Well', aid: 801, connections: [0x0304] },
    52: { name: 'Ilex Forest', aid: 441, connections: [0x0304, 0x0a04] },
    57: { name: 'Mt. Mortar', aid: 248, connections: [0x0204] },
    61: { name: 'Ice Path', aid: 250, connections: [0x0205, 0x030b] },
    66: { name: 'Whirl Islands', aid: 237, connections: [0x1602] },
    74: { name: 'Silver Cave', aid: 269, connections: [0x1302] },
    78: { name: 'Dark Cave', aid: 191, connections: [0x1a02, 0x0508] },
    80: { name: "Dragon's Den", aid: 251, connections: [0x030b] },
    83: { name: 'Tohjo Falls', aid: 843, connections: [0x1802] },
  },
  5: {
    8: { name: 'Route 45', aid: 251, connections: [0x030b, 0x034e, 0x0509] },
    9: { name: 'Route 46', aid: 252, connections: [0x0508, 0x1803] },
  },
  6: {
    5: { name: 'Route 19', aid: -1, connections: [0x1106, 0x0606] },
    6: { name: 'Route 20', aid: -1, connections: [0x0605, 0x0608] },
    7: { name: 'Route 21', aid: -1, connections: [0x0608, 0x0d02] },
    8: { name: 'Cinnabar Island', aid: -1, connections: [0x0606, 0x0607] },
  },
  7: {
    1: { name: 'Cerulean City', aid: -1, connections: [0x0e03, 0x0706, 0x0704] },
    4: { name: 'Route 5', aid: -1, connections: [0x0701, 0x1902] },
    6: { name: 'Route 9', aid: -1, connections: [0x0701, 0x0707] },
    7: { name: 'Route 10', aid: -1, connections: [0x0706, 0x1204, 0x070c] },
    12: { name: 'Rock Tunnel', aid: -1, connections: [0x0707] },
  },
  9: {
    3: { name: 'Route 43', aid: 241, connections: [0x0309, 0x030a] },
    4: { name: 'Route 43', aid: 241, connections: [0x0309, 0x030a] },
    5: { name: 'Route 43', aid: 241, connections: [0x0309, 0x030a] },
  },
  10: {
    1: { name: 'Route 31', aid: 415, connections: [0x1a01, 0x0303, 0x034e] },
    2: { name: 'Route 32', aid: 418, connections: [0x0303, 0x0316, 0x0325] },
    3: { name: 'Route 33', aid: 419, connections: [0x0325, 0x0304] },
    4: { name: 'Route 34', aid: 420, connections: [0x0334, 0x0306] },
  },
  11: {
    1: { name: 'Route 35', aid: 417, connections: [0x0306, 0x030f, 0x0b02] },
    2: { name: 'Route 36', aid: -1, connections: [0x0b01, 0x0b03] },
    3: { name: 'Route 37', aid: -1, connections: [0x0b02, 0x0308] },
    22: { name: 'Route 34', aid: 420 },
    23: { name: 'Route 34', aid: 420 },
  },
  12: {
    1: { name: 'Route 6', aid: -1, connections: [0x1902, 0x0c03] },
    2: { name: 'Route 11', aid: -1, connections: [0x0c03, 0x1103] },
    3: { name: 'Vermilion City', aid: -1, connections: [0x0c01, 0x0c02] },
  },
  13: {
    1: { name: 'Route 1', aid: -1, connections: [0x0d02, 0x1703] },
    2: { name: 'Pallet Town', aid: -1, connections: [0x0d01, 0x0607] },
  },
  14: {
    1: { name: 'Route 3', aid: -1, connections: [0x0e02, 0x0e06] },
    2: { name: 'Pewter City', aid: -1, connections: [0x1702, 0x0e01] },
    3: { name: 'Route 4', aid: -1, connections: [0x0e06, 0x0701] },
    6: { name: 'Mt. Moon', aid: -1, connections: [0x0e01, 0x0e03] },
  },
  17: {
    1: { name: 'Route 13', aid: -1, connections: [0x1103, 0x1102] },
    2: { name: 'Route 14', aid: -1, connections: [0x1101, 0x1104] },
    3: { name: 'Route 12', aid: -1, connections: [0x1204, 0x0c02, 0x1101] },
    4: { name: 'Route 15', aid: -1, connections: [0x1102, 0x1106] },
    5: { name: 'Route 18', aid: -1, connections: [0x1503, 0x1106] },
    6: { name: 'Fuchsia City', aid: -1, connections: [0x1104, 0x1105, 0x0605] },
  },
  18: {
    2: { name: 'Route 8', aid: -1, connections: [0x1902, 0x1204] },
    4: { name: 'Lavender Town', aid: -1, connections: [0x0707, 0x1202, 0x1103] },
  },
  19: {
    1: { name: 'Route 28', aid: 289, connections: [0x1801, 0x1302] },
    2: { name: 'Silver Cave Outside', aid: 269, connections: [0x1301, 0x034a] },
  },
  21: {
    1: { name: 'Route 16', aid: -1, connections: [0x1504, 0x1503] },
    2: { name: 'Route 7', aid: -1, connections: [0x1504, 0x1902] },
    3: { name: 'Route 17', aid: -1, connections: [0x1501, 0x1105] },
    4: { name: 'Celadon City', aid: -1, connections: [0x1502, 0x1501] },
  },
  22: {
    1: { name: 'Route 40', aid: 225, connections: [0x0307, 0x1602] },
    2: { name: 'Route 41', aid: 226, connections: [0x1601, 0x0305, 0x0342] },
  },
  23: {
    1: { name: 'Route 22', aid: -1, connections: [0x1703, 0x1801] },
    2: { name: 'Route 2', aid: -1, connections: [0x1703, 0x0e02, 0x1707] },
    3: { name: 'Viridian City', aid: -1, connections: [0x0d01, 0x1701, 0x1702] },
    7: { name: 'Digletts Cave', aid: -1, connections: [0x1702, 0x0c02] },
  },
  24: {
    1: { name: 'Route 26', aid: 409, connections: [0x1802, 0x1701] },
    2: { name: 'Route 27', aid: 410, connections: [0x1803, 0x0353, 0x1801] },
    3: { name: 'Route 29', aid: 412, connections: [0x0301, 0x1802, 0x0302] },
    4: { name: 'New Bark Town', aid: 184, connections: [0x1803] },
  },
  25: {
    2: { name: 'Saffron City', aid: -1, connections: [0x0704, 0x0c01, 0x1502, 0x1202] },
  },
  26: {
    1: { name: 'Route 30', aid: 413, connections: [0x0302, 0x1a02] },
    2: { name: 'Route 31', aid: 414, connections: [0x1a01, 0x0303, 0x034e] },
  },
};

export const decodeGen2Id = (encoded: number) => ({ group: encoded >> 8, id: encoded & 0xff });
