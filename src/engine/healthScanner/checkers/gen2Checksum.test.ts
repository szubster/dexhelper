import { describe, expect, it } from 'vitest';
import { checkGen2Checksums } from './gen2Checksum';

describe('Gen 2 Checksum Validator', () => {
  function createMockSave(
    isCrystal: boolean,
    isJapanese: boolean,
    corruptMain: boolean = false,
    corruptBackup: boolean = false,
  ): DataView {
    const buffer = new ArrayBuffer(32768);
    const view = new DataView(buffer);

    // Fill with dummy data
    for (let i = 0x0c00; i < 0x7f0f; i++) {
      view.setUint8(i, i % 256);
    }

    let mainRanges: [number, number][];
    let mainStoredOffset: number;
    let backupRanges: [number, number][];
    let backupStoredOffset: number;

    if (isCrystal) {
      if (isJapanese) {
        mainRanges = [[0x2009, 0x2ae2]];
        mainStoredOffset = 0x2d0d;
        backupRanges = [[0x7209, 0x7ce2]];
        backupStoredOffset = 0x7f0d;
      } else {
        mainRanges = [[0x2009, 0x2b82]];
        mainStoredOffset = 0x2d0d;
        backupRanges = [[0x1209, 0x1d82]];
        backupStoredOffset = 0x1f0d;
      }
    } else {
      if (isJapanese) {
        mainRanges = [[0x2009, 0x2c8b]];
        mainStoredOffset = 0x2d0d;
        backupRanges = [[0x7209, 0x7e8b]];
        backupStoredOffset = 0x7f0d;
      } else {
        mainRanges = [[0x2009, 0x2d68]];
        mainStoredOffset = 0x2d69;
        backupRanges = [
          [0x0c6b, 0x17ec],
          [0x3d96, 0x3f3f],
          [0x7e39, 0x7e6c],
        ];
        backupStoredOffset = 0x7e6d;
      }
    }

    // Calculate correct sums
    let mainSum = 0;
    for (const [start, end] of mainRanges) {
      for (let i = start; i <= end; i++) {
        mainSum += view.getUint8(i);
      }
    }
    view.setUint16(mainStoredOffset, corruptMain ? 0x0000 : mainSum, true);

    let backupSum = 0;
    for (const [start, end] of backupRanges) {
      for (let i = start; i <= end; i++) {
        backupSum += view.getUint8(i);
      }
    }
    view.setUint16(backupStoredOffset, corruptBackup ? 0x0000 : backupSum, true);

    return view;
  }

  it('should return no anomalies for a valid English Gold/Silver save', () => {
    const view = createMockSave(false, false);
    const anomalies = checkGen2Checksums(view, false, false);
    expect(anomalies).toHaveLength(0);
  });

  it('should return no anomalies for a valid Japanese Gold/Silver save', () => {
    const view = createMockSave(false, true);
    const anomalies = checkGen2Checksums(view, false, true);
    expect(anomalies).toHaveLength(0);
  });

  it('should return no anomalies for a valid English Crystal save', () => {
    const view = createMockSave(true, false);
    const anomalies = checkGen2Checksums(view, true, false);
    expect(anomalies).toHaveLength(0);
  });

  it('should return no anomalies for a valid Japanese Crystal save', () => {
    const view = createMockSave(true, true);
    const anomalies = checkGen2Checksums(view, true, true);
    expect(anomalies).toHaveLength(0);
  });

  it('should detect corrupted main checksum in English Gold/Silver', () => {
    const view = createMockSave(false, false, true, false);
    const anomalies = checkGen2Checksums(view, false, false);
    expect(anomalies).toHaveLength(1);
    expect(anomalies[0]?.description).toContain('Bank: Main');
    expect(anomalies[0]?.severity).toBe('Critical');
  });

  it('should detect corrupted backup checksum in English Crystal', () => {
    const view = createMockSave(true, false, false, true);
    const anomalies = checkGen2Checksums(view, true, false);
    expect(anomalies).toHaveLength(1);
    expect(anomalies[0]?.description).toContain('Bank: Backup');
    expect(anomalies[0]?.severity).toBe('Warning');
  });

  it('should detect both corrupted checksums', () => {
    const view = createMockSave(true, true, true, true);
    const anomalies = checkGen2Checksums(view, true, true);
    expect(anomalies).toHaveLength(2);
    expect(anomalies[0]?.description).toContain('Bank: Main');
    expect(anomalies[1]?.description).toContain('Bank: Backup');
  });
});
