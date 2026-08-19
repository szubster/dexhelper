import type { Anomaly } from '../models';

export const GEN2_CHECKSUM_MASK = 0xffff;

export const GEN2_CRYSTAL_JP_MAIN_START = 0x2009;
export const GEN2_CRYSTAL_JP_MAIN_END = 0x2ae2;
export const GEN2_CRYSTAL_JP_MAIN_STORED = 0x2d0d;
export const GEN2_CRYSTAL_JP_BACKUP_START = 0x7209;
export const GEN2_CRYSTAL_JP_BACKUP_END = 0x7ce2;
export const GEN2_CRYSTAL_JP_BACKUP_STORED = 0x7f0d;

export const GEN2_CRYSTAL_EN_MAIN_START = 0x2009;
export const GEN2_CRYSTAL_EN_MAIN_END = 0x2b82;
export const GEN2_CRYSTAL_EN_MAIN_STORED = 0x2d0d;
export const GEN2_CRYSTAL_EN_BACKUP_START = 0x1209;
export const GEN2_CRYSTAL_EN_BACKUP_END = 0x1d82;
export const GEN2_CRYSTAL_EN_BACKUP_STORED = 0x1f0d;

export const GEN2_GS_JP_MAIN_START = 0x2009;
export const GEN2_GS_JP_MAIN_END = 0x2c8b;
export const GEN2_GS_JP_MAIN_STORED = 0x2d0d;
export const GEN2_GS_JP_BACKUP_START = 0x7209;
export const GEN2_GS_JP_BACKUP_END = 0x7e8b;
export const GEN2_GS_JP_BACKUP_STORED = 0x7f0d;

export const GEN2_GS_EN_MAIN_START = 0x2009;
export const GEN2_GS_EN_MAIN_END = 0x2d68;
export const GEN2_GS_EN_MAIN_STORED = 0x2d69;
export const GEN2_GS_EN_BACKUP_R1_START = 0x0c6b;
export const GEN2_GS_EN_BACKUP_R1_END = 0x17ec;
export const GEN2_GS_EN_BACKUP_R2_START = 0x3d96;
export const GEN2_GS_EN_BACKUP_R2_END = 0x3f3f;
export const GEN2_GS_EN_BACKUP_R3_START = 0x7e39;
export const GEN2_GS_EN_BACKUP_R3_END = 0x7e6c;
export const GEN2_GS_EN_BACKUP_STORED = 0x7e6d;
export function checkGen2Checksums(view: DataView, isCrystal: boolean, isJapanese: boolean = false): Anomaly[] {
  const anomalies: Anomaly[] = [];

  function sumBytes(ranges: [number, number][]): number {
    let sum = 0;
    for (const [start, end] of ranges) {
      for (let i = start; i <= end; i++) {
        sum += view.getUint8(i);
      }
    }
    return sum & GEN2_CHECKSUM_MASK;
  }

  let mainRanges: [number, number][];
  let mainStoredOffset: number;
  let backupRanges: [number, number][];
  let backupStoredOffset: number;

  if (isCrystal) {
    if (isJapanese) {
      mainRanges = [[GEN2_CRYSTAL_JP_MAIN_START, GEN2_CRYSTAL_JP_MAIN_END]];
      mainStoredOffset = GEN2_CRYSTAL_JP_MAIN_STORED;
      backupRanges = [[GEN2_CRYSTAL_JP_BACKUP_START, GEN2_CRYSTAL_JP_BACKUP_END]];
      backupStoredOffset = GEN2_CRYSTAL_JP_BACKUP_STORED;
    } else {
      mainRanges = [[GEN2_CRYSTAL_EN_MAIN_START, GEN2_CRYSTAL_EN_MAIN_END]];
      mainStoredOffset = GEN2_CRYSTAL_EN_MAIN_STORED;
      backupRanges = [[GEN2_CRYSTAL_EN_BACKUP_START, GEN2_CRYSTAL_EN_BACKUP_END]];
      backupStoredOffset = GEN2_CRYSTAL_EN_BACKUP_STORED;
    }
  } else {
    if (isJapanese) {
      mainRanges = [[GEN2_GS_JP_MAIN_START, GEN2_GS_JP_MAIN_END]];
      mainStoredOffset = GEN2_GS_JP_MAIN_STORED;
      backupRanges = [[GEN2_GS_JP_BACKUP_START, GEN2_GS_JP_BACKUP_END]];
      backupStoredOffset = GEN2_GS_JP_BACKUP_STORED;
    } else {
      mainRanges = [[GEN2_GS_EN_MAIN_START, GEN2_GS_EN_MAIN_END]];
      mainStoredOffset = GEN2_GS_EN_MAIN_STORED;
      backupRanges = [
        [GEN2_GS_EN_BACKUP_R1_START, GEN2_GS_EN_BACKUP_R1_END],
        [GEN2_GS_EN_BACKUP_R2_START, GEN2_GS_EN_BACKUP_R2_END],
        [GEN2_GS_EN_BACKUP_R3_START, GEN2_GS_EN_BACKUP_R3_END],
      ];
      backupStoredOffset = GEN2_GS_EN_BACKUP_STORED;
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
