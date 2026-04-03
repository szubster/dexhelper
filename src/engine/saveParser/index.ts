export const INTERNAL_ID_TO_DEX: Record<number, number> = {
  1: 112, 2: 115, 3: 32, 4: 35, 5: 21, 6: 100, 7: 34, 8: 80, 9: 2, 10: 103,
  11: 108, 12: 102, 13: 88, 14: 94, 15: 29, 16: 31, 17: 104, 18: 111, 19: 131, 20: 59,
  21: 151, 22: 130, 23: 90, 24: 72, 25: 92, 26: 123, 27: 120, 28: 9, 29: 127, 30: 114,
  33: 58, 34: 95, 35: 22, 36: 16, 37: 79, 38: 64, 39: 75, 40: 113, 41: 67, 42: 122,
  43: 106, 44: 107, 45: 24, 46: 47, 47: 54, 48: 96, 49: 76, 51: 126, 53: 125, 54: 82,
  55: 109, 57: 56, 58: 86, 59: 50, 60: 128, 64: 83, 65: 48, 66: 149, 70: 84, 71: 60,
  72: 124, 73: 146, 74: 144, 75: 145, 76: 132, 77: 52, 78: 98, 82: 37, 83: 38, 84: 25,
  85: 26, 88: 147, 89: 148, 90: 140, 91: 141, 92: 116, 93: 117, 96: 27, 97: 28, 98: 138,
  99: 139, 100: 39, 101: 40, 102: 133, 103: 136, 104: 135, 105: 134, 106: 66, 107: 41,
  108: 23, 109: 46, 110: 61, 111: 62, 112: 13, 113: 14, 114: 15, 116: 85, 117: 57, 118: 51,
  119: 49, 120: 87, 123: 10, 124: 11, 125: 12, 126: 68, 128: 55, 129: 97, 130: 42, 131: 150,
  132: 143, 133: 129, 136: 89, 138: 99, 139: 91, 141: 101, 142: 36, 143: 110, 144: 53, 145: 105,
  147: 93, 148: 63, 149: 65, 150: 17, 151: 18, 152: 121, 153: 1, 154: 3, 155: 73, 157: 118,
  158: 119, 163: 77, 164: 78, 165: 19, 166: 20, 167: 33, 168: 30, 169: 74, 170: 137, 171: 142,
  173: 81, 176: 4, 177: 7, 178: 5, 179: 8, 180: 6, 185: 43, 186: 44, 187: 45, 188: 69,
  189: 70, 190: 71
};

export type GameVersion = 'red' | 'blue' | 'yellow' | 'gold' | 'silver' | 'crystal' | 'unknown';
export type Generation = number;

export interface PokemonInstance {
  speciesId: number;
  level: number;
  isShiny: boolean;
  item?: number;
  moves: number[];
  friendship?: number;
  pokerus?: number;
  caughtData?: {
    time: 'Morning' | 'Day' | 'Night' | 'Unknown';
    level: number;
    location: number;
  };
  dvs: { hp: number, atk: number, def: number, spd: number, spc: number };
  otName?: string;
  storageLocation: string;
  slot?: number; // 1-indexed slot in party or box
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
  mapGroup?: number;
  johtoBadges?: number;
  kantoBadges?: number;
  inventory: { id: number, quantity: number }[];
  currentBoxCount: number;
  hallOfFameCount: number;
  eventFlags?: Uint8Array;
}

const GEN12_CHAR_MAP: Record<number, string> = {
  0x7F: ' ',
  0x80: 'A', 0x81: 'B', 0x82: 'C', 0x83: 'D', 0x84: 'E', 0x85: 'F', 0x86: 'G', 0x87: 'H', 0x88: 'I', 0x89: 'J', 0x8A: 'K', 0x8B: 'L', 0x8C: 'M', 0x8D: 'N', 0x8E: 'O', 0x8F: 'P', 0x90: 'Q', 0x91: 'R', 0x92: 'S', 0x93: 'T', 0x94: 'U', 0x95: 'V', 0x96: 'W', 0x97: 'X', 0x98: 'Y', 0x99: 'Z',
  0x9A: '(', 0x9B: ')', 0x9C: ':', 0x9D: ';', 0x9E: '[', 0x9F: ']',
  0xA0: 'a', 0xA1: 'b', 0xA2: 'c', 0xA3: 'd', 0xA4: 'e', 0xA5: 'f', 0xA6: 'g', 0xA7: 'h', 0xA8: 'i', 0xA9: 'j', 0xAA: 'k', 0xAB: 'l', 0xAC: 'm', 0xAD: 'n', 0xAE: 'o', 0xAF: 'p', 0xB0: 'q', 0xB1: 'r', 0xB2: 's', 0xB3: 't', 0xB4: 'u', 0xB5: 'v', 0xB6: 'w', 0xB7: 'x', 0xB8: 'y', 0xB9: 'z',
  0xE0: "'", 0xE1: 'PK', 0xE2: 'MN', 0xE3: '-', 0xE6: '?', 0xE7: '!', 0xE8: '♂', 0xE9: '/', 0xEA: ',', 0xED: '♀', 0xEE: '0', 0xEF: '1', 0xF0: '2', 0xF1: '3', 0xF2: '4', 0xF3: '5', 0xF4: '6', 0xF5: '7', 0xF6: '8', 0xF7: '9'
};

/** Read a byte from a Uint8Array, returning 0 for out-of-bounds access. Used throughout
 *  binary parsing to satisfy noUncheckedIndexedAccess without littering `!` everywhere. */
function byte(u8: Uint8Array, offset: number): number {
  return u8[offset] ?? 0;
}

export function decodeGen12String(u8: Uint8Array, offset: number, maxLength: number = 11): string {
  let result = '';
  for (let i = 0; i < maxLength; i++) {
    const charCode = u8[offset + i];
    if (charCode === undefined || charCode === 0x50 || charCode === 0x00 || charCode === 0xFF) break;
    result += GEN12_CHAR_MAP[charCode] ?? '?';
  }
  return result.trim();
}

function parseDVs(dvBytes: Uint8Array) {
  const b0 = dvBytes[0] ?? 0;
  const b1 = dvBytes[1] ?? 0;
  const atk = b0 >> 4;
  const def = b0 & 0x0F;
  const spd = b1 >> 4;
  const spc = b1 & 0x0F;
  const hp = ((atk & 1) << 3) | ((def & 1) << 2) | ((spd & 1) << 1) | (spc & 1);
  return { hp, atk, def, spd, spc };
}

function checkShiny(dvs: { atk: number, def: number, spd: number, spc: number }) {
  return dvs.def === 10 && dvs.spd === 10 && dvs.spc === 10 && [2, 3, 6, 7, 10, 11, 14, 15].includes(dvs.atk);
}

function detectGen1GameVersion(owned: Set<number>, seen: Set<number>): GameVersion {
  // Version exclusives that are unlikely to be traded in bulk early game
  const redExclusives = [23, 24, 43, 44, 45, 56, 57, 58, 59, 123, 125]; // Ekans, Oddish, Mankey, Growlithe, Scyther, Electabuzz
  const blueExclusives = [27, 28, 37, 38, 52, 53, 69, 70, 71, 127, 126]; // Sandshrew, Vulpix, Meowth, Bellsprout, Pinsir, Magmar
  const yellowMissing = [13, 14, 15, 23, 24, 26, 52, 53, 109, 110, 124, 125, 126];

  let redScore = 0;
  let blueScore = 0;
  let yellowPenalty = 0;

  for (const id of redExclusives) {
    if (owned.has(id)) redScore += 2;
    else if (seen.has(id)) redScore += 1;
  }
  for (const id of blueExclusives) {
    if (owned.has(id)) blueScore += 2;
    else if (seen.has(id)) blueScore += 1;
  }
  for (const id of yellowMissing) {
    if (owned.has(id)) yellowPenalty += 2;
    else if (seen.has(id)) yellowPenalty += 1;
  }

  // Yellow detection: missing several common Gen 1 Pokemon 
  // and has Pikachu (usually) or other gift Pokemon
  const isPikachuStarter = owned.has(25);
  
  if (yellowPenalty === 0 && (redScore > 0 || blueScore > 0 || isPikachuStarter)) {
    // If we have some exclusives from both R and B, it's likely Yellow (since it has many from both)
    if (redScore > 0 && blueScore > 0) return 'yellow';
    // If it's early game and we have Pikachu but no exclusives, it's likely Yellow
    if (isPikachuStarter && redScore === 0 && blueScore === 0) return 'yellow';
  }
  
  // High confidence detection
  if (redScore > blueScore + 2) return 'red';
  if (blueScore > redScore + 2) return 'blue';

  // If scores are very close or zero, return unknown to trigger manual selection
  if (Math.abs(redScore - blueScore) < 2 && redScore < 4 && !isPikachuStarter) return 'unknown';

  if (redScore > blueScore) return 'red';
  if (blueScore > redScore) return 'blue';
  
  return 'unknown';

}


function detectGen2GameVersion(owned: Set<number>, seen: Set<number>): GameVersion {
  const goldExclusives = [56, 57, 58, 59, 167, 168, 190, 207, 249];
  const silverExclusives = [37, 38, 52, 53, 165, 166, 216, 217, 227, 250];
  
  let goldScore = 0;
  let silverScore = 0;

  for (const id of goldExclusives) {
    if (owned.has(id)) goldScore += 2;
    else if (seen.has(id)) goldScore += 1;
  }
  for (const id of silverExclusives) {
    if (owned.has(id)) silverScore += 2;
    else if (seen.has(id)) silverScore += 1;
  }

  if (goldScore > silverScore) return 'gold';
  if (silverScore > goldScore) return 'silver';
  
  return 'unknown';
}

function isGen1Save(u8: Uint8Array): boolean {
  const partyCount = byte(u8, 0x2F2C) ?? 0;
  if (partyCount > 6) return false;
  if ((u8[0x2F2D + partyCount] ?? 0) !== 0xFF) return false;
  for (let i = 0; i < partyCount; i++) {
    const id = u8[0x2F2D + i] ?? 0;
    if (id === 0 || id === 0xFF) return false;
  }
  return true;
}

function isGen2Save(u8: Uint8Array, crystal: boolean): boolean {
  const countOffset = crystal ? 0x2865 : 0x288A;
  const speciesOffset = crystal ? 0x2866 : 0x288B;
  const partyCount = u8[countOffset] ?? 0;
  if (partyCount > 6) return false;
  if ((u8[speciesOffset + partyCount] ?? 0) !== 0xFF) return false;
  for (let i = 0; i < partyCount; i++) {
    const id = u8[speciesOffset + i] ?? 0;
    if (id === 0 || id > 251) return false;
  }
  return true;
}

export function parseSaveFile(buffer: ArrayBuffer, forcedVersion?: GameVersion): SaveData {
  const u8 = new Uint8Array(buffer);

  if (buffer.byteLength < 32768) {
    throw new Error("Invalid save file size. Expected at least 32KB.");
  }

  // Gen 1 Checksum
  let gen1Sum = 255;
  for (let i = 0x2598; i <= 0x3522; i++) {
    gen1Sum -= u8[i]!;
  }
  const isGen1ChecksumValid = (gen1Sum & 0xFF) === u8[0x3523]!;

  // Gen 2 Checksum
  let gen2Sum = 0;
  for (let i = 0x2009; i <= 0x2D0C; i++) {
    gen2Sum += u8[i]!;
  }
  const gen2Checksum = (u8[0x2D0E]! << 8) | u8[0x2D0D]!;
  const isGen2ChecksumValid = (gen2Sum & 0xFFFF) === gen2Checksum;

  if (isGen1ChecksumValid && isGen1Save(u8)) {
    return parseGen1(u8, forcedVersion);
  } else if (isGen2ChecksumValid) {
    if (isGen2Save(u8, true)) return parseGen2(u8, true);
    if (isGen2Save(u8, false)) return parseGen2(u8, false);
    // If checksum is valid but structure is weird, still try to parse
    return parseGen2(u8);
  } else {
    // Fallback for saves with broken checksums but valid structure
    if (isGen1Save(u8)) {
      return parseGen1(u8, forcedVersion);
    } else if (isGen2Save(u8, true)) {
      return parseGen2(u8, true);
    } else if (isGen2Save(u8, false)) {
      return parseGen2(u8, false);
    }
    throw new Error("Could not detect a valid Pokémon Red/Blue/Yellow or Gold/Silver/Crystal save file. Please ensure you are uploading a .sav file from a Gen 1 or Gen 2 game.");
  }
}

function parseGen1(u8: Uint8Array, forcedVersion?: GameVersion): SaveData {
  // Try to detect version by checking Pokedex at both possible offsets (0 and +1)
  // Yellow shifted by +1 after PlayerName (offset 0x2598 + 11 = 0x25A3).
  
  const detectForOffset = (ownedBase: number) => {
    const owned = new Set<number>();
    const seen = new Set<number>();
    const ownedBytes = u8.slice(ownedBase, ownedBase + 19);
    const seenBytes = u8.slice(ownedBase + (0x25B6 - 0x25A3), ownedBase + (0x25B6 - 0x25A3) + 19);
    
    for (let i = 1; i <= 151; i++) {
      const byteIdx = Math.floor((i - 1) / 8);
      const bitIdx = (i - 1) % 8;
      if (((ownedBytes[byteIdx] ?? 0) & (1 << bitIdx)) !== 0) owned.add(i);
      if (((seenBytes[byteIdx] ?? 0) & (1 << bitIdx)) !== 0) seen.add(i);
    }
    // High-confidence Yellow indicators: bit 152 (last bit of 19-byte Pokedex) must be 0.
    // In Yellow, the Happiness byte (at A3) is often FF or high value, which would make bit 7 of the "shifted-Pokedex-last-byte" 1 if we read from A3.
    const paddingBitIsCorrect = ((ownedBytes[18] ?? 0) & 0x80) === 0;
    const version = detectGen1GameVersion(owned, seen);
    return { version, owned, seen, paddingBitIsCorrect };
  };

  const res0 = detectForOffset(0x25A3);
  const res1 = detectForOffset(0x25A4);

  // If forcedVersion is provided, respect it. Otherwise use robust indicators.
  let isYellow = forcedVersion === 'yellow';
  if (!forcedVersion) {
    if (!res0.paddingBitIsCorrect && res1.paddingBitIsCorrect) {
      isYellow = true;
    } else if (res1.version === 'yellow') {
      isYellow = true;
    } else if (res0.version === 'unknown' && res1.version !== 'unknown') {
      isYellow = true;
    }
  }
  
  const offsetShift = 0; // English R/B/Y saves don't actually shift these offsets in SRAM
  const gameVersion = isYellow ? 'yellow' : (forcedVersion && forcedVersion !== 'unknown' ? forcedVersion : res0.version);
  const { owned, seen } = res0;

  const partyCount = byte(u8, 0x2F2C);
  const partySpecies = u8.slice(0x2F2D, 0x2F2D + partyCount);
  const party = Array.from(partySpecies)
    .map(id => INTERNAL_ID_TO_DEX[id])
    .filter((id): id is number => id !== undefined);

  const partyDetails: PokemonInstance[] = [];
  const partyDataOffset = 0x2F2D + 7;
  const partyOTOffset = partyDataOffset + (6 * 44);
  for (let i = 0; i < partyCount; i++) {
    const offset = partyDataOffset + (i * 44);
    const internalId = byte(u8, offset);
    const speciesId = INTERNAL_ID_TO_DEX[internalId];
    if (!speciesId) continue;
    const level = byte(u8, offset + 33);
    const moves = Array.from(u8.slice(offset + 8, offset + 12)).filter(m => m > 0);
    const dvs = parseDVs(u8.slice(offset + 27, offset + 29));
    const isShiny = checkShiny(dvs);
    const otName = decodeGen12String(u8, partyOTOffset + (i * 11));
    partyDetails.push({ speciesId, level, isShiny, moves, dvs, otName, storageLocation: 'Party', slot: i + 1 });
  }

  const currentBoxNum = byte(u8, 0x284C) & 0x7F;
  const pc: number[] = [];
  const pcDetails: PokemonInstance[] = [];

  const parseBox = (boxOffset: number, boxNum: number) => {
    const count = byte(u8, boxOffset);
    if (count > 20) return;

    const speciesList = u8.slice(boxOffset + 1, boxOffset + 1 + count);
    pc.push(...Array.from(speciesList).map(id => INTERNAL_ID_TO_DEX[id]).filter((id): id is number => id !== undefined));

    const boxDataOffset = boxOffset + 22;
    const boxOTOffset = boxDataOffset + (20 * 33);
    for (let j = 0; j < count; j++) {
      const pOff = boxDataOffset + (j * 33);
      const internalId = byte(u8, pOff);
      const speciesId = INTERNAL_ID_TO_DEX[internalId];
      if (!speciesId) continue;

      const level = byte(u8, pOff + 3);
      const moves = Array.from(u8.slice(pOff + 8, pOff + 12)).filter(m => m > 0);
      const dvs = parseDVs(u8.slice(pOff + 27, pOff + 29));
      const isShiny = checkShiny(dvs);
      const otName = decodeGen12String(u8, boxOTOffset + (j * 11));

      pcDetails.push({ speciesId, level, isShiny, moves, dvs, otName, storageLocation: `Box ${boxNum + 1}`, slot: j + 1 });
    }
  };

  // Parse active box
  parseBox(0x30C0, currentBoxNum);

  // Parse other boxes
  const boxOffsets = [0x4000, 0x4462, 0x48C4, 0x4D26, 0x5188, 0x55EA, 0x6000, 0x6462, 0x68C4, 0x6D26, 0x7188, 0x75EA];
  for (let i = 0; i < 12; i++) {
    if (i === currentBoxNum) continue;
    parseBox(boxOffsets[i]!, i);
  }

  // Daycare Gen 1
  if (byte(u8, 0x2CF4) !== 0) {
    const daycareDataOffset = 0x2D0B;
    const internalId = byte(u8, daycareDataOffset);
    const speciesId = INTERNAL_ID_TO_DEX[internalId];
    if (speciesId) {
      const level = byte(u8, daycareDataOffset + 3);
      const moves = Array.from(u8.slice(daycareDataOffset + 8, daycareDataOffset + 12)).filter(m => m > 0);
      const dvs = parseDVs(u8.slice(daycareDataOffset + 27, daycareDataOffset + 29));
      const isShiny = checkShiny(dvs);
      const otName = decodeGen12String(u8, 0x2CF5);
      pcDetails.push({ speciesId, level, isShiny, moves, dvs, otName, storageLocation: 'Daycare' });
    }
  }

  const trainerName = decodeGen12String(u8, 0x2598);
  const badges = byte(u8, 0x2602);
  const trainerId = (byte(u8, 0x2605) << 8) | byte(u8, 0x2606);
  const currentMapId = byte(u8, 0x260A); 
  const inventory: { id: number, quantity: number }[] = [];
  const itemCount = byte(u8, 0x25C9);
  for (let i = 0; i < itemCount; i++) {
    const itemOffset = 0x25CA + (i * 2);
    inventory.push({ id: byte(u8, itemOffset), quantity: byte(u8, itemOffset + 1) });
  }

  return {
    generation: 1,
    owned,
    seen,
    party,
    pc,
    partyDetails,
    pcDetails,
    gameVersion,
    badges,
    kantoBadges: badges,
    trainerName,
    trainerId,
    currentMapId,
    inventory,
    currentBoxCount,
    hallOfFameCount: byte(u8, 0x25B3 + offsetShift) === 0xFF ? 0 : byte(u8, 0x25B3 + offsetShift),
    eventFlags: u8.slice(0x29E6 + offsetShift, 0x29E6 + offsetShift + 0x118)
  };
}

function parseCaughtData(u8: Uint8Array, offset: number) {
  const caughtByte1 = byte(u8, offset + 29);
  const caughtByte2 = byte(u8, offset + 30);
  
  if (caughtByte1 === 0 && caughtByte2 === 0) return undefined;
  
  const timeBits = (caughtByte1 & 0xC0) >> 6;
  const caughtLevel = caughtByte1 & 0x3F;
  const location = caughtByte2;
  
  let time: 'Morning' | 'Day' | 'Night' | 'Unknown' = 'Unknown';
  if (timeBits === 1) time = 'Morning';
  else if (timeBits === 2) time = 'Day';
  else if (timeBits === 3) time = 'Night';
  
  return { time, level: caughtLevel, location };
}

function parseGen2(u8: Uint8Array, forceCrystal = false): SaveData {
  let isCrystal = forceCrystal;
  if (!isCrystal) {
    const gsPartyCount = byte(u8, 0x288A);
    const cPartyCount = byte(u8, 0x2865);
    if (cPartyCount <= 6 && cPartyCount > 0 && gsPartyCount > 6) {
      isCrystal = true;
    }
  }

  const offsets = isCrystal ? {
    owned: 0x2A69,
    seen: 0x2A89,
    partyCount: 0x2865,
    partySpecies: 0x2866,
    currentBoxNum: 0x2700,
    currentBoxCount: 0x2D10,
    currentBoxSpecies: 0x2D11,
  } : {
    owned: 0x2A4C,
    seen: 0x2A6C,
    partyCount: 0x288A,
    partySpecies: 0x288B,
    currentBoxNum: 0x2724,
    currentBoxCount: 0x2D10,
    currentBoxSpecies: 0x2D11,
  };

  const ownedBytes = u8.slice(offsets.owned, offsets.owned + 32);
  const seenBytes = u8.slice(offsets.seen, offsets.seen + 32);

  const owned = new Set<number>();
  const seen = new Set<number>();

  for (let dexId = 1; dexId <= 251; dexId++) {
    const byteIdx = Math.floor((dexId - 1) / 8);
    const bitIdx = (dexId - 1) % 8;
    
    if (((ownedBytes[byteIdx] ?? 0) & (1 << bitIdx)) !== 0) {
      owned.add(dexId);
    }
    if (((seenBytes[byteIdx] ?? 0) & (1 << bitIdx)) !== 0) {
      seen.add(dexId);
    }
  }

  const partyCount = byte(u8, offsets.partyCount);
  const partySpecies = u8.slice(offsets.partySpecies, offsets.partySpecies + partyCount);
  const party = Array.from(partySpecies).filter(id => id > 0 && (id <= 251 || id === 253));

  const partyDetails: PokemonInstance[] = [];
  const partyDataOffset = offsets.partySpecies + 7; // After species list
  const partyOTOffset = partyDataOffset + (6 * 48);
  for (let i = 0; i < partyCount; i++) {
    const offset = partyDataOffset + (i * 48); // Gen 2 party struct is 48 bytes
    const speciesId = byte(u8, offset);
    if (!speciesId || speciesId > 251) continue;
    
    const item = byte(u8, offset + 1);
    const moves = Array.from(u8.slice(offset + 2, offset + 6)).filter(m => m > 0);
    const dvs = parseDVs(u8.slice(offset + 21, offset + 23)); // DVs at 0x15
    const isShiny = checkShiny(dvs);
    const friendship = byte(u8, offset + 27); // 0x1B
    const pokerus = byte(u8, offset + 28); // 0x1C
    const level = byte(u8, offset + 31); // 0x1F
    const caughtData = isCrystal ? parseCaughtData(u8, offset) : undefined;
    const otName = decodeGen12String(u8, partyOTOffset + (i * 11));

    partyDetails.push({ speciesId, level, isShiny, item, moves, friendship, pokerus, caughtData, dvs, otName, storageLocation: 'Party', slot: i + 1 });
  }

  const currentBoxNum = byte(u8, offsets.currentBoxNum) & 0x0F;
  const currentBoxCount = byte(u8, offsets.currentBoxCount);
  const currentBoxSpecies = u8.slice(offsets.currentBoxSpecies, offsets.currentBoxSpecies + currentBoxCount);
  const pc = Array.from(currentBoxSpecies).filter(id => id > 0 && (id <= 251 || id === 253));

  const pcDetails: PokemonInstance[] = [];
  const currentBoxDataOffset = offsets.currentBoxSpecies + 21; // After species list
  const currentBoxOTOffset = currentBoxDataOffset + (20 * 32);
  for (let i = 0; i < currentBoxCount; i++) {
    const offset = currentBoxDataOffset + (i * 32); // Gen 2 PC struct is 32 bytes
    const speciesId = byte(u8, offset);
    if (!speciesId || speciesId > 251) continue;
    
    const item = byte(u8, offset + 1);
    const moves = Array.from(u8.slice(offset + 2, offset + 6)).filter(m => m > 0);
    const dvs = parseDVs(u8.slice(offset + 21, offset + 23)); // DVs at 0x15
    const isShiny = checkShiny(dvs);
    const friendship = byte(u8, offset + 27); // 0x1B
    const pokerus = byte(u8, offset + 28); // 0x1C
    const level = byte(u8, offset + 31); // 0x1F
    const caughtData = isCrystal ? parseCaughtData(u8, offset) : undefined;
    const otName = decodeGen12String(u8, currentBoxOTOffset + (i * 11));

    pcDetails.push({ speciesId, level, isShiny, item, moves, friendship, pokerus, caughtData, dvs, otName, storageLocation: `Box ${currentBoxNum + 1}`, slot: i + 1 });
  }

  const boxOffsets = [
    0x4000, 0x444E, 0x489C, 0x4CEA, 0x5138, 0x5586, 0x59D4, // Bank 1
    0x6000, 0x644E, 0x689C, 0x6CEA, 0x7138, 0x7586, 0x79D4  // Bank 2
  ];

  for (let i = 0; i < 14; i++) {
    if (i === currentBoxNum) continue;
    const offset = boxOffsets[i]!;
    const count = byte(u8, offset);
    if (count > 20) continue;
    const species = u8.slice(offset + 1, offset + 1 + count);
    pc.push(...Array.from(species).filter(id => id > 0 && (id <= 251 || id === 253)));
    
    const boxDataOffset = offset + 22;
    const boxOTOffset = boxDataOffset + (20 * 32);
    for (let j = 0; j < count; j++) {
      const pOff = boxDataOffset + (j * 32);
      const speciesId = byte(u8, pOff);
      if (!speciesId || speciesId > 251) continue;
      
      const item = byte(u8, pOff + 1);
      const moves = Array.from(u8.slice(pOff + 2, pOff + 6)).filter(m => m > 0);
      const dvs = parseDVs(u8.slice(pOff + 21, pOff + 23));
      const isShiny = checkShiny(dvs);
      const friendship = byte(u8, pOff + 27);
      const pokerus = byte(u8, pOff + 28);
      const level = byte(u8, pOff + 31);
      const caughtData = isCrystal ? parseCaughtData(u8, pOff) : undefined;
      const otName = decodeGen12String(u8, boxOTOffset + (j * 11));

      pcDetails.push({ speciesId, level, isShiny, item, moves, friendship, pokerus, caughtData, dvs, otName, storageLocation: `Box ${i + 1}`, slot: j + 1 });
    }
  }

  const johtoBadgesOffset = isCrystal ? 0x23E5 : 0x23E4;
  const kantoBadgesOffset = isCrystal ? 0x23E6 : 0x23E5;
  
  // Daycare Gen 2
  const daycare1Offset = isCrystal ? 0x282C : 0x2850;
  if (byte(u8, daycare1Offset) !== 0 && byte(u8, daycare1Offset) !== 0xFF) {
    const speciesId = byte(u8, daycare1Offset);
    const item = byte(u8, daycare1Offset + 1);
    const moves = Array.from(u8.slice(daycare1Offset + 2, daycare1Offset + 6)).filter(m => m > 0);
    const dvs = parseDVs(u8.slice(daycare1Offset + 21, daycare1Offset + 23));
    const isShiny = checkShiny(dvs);
    const friendship = byte(u8, daycare1Offset + 27);
    const pokerus = byte(u8, daycare1Offset + 28);
    const level = byte(u8, daycare1Offset + 31);
    const otName = decodeGen12String(u8, daycare1Offset + 32);
    pcDetails.push({ speciesId, level, isShiny, item, moves, friendship, pokerus, dvs, otName, storageLocation: 'Daycare' });
  }

  let badges = 0;
  for (let i = 0; i < 8; i++) {
    if ((byte(u8, johtoBadgesOffset) & (1 << i)) !== 0) badges++;
    if ((byte(u8, kantoBadgesOffset) & (1 << i)) !== 0) badges++;
  }

  let gameVersion = isCrystal ? 'crystal' : detectGen2GameVersion(owned, seen);
  if (gameVersion === 'unknown' && !isCrystal) {
    gameVersion = 'gold';
  }

  const trainerName = decodeGen12String(u8, 0x200B);
  const trainerId = (byte(u8, 0x2009) << 8) | byte(u8, 0x200A);

  const mapBankOffset = isCrystal ? 0x25C6 : 0x25B3;
  const mapIdOffset = isCrystal ? 0x25C7 : 0x25B4;
  const mapGroup = byte(u8, mapBankOffset);
  const currentMapId = byte(u8, mapIdOffset);

  // Detailed inventory parsing for Gen 2 could be added here later
  const inventory: { id: number, quantity: number }[] = [];

  let johtoBadgesValue = byte(u8, johtoBadgesOffset);
  let kantoBadgesValue = byte(u8, kantoBadgesOffset);

  return {
    generation: 2,
    owned,
    seen,
    party,
    pc,
    partyDetails,
    pcDetails,
    gameVersion: gameVersion as GameVersion,
    badges,
    johtoBadges: johtoBadgesValue,
    kantoBadges: kantoBadgesValue,
    trainerName,
    trainerId,
    currentMapId,
    mapGroup,
    inventory,
    currentBoxCount,
    hallOfFameCount: 0 // Default for Gen 2 for now
  };
}
