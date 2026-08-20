import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import { NodeFrontmatterSchema } from './schema';

const rootDir = path.resolve(__dirname, '../../');
const fixturesDir = path.join(rootDir, '.foundry/fixtures');

describe('Zod Schema E2E Test Fixtures (Markdown Files)', () => {
  it('validates a correct TASK file', () => {
    const file = fs.readFileSync(path.join(fixturesDir, 'task-001-valid.md'), 'utf-8');
    const { data } = matter(file);
    expect(() => NodeFrontmatterSchema.parse(data)).not.toThrow();
  });

  it('validates a correct IDEA file', () => {
    const file = fs.readFileSync(path.join(fixturesDir, 'idea-001-valid.md'), 'utf-8');
    const { data } = matter(file);
    expect(() => NodeFrontmatterSchema.parse(data)).not.toThrow();
  });

  it('validates a correct EPIC file', () => {
    const file = fs.readFileSync(path.join(fixturesDir, 'epic-001-valid.md'), 'utf-8');
    const { data } = matter(file);
    expect(() => NodeFrontmatterSchema.parse(data)).not.toThrow();
  });

  it('fails validation for TASK with invalid status', () => {
    const file = fs.readFileSync(path.join(fixturesDir, 'task-002-invalid.md'), 'utf-8');
    const { data } = matter(file);
    expect(() => NodeFrontmatterSchema.parse(data)).toThrowError(/invalid_value|invalid_enum_value/);
  });

  it('fails validation for IDEA with missing id', () => {
    const file = fs.readFileSync(path.join(fixturesDir, 'idea-002-invalid.md'), 'utf-8');
    const { data } = matter(file);
    expect(() => NodeFrontmatterSchema.parse(data)).toThrowError(/invalid_type/);
  });

  it('fails validation for EPIC with invalid depends_on type', () => {
    const file = fs.readFileSync(path.join(fixturesDir, 'epic-002-invalid.md'), 'utf-8');
    const { data } = matter(file);
    expect(() => NodeFrontmatterSchema.parse(data)).toThrowError(/invalid_type/);
  });

  it('validates a correct TASK file with valid locks array', () => {
    const file = fs.readFileSync(path.join(fixturesDir, 'task-003-locks-valid.md'), 'utf-8');
    const { data } = matter(file);
    expect(() => NodeFrontmatterSchema.parse(data)).not.toThrow();
  });

  it('fails validation for TASK with invalid locks type', () => {
    const file = fs.readFileSync(path.join(fixturesDir, 'task-003-locks-invalid.md'), 'utf-8');
    const { data } = matter(file);
    expect(() => NodeFrontmatterSchema.parse(data)).toThrowError(/invalid_type/);
  });
});
