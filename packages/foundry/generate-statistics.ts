import * as fs from 'node:fs';
import * as path from 'node:path';
import { aggregateNodeStatistics, extractPRMetrics } from './utils/statistics.ts';

export function generateStatistics(repoRoot: string) {
  const nodeStats = aggregateNodeStatistics(repoRoot);
  const prStats = extractPRMetrics(repoRoot);

  const data = {
    nodes: nodeStats,
    prs: prStats,
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

  if (nodeStats.rejectionCounts && Object.keys(nodeStats.rejectionCounts).length > 0) {
    md += `\n## Rejection Counts\n\n`;
    md += `| Node | Rejections |\n|---|---|\n`;
    const sortedRejections = Object.entries(nodeStats.rejectionCounts).sort((a, b) => b[1] - a[1]);
    for (const [node, count] of sortedRejections) {
      if (count > 0) {
         md += `| ${node} | ${count} |\n`;
      }
    }
  }

  if (nodeStats.waitTimes && Object.keys(nodeStats.waitTimes).length > 0) {
    md += `\n## Wait Times\n\n`;
    md += `| Node | Wait Time (ms) |\n|---|---|\n`;
    const sortedWaitTimes = Object.entries(nodeStats.waitTimes).sort((a, b) => b[1] - a[1]).slice(0, 50); // top 50
    for (const [node, time] of sortedWaitTimes) {
      md += `| ${node} | ${time} |\n`;
    }
  }

  fs.writeFileSync(path.join(repoRoot, 'foundry-statistics.md'), md);
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const repoRoot = path.resolve(process.cwd());
  generateStatistics(repoRoot);
}
