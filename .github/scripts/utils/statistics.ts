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
    // Check if gh is installed first to avoid throwing unhandled if not in CI
    try {
      execSync('gh --version', { encoding: 'utf-8', stdio: 'ignore' });
    } catch {
      return null;
    }
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

export function generateStatisticsReport(repoRoot: string): void {
  const nodes = aggregateNodeStatistics(repoRoot);
  const prs = extractPRMetrics() || { totalPRs: 0, openPRs: 0, mergedPRs: 0, closedPRs: 0 };

  const combined = {
    timestamp: new Date().toISOString(),
    nodes,
    prs
  };

  const jsonPath = path.join(repoRoot, 'foundry-statistics.json');
  fs.writeFileSync(jsonPath, JSON.stringify(combined, null, 2), 'utf-8');

  let mdContent = `# Foundry System Statistics\n\n`;
  mdContent += `*Generated at: ${combined.timestamp}*\n\n`;

  mdContent += `## Node Statistics\n\n`;
  mdContent += `### By Type\n`;
  for (const [type, count] of Object.entries(nodes.byType)) {
    mdContent += `- **${type}**: ${count}\n`;
  }
  mdContent += `\n### By Status\n`;
  for (const [status, count] of Object.entries(nodes.byStatus)) {
    mdContent += `- **${status}**: ${count}\n`;
  }

  mdContent += `\n## PR Metrics\n\n`;
  mdContent += `- **Total PRs**: ${prs.totalPRs}\n`;
  mdContent += `- **Open PRs**: ${prs.openPRs}\n`;
  mdContent += `- **Merged PRs**: ${prs.mergedPRs}\n`;
  mdContent += `- **Closed PRs**: ${prs.closedPRs}\n`;

  const mdPath = path.join(repoRoot, 'foundry-statistics.md');
  fs.writeFileSync(mdPath, mdContent, 'utf-8');
}
