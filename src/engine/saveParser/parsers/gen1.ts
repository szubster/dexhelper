import gen1MapLocations from '../../data/gen1/mapLocations.json';
import type { GameVersion, PokemonInstance, SaveData } from './common';
import { checkShiny, decodeGen12String, parseDVs } from './common';

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

/**
 * Attempts to heuristically determine the specific Generation 1 game version (Red, Blue, or Yellow).
 *
 * Gen 1 saves do not contain a dedicated byte that explicitly identifies the game version.
 * Instead, this function infers the version by analyzing the player's Pokédex (owned/seen exclusives),
 * in-game trade OT names (which differ between versions), and Yellow-specific markers (like Pikachu's happiness).
 * It first checks for high-confidence Yellow markers (Pikachu friendship/status bytes).
 * If those are inconclusive, it falls back to a scoring system based on version-exclusive
 * Pokémon found in the player's Pokédex and party.
 *
 * @param view - The raw save file DataView.
 * @param owned - A set of Pokémon Pokédex IDs the player has caught.
 * @param seen - A set of Pokémon Pokédex IDs the player has seen.
 * @param trainerName - The player's Original Trainer (OT) name.
 * @param partyDetails - A quick parsing of the player's party to verify if Pikachu is a native starter.
 * @returns 'red', 'blue', 'yellow', or 'unknown' if the heuristic scores are too close to confidently decide.
 */
export function detectGen1GameVersion(
  view: DataView,
  owned: Set<number>,
  seen: Set<number>,
  trainerName: string,
  partyDetails: { speciesId: number; otName: string }[],
): GameVersion {
  // 1. High-confidence Yellow markers in English version
  // 0x271C: Following Pikachu status, 0x271D: Pikachu Happiness
  const followingPikachu = view.getUint8(0x271c);
  const pikachuHappiness = view.getUint8(0x271d);

  // If these are non-zero and not FF (unitialized), it's almost certainly Yellow.
  // We use > 0 and < 0xFF to be safe against garbage data.
  if ((followingPikachu > 0 && followingPikachu < 0xff) || (pikachuHappiness > 0 && pikachuHappiness < 0xff)) {
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

/**
 * Performs a structural check to verify if the binary data is a valid Generation 1 save.
 *
 * Unlike Gen 2 which has robust checksums, Gen 1 validation relies heavily on structural sanity checks.
 * It verifies that the party count is logical (<= 6), ensures the party list is correctly terminated with 0xFF,
 * and validates that the internal IDs in the party are not blank or terminator bytes.
 *
 * @param view - The raw save file DataView.
 * @returns True if the structure looks like a valid Gen 1 save.
 */
export function isGen1Save(view: DataView): boolean {
  const partyCount = view.getUint8(0x2f2c);
  if (partyCount > 6) return false;
  if (view.getUint8(0x2f2d + partyCount) !== 0xff) return false;
  for (let i = 0; i < partyCount; i++) {
    const id = view.getUint8(0x2f2d + i);
    if (id === 0 || id === 0xff) return false;
  }
  return true;
}

/**
 * Extracts all relevant game data (party, PC boxes, inventory, Pokédex, etc.) from a Gen 1 save.
 *
 * Gen 1 save file structures differ slightly based on version and region. Notably, Yellow version
 * shifted many memory offsets by +1 byte compared to Red/Blue. Japanese versions also have different
 * string encodings and lengths which affect offset calculations.
 *
 * This parser probes both potential Pokédex offsets (0x25A3 for R/B, 0x25A4 for Yellow) and uses
 * padding bit correctness to dynamically detect the offset shift before extracting the rest of the
 * save data. It relies on `detectGen1GameVersion` internally to infer the exact version if not forced.
 *
 * @param view - The raw save file DataView.
 * @param forcedVersion - An optional game version override, used to bypass heuristics if the user manually specifies it.
 * @returns The fully parsed and structured SaveData object.
 */
export function parseGen1(view: DataView, forcedVersion?: GameVersion): SaveData {
  const trainerName = decodeGen12String(view, 0x2598);

  // Quick parse of party to get OTs for accurate version detection
  const partyCount = view.getUint8(0x2f2c);
  const quickParty: { speciesId: number; otName: string }[] = [];
  const partyDataOffset = 0x2f2d + 7;
  const partyOTOffset = partyDataOffset + 6 * 44;

  // Note: we don't know the shift yet, so we try both for quick party if needed,
  // but usually OTs don't move or we can guess. For now, let's just use the default
  // and hope it's enough for version detection.
  for (let i = 0; i < partyCount; i++) {
    const offset = partyDataOffset + i * 44;
    const internalId = view.getUint8(offset);
    const speciesId = INTERNAL_ID_TO_DEX[internalId];
    if (speciesId) {
      const otName = decodeGen12String(view, partyOTOffset + i * 11);
      quickParty.push({ speciesId, otName });
    }
  }

  // Try to detect version by checking Pokedex at both possible offsets (0 and +1)
  // Yellow shifted by +1 after PlayerName (offset 0x2598 + 11 = 0x25A3).

  const detectForOffset = (ownedBase: number) => {
    const owned = new Set<number>();
    const seen = new Set<number>();

    for (let i = 1; i <= 151; i++) {
      const byteIdx = Math.floor((i - 1) / 8);
      const bitIdx = (i - 1) % 8;
      const oByte = view.getUint8(ownedBase + byteIdx);
      const sByte = view.getUint8(ownedBase + (0x25b6 - 0x25a3) + byteIdx);
      if ((oByte & (1 << bitIdx)) !== 0) owned.add(i);
      if ((sByte & (1 << bitIdx)) !== 0) seen.add(i);
    }
    // High-confidence Yellow indicators: bit 152 (last bit of 19-byte Pokedex) must be 0.
    // In Yellow, the Happiness byte (at A3) is often FF or high value, which would make bit 7 of the "shifted-Pokedex-last-byte" 1 if we read from A3.
    const paddingBitIsCorrect = (view.getUint8(ownedBase + 18) & 0x80) === 0;
    const version = detectGen1GameVersion(view, owned, seen, trainerName, quickParty);
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
    const internalId = view.getUint8(offset);
    const speciesId = INTERNAL_ID_TO_DEX[internalId];
    if (!speciesId) continue;
    const level = view.getUint8(offset + 33);
    const moves: number[] = [];
    for (let j = 0; j < 4; j++) {
      const m = view.getUint8(offset + 8 + j);
      if (m > 0) moves.push(m);
    }
    const dvs = parseDVs(view.getUint16(offset + 27, false));
    const isShiny = checkShiny(dvs);
    const otName = decodeGen12String(view, shiftedPartyOTOffset + i * 11);
    partyDetails.push({
      speciesId,
      level,
      isShiny,
      moves,
      otName,
      storageLocation: 'Party',
      slot: i + 1,
    });
  }

  const party = partyDetails.map((p) => p.speciesId);

  const currentBoxNum = view.getUint8(0x284c + offsetShift) & 0x7f;
  const currentBoxCount = view.getUint8(0x30c0 + offsetShift);
  const pc: number[] = [];
  for (let i = 0; i < currentBoxCount; i++) {
    const id = view.getUint8(0x30c1 + offsetShift + i);
    const dex = INTERNAL_ID_TO_DEX[id];
    if (dex !== undefined) pc.push(dex);
  }

  const pcDetails: PokemonInstance[] = [];
  const currentBoxDataOffset = 0x30c1 + offsetShift + 21;
  const currentBoxOTOffset = currentBoxDataOffset + 20 * 33;
  for (let i = 0; i < currentBoxCount; i++) {
    const offset = currentBoxDataOffset + i * 33;
    const internalId = view.getUint8(offset);
    const speciesId = INTERNAL_ID_TO_DEX[internalId];
    if (!speciesId) continue;
    const level = view.getUint8(offset + 3);
    const moves: number[] = [];
    for (let j = 0; j < 4; j++) {
      const m = view.getUint8(offset + 8 + j);
      if (m > 0) moves.push(m);
    }
    const dvs = parseDVs(view.getUint16(offset + 27, false));
    const isShiny = checkShiny(dvs);
    const otName = decodeGen12String(view, currentBoxOTOffset + i * 11);
    pcDetails.push({
      speciesId,
      level,
      isShiny,
      moves,
      otName,
      storageLocation: `Box ${currentBoxNum + 1}`,
      slot: i + 1,
    });
  }

  const boxOffsets = [0x4000, 0x4462, 0x48c4, 0x4d26, 0x5188, 0x55ea, 0x6000, 0x6462, 0x68c4, 0x6d26, 0x7188, 0x75ea];
  for (const [i, offset] of boxOffsets.entries()) {
    if (i === currentBoxNum) continue;
    const count = view.getUint8(offset);
    if (count > 20) continue;

    for (let j = 0; j < count; j++) {
      const id = view.getUint8(offset + 1 + j);
      const dex = INTERNAL_ID_TO_DEX[id];
      if (dex !== undefined) pc.push(dex);
    }

    const boxDataOffset = offset + 22; // Offset 21 is species list end (FF), 22 is first Pokemon
    const boxOTOffset = boxDataOffset + 20 * 33;
    for (let j = 0; j < count; j++) {
      const pOff = boxDataOffset + j * 33;
      const internalId = view.getUint8(pOff);
      const speciesId = INTERNAL_ID_TO_DEX[internalId];
      if (!speciesId) continue;

      const level = view.getUint8(pOff + 3);
      const moves: number[] = [];
      for (let k = 0; k < 4; k++) {
        const m = view.getUint8(pOff + 8 + k);
        if (m > 0) moves.push(m);
      }
      const dvs = parseDVs(view.getUint16(pOff + 27, false));
      const isShiny = checkShiny(dvs);
      const otName = decodeGen12String(view, boxOTOffset + j * 11);

      pcDetails.push({
        speciesId,
        level,
        isShiny,
        moves,
        otName,
        storageLocation: `Box ${i + 1}`,
        slot: j + 1,
      });
    }
  }

  const badges = view.getUint8(0x2602 + offsetShift);
  const trainerId = view.getUint16(0x2605 + offsetShift, false);
  const currentMapId = view.getUint8(0x260a + offsetShift);
  const currentMapName = (gen1MapLocations as Record<string, string>)[currentMapId.toString()] || 'Unknown Map';
  const inventory: { id: number; quantity: number }[] = [];
  const itemCount = view.getUint8(0x25c9 + offsetShift);
  for (let i = 0; i < itemCount; i++) {
    const itemOffset = 0x25ca + offsetShift + i * 2;
    inventory.push({ id: view.getUint8(itemOffset), quantity: view.getUint8(itemOffset + 1) });
  }

  const hallOfFameRaw = view.getUint8(0x25b3 + offsetShift);
  const eventFlagsOffset = 0x29e6 + offsetShift;
  const eventFlags = new Uint8Array(view.buffer, eventFlagsOffset, 0x118);

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
    hallOfFameCount: hallOfFameRaw === 0xff ? 0 : hallOfFameRaw,
    eventFlags,
    npcTradeFlags: view.getUint8(eventFlagsOffset - 16) | (view.getUint8(eventFlagsOffset - 15) << 8),
  };
}
