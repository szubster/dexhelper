import { describe, expect, it } from 'vitest';
import {
  FRLG_FLAGS_OFFSET,
  parseGen3TrainerDefeatFlags,
  parseGen3TrainerRematchFlags,
  REMATCH_OFFSET_E,
  REMATCH_OFFSET_FRLG,
  REMATCH_OFFSET_RS,
  RSE_FLAGS_OFFSET_E,
  RSE_FLAGS_OFFSET_RS,
  TRAINER_FLAGS_BYTE_OFFSET,
} from './parser';

describe('Gen 3 Trainer Flags Parser', () => {
  describe('parseGen3TrainerDefeatFlags', () => {
    it('correctly parses trainer defeat flags for Emerald', () => {
      const buffer = new ArrayBuffer(5000);
      const view = new DataView(buffer);
      const saveBlock1Offset = 0;

      const startOffset = saveBlock1Offset + RSE_FLAGS_OFFSET_E + TRAINER_FLAGS_BYTE_OFFSET;

      view.setUint8(startOffset, 0b00000101); // 5
      view.setUint8(startOffset + 107, 0b10000000); // 128

      const flags = parseGen3TrainerDefeatFlags(view, saveBlock1Offset, 'emerald');

      expect(flags.length).toBe(864);
      expect(flags[0]).toBe(true);
      expect(flags[1]).toBe(false);
      expect(flags[2]).toBe(true);
      expect(flags[863]).toBe(true);
    });

    it('correctly parses trainer defeat flags for Ruby/Sapphire', () => {
      const buffer = new ArrayBuffer(5000);
      const view = new DataView(buffer);
      const saveBlock1Offset = 0;

      const startOffset = saveBlock1Offset + RSE_FLAGS_OFFSET_RS + TRAINER_FLAGS_BYTE_OFFSET;

      view.setUint8(startOffset, 0b00000001);

      const flags = parseGen3TrainerDefeatFlags(view, saveBlock1Offset, 'ruby');

      expect(flags.length).toBe(693);
      expect(flags[0]).toBe(true);
      expect(flags[1]).toBe(false);
    });

    it('correctly parses trainer defeat flags for FRLG', () => {
      const buffer = new ArrayBuffer(5000);
      const view = new DataView(buffer);
      const saveBlock1Offset = 0;

      const startOffset = saveBlock1Offset + FRLG_FLAGS_OFFSET + TRAINER_FLAGS_BYTE_OFFSET;

      view.setUint8(startOffset, 0b00000010); // Trainer 1 -> 1

      const flags = parseGen3TrainerDefeatFlags(view, saveBlock1Offset, 'firered');

      expect(flags.length).toBe(768);
      expect(flags[0]).toBe(false);
      expect(flags[1]).toBe(true);
    });

    it('throws custom error on out-of-bounds read (boundary test)', () => {
      const buffer = new ArrayBuffer(10); // Too small
      const view = new DataView(buffer);
      const saveBlock1Offset = 0;

      expect(() => {
        parseGen3TrainerDefeatFlags(view, saveBlock1Offset, 'emerald');
      }).toThrow('The save file is corrupted or incomplete.');
    });
  });

  describe('parseGen3TrainerRematchFlags', () => {
    it('correctly parses rematch flags for Emerald', () => {
      const buffer = new ArrayBuffer(3000);
      const view = new DataView(buffer);
      const saveBlock1Offset = 0;

      const startOffset = saveBlock1Offset + REMATCH_OFFSET_E;
      view.setUint8(startOffset, 5); // Entry 0
      view.setUint8(startOffset + 99, 12); // Entry 99

      const flags = parseGen3TrainerRematchFlags(view, saveBlock1Offset, 'emerald');

      expect(flags.length).toBe(100);
      expect(flags[0]).toBe(5);
      expect(flags[99]).toBe(12);
    });

    it('correctly parses rematch flags for RS', () => {
      const buffer = new ArrayBuffer(3000);
      const view = new DataView(buffer);
      const saveBlock1Offset = 0;

      const startOffset = saveBlock1Offset + REMATCH_OFFSET_RS;
      view.setUint8(startOffset, 3); // Entry 0

      const flags = parseGen3TrainerRematchFlags(view, saveBlock1Offset, 'sapphire');

      expect(flags.length).toBe(100);
      expect(flags[0]).toBe(3);
    });

    it('correctly parses rematch flags for FRLG', () => {
      const buffer = new ArrayBuffer(3000);
      const view = new DataView(buffer);
      const saveBlock1Offset = 0;

      const startOffset = saveBlock1Offset + REMATCH_OFFSET_FRLG;
      view.setUint8(startOffset, 8); // Entry 0

      const flags = parseGen3TrainerRematchFlags(view, saveBlock1Offset, 'leafgreen');

      expect(flags.length).toBe(100);
      expect(flags[0]).toBe(8);
    });

    it('throws custom error on out-of-bounds read', () => {
      const buffer = new ArrayBuffer(10); // Too small
      const view = new DataView(buffer);
      const saveBlock1Offset = 0;

      expect(() => {
        parseGen3TrainerRematchFlags(view, saveBlock1Offset, 'firered');
      }).toThrow('The save file is corrupted or incomplete.');
    });
  });
});
