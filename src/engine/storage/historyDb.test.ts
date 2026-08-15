import 'fake-indexeddb/auto';
import { describe, expect, it } from 'vitest';
import { initHistoryDb } from './historyDb';

describe('SaveHistoryDB', () => {
  it('should initialize the database with correct name and version', async () => {
    const db = await initHistoryDb();
    expect(db.name).toBe('SaveHistoryDB');
    expect(db.version).toBe(1);
    db.close();
  });

  it('should define the correct object stores', async () => {
    const db = await initHistoryDb();
    expect(db.objectStoreNames.contains('saves')).toBe(true);
    expect(db.objectStoreNames.contains('metadata')).toBe(true);
    expect(db.objectStoreNames.contains('indexes')).toBe(true);
    db.close();
  });
});
