// There are 32 unique letters allowed in a successful phrase for Walda.
// All vowels are excluded, as well as X/x, Y/y, l, r, t, v, w, and z.
const sWaldaLettersTable = [
  'B',
  'C',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'M',
  'N',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'V',
  'W',
  'Z',
  'b',
  'c',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'm',
  'n',
  'p',
  'q',
  's',
];

// Based on Pokémon Emerald decompiled source for custom wallpapers
const WALLPAPER_THEMES = [
  {
    name: 'Pika',
    bgLo: 13,
    bgHi: 15,
    fgLo: 2,
    fgHi: 2,
    iconId: 2,
    patternId: 2,
  },
  {
    name: 'Smeargle',
    bgLo: 5,
    bgHi: 10,
    fgLo: 1,
    fgHi: 1,
    iconId: 1,
    patternId: 1,
  },
  {
    name: 'Pikachu',
    bgLo: 14,
    bgHi: 15,
    fgLo: 0,
    fgHi: 0,
    iconId: 0,
    patternId: 1,
  },
  {
    name: 'Zubat',
    bgLo: 15,
    bgHi: 15,
    fgLo: 3,
    fgHi: 3,
    iconId: 3,
    patternId: 3,
  },
  {
    name: 'Pikachu2',
    bgLo: 11,
    bgHi: 15,
    fgLo: 0,
    fgHi: 0,
    iconId: 0,
    patternId: 2,
  },
  {
    name: 'Lotad',
    bgLo: 6,
    bgHi: 11,
    fgLo: 5,
    fgHi: 5,
    iconId: 5,
    patternId: 0,
  },
  {
    name: 'Pikachu3',
    bgLo: 14,
    bgHi: 15,
    fgLo: 0,
    fgHi: 0,
    iconId: 0,
    patternId: 3,
  },
  {
    name: 'Seviper',
    bgLo: 3,
    bgHi: 4,
    fgLo: 7,
    fgHi: 7,
    iconId: 7,
    patternId: 2,
  },
  {
    name: 'Spinda',
    bgLo: 12,
    bgHi: 15,
    fgLo: 6,
    fgHi: 6,
    iconId: 6,
    patternId: 1,
  },
  {
    name: 'Slakoth',
    bgLo: 12,
    bgHi: 6,
    fgLo: 8,
    fgHi: 8,
    iconId: 8,
    patternId: 1,
  },
  {
    name: 'Pikachu4',
    bgLo: 5,
    bgHi: 10,
    fgLo: 0,
    fgHi: 0,
    iconId: 0,
    patternId: 0,
  },
  {
    name: 'Wurmple',
    bgLo: 14,
    bgHi: 1,
    fgLo: 4,
    fgHi: 4,
    iconId: 4,
    patternId: 2,
  },
  {
    name: 'Pikachu5',
    bgLo: 13,
    bgHi: 15,
    fgLo: 0,
    fgHi: 0,
    iconId: 0,
    patternId: 4,
  },
  {
    name: 'Pikachu6',
    bgLo: 7,
    bgHi: 12,
    fgLo: 0,
    fgHi: 0,
    iconId: 0,
    patternId: 5,
  },
  {
    name: 'Pikachu7',
    bgLo: 6,
    bgHi: 11,
    fgLo: 0,
    fgHi: 0,
    iconId: 0,
    patternId: 6,
  },
  {
    name: 'Pikachu8',
    bgLo: 15,
    bgHi: 14,
    fgLo: 0,
    fgHi: 0,
    iconId: 0,
    patternId: 7,
  },
];

function getWallpaperDataBit(data: Uint8Array, bitNum: number): boolean {
  const i = Math.floor(bitNum / 8);
  const flag = 128 >> (bitNum % 8);
  return ((data[i] ?? 0) & flag) !== 0;
}

function setWallpaperDataBit(data: Uint8Array, bitNum: number): void {
  const i = Math.floor(bitNum / 8);
  const flag = 128 >> (bitNum % 8);
  data[i] = (data[i] ?? 0) | flag;
}

function rotateRight(dataArr: Uint8Array, size: number, numShifts: number): void {
  while (numShifts > 0) {
    numShifts--;
    let temp1 = (dataArr[size - 1] ?? 0) & 1; // LSB of last byte
    for (let j = 0; j < size; j++) {
      const temp2 = (dataArr[j] ?? 0) & 1;
      dataArr[j] = (dataArr[j] ?? 0) >> 1;
      dataArr[j] = (dataArr[j] ?? 0) | (temp1 << 7);
      temp1 = temp2;
    }
  }
}

/**
 * Generates the 16 unlock phrases for the custom PC box wallpapers based on a Gen 3 Trainer ID.
 * @param trainerId The player's Trainer ID.
 * @returns A mapping of wallpaper theme names to their generated unlock phrase.
 */
export function generateWallpaperPhrases(trainerId: number): Record<string, string> {
  const result: Record<string, string> = {};

  for (const theme of WALLPAPER_THEMES) {
    const data = new Uint8Array(9);
    const key = 0; // The generator typically uses a key of 0 for simplicity

    data[0] = theme.bgLo;
    data[1] = theme.bgHi;
    data[2] = theme.fgLo;
    data[3] = theme.fgHi;
    data[4] = theme.iconId;
    data[5] = theme.patternId;
    data[6] = theme.bgLo ^ theme.fgLo ^ theme.iconId ^ (trainerId >> 8);
    data[7] = theme.bgHi ^ theme.fgHi ^ theme.patternId ^ (trainerId & 0xff);
    data[8] = key;

    // Reverse Masking
    const mask = key >> 4;
    const fullMask = mask | (mask << 4);
    for (let i = 0; i < 8; i++) {
      data[i] = (data[i] ?? 0) ^ fullMask;
    }

    // Reverse Rotations
    rotateRight(data, 8, key & 0xf);
    rotateRight(data, 9, 21);

    // Extract characters
    const charsByTableId = new Uint8Array(15);

    for (let i = 0; i < 14; i++) {
      for (let b = 0; b < 5; b++) {
        if (getWallpaperDataBit(data, 5 * i + b)) {
          setWallpaperDataBit(charsByTableId, 3 + 8 * i + b);
        }
      }
    }

    // Last character first 2 bits
    for (let b = 0; b < 2; b++) {
      if (getWallpaperDataBit(data, 5 * 14 + b)) {
        setWallpaperDataBit(charsByTableId, 3 + 8 * 14 + b);
      }
    }

    // Last character remaining 3 bits (must match first 3 bits of data array)
    for (let b = 0; b < 3; b++) {
      if (getWallpaperDataBit(data, b)) {
        setWallpaperDataBit(charsByTableId, 3 + 8 * 14 + 2 + b);
      }
    }

    let phrase = '';
    for (let i = 0; i < 15; i++) {
      phrase += sWaldaLettersTable[charsByTableId[i] ?? 0];
    }
    result[theme.name] = phrase;
  }

  return result;
}
