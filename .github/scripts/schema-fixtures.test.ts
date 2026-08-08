import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import { NodeFrontmatterSchema } from './schema.ts';

const rootDir = path.resolve(__dirname, '../../');
const fixturesDir = path.join(rootDir, '.foundry/fixtures');

describe('Zod Schema E2E Test Fixtures (Markdown Files)', () => {
  it('validates a correct TASK file', () => {
    const file = fs.readFileSync(path.join(fixturesDir, 'valid-task-1.md'), 'utf-8');
    const { data } = matter(file);
    expect(() => NodeFrontmatterSchema.parse(data)).not.toThrow();
  });

  it('validates a correct IDEA file', () => {
    const file = fs.readFileSync(path.join(fixturesDir, 'valid-idea-1.md'), 'utf-8');
    const { data } = matter(file);
    expect(() => NodeFrontmatterSchema.parse(data)).not.toThrow();
  });

  it('validates a correct EPIC file', () => {
    const file = fs.readFileSync(path.join(fixturesDir, 'valid-epic-1.md'), 'utf-8');
    const { data } = matter(file);
    expect(() => NodeFrontmatterSchema.parse(data)).not.toThrow();
  });

  it('fails validation for TASK with invalid status', () => {
    const file = fs.readFileSync(path.join(fixturesDir, 'invalid-task-1.md'), 'utf-8');
    const { data } = matter(file);
    expect(() => NodeFrontmatterSchema.parse(data)).toThrow();
  });

  it('fails validation for IDEA with missing id', () => {
    const file = fs.readFileSync(path.join(fixturesDir, 'invalid-idea-1.md'), 'utf-8');
    const { data } = matter(file);
    expect(() => NodeFrontmatterSchema.parse(data)).toThrow();
  });

  it('fails validation for EPIC with invalid depends_on type', () => {
    const file = fs.readFileSync(path.join(fixturesDir, 'invalid-epic-1.md'), 'utf-8');
    const { data } = matter(file);
    expect(() => NodeFrontmatterSchema.parse(data)).toThrow();
  });
});
