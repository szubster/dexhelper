import gen2Landmarks from '../../data/gen2/landmarks.json';
import gen2MapLocations from '../../data/gen2/mapLocations.json';
import { GEN2_VERSION_EXCLUSIVES } from '../../exclusives/gen2Exclusives';
import type { GameVersion, PokemonInstance, SaveData } from './common';
import { checkShiny, checkShinyGene, decodeGen12String, parseDVs } from './common';

function isValidLandmark(id: string): id is keyof typeof gen2Landmarks {
  return id in gen2Landmarks;
}

function isValidMapGroup(id: string): id is keyof typeof gen2MapLocations {
  return id in gen2MapLocations;
}

function isValidMapId<T extends Record<string, string>>(id: string, dict: T): id is keyof T & string {
  return id in dict;
}

/**
 * Extracts the caught data (time of day, level, and location) from a Generation 2 Pokémon structure.
 * Caught data is only populated in Crystal version; Gold and Silver leave these bytes as 0.
 * Time and level are packed into a single byte via bitwise operations.
 *
 * @param view - The raw save file view.
 * @param offset - The memory offset of the specific Pokémon structure.
 * @returns An object containing the time, level, location ID, and location name, or undefined if missing.
 */
function parseCaughtData(view: DataView, offset: number) {
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
    const locStr = location.toString();
    locationName = isValidLandmark(locStr) ? gen2Landmarks[locStr] : undefined;
  }

  return { time, level: caughtLevel, location, locationName };
}

/**
 * Extracts details for a single Pokémon from a Generation 2 save block.
 *
 * **Memory Structure Differences:**
 * - Party Pokémon use a 48-byte structure, which includes 16 additional bytes at the end for dynamic battle stats (e.g. current HP, max HP, attack, etc.).
 * - PC/Box Pokémon use a smaller 32-byte structure, as these battle stats are recalculated upon withdrawal.
 * - Unlike Gen 1, Daycare Pokémon store their Original Trainer (OT) name immediately adjacent to their data block (at `offset + 32`),
 *   whereas Party and Box instances store OT names in entirely separate string array blocks elsewhere in memory.
 *
 * @param view - The raw save file view.
 * @param offset - The memory offset for the start of the Pokémon's data block.
 * @param isCrystal - Whether the save file is from Pokémon Crystal. Crystal uniquely utilizes bytes 29 and 30 for caught time/level/location data.
 * @param storageLocation - A string indicating where the Pokémon is stored (e.g., 'Party', 'Box 1', 'Daycare').
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
  const isShinyCarrier = checkShinyGene(dvs);
  const friendship = view.getUint8(offset + 27);
  const rawPokerus = view.getUint8(offset + 28);
  const pokerus =
    rawPokerus > 0
      ? {
          strain: rawPokerus >> 4,
          daysRemaining: rawPokerus & 0x0f,
        }
      : undefined;
  const level = view.getUint8(offset + 31);
  const currentHp = storageLocation === 'Party' ? view.getUint16(offset + 34, false) : undefined;
  const caughtData = isCrystal ? parseCaughtData(view, offset) : undefined;

  // OT names in daycare are immediately after the data block
  const otName = storageLocation === 'Daycare' ? decodeGen12String(view, offset + 32) : undefined;

  let unownForm: string | undefined;
  if (speciesId === 201) {
    const atkBits = (dvs.atk >> 1) & 0b11;
    const defBits = (dvs.def >> 1) & 0b11;
    const spdBits = (dvs.spd >> 1) & 0b11;
    const spcBits = (dvs.spc >> 1) & 0b11;
    const value = (atkBits << 6) | (defBits << 4) | (spdBits << 2) | spcBits;
    const modValue = value % 28;
    unownForm = modValue < 26 ? String.fromCharCode(65 + modValue) : 'A';
  }

  return {
    speciesId,
    currentHp,
    level,
    isShiny,
    isShinyCarrier,
    item,
    moves,
    friendship,
    pokerus,
    caughtData,
    dvs,
    otName,
    storageLocation,
    slot,
    unownForm,
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
function detectGen2GameVersion(owned: Set<number>, seen: Set<number>): GameVersion {
  // biome-ignore lint/complexity/useLiteralKeys: TypeScript requires bracket notation for index signatures
  const goldExclusives = GEN2_VERSION_EXCLUSIVES['gold'] || [];
  // biome-ignore lint/complexity/useLiteralKeys: TypeScript requires bracket notation for index signatures
  const silverExclusives = GEN2_VERSION_EXCLUSIVES['silver'] || [];

  let goldScore = 0;
  let silverScore = 0;

  for (const id of goldExclusives) {
    if (owned.has(id)) silverScore += 2;
    else if (seen.has(id)) silverScore += 1;
  }
  for (const id of silverExclusives) {
    if (owned.has(id)) goldScore += 2;
    else if (seen.has(id)) goldScore += 1;
  }

  if (goldScore > silverScore) return 'gold';
  if (silverScore > goldScore) return 'silver';

  return 'unknown';
}

/**
 * Performs a structural check to verify if the save file is a valid Generation 2 save.
 *
 * **Why check both offsets?**
 * Gen 2 memory blocks shifted significantly between Gold/Silver and Crystal. The active Party block
 * starts at `0x288A` in G/S and `0x2865` in Crystal.
 * If the main save checksum is corrupt, we fallback to parsing these exact offsets.
 * We dynamically check the `countOffset` based on the `crystal` flag, ensuring the party count
 * is valid (<= 6), correctly terminated with `0xFF`, and contains valid internal Pokémon IDs.
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

/**
 * Parses the player's seen and caught Pokédex data.
 *
 * **Bitfield Layout:**
 * The Gen 2 Pokédex status is stored as contiguous 32-byte blocks (one for `owned`, one for `seen`).
 * Since 32 bytes * 8 bits = 256 possible bits, this perfectly fits the 251 Pokémon in Generation 2.
 * The bits are 1-indexed (Bulbasaur is bit 0 of byte 0, Chikorita is bit 7 of byte 18, etc.).
 *
 * @param view - The raw save file DataView.
 * @param offsets - The dynamically resolved start offsets for the `owned` and `seen` blocks.
 * @returns An object containing Sets of the `owned` and `seen` Pokémon IDs.
 */
function parsePokedex(view: DataView, offsets: { owned: number; seen: number }) {
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

  return { owned, seen };
}

/**
 * Parses the player's active party from a Generation 2 save.
 *
 * **Memory Layout:**
 * - The party block begins with a 1-byte count of the current party size (max 6).
 * - This is immediately followed by a 7-byte array containing the species IDs of the party members (terminated by `0xFF`).
 * - Following the species array is the sequential block of 48-byte Pokémon data instances (`offset + 7`).
 *
 * @param view - The raw save file DataView.
 * @param offsets - Dynamic offsets containing the start address for `partyCount` and `partySpecies`.
 * @param isCrystal - True if the save file is Pokémon Crystal.
 * @returns An object containing the simple species ID list and the array of fully constructed `PokemonInstance`s.
 */
function parseParty(view: DataView, offsets: { partyCount: number; partySpecies: number }, isCrystal: boolean) {
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

  return { party, partyDetails };
}

/**
 * Parses all 14 PC Storage Boxes in a Generation 2 save.
 *
 * **WRAM vs SRAM Architecture:**
 * Like Gen 1, only the "currently active" box resides in the main active memory block (WRAM).
 * The remaining 13 inactive boxes are scattered across two inactive SRAM banks.
 * - **Bank 1:** Contains 7 boxes at offsets `0x4000` through `0x59D4`.
 * - **Bank 2:** Contains 7 boxes at offsets `0x6000` through `0x79D4`.
 * This function first processes the WRAM snapshot, then loops through the 14 SRAM
 * offsets to extract the remaining stored Pokémon.
 *
 * @param view - The raw save file DataView.
 * @param offsets - The dynamically resolved start offsets for the active WRAM box.
 * @param isCrystal - True if the save is Crystal.
 * @returns The simple list of species IDs (`pc`) and the detailed instances (`pcDetails`).
 */
function parsePCBoxes(
  view: DataView,
  offsets: { currentBoxNum: number; currentBoxCount: number; currentBoxSpecies: number },
  isCrystal: boolean,
) {
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

  return { pc, pcDetails };
}

/**
 * Parses the Pokémon stored in the Daycare, along with Egg availability.
 *
 * **Version Differences:**
 * The Daycare offsets shift by 36 bytes (`0x24`) between G/S and Crystal.
 * The Daycare stores up to 2 Pokémon (hence `daycare1Offset` and `daycare2Offset`),
 * separated by 57 bytes in memory. A boolean flag immediately before `daycare1Offset`
 * indicates if an Egg is waiting to be picked up.
 *
 * @param view - The raw save file DataView.
 * @param isCrystal - True if the save is Crystal.
 * @returns The Daycare Pokémon instances and a boolean indicating if an egg is ready.
 */
function parseDaycare(view: DataView, isCrystal: boolean) {
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
      }
    }
  }

  const daycareHasEgg = (view.getUint8(daycareEggOffset) & 0x01) !== 0;

  return { daycare, daycareHasEgg };
}

/**
 * Parses the player's Backpack inventory across all 4 pockets.
 *
 * **Structure Types:**
 * - **TM/HM Pocket:** This is a fixed-length array of 57 bytes (1 for each TM 01-50 + 7 HMs).
 *   The offset index directly corresponds to the TM number; the value is the quantity.
 * - **Items, Key Items, Balls:** These are dynamic, length-prefixed lists.
 *   The first byte specifies the total number of items in the pocket.
 *   The subsequent bytes alternate between Item ID and Quantity.
 *
 * @param view - The raw save file DataView.
 * @param isCrystal - True if the save is Crystal (shifts all pocket offsets).
 * @returns A unified array of item IDs and quantities across all pockets.
 */
function parseInventory(view: DataView, isCrystal: boolean) {
  const inventory: { id: number; quantity: number }[] = [];

  const tmPocket = isCrystal ? 0x23c8 : 0x23e7;
  const itemsPocket = isCrystal ? 0x2402 : 0x2420;
  const keyItemsPocket = isCrystal ? 0x242c : 0x244a;
  const ballsPocket = isCrystal ? 0x2447 : 0x2465;

  // TM/HMs
  for (let i = 0; i < 57; i++) {
    const qty = view.getUint8(tmPocket + i);
    if (qty > 0) {
      const itemId = 191 + i;
      inventory.push({ id: itemId, quantity: qty });
    }
  }

  // Items
  const itemsCount = view.getUint8(itemsPocket);
  if (itemsCount > 0 && itemsCount <= 20) {
    for (let i = 0; i < itemsCount; i++) {
      const offset = itemsPocket + 1 + i * 2;
      const id = view.getUint8(offset);
      const quantity = view.getUint8(offset + 1);
      inventory.push({ id, quantity });
    }
  }

  // Key Items
  const keyItemsCount = view.getUint8(keyItemsPocket);
  if (keyItemsCount > 0 && keyItemsCount <= 26) {
    for (let i = 0; i < keyItemsCount; i++) {
      const offset = keyItemsPocket + 1 + i;
      const id = view.getUint8(offset);
      inventory.push({ id, quantity: 1 });
    }
  }

  // Balls
  const ballsCount = view.getUint8(ballsPocket);
  if (ballsCount > 0 && ballsCount <= 12) {
    for (let i = 0; i < ballsCount; i++) {
      const offset = ballsPocket + 1 + i * 2;
      const id = view.getUint8(offset);
      const quantity = view.getUint8(offset + 1);
      inventory.push({ id, quantity });
    }
  }

  return inventory;
}

/**
 * Parses the current map locations of the legendary beasts (Raikou, Entei, Suicune).
 *
 * Each roaming legendary uses a 7-byte structure containing its species ID, level,
 * and current map coordinates (map group + map ID).
 *
 * @param view - The raw save file DataView.
 * @param isCrystal - True if the save is Crystal.
 * @returns An array detailing each roaming beast's location.
 */
function parseRoamingLegendaries(view: DataView, isCrystal: boolean) {
  const roamingLegendaries: { speciesId: number; level: number; mapGroup: number; mapId: number }[] = [];
  const roamingOffset = isCrystal ? 0x28b6 : 0x28da;

  for (let i = 0; i < 3; i++) {
    const structOffset = roamingOffset + i * 7;
    const speciesId = view.getUint8(structOffset);
    if (speciesId === 243 || speciesId === 244 || speciesId === 245) {
      roamingLegendaries.push({
        speciesId,
        level: view.getUint8(structOffset + 1),
        mapGroup: view.getUint8(structOffset + 2),
        mapId: view.getUint8(structOffset + 3),
      });
    }
  }

  return roamingLegendaries;
}
/**
 * Orchestrates the full extraction of a Generation 2 (Gold/Silver/Crystal) save file.
 *
 * **Extraction Flow & Memory Architecture:**
 * 1. **Version Verification:** Gen 2 memory offsets differ significantly between Gold/Silver and Crystal
 *    (e.g. Party data is at `0x288A` in G/S but shifted to `0x2865` in Crystal). It checks the party counts
 *    at both offsets to verify if it's Crystal vs Gold/Silver.
 * 2. **Offset Alignment:** Assigns the correct base memory offsets (`offsets` dictionary) based on the detected version.
 * 3. **Data Extraction:** Extracts Pokédex, Party, PC Boxes, Daycare, Inventory, and event flags (badges).
 * 4. **Badge Merging:** Merges Kanto and Johto badges.
 *
 * @param view - The raw save file DataView.
 * @param forceCrystal - An optional flag to force Crystal offset parsing.
 * @returns The fully constructed SaveData object.
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

  const { owned, seen } = parsePokedex(view, offsets);
  const { party, partyDetails } = parseParty(view, offsets, isCrystal);
  const { pc, pcDetails } = parsePCBoxes(view, offsets, isCrystal);

  const johtoBadgesOffset = isCrystal ? 0x23e5 : 0x23e4;
  const kantoBadgesOffset = isCrystal ? 0x23e6 : 0x23e5;

  const { daycare, daycareHasEgg } = parseDaycare(view, isCrystal);
  for (const p of daycare) pcDetails.push(p);

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
  const groupStr = mapGroup.toString();
  const mapIdStr = currentMapId.toString();
  const mapGroupDict = isValidMapGroup(groupStr) ? gen2MapLocations[groupStr] : undefined;
  const foundMap = mapGroupDict && isValidMapId(mapIdStr, mapGroupDict) ? mapGroupDict[mapIdStr] : undefined;
  if (foundMap) {
    currentMapName = foundMap;
  }

  const inventory = parseInventory(view, isCrystal);

  const pcItems: { id: number; quantity: number }[] = [];
  const pcItemsPocket = isCrystal ? 0x2460 : 0x247e;
  const pcItemsCount = view.getUint8(pcItemsPocket);
  if (pcItemsCount > 0 && pcItemsCount <= 50) {
    for (let i = 0; i < pcItemsCount; i++) {
      const offset = pcItemsPocket + 1 + i * 2;
      const id = view.getUint8(offset);
      const quantity = view.getUint8(offset + 1);
      pcItems.push({ id, quantity });
    }
  }

  const hallOfFameOffset = johtoBadgesOffset + 0xa8;
  const hallOfFameCount = view.getUint8(hallOfFameOffset);

  const roamingLegendaries = parseRoamingLegendaries(view, isCrystal);

  const eventFlagsOffset = isCrystal ? 0x2600 : 0x2624;
  const eventFlags = new Uint8Array(view.buffer, view.byteOffset + eventFlagsOffset, 0x100);
  const hiddenItemFlags = eventFlags;

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
    pcItems,
    daycare,
    daycareHasEgg,
    currentBoxCount: 0,
    hallOfFameCount,
    roamingLegendaries,
    eventFlags,
    hiddenItemFlags,
  };
}
