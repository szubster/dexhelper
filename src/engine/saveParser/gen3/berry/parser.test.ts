import { describe, expect, it } from 'vitest';
import { BERRY_TREES_COUNT, BERRY_TREES_OFFSET, parseGen3BerryTrees } from './parser';

describe('parseGen3BerryTrees', () => {
  it('correctly parses berry trees', () => {
    const buffer = new ArrayBuffer(0x2000);
    const view = new DataView(buffer);

    // Setup a dummy tree at index 0
    const offset = BERRY_TREES_OFFSET;
    view.setUint8(offset + 0, 15); // berryId
    view.setUint8(offset + 1, 3 | (1 << 7)); // stage 3, stopGrowth 1
    view.setUint16(offset + 2, 120, true); // minutesUntilNextStage 120
    view.setUint8(offset + 4, 2); // berryYield 2
    view.setUint8(offset + 5, 5 | (1 << 4) | (0 << 5) | (1 << 6) | (0 << 7)); // regrowth 5, watered1 1, watered3 1

    const trees = parseGen3BerryTrees(view, 0);

    expect(trees.length).toBe(BERRY_TREES_COUNT);
    expect(trees[0]).toEqual({
      berryId: 15,
      stage: 3,
      stopGrowth: 1,
      minutesUntilNextStage: 120,
      berryYield: 2,
      regrowthCount: 5,
      watered1: 1,
      watered2: 0,
      watered3: 1,
      watered4: 0,
    });

    // Check an empty tree
    expect(trees[1]).toEqual({
      berryId: 0,
      stage: 0,
      stopGrowth: 0,
      minutesUntilNextStage: 0,
      berryYield: 0,
      regrowthCount: 0,
      watered1: 0,
      watered2: 0,
      watered3: 0,
      watered4: 0,
    });
  });

  it('throws "The save file is corrupted or incomplete." on RangeError', () => {
    const buffer = new ArrayBuffer(100); // Too small
    const view = new DataView(buffer);

    expect(() => parseGen3BerryTrees(view, 0)).toThrow('The save file is corrupted or incomplete.');
  });
});
