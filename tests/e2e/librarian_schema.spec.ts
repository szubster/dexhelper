import * as fs from 'node:fs';
import * as path from 'node:path';
import { expect, test } from '@playwright/test';

test.describe('Librarian Schema Verification', () => {
  test('verifies librarian persona exists in schema.md', async () => {
    const schemaPath = path.resolve(process.cwd(), '.foundry/docs/schema.md');
    const schemaContent = fs.readFileSync(schemaPath, 'utf-8');

    expect(schemaContent).toContain('librarian');
    expect(schemaContent).toContain(
      'Mapped to Snorlax (#143). Responsible for context token optimization by digesting historical data and pruning stale entries.',
    );
  });
});
