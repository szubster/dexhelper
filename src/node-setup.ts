import indexeddb, {
  IDBCursor,
  IDBCursorWithValue,
  IDBDatabase,
  IDBIndex,
  IDBKeyRange,
  IDBObjectStore,
  IDBOpenDBRequest,
  IDBRequest,
  IDBTransaction,
  IDBVersionChangeEvent,
} from 'fake-indexeddb';
import { vi } from 'vitest';

globalThis.indexedDB = indexeddb as unknown as IDBFactory;
globalThis.IDBRequest = IDBRequest as unknown as typeof globalThis.IDBRequest;
globalThis.IDBCursor = IDBCursor as unknown as typeof globalThis.IDBCursor;
globalThis.IDBCursorWithValue = IDBCursorWithValue as unknown as typeof globalThis.IDBCursorWithValue;
globalThis.IDBDatabase = IDBDatabase as unknown as typeof globalThis.IDBDatabase;
globalThis.IDBIndex = IDBIndex as unknown as typeof globalThis.IDBIndex;
globalThis.IDBKeyRange = IDBKeyRange as unknown as typeof globalThis.IDBKeyRange;
globalThis.IDBObjectStore = IDBObjectStore as unknown as typeof globalThis.IDBObjectStore;
globalThis.IDBOpenDBRequest = IDBOpenDBRequest as unknown as typeof globalThis.IDBOpenDBRequest;
globalThis.IDBTransaction = IDBTransaction as unknown as typeof globalThis.IDBTransaction;
globalThis.IDBVersionChangeEvent = IDBVersionChangeEvent as unknown as typeof globalThis.IDBVersionChangeEvent;

// Mock other browser APIs if needed
Object.defineProperty(globalThis, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
