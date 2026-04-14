import gen2Landmarks from '../../data/gen2/landmarks.json';
import gen2MapLocations from '../../data/gen2/mapLocations.json';
import type { GameVersion, PokemonInstance, SaveData } from './common';
import { byte, checkShiny, decodeGen12String, parseDVs } from './common';

export function parseCaughtData(u8: Uint8Array, offset: number) {
  const caughtByte1 = byte(u8, offset + 29);
  const caughtByte2 = byte(u8, offset + 30);

  if (caughtByte1 === 0 && caughtByte2 === 0) return undefined;

  const timeBits = (caughtByte1 & 0xc0) >> 6;
  const caughtLevel = caughtByte1 & 0x3f;
  const location = caughtByte2;

  let time: 'Morning' | 'Day' | 'Night' | 'Unknown' = 'Unknown';
  if (timeBits === 1) time = 'Morning';
  else if (timeBits === 2) time = 'Day';
  else if (timeBits === 3) time = 'Night';

  let locationName: string | undefined;
  if (location === 0x7e) locationName = 'Event/Gift';
  else if (location === 0x7f) locationName = 'Special Event/Traded';
  else {
    locationName = (gen2Landmarks as Record<string, string>)[location.toString()];
  }

  return { time, level: caughtLevel, location, locationName };
}

export function detectGen2GameVersion(owned: Set<number>, seen: Set<number>): GameVersion {
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

export function isGen2Save(u8: Uint8Array, crystal: boolean): boolean {
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

export function parseGen2(u8: Uint8Array, forceCrystal = false): SaveData {
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
  const partySpecies = u8.slice(offsets.partySpecies, offsets.partySpecies + partyCount);
  const party = Array.from(partySpecies).filter((id) => id > 0 && id <= 251);

  const partyDetails: PokemonInstance[] = [];
  const partyDataOffset = offsets.partySpecies + 7; // After species list
  const partyOTOffset = partyDataOffset + 6 * 48;
  for (let i = 0; i < partyCount; i++) {
    const offset = partyDataOffset + i * 48; // Gen 2 party struct is 48 bytes
    const speciesId = byte(u8, offset);
    if (!speciesId || speciesId > 251) continue;

    const item = byte(u8, offset + 1);
    const moves = Array.from(u8.slice(offset + 2, offset + 6)).filter((m) => m > 0);
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
      storageLocation: 'Party',
      slot: i + 1,
    });
  }

  const currentBoxNum = byte(u8, offsets.currentBoxNum) & 0x0f;
  const currentBoxCount = byte(u8, offsets.currentBoxCount);
  const currentBoxSpecies = u8.slice(offsets.currentBoxSpecies, offsets.currentBoxSpecies + currentBoxCount);
  const pc = Array.from(currentBoxSpecies).filter((id) => id > 0 && id <= 251);

  const pcDetails: PokemonInstance[] = [];
  const currentBoxDataOffset = offsets.currentBoxSpecies + 21; // After species list
  const currentBoxOTOffset = currentBoxDataOffset + 20 * 32;
  for (let i = 0; i < currentBoxCount; i++) {
    const offset = currentBoxDataOffset + i * 32; // Gen 2 PC struct is 32 bytes
    const speciesId = byte(u8, offset);
    if (!speciesId || speciesId > 251) continue;

    const item = byte(u8, offset + 1);
    const moves = Array.from(u8.slice(offset + 2, offset + 6)).filter((m) => m > 0);
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
    const offset = boxOffsets[i];
    if (offset === undefined) continue;
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
      const moves = Array.from(u8.slice(pOff + 2, pOff + 6)).filter((m) => m > 0);
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
    const moves = Array.from(u8.slice(daycare1Offset + 2, daycare1Offset + 6)).filter((m) => m > 0);
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
      storageLocation: 'Daycare',
    });
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

  const trainerName = decodeGen12String(u8, 0x200b);
  const trainerId = (byte(u8, 0x2009) << 8) | byte(u8, 0x200a);

  const mapBankOffset = isCrystal ? 0x25c6 : 0x25b3;
  const mapIdOffset = isCrystal ? 0x25c7 : 0x25b4;
  const mapGroup = byte(u8, mapBankOffset);
  const currentMapId = byte(u8, mapIdOffset);

  let currentMapName = 'Unknown Map';
  const gen2Maps = gen2MapLocations as Record<string, Record<string, string>>;
  const mapGroupDict = gen2Maps[mapGroup.toString()];
  const foundMap = mapGroupDict?.[currentMapId.toString()];
  if (foundMap) {
    currentMapName = foundMap;
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
