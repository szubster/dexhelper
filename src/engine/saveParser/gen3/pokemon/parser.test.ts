import { describe, expect, it } from 'vitest';
import {
  DATA_BLOCK_OFFSET,
  DATA_BLOCK_SIZE,
  extractGen3PK3,
  MAGIC_NUMBER_OT_ID_OFFSET,
  MAGIC_NUMBER_PV_OFFSET,
} from './parser';

describe('extractGen3PK3', () => {
  it('should return null if pv and otId are both 0', () => {
    const buffer = new ArrayBuffer(100);
    const view = new DataView(buffer);
    expect(extractGen3PK3(view, 0)).toBeNull();
  });

  it('should extract and decrypt pokemon data correctly', () => {
    const buffer = new ArrayBuffer(100);
    const view = new DataView(buffer);

    // Setup PV and OTID
    const pv = 0x12345678;
    const otId = 0x87654321;
    view.setUint32(MAGIC_NUMBER_PV_OFFSET, pv, true);
    view.setUint32(MAGIC_NUMBER_OT_ID_OFFSET, otId, true);

    const decryptionKey = pv ^ otId;

    // For pv=0x12345678, permutationIndex is 0x12345678 % 24 = 305419896 % 24 = 0
    // Permutation is 'GAEM'
    // This means no re-ordering.

    // Fill the buffer with encrypted data
    for (let i = 0; i < DATA_BLOCK_SIZE; i += 4) {
      // Just some dummy decrypted data
      const dummyData = 0xabcdef01 + i;
      view.setUint32(DATA_BLOCK_OFFSET + i, (dummyData ^ decryptionKey) >>> 0, true);
    }

    const pk3 = extractGen3PK3(view, 0);

    expect(pk3?.pv).toBe(pv);
    expect(pk3?.otId).toBe(otId);
    expect(pk3?.decryptionKey).toBe(decryptionKey);

    for (let i = 0; i < DATA_BLOCK_SIZE; i += 4) {
      expect(pk3?.decryptedData.getUint32(i, true)).toBe((0xabcdef01 + i) >>> 0);
    }
  });

  it('should throw "The save file is corrupted or incomplete." on RangeError', () => {
    const buffer = new ArrayBuffer(1);
    const view = new DataView(buffer);
    expect(() => extractGen3PK3(view, 0)).toThrow('The save file is corrupted or incomplete.');
  });
});
