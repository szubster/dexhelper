import { describe, expect, it } from 'vitest';
import {
  FRLG_FLAG_BADGE01_GET,
  FRLG_FLAG_BADGE02_GET,
  FRLG_FLAG_BADGE03_GET,
  FRLG_FLAG_BADGE04_GET,
  FRLG_FLAG_BADGE05_GET,
  FRLG_FLAG_BADGE06_GET,
  FRLG_FLAG_BADGE07_GET,
  FRLG_FLAG_BADGE08_GET,
  FRLG_FLAGS_OFFSET,
  RSE_FLAG_BADGE01_GET,
  RSE_FLAG_BADGE02_GET,
  RSE_FLAG_BADGE03_GET,
  RSE_FLAG_BADGE04_GET,
  RSE_FLAG_BADGE05_GET,
  RSE_FLAG_BADGE06_GET,
  RSE_FLAG_BADGE07_GET,
  RSE_FLAG_BADGE08_GET,
  RSE_FLAGS_OFFSET_E,
  RSE_FLAGS_OFFSET_RS,
} from './constants';
import { parseGen3NarrativeFlags } from './parser';

describe('parseGen3NarrativeFlags', () => {
  const saveBlock1Offset = 0x0;

  const setFlag = (view: DataView, baseOffset: number, flagId: number) => {
    const byteOffset = baseOffset + Math.floor(flagId / 8);
    const bitIndex = flagId % 8;
    const currentByte = view.getUint8(byteOffset);
    view.setUint8(byteOffset, currentByte | (1 << bitIndex));
  };

  it('should parse Emerald narrative flags correctly (3 badges)', () => {
    const mockBuffer = new ArrayBuffer(0x2000);
    const view = new DataView(mockBuffer);
    setFlag(view, RSE_FLAGS_OFFSET_E, RSE_FLAG_BADGE01_GET);
    setFlag(view, RSE_FLAGS_OFFSET_E, RSE_FLAG_BADGE02_GET);
    setFlag(view, RSE_FLAGS_OFFSET_E, RSE_FLAG_BADGE03_GET);

    const result = parseGen3NarrativeFlags(view, saveBlock1Offset, 'emerald');

    expect(result.badges).toBe(3);
    expect(result.flags.badge1).toBe(true);
    expect(result.flags.badge2).toBe(true);
    expect(result.flags.badge3).toBe(true);
    expect(result.flags.badge4).toBe(false);
    expect(result.upcomingBoss).toBe('Flannery');
  });

  it('should parse FireRed narrative flags correctly (2 non-sequential badges)', () => {
    const frlgBuffer = new ArrayBuffer(0x2000);
    const frlgView = new DataView(frlgBuffer);

    setFlag(frlgView, FRLG_FLAGS_OFFSET, FRLG_FLAG_BADGE01_GET);
    setFlag(frlgView, FRLG_FLAGS_OFFSET, FRLG_FLAG_BADGE03_GET);

    const result = parseGen3NarrativeFlags(frlgView, saveBlock1Offset, 'firered');

    expect(result.badges).toBe(2);
    expect(result.flags.badge1).toBe(true);
    expect(result.flags.badge2).toBe(false);
    expect(result.flags.badge3).toBe(true);
    expect(result.flags.badge4).toBe(false);
    expect(result.upcomingBoss).toBe('Misty'); // Because badge2 is false
  });

  it('should parse Ruby narrative flags correctly (1 badge)', () => {
    const rsBuffer = new ArrayBuffer(0x2000);
    const rsView = new DataView(rsBuffer);

    setFlag(rsView, RSE_FLAGS_OFFSET_RS, RSE_FLAG_BADGE01_GET);

    const result = parseGen3NarrativeFlags(rsView, saveBlock1Offset, 'ruby');

    expect(result.badges).toBe(1);
    expect(result.upcomingBoss).toBe('Brawly');
  });

  it('should parse LeafGreen narrative flags correctly (8 badges)', () => {
    const lgBuffer = new ArrayBuffer(0x2000);
    const lgView = new DataView(lgBuffer);

    setFlag(lgView, FRLG_FLAGS_OFFSET, FRLG_FLAG_BADGE01_GET);
    setFlag(lgView, FRLG_FLAGS_OFFSET, FRLG_FLAG_BADGE02_GET);
    setFlag(lgView, FRLG_FLAGS_OFFSET, FRLG_FLAG_BADGE03_GET);
    setFlag(lgView, FRLG_FLAGS_OFFSET, FRLG_FLAG_BADGE04_GET);
    setFlag(lgView, FRLG_FLAGS_OFFSET, FRLG_FLAG_BADGE05_GET);
    setFlag(lgView, FRLG_FLAGS_OFFSET, FRLG_FLAG_BADGE06_GET);
    setFlag(lgView, FRLG_FLAGS_OFFSET, FRLG_FLAG_BADGE07_GET);
    setFlag(lgView, FRLG_FLAGS_OFFSET, FRLG_FLAG_BADGE08_GET);

    const result = parseGen3NarrativeFlags(lgView, saveBlock1Offset, 'leafgreen');

    expect(result.badges).toBe(8);
    expect(result.upcomingBoss).toBe('Elite Four');
  });

  it('should return 0 badges and default boss for empty save (Sapphire)', () => {
    const emptyBuffer = new ArrayBuffer(0x2000);
    const emptyView = new DataView(emptyBuffer);

    const result = parseGen3NarrativeFlags(emptyView, saveBlock1Offset, 'sapphire');

    expect(result.badges).toBe(0);
    expect(result.upcomingBoss).toBe('Roxanne');
  });

  it('should return Unknown for unknown game version', () => {
    const emptyBuffer = new ArrayBuffer(0x2000);
    const emptyView = new DataView(emptyBuffer);

    const result = parseGen3NarrativeFlags(emptyView, saveBlock1Offset, 'unknown_version');

    expect(result.badges).toBe(0);
    expect(result.upcomingBoss).toBe('Unknown');
  });

  it('should throw RangeError for out of bounds access', () => {
    const smallBuffer = new ArrayBuffer(10);
    const smallView = new DataView(smallBuffer);

    expect(() => {
      parseGen3NarrativeFlags(smallView, saveBlock1Offset, 'emerald');
    }).toThrowError('The save file is corrupted or incomplete.');
  });

  describe('Upcoming Boss logic', () => {
    it('RSE: should return correct upcoming bosses', () => {
      const buffer = new ArrayBuffer(0x2000);
      const view = new DataView(buffer);

      // 0 badges
      expect(parseGen3NarrativeFlags(view, saveBlock1Offset, 'emerald').upcomingBoss).toBe('Roxanne');

      setFlag(view, RSE_FLAGS_OFFSET_E, RSE_FLAG_BADGE01_GET);
      expect(parseGen3NarrativeFlags(view, saveBlock1Offset, 'emerald').upcomingBoss).toBe('Brawly');

      setFlag(view, RSE_FLAGS_OFFSET_E, RSE_FLAG_BADGE02_GET);
      expect(parseGen3NarrativeFlags(view, saveBlock1Offset, 'emerald').upcomingBoss).toBe('Wattson');

      setFlag(view, RSE_FLAGS_OFFSET_E, RSE_FLAG_BADGE03_GET);
      expect(parseGen3NarrativeFlags(view, saveBlock1Offset, 'emerald').upcomingBoss).toBe('Flannery');

      setFlag(view, RSE_FLAGS_OFFSET_E, RSE_FLAG_BADGE04_GET);
      expect(parseGen3NarrativeFlags(view, saveBlock1Offset, 'emerald').upcomingBoss).toBe('Norman');

      setFlag(view, RSE_FLAGS_OFFSET_E, RSE_FLAG_BADGE05_GET);
      expect(parseGen3NarrativeFlags(view, saveBlock1Offset, 'emerald').upcomingBoss).toBe('Winona');

      setFlag(view, RSE_FLAGS_OFFSET_E, RSE_FLAG_BADGE06_GET);
      expect(parseGen3NarrativeFlags(view, saveBlock1Offset, 'emerald').upcomingBoss).toBe('Tate & Liza');

      setFlag(view, RSE_FLAGS_OFFSET_E, RSE_FLAG_BADGE07_GET);
      expect(parseGen3NarrativeFlags(view, saveBlock1Offset, 'emerald').upcomingBoss).toBe('Wallace/Juan');

      setFlag(view, RSE_FLAGS_OFFSET_E, RSE_FLAG_BADGE08_GET);
      expect(parseGen3NarrativeFlags(view, saveBlock1Offset, 'emerald').upcomingBoss).toBe('Elite Four');
    });

    it('FRLG: should return correct upcoming bosses', () => {
      const buffer = new ArrayBuffer(0x2000);
      const view = new DataView(buffer);

      // 0 badges
      expect(parseGen3NarrativeFlags(view, saveBlock1Offset, 'firered').upcomingBoss).toBe('Brock');

      setFlag(view, FRLG_FLAGS_OFFSET, FRLG_FLAG_BADGE01_GET);
      expect(parseGen3NarrativeFlags(view, saveBlock1Offset, 'firered').upcomingBoss).toBe('Misty');

      setFlag(view, FRLG_FLAGS_OFFSET, FRLG_FLAG_BADGE02_GET);
      expect(parseGen3NarrativeFlags(view, saveBlock1Offset, 'firered').upcomingBoss).toBe('Lt. Surge');

      setFlag(view, FRLG_FLAGS_OFFSET, FRLG_FLAG_BADGE03_GET);
      expect(parseGen3NarrativeFlags(view, saveBlock1Offset, 'firered').upcomingBoss).toBe('Erika');

      setFlag(view, FRLG_FLAGS_OFFSET, FRLG_FLAG_BADGE04_GET);
      expect(parseGen3NarrativeFlags(view, saveBlock1Offset, 'firered').upcomingBoss).toBe('Koga');

      setFlag(view, FRLG_FLAGS_OFFSET, FRLG_FLAG_BADGE05_GET);
      expect(parseGen3NarrativeFlags(view, saveBlock1Offset, 'firered').upcomingBoss).toBe('Sabrina');

      setFlag(view, FRLG_FLAGS_OFFSET, FRLG_FLAG_BADGE06_GET);
      expect(parseGen3NarrativeFlags(view, saveBlock1Offset, 'firered').upcomingBoss).toBe('Blaine');

      setFlag(view, FRLG_FLAGS_OFFSET, FRLG_FLAG_BADGE07_GET);
      expect(parseGen3NarrativeFlags(view, saveBlock1Offset, 'firered').upcomingBoss).toBe('Giovanni');

      setFlag(view, FRLG_FLAGS_OFFSET, FRLG_FLAG_BADGE08_GET);
      expect(parseGen3NarrativeFlags(view, saveBlock1Offset, 'firered').upcomingBoss).toBe('Elite Four');
    });
  });
});
