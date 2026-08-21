import { describe, expect, it } from 'vitest';
import {
  FRLG_FLAG_BADGE01_GET,
  FRLG_FLAG_BADGE03_GET,
  FRLG_FLAGS_OFFSET,
  RSE_FLAG_BADGE01_GET,
  RSE_FLAG_BADGE02_GET,
  RSE_FLAG_BADGE03_GET,
  RSE_FLAGS_OFFSET_E,
} from './constants';
import { parseGen3NarrativeFlags } from './parser';

describe('parseGen3NarrativeFlags', () => {
  const saveBlock1Offset = 0x0;
  const mockBuffer = new ArrayBuffer(0x2000);
  const view = new DataView(mockBuffer);

  const setFlag = (baseOffset: number, flagId: number) => {
    const byteOffset = baseOffset + Math.floor(flagId / 8);
    const bitIndex = flagId % 8;
    const currentByte = view.getUint8(byteOffset);
    view.setUint8(byteOffset, currentByte | (1 << bitIndex));
  };

  it('should parse Emerald narrative flags correctly (3 badges)', () => {
    setFlag(RSE_FLAGS_OFFSET_E, RSE_FLAG_BADGE01_GET);
    setFlag(RSE_FLAGS_OFFSET_E, RSE_FLAG_BADGE02_GET);
    setFlag(RSE_FLAGS_OFFSET_E, RSE_FLAG_BADGE03_GET);

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

    const setFrFlag = (baseOffset: number, flagId: number) => {
      const byteOffset = baseOffset + Math.floor(flagId / 8);
      const bitIndex = flagId % 8;
      const currentByte = frlgView.getUint8(byteOffset);
      frlgView.setUint8(byteOffset, currentByte | (1 << bitIndex));
    };

    setFrFlag(FRLG_FLAGS_OFFSET, FRLG_FLAG_BADGE01_GET);
    setFrFlag(FRLG_FLAGS_OFFSET, FRLG_FLAG_BADGE03_GET);

    const result = parseGen3NarrativeFlags(frlgView, saveBlock1Offset, 'firered');

    expect(result.badges).toBe(2);
    expect(result.flags.badge1).toBe(true);
    expect(result.flags.badge2).toBe(false);
    expect(result.flags.badge3).toBe(true);
    expect(result.flags.badge4).toBe(false);
    expect(result.upcomingBoss).toBe('Misty'); // Because badge2 is false
  });

  it('should return 0 badges and default boss for empty save', () => {
    const emptyBuffer = new ArrayBuffer(0x2000);
    const emptyView = new DataView(emptyBuffer);

    const result = parseGen3NarrativeFlags(emptyView, saveBlock1Offset, 'sapphire');

    expect(result.badges).toBe(0);
    expect(result.upcomingBoss).toBe('Roxanne');
  });

  it('should throw RangeError for out of bounds access', () => {
    const smallBuffer = new ArrayBuffer(10);
    const smallView = new DataView(smallBuffer);

    expect(() => {
      parseGen3NarrativeFlags(smallView, saveBlock1Offset, 'emerald');
    }).toThrowError('The save file is corrupted or incomplete.');
  });
});
