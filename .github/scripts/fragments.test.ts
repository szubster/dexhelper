import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { validatePromptFragment } from './schema.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Prompt Fragments', () => {
  it('validates coder-role.json', () => {
    const raw = fs.readFileSync(path.resolve(__dirname, '../agents/fragments/coder-role.json'), 'utf8');
    expect(() => validatePromptFragment(JSON.parse(raw))).not.toThrow();
  });
  it('validates react-tailwind-stack.json', () => {
    const raw = fs.readFileSync(path.resolve(__dirname, '../agents/fragments/react-tailwind-stack.json'), 'utf8');
    expect(() => validatePromptFragment(JSON.parse(raw))).not.toThrow();
  });
  it('validates typescript-rules.json', () => {
    const raw = fs.readFileSync(path.resolve(__dirname, '../agents/fragments/typescript-rules.json'), 'utf8');
    expect(() => validatePromptFragment(JSON.parse(raw))).not.toThrow();
  });
});
