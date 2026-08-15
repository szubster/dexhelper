export type SyncAction = 'push' | 'pull' | 'conflict' | 'up-to-date';

export interface SyncStatusResult {
  action: SyncAction;
  reason: string;
  // Structure for future diffing logic
  diffs?: unknown[];
}

export interface SyncTimestamps {
  localLastModified: number;
  remoteLastModified?: number;
  lastSyncTime?: number;
}

export function detectConflict({
  localLastModified,
  remoteLastModified,
  lastSyncTime,
}: SyncTimestamps): SyncStatusResult {
  if (remoteLastModified === undefined) {
    return { action: 'push', reason: 'No remote save found' };
  }

  if (localLastModified === remoteLastModified) {
    return { action: 'up-to-date', reason: 'Timestamps match' };
  }

  if (lastSyncTime !== undefined) {
    const localChanged = localLastModified > lastSyncTime;
    const remoteChanged = remoteLastModified > lastSyncTime;

    if (localChanged && remoteChanged) {
      return {
        action: 'conflict',
        reason: 'Both local and remote have changes since last sync',
      };
    }

    if (localChanged) {
      return { action: 'push', reason: 'Local has newer changes since last sync' };
    }

    if (remoteChanged) {
      return { action: 'pull', reason: 'Remote has newer changes since last sync' };
    }
  }

  // Fallback when lastSyncTime is unknown or neither changed since lastSyncTime
  if (localLastModified > remoteLastModified) {
    return { action: 'push', reason: 'Local is newer than remote' };
  }

  return { action: 'pull', reason: 'Remote is newer than local' };
}
