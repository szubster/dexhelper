import type { NpcTradeEntry } from '../gen1/assistantData';

export const STATIC_NPC_TRADE_DATA_RSE: NpcTradeEntry[] = [
  {
    receivedId: 273, // Seedot
    offeredId: 280, // Ralts
    location: 'Rustboro City (trade house)',
    receivedOtName: 'KOBE',
    nickname: 'DOTS',
    gen: 3,
    versions: ['ruby', 'sapphire', 'emerald'],
    gen3TradeKey: 'RUSTBORO',
  },
  {
    receivedId: 311, // Plusle
    offeredId: 313, // Volbeat
    location: 'Fortree City (trade house)',
    receivedOtName: 'ROMAN',
    nickname: 'PLUSES',
    gen: 3,
    versions: ['ruby', 'sapphire', 'emerald'],
    gen3TradeKey: 'FORTREE',
  },
  {
    receivedId: 116, // Horsea
    offeredId: 371, // Bagon
    location: 'Pacifidlog Town (trade house)',
    receivedOtName: 'SKYLAR',
    nickname: 'SEASOR',
    gen: 3,
    versions: ['ruby', 'sapphire', 'emerald'],
    gen3TradeKey: 'PACIFIDLOG',
  },
  {
    receivedId: 52, // Meowth
    offeredId: 300, // Skitty
    location: 'Battle Frontier (trade house)',
    receivedOtName: 'ISIS',
    nickname: 'MEOWOW',
    gen: 3,
    versions: ['emerald'],
    gen3TradeKey: 'BATTLE_FRONTIER',
  },
];

export const STATIC_NPC_TRADE_DATA_FRLG: NpcTradeEntry[] = [
  {
    receivedId: 122, // Mr. Mime
    offeredId: 63, // Abra
    location: 'Route 2 (trade house)',
    receivedOtName: 'REYLEY',
    nickname: 'MIMIEN',
    gen: 3,
    versions: ['firered', 'leafgreen'],
    gen3TradeKey: 'MIMIEN',
  },
  {
    receivedId: 124, // Jynx
    offeredId: 61, // Poliwhirl
    location: 'Cerulean City (trade house)',
    receivedOtName: 'DONTAE',
    nickname: 'ZYNX',
    gen: 3,
    versions: ['firered', 'leafgreen'],
    gen3TradeKey: 'ZYNX',
  },
  {
    receivedId: 29, // Nidoran F
    offeredId: 32, // Nidoran M
    location: 'Underground Path (Route 5)',
    receivedOtName: 'SAIGE',
    nickname: 'MS. NIDO',
    gen: 3,
    versions: ['firered'],
    gen3TradeKey: 'MS_NIDO',
  },
  {
    receivedId: 32, // Nidoran M
    offeredId: 29, // Nidoran F
    location: 'Underground Path (Route 5)',
    receivedOtName: 'SAIGE',
    nickname: 'MR. NIDO',
    gen: 3,
    versions: ['leafgreen'],
    gen3TradeKey: 'MS_NIDO', // For LeafGreen it's MR. NIDO technically in game, but uses same flag? Actually wait! Let's check parser.
  },
  {
    receivedId: 83, // Farfetch'd
    offeredId: 21, // Spearow
    location: 'Vermilion City (trade house)',
    receivedOtName: 'ELYSSA',
    nickname: "CH'DING",
    gen: 3,
    versions: ['firered', 'leafgreen'],
    gen3TradeKey: 'CH_DING',
  },
  {
    receivedId: 30, // Nidorina
    offeredId: 33, // Nidorino
    location: 'Route 11 (trade house)',
    receivedOtName: 'TURNER',
    nickname: 'NINA',
    gen: 3,
    versions: ['firered'],
    gen3TradeKey: 'NINA',
  },
  {
    receivedId: 33, // Nidorino
    offeredId: 30, // Nidorina
    location: 'Route 11 (trade house)',
    receivedOtName: 'TURNER',
    nickname: 'NINO',
    gen: 3,
    versions: ['leafgreen'],
    gen3TradeKey: 'NINA',
  },
  {
    receivedId: 108, // Lickitung
    offeredId: 55, // Golduck
    location: 'Route 18 (trade house)',
    receivedOtName: 'HADEN',
    nickname: 'MARC',
    gen: 3,
    versions: ['firered'],
    gen3TradeKey: 'MARC',
  },
  {
    receivedId: 108, // Lickitung
    offeredId: 80, // Slowbro
    location: 'Route 18 (trade house)',
    receivedOtName: 'HADEN',
    nickname: 'MARC',
    gen: 3,
    versions: ['leafgreen'],
    gen3TradeKey: 'MARC',
  },
  {
    receivedId: 101, // Electrode
    offeredId: 26, // Raichu
    location: 'Cinnabar Island (trade house)',
    receivedOtName: 'CLIFTON',
    nickname: 'ESPHERE',
    gen: 3,
    versions: ['firered', 'leafgreen'],
    gen3TradeKey: 'ESPHERE',
  },
  {
    receivedId: 114, // Tangela
    offeredId: 48, // Venonat
    location: 'Cinnabar Island (trade house)',
    receivedOtName: 'NORMA',
    nickname: 'TANGENY',
    gen: 3,
    versions: ['firered', 'leafgreen'],
    gen3TradeKey: 'TANGENY',
  },
  {
    receivedId: 86, // Seel
    offeredId: 77, // Ponyta
    location: 'Cinnabar Island (trade house)',
    receivedOtName: 'GARETT',
    nickname: 'SEELOR',
    gen: 3,
    versions: ['firered', 'leafgreen'],
    gen3TradeKey: 'SEELOR',
  },
];

export const STATIC_NPC_TRADE_DATA: NpcTradeEntry[] = [...STATIC_NPC_TRADE_DATA_RSE, ...STATIC_NPC_TRADE_DATA_FRLG];

export const STATIC_GIFT_DATA: Record<
  number,
  { name: string; location: string; reason: string; gen?: number; eventFlag?: number; requiredBadges?: number }
> = {};
