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

import { execSync } from 'node:child_process';

export interface PRMetrics {
  totalPRs: number;
  openPRs: number;
  mergedPRs: number;
  closedPRs: number;
}

export function extractPRMetrics(): PRMetrics | null {
  try {
    const output = execSync('gh pr list --state all --json state', { encoding: 'utf-8' });
    const prs = JSON.parse(output);
    const metrics: PRMetrics = {
      totalPRs: prs.length,
      openPRs: prs.filter((pr: any) => pr.state === 'OPEN').length,
      mergedPRs: prs.filter((pr: any) => pr.state === 'MERGED').length,
      closedPRs: prs.filter((pr: any) => pr.state === 'CLOSED').length
    };
    return metrics;
  } catch (err) {
    console.error("Failed to fetch PR metrics", err);
    return null;
  }
}
