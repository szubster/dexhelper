import type { GameVersion, PokemonInstance } from '../../parsers/common';

const GEN3_POKEMON_PV_OFFSET = 0;
const GEN3_POKEMON_OT_ID_OFFSET = 4;
const GEN3_POKEMON_DATA_OFFSET = 32;
const SUBSTRUCTURE_SIZE = 12;

const NUM_SUBSTRUCTURE_PERMUTATIONS = 24;
const SUBSTRUCTURE_ORDER = [
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

/**
 * Extracts and decrypts the 100-byte Pokémon data structure for Gen 3.
 *
 * **Architecture Note: Encryption & Substructures**
 * Individual Pokémon data structures contain a 48-byte encrypted substructure block
 * to prevent casual modification.
 * 1. **Decryption Key:** Derived by XORing the Pokémon's Personality Value (PV)
 *    with its Original Trainer (OT) ID.
 * 2. **Block Permutation:** The physical order of the GAEM blocks on disk is scrambled
 *    into one of 24 possible permutations, determined by `PV % 24`.
 * 3. **Decryption:** The blocks are read in 32-bit chunks, XORed against the key,
 *    and mapped into a standardized GAEM contiguous block in memory.
 *
 * @param view - The DataView of the raw save buffer.
 * @param offset - The absolute memory offset where the 100-byte Pokémon struct begins.
 * @returns An object containing the decrypted GAEM buffer, PV, OTID, and key, or null if the slot is empty.
 * @throws Error if the block permutation is invalid or the data is heavily corrupted.
 *
 * @example
 * const monData = extractGen3PokemonData(view, offset);
 * if (monData) {
 *   const speciesId = monData.decryptedData.getUint16(0, true);
 * }
 */
function extractGen3PokemonData(view: DataView, offset: number) {
  const pv = view.getUint32(offset + GEN3_POKEMON_PV_OFFSET, true);
  const otId = view.getUint32(offset + GEN3_POKEMON_OT_ID_OFFSET, true);

  if (pv === 0 && otId === 0) return null;

  const decryptionKey = pv ^ otId;
  const permutationIndex = pv % NUM_SUBSTRUCTURE_PERMUTATIONS;
  const permutation = SUBSTRUCTURE_ORDER[permutationIndex];
  if (!permutation) {
    throw new Error('The save file is corrupted or incomplete.');
  }

  const buffer = new ArrayBuffer(48);
  const decryptedData = new DataView(buffer);

  for (let i = 0; i < 4; i++) {
    const char = permutation[i] as string;
    const canonicalIndex = 'GAEM'.indexOf(char);
    if (canonicalIndex === -1) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    const encryptedOffset = offset + GEN3_POKEMON_DATA_OFFSET + i * SUBSTRUCTURE_SIZE;
    const decryptedOffset = canonicalIndex * SUBSTRUCTURE_SIZE;

    // Read 3 32-bit integers, decrypt, and write
    for (let j = 0; j < 3; j++) {
      const encryptedValue = view.getUint32(encryptedOffset + j * 4, true);
      const decryptedValue = (encryptedValue ^ decryptionKey) >>> 0;
      decryptedData.setUint32(decryptedOffset + j * 4, decryptedValue, true);
    }
  }

  return { pv, otId, decryptionKey, decryptedData };
}

export const DAYCARE_OFFSET_RS = 0x2f9c;
export const DAYCARE_OFFSET_EMERALD = 0x3030;
export const DAYCARE_OFFSET_FRLG = 0x2f80;

export const DAYCARE_MON_SIZE_RS = 80;
export const DAYCARE_MON_SIZE_EMERALD = 140;
export const DAYCARE_MON_SIZE_FRLG = 140;

/**
 * Parses the Daycare data structure from Gen 3 save files.
 *
 * **Architecture Note:**
 * The Daycare data layout differs significantly between Gen 3 sub-versions due to expansions in
 * mail handling and Pokémon data structures.
 * - **Ruby/Sapphire**: The Daycare offset is `0x2f9c`. Pokémon data is 80 bytes long. The step counter
 *   and pending egg personality value are located in a miscellaneous struct after the mail data.
 * - **Emerald**: The Daycare offset is `0x3030`. Pokémon data is 140 bytes long. The egg personality
 *   value is a 32-bit integer immediately following the two Pokémon structures.
 * - **FireRed/LeafGreen**: The Daycare offset is `0x2f80`. Pokémon data is 140 bytes long. The egg
 *   personality value is a 16-bit integer following the two Pokémon structures.
 *
 * @param view - The raw binary data of the .sav file.
 * @param saveBlock1Offset - The absolute memory offset of the latest SaveBlock1 sector (Section 1).
 * @param gameVersion - The parsed Gen 3 game version ('ruby', 'sapphire', 'emerald', 'firered', 'leafgreen').
 * @returns An object containing the daycare Pokémon, the pending egg's personality value (if any), and the step counter.
 * @throws Error if the save file is corrupted or incomplete.
 *
 * @example
 * const daycareData = parseGen3Daycare(view, section1Offset, 'emerald');
 * if (daycareData.offspringPersonality) {
 *   console.log('An egg is waiting!');
 * }
 */
export function parseGen3Daycare(
  view: DataView,
  saveBlock1Offset: number,
  gameVersion: GameVersion,
): import('../../parsers/common').Gen3DaycareData {
  try {
    let daycareOffset = saveBlock1Offset;
    let monSize = 0;

    if (gameVersion === 'emerald') {
      daycareOffset += DAYCARE_OFFSET_EMERALD;
      monSize = DAYCARE_MON_SIZE_EMERALD;
    } else if (gameVersion === 'firered' || gameVersion === 'leafgreen') {
      daycareOffset += DAYCARE_OFFSET_FRLG;
      monSize = DAYCARE_MON_SIZE_FRLG;
    } else {
      daycareOffset += DAYCARE_OFFSET_RS;
      monSize = DAYCARE_MON_SIZE_RS;
    }

    const mons: PokemonInstance[] = [];

    // Parse Mon 1
    const mon1Data = extractGen3PokemonData(view, daycareOffset);
    if (mon1Data?.decryptedData) {
      // Basic validation if it is an actual Pokemon
      const speciesId = mon1Data.decryptedData.getUint16(0, true);
      if (speciesId !== 0) {
        mons.push({
          speciesId,
          level: 0,
          isShiny: false,
          moves: [],
          ivs: { hp: 0, atk: 0, def: 0, spd: 0, spatk: 0, spdef: 0 },
          storageLocation: 'daycare',
          hash: '',
        });
      }
    }

    // Parse Mon 2
    const mon2Data = extractGen3PokemonData(view, daycareOffset + monSize);
    if (mon2Data?.decryptedData) {
      const speciesId = mon2Data.decryptedData.getUint16(0, true);
      if (speciesId !== 0) {
        mons.push({
          speciesId,
          level: 0,
          isShiny: false,
          moves: [],
          ivs: { hp: 0, atk: 0, def: 0, spd: 0, spatk: 0, spdef: 0 },
          storageLocation: 'daycare',
          hash: '',
        });
      }
    }

    let offspringPersonality: number | undefined;
    let stepCounter: number | undefined;

    if (gameVersion === 'emerald') {
      offspringPersonality = view.getUint32(daycareOffset + monSize * 2, true);
      stepCounter = view.getUint8(daycareOffset + monSize * 2 + 4);
    } else if (gameVersion === 'firered' || gameVersion === 'leafgreen') {
      offspringPersonality = view.getUint16(daycareOffset + monSize * 2, true);
      stepCounter = view.getUint8(daycareOffset + monSize * 2 + 2);
    } else {
      // In RS, the step counters and pending egg personality are in the misc struct.
      // It starts after 2 mons (160 bytes) and mail data (112 bytes)
      const miscOffset = daycareOffset + DAYCARE_MON_SIZE_RS * 2 + 112;
      offspringPersonality = view.getUint16(miscOffset + 8, true);
      stepCounter = view.getUint8(miscOffset + 10);
    }

    return { mons, offspringPersonality, stepCounter };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}
