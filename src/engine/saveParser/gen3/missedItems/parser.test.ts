import { describe, expect, it } from 'vitest';
import { FRLG_FLAGS_OFFSET, RSE_FLAGS_OFFSET_E, RSE_FLAGS_OFFSET_RS } from '../narrative/constants';
import {
  FRLG_FLAG_DEFEATED_ARTICUNO,
  FRLG_FLAG_DEFEATED_MEWTWO,
  FRLG_FLAG_DEFEATED_MOLTRES,
  FRLG_FLAG_DEFEATED_ZAPDOS,
  FRLG_FLAG_RECEIVED_MASTER_BALL,
  RSE_FLAG_DEFEATED_GROUDON,
  RSE_FLAG_DEFEATED_KYOGRE,
  RSE_FLAG_DEFEATED_RAYQUAZA,
  RSE_FLAG_RECEIVED_MASTER_BALL,
} from './constants';
import { parseGen3MissedItemsAndMilestones } from './parser';

describe('parseGen3MissedItemsAndMilestones', () => {
  const saveBlock1Offset = 0x0;

  const setFlag = (view: DataView, baseOffset: number, flagId: number) => {
    const byteOffset = baseOffset + Math.floor(flagId / 8);
    const bitIndex = flagId % 8;
    const currentByte = view.getUint8(byteOffset);
    view.setUint8(byteOffset, currentByte | (1 << bitIndex));
  };

  it('should return empty results for unknown game version', () => {
    const buffer = new ArrayBuffer(0x2000);
    const view = new DataView(buffer);

    const result = parseGen3MissedItemsAndMilestones(
      view,
      saveBlock1Offset,
      'unknown' as import('../../parsers/common').GameVersion,
    );

    expect(result).toEqual({ missedMasterBall: false, missedLegendaries: [] });
  });

  describe('Emerald', () => {
    it('should correctly identify all missed legendaries and master ball', () => {
      const buffer = new ArrayBuffer(0x2000);
      const view = new DataView(buffer);

      // All flags are unset, so everything is missed
      const result = parseGen3MissedItemsAndMilestones(view, saveBlock1Offset, 'emerald');

      expect(result.missedMasterBall).toBe(true);
      expect(result.missedLegendaries).toContain('Groudon');
      expect(result.missedLegendaries).toContain('Kyogre');
      expect(result.missedLegendaries).toContain('Rayquaza');
    });

    it('should correctly identify when nothing is missed', () => {
      const buffer = new ArrayBuffer(0x2000);
      const view = new DataView(buffer);

      setFlag(view, RSE_FLAGS_OFFSET_E, RSE_FLAG_RECEIVED_MASTER_BALL);
      setFlag(view, RSE_FLAGS_OFFSET_E, RSE_FLAG_DEFEATED_GROUDON);
      setFlag(view, RSE_FLAGS_OFFSET_E, RSE_FLAG_DEFEATED_KYOGRE);
      setFlag(view, RSE_FLAGS_OFFSET_E, RSE_FLAG_DEFEATED_RAYQUAZA);

      const result = parseGen3MissedItemsAndMilestones(view, saveBlock1Offset, 'emerald');

      expect(result.missedMasterBall).toBe(false);
      expect(result.missedLegendaries).toEqual([]);
    });
  });

  describe('Ruby', () => {
    it('should correctly identify all missed legendaries and master ball', () => {
      const buffer = new ArrayBuffer(0x2000);
      const view = new DataView(buffer);

      const result = parseGen3MissedItemsAndMilestones(view, saveBlock1Offset, 'ruby');

      expect(result.missedMasterBall).toBe(true);
      expect(result.missedLegendaries).toContain('Groudon');
      expect(result.missedLegendaries).not.toContain('Kyogre');
      expect(result.missedLegendaries).not.toContain('Rayquaza');
    });

    it('should correctly identify when nothing is missed', () => {
      const buffer = new ArrayBuffer(0x2000);
      const view = new DataView(buffer);

      setFlag(view, RSE_FLAGS_OFFSET_RS, RSE_FLAG_RECEIVED_MASTER_BALL);
      setFlag(view, RSE_FLAGS_OFFSET_RS, RSE_FLAG_DEFEATED_GROUDON);

      const result = parseGen3MissedItemsAndMilestones(view, saveBlock1Offset, 'ruby');

      expect(result.missedMasterBall).toBe(false);
      expect(result.missedLegendaries).toEqual([]);
    });
  });

  describe('Sapphire', () => {
    it('should correctly identify all missed legendaries and master ball', () => {
      const buffer = new ArrayBuffer(0x2000);
      const view = new DataView(buffer);

      const result = parseGen3MissedItemsAndMilestones(view, saveBlock1Offset, 'sapphire');

      expect(result.missedMasterBall).toBe(true);
      expect(result.missedLegendaries).not.toContain('Groudon');
      expect(result.missedLegendaries).toContain('Kyogre');
      expect(result.missedLegendaries).not.toContain('Rayquaza');
    });

    it('should correctly identify when nothing is missed', () => {
      const buffer = new ArrayBuffer(0x2000);
      const view = new DataView(buffer);

      setFlag(view, RSE_FLAGS_OFFSET_RS, RSE_FLAG_RECEIVED_MASTER_BALL);
      setFlag(view, RSE_FLAGS_OFFSET_RS, RSE_FLAG_DEFEATED_KYOGRE);

      const result = parseGen3MissedItemsAndMilestones(view, saveBlock1Offset, 'sapphire');

      expect(result.missedMasterBall).toBe(false);
      expect(result.missedLegendaries).toEqual([]);
    });
  });

  describe('FireRed / LeafGreen', () => {
    it('should correctly identify all missed legendaries and master ball', () => {
      const buffer = new ArrayBuffer(0x2000);
      const view = new DataView(buffer);

      const result = parseGen3MissedItemsAndMilestones(view, saveBlock1Offset, 'firered');

      expect(result.missedMasterBall).toBe(true);
      expect(result.missedLegendaries).toContain('Mewtwo');
      expect(result.missedLegendaries).toContain('Articuno');
      expect(result.missedLegendaries).toContain('Zapdos');
      expect(result.missedLegendaries).toContain('Moltres');
    });

    it('should correctly identify when nothing is missed', () => {
      const buffer = new ArrayBuffer(0x2000);
      const view = new DataView(buffer);

      setFlag(view, FRLG_FLAGS_OFFSET, FRLG_FLAG_RECEIVED_MASTER_BALL);
      setFlag(view, FRLG_FLAGS_OFFSET, FRLG_FLAG_DEFEATED_MEWTWO);
      setFlag(view, FRLG_FLAGS_OFFSET, FRLG_FLAG_DEFEATED_ARTICUNO);
      setFlag(view, FRLG_FLAGS_OFFSET, FRLG_FLAG_DEFEATED_ZAPDOS);
      setFlag(view, FRLG_FLAGS_OFFSET, FRLG_FLAG_DEFEATED_MOLTRES);

      const result = parseGen3MissedItemsAndMilestones(view, saveBlock1Offset, 'leafgreen');

      expect(result.missedMasterBall).toBe(false);
      expect(result.missedLegendaries).toEqual([]);
    });
  });

  describe('Error handling', () => {
    it('should throw "The save file is corrupted or incomplete." when RangeError occurs', () => {
      const smallBuffer = new ArrayBuffer(10);
      const smallView = new DataView(smallBuffer);

      expect(() => {
        parseGen3MissedItemsAndMilestones(smallView, saveBlock1Offset, 'emerald');
      }).toThrowError('The save file is corrupted or incomplete.');
    });

    it('should throw original error if not a RangeError', () => {
      // Create a mock DataView that throws a generic Error
      const mockBuffer = new ArrayBuffer(0x2000);
      const mockView = new DataView(mockBuffer);
      mockView.getUint8 = () => {
        throw new Error('Some generic error');
      };

      expect(() => {
        parseGen3MissedItemsAndMilestones(mockView, saveBlock1Offset, 'emerald');
      }).toThrowError('Some generic error');
    });
  });
});
