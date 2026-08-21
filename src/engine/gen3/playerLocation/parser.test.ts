import { describe, expect, it } from 'vitest';
import { extractPlayerLocation } from './parser';

describe('extractPlayerLocation', () => {
  it('extracts basic map location correctly', () => {
    const buffer = new ArrayBuffer(0x10);
    const view = new DataView(buffer);

    // Set up warp data at offset 0x04
    view.setInt8(0x04, 0); // mapGroup 0
    view.setInt8(0x05, 9); // mapNum 9 (Littleroot Town)
    view.setInt8(0x06, 0); // warpId 0
    view.setInt16(0x08, 12, true); // x 12
    view.setInt16(0x0a, 15, true); // y 15

    const location = extractPlayerLocation(view, 0);

    expect(location).toEqual({
      mapGroup: 0,
      mapNum: 9,
      mapId: 9, // (0 << 8) | 9
      warpId: 0,
      x: 12,
      y: 15,
      nearestTrainer: { name: 'Rival 1', type: 'Mixed', levelCap: 5 },
    });
  });

  it('maps indoor map to parent map correctly', () => {
    const buffer = new ArrayBuffer(0x10);
    const view = new DataView(buffer);

    // Set up warp data at offset 0x04
    view.setInt8(0x04, 1); // mapGroup 1
    view.setInt8(0x05, 0); // mapNum 0
    view.setInt8(0x06, 2); // warpId 2
    view.setInt16(0x08, 5, true); // x 5
    view.setInt16(0x0a, 8, true); // y 8

    const location = extractPlayerLocation(view, 0);

    expect(location).toEqual({
      mapGroup: 1,
      mapNum: 0,
      mapId: 9, // 256 maps to 9 via GEN3_INDOOR_TO_PARENT_MAP
      warpId: 2,
      x: 5,
      y: 8,
      nearestTrainer: { name: 'Rival 1', type: 'Mixed', levelCap: 5 },
    });
  });

  it('handles custom section offset', () => {
    const buffer = new ArrayBuffer(0x1000);
    const view = new DataView(buffer);
    const section1Offset = 0x0f00;

    view.setInt8(section1Offset + 0x04, 2); // mapGroup 2
    view.setInt8(section1Offset + 0x05, 3); // mapNum 3
    view.setInt8(section1Offset + 0x06, 1); // warpId 1
    view.setInt16(section1Offset + 0x08, 100, true); // x 100
    view.setInt16(section1Offset + 0x0a, 200, true); // y 200

    const location = extractPlayerLocation(view, section1Offset);

    expect(location.mapGroup).toBe(2);
    expect(location.mapNum).toBe(3);
    expect(location.x).toBe(100);
    expect(location.y).toBe(200);
    expect(location.nearestTrainer).toBeNull();
  });

  it('throws RangeError if save block offset is out of bounds', () => {
    const buffer = new ArrayBuffer(0x10);
    const view = new DataView(buffer);

    expect(() => extractPlayerLocation(view, 0x1000)).toThrow('The save file is corrupted or incomplete.');
  });
});
