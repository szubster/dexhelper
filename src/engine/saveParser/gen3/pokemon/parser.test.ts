import { describe, expect, it } from 'vitest';
import {
  DATA_BLOCK_OFFSET,
  extractGen3PK3,
  MAGIC_NUMBER_OT_ID_OFFSET,
  MAGIC_NUMBER_PV_OFFSET,
  NUM_SUBSTRUCTURES,
  SUBSTRUCTURE_SIZE,
  WORDS_PER_SUBSTRUCTURE,
} from './parser';

describe('extractGen3PK3', () => {
  it('should return null when pv and otId are 0', () => {
    const buffer = new ArrayBuffer(100);
    const view = new DataView(buffer);
    expect(extractGen3PK3(view, 0)).toBeNull();
  });

  it('should extract and decrypt pokemon data correctly for GAEM order', () => {
    const buffer = new ArrayBuffer(100);
    const view = new DataView(buffer);
    const pv = 24; // PV % 24 = 0 -> GAEM
    const otId = 12345;
    const decryptionKey = pv ^ otId;

    view.setUint32(MAGIC_NUMBER_PV_OFFSET, pv, true);
    view.setUint32(MAGIC_NUMBER_OT_ID_OFFSET, otId, true);

    // Mock substructure data
    const mockData = new Uint32Array(NUM_SUBSTRUCTURES * WORDS_PER_SUBSTRUCTURE);
    for (let i = 0; i < mockData.length; i++) {
      mockData[i] = i + 1; // Example data
    }

    // Encrypt and write to buffer
    for (let i = 0; i < NUM_SUBSTRUCTURES; i++) {
      const encryptedOffset = DATA_BLOCK_OFFSET + i * SUBSTRUCTURE_SIZE;
      for (let j = 0; j < WORDS_PER_SUBSTRUCTURE; j++) {
        const valueIndex = i * WORDS_PER_SUBSTRUCTURE + j;
        const decryptedValue = mockData[valueIndex];
        if (decryptedValue !== undefined) {
          const encryptedValue = (decryptedValue ^ decryptionKey) >>> 0;
          view.setUint32(encryptedOffset + j * 4, encryptedValue, true);
        }
      }
    }

    const pk3 = extractGen3PK3(view, 0);

    expect(pk3).not.toBeNull();
    expect(pk3?.pv).toBe(pv);
    expect(pk3?.otId).toBe(otId);
    expect(pk3?.decryptionKey).toBe(decryptionKey);

    // Verify decrypted data
    for (let i = 0; i < NUM_SUBSTRUCTURES * WORDS_PER_SUBSTRUCTURE; i++) {
      expect(pk3?.decryptedData.getUint32(i * 4, true)).toBe(mockData[i]);
    }
  });

  it('should catch RangeError and throw specific message', () => {
    const buffer = new ArrayBuffer(5); // Make it < 8 to fail PV/OTID fetch
    const view = new DataView(buffer);

    expect(() => extractGen3PK3(view, 0)).toThrow('The save file is corrupted or incomplete.');
  });
});
