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
