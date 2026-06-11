import type { Anomaly } from '../models';

export function checkGen2Checksums(view: DataView, isCrystal: boolean, isJapanese: boolean = false): Anomaly[] {
  const anomalies: Anomaly[] = [];

  function sumBytes(ranges: [number, number][]): number {
    let sum = 0;
    for (const [start, end] of ranges) {
      for (let i = start; i <= end; i++) {
        sum += view.getUint8(i);
      }
    }
    return sum & 0xffff;
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

  const calculatedMainSum = sumBytes(mainRanges);
  const storedMainSum = view.getUint16(mainStoredOffset, true);
  if (calculatedMainSum !== storedMainSum) {
    anomalies.push({
      code: 'ChecksumError',
      severity: 'Critical',
      location: { type: 'global_state' },
      description: `Gen 2 Main Checksum mismatch. Expected ${storedMainSum}, but calculated ${calculatedMainSum}. Bank: Main.`,
    });
  }

  const calculatedBackupSum = sumBytes(backupRanges);
  const storedBackupSum = view.getUint16(backupStoredOffset, true);
  if (calculatedBackupSum !== storedBackupSum) {
    anomalies.push({
      code: 'ChecksumError',
      severity: 'Warning',
      location: { type: 'global_state' },
      description: `Gen 2 Backup Checksum mismatch. Expected ${storedBackupSum}, but calculated ${calculatedBackupSum}. Bank: Backup.`,
    });
  }

  return anomalies;
}
