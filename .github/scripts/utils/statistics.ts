import * as fs from 'node:fs';
import * as path from 'node:path';
import matter from 'gray-matter';

export interface NodeStatistics {
  byType: Record<string, number>;
  byStatus: Record<string, number>;
}

export function aggregateNodeStatistics(repoRoot: string): NodeStatistics {
  const stats: NodeStatistics = {
    byType: {},
    byStatus: {},
  };

  const foundryDir = path.join(repoRoot, '.foundry');

  function walk(current: string): void {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);

      if (entry.isDirectory()) {
        // Skip irrelevant directories like journals, fixtures
        if (entry.name === 'journals' || entry.name === 'fixtures' || entry.name === 'knowledge_base') continue;
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        try {
          const raw = fs.readFileSync(fullPath, 'utf-8');
          const parsed = matter(raw);

          if (parsed.data && parsed.data.type && parsed.data.status) {
            const type = parsed.data.type;
            const status = parsed.data.status;

            stats.byType[type] = (stats.byType[type] || 0) + 1;
            stats.byStatus[status] = (stats.byStatus[status] || 0) + 1;
          }
        } catch {
          // ignore malformed files
        }
      }
    }
  }

  if (fs.existsSync(foundryDir)) {
    walk(foundryDir);
  }

  return stats;
}
