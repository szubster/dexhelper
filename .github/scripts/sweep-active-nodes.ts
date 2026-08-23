import * as fs from 'node:fs';
import * as path from 'node:path';
import { createRequire } from 'node:module';
import { NodeFrontmatterSchema } from './schema.ts';

const _require = createRequire(import.meta.url);
const matter = _require('gray-matter') as typeof import('gray-matter');

export function sweepActiveNodes(repoRoot: string, dryRun: boolean = false): string[] {
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
        if (e.name === 'archive' && current === foundryDir) {
          continue;
        }
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
      const parseResult = NodeFrontmatterSchema.safeParse(parsed.data);

      if (!parseResult.success) {
        continue;
      }

      const status = parseResult.data.status;

      if (status === 'ACTIVE') {
        const relativePath = path.relative(repoRoot, fp);
        activeNodes.push(relativePath);
      } else if ((status === 'COMPLETED' || status === 'CANCELLED') && !dryRun) {
        // Move file to archive preserving structure
        // e.g. .foundry/tasks/task.md -> .foundry/archive/tasks/task.md
        const relativeToFoundry = path.relative(foundryDir, fp);
        const archivePath = path.join(foundryDir, 'archive', relativeToFoundry);
        const archiveDir = path.dirname(archivePath);

        fs.mkdirSync(archiveDir, { recursive: true });
        fs.renameSync(fp, archivePath);
      }
    } catch {
      // Ignore parse errors
    }
  }

  return activeNodes;
}
