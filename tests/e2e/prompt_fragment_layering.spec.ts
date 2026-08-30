import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { expect, test } from '@playwright/test';
import { composePromptFragments } from '../../.github/scripts/fragments.ts';
import { parseMarkdownFragment } from '../../.github/scripts/schema.ts';

test.describe('Prompt Fragment Layering E2E', () => {
  let tmpDir: string;

  test.beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'prompt-fragment-e2e-'));
  });

  test.afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('validates end-to-end flow from file to composed prompt', () => {
    // 1. Define fragments as markdown files
    const fragment1Path = path.join(tmpDir, 'frag1.md');
    fs.writeFileSync(
      fragment1Path,
      `---
id: frag1
precedence: 10
role: You are a tester.
---
Context for testing.`,
    );

    const fragment2Path = path.join(tmpDir, 'frag2.md');
    fs.writeFileSync(
      fragment2Path,
      `---
id: frag2
precedence: 20
role: You are a lead tester.
---
Context for lead testing.`,
    );

    // 2. Parse fragments
    const raw1 = fs.readFileSync(fragment1Path, 'utf8');
    const parsed1 = parseMarkdownFragment(raw1);

    const raw2 = fs.readFileSync(fragment2Path, 'utf8');
    const parsed2 = parseMarkdownFragment(raw2);

    expect(parsed1.id).toBe('frag1');
    expect(parsed2.id).toBe('frag2');

    // 3. Compose fragments
    const composed = composePromptFragments([parsed1, parsed2]);

    // Precedence 20 should come before 10
    expect(composed).toBe(
      'You are a lead tester.\nYou are a tester.\n\nContext for lead testing.\n\nContext for testing.',
    );
  });

  test('handles fragments without precedence, defaulting to 0', () => {
    const fragment1Path = path.join(tmpDir, 'frag1.md');
    fs.writeFileSync(
      fragment1Path,
      `---
id: frag1
precedence: 10
role: Role A.
---
Context A.`,
    );

    const fragment2Path = path.join(tmpDir, 'frag2.md');
    fs.writeFileSync(
      fragment2Path,
      `---
id: frag2
role: Role B.
---
Context B.`,
    );

    const raw1 = fs.readFileSync(fragment1Path, 'utf8');
    const parsed1 = parseMarkdownFragment(raw1);

    const raw2 = fs.readFileSync(fragment2Path, 'utf8');
    const parsed2 = parseMarkdownFragment(raw2);

    const composed = composePromptFragments([parsed1, parsed2]);

    expect(composed).toBe('Role A.\nRole B.\n\nContext A.\n\nContext B.');
  });

  test('handles error for invalid fragment (missing required fields)', () => {
    const fragmentPath = path.join(tmpDir, 'invalid-frag.md');
    fs.writeFileSync(
      fragmentPath,
      `---
precedence: 10
---
No id provided.`,
    );

    const raw = fs.readFileSync(fragmentPath, 'utf8');
    expect(() => parseMarkdownFragment(raw)).toThrow(/Invalid prompt fragment: id/);
  });
});
