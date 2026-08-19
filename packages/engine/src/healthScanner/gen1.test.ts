import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { validateGen1Checksum } from './gen1';

describe('validateGen1Checksum', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-10T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return UnknownAnomaly if file is too small', () => {
    const buffer = new ArrayBuffer(0x3000);
    const view = new DataView(buffer);

    const result = validateGen1Checksum(view);

    expect(result.isValid).toBe(false);
    expect(result.anomalies).toHaveLength(1);
    expect(result.anomalies[0]).toEqual({
      code: 'UnknownAnomaly',
      severity: 'Critical',
      location: { type: 'global_state' },
      description: 'Save file is too small to contain a valid Generation 1 checksum.',
    });
    expect(result.scannedAt).toEqual(new Date('2026-06-10T12:00:00Z'));
  });

  it('should return valid if checksum is correct', () => {
    const buffer = new ArrayBuffer(32768);
    const view = new DataView(buffer);

    // Initial value is 255
    let gen1Sum = 255;

    // Set some dummy data
    view.setUint8(0x2598, 10);
    view.setUint8(0x2599, 20);

    for (let i = 0x2598; i <= 0x3522; i++) {
      gen1Sum -= view.getUint8(i);
    }

    // Set the checksum byte
    view.setUint8(0x3523, gen1Sum & 0xff);

    const result = validateGen1Checksum(view);

    expect(result.isValid).toBe(true);
    expect(result.anomalies).toHaveLength(0);
    expect(result.scannedAt).toEqual(new Date('2026-06-10T12:00:00Z'));
  });

  it('should return ChecksumError if checksum is incorrect', () => {
    const buffer = new ArrayBuffer(32768);
    const view = new DataView(buffer);

    // Initial value is 255
    let gen1Sum = 255;

    // Set some dummy data
    view.setUint8(0x2598, 10);
    view.setUint8(0x2599, 20);

    for (let i = 0x2598; i <= 0x3522; i++) {
      gen1Sum -= view.getUint8(i);
    }

    const correctChecksum = gen1Sum & 0xff;
    const invalidChecksum = (correctChecksum + 1) & 0xff;

    // Set the checksum byte to an invalid value
    view.setUint8(0x3523, invalidChecksum);

    const result = validateGen1Checksum(view);

    expect(result.isValid).toBe(false);
    expect(result.anomalies).toHaveLength(1);
    expect(result.anomalies[0]).toEqual({
      code: 'ChecksumError',
      severity: 'Critical',
      location: { type: 'global_state' },
      description: `Gen 1 checksum mismatch. Expected 0x${correctChecksum.toString(16).padStart(2, '0').toUpperCase()}, but found 0x${invalidChecksum.toString(16).padStart(2, '0').toUpperCase()}.`,
    });
    expect(result.scannedAt).toEqual(new Date('2026-06-10T12:00:00Z'));
  });
});
