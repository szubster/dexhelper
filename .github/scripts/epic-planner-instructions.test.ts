import { expect, test } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('Epic Planner instructions enforce E2E verification story', () => {
  const filePath = path.join(__dirname, '../agents/epic_planner.md');
  const content = fs.readFileSync(filePath, 'utf-8');
  expect(content).toContain('You MUST enforce a process where every EPIC generates a final STORY dedicated exclusively to Integration and E2E Verification.');
});
