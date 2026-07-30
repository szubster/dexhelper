import { describe, expect, it } from 'vitest';
import { parseGen3Pokeblocks } from './parser';

describe('parseGen3Pokeblocks', () => {
  it('returns undefined for firered and leafgreen', () => {
    const view = new DataView(new ArrayBuffer(100));
    expect(parseGen3Pokeblocks(view, 0, 'firered')).toBeUndefined();
    expect(parseGen3Pokeblocks(view, 0, 'leafgreen')).toBeUndefined();
  });

  it('parses pokeblocks correctly for emerald', () => {
    const buffer = new ArrayBuffer(0x1000);
    const view = new DataView(buffer);
    const saveBlock1Offset = 0x100;
    const emeraldOffset = 0x0848;
    const firstBlockIndex = saveBlock1Offset + emeraldOffset;

    // Set first pokeblock
    view.setUint8(firstBlockIndex + 0, 1); // color
    view.setUint8(firstBlockIndex + 1, 10); // spicy
    view.setUint8(firstBlockIndex + 2, 20); // dry
    view.setUint8(firstBlockIndex + 3, 30); // sweet
    view.setUint8(firstBlockIndex + 4, 40); // bitter
    view.setUint8(firstBlockIndex + 5, 50); // sour
    view.setUint8(firstBlockIndex + 6, 60); // feel

    // Set second pokeblock to color 0 (empty)
    const secondBlockIndex = firstBlockIndex + 8;
    view.setUint8(secondBlockIndex + 0, 0);

    const result = parseGen3Pokeblocks(view, saveBlock1Offset, 'emerald');
    expect(result).toBeDefined();
    expect(result?.length).toBe(1);
    expect(result?.[0]).toEqual({
      color: 1,
      spicy: 10,
      dry: 20,
      sweet: 30,
      bitter: 40,
      sour: 50,
      feel: 60,
    });
  });

  it('parses pokeblocks correctly for ruby/sapphire', () => {
    const buffer = new ArrayBuffer(0x1000);
    const view = new DataView(buffer);
    const saveBlock1Offset = 0x200;
    const rsOffset = 0x07f8;
    const firstBlockIndex = saveBlock1Offset + rsOffset;

    // Set first pokeblock
    view.setUint8(firstBlockIndex + 0, 2); // color
    view.setUint8(firstBlockIndex + 1, 15); // spicy
    view.setUint8(firstBlockIndex + 2, 25); // dry
    view.setUint8(firstBlockIndex + 3, 35); // sweet
    view.setUint8(firstBlockIndex + 4, 45); // bitter
    view.setUint8(firstBlockIndex + 5, 55); // sour
    view.setUint8(firstBlockIndex + 6, 65); // feel

    const result = parseGen3Pokeblocks(view, saveBlock1Offset, 'ruby');
    expect(result).toBeDefined();
    expect(result?.length).toBe(1);
    expect(result?.[0]).toEqual({
      color: 2,
      spicy: 15,
      dry: 25,
      sweet: 35,
      bitter: 45,
      sour: 55,
      feel: 65,
    });
  });

  it('throws an error if out of bounds', () => {
    const buffer = new ArrayBuffer(0x500); // Too small
    const view = new DataView(buffer);

    expect(() => parseGen3Pokeblocks(view, 0, 'emerald')).toThrowError('The save file is corrupted or incomplete.');
  });
});
