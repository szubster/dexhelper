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

export function extractPRMetrics(repoRoot?: string): PRMetrics | null {
  try {
    const output = execSync('gh pr list --state all --json state', { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] });
    const prs = JSON.parse(output);
    const metrics: PRMetrics = {
      totalPRs: prs.length,
      openPRs: prs.filter((pr: any) => pr.state === 'OPEN').length,
      mergedPRs: prs.filter((pr: any) => pr.state === 'MERGED').length,
      closedPRs: prs.filter((pr: any) => pr.state === 'CLOSED').length
    };
    return metrics;
  } catch (err) {
    if (repoRoot && fs.existsSync(path.join(repoRoot, '.foundry'))) {
      try {
        const prMap = new Map<number, string>();
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
              if (entry.name === 'journals' || entry.name === 'fixtures' || entry.name === 'knowledge_base') continue;
              walk(fullPath);
            } else if (entry.isFile() && entry.name.endsWith('.md')) {
              try {
                const raw = fs.readFileSync(fullPath, 'utf-8');
                const parsed = matter(raw);
                if (parsed.data && parsed.data.pr_number && typeof parsed.data.pr_number === 'number') {
                  prMap.set(parsed.data.pr_number, parsed.data.status || 'ACTIVE');
                }
              } catch {
                // ignore invalid files
              }
            }
          }
        }

        walk(foundryDir);

        let open = 0;
        let merged = 0;
        let closed = 0;
        for (const status of prMap.values()) {
          if (status === 'COMPLETED') {
            merged++;
          } else if (status === 'CANCELLED' || status === 'FAILED') {
            closed++;
          } else {
            open++;
          }
        }

        // Also check git log commit history for merged PR numbers (e.g. "Merge pull request #123" or "(#123)")
        try {
          const gitLogOutput = execSync('git log --format="%s"', { cwd: repoRoot, encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] });
          const prRegex = /(?:Merge pull request #|#)(\d+)/g;
          let match;
          while ((match = prRegex.exec(gitLogOutput)) !== null) {
            const num = parseInt(match[1], 10);
            if (!prMap.has(num)) {
              prMap.set(num, 'COMPLETED');
              merged++;
            }
          }
        } catch {
          // ignore git log errors
        }

        if (prMap.size > 0) {
          return {
            totalPRs: prMap.size,
            openPRs: open,
            mergedPRs: merged,
            closedPRs: closed,
          };
        }
      } catch {
        // ignore fallback errors
      }
    }
    console.error("Failed to fetch PR metrics", err);
    return null;
  }
}
