import { describe, expect, it } from 'vitest';
import {
  BUG_CONTEST_ATK_OFFSET,
  BUG_CONTEST_CURRENT_HP_OFFSET,
  BUG_CONTEST_DEF_OFFSET,
  BUG_CONTEST_DVS_OFFSET,
  BUG_CONTEST_ITEM_OFFSET,
  BUG_CONTEST_LEVEL_OFFSET,
  BUG_CONTEST_MAX_HP_OFFSET,
  BUG_CONTEST_SPATK_OFFSET,
  BUG_CONTEST_SPD_OFFSET,
  BUG_CONTEST_SPDEF_OFFSET,
  BUG_CONTEST_SPECIES_OFFSET,
  extractBugCatchingContestData,
} from './extractors';

describe('extractBugCatchingContestData', () => {
  const createMockSave = (
    isCrystal: boolean,
    species: number,
    level: number,
    currentHp: number,
    maxHp: number,
    item: number = 0,
    dvs: number = 0,
    stats: number[] = [0, 0, 0, 0, 0],
  ) => {
    // 32KB buffer (standard SRAM bank size or enough to cover our offsets)
    const buffer = new ArrayBuffer(0x8000);
    const view = new DataView(buffer);

    const sPokemonDataOffset = isCrystal ? 0x2865 : 0x288a;

    view.setUint8(sPokemonDataOffset + BUG_CONTEST_SPECIES_OFFSET, species);
    view.setUint8(sPokemonDataOffset + BUG_CONTEST_ITEM_OFFSET, item);
    view.setUint16(sPokemonDataOffset + BUG_CONTEST_DVS_OFFSET, dvs, false);
    view.setUint8(sPokemonDataOffset + BUG_CONTEST_LEVEL_OFFSET, level);
    view.setUint16(sPokemonDataOffset + BUG_CONTEST_CURRENT_HP_OFFSET, currentHp, false); // Big-Endian
    view.setUint16(sPokemonDataOffset + BUG_CONTEST_MAX_HP_OFFSET, maxHp, false); // Big-Endian
    view.setUint16(sPokemonDataOffset + BUG_CONTEST_ATK_OFFSET, stats[0] ?? 0, false);
    view.setUint16(sPokemonDataOffset + BUG_CONTEST_DEF_OFFSET, stats[1] ?? 0, false);
    view.setUint16(sPokemonDataOffset + BUG_CONTEST_SPD_OFFSET, stats[2] ?? 0, false);
    view.setUint16(sPokemonDataOffset + BUG_CONTEST_SPATK_OFFSET, stats[3] ?? 0, false);
    view.setUint16(sPokemonDataOffset + BUG_CONTEST_SPDEF_OFFSET, stats[4] ?? 0, false);

    return buffer;
  };

  it('should extract correct data for Pokemon Crystal', () => {
    // Scyther (123), Level 14, HP 35/40, held item 0x49, DVs 0x1234, stats: 10, 20, 30, 40, 50
    const buffer = createMockSave(true, 123, 14, 35, 40, 0x49, 0x1234, [10, 20, 30, 40, 50]);
    const result = extractBugCatchingContestData(buffer, true);

    expect(result).toEqual({
      speciesId: 123,
      level: 14,
      currentHp: 35,
      maxHp: 40,
      heldItem: 0x49,
      dvs: { hp: 10, atk: 1, def: 2, spd: 3, spc: 4 },
      stats: { atk: 10, def: 20, spd: 30, spatk: 40, spdef: 50 },
    });
  });

  it('should extract correct data when passed a DataView directly', () => {
    const buffer = createMockSave(true, 123, 14, 35, 40, 0x49, 0x1234, [10, 20, 30, 40, 50]);
    const view = new DataView(buffer);
    const result = extractBugCatchingContestData(view, true);

    expect(result).toEqual({
      speciesId: 123,
      level: 14,
      currentHp: 35,
      maxHp: 40,
      heldItem: 0x49,
      dvs: { hp: 10, atk: 1, def: 2, spd: 3, spc: 4 },
      stats: { atk: 10, def: 20, spd: 30, spatk: 40, spdef: 50 },
    });
  });

  it('should extract correct data for Pokemon Gold/Silver', () => {
    // Pinsir (127), Level 13, HP 10/40, item 0, DVs 0xFFFF, stats: 99, 99, 99, 99, 99
    const buffer = createMockSave(false, 127, 13, 10, 40, 0, 0xffff, [99, 99, 99, 99, 99]);
    const result = extractBugCatchingContestData(buffer, false);

    expect(result).toEqual({
      speciesId: 127,
      level: 13,
      currentHp: 10,
      maxHp: 40,
      heldItem: 0,
      dvs: { hp: 15, atk: 15, def: 15, spd: 15, spc: 15 },
      stats: { atk: 99, def: 99, spd: 99, spatk: 99, spdef: 99 },
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
