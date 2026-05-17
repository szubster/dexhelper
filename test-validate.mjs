import { discoverNodeFiles, parseNodeFile } from './.github/scripts/foundry-orchestrator.ts';
import path from 'node:path';

const repoRoot = process.cwd();
const files = discoverNodeFiles(path.join(repoRoot, '.foundry'));
const issues = [];
for (const file of files) {
  const node = parseNodeFile(file, repoRoot);
  if (!node) {
    issues.push(`Failed to parse: ${file}`);
  } else {
    if (!node.frontmatter.id) issues.push(`Missing ID: ${file}`);
    if (!node.frontmatter.owner_persona) issues.push(`Missing owner: ${file}`);
  }
}
console.log(issues.length ? issues : "All nodes valid!");
