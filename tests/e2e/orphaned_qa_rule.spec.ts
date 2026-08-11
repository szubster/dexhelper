import { execSync } from 'node:child_process';
import path from 'node:path';
import { expect, test } from '@playwright/test';

test.describe('Orphaned QA Rule Documentation', () => {
  test('should not contain any mention of the Orphaned QA Task Cancellation Rule', () => {
    const searchCommand = 'grep -rin "Orphaned QA Task Cancellation Rule" .foundry/docs/ || true';
    const cwd = path.resolve(import.meta.dirname, '../../');
    const result = execSync(searchCommand, { cwd }).toString().trim();

    expect(result).toBe('');
  });
});
