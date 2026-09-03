import * as fs from 'node:fs';
import * as path from 'node:path';
import { createRequire } from 'node:module';
import { NodeFrontmatterSchema, type NodeFrontmatter } from './schema.ts';

const require = createRequire(import.meta.url);
const matter = require('gray-matter') as typeof import('gray-matter');

export interface EpicNode {
  frontmatter: NodeFrontmatter;
  repoPath: string;
}

export function getCompletedEpics(repoRoot: string): EpicNode[] {
  const epicsDir = path.join(repoRoot, '.foundry', 'epics');
  if (!fs.existsSync(epicsDir)) {
    return [];
  }

  const completedEpics: EpicNode[] = [];
  const entries = fs.readdirSync(epicsDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.md')) {
      const fullPath = path.join(epicsDir, entry.name);
      try {
        const rawContent = fs.readFileSync(fullPath, 'utf-8');
        const parsed = matter(rawContent);
        const frontmatter = NodeFrontmatterSchema.parse(parsed.data);

        if (frontmatter.type === 'EPIC' && frontmatter.status === 'COMPLETED') {
          completedEpics.push({
            frontmatter,
            repoPath: path.relative(repoRoot, fullPath).replace(/\\/g, '/'),
          });
        }
      } catch (error) {
        console.warn(`Failed to parse node at ${fullPath}:`, error);
      }
    }
  }

  return completedEpics;
}
