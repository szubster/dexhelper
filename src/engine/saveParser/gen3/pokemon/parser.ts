export const DATA_BLOCK_OFFSET = 32;
export const DATA_BLOCK_SIZE = 48;
export const SUBSTRUCTURE_SIZE = 12;

export const NUM_SUBSTRUCTURES = 4;
export const WORDS_PER_SUBSTRUCTURE = 3;

export const MAGIC_NUMBER_PV_OFFSET = 0;
export const MAGIC_NUMBER_OT_ID_OFFSET = 4;

export interface PK3 {
  pv: number;
  otId: number;
  decryptionKey: number;
  decryptedData: DataView;
}

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

export function extractGen3PK3(view: DataView, offset: number): PK3 | null {
  try {
    const pv = view.getUint32(offset + MAGIC_NUMBER_PV_OFFSET, true);
    const otId = view.getUint32(offset + MAGIC_NUMBER_OT_ID_OFFSET, true);

    if (pv === 0 && otId === 0) return null;

    const decryptionKey = pv ^ otId;
    const permutationIndex = pv % NUM_SUBSTRUCTURE_PERMUTATIONS;
    const permutation = SUBSTRUCTURE_ORDER[permutationIndex];
    if (!permutation) {
      throw new Error('The save file is corrupted or incomplete.');
    }

    const buffer = new ArrayBuffer(DATA_BLOCK_SIZE);
    const decryptedData = new DataView(buffer);

    for (let i = 0; i < NUM_SUBSTRUCTURES; i++) {
      const char = permutation[i];
      if (typeof char !== 'string') {
        throw new Error('The save file is corrupted or incomplete.');
      }
      const canonicalIndex = 'GAEM'.indexOf(char);
      if (canonicalIndex === -1) {
        throw new Error('The save file is corrupted or incomplete.');
      }
      const encryptedOffset = offset + DATA_BLOCK_OFFSET + i * SUBSTRUCTURE_SIZE;
      const decryptedOffset = canonicalIndex * SUBSTRUCTURE_SIZE;

      for (let j = 0; j < WORDS_PER_SUBSTRUCTURE; j++) {
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
