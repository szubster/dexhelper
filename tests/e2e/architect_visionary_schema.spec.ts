import * as fs from 'node:fs';
import * as path from 'node:path';
import { expect, test } from '@playwright/test';

test.describe('Architect Visionary Schema Verification', () => {
  test('verifies architect_visionary persona exists in schema.md', async () => {
    const schemaPath = path.resolve(process.cwd(), 'packages/foundry/schema.ts');
    const schemaContent = fs.readFileSync(schemaPath, 'utf-8');

    expect(schemaContent).toContain('architect_visionary');
  });
});
