import { describe, test, expect, beforeEach, afterEach}  from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { buildDocumentationIndex, buildQuery, extractRelevantChunks } from './flexsearch-utils.ts';
import { type NodeFrontmatter } from './schema.ts';

describe('RAG Dynamic Querying Integration and E2E', () => {
    let tmpDir: string;

    beforeEach(() => {
        tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rag-e2e-'));
        const docsDir = path.join(tmpDir, '.foundry', 'docs');
        const adrsDir = path.join(tmpDir, '.foundry', 'archive', 'docs', 'adrs');
        fs.mkdirSync(docsDir, { recursive: true });
        fs.mkdirSync(adrsDir, { recursive: true });

        // Create some documents
        fs.writeFileSync(path.join(docsDir, 'doc1.md'), '# React State\nThis document explains how React state works and how to hydrate it.');
        fs.writeFileSync(path.join(docsDir, 'doc2.md'), '# TypeScript Types\nThis document is about TypeScript interfaces and types.');
        fs.writeFileSync(path.join(adrsDir, 'adr1.md'), '# ADR 001: Storage\nWe use IndexedDB for offline storage and telemetry.');
    });

    afterEach(() => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
    });

    test('End-to-End flow: build index, build query, extract chunks', () => {
        // 1. Build index
        const index = buildDocumentationIndex(tmpDir);

        // 2. Build query from frontmatter
        const frontmatter: Partial<NodeFrontmatter> = {
            title: 'Implement React State Hydration',
            type: 'TASK' as any,
            tags: ['React', 'State'],
            layers: ['Frontend']
        };
        const query = buildQuery(frontmatter);
        expect(query).toBe('Implement React State Hydration TASK React State Frontend');

        // 3. Extract relevant chunks
        // the flexsearch library does an exact match for default indexing unless a different tokenizer is used. Let's just query one of the matching words.
        const chunks = extractRelevantChunks(index, "React", 2);

        // The chunk should contain content from doc1.md
        expect(chunks).toContain('# React State\nThis document explains how React state works and how to hydrate it.');
        // Should not contain unrelated docs
        expect(chunks).not.toContain('TypeScript interfaces');
    });

    test('End-to-End flow with storage tag', () => {
        const index = buildDocumentationIndex(tmpDir);
        const chunks = extractRelevantChunks(index, "IndexedDB", 1);
        expect(chunks).toContain('# ADR 001: Storage\nWe use IndexedDB for offline storage and telemetry.');
    });
});
