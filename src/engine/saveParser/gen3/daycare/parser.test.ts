import { describe, expect, it } from 'vitest';
import type { GameVersion } from '../../parsers/common';
import {
  DAYCARE_MON_SIZE_EMERALD,
  DAYCARE_MON_SIZE_FRLG,
  DAYCARE_MON_SIZE_RS,
  DAYCARE_OFFSET_EMERALD,
  DAYCARE_OFFSET_FRLG,
  DAYCARE_OFFSET_RS,
  parseGen3Daycare,
} from './parser';

function writeEncryptedPokemon(view: DataView, offset: number, speciesId: number, pv = 24, otId = 0x12345678) {
  view.setUint32(offset, pv, true);
  view.setUint32(offset + 4, otId, true);

  const decryptionKey = pv ^ otId;
  const dataOffset = offset + 32;

  // Permutation for pv = 24 is 'GAEM' (pv % 24 = 0)
  // 'G' is block 0 (decrypted offset 0)
  // Word 0 of block 'G' contains speciesId in little endian
  const word0G = speciesId;
  view.setUint32(dataOffset + 0, (word0G ^ decryptionKey) >>> 0, true);
  view.setUint32(dataOffset + 4, (0 ^ decryptionKey) >>> 0, true);
  view.setUint32(dataOffset + 8, (0 ^ decryptionKey) >>> 0, true);

  // Remaining blocks 'A', 'E', 'M' (12 bytes each, 3 words each)
  for (let w = 3; w < 12; w++) {
    view.setUint32(dataOffset + w * 4, (0 ^ decryptionKey) >>> 0, true);
  }
}

describe('parseGen3Daycare', () => {
  it('should parse empty daycare data for ruby/sapphire correctly', () => {
    const buffer = new ArrayBuffer(131072);
    const view = new DataView(buffer);

    const res = parseGen3Daycare(view, 0, 'ruby');
    expect(res.mons).toEqual([]);
    expect(res.offspringPersonality).toBe(0);
    expect(res.stepCounter).toBe(0);
  });

  it('should parse valid Pokémon in daycare slot 1 and slot 2 for Emerald', () => {
    const buffer = new ArrayBuffer(131072);
    const view = new DataView(buffer);
    const saveBlock1Offset = 0;
    const daycareOffset = saveBlock1Offset + DAYCARE_OFFSET_EMERALD;

    // Write Pokemon in slot 1 (species 25 - Pikachu) and slot 2 (species 133 - Eevee)
    writeEncryptedPokemon(view, daycareOffset, 25);
    writeEncryptedPokemon(view, daycareOffset + DAYCARE_MON_SIZE_EMERALD, 133);

    // Write offspring personality & step counter for Emerald
    const metaOffset = daycareOffset + DAYCARE_MON_SIZE_EMERALD * 2;
    view.setUint32(metaOffset, 0xabcdef12, true);
    view.setUint8(metaOffset + 4, 42);

    const res = parseGen3Daycare(view, saveBlock1Offset, 'emerald');
    expect(res.mons).toHaveLength(2);
    expect(res.mons[0]?.speciesId).toBe(25);
    expect(res.mons[0]?.storageLocation).toBe('daycare');
    expect(res.mons[1]?.speciesId).toBe(133);
    expect(res.mons[1]?.storageLocation).toBe('daycare');
    expect(res.offspringPersonality).toBe(0xabcdef12);
    expect(res.stepCounter).toBe(42);
  });

  it('should parse valid Pokémon in FireRed/LeafGreen', () => {
    const buffer = new ArrayBuffer(131072);
    const view = new DataView(buffer);
    const saveBlock1Offset = 0;
    const daycareOffset = saveBlock1Offset + DAYCARE_OFFSET_FRLG;

    writeEncryptedPokemon(view, daycareOffset, 1);

    const metaOffset = daycareOffset + DAYCARE_MON_SIZE_FRLG * 2;
    view.setUint16(metaOffset, 0x1234, true);
    view.setUint8(metaOffset + 2, 100);

    const resFR = parseGen3Daycare(view, saveBlock1Offset, 'firered');
    expect(resFR.mons).toHaveLength(1);
    expect(resFR.mons[0]?.speciesId).toBe(1);
    expect(resFR.offspringPersonality).toBe(0x1234);
    expect(resFR.stepCounter).toBe(100);

    const resLG = parseGen3Daycare(view, saveBlock1Offset, 'leafgreen');
    expect(resLG.mons).toHaveLength(1);
  });

  it('should parse valid Pokémon in Ruby/Sapphire and fallback version', () => {
    const buffer = new ArrayBuffer(131072);
    const view = new DataView(buffer);
    const saveBlock1Offset = 0;
    const daycareOffset = saveBlock1Offset + DAYCARE_OFFSET_RS;

    writeEncryptedPokemon(view, daycareOffset, 252);

    const miscOffset = daycareOffset + DAYCARE_MON_SIZE_RS * 2 + 112;
    view.setUint16(miscOffset + 8, 0x5678, true);
    view.setUint8(miscOffset + 10, 50);

    const resSapphire = parseGen3Daycare(view, saveBlock1Offset, 'sapphire');
    expect(resSapphire.mons).toHaveLength(1);
    expect(resSapphire.mons[0]?.speciesId).toBe(252);
    expect(resSapphire.offspringPersonality).toBe(0x5678);
    expect(resSapphire.stepCounter).toBe(50);

    // Fallback game version
    const resFallback = parseGen3Daycare(view, saveBlock1Offset, 'red' as unknown as GameVersion);
    expect(resFallback.mons).toHaveLength(1);
    expect(resFallback.offspringPersonality).toBe(0x5678);
    expect(resFallback.stepCounter).toBe(50);
  });

  it('should ignore decrypted Pokémon if speciesId is 0 (empty slot)', () => {
    const buffer = new ArrayBuffer(131072);
    const view = new DataView(buffer);
    const daycareOffset = DAYCARE_OFFSET_EMERALD;

    // Write Pokemon with speciesId = 0
    writeEncryptedPokemon(view, daycareOffset, 0);

    const res = parseGen3Daycare(view, 0, 'emerald');
    expect(res.mons).toHaveLength(0);
  });

  it('should throw RangeError for corrupted save file', () => {
    const buffer = new ArrayBuffer(10);
    const view = new DataView(buffer);
    expect(() => parseGen3Daycare(view, 0, 'emerald')).toThrow('The save file is corrupted or incomplete.');
  });

  it('should re-throw non-RangeError exceptions from extractGen3PokemonData', () => {
    const buffer = new ArrayBuffer(131072);
    const view = new DataView(buffer);

    const originalGetUint32 = view.getUint32.bind(view);
    view.getUint32 = () => {
      throw new TypeError('Custom type error');
    };

    expect(() => parseGen3Daycare(view, 0, 'emerald')).toThrow(TypeError);
    expect(() => parseGen3Daycare(view, 0, 'emerald')).toThrow('Custom type error');

    view.getUint32 = originalGetUint32;
  });

  it('should re-throw non-RangeError exceptions from parseGen3Daycare metadata read', () => {
    const buffer = new ArrayBuffer(131072);
    const view = new DataView(buffer);

    const originalGetUint8 = view.getUint8.bind(view);
    view.getUint8 = () => {
      throw new TypeError('Metadata error');
    };

    expect(() => parseGen3Daycare(view, 0, 'emerald')).toThrow(TypeError);
    expect(() => parseGen3Daycare(view, 0, 'emerald')).toThrow('Metadata error');

    view.getUint8 = originalGetUint8;
  });
});
