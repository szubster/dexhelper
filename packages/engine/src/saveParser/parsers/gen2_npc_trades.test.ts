import { describe, expect, it, vi } from 'vitest';
import { parseGen2 } from './gen2';

describe('parseGen2 - NPC Trades', () => {
  const createBaseSave = (isCrystal: boolean) => {
    // Need full 32KB buffer to pass the parsePCBoxes loops gracefully
    const buffer = new ArrayBuffer(32768);
    const view = new DataView(buffer);

    // Mock minimal save validity requirements
    // Set active box (0-13)
    view.setUint8(0x2700, 0); // GS active box
    view.setUint8(0x2724, 0); // Crystal active box

    // Set party count and terminator
    view.setUint8(0x288a, 0); // GS party count
    view.setUint8(0x288b, 0xff); // GS terminator
    view.setUint8(0x2865, 0); // Crystal party count
    view.setUint8(0x2866, 0xff); // Crystal terminator

    // Mock PC boxes to avoid index out of bounds
    for (let i = 0; i < 14; i++) {
      const baseOffset = isCrystal ? 0x2727 : 0x2703;
      view.setUint8(baseOffset + i * 2, 0);
    }

    // Set pokedex counts
    view.setUint8(0x2a27, 0); // GS owned count
    view.setUint8(0x2a02, 0); // Crystal owned count

    // Set valid map locations to prevent lookup errors
    view.setUint8(0x2055, 1); // MAP_GROUP
    view.setUint8(0x2056, 1); // MAP_NUMBER

    return view;
  };

  it('should parse NPC trade flags correctly for Gold/Silver saves', () => {
    const view = createBaseSave(false);

    // Mock NPC trade flags byte at 0x250f
    view.setUint8(0x250f, 0b01010101); // Trade flags 0, 2, 4, 6

    const result = parseGen2(view);

    expect(result.npcTradeFlags).toEqual([
      true, // 0
      false, // 1
      true, // 2
      false, // 3
      true, // 4
      false, // 5
      true, // 6
    ]);
  });

  it('should parse NPC trade flags correctly for Crystal saves', () => {
    const view = createBaseSave(true);

    // Set crystal detection flag (usually involves checking money/johto badges or map)
    view.setUint8(0x24eb, 0b00101010); // Mock NPC trade flags byte at 0x24eb for Crystal

    const result = parseGen2(view, true);

    expect(result.npcTradeFlags).toEqual([
      false, // 0
      true, // 1
      false, // 2
      true, // 3
      false, // 4
      true, // 5
      false, // 6
    ]);
  });

  it('should throw RangeError with specific message on out of bounds read', () => {
    const buffer = new ArrayBuffer(32768);
    const view = new DataView(buffer);

    // Mock minimal save validity requirements
    // Set active box (0-13)
    view.setUint8(0x2700, 0); // GS active box
    view.setUint8(0x2724, 0); // Crystal active box

    // Set party count and terminator
    view.setUint8(0x288a, 0); // GS party count
    view.setUint8(0x288b, 0xff); // GS terminator

    // Mock PC boxes to avoid index out of bounds
    for (let i = 0; i < 14; i++) {
      view.setUint8(0x2703 + i * 2, 0);
    }

    // Set pokedex counts
    view.setUint8(0x2a27, 0); // GS owned count

    // Set valid map locations to prevent lookup errors
    view.setUint8(0x2055, 1); // MAP_GROUP
    view.setUint8(0x2056, 1); // MAP_NUMBER

    const spy = vi.spyOn(view, 'getUint8').mockImplementation((byteOffset: number) => {
      if (byteOffset === 0x250f) {
        throw new RangeError('Offset is outside the bounds of the DataView');
      }
      return DataView.prototype.getUint8.call(view, byteOffset);
    });

    try {
      expect(() => parseGen2(view)).toThrowError('The save file is corrupted or incomplete.');
    } finally {
      spy.mockRestore();
    }
  });
});
