import { describe, expect, it } from 'vitest';
import { parseGen3EmeraldRoamer, parseGen3FRLGRoamer, parseGen3RSRoamer } from './parser';

const GEN3_ROAMER_OFFSET_RS = 0x3144;
const GEN3_ROAMER_OFFSET_EMERALD = 0x31dc;
const GEN3_ROAMER_OFFSET_FRLG = 0x30d0;

describe('Gen 3 Roamer Parsers', () => {
  describe('parseGen3RSRoamer', () => {
    it('correctly parses Ruby/Sapphire roamer with non-zero saveBlock1Offset', () => {
      const saveBlock1Offset = 100;
      const buffer = new ArrayBuffer(saveBlock1Offset + GEN3_ROAMER_OFFSET_RS + 36);
      const view = new DataView(buffer);
      const baseOffset = saveBlock1Offset + GEN3_ROAMER_OFFSET_RS;

      view.setUint32(baseOffset + 0x00, 0x12345678, true); // IVs
      view.setUint32(baseOffset + 0x04, 0x87654321, true); // PV
      view.setUint16(baseOffset + 0x08, 380, true); // Species: Latias
      view.setUint16(baseOffset + 0x0a, 120, true); // HP
      view.setUint8(baseOffset + 0x0c, 40); // Level
      view.setUint8(baseOffset + 0x0d, 0); // Status
      view.setUint8(baseOffset + 0x13, 1); // Active

      const result = parseGen3RSRoamer(view, saveBlock1Offset);

      expect(result).toEqual({
        isActive: true,
        speciesId: 380,
        level: 40,
        hp: 120,
        statusCondition: 0,
        personalityValue: 0x87654321,
        ivs: {
          hp: (0x12345678 >> 0) & 0x1f,
          atk: (0x12345678 >> 5) & 0x1f,
          def: (0x12345678 >> 10) & 0x1f,
          spd: (0x12345678 >> 15) & 0x1f,
          spAtk: (0x12345678 >> 20) & 0x1f,
          spDef: (0x12345678 >> 25) & 0x1f,
        },
      });
    });

    it('throws a corrupted file error on out-of-bounds reads', () => {
      const buffer = new ArrayBuffer(10);
      const view = new DataView(buffer);

      expect(() => parseGen3RSRoamer(view, 0)).toThrow('The save file is corrupted or incomplete.');
    });
  });

  describe('parseGen3EmeraldRoamer', () => {
    it('correctly parses Emerald roamer with non-zero saveBlock1Offset', () => {
      const saveBlock1Offset = 200;
      const buffer = new ArrayBuffer(saveBlock1Offset + GEN3_ROAMER_OFFSET_EMERALD + 36);
      const view = new DataView(buffer);
      const baseOffset = saveBlock1Offset + GEN3_ROAMER_OFFSET_EMERALD;

      view.setUint32(baseOffset + 0x00, 0x11111111, true); // IVs
      view.setUint32(baseOffset + 0x04, 0x22222222, true); // PV
      view.setUint16(baseOffset + 0x08, 381, true); // Species: Latios
      view.setUint16(baseOffset + 0x0a, 130, true); // HP
      view.setUint8(baseOffset + 0x0c, 40); // Level
      view.setUint8(baseOffset + 0x0d, 0); // Status
      view.setUint8(baseOffset + 0x13, 1); // Active

      const result = parseGen3EmeraldRoamer(view, saveBlock1Offset);

      expect(result).toEqual({
        isActive: true,
        speciesId: 381,
        level: 40,
        hp: 130,
        statusCondition: 0,
        personalityValue: 0x22222222,
        ivs: {
          hp: (0x11111111 >> 0) & 0x1f,
          atk: (0x11111111 >> 5) & 0x1f,
          def: (0x11111111 >> 10) & 0x1f,
          spd: (0x11111111 >> 15) & 0x1f,
          spAtk: (0x11111111 >> 20) & 0x1f,
          spDef: (0x11111111 >> 25) & 0x1f,
        },
      });
    });

    it('throws a corrupted file error on out-of-bounds reads', () => {
      const buffer = new ArrayBuffer(10);
      const view = new DataView(buffer);

      expect(() => parseGen3EmeraldRoamer(view, 0)).toThrow('The save file is corrupted or incomplete.');
    });
  });

  describe('parseGen3FRLGRoamer', () => {
    it('correctly parses FireRed/LeafGreen roamer with non-zero saveBlock1Offset', () => {
      const saveBlock1Offset = 300;
      const buffer = new ArrayBuffer(saveBlock1Offset + GEN3_ROAMER_OFFSET_FRLG + 36);
      const view = new DataView(buffer);
      const baseOffset = saveBlock1Offset + GEN3_ROAMER_OFFSET_FRLG;

      view.setUint32(baseOffset + 0x00, 0x33333333, true); // IVs
      view.setUint32(baseOffset + 0x04, 0x44444444, true); // PV
      view.setUint16(baseOffset + 0x08, 244, true); // Species: Entei
      view.setUint16(baseOffset + 0x0a, 140, true); // HP
      view.setUint8(baseOffset + 0x0c, 50); // Level
      view.setUint8(baseOffset + 0x0d, 0); // Status
      view.setUint8(baseOffset + 0x13, 1); // Active

      const result = parseGen3FRLGRoamer(view, saveBlock1Offset);

      expect(result).toEqual({
        isActive: true,
        speciesId: 244,
        level: 50,
        hp: 140,
        statusCondition: 0,
        personalityValue: 0x44444444,
        ivs: {
          hp: (0x33333333 >> 0) & 0x1f,
          atk: (0x33333333 >> 5) & 0x1f,
          def: (0x33333333 >> 10) & 0x1f,
          spd: (0x33333333 >> 15) & 0x1f,
          spAtk: (0x33333333 >> 20) & 0x1f,
          spDef: (0x33333333 >> 25) & 0x1f,
        },
      });
    });

    it('throws a corrupted file error on out-of-bounds reads', () => {
      const buffer = new ArrayBuffer(10);
      const view = new DataView(buffer);

      expect(() => parseGen3FRLGRoamer(view, 0)).toThrow('The save file is corrupted or incomplete.');
    });
  });
});
