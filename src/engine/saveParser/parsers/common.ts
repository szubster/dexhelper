export type GameVersion = 'red' | 'blue' | 'yellow' | 'gold' | 'silver' | 'crystal' | 'unknown';
export type Generation = number;

export interface PokemonInstance {
  speciesId: number;
  level: number;
  isShiny: boolean;
  item?: number | undefined;
  moves: number[];
  friendship?: number | undefined;
  pokerus?: number | undefined;
  caughtData?:
    | {
        time: 'Morning' | 'Day' | 'Night' | 'Unknown';
        level: number;
        location: number;
        locationName?: string | undefined;
      }
    | undefined;
  otName?: string | undefined;
  storageLocation: string;
  slot?: number | undefined; // 1-indexed slot in party or box
}

export interface SaveData {
  generation: Generation;
  owned: Set<number>;
  seen: Set<number>;
  party: number[];
  pc: number[];
  partyDetails: PokemonInstance[];
  pcDetails: PokemonInstance[];
  gameVersion: GameVersion;
  badges: number;
  trainerName: string;
  trainerId: number;
  currentMapId: number;
  currentMapName?: string;
  mapGroup?: number;
  johtoBadges?: number;
  kantoBadges?: number;
  inventory: { id: number; quantity: number }[];
  currentBoxCount: number;
  hallOfFameCount: number;
  eventFlags?: Uint8Array;
  npcTradeFlags?: number;
  daycare?: PokemonInstance[];
  daycareHasEgg?: boolean;
}

export function byte(u8: Uint8Array, offset: number): number {
  return u8[offset] ?? 0;
}

const GEN12_CHAR_MAP: Record<number, string> = {
  0x7f: ' ',
  0x80: 'A',
  0x81: 'B',
  0x82: 'C',
  0x83: 'D',
  0x84: 'E',
  0x85: 'F',
  0x86: 'G',
  0x87: 'H',
  0x88: 'I',
  0x89: 'J',
  0x8a: 'K',
  0x8b: 'L',
  0x8c: 'M',
  0x8d: 'N',
  0x8e: 'O',
  0x8f: 'P',
  0x90: 'Q',
  0x91: 'R',
  0x92: 'S',
  0x93: 'T',
  0x94: 'U',
  0x95: 'V',
  0x96: 'W',
  0x97: 'X',
  0x98: 'Y',
  0x99: 'Z',
  0x9a: '(',
  0x9b: ')',
  0x9c: ':',
  0x9d: ';',
  0x9e: '[',
  0x9f: ']',
  0xa0: 'a',
  0xa1: 'b',
  0xa2: 'c',
  0xa3: 'd',
  0xa4: 'e',
  0xa5: 'f',
  0xa6: 'g',
  0xa7: 'h',
  0xa8: 'i',
  0xa9: 'j',
  0xaa: 'k',
  0xab: 'l',
  0xac: 'm',
  0xad: 'n',
  0xae: 'o',
  0xaf: 'p',
  0xb0: 'q',
  0xb1: 'r',
  0xb2: 's',
  0xb3: 't',
  0xb4: 'u',
  0xb5: 'v',
  0xb6: 'w',
  0xb7: 'x',
  0xb8: 'y',
  0xb9: 'z',
  0xe0: "'",
  0xe1: 'PK',
  0xe2: 'MN',
  0xe3: '-',
  0xe6: '?',
  0xe7: '!',
  0xe8: '♂',
  0xe9: '/',
  0xea: ',',
  0xed: '♀',
  0xee: '0',
  0xef: '1',
  0xf0: '2',
  0xf1: '3',
  0xf2: '4',
  0xf3: '5',
  0xf4: '6',
  0xf5: '7',
  0xf6: '8',
  0xf7: '9',
};

export function decodeGen12String(u8: Uint8Array, offset: number, maxLength: number = 11): string {
  let result = '';
  for (let i = 0; i < maxLength; i++) {
    const charCode = u8[offset + i];
    if (charCode === undefined || charCode === 0x50 || charCode === 0x00 || charCode === 0xff) break;
    result += GEN12_CHAR_MAP[charCode] ?? '?';
  }
  return result.trim();
}

export function parseDVs(dvBytes: Uint8Array) {
  const b0 = dvBytes[0] ?? 0;
  const b1 = dvBytes[1] ?? 0;
  const atk = b0 >> 4;
  const def = b0 & 0x0f;
  const spd = b1 >> 4;
  const spc = b1 & 0x0f;
  const hp = ((atk & 1) << 3) | ((def & 1) << 2) | ((spd & 1) << 1) | (spc & 1);
  return { hp, atk, def, spd, spc };
}

export function checkShiny(dvs: { atk: number; def: number; spd: number; spc: number }) {
  return dvs.def === 10 && dvs.spd === 10 && dvs.spc === 10 && [2, 3, 6, 7, 10, 11, 14, 15].includes(dvs.atk);
}
