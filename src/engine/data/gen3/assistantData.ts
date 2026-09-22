import type { NpcTradeEntry, StaticGiftEntry } from '../gen1/assistantData';

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
    gen3TradeKey: 'MS_NIDO',
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

export const STATIC_GIFT_DATA: Record<number, StaticGiftEntry> = {
  351: {
    name: 'Castform',
    location: 'Weather Institute (Route 119)',
    reason: 'Gift from Researcher',
    gen: 3,
    requiredBadges: 5,
    versions: ['ruby', 'sapphire', 'emerald'],
  },
  375: {
    name: 'Beldum',
    location: "Steven's House (Mossdeep City)",
    reason: 'Post-game Gift',
    gen: 3,
    requiredBadges: 8,
    versions: ['ruby', 'sapphire', 'emerald'],
  },
  360: {
    name: 'Wynaut',
    location: 'Lavaridge Town',
    reason: 'Gift Egg from Old Lady',
    gen: 3,
    requiredBadges: 3,
    versions: ['ruby', 'sapphire', 'emerald'],
  },
  175: {
    name: 'Togepi',
    location: 'Water Labyrinth (Five Island)',
    reason: 'Gift Egg from Gentleman',
    gen: 3,
    requiredBadges: 7,
    versions: ['firered', 'leafgreen'],
  },
  133: {
    name: 'Eevee',
    location: 'Celadon Mansion',
    reason: 'Gift from Back Entrance',
    gen: 3,
    requiredBadges: 3,
    versions: ['firered', 'leafgreen'],
  },
  106: {
    name: 'Hitmonlee',
    location: 'Saffron Fighting Dojo',
    reason: 'Dojo Reward Choice',
    gen: 3,
    requiredBadges: 4,
    versions: ['firered', 'leafgreen'],
  },
  107: {
    name: 'Hitmonchan',
    location: 'Saffron Fighting Dojo',
    reason: 'Dojo Reward Choice',
    gen: 3,
    requiredBadges: 4,
    versions: ['firered', 'leafgreen'],
  },
  143: {
    name: 'Snorlax',
    location: 'Route 12 / 16',
    reason: 'Static Encounter (Requires Poké Flute)',
    gen: 3,
    gen3Key: 'snorlaxRoute12',
    requiredBadges: 3,
    versions: ['firered', 'leafgreen'],
  },
  185: {
    name: 'Sudowoodo',
    location: 'Battle Frontier',
    reason: 'Static Encounter (Requires Wailmer Pail)',
    gen: 3,
    gen3Key: 'sudowoodo',
    requiredBadges: 8,
    versions: ['emerald'],
  },
  150: {
    name: 'Mewtwo',
    location: 'Cerulean Cave',
    reason: 'Static Legendary Encounter',
    gen: 3,
    gen3Key: 'mewtwo',
    requiredBadges: 8,
    versions: ['firered', 'leafgreen'],
  },
  144: {
    name: 'Articuno',
    location: 'Seafoam Islands',
    reason: 'Static Legendary Encounter',
    gen: 3,
    gen3Key: 'articuno',
    requiredBadges: 5,
    versions: ['firered', 'leafgreen'],
  },
  145: {
    name: 'Zapdos',
    location: 'Power Plant',
    reason: 'Static Legendary Encounter',
    gen: 3,
    gen3Key: 'zapdos',
    requiredBadges: 4,
    versions: ['firered', 'leafgreen'],
  },
  146: {
    name: 'Moltres',
    location: 'Mt. Ember',
    reason: 'Static Legendary Encounter',
    gen: 3,
    gen3Key: 'moltres',
    requiredBadges: 7,
    versions: ['firered', 'leafgreen'],
  },
  384: {
    name: 'Rayquaza',
    location: 'Sky Pillar',
    reason: 'Static Legendary Encounter',
    gen: 3,
    gen3Key: 'rayquaza',
    requiredBadges: 8,
    versions: ['ruby', 'sapphire', 'emerald'],
  },
  382: {
    name: 'Kyogre',
    location: 'Marine Cave / Cave of Origin',
    reason: 'Static Legendary Encounter',
    gen: 3,
    gen3Key: 'kyogre',
    requiredBadges: 7,
    versions: ['sapphire', 'emerald'],
  },
  383: {
    name: 'Groudon',
    location: 'Terra Cave / Cave of Origin',
    reason: 'Static Legendary Encounter',
    gen: 3,
    gen3Key: 'groudon',
    requiredBadges: 7,
    versions: ['ruby', 'emerald'],
  },
  377: {
    name: 'Regirock',
    location: 'Desert Ruins',
    reason: 'Static Legendary Encounter',
    gen: 3,
    gen3Key: 'regirock',
    requiredBadges: 5,
    versions: ['ruby', 'sapphire', 'emerald'],
  },
  378: {
    name: 'Regice',
    location: 'Island Cave',
    reason: 'Static Legendary Encounter',
    gen: 3,
    gen3Key: 'regice',
    requiredBadges: 5,
    versions: ['ruby', 'sapphire', 'emerald'],
  },
  379: {
    name: 'Registeel',
    location: 'Ancient Tomb',
    reason: 'Static Legendary Encounter',
    gen: 3,
    gen3Key: 'registeel',
    requiredBadges: 5,
    versions: ['ruby', 'sapphire', 'emerald'],
  },
};
