import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { parseMarkdownFragment } from './schema.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Prompt Fragments Markdown', () => {
  it('validates coder-role.md', () => {
    const raw = fs.readFileSync(path.resolve(__dirname, '../agents/fragments/coder-role.md'), 'utf8');
    const parsed = parseMarkdownFragment(raw);
    expect(parsed.id).toBe('coder-role');
    expect(parsed.rules).toContain('Write tests.');
  });
  it('validates react-tailwind-stack.md', () => {
    const raw = fs.readFileSync(path.resolve(__dirname, '../agents/fragments/react-tailwind-stack.md'), 'utf8');
    const parsed = parseMarkdownFragment(raw);
    expect(parsed.id).toBe('react-tailwind-stack');
    expect(parsed.rules).toContain('Follow tactical hardware aesthetic.');
  });
  it('validates typescript-rules.md', () => {
    const raw = fs.readFileSync(path.resolve(__dirname, '../agents/fragments/typescript-rules.md'), 'utf8');
    const parsed = parseMarkdownFragment(raw);
    expect(parsed.id).toBe('typescript-rules');
    expect(parsed.rules).toContain('Avoid any type.');
  });
});
