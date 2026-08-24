import { describe, expect, it } from 'vitest';
import { GEN3_SPINDA_SPECIES_ID, parseGen3Party, parseGen3PCBoxes } from './gen3';

describe('Gen3 Spinda Extraction', () => {
  it('extracts Spinda from PC boxes', () => {
    const buffer = new ArrayBuffer(50000);
    const view = new DataView(buffer);

    // PC_BOX_POKEMON_LIST_OFFSET = 4, GEN3_PC_POKEMON_STRUCT_SIZE = 80
    const offset = 4;

    // Create a dummy PV and OT ID
    const pv = 0;
    const otId = 123;
    view.setUint32(offset + 0, pv, true);
    view.setUint32(offset + 4, otId, true);

    const decryptionKey = pv ^ otId;

    // For pv = 0, the permutation is GAEM, so G block is first.
    // G block offset in encrypted data is offset + 32 (GEN3_POKEMON_DATA_OFFSET)
    const decryptedG0 = GEN3_SPINDA_SPECIES_ID;
    const encryptedG0 = decryptedG0 ^ decryptionKey;

    view.setUint32(offset + 32, encryptedG0, true);

    const result = parseGen3PCBoxes(view);

    expect(result.gen3Spindas).toBeDefined();
    expect(result.gen3Spindas?.length).toBe(1);
    expect(result.gen3Spindas?.[0]?.pid).toBe(0);
  });

  it('extracts Spinda from party', () => {
    const buffer = new ArrayBuffer(2000);
    const view = new DataView(buffer);

    // Set party count to 1
    view.setUint32(0 + 0x234, 1, true);

    const offset = 0 + 0x238; // GEN3_PARTY_POKEMON_LIST_OFFSET
    const pv = 24; // PV % 24 = 0 -> GAEM
    const otId = 456;
    view.setUint32(offset + 0, pv, true);
    view.setUint32(offset + 4, otId, true);

    const decryptionKey = pv ^ otId;

    const decryptedG0 = GEN3_SPINDA_SPECIES_ID;
    const encryptedG0 = decryptedG0 ^ decryptionKey;
    view.setUint32(offset + 32, encryptedG0, true);

    const result = parseGen3Party(view, 0, 'ruby');

    expect(result.gen3Spindas).toBeDefined();
    expect(result.gen3Spindas?.length).toBe(1);
    expect(result.gen3Spindas?.[0]?.pid).toBe(24);
  });
});
