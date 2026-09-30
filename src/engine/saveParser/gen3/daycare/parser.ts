import type { GameVersion, PokemonInstance } from '../../parsers/common';

const GEN3_POKEMON_PV_OFFSET = 0;
const GEN3_POKEMON_OT_ID_OFFSET = 4;
const GEN3_POKEMON_DATA_OFFSET = 32;
const SUBSTRUCTURE_SIZE = 12;

const EMPTY_PV = 0;
const EMPTY_OT_ID = 0;
const EMPTY_SPECIES_ID = 0;
const INITIAL_LEVEL = 0;
const EMPTY_IV = 0;
const NUM_SUBSTRUCTURE_CHARS = 4;
const NUM_32BIT_INTS = 3;
const NUM_MONS = 2;
const EMERALD_STEP_COUNTER_OFFSET = 4;
const FRLG_STEP_COUNTER_OFFSET = 2;
const RS_MISC_DATA_OFFSET = 112;
const RS_OFFSPRING_PERSONALITY_OFFSET = 8;
const RS_STEP_COUNTER_OFFSET = 10;

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

function extractGen3PokemonData(view: DataView, offset: number) {
  try {
    const pv = view.getUint32(offset + GEN3_POKEMON_PV_OFFSET, true);
    const otId = view.getUint32(offset + GEN3_POKEMON_OT_ID_OFFSET, true);

    if (pv === EMPTY_PV && otId === EMPTY_OT_ID) return null;

    const decryptionKey = pv ^ otId;
    const permutationIndex = pv % NUM_SUBSTRUCTURE_PERMUTATIONS;
    const permutation = SUBSTRUCTURE_ORDER[permutationIndex];
    if (!permutation) {
      throw new Error('The save file is corrupted or incomplete.');
    }

    const buffer = new ArrayBuffer(NUM_SUBSTRUCTURE_CHARS * SUBSTRUCTURE_SIZE);
    const decryptedData = new DataView(buffer);

    for (let i = 0; i < NUM_SUBSTRUCTURE_CHARS; i++) {
      const char = permutation[i];
      if (typeof char !== 'string') {
        throw new Error('The save file is corrupted or incomplete.');
      }
      const canonicalIndex = 'GAEM'.indexOf(char);
      if (canonicalIndex === -1) {
        throw new Error('The save file is corrupted or incomplete.');
      }
      const encryptedOffset = offset + GEN3_POKEMON_DATA_OFFSET + i * SUBSTRUCTURE_SIZE;
      const decryptedOffset = canonicalIndex * SUBSTRUCTURE_SIZE;

      // Read 3 32-bit integers, decrypt, and write
      for (let j = 0; j < NUM_32BIT_INTS; j++) {
        const encryptedValue = view.getUint32(encryptedOffset + j * 4, true);
        const decryptedValue = (encryptedValue ^ decryptionKey) >>> 0;
        decryptedData.setUint32(decryptedOffset + j * 4, decryptedValue, true);
      }
    }

    return { pv, otId, decryptionKey, decryptedData };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

export const DAYCARE_OFFSET_RS = 0x2f9c;
export const DAYCARE_OFFSET_EMERALD = 0x3030;
export const DAYCARE_OFFSET_FRLG = 0x2f80;

export const DAYCARE_MON_SIZE_RS = 80;
export const DAYCARE_MON_SIZE_EMERALD = 140;
export const DAYCARE_MON_SIZE_FRLG = 140;

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
      if (speciesId !== EMPTY_SPECIES_ID) {
        mons.push({
          speciesId,
          level: INITIAL_LEVEL,
          isShiny: false,
          moves: [],
          ivs: { hp: EMPTY_IV, atk: EMPTY_IV, def: EMPTY_IV, spd: EMPTY_IV, spatk: EMPTY_IV, spdef: EMPTY_IV },
          storageLocation: 'daycare',
          hash: '',
        });
      }
    }

    // Parse Mon 2
    const mon2Data = extractGen3PokemonData(view, daycareOffset + monSize);
    if (mon2Data?.decryptedData) {
      const speciesId = mon2Data.decryptedData.getUint16(0, true);
      if (speciesId !== EMPTY_SPECIES_ID) {
        mons.push({
          speciesId,
          level: INITIAL_LEVEL,
          isShiny: false,
          moves: [],
          ivs: { hp: EMPTY_IV, atk: EMPTY_IV, def: EMPTY_IV, spd: EMPTY_IV, spatk: EMPTY_IV, spdef: EMPTY_IV },
          storageLocation: 'daycare',
          hash: '',
        });
      }
    }

    let offspringPersonality: number | undefined;
    let stepCounter: number | undefined;

    if (gameVersion === 'emerald') {
      offspringPersonality = view.getUint32(daycareOffset + monSize * NUM_MONS, true);
      stepCounter = view.getUint8(daycareOffset + monSize * NUM_MONS + EMERALD_STEP_COUNTER_OFFSET);
    } else if (gameVersion === 'firered' || gameVersion === 'leafgreen') {
      offspringPersonality = view.getUint16(daycareOffset + monSize * NUM_MONS, true);
      stepCounter = view.getUint8(daycareOffset + monSize * NUM_MONS + FRLG_STEP_COUNTER_OFFSET);
    } else {
      // In RS, the step counters and pending egg personality are in the misc struct.
      // It starts after 2 mons (160 bytes) and mail data (112 bytes)
      const miscOffset = daycareOffset + DAYCARE_MON_SIZE_RS * NUM_MONS + RS_MISC_DATA_OFFSET;
      offspringPersonality = view.getUint16(miscOffset + RS_OFFSPRING_PERSONALITY_OFFSET, true);
      stepCounter = view.getUint8(miscOffset + RS_STEP_COUNTER_OFFSET);
    }

    return { mons, offspringPersonality, stepCounter };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}
