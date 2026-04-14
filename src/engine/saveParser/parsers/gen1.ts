import gen1MapLocations from '../../data/gen1/mapLocations.json';
import type { GameVersion, PokemonInstance, SaveData } from './common';
import { byte, checkShiny, decodeGen12String, parseDVs } from './common';

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

export function detectGen1GameVersion(
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
    (followingPikachu !== undefined && followingPikachu > 0 && followingPikachu < 0xff) ||
    (pikachuHappiness !== undefined && pikachuHappiness > 0 && pikachuHappiness < 0xff)
  ) {
    return 'yellow';
  }

  // 2. Version exclusives scoring
  const redExclusives = [23, 24, 43, 44, 45, 56, 57, 58, 59, 123, 125];
  const blueExclusives = [27, 28, 37, 38, 52, 53, 69, 70, 71, 127, 126];
  const yellowMissing = [13, 14, 15, 23, 24, 26, 52, 53, 109, 110, 124, 125, 126];

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
  const isNativePikachu = pikachuInParty && pikachuInParty.otName === trainerName;

  if (yellowPenalty === 0 && (redScore > 0 || blueScore > 0 || isPikachuStarter)) {
    if (redScore > 0 && blueScore > 0) return 'yellow';
    if (isNativePikachu && redScore === 0 && blueScore === 0) return 'yellow';
  }

  // If scores are very close or zero, return unknown to trigger manual selection
  if (Math.abs(redScore - blueScore) < 2 && redScore < 4 && !isNativePikachu) return 'unknown';

  if (redScore > blueScore + 2) return 'red';
  if (blueScore > redScore + 2) return 'blue';

  if (redScore > blueScore) return 'red';
  if (blueScore > redScore) return 'blue';

  return 'unknown';
}

export function isGen1Save(u8: Uint8Array): boolean {
  const partyCount = byte(u8, 0x2f2c) ?? 0;
  if (partyCount > 6) return false;
  if ((u8[0x2f2d + partyCount] ?? 0) !== 0xff) return false;
  for (let i = 0; i < partyCount; i++) {
    const id = u8[0x2f2d + i] ?? 0;
    if (id === 0 || id === 0xff) return false;
  }
  return true;
}

export function parseGen1(u8: Uint8Array, forcedVersion?: GameVersion): SaveData {
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
    const seenBytes = u8.slice(ownedBase + (0x25b6 - 0x25a3), ownedBase + (0x25b6 - 0x25a3) + 19);

    for (let i = 1; i <= 151; i++) {
      const byteIdx = Math.floor((i - 1) / 8);
      const bitIdx = (i - 1) % 8;
      if (((ownedBytes[byteIdx] ?? 0) & (1 << bitIdx)) !== 0) owned.add(i);
      if (((seenBytes[byteIdx] ?? 0) & (1 << bitIdx)) !== 0) seen.add(i);
    }
    // High-confidence Yellow indicators: bit 152 (last bit of 19-byte Pokedex) must be 0.
    // In Yellow, the Happiness byte (at A3) is often FF or high value, which would make bit 7 of the "shifted-Pokedex-last-byte" 1 if we read from A3.
    const paddingBitIsCorrect = ((ownedBytes[18] ?? 0) & 0x80) === 0;
    const version = detectGen1GameVersion(u8, owned, seen, trainerName, quickParty);
    return { version, owned, seen, paddingBitIsCorrect };
  };

  const res0 = detectForOffset(0x25a3);
  const res1 = detectForOffset(0x25a4);

  // Pick the probe that looks more correct for the structure, primarily using the padding bit.
  const resToUse = res1.paddingBitIsCorrect && !res0.paddingBitIsCorrect ? res1 : res0;

  let isYellow = forcedVersion === 'yellow';
  if (!forcedVersion) {
    if (resToUse === res1 || res0.version === 'yellow' || res1.version === 'yellow') {
      isYellow = true;
    }
  }

  const offsetShift = resToUse === res1 ? 1 : 0;
  const gameVersion = isYellow
    ? 'yellow'
    : forcedVersion && forcedVersion !== 'unknown'
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
    const moves = Array.from(u8.slice(offset + 8, offset + 12)).filter((m) => m > 0);
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
      storageLocation: 'Party',
      slot: i + 1,
    });
  }

  const party = partyDetails.map((p) => p.speciesId);

  const currentBoxNum = byte(u8, 0x284c + offsetShift) & 0x7f;
  const currentBoxCount = byte(u8, 0x30c0 + offsetShift);
  const currentBoxSpecies = u8.slice(0x30c1 + offsetShift, 0x30c1 + offsetShift + currentBoxCount);
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
    const moves = Array.from(u8.slice(offset + 8, offset + 12)).filter((m) => m > 0);
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

  const boxOffsets = [0x4000, 0x4462, 0x48c4, 0x4d26, 0x5188, 0x55ea, 0x6000, 0x6462, 0x68c4, 0x6d26, 0x7188, 0x75ea];
  for (let i = 0; i < 12; i++) {
    if (i === currentBoxNum) continue;
    const offset = boxOffsets[i];
    if (offset === undefined) continue;
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
      const moves = Array.from(u8.slice(pOff + 8, pOff + 12)).filter((m) => m > 0);
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
  const trainerId = (byte(u8, 0x2605 + offsetShift) << 8) | byte(u8, 0x2606 + offsetShift);
  const currentMapId = byte(u8, 0x260a + offsetShift);
  const currentMapName = (gen1MapLocations as Record<string, string>)[currentMapId.toString()] || 'Unknown Map';
  const inventory: { id: number; quantity: number }[] = [];
  const itemCount = byte(u8, 0x25c9 + offsetShift);
  for (let i = 0; i < itemCount; i++) {
    const itemOffset = 0x25ca + offsetShift + i * 2;
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
    currentMapName,
    inventory,
    currentBoxCount,
    hallOfFameCount: byte(u8, 0x25b3 + offsetShift) === 0xff ? 0 : byte(u8, 0x25b3 + offsetShift),
    eventFlags: u8.slice(0x29e6 + offsetShift, 0x29e6 + offsetShift + 0x118),
    npcTradeFlags: byte(u8, 0x29e6 + offsetShift - 16) | (byte(u8, 0x29e6 + offsetShift - 15) << 8),
  };
}
