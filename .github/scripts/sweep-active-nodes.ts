import * as fs from 'node:fs';
import * as path from 'node:path';
import { createRequire } from 'node:module';

const _require = createRequire(import.meta.url);
const matter = _require('gray-matter') as typeof import('gray-matter');

export function sweepActiveNodes(repoRoot: string): string[] {
  const foundryDir = path.join(repoRoot, '.foundry');
  if (!fs.existsSync(foundryDir)) {
    return [];
  }

  const results: string[] = [];

  function walk(current: string): void {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      return;
    }

    for (const e of entries) {
      if (e.isDirectory()) {
        walk(path.join(current, e.name));
      } else if (e.isFile() && e.name.endsWith('.md')) {
        results.push(path.join(current, e.name));
      }
    }
  }

  walk(foundryDir);

  const activeNodes: string[] = [];

  for (const fp of results) {
    try {
      const content = fs.readFileSync(fp, 'utf-8');
      const parsed = matter(content);
      if (parsed.data && parsed.data['status'] === 'ACTIVE') {
        const relativePath = path.relative(repoRoot, fp);
        activeNodes.push(relativePath);
      }
    } catch {
      // Ignore parse errors
    }
  }

  return activeNodes;
}
