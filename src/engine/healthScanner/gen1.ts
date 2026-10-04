import type { Anomaly, HealthScanResult } from './models';

export function validateGen1Checksum(view: DataView): HealthScanResult {
  const anomalies: Anomaly[] = [];
  const scannedAt = new Date();

  // Ensure the view is large enough to contain the Gen 1 checksum byte
  if (view.byteLength < 0x3524) {
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
  // Gen 1 calculates its checksum by iterating over the main save data block (0x2598 to 0x3522),
  // subtracting each byte's value from an initial value of 255 (0xFF).
  // The result is stored at 0x3523.
  let gen1Sum = 255;
  for (let i = 0x2598; i <= 0x3522; i++) {
    gen1Sum -= view.getUint8(i);
  }

  const calculatedChecksum = gen1Sum & 0xff;
  const storedChecksum = view.getUint8(0x3523);

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
