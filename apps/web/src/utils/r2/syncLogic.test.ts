import { describe, expect, it } from 'vitest';
import { detectConflict } from './syncLogic';

describe('detectConflict', () => {
  it('should push when there is no remote save', () => {
    const result = detectConflict({
      localLastModified: 1000,
    });
    expect(result.action).toBe('push');
    expect(result.reason).toBe('No remote save found');
  });

  it('should be up-to-date when timestamps match', () => {
    const result = detectConflict({
      localLastModified: 1000,
      remoteLastModified: 1000,
    });
    expect(result.action).toBe('up-to-date');
  });

  it('should detect conflict when both changed since last sync', () => {
    const result = detectConflict({
      localLastModified: 2000,
      remoteLastModified: 3000,
      lastSyncTime: 1000,
    });
    expect(result.action).toBe('conflict');
  });

  it('should push when only local changed since last sync', () => {
    const result = detectConflict({
      localLastModified: 2000,
      remoteLastModified: 1000,
      lastSyncTime: 1000,
    });
    expect(result.action).toBe('push');
  });

  it('should pull when only remote changed since last sync', () => {
    const result = detectConflict({
      localLastModified: 1000,
      remoteLastModified: 2000,
      lastSyncTime: 1000,
    });
    expect(result.action).toBe('pull');
  });

  it('should fallback to push if local is newer and no last sync time', () => {
    const result = detectConflict({
      localLastModified: 2000,
      remoteLastModified: 1000,
    });
    expect(result.action).toBe('push');
  });

  it('should fallback to pull if remote is newer and no last sync time', () => {
    const result = detectConflict({
      localLastModified: 1000,
      remoteLastModified: 2000,
    });
    expect(result.action).toBe('pull');
  });

  it('should fallback to push if local is newer and neither changed since last sync time', () => {
    const result = detectConflict({
      localLastModified: 2000,
      remoteLastModified: 1000,
      lastSyncTime: 3000,
    });
    expect(result.action).toBe('push');
  });

  it('should fallback to pull if remote is newer and neither changed since last sync time', () => {
    const result = detectConflict({
      localLastModified: 1000,
      remoteLastModified: 2000,
      lastSyncTime: 3000,
    });
    expect(result.action).toBe('pull');
  });
});
