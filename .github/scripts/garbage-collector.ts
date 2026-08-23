/**
 * garbage-collector.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Standalone script to detect and auto-remediate zombie nodes in the Foundry DAG.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { sweepActiveNodes } from './sweep-active-nodes.ts';
import { checkSessionLiveliness } from './session-api.ts';
import { remediateZombieNode } from './remediate-zombie.ts';

const require = createRequire(import.meta.url);
const matter = require('gray-matter') as typeof import('gray-matter');

export async function main() {
  const julesKey = process.env.JULES_API_KEY;
  if (!julesKey) {
    console.warn('Missing JULES_API_KEY. Cannot verify session liveliness.');
    process.exit(0);
  }

  const dryRun = process.argv.includes('--dry-run');
  const dryTag = dryRun ? '[DRY-RUN] ' : '';

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const repoRoot = path.resolve(__dirname, '..', '..');

  // Sweep for active nodes
  const activeNodePaths = sweepActiveNodes(repoRoot, dryRun);

  for (const relativePath of activeNodePaths) {
    const fullPath = path.join(repoRoot, relativePath);
    try {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const parsed = matter(content);
      const data = parsed.data;

      // Skip nodes assigned to human or special personas
      if (['human', 'tpm', 'agile_coach', 'mechanic'].includes(data.owner_persona)) {
        continue;
      }

      const sessionId = data.jules_session_id;

      if (!sessionId) {
        console.info(`[GC] ${dryTag}Remediating node ${relativePath}: Missing jules_session_id`);
        remediateZombieNode(repoRoot, relativePath, 'Zombie node detected: Missing jules_session_id in ACTIVE state', dryRun);
        continue;
      }

      // Check session liveliness via Jules API
      const liveliness = await checkSessionLiveliness(sessionId, julesKey);

      if (liveliness === 'TERMINATED') {
        console.info(`[GC] ${dryTag}Remediating node ${relativePath}: Session ${sessionId} is TERMINATED`);
        remediateZombieNode(repoRoot, relativePath, `Zombie node detected: Session ${sessionId} is TERMINATED`, dryRun);
      }
    } catch (err) {
      console.error(`[GC] Error processing node ${relativePath}:`, err);
    }
  }
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('garbage-collector.ts')) {
  main().catch(err => {
    console.error('Fatal GC error:', err);
    process.exit(1);
  });
}
