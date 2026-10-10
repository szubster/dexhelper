import { describe, it, expect } from 'vitest';
import { buildDocumentationIndex, buildQuery } from './flexsearch-utils.ts';
import type { NodeFrontmatter } from './schema.ts';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('flexsearch-utils', () => {
  it('should build index and return correct results', () => {
    const tmpDir = path.join(__dirname, 'tmp-repo');
    const docsDir = path.join(tmpDir, '.foundry', 'docs');
    const adrsDir = path.join(tmpDir, '.foundry', 'archive', 'docs', 'adrs');
    fs.mkdirSync(docsDir, { recursive: true });
    fs.mkdirSync(adrsDir, { recursive: true });

    fs.writeFileSync(path.join(docsDir, 'test1.md'), '# Title 1\nThis is a test document about flexsearch.');
    fs.writeFileSync(path.join(adrsDir, 'test2.md'), '# Title 2\nAnother document about indexing adrs.');

    const index = buildDocumentationIndex(tmpDir);
    const results = index.search('flexsearch');

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].result).toContain(path.join(docsDir, 'test1.md'));

    const adrResults = index.search('indexing');
    expect(adrResults.length).toBeGreaterThan(0);
    expect(adrResults[0].result).toContain(path.join(adrsDir, 'test2.md'));

    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  describe('buildQuery', () => {
    it('should build a query from provided frontmatter fields', () => {
      const frontmatter: NodeFrontmatter = {
        id: 'test',
        type: 'TASK',
        title: 'Implement Query Formulation Logic',
        status: 'READY',
        owner_persona: 'coder',
        created_at: '2026-10-07',
        updated_at: '2026-10-07',
        depends_on: [],
        jules_session_id: null,
        locks: [],
        tags: ['query', 'impl'],
        layers: ['typescript']
      };

      const query = buildQuery(frontmatter);
      expect(query).toBe('Implement Query Formulation Logic TASK coder query impl typescript');
    });

    it('should handle missing optional fields', () => {
      const frontmatter: NodeFrontmatter = {
        id: 'test-2',
        type: 'IDEA',
        title: 'Simple Idea',
        status: 'PENDING',
        owner_persona: 'product_manager',
        created_at: '2026-10-07',
        updated_at: '2026-10-07',
        depends_on: [],
        jules_session_id: null,
        locks: []
      };

      const query = buildQuery(frontmatter);
      expect(query).toBe('Simple Idea IDEA product_manager');
    });
  });
});
