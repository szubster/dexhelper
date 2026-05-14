import type { NpcTradeEntry } from '../gen1/assistantData';

export const STATIC_GIFT_DATA: Record<
  number,
  { name: string; location: string; reason: string; gen?: number; eventFlag?: number; requiredBadges?: number }
> = {
  175: { name: 'Togepi', location: 'Violet City', reason: 'Gift from Aide', gen: 2 },
  133: { name: 'Eevee', location: 'Goldenrod City', reason: 'Gift from Bill', gen: 2 },
  213: { name: 'Shuckle', location: 'Cianwood City', reason: 'Gift from Kirk', gen: 2 },
  147: { name: 'Dratini', location: "Dragon's Den", reason: 'Gift from Dragon Elder', gen: 2 },
  236: { name: 'Tyrogue', location: 'Mt. Mortar', reason: 'Gift from Kiyo', gen: 2 },

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
};

export const STATIC_NPC_TRADE_DATA: NpcTradeEntry[] = [
  {
    receivedId: 66,
    offeredId: 96,
    location: 'Goldenrod City (trade house)',
    receivedOtName: 'MUSCLE',
    gen: 2,
  },
  {
    receivedId: 95,
    offeredId: 69,
    location: 'Violet City (trade house)',
    receivedOtName: 'ROCKY',
    gen: 2,
  },
  {
    receivedId: 63,
    offeredId: 96,
    location: 'Goldenrod City (trade center, 2F)',
    receivedOtName: 'NOB',
    gen: 2,
  },
  {
    receivedId: 100,
    offeredId: 98,
    location: "Fisher's house (Route 30 area)",
    receivedOtName: 'TOM',
    gen: 2,
    versions: ['crystal'],
  },
];
