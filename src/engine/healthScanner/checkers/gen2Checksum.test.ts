import { describe, expect, it } from 'vitest';
import { checkGen2Checksums, getGen2ChecksumSpec } from './gen2Checksum';

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

    const spec = getGen2ChecksumSpec(isCrystal, isJapanese);

    // Calculate correct sums
    let mainSum = 0;
    for (const [start, end] of spec.mainRanges) {
      for (let i = start; i <= end; i++) {
        mainSum += view.getUint8(i);
      }
    }
    view.setUint16(spec.mainStoredOffset, corruptMain ? 0x0000 : mainSum, true);

    let backupSum = 0;
    for (const [start, end] of spec.backupRanges) {
      for (let i = start; i <= end; i++) {
        backupSum += view.getUint8(i);
      }
    }
    view.setUint16(spec.backupStoredOffset, corruptBackup ? 0x0000 : backupSum, true);

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
