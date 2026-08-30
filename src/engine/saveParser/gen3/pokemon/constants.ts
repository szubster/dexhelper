/**
 * Maps the 24 possible permutations of a Gen 3 Pokémon's 48-byte data block.
 * The permutation index is determined by `PV % 24`.
 * The four blocks are: Growth (G), Attacks (A), EVs/Condition (E), and Miscellaneous (M).
 */
export const SUBSTRUCTURE_ORDER = [
  'GAEM',
  'GAME',
  'GEAM',
  'GEMA',
  'GMAE',
  'GMEA',
  'AGEM',
  'AGME',
  'AEGM',
  'AEMG',
  'AMGE',
  'AMEG',
  'EGAM',
  'EGMA',
  'EAGM',
  'EAMG',
  'EMGA',
  'EMAG',
  'MGAE',
  'MGEA',
  'MAGE',
  'MAEG',
  'MEGA',
  'MEAG',
];

export const CONDITION_COOL_OFFSET = 0x06;
export const CONDITION_BEAUTY_OFFSET = 0x07;
export const CONDITION_CUTE_OFFSET = 0x08;
export const CONDITION_SMART_OFFSET = 0x09;
export const CONDITION_TOUGH_OFFSET = 0x0a;
export const CONDITION_SHEEN_OFFSET = 0x0b;
