import type { Anomaly, HealthScanResult } from './models';

export const GEN1_MIN_SAVE_SIZE = 0x3524;
export const GEN1_CHECKSUM_INITIAL_VALUE = 0xff;
export const GEN1_CHECKSUM_DATA_START = 0x2598;
export const GEN1_CHECKSUM_DATA_END = 0x3522;
export const GEN1_CHECKSUM_STORED_OFFSET = 0x3523;
export const GEN1_CHECKSUM_MASK = 0xff;

export function validateGen1Checksum(view: DataView): HealthScanResult {
  const anomalies: Anomaly[] = [];
  const scannedAt = new Date();

  // Ensure the view is large enough to contain the Gen 1 checksum byte
  if (view.byteLength < GEN1_MIN_SAVE_SIZE) {
    anomalies.push({
      code: 'UnknownAnomaly',
      severity: 'Critical',
      location: { type: 'global_state' },
      description: 'Save file is too small to contain a valid Generation 1 checksum.',
    });
    return {
      isValid: false,
      anomalies,
      scannedAt,
    };
  }

  // Gen 1 Checksum
  // Gen 1 calculates its checksum by iterating over the main save data block (GEN1_CHECKSUM_DATA_START to GEN1_CHECKSUM_DATA_END),
  // subtracting each byte's value from an initial value of 255 (0xFF).
  // The result is stored at GEN1_CHECKSUM_STORED_OFFSET.
  let gen1Sum = GEN1_CHECKSUM_INITIAL_VALUE;
  for (let i = GEN1_CHECKSUM_DATA_START; i <= GEN1_CHECKSUM_DATA_END; i++) {
    gen1Sum -= view.getUint8(i);
  }

  const calculatedChecksum = gen1Sum & GEN1_CHECKSUM_MASK;
  const storedChecksum = view.getUint8(GEN1_CHECKSUM_STORED_OFFSET);

  if (calculatedChecksum !== storedChecksum) {
    anomalies.push({
      code: 'ChecksumError',
      severity: 'Critical',
      location: { type: 'global_state' },
      description: `Gen 1 checksum mismatch. Expected 0x${calculatedChecksum.toString(16).padStart(2, '0').toUpperCase()}, but found 0x${storedChecksum.toString(16).padStart(2, '0').toUpperCase()}.`,
    });
  }

  return {
    isValid: anomalies.length === 0,
    anomalies,
    scannedAt,
  };
}
