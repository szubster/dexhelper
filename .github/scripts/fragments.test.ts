import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { parseMarkdownFragment } from './schema.ts';
import { composePromptFragments } from './fragments.ts';
import type { PromptFragment } from './schema.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Prompt Fragments Markdown', () => {
  it('validates coder-role.md', () => {
    const raw = fs.readFileSync(path.resolve(__dirname, '../agents/fragments/coder-role.md'), 'utf8');
    const parsed = parseMarkdownFragment(raw);
    expect(parsed.id).toBe('coder-role');
    expect(parsed.context).toContain('Write tests.');
  });
  it('validates react-tailwind-stack.md', () => {
    const raw = fs.readFileSync(path.resolve(__dirname, '../agents/fragments/react-tailwind-stack.md'), 'utf8');
    const parsed = parseMarkdownFragment(raw);
    expect(parsed.id).toBe('react-tailwind-stack');
    expect(parsed.context).toContain('Follow tactical hardware aesthetic.');
  });
  it('validates typescript-rules.md', () => {
    const raw = fs.readFileSync(path.resolve(__dirname, '../agents/fragments/typescript-rules.md'), 'utf8');
    const parsed = parseMarkdownFragment(raw);
    expect(parsed.id).toBe('typescript-rules');
    expect(parsed.context).toContain('Avoid any type.');
  });
});

describe('composePromptFragments', () => {
  it('sorts by precedence descending', () => {
    const fragments: PromptFragment[] = [
      { id: '1', precedence: 10, context: 'Context 10.' },
      { id: '2', precedence: 30, context: 'Context 30.' },
      { id: '3', precedence: 20, context: 'Context 20.' },
    ];

    const result = composePromptFragments(fragments);

    expect(result).toBe('Context 30.\n\nContext 20.\n\nContext 10.');
  });

  it('handles fragments without precedence, defaulting to 0', () => {
    const fragments: PromptFragment[] = [
      { id: '1', precedence: 10, context: 'Context 10.' },
      { id: '2', context: 'Context 0.' },
      { id: '3', precedence: 20, context: 'Context 20.' },
    ];

    const result = composePromptFragments(fragments);

    expect(result).toBe('Context 20.\n\nContext 10.\n\nContext 0.');
  });

  it('combines roles, context, and rules', () => {
    const fragments: PromptFragment[] = [
      { id: '1', role: 'Role A.', context: 'Context A.', rules: ['Rule A1', 'Rule A2'] },
      { id: '2', precedence: 10, role: 'Role B.', context: 'Context B.', rules: ['Rule B1'] },
    ];

    const result = composePromptFragments(fragments);

    expect(result).toContain('Role B.\nRole A.');
    expect(result).toContain('Context B.\n\nContext A.');
    expect(result).toContain('Rule B1\nRule A1\nRule A2');
  });

  it('handles empty fragments list', () => {
    const fragments: PromptFragment[] = [];
    const result = composePromptFragments(fragments);
    expect(result).toBe('');
  });

  it('handles fragments with missing fields', () => {
    const fragments: PromptFragment[] = [
      { id: '1', role: 'Role A.' },
      { id: '2', rules: ['Rule B1'] },
      { id: '3', context: 'Context C.' },
    ];
    const result = composePromptFragments(fragments);
    // Role A (from 1)
    // Context C (from 3)
    // Rule B1 (from 2)
    // No explicit sorting, so order of roles, context, rules blocks applies
    // roles first, then contexts, then rules.
    expect(result).toBe('Role A.\n\nContext C.\n\nRule B1');
  });

});
