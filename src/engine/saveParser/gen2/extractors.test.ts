import { describe, expect, it } from 'vitest';
import {
  BUG_CONTEST_CURRENT_HP_OFFSET,
  BUG_CONTEST_LEVEL_OFFSET,
  BUG_CONTEST_MAX_HP_OFFSET,
  BUG_CONTEST_SPECIES_OFFSET,
  extractBugCatchingContestData,
} from './extractors';

describe('extractBugCatchingContestData', () => {
  const createMockSave = (isCrystal: boolean, species: number, level: number, currentHp: number, maxHp: number) => {
    // 32KB buffer (standard SRAM bank size or enough to cover our offsets)
    const buffer = new ArrayBuffer(0x8000);
    const view = new DataView(buffer);

    const sPokemonDataOffset = isCrystal ? 0x2865 : 0x288a;

    view.setUint8(sPokemonDataOffset + BUG_CONTEST_SPECIES_OFFSET, species);
    view.setUint8(sPokemonDataOffset + BUG_CONTEST_LEVEL_OFFSET, level);
    view.setUint16(sPokemonDataOffset + BUG_CONTEST_CURRENT_HP_OFFSET, currentHp, false); // Big-Endian
    view.setUint16(sPokemonDataOffset + BUG_CONTEST_MAX_HP_OFFSET, maxHp, false); // Big-Endian

    return buffer;
  };

  it('should extract correct data for Pokemon Crystal', () => {
    // Scyther (123), Level 14, HP 35/40
    const buffer = createMockSave(true, 123, 14, 35, 40);
    const result = extractBugCatchingContestData(buffer, true);

    expect(result).toEqual({
      speciesId: 123,
      level: 14,
      currentHp: 35,
      maxHp: 40,
    });
  });

  it('should extract correct data when passed a DataView directly', () => {
    const buffer = createMockSave(true, 123, 14, 35, 40);
    const view = new DataView(buffer);
    const result = extractBugCatchingContestData(view, true);

    expect(result).toEqual({
      speciesId: 123,
      level: 14,
      currentHp: 35,
      maxHp: 40,
    });
  });

  it('should extract correct data for Pokemon Gold/Silver', () => {
    // Pinsir (127), Level 13, HP 10/40
    const buffer = createMockSave(false, 127, 13, 10, 40);
    const result = extractBugCatchingContestData(buffer, false);

    expect(result).toEqual({
      speciesId: 127,
      level: 13,
      currentHp: 10,
      maxHp: 40,
    });
  });

  it('should return null if species is 0 (missingno)', () => {
    const buffer = createMockSave(true, 0, 0, 0, 0);
    const result = extractBugCatchingContestData(buffer, true);
    expect(result).toBeNull();
  });

  it('should return null if species is 0xff (empty slot)', () => {
    const buffer = createMockSave(false, 0xff, 0, 0, 0);
    const result = extractBugCatchingContestData(buffer, false);
    expect(result).toBeNull();
  });

  it('should throw "The save file is corrupted or incomplete." on RangeError (out of bounds read)', () => {
    const buffer = new ArrayBuffer(0x1000); // Too small
    expect(() => extractBugCatchingContestData(buffer, true)).toThrowError('The save file is corrupted or incomplete.');
  });
});
