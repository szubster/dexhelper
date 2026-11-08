import { ENCOUNTER_METHOD } from '../../db/schema';

export const METHOD_NAMES: Record<number, string> = {
  [ENCOUNTER_METHOD.WALK]: 'walk',
  [ENCOUNTER_METHOD.SURF]: 'surf',
  [ENCOUNTER_METHOD.OLD_ROD]: 'old-rod',
  [ENCOUNTER_METHOD.GOOD_ROD]: 'good-rod',
  [ENCOUNTER_METHOD.SUPER_ROD]: 'super-rod',
  [ENCOUNTER_METHOD.GIFT]: 'gift',
  [ENCOUNTER_METHOD.ROCK_SMASH]: 'rock-smash',
  [ENCOUNTER_METHOD.HEADBUTT]: 'headbutt',
};

// Gen 1 Species IDs
export const SPECIES_MEWTWO = 150;

// Gen 2 Species IDs
export const SPECIES_TYROGUE = 236;
export const SPECIES_HITMONLEE = 106;
export const SPECIES_HITMONCHAN = 107;
export const SPECIES_HITMONTOP = 237;

export const SPECIES_RAIKOU = 243;
export const SPECIES_ENTEI = 244;
export const SPECIES_SUICUNE = 245;

// Gen 3 Species IDs
export const SPECIES_LATIAS = 380;
export const SPECIES_LATIOS = 381;
export const SPECIES_KYOGRE = 382;
export const SPECIES_GROUDON = 383;

// Priorities
export const PRIORITY_WEATHER_ANOMALY = 115;
export const PRIORITY_ROAMER = 115;

// Emerald Weather Anomaly Location ID Mappings
export const WEATHER_ANOMALY_MARINE_ROUTES: Record<number, string> = {
  0: 'Route 105',
  1: 'Route 125',
  2: 'Route 127',
  3: 'Route 129',
};

export const WEATHER_ANOMALY_TERRA_ROUTES: Record<number, string> = {
  4: 'Route 114',
  5: 'Route 115',
  6: 'Route 116',
  7: 'Route 118',
};

// Trade Evolutions & Mythicals
export const SPECIES_ALAKAZAM = 65;
export const SPECIES_MACHAMP = 68;
export const SPECIES_GOLEM = 76;
export const SPECIES_GENGAR = 94;
export const SPECIES_POLITOED = 186;
export const SPECIES_SLOWKING = 199;
export const SPECIES_STEELIX = 208;
export const SPECIES_SCIZOR = 212;
export const SPECIES_KINGDRA = 230;
export const SPECIES_PORYGON2 = 233;
export const SPECIES_CELEBI = 251;
export const SPECIES_HUNTAIL = 367;
export const SPECIES_GOREBYSS = 368;
export const SPECIES_JIRACHI = 385;
export const SPECIES_DEOXYS = 386;
