import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test as setup } from '@playwright/test';
import { initializeWithSave } from './test-utils';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const STORAGE_STATE = path.join(__dirname, '../../playwright/.auth/user.json');

setup('initialize and save state', async ({ page, context }) => {
  // 1. Load the app and upload the default save
  // This will trigger save parsing and PokeDB synchronization
  await initializeWithSave(page);

  // 2. Save the storage state, including IndexedDB
  await context.storageState({ path: STORAGE_STATE, indexedDB: true });
});
