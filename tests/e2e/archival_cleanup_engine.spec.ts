import * as fs from 'node:fs';
import { createRequire } from 'node:module';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';
import { filterArchivalNodes } from '../../packages/foundry/archival-filtering';
import { createValidTestNode } from '../../packages/foundry/foundry-test-utils';
import { type NodeFrontmatter, NodeFrontmatterSchema } from '../../packages/foundry/schema';
import { createMockFoundry } from './fixtures/mock-foundry';

const matter = createRequire(import.meta.url)('gray-matter');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createNodeFile(
  baseDir: string,
  type: 'TASK' | 'STORY' | 'EPIC' | 'IDEA' | 'ADR' | 'PRD' | 'RESEARCH',
  id: string,
  updatedAt: string,
  isArchived: boolean = true,
) {
  const status = isArchived ? 'COMPLETED' : 'ACTIVE';
  const filePath = `.foundry/${isArchived ? 'archive/' : ''}${type.toLowerCase()}s/${id}.md`;
  createValidTestNode(
    baseDir,
    filePath,
    {
      id,
      type,
      status,
      title: `Dummy ${type}`,
      updated_at: updatedAt,
    },
    'Body of the node.',
  );
  return filePath;
}

function discoverArchivedNodes(baseDir: string): NodeFrontmatter[] {
  const archiveDir = path.join(baseDir, '.foundry', 'archive');
  if (!fs.existsSync(archiveDir)) return [];

  const nodes: NodeFrontmatter[] = [];
  function walk(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const parsed = matter(content);
        try {
          nodes.push(NodeFrontmatterSchema.parse(parsed.data));
        } catch {}
      }
    }
  }
  walk(archiveDir);
  return nodes;
}

test.describe('Archival Cleanup Engine', () => {
  let tmpDir: string;
  let now: Date;

  test.beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(__dirname, 'tmp-archival-cleanup-'));
    createMockFoundry(tmpDir);
    now = new Date('2023-04-02T00:00:00Z');
  });

  test.afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('should correctly identify and prune nodes older than 90 days from the file system', () => {
    createNodeFile(tmpDir, 'TASK', 'old-node-1', '2022-12-01T00:00:00Z'); // > 90 days
    createNodeFile(tmpDir, 'TASK', 'recent-node-2', '2023-03-15T00:00:00Z'); // < 90 days
    createNodeFile(tmpDir, 'STORY', 'old-node-3', '2023-01-01T00:00:00Z'); // 91 days

    // Nodes that haven't been archived yet should not be pruned
    createNodeFile(tmpDir, 'TASK', 'old-active-node', '2022-12-01T00:00:00Z', false);

    const archivedNodes = discoverArchivedNodes(tmpDir);
    const nodesToPrune = filterArchivalNodes(archivedNodes, now);

    expect(nodesToPrune.length).toBeGreaterThanOrEqual(2);

    const prunedIds = nodesToPrune.map((n) => n.id);
    expect(prunedIds).toContain('old-node-1');
    expect(prunedIds).toContain('old-node-3');
    expect(prunedIds).not.toContain('recent-node-2');
    expect(prunedIds).not.toContain('old-active-node');

    // Actually delete them from FS like an engine would
    for (const node of nodesToPrune) {
      // simulate deletion for the test
      const filePaths = [
        path.join(tmpDir, '.foundry', 'archive', `${node.type.toLowerCase()}s`, `${node.id}.md`),
        path.join(
          tmpDir,
          '.foundry',
          'archive',
          node.type === 'STORY' ? 'stories' : `${node.type.toLowerCase()}s`,
          `${node.id}.md`,
        ),
      ];

      for (const p of filePaths) {
        if (fs.existsSync(p)) fs.unlinkSync(p);
      }
    }

    // Verify they are gone
    const remainingArchivedNodes = discoverArchivedNodes(tmpDir);
    const remainingIds = remainingArchivedNodes.map((n) => n.id);
    expect(remainingIds).not.toContain('old-node-1');
    expect(remainingIds).not.toContain('old-node-3');
    expect(remainingIds).toContain('recent-node-2');
  });

  test('should retain high-value nodes regardless of age', () => {
    createNodeFile(tmpDir, 'ADR', 'old-adr-1', '2020-01-01T00:00:00Z');
    createNodeFile(tmpDir, 'PRD', 'old-prd-1', '2020-01-01T00:00:00Z');
    createNodeFile(tmpDir, 'RESEARCH', 'old-research-1', '2020-01-01T00:00:00Z');
    createNodeFile(tmpDir, 'TASK', 'old-task-1', '2020-01-01T00:00:00Z');

    const archivedNodes = discoverArchivedNodes(tmpDir);
    const nodesToPrune = filterArchivalNodes(archivedNodes, now);

    const prunedIds = nodesToPrune.map((n) => n.id);
    expect(prunedIds).toContain('old-task-1');
    expect(prunedIds).not.toContain('old-adr-1');
    expect(prunedIds).not.toContain('old-prd-1');
    expect(prunedIds).not.toContain('old-research-1');
  });

  test('should respect the maximum limit of 50 deletions per run', () => {
    for (let i = 0; i < 60; i++) {
      createNodeFile(
        tmpDir,
        'TASK',
        `bulk-old-node-${i}`,
        `2022-01-${String((i % 28) + 1).padStart(2, '0')}T00:00:00Z`,
      );
    }

    const archivedNodes = discoverArchivedNodes(tmpDir);
    const nodesToPrune = filterArchivalNodes(archivedNodes, now);

    expect(nodesToPrune.length).toBeLessThanOrEqual(50);
  });
});
