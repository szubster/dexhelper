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

export interface Gen2ChecksumRegionSpec {
  mainRanges: [number, number][];
  mainStoredOffset: number;
  backupRanges: [number, number][];
  backupStoredOffset: number;
}

export type Gen2SaveVariant = 'CRYSTAL_JP' | 'CRYSTAL_EN' | 'GS_JP' | 'GS_EN';

export const GEN2_CHECKSUM_SPECS: Record<Gen2SaveVariant, Gen2ChecksumRegionSpec> = {
  CRYSTAL_JP: {
    mainRanges: [[GEN2_CRYSTAL_JP_MAIN_START, GEN2_CRYSTAL_JP_MAIN_END]],
    mainStoredOffset: GEN2_CRYSTAL_JP_MAIN_STORED,
    backupRanges: [[GEN2_CRYSTAL_JP_BACKUP_START, GEN2_CRYSTAL_JP_BACKUP_END]],
    backupStoredOffset: GEN2_CRYSTAL_JP_BACKUP_STORED,
  },
  CRYSTAL_EN: {
    mainRanges: [[GEN2_CRYSTAL_EN_MAIN_START, GEN2_CRYSTAL_EN_MAIN_END]],
    mainStoredOffset: GEN2_CRYSTAL_EN_MAIN_STORED,
    backupRanges: [[GEN2_CRYSTAL_EN_BACKUP_START, GEN2_CRYSTAL_EN_BACKUP_END]],
    backupStoredOffset: GEN2_CRYSTAL_EN_BACKUP_STORED,
  },
  GS_JP: {
    mainRanges: [[GEN2_GS_JP_MAIN_START, GEN2_GS_JP_MAIN_END]],
    mainStoredOffset: GEN2_GS_JP_MAIN_STORED,
    backupRanges: [[GEN2_GS_JP_BACKUP_START, GEN2_GS_JP_BACKUP_END]],
    backupStoredOffset: GEN2_GS_JP_BACKUP_STORED,
  },
  GS_EN: {
    mainRanges: [[GEN2_GS_EN_MAIN_START, GEN2_GS_EN_MAIN_END]],
    mainStoredOffset: GEN2_GS_EN_MAIN_STORED,
    backupRanges: [
      [GEN2_GS_EN_BACKUP_R1_START, GEN2_GS_EN_BACKUP_R1_END],
      [GEN2_GS_EN_BACKUP_R2_START, GEN2_GS_EN_BACKUP_R2_END],
      [GEN2_GS_EN_BACKUP_R3_START, GEN2_GS_EN_BACKUP_R3_END],
    ],
    backupStoredOffset: GEN2_GS_EN_BACKUP_STORED,
  },
};

export function getGen2ChecksumSpec(isCrystal: boolean, isJapanese: boolean = false): Gen2ChecksumRegionSpec {
  const game = isCrystal ? 'CRYSTAL' : 'GS';
  const region = isJapanese ? 'JP' : 'EN';
  const variant = `${game}_${region}` as Gen2SaveVariant;
  return GEN2_CHECKSUM_SPECS[variant];
}

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

  const spec = getGen2ChecksumSpec(isCrystal, isJapanese);

  const calculatedMainSum = sumBytes(spec.mainRanges);
  const storedMainSum = view.getUint16(spec.mainStoredOffset, true);
  if (calculatedMainSum !== storedMainSum) {
    anomalies.push({
      code: 'ChecksumError',
      severity: 'Critical',
      location: { type: 'global_state' },
      description: `Gen 2 Main Checksum mismatch. Expected ${storedMainSum}, but calculated ${calculatedMainSum}. Bank: Main.`,
    });
  }

  const calculatedBackupSum = sumBytes(spec.backupRanges);
  const storedBackupSum = view.getUint16(spec.backupStoredOffset, true);
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
