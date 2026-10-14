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

import type { StaticGiftEntry } from '../gen1/assistantData';

export const STATIC_GIFT_DATA: Record<number, StaticGiftEntry> = {
  // --- Gifts / Starters / Static Encounters (FRLG) ---
  1: {
    name: 'Bulbasaur',
    location: 'Pallet Town',
    reason: 'Starter Choice',
    gen: 3,
    versions: ['firered', 'leafgreen'],
  },
  4: {
    name: 'Charmander',
    location: 'Pallet Town',
    reason: 'Starter Choice',
    gen: 3,
    versions: ['firered', 'leafgreen'],
  },
  7: {
    name: 'Squirtle',
    location: 'Pallet Town',
    reason: 'Starter Choice',
    gen: 3,
    versions: ['firered', 'leafgreen'],
  },
  131: {
    name: 'Lapras',
    location: 'Silph Co. 7F',
    reason: 'Gift from Silph Co. Employee',
    gen: 3,
    versions: ['firered', 'leafgreen'],
    requiredBadges: 4,
  },
  133: {
    name: 'Eevee',
    location: 'Celadon Mansion',
    reason: 'Gift from the back entrance',
    gen: 3,
    versions: ['firered', 'leafgreen'],
    requiredBadges: 3,
  },
  106: {
    name: 'Hitmonlee',
    location: 'Saffron Fighting Dojo',
    reason: 'Dojo Reward',
    gen: 3,
    versions: ['firered', 'leafgreen'],
    requiredBadges: 4,
  },
  107: {
    name: 'Hitmonchan',
    location: 'Saffron Fighting Dojo',
    reason: 'Dojo Reward',
    gen: 3,
    versions: ['firered', 'leafgreen'],
    requiredBadges: 4,
  },
  138: {
    name: 'Omanyte',
    location: 'Cinnabar Lab',
    reason: 'Helix Fossil Revival',
    gen: 3,
    versions: ['firered', 'leafgreen'],
    requiredBadges: 6,
  },
  140: {
    name: 'Kabuto',
    location: 'Cinnabar Lab',
    reason: 'Dome Fossil Revival',
    gen: 3,
    versions: ['firered', 'leafgreen'],
    requiredBadges: 6,
  },
  142: {
    name: 'Aerodactyl',
    location: 'Cinnabar Lab',
    reason: 'Old Amber Revival',
    gen: 3,
    versions: ['firered', 'leafgreen'],
    requiredBadges: 6,
  },
  143: {
    name: 'Snorlax',
    location: 'Route 12 / Route 16',
    reason: 'Static (Requires Poké Flute)',
    gen: 3,
    versions: ['firered', 'leafgreen'],
    gen3StaticKey: 'snorlaxRoute12',
  },
  144: {
    name: 'Articuno',
    location: 'Seafoam Islands',
    reason: 'Legendary Static Encounter',
    gen: 3,
    versions: ['firered', 'leafgreen'],
    gen3StaticKey: 'articuno',
  },
  145: {
    name: 'Zapdos',
    location: 'Power Plant',
    reason: 'Legendary Static Encounter',
    gen: 3,
    versions: ['firered', 'leafgreen'],
    gen3StaticKey: 'zapdos',
  },
  146: {
    name: 'Moltres',
    location: 'Mt. Ember',
    reason: 'Legendary Static Encounter',
    gen: 3,
    versions: ['firered', 'leafgreen'],
    gen3StaticKey: 'moltres',
  },
  150: {
    name: 'Mewtwo',
    location: 'Cerulean Cave',
    reason: 'Legendary Static Encounter',
    gen: 3,
    versions: ['firered', 'leafgreen'],
    gen3StaticKey: 'mewtwo',
  },
  175: {
    name: 'Togepi',
    location: 'Water Labyrinth (Five Island)',
    reason: 'Gift Egg from Gentleman',
    gen: 3,
    versions: ['firered', 'leafgreen'],
    requiredBadges: 7,
  },

  // --- Gifts / Starters / Static Encounters (RSE) ---
  252: {
    name: 'Treecko',
    location: 'Route 101',
    reason: 'Starter Choice',
    gen: 3,
    versions: ['ruby', 'sapphire', 'emerald'],
  },
  255: {
    name: 'Torchic',
    location: 'Route 101',
    reason: 'Starter Choice',
    gen: 3,
    versions: ['ruby', 'sapphire', 'emerald'],
  },
  258: {
    name: 'Mudkip',
    location: 'Route 101',
    reason: 'Starter Choice',
    gen: 3,
    versions: ['ruby', 'sapphire', 'emerald'],
  },
  152: {
    name: 'Chikorita',
    location: 'Littleroot Town (Prof. Birch)',
    reason: 'Post-game Hoenn Dex Completion Gift',
    gen: 3,
    versions: ['emerald'],
    requiredBadges: 8,
  },
  155: {
    name: 'Cyndaquil',
    location: 'Littleroot Town (Prof. Birch)',
    reason: 'Post-game Hoenn Dex Completion Gift',
    gen: 3,
    versions: ['emerald'],
    requiredBadges: 8,
  },
  158: {
    name: 'Totodile',
    location: 'Littleroot Town (Prof. Birch)',
    reason: 'Post-game Hoenn Dex Completion Gift',
    gen: 3,
    versions: ['emerald'],
    requiredBadges: 8,
  },
  360: {
    name: 'Wynaut',
    location: 'Lavaridge Town',
    reason: 'Gift Egg from Old Lady near Hot Springs',
    gen: 3,
    versions: ['ruby', 'sapphire', 'emerald'],
    requiredBadges: 3,
  },
  374: {
    name: 'Beldum',
    location: "Mossdeep City (Steven's House)",
    reason: "Post-game Gift Poké Ball on Steven's desk",
    gen: 3,
    versions: ['ruby', 'sapphire', 'emerald'],
    requiredBadges: 8,
  },
  345: {
    name: 'Lileep',
    location: 'Devon Corp (Rustboro City)',
    reason: 'Root Fossil Revival',
    gen: 3,
    versions: ['ruby', 'sapphire', 'emerald'],
  },
  347: {
    name: 'Anorith',
    location: 'Devon Corp (Rustboro City)',
    reason: 'Claw Fossil Revival',
    gen: 3,
    versions: ['ruby', 'sapphire', 'emerald'],
  },
  185: {
    name: 'Sudowoodo',
    location: 'Battle Frontier',
    reason: 'Static Encounter (Requires Wailmer Pail)',
    gen: 3,
    versions: ['emerald'],
    gen3StaticKey: 'sudowoodo',
  },
  101: {
    name: 'Electrode',
    location: 'Aqua / Magma Hideout & New Mauville',
    reason: 'Trap Static Encounter',
    gen: 3,
    versions: ['ruby', 'sapphire', 'emerald'],
    gen3StaticKey: 'electrode1',
  },
  377: {
    name: 'Regirock',
    location: 'Desert Ruins (Route 111)',
    reason: 'Legendary Static Encounter',
    gen: 3,
    versions: ['ruby', 'sapphire', 'emerald'],
    gen3StaticKey: 'regirock',
  },
  378: {
    name: 'Regice',
    location: 'Island Cave (Route 105)',
    reason: 'Legendary Static Encounter',
    gen: 3,
    versions: ['ruby', 'sapphire', 'emerald'],
    gen3StaticKey: 'regice',
  },
  379: {
    name: 'Registeel',
    location: 'Ancient Tomb (Route 120)',
    reason: 'Legendary Static Encounter',
    gen: 3,
    versions: ['ruby', 'sapphire', 'emerald'],
    gen3StaticKey: 'registeel',
  },
  382: {
    name: 'Kyogre',
    location: 'Cave of Origin / Marine Cave',
    reason: 'Legendary Static Encounter',
    gen: 3,
    versions: ['sapphire', 'emerald'],
    gen3StaticKey: 'kyogre',
  },
  383: {
    name: 'Groudon',
    location: 'Cave of Origin / Terra Cave',
    reason: 'Legendary Static Encounter',
    gen: 3,
    versions: ['ruby', 'emerald'],
    gen3StaticKey: 'groudon',
  },
  384: {
    name: 'Rayquaza',
    location: 'Sky Pillar',
    reason: 'Legendary Static Encounter',
    gen: 3,
    versions: ['ruby', 'sapphire', 'emerald'],
    gen3StaticKey: 'rayquaza',
  },
};
