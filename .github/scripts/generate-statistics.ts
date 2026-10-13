import * as fs from 'node:fs';
import * as path from 'node:path';
import { aggregateNodeStatistics, extractPRMetrics } from './utils/statistics.ts';

export function generateStatistics(repoRoot: string) {
  const nodeStats = aggregateNodeStatistics(repoRoot);
  const prStats = extractPRMetrics();

  const data = {
    nodes: nodeStats,
    prs: prStats || { totalPRs: 0, openPRs: 0, mergedPRs: 0, closedPRs: 0 },
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync(path.join(repoRoot, 'foundry-statistics.json'), JSON.stringify(data, null, 2));

  let md = `# Foundry System Statistics\n\n`;
  md += `*Generated at: ${data.timestamp}*\n\n`;

  md += `## Node Statistics\n\n`;
  md += `### By Type\n`;
  md += `| Type | Count |\n|---|---|\n`;
  for (const [type, count] of Object.entries(nodeStats.byType)) {
    md += `| ${type} | ${count} |\n`;
  }
  md += `\n### By Status\n`;
  md += `| Status | Count |\n|---|---|\n`;
  for (const [status, count] of Object.entries(nodeStats.byStatus)) {
    md += `| ${status} | ${count} |\n`;
  }

  if (data.prs) {
    md += `\n## PR Metrics\n\n`;
    md += `| Metric | Count |\n|---|---|\n`;
    md += `| Total PRs | ${data.prs.totalPRs} |\n`;
    md += `| Open PRs | ${data.prs.openPRs} |\n`;
    md += `| Merged PRs | ${data.prs.mergedPRs} |\n`;
    md += `| Closed PRs | ${data.prs.closedPRs} |\n`;
  }

  fs.writeFileSync(path.join(repoRoot, 'foundry-statistics.md'), md);
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const repoRoot = path.resolve(process.cwd());
  generateStatistics(repoRoot);
}
