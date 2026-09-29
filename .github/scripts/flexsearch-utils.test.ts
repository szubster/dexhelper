import { describe, it, expect } from 'vitest';
import { buildDocumentationIndex } from './flexsearch-utils.ts';
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
});
