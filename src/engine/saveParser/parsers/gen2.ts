import gen2Landmarks from '../../data/gen2/landmarks.json';
import gen2MapLocations from '../../data/gen2/mapLocations.json';
import type { GameVersion, PokemonInstance, SaveData } from './common';
import { checkShiny, decodeGen12String, parseDVs } from './common';

/**
 * Extracts the caught data (time of day, level, and location) from a Generation 2 Pokémon structure.
 * Caught data is only populated in Crystal version; Gold and Silver leave these bytes as 0.
 * Time and level are packed into a single byte via bitwise operations.
 *
 * @param view - The raw save file view.
 * @param offset - The memory offset of the specific Pokémon structure.
 * @returns An object containing the time, level, location ID, and location name, or undefined if missing.
 */
export function parseCaughtData(view: DataView, offset: number) {
  const caughtByte1 = view.getUint8(offset + 29);
  const caughtByte2 = view.getUint8(offset + 30);

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

/**
 * Extracts details for a single Pokémon from a Generation 2 save block.
 *
 * @param view - The raw save file view.
 * @param offset - The memory offset for the start of the Pokémon's 32-byte data block.
 * @param isCrystal - Whether the save file is from Pokémon Crystal (determines if caught data exists).
 * @param storageLocation - A string indicating where the Pokémon is stored (e.g., 'Party', 'Box 1').
 * @param slot - The 1-indexed slot the Pokémon occupies in its storage container.
 * @returns A fully constructed PokemonInstance object, or undefined if the species ID is invalid.
 */
function parseGen2PokemonInstance(
  view: DataView,
  offset: number,
  isCrystal: boolean,
  storageLocation: string,
  slot?: number,
): PokemonInstance | undefined {
  const speciesId = view.getUint8(offset);
  if (!speciesId || (speciesId > 251 && speciesId !== 253)) return undefined;

  const item = view.getUint8(offset + 1);
  const moves: number[] = [];
  for (let i = 0; i < 4; i++) {
    const m = view.getUint8(offset + 2 + i);
    if (m > 0) moves.push(m);
  }
  const dvs = parseDVs(view.getUint16(offset + 21, false));
  const isShiny = checkShiny(dvs);
  const friendship = view.getUint8(offset + 27);
  const pokerus = view.getUint8(offset + 28);
  const level = view.getUint8(offset + 31);
  const caughtData = isCrystal ? parseCaughtData(view, offset) : undefined;

  // OT names in daycare are immediately after the data block
  const otName = storageLocation === 'Daycare' ? decodeGen12String(view, offset + 32) : undefined;

  return {
    speciesId,
    level,
    isShiny,
    item,
    moves,
    friendship,
    pokerus,
    caughtData,
    otName,
    storageLocation,
    slot,
  };
}

/**
 * Attempts to heuristically determine whether a Generation 2 save is Gold or Silver.
 * This is done by checking the player's Pokédex (owned and seen) against known
 * version-exclusive Pokémon.
 *
 * @param owned - A set of Pokémon Pokédex IDs the player has caught.
 * @param seen - A set of Pokémon Pokédex IDs the player has seen.
 * @returns 'gold', 'silver', or 'unknown'.
 */
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

/**
 * Performs a structural check to verify if the save file is a valid Generation 2 save.
 * It dynamically checks the party offset based on the `crystal` flag, ensuring the party count
 * is valid (<= 6), correctly terminated with 0xFF, and contains valid internal Pokémon IDs.
 *
 * @param view - The raw save file view.
 * @param crystal - Whether to test offsets specific to Pokémon Crystal.
 * @returns True if the structure looks like a valid Gen 2 save for the specified game type.
 */
export function isGen2Save(view: DataView, crystal: boolean): boolean {
  const countOffset = crystal ? 0x2865 : 0x288a;
  const speciesOffset = crystal ? 0x2866 : 0x288b;
  const partyCount = view.getUint8(countOffset);
  if (partyCount > 6) return false;
  if (view.getUint8(speciesOffset + partyCount) !== 0xff) return false;
  for (let i = 0; i < partyCount; i++) {
    const id = view.getUint8(speciesOffset + i);
    if (id === 0 || id > 251) return false;
  }
  return true;
}

/**
 * Extracts all relevant game data (party, PC boxes, inventory, Pokédex, etc.) from a Gen 2 save.
 *
 * Unlike Gen 1 where offsets are mostly static (with minor shifts in Yellow), Gen 2 memory offsets
 * differ significantly between Gold/Silver and Crystal due to engine additions (like the Battle Tower)
 * shifting data blocks down in memory.
 *
 * This function dynamically determines the correct memory map by probing both potential party offset
 * locations (0x288a for GS, 0x2865 for Crystal). Since party sizes are strictly bounded between 1-6,
 * reading a valid count at one offset and an invalid value at the other reliably identifies the version.
 *
 * @param view - The raw save file DataView.
 * @param forceCrystal - An optional boolean flag to override dynamic detection and force the parser to use Crystal memory offsets. Useful for uninitialized early-game saves.
 * @returns The fully parsed and structured SaveData object.
 */
export function parseGen2(view: DataView, forceCrystal = false): SaveData {
  let isCrystal = forceCrystal;
  if (!isCrystal) {
    const gsPartyCount = view.getUint8(0x288a);
    const cPartyCount = view.getUint8(0x2865);
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

  const owned = new Set<number>();
  const seen = new Set<number>();

  for (let dexId = 1; dexId <= 251; dexId++) {
    const byteIdx = Math.floor((dexId - 1) / 8);
    const bitIdx = (dexId - 1) % 8;

    const oByte = view.getUint8(offsets.owned + byteIdx);
    const sByte = view.getUint8(offsets.seen + byteIdx);

    if ((oByte & (1 << bitIdx)) !== 0) {
      owned.add(dexId);
    }
    if ((sByte & (1 << bitIdx)) !== 0) {
      seen.add(dexId);
    }
  }

  const partyCount = view.getUint8(offsets.partyCount);
  const party: number[] = [];
  for (let i = 0; i < partyCount; i++) {
    const id = view.getUint8(offsets.partySpecies + i);
    if (id > 0 && id <= 251) party.push(id);
  }

  const partyDetails: PokemonInstance[] = [];
  const partyDataOffset = offsets.partySpecies + 7; // After species list
  for (let i = 0; i < partyCount; i++) {
    const offset = partyDataOffset + i * 48;
    const p = parseGen2PokemonInstance(view, offset, isCrystal, 'Party', i + 1);
    if (p) {
      partyDetails.push(p);
    }
  }

  const currentBoxNum = view.getUint8(offsets.currentBoxNum) & 0x0f;
  const currentBoxCount = view.getUint8(offsets.currentBoxCount);
  const pc: number[] = [];
  for (let i = 0; i < currentBoxCount; i++) {
    const id = view.getUint8(offsets.currentBoxSpecies + i);
    if (id > 0 && id <= 251) pc.push(id);
  }

  const pcDetails: PokemonInstance[] = [];
  const currentBoxDataOffset = offsets.currentBoxSpecies + 21; // After species list
  for (let i = 0; i < currentBoxCount; i++) {
    const offset = currentBoxDataOffset + i * 32;
    const p = parseGen2PokemonInstance(view, offset, isCrystal, `Box ${currentBoxNum + 1}`, i + 1);
    if (p) {
      pcDetails.push(p);
    }
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

  for (const [i, offset] of boxOffsets.entries()) {
    if (i === currentBoxNum) continue;
    const count = view.getUint8(offset);
    if (count > 20) continue;
    for (let j = 0; j < count; j++) {
      const id = view.getUint8(offset + 1 + j);
      if (id > 0 && id <= 251) pc.push(id);
    }

    const boxDataOffset = offset + 22;
    for (let j = 0; j < count; j++) {
      const pOff = boxDataOffset + j * 32;
      const p = parseGen2PokemonInstance(view, pOff, isCrystal, `Box ${i + 1}`, j + 1);
      if (p) {
        pcDetails.push(p);
      }
    }
  }

  const johtoBadgesOffset = isCrystal ? 0x23e5 : 0x23e4;
  const kantoBadgesOffset = isCrystal ? 0x23e6 : 0x23e5;

  // Daycare Gen 2
  const daycare1Offset = isCrystal ? 0x282c : 0x2850;
  const daycare2Offset = daycare1Offset - 57;
  const daycareEggOffset = daycare1Offset - 1;

  const daycare: PokemonInstance[] = [];

  for (const offset of [daycare1Offset, daycare2Offset]) {
    const speciesId = view.getUint8(offset);
    if (speciesId !== 0 && speciesId !== 0xff) {
      const p = parseGen2PokemonInstance(view, offset, isCrystal, 'Daycare');
      if (p) {
        daycare.push(p);
        pcDetails.push(p);
      }
    }
  }

  const daycareHasEgg = (view.getUint8(daycareEggOffset) & 0x01) !== 0;

  let badges = 0;
  const jBadges = view.getUint8(johtoBadgesOffset);
  const kBadges = view.getUint8(kantoBadgesOffset);
  for (let i = 0; i < 8; i++) {
    if ((jBadges & (1 << i)) !== 0) badges++;
    if ((kBadges & (1 << i)) !== 0) badges++;
  }

  let gameVersion: GameVersion = isCrystal ? 'crystal' : detectGen2GameVersion(owned, seen);
  if (gameVersion === 'unknown' && !isCrystal) {
    gameVersion = 'gold';
  }

  const trainerName = decodeGen12String(view, 0x200b);
  const trainerId = view.getUint16(0x2009, false);

  const mapBankOffset = isCrystal ? 0x25c6 : 0x25b3;
  const mapIdOffset = isCrystal ? 0x25c7 : 0x25b4;
  const mapGroup = view.getUint8(mapBankOffset);
  const currentMapId = view.getUint8(mapIdOffset);

  let currentMapName = 'Unknown Map';
  const gen2Maps = gen2MapLocations as Record<string, Record<string, string>>;
  const mapGroupDict = gen2Maps[mapGroup.toString()];
  const foundMap = mapGroupDict?.[currentMapId.toString()];
  if (foundMap) {
    currentMapName = foundMap;
  }

  // Detailed inventory parsing for Gen 2 could be added here later
  const inventory: { id: number; quantity: number }[] = [];

  return {
    generation: 2,
    owned,
    seen,
    party,
    pc,
    partyDetails,
    pcDetails,
    gameVersion,
    badges,
    johtoBadges: jBadges,
    kantoBadges: kBadges,
    trainerName,
    trainerId,
    currentMapId,
    currentMapName,
    mapGroup,
    inventory,
    daycare,
    daycareHasEgg,
    currentBoxCount: 0,
    hallOfFameCount: 0,
  };
}
