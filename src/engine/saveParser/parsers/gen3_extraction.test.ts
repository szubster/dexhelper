import { describe, expect, it } from 'vitest';
import {
  extractGen3PokemonData,
  GEN3_POKEMON_DATA_OFFSET,
  GEN3_POKEMON_OT_ID_OFFSET,
  GEN3_POKEMON_PV_OFFSET,
  NUM_SUBSTRUCTURE_PERMUTATIONS,
  SUBSTRUCTURE_ORDER,
  SUBSTRUCTURE_SIZE,
} from './gen3';

describe('extractGen3PokemonData', () => {
  it('should return null if both PV and OTID are 0', () => {
    const buffer = new ArrayBuffer(100);
    const view = new DataView(buffer);

    // Default buffer is all 0s, so PV and OTID are 0
    const result = extractGen3PokemonData(view, 0);
    expect(result).toBeNull();
  });

  it('should extract and decrypt data into GAEM order correctly', () => {
    const buffer = new ArrayBuffer(100);
    const view = new DataView(buffer);
    const offset = 0;

    // Set PV and OTID so that they aren't 0
    const pv = 0x12345678;
    const otId = 0x87654321;
    view.setUint32(offset + GEN3_POKEMON_PV_OFFSET, pv, true);
    view.setUint32(offset + GEN3_POKEMON_OT_ID_OFFSET, otId, true);

    const decryptionKey = pv ^ otId;
    const permutationIndex = pv % NUM_SUBSTRUCTURE_PERMUTATIONS;
    const permutation = SUBSTRUCTURE_ORDER[permutationIndex];

    // We'll write specific data to the 4 substructures such that when decrypted they hold known values.
    // Let's create dummy unencrypted data for GAEM
    const dummyData = {
      G: [0x11111111, 0x22222222, 0x33333333],
      A: [0x44444444, 0x55555555, 0x66666666],
      E: [0x77777777, 0x88888888, 0x99999999],
      M: [0xaaaaaaaa, 0xbbbbbbbb, 0xcccccccc],
    };

    // Encrypt and write to buffer according to the permutation order
    for (let i = 0; i < 4; i++) {
      const char = permutation?.[i] as 'G' | 'A' | 'E' | 'M';
      const encryptedOffset = offset + GEN3_POKEMON_DATA_OFFSET + i * SUBSTRUCTURE_SIZE;
      for (let j = 0; j < 3; j++) {
        const dummyVal = dummyData[char][j];
        if (dummyVal !== undefined) {
          const encryptedVal = (dummyVal ^ decryptionKey) >>> 0;
          view.setUint32(encryptedOffset + j * 4, encryptedVal, true);
        }
      }
    }

    const result = extractGen3PokemonData(view, offset);
    expect(result).not.toBeNull();
    expect(result?.pv).toBe(pv);
    expect(result?.otId).toBe(otId);
    expect(result?.decryptionKey).toBe(decryptionKey);

    // Verify it is in GAEM order
    const decryptedData = result?.decryptedData;
    expect(decryptedData).toBeDefined();
    expect(decryptedData?.byteLength).toBe(48);

    // Check G
    expect(decryptedData?.getUint32(0, true)).toBe(dummyData.G[0]);
    expect(decryptedData?.getUint32(4, true)).toBe(dummyData.G[1]);
    expect(decryptedData?.getUint32(8, true)).toBe(dummyData.G[2]);

    // Check A
    expect(decryptedData?.getUint32(12, true)).toBe(dummyData.A[0]);
    expect(decryptedData?.getUint32(16, true)).toBe(dummyData.A[1]);
    expect(decryptedData?.getUint32(20, true)).toBe(dummyData.A[2]);

    // Check E
    expect(decryptedData?.getUint32(24, true)).toBe(dummyData.E[0]);
    expect(decryptedData?.getUint32(28, true)).toBe(dummyData.E[1]);
    expect(decryptedData?.getUint32(32, true)).toBe(dummyData.E[2]);

    // Check M
    expect(decryptedData?.getUint32(36, true)).toBe(dummyData.M[0]);
    expect(decryptedData?.getUint32(40, true)).toBe(dummyData.M[1]);
    expect(decryptedData?.getUint32(44, true)).toBe(dummyData.M[2]);
  });
});
