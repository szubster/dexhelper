export type Severity = 'Warning' | 'Critical';

export type ErrorCode =
  | 'ChecksumError'
  | 'OutOfBoundsId'
  | 'ImpossibleMoveset'
  | 'InvalidStat'
  | 'CorruptedItem'
  | 'UnknownAnomaly';

export type Location =
  | { type: 'pc_box'; boxNumber: number; slot: number }
  | { type: 'inventory'; index: number }
  | { type: 'party'; index: number }
  | { type: 'daycare'; index: number }
  | { type: 'global_state' };

export interface Anomaly {
  code: ErrorCode;
  severity: Severity;
  location: Location;
  description: string;
}

export interface HealthScanResult {
  isValid: boolean;
  anomalies: Anomaly[];
  scannedAt: Date;
}
