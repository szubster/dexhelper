import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { updateKnowledgeBase, type ExtractedRule } from './update-knowledge-base.ts';

describe('updateKnowledgeBase', () => {
  const testDir = path.join(__dirname, '__test_kb__');
  const testFile = '.foundry/docs/knowledge_base/agents/core_policies.md';
  const fullPath = path.join(testDir, testFile);

  beforeEach(() => {
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, '# Core Policies\n\nSome existing content.\n', 'utf-8');
  });

  afterEach(() => {
    fs.rmSync(testDir, { recursive: true, force: true });
  });

  it('appends new section if it does not exist', () => {
    const rules: ExtractedRule[] = [
      { description: 'Test Rule 1' }
    ];
    updateKnowledgeBase(testDir, rules, testFile);
    const content = fs.readFileSync(fullPath, 'utf-8');
    expect(content).toContain('## Librarian Extracted Rules');
    expect(content).toContain('- Test Rule 1');
  });

  it('inserts after section if it exists', () => {
    fs.writeFileSync(fullPath, '# Core Policies\n\n## Librarian Extracted Rules\n- Old Rule\n', 'utf-8');
    const rules: ExtractedRule[] = [
      { description: 'New Test Rule' }
    ];
    updateKnowledgeBase(testDir, rules, testFile);
    const content = fs.readFileSync(fullPath, 'utf-8');
    expect(content).toContain('- New Test Rule');
    expect(content).toContain('- Old Rule');
  });
});
