import { describe, expect, it } from 'vitest';
import { extractFeebasSeed } from './feebas';

describe('extractFeebasSeed', () => {
  it('extracts the Feebas seed for Ruby/Sapphire', () => {
    // 0x2dd6 + 2 bytes = 11736 bytes
    const buffer = new ArrayBuffer(12000);
    const view = new DataView(buffer);
    view.setUint16(0x2dd6, 0x1234, true);

    const seedRuby = extractFeebasSeed(view, 'ruby');
    expect(seedRuby).toBe(0x1234);

    const seedSapphire = extractFeebasSeed(view, 'sapphire');
    expect(seedSapphire).toBe(0x1234);
  });

  it('extracts the Feebas seed for Emerald', () => {
    // 0x2e66 + 2 bytes = 11880 bytes
    const buffer = new ArrayBuffer(12000);
    const view = new DataView(buffer);
    view.setUint16(0x2e66, 0x5678, true);

    const seedEmerald = extractFeebasSeed(view, 'emerald');
    expect(seedEmerald).toBe(0x5678);
  });

  it('throws an error for unsupported game versions', () => {
    const buffer = new ArrayBuffer(12000);
    const view = new DataView(buffer);

    expect(() => extractFeebasSeed(view, 'firered')).toThrow('Unsupported game version');
    expect(() => extractFeebasSeed(view, 'leafgreen')).toThrow('Unsupported game version');
    expect(() => extractFeebasSeed(view, 'red')).toThrow('Unsupported game version');
  });

  it('catches RangeError and re-throws specific corrupted file error', () => {
    // Buffer too small to read at 0x2dd6 (11734)
    const buffer = new ArrayBuffer(100);
    const view = new DataView(buffer);

    expect(() => extractFeebasSeed(view, 'ruby')).toThrow('The save file is corrupted or incomplete.');
  });
});
