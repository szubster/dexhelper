import gen1MapLocations from "../data/gen1/mapLocations.json";
import gen2Landmarks from "../data/gen2/landmarks.json";
import gen2MapLocations from "../data/gen2/mapLocations.json";

export const INTERNAL_ID_TO_DEX: Record<number, number> = {
  1: 112,
  2: 115,
  3: 32,
  4: 35,
  5: 21,
  6: 100,
  7: 34,
  8: 80,
  9: 2,
  10: 103,
  11: 108,
  12: 102,
  13: 88,
  14: 94,
  15: 29,
  16: 31,
  17: 104,
  18: 111,
  19: 131,
  20: 59,
  21: 151,
  22: 130,
  23: 90,
  24: 72,
  25: 92,
  26: 123,
  27: 120,
  28: 9,
  29: 127,
  30: 114,
  33: 58,
  34: 95,
  35: 22,
  36: 16,
  37: 79,
  38: 64,
  39: 75,
  40: 113,
  41: 67,
  42: 122,
  43: 106,
  44: 107,
  45: 24,
  46: 47,
  47: 54,
  48: 96,
  49: 76,
  51: 126,
  53: 125,
  54: 82,
  55: 109,
  57: 56,
  58: 86,
  59: 50,
  60: 128,
  64: 83,
  65: 48,
  66: 149,
  70: 84,
  71: 60,
  72: 124,
  73: 146,
  74: 144,
  75: 145,
  76: 132,
  77: 52,
  78: 98,
  82: 37,
  83: 38,
  84: 25,
  85: 26,
  88: 147,
  89: 148,
  90: 140,
  91: 141,
  92: 116,
  93: 117,
  96: 27,
  97: 28,
  98: 138,
  99: 139,
  100: 39,
  101: 40,
  102: 133,
  103: 136,
  104: 135,
  105: 134,
  106: 66,
  107: 41,
  108: 23,
  109: 46,
  110: 61,
  111: 62,
  112: 13,
  113: 14,
  114: 15,
  116: 85,
  117: 57,
  118: 51,
  119: 49,
  120: 87,
  123: 10,
  124: 11,
  125: 12,
  126: 68,
  128: 55,
  129: 97,
  130: 42,
  131: 150,
  132: 143,
  133: 129,
  136: 89,
  138: 99,
  139: 91,
  141: 101,
  142: 36,
  143: 110,
  144: 53,
  145: 105,
  147: 93,
  148: 63,
  149: 65,
  150: 17,
  151: 18,
  152: 121,
  153: 1,
  154: 3,
  155: 73,
  157: 118,
  158: 119,
  163: 77,
  164: 78,
  165: 19,
  166: 20,
  167: 33,
  168: 30,
  169: 74,
  170: 137,
  171: 142,
  173: 81,
  176: 4,
  177: 7,
  178: 5,
  179: 8,
  180: 6,
  185: 43,
  186: 44,
  187: 45,
  188: 69,
  189: 70,
  190: 71,
};

export type GameVersion =
  | "red"
  | "blue"
  | "yellow"
  | "gold"
  | "silver"
  | "crystal"
  | "unknown";
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
    time: "Morning" | "Day" | "Night" | "Unknown";
    level: number;
    location: number;
    locationName?: string;
  };
  dvs: { hp: number; atk: number; def: number; spd: number; spc: number };
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
  currentMapName?: string;
  mapGroup?: number;
  johtoBadges?: number;
  kantoBadges?: number;
  inventory: { id: number; quantity: number }[];
  currentBoxCount: number;
  hallOfFameCount: number;
  eventFlags?: Uint8Array;
  npcTradeFlags?: number;
}

const GEN12_CHAR_MAP: Record<number, string> = {
  127: " ",
  128: "A",
  129: "B",
  130: "C",
  131: "D",
  132: "E",
  133: "F",
  134: "G",
  135: "H",
  136: "I",
  137: "J",
  138: "K",
  139: "L",
  140: "M",
  141: "N",
  142: "O",
  143: "P",
  144: "Q",
  145: "R",
  146: "S",
  147: "T",
  148: "U",
  149: "V",
  150: "W",
  151: "X",
  152: "Y",
  153: "Z",
  154: "(",
  155: ")",
  156: ":",
  157: ";",
  158: "[",
  159: "]",
  160: "a",
  161: "b",
  162: "c",
  163: "d",
  164: "e",
  165: "f",
  166: "g",
  167: "h",
  168: "i",
  169: "j",
  170: "k",
  171: "l",
  172: "m",
  173: "n",
  174: "o",
  175: "p",
  176: "q",
  177: "r",
  178: "s",
  179: "t",
  180: "u",
  181: "v",
  182: "w",
  183: "x",
  184: "y",
  185: "z",
  224: "'",
  225: "PK",
  226: "MN",
  227: "-",
  230: "?",
  231: "!",
  232: "♂",
  233: "/",
  234: ",",
  237: "♀",
  238: "0",
  239: "1",
  240: "2",
  241: "3",
  242: "4",
  243: "5",
  244: "6",
  245: "7",
  246: "8",
  247: "9",
};

/** Read a byte from a Uint8Array, returning 0 for out-of-bounds access. Used throughout
 *  binary parsing to satisfy noUncheckedIndexedAccess without littering `!` everywhere. */
function byte(u8: Uint8Array, offset: number): number {
  return u8[offset] ?? 0;
}

export function decodeGen12String(
  u8: Uint8Array,
  offset: number,
  maxLength: number = 11,
): string {
  let result = "";
  for (let i = 0; i < maxLength; i++) {
    const charCode = u8[offset + i];
    if (
      charCode === undefined ||
      charCode === 0x50 ||
      charCode === 0x00 ||
      charCode === 0xff
    )
      break;
    result += GEN12_CHAR_MAP[charCode] ?? "?";
  }
  return result.trim();
}

function parseDVs(dvBytes: Uint8Array) {
  const b0 = dvBytes[0] ?? 0;
  const b1 = dvBytes[1] ?? 0;
  const atk = b0 >> 4;
  const def = b0 & 0x0f;
  const spd = b1 >> 4;
  const spc = b1 & 0x0f;
  const hp = ((atk & 1) << 3) | ((def & 1) << 2) | ((spd & 1) << 1) | (spc & 1);
  return { hp, atk, def, spd, spc };
}

function checkShiny(dvs: {
  atk: number;
  def: number;
  spd: number;
  spc: number;
}) {
  return (
    dvs.def === 10 &&
    dvs.spd === 10 &&
    dvs.spc === 10 &&
    [2, 3, 6, 7, 10, 11, 14, 15].includes(dvs.atk)
  );
}

function detectGen1GameVersion(
  u8: Uint8Array,
  owned: Set<number>,
  seen: Set<number>,
  trainerName: string,
  partyDetails: { speciesId: number; otName: string }[],
): GameVersion {
  // 1. High-confidence Yellow markers in English version
  // 0x271C: Following Pikachu status, 0x271D: Pikachu Happiness
  const followingPikachu = u8[0x271c];
  const pikachuHappiness = u8[0x271d];

  // If these are non-zero and not FF (unitialized), it's almost certainly Yellow.
  // We use > 0 and < 0xFF to be safe against garbage data.
  if (
    (followingPikachu !== undefined &&
      followingPikachu > 0 &&
      followingPikachu < 0xff) ||
    (pikachuHappiness !== undefined &&
      pikachuHappiness > 0 &&
      pikachuHappiness < 0xff)
  ) {
    return "yellow";
  }

  // 2. Version exclusives scoring
  const redExclusives = [23, 24, 43, 44, 45, 56, 57, 58, 59, 123, 125];
  const blueExclusives = [27, 28, 37, 38, 52, 53, 69, 70, 71, 127, 126];
  const yellowMissing = [
    13, 14, 15, 23, 24, 26, 52, 53, 109, 110, 124, 125, 126,
  ];

  let redScore = 0;
  let blueScore = 0;
  let yellowPenalty = 0;

  // Function to check if a species is actually "native" (not traded)
  const isNative = (id: number) => {
    // Check if it's in the current party with matching OT
    const inParty = partyDetails.find((p) => p.speciesId === id);
    if (inParty) return inParty.otName === trainerName;
    // If not in party, we assume native if it's just 'seen' or 'owned' but we can't verify OT easily without parsing everything.
    // However, if we HAVE it and it's traded, we shouldn't count it.
    return true;
  };

  for (const id of redExclusives) {
    if (owned.has(id) && isNative(id)) redScore += 2;
    else if (seen.has(id)) redScore += 1;
  }
  for (const id of blueExclusives) {
    if (owned.has(id) && isNative(id)) blueScore += 2;
    else if (seen.has(id)) blueScore += 1;
  }
  for (const id of yellowMissing) {
    if (owned.has(id) && isNative(id)) yellowPenalty += 2;
    else if (seen.has(id)) yellowPenalty += 1;
  }

  const isPikachuStarter = owned.has(25);

  // Extra check: Pikachu starter in party with matching OT
  const pikachuInParty = partyDetails.find((p) => p.speciesId === 25);
  const isNativePikachu =
    pikachuInParty && pikachuInParty.otName === trainerName;

  if (
    yellowPenalty === 0 &&
    (redScore > 0 || blueScore > 0 || isPikachuStarter)
  ) {
    if (redScore > 0 && blueScore > 0) return "yellow";
    if (isNativePikachu && redScore === 0 && blueScore === 0) return "yellow";
  }

  // If scores are very close or zero, return unknown to trigger manual selection
  if (Math.abs(redScore - blueScore) < 2 && redScore < 4 && !isNativePikachu)
    return "unknown";

  if (redScore > blueScore + 2) return "red";
  if (blueScore > redScore + 2) return "blue";

  if (redScore > blueScore) return "red";
  if (blueScore > redScore) return "blue";

  return "unknown";
}

function detectGen2GameVersion(
  owned: Set<number>,
  seen: Set<number>,
): GameVersion {
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

  if (goldScore > silverScore) return "gold";
  if (silverScore > goldScore) return "silver";

  return "unknown";
}

function isGen1Save(u8: Uint8Array): boolean {
  const partyCount = byte(u8, 0x2f2c) ?? 0;
  if (partyCount > 6) return false;
  if ((u8[0x2f2d + partyCount] ?? 0) !== 0xff) return false;
  for (let i = 0; i < partyCount; i++) {
    const id = u8[0x2f2d + i] ?? 0;
    if (id === 0 || id === 0xff) return false;
  }
  return true;
}

function isGen2Save(u8: Uint8Array, crystal: boolean): boolean {
  const countOffset = crystal ? 0x2865 : 0x288a;
  const speciesOffset = crystal ? 0x2866 : 0x288b;
  const partyCount = u8[countOffset] ?? 0;
  if (partyCount > 6) return false;
  if ((u8[speciesOffset + partyCount] ?? 0) !== 0xff) return false;
  for (let i = 0; i < partyCount; i++) {
    const id = u8[speciesOffset + i] ?? 0;
    if (id === 0 || id > 251) return false;
  }
  return true;
}

export function parseSaveFile(
  buffer: ArrayBuffer,
  forcedVersion?: GameVersion,
): SaveData {
  const u8 = new Uint8Array(buffer);

  if (buffer.byteLength < 32768) {
    throw new Error("Invalid save file size. Expected at least 32KB.");
  }

  // Gen 1 Checksum
  let gen1Sum = 255;
  for (let i = 0x2598; i <= 0x3522; i++) {
    gen1Sum -= u8[i]!;
  }
  const isGen1ChecksumValid = (gen1Sum & 0xff) === u8[0x3523]!;

  // Gen 2 Checksum
  let gen2Sum = 0;
  for (let i = 0x2009; i <= 0x2d0c; i++) {
    gen2Sum += u8[i]!;
  }
  const gen2Checksum = (u8[0x2d0e]! << 8) | u8[0x2d0d]!;
  const isGen2ChecksumValid = (gen2Sum & 0xffff) === gen2Checksum;

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
    throw new Error(
      "Could not detect a valid Pokémon Red/Blue/Yellow or Gold/Silver/Crystal save file. Please ensure you are uploading a .sav file from a Gen 1 or Gen 2 game.",
    );
  }
}

function parseGen1(u8: Uint8Array, forcedVersion?: GameVersion): SaveData {
  const trainerName = decodeGen12String(u8, 0x2598);

  // Quick parse of party to get OTs for accurate version detection
  const partyCount = byte(u8, 0x2f2c);
  const quickParty: { speciesId: number; otName: string }[] = [];
  const partyDataOffset = 0x2f2d + 7;
  const partyOTOffset = partyDataOffset + 6 * 44;

  // Note: we don't know the shift yet, so we try both for quick party if needed,
  // but usually OTs don't move or we can guess. For now, let's just use the default
  // and hope it's enough for version detection.
  for (let i = 0; i < partyCount; i++) {
    const offset = partyDataOffset + i * 44;
    const internalId = byte(u8, offset);
    const speciesId = INTERNAL_ID_TO_DEX[internalId];
    if (speciesId) {
      const otName = decodeGen12String(u8, partyOTOffset + i * 11);
      quickParty.push({ speciesId, otName });
    }
  }

  // Try to detect version by checking Pokedex at both possible offsets (0 and +1)
  // Yellow shifted by +1 after PlayerName (offset 0x2598 + 11 = 0x25A3).

  const detectForOffset = (ownedBase: number) => {
    const owned = new Set<number>();
    const seen = new Set<number>();
    const ownedBytes = u8.slice(ownedBase, ownedBase + 19);
    const seenBytes = u8.slice(
      ownedBase + (0x25b6 - 0x25a3),
      ownedBase + (0x25b6 - 0x25a3) + 19,
    );

    for (let i = 1; i <= 151; i++) {
      const byteIdx = Math.floor((i - 1) / 8);
      const bitIdx = (i - 1) % 8;
      if (((ownedBytes[byteIdx] ?? 0) & (1 << bitIdx)) !== 0) owned.add(i);
      if (((seenBytes[byteIdx] ?? 0) & (1 << bitIdx)) !== 0) seen.add(i);
    }
    // High-confidence Yellow indicators: bit 152 (last bit of 19-byte Pokedex) must be 0.
    // In Yellow, the Happiness byte (at A3) is often FF or high value, which would make bit 7 of the "shifted-Pokedex-last-byte" 1 if we read from A3.
    const paddingBitIsCorrect = ((ownedBytes[18] ?? 0) & 0x80) === 0;
    const version = detectGen1GameVersion(
      u8,
      owned,
      seen,
      trainerName,
      quickParty,
    );
    return { version, owned, seen, paddingBitIsCorrect };
  };

  const res0 = detectForOffset(0x25a3);
  const res1 = detectForOffset(0x25a4);

  // Pick the probe that looks more correct for the structure, primarily using the padding bit.
  const resToUse =
    res1.paddingBitIsCorrect && !res0.paddingBitIsCorrect ? res1 : res0;

  let isYellow = forcedVersion === "yellow";
  if (!forcedVersion) {
    if (
      resToUse === res1 ||
      res0.version === "yellow" ||
      res1.version === "yellow"
    ) {
      isYellow = true;
    }
  }

  const offsetShift = resToUse === res1 ? 1 : 0;
  const gameVersion = isYellow
    ? "yellow"
    : forcedVersion && forcedVersion !== "unknown"
      ? forcedVersion
      : resToUse.version;
  const { owned, seen } = resToUse;

  const partyDetails: PokemonInstance[] = [];
  const shiftedPartyDataOffset = 0x2f2d + offsetShift + 7;
  const shiftedPartyOTOffset = shiftedPartyDataOffset + 6 * 44;

  for (let i = 0; i < partyCount; i++) {
    const offset = shiftedPartyDataOffset + i * 44;
    const internalId = byte(u8, offset);
    const speciesId = INTERNAL_ID_TO_DEX[internalId];
    if (!speciesId) continue;
    const level = byte(u8, offset + 33);
    const moves = Array.from(u8.slice(offset + 8, offset + 12)).filter(
      (m) => m > 0,
    );
    const dvs = parseDVs(u8.slice(offset + 27, offset + 29));
    const isShiny = checkShiny(dvs);
    const otName = decodeGen12String(u8, shiftedPartyOTOffset + i * 11);
    partyDetails.push({
      speciesId,
      level,
      isShiny,
      moves,
      dvs,
      otName,
      storageLocation: "Party",
      slot: i + 1,
    });
  }

  const party = partyDetails.map((p) => p.speciesId);

  const currentBoxNum = byte(u8, 0x284c + offsetShift) & 0x7f;
  const currentBoxCount = byte(u8, 0x30c0 + offsetShift);
  const currentBoxSpecies = u8.slice(
    0x30c1 + offsetShift,
    0x30c1 + offsetShift + currentBoxCount,
  );
  const pc = Array.from(currentBoxSpecies)
    .map((id) => INTERNAL_ID_TO_DEX[id])
    .filter((id): id is number => id !== undefined);

  const pcDetails: PokemonInstance[] = [];
  const currentBoxDataOffset = 0x30c1 + offsetShift + 21;
  const currentBoxOTOffset = currentBoxDataOffset + 20 * 33;
  for (let i = 0; i < currentBoxCount; i++) {
    const offset = currentBoxDataOffset + i * 33;
    const internalId = byte(u8, offset);
    const speciesId = INTERNAL_ID_TO_DEX[internalId];
    if (!speciesId) continue;
    const level = byte(u8, offset + 3);
    const moves = Array.from(u8.slice(offset + 8, offset + 12)).filter(
      (m) => m > 0,
    );
    const dvs = parseDVs(u8.slice(offset + 27, offset + 29));
    const isShiny = checkShiny(dvs);
    const otName = decodeGen12String(u8, currentBoxOTOffset + i * 11);
    pcDetails.push({
      speciesId,
      level,
      isShiny,
      moves,
      dvs,
      otName,
      storageLocation: `Box ${currentBoxNum + 1}`,
      slot: i + 1,
    });
  }

  const boxOffsets = [
    0x4000, 0x4462, 0x48c4, 0x4d26, 0x5188, 0x55ea, 0x6000, 0x6462, 0x68c4,
    0x6d26, 0x7188, 0x75ea,
  ];
  for (let i = 0; i < 12; i++) {
    if (i === currentBoxNum) continue;
    const offset = boxOffsets[i]!;
    const count = byte(u8, offset);
    if (count > 20) continue;
    const species = u8.slice(offset + 1, offset + 1 + count);
    pc.push(
      ...Array.from(species)
        .map((id) => INTERNAL_ID_TO_DEX[id])
        .filter((id): id is number => id !== undefined),
    );

    const boxDataOffset = offset + 22; // Offset 21 is species list end (FF), 22 is first Pokemon
    const boxOTOffset = boxDataOffset + 20 * 33;
    for (let j = 0; j < count; j++) {
      const pOff = boxDataOffset + j * 33;
      const internalId = byte(u8, pOff);
      const speciesId = INTERNAL_ID_TO_DEX[internalId];
      if (!speciesId) continue;

      const level = byte(u8, pOff + 3);
      const moves = Array.from(u8.slice(pOff + 8, pOff + 12)).filter(
        (m) => m > 0,
      );
      const dvs = parseDVs(u8.slice(pOff + 27, pOff + 29));
      const isShiny = checkShiny(dvs);
      const otName = decodeGen12String(u8, boxOTOffset + j * 11);

      pcDetails.push({
        speciesId,
        level,
        isShiny,
        moves,
        dvs,
        otName,
        storageLocation: `Box ${i + 1}`,
        slot: j + 1,
      });
    }
  }

  const badges = byte(u8, 0x2602 + offsetShift);
  const trainerId =
    (byte(u8, 0x2605 + offsetShift) << 8) | byte(u8, 0x2606 + offsetShift);
  const currentMapId = byte(u8, 0x260a + offsetShift);
  const currentMapName =
    (gen1MapLocations as Record<string, string>)[currentMapId.toString()] ||
    "Unknown Map";
  const inventory: { id: number; quantity: number }[] = [];
  const itemCount = byte(u8, 0x25c9 + offsetShift);
  for (let i = 0; i < itemCount; i++) {
    const itemOffset = 0x25ca + offsetShift + i * 2;
    inventory.push({
      id: byte(u8, itemOffset),
      quantity: byte(u8, itemOffset + 1),
    });
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
    currentMapName,
    inventory,
    currentBoxCount,
    hallOfFameCount:
      byte(u8, 0x25b3 + offsetShift) === 0xff
        ? 0
        : byte(u8, 0x25b3 + offsetShift),
    eventFlags: u8.slice(0x29e6 + offsetShift, 0x29e6 + offsetShift + 0x118),
    npcTradeFlags:
      byte(u8, 0x29e6 + offsetShift - 16) |
      (byte(u8, 0x29e6 + offsetShift - 15) << 8),
  };
}

function parseCaughtData(u8: Uint8Array, offset: number) {
  const caughtByte1 = byte(u8, offset + 29);
  const caughtByte2 = byte(u8, offset + 30);

  if (caughtByte1 === 0 && caughtByte2 === 0) return undefined;

  const timeBits = (caughtByte1 & 0xc0) >> 6;
  const caughtLevel = caughtByte1 & 0x3f;
  const location = caughtByte2;

  let time: "Morning" | "Day" | "Night" | "Unknown" = "Unknown";
  if (timeBits === 1) time = "Morning";
  else if (timeBits === 2) time = "Day";
  else if (timeBits === 3) time = "Night";

  let locationName: string | undefined;
  if (location === 0x7e) locationName = "Event/Gift";
  else if (location === 0x7f) locationName = "Special Event/Traded";
  else {
    locationName = (gen2Landmarks as Record<string, string>)[
      location.toString()
    ];
  }

  return { time, level: caughtLevel, location, locationName };
}

function parseGen2(u8: Uint8Array, forceCrystal = false): SaveData {
  let isCrystal = forceCrystal;
  if (!isCrystal) {
    const gsPartyCount = byte(u8, 0x288a);
    const cPartyCount = byte(u8, 0x2865);
    if (cPartyCount <= 6 && cPartyCount > 0 && gsPartyCount > 6) {
      isCrystal = true;
    }
  }

  const offsets = isCrystal
    ? {
        owned: 0x2a69,
        seen: 0x2a89,
        partyCount: 0x2865,
        partySpecies: 0x2866,
        currentBoxNum: 0x2700,
        currentBoxCount: 0x2d10,
        currentBoxSpecies: 0x2d11,
      }
    : {
        owned: 0x2a4c,
        seen: 0x2a6c,
        partyCount: 0x288a,
        partySpecies: 0x288b,
        currentBoxNum: 0x2724,
        currentBoxCount: 0x2d10,
        currentBoxSpecies: 0x2d11,
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
  const partySpecies = u8.slice(
    offsets.partySpecies,
    offsets.partySpecies + partyCount,
  );
  const party = Array.from(partySpecies).filter((id) => id > 0 && id <= 251);

  const partyDetails: PokemonInstance[] = [];
  const partyDataOffset = offsets.partySpecies + 7; // After species list
  const partyOTOffset = partyDataOffset + 6 * 48;
  for (let i = 0; i < partyCount; i++) {
    const offset = partyDataOffset + i * 48; // Gen 2 party struct is 48 bytes
    const speciesId = byte(u8, offset);
    if (!speciesId || speciesId > 251) continue;

    const item = byte(u8, offset + 1);
    const moves = Array.from(u8.slice(offset + 2, offset + 6)).filter(
      (m) => m > 0,
    );
    const dvs = parseDVs(u8.slice(offset + 21, offset + 23)); // DVs at 0x15
    const isShiny = checkShiny(dvs);
    const friendship = byte(u8, offset + 27); // 0x1B
    const pokerus = byte(u8, offset + 28); // 0x1C
    const level = byte(u8, offset + 31); // 0x1F
    const caughtData = isCrystal ? parseCaughtData(u8, offset) : undefined;
    const otName = decodeGen12String(u8, partyOTOffset + i * 11);

    partyDetails.push({
      speciesId,
      level,
      isShiny,
      item,
      moves,
      friendship,
      pokerus,
      caughtData,
      dvs,
      otName,
      storageLocation: "Party",
      slot: i + 1,
    });
  }

  const currentBoxNum = byte(u8, offsets.currentBoxNum) & 0x0f;
  const currentBoxCount = byte(u8, offsets.currentBoxCount);
  const currentBoxSpecies = u8.slice(
    offsets.currentBoxSpecies,
    offsets.currentBoxSpecies + currentBoxCount,
  );
  const pc = Array.from(currentBoxSpecies).filter((id) => id > 0 && id <= 251);

  const pcDetails: PokemonInstance[] = [];
  const currentBoxDataOffset = offsets.currentBoxSpecies + 21; // After species list
  const currentBoxOTOffset = currentBoxDataOffset + 20 * 32;
  for (let i = 0; i < currentBoxCount; i++) {
    const offset = currentBoxDataOffset + i * 32; // Gen 2 PC struct is 32 bytes
    const speciesId = byte(u8, offset);
    if (!speciesId || speciesId > 251) continue;

    const item = byte(u8, offset + 1);
    const moves = Array.from(u8.slice(offset + 2, offset + 6)).filter(
      (m) => m > 0,
    );
    const dvs = parseDVs(u8.slice(offset + 21, offset + 23)); // DVs at 0x15
    const isShiny = checkShiny(dvs);
    const friendship = byte(u8, offset + 27); // 0x1B
    const pokerus = byte(u8, offset + 28); // 0x1C
    const level = byte(u8, offset + 31); // 0x1F
    const caughtData = isCrystal ? parseCaughtData(u8, offset) : undefined;
    const otName = decodeGen12String(u8, currentBoxOTOffset + i * 11);

    pcDetails.push({
      speciesId,
      level,
      isShiny,
      item,
      moves,
      friendship,
      pokerus,
      caughtData,
      dvs,
      otName,
      storageLocation: `Box ${currentBoxNum + 1}`,
      slot: i + 1,
    });
  }

  const boxOffsets = [
    0x4000,
    0x444e,
    0x489c,
    0x4cea,
    0x5138,
    0x5586,
    0x59d4, // Bank 1
    0x6000,
    0x644e,
    0x689c,
    0x6cea,
    0x7138,
    0x7586,
    0x79d4, // Bank 2
  ];

  for (let i = 0; i < 14; i++) {
    if (i === currentBoxNum) continue;
    const offset = boxOffsets[i]!;
    const count = byte(u8, offset);
    if (count > 20) continue;
    const species = u8.slice(offset + 1, offset + 1 + count);
    pc.push(...Array.from(species).filter((id) => id > 0 && id <= 251));

    const boxDataOffset = offset + 22;
    const boxOTOffset = boxDataOffset + 20 * 32;
    for (let j = 0; j < count; j++) {
      const pOff = boxDataOffset + j * 32;
      const speciesId = byte(u8, pOff);
      if (!speciesId || speciesId > 251) continue;

      const item = byte(u8, pOff + 1);
      const moves = Array.from(u8.slice(pOff + 2, pOff + 6)).filter(
        (m) => m > 0,
      );
      const dvs = parseDVs(u8.slice(pOff + 21, pOff + 23));
      const isShiny = checkShiny(dvs);
      const friendship = byte(u8, pOff + 27);
      const pokerus = byte(u8, pOff + 28);
      const level = byte(u8, pOff + 31);
      const caughtData = isCrystal ? parseCaughtData(u8, pOff) : undefined;
      const otName = decodeGen12String(u8, boxOTOffset + j * 11);

      pcDetails.push({
        speciesId,
        level,
        isShiny,
        item,
        moves,
        friendship,
        pokerus,
        caughtData,
        dvs,
        otName,
        storageLocation: `Box ${i + 1}`,
        slot: j + 1,
      });
    }
  }

  const johtoBadgesOffset = isCrystal ? 0x23e5 : 0x23e4;
  const kantoBadgesOffset = isCrystal ? 0x23e6 : 0x23e5;

  // Daycare Gen 2
  const daycare1Offset = isCrystal ? 0x282c : 0x2850;
  if (byte(u8, daycare1Offset) !== 0 && byte(u8, daycare1Offset) !== 0xff) {
    const speciesId = byte(u8, daycare1Offset);
    const item = byte(u8, daycare1Offset + 1);
    const moves = Array.from(
      u8.slice(daycare1Offset + 2, daycare1Offset + 6),
    ).filter((m) => m > 0);
    const dvs = parseDVs(u8.slice(daycare1Offset + 21, daycare1Offset + 23));
    const isShiny = checkShiny(dvs);
    const friendship = byte(u8, daycare1Offset + 27);
    const pokerus = byte(u8, daycare1Offset + 28);
    const level = byte(u8, daycare1Offset + 31);
    const otName = decodeGen12String(u8, daycare1Offset + 32);
    pcDetails.push({
      speciesId,
      level,
      isShiny,
      item,
      moves,
      friendship,
      pokerus,
      dvs,
      otName,
      storageLocation: "Daycare",
    });
  }

  let badges = 0;
  for (let i = 0; i < 8; i++) {
    if ((byte(u8, johtoBadgesOffset) & (1 << i)) !== 0) badges++;
    if ((byte(u8, kantoBadgesOffset) & (1 << i)) !== 0) badges++;
  }

  let gameVersion = isCrystal ? "crystal" : detectGen2GameVersion(owned, seen);
  if (gameVersion === "unknown" && !isCrystal) {
    gameVersion = "gold";
  }

  const trainerName = decodeGen12String(u8, 0x200b);
  const trainerId = (byte(u8, 0x2009) << 8) | byte(u8, 0x200a);

  const mapBankOffset = isCrystal ? 0x25c6 : 0x25b3;
  const mapIdOffset = isCrystal ? 0x25c7 : 0x25b4;
  const mapGroup = byte(u8, mapBankOffset);
  const currentMapId = byte(u8, mapIdOffset);

  let currentMapName = "Unknown Map";
  const gen2Maps = gen2MapLocations as Record<string, Record<string, string>>;
  if (
    gen2Maps[mapGroup.toString()] &&
    gen2Maps[mapGroup.toString()]?.[currentMapId.toString()]
  ) {
    currentMapName = gen2Maps[mapGroup.toString()]?.[currentMapId.toString()]!;
  }

  // Detailed inventory parsing for Gen 2 could be added here later
  const inventory: { id: number; quantity: number }[] = [];

  const johtoBadgesValue = byte(u8, johtoBadgesOffset);
  const kantoBadgesValue = byte(u8, kantoBadgesOffset);

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
    currentMapName,
    mapGroup,
    inventory,
    currentBoxCount: 0,
    hallOfFameCount: 0, // Default for Gen 2 for now
  };
}
