/**
 * clean-jules-sessions.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Autonomous maintenance script for harvesting, inspecting, and deleting
 * historical and stuck Jules sessions to restore Jules web UI performance
 * and prevent concurrency saturation.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { deleteJulesSession, getSessionDetails, getSessionActivities } from './session-api.ts';


export interface CleanOptions {
  mode: 'all' | 'stuck-only';
  limit?: number;
  dryRun?: boolean;
  julesKey: string;
  githubToken?: string;
  repoFullName?: string;
  repoRoot?: string;
  rateLimitPerMin?: number;
}

export interface CleanResult {
  totalHarvested: number;
  totalSafe: number;
  totalCandidates: number;
  totalDeleted: number;
  totalSkipped: number;
  errors: number;
}

const KNOWN_SAFE_SESSIONS = new Set([
  '3832943666399001335',  // PR #8797
  '11365892075984344241', // PR #8808
  '15654756882712595326', // PR #8809
]);

/**
 * Harvests all 18-20 digit Jules session IDs from git log, local files,
 * harvested sources list, and foundry nodes.
 */
export function harvestAllSessionIds(repoRoot: string): Set<string> {
  const sessionIds = new Set<string>();
  const idRegex = /\b\d{18,20}\b/g;

  // 1. Harvest from harvested files first (e.g. jules_source_session_ids.txt)
  // This prioritizes sessions known to exist in the Jules API sources!
  const candidateFiles = [
    'jules_source_session_ids.txt',
    'sep_ids.txt',
    'september_sessions.json',
    'active_or_stuck_september.json',
    'ACTIVE_SESSIONS.md',
  ];

  for (const filename of candidateFiles) {
    const filePath = path.join(repoRoot, filename);
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const matches = content.match(idRegex);
        if (matches) {
          for (const m of matches) sessionIds.add(m);
        }
      } catch {
        // Ignore read errors
      }
    }
  }

  // 2. Harvest from git log commit messages & bodies
  try {
    const gitLog = execSync('git log --all --format="%s %b"', {
      cwd: repoRoot,
      encoding: 'utf-8',
      maxBuffer: 50 * 1024 * 1024,
    });
    const matches = gitLog.match(idRegex);
    if (matches) {
      for (const m of matches) sessionIds.add(m);
    }
  } catch {
    // Git log harvesting failed or not a git repo, continue
  }


  // 3. Harvest from .foundry markdown frontmatter
  const foundryDir = path.join(repoRoot, '.foundry');
  if (fs.existsSync(foundryDir)) {
    const scanDir = (dir: string) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          scanDir(fullPath);
        } else if (entry.name.endsWith('.md')) {
          try {
            const raw = fs.readFileSync(fullPath, 'utf-8');
            const matches = raw.match(idRegex);
            if (matches) {
              for (const m of matches) sessionIds.add(m);
            }
          } catch {
            // Ignore individual file read error
          }
        }
      }
    };
    scanDir(foundryDir);
  }

  return sessionIds;
}

/**
 * Discovers session IDs that must NOT be deleted (e.g. active PRs or ACTIVE nodes).
 */
export async function getSafeSessionIds(
  repoRoot: string,
  repoFullName = 'szubster/dexhelper',
  githubToken?: string
): Promise<Set<string>> {
  const safeIds = new Set<string>(KNOWN_SAFE_SESSIONS);
  const idRegex = /\b\d{18,20}\b/g;

  // 1. Protect active / verifying / ready nodes in .foundry
  const foundryDir = path.join(repoRoot, '.foundry');
  if (fs.existsSync(foundryDir)) {
    const scanDir = (dir: string) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          scanDir(fullPath);
        } else if (entry.name.endsWith('.md')) {
          try {
            const raw = fs.readFileSync(fullPath, 'utf-8');
            const parsed = matter(raw);
            const status = parsed.data?.status;
            const sessionId = parsed.data?.jules_session_id;
            if (['ACTIVE', 'VERIFYING', 'READY'].includes(status) && sessionId && sessionId !== '123') {
              safeIds.add(String(sessionId).trim());
            }
          } catch {
            // Ignore error
          }
        }
      }
    };
    scanDir(foundryDir);
  }

  // 2. Fetch open PRs from GitHub if token is provided
  if (githubToken) {
    try {
      const res = await fetch(`https://api.github.com/repos/${repoFullName}/pulls?state=open&per_page=100`, {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
      if (res.ok) {
        const prs = (await res.json()) as any[];
        if (Array.isArray(prs)) {
          for (const pr of prs) {
            const textToScan = `${pr.title || ''} ${pr.body || ''} ${pr.head?.ref || ''}`;
            const matches = textToScan.match(idRegex);
            if (matches) {
              for (const m of matches) safeIds.add(m);
            }
          }
        }
      }
    } catch {
      // Remote GitHub fetch failed, keep fallback safeIds
    }
  }

  return safeIds;
}

/**
 * Runs the session cleanup pipeline.
 */
export async function cleanJulesSessions(options: CleanOptions): Promise<CleanResult> {
  const repoRoot = options.repoRoot || process.cwd();
  const repoFullName = options.repoFullName || process.env.GITHUB_REPOSITORY || 'szubster/dexhelper';
  const dryRun = options.dryRun ?? false;
  const limit = options.limit && options.limit > 0 ? options.limit : Infinity;
  const rateLimitPerMin = options.rateLimitPerMin || 100;
  const delayBetweenReqsMs = Math.ceil(60000 / rateLimitPerMin);

  console.log(`[clean-sessions] Harvesting all session IDs from git log and .foundry...`);
  const allHarvested = harvestAllSessionIds(repoRoot);
  console.log(`[clean-sessions] Harvested ${allHarvested.size} total unique session IDs.`);

  console.log(`[clean-sessions] Identifying safe / active PR sessions...`);
  const safeIds = await getSafeSessionIds(repoRoot, repoFullName, options.githubToken);
  console.log(`[clean-sessions] Identified ${safeIds.size} protected session IDs.`);

  const deletedTrackerPath = path.join(repoRoot, 'deleted_sessions.txt');
  const alreadyDeleted = new Set<string>();
  if (fs.existsSync(deletedTrackerPath)) {
    try {
      const lines = fs.readFileSync(deletedTrackerPath, 'utf-8').split('\n').map(l => l.trim()).filter(Boolean);
      for (const l of lines) alreadyDeleted.add(l);
    } catch {
      // Ignore read error
    }
  }

  const candidates: string[] = [];
  for (const id of allHarvested) {
    if (!safeIds.has(id) && !alreadyDeleted.has(id)) {
      candidates.push(id);
    }
  }

  console.log(`[clean-sessions] Mode: ${options.mode} | Target candidates: ${candidates.length} (Limit: ${limit === Infinity ? 'None' : limit}, Already Deleted: ${alreadyDeleted.size})`);

  let totalDeleted = 0;
  let totalSkipped = 0;
  let errors = 0;

  for (const sessionId of candidates) {
    if (totalDeleted >= limit) {
      console.log(`[clean-sessions] Reached limit of ${limit} deleted sessions. Stopping.`);
      break;
    }

    try {
      if (options.mode === 'stuck-only') {
        const details = await getSessionDetails(sessionId, options.julesKey);
        if (!details) {
          // 404 or already deleted
          totalSkipped++;
          continue;
        }

        const state = details.state;
        const isStuckCandidate =
          state === 'AWAITING_USER_FEEDBACK' ||
          state === 'IN_PROGRESS' ||
          state === 'PLANNING' ||
          state === 'QUEUED';

        if (!isStuckCandidate) {
          totalSkipped++;
          continue;
        }

        if (state === 'AWAITING_USER_FEEDBACK') {
          console.log(`[clean-sessions] Session ${sessionId} in AWAITING_USER_FEEDBACK -> Deleting.`);
        } else {
          // Check activities
          const activities = await getSessionActivities(sessionId, options.julesKey);
          if (activities.length > 0) {
            totalSkipped++;
            continue;
          }
          console.log(`[clean-sessions] Session ${sessionId} stuck with 0 activities -> Deleting.`);
        }
      }

      if (dryRun) {
        console.log(`[clean-sessions] [DRY-RUN] Would delete session: ${sessionId}`);
        totalDeleted++;
      } else {
        const success = await deleteJulesSession(sessionId, options.julesKey);
        if (success) {
          totalDeleted++;
          try {
            fs.appendFileSync(deletedTrackerPath, `${sessionId}\n`);
          } catch {
            // Ignore append error
          }
          if (totalDeleted % 25 === 0) {
            console.log(`[clean-sessions] Progress: Deleted ${totalDeleted}/${limit === Infinity ? 'all' : limit} sessions...`);
          }
        } else {
          errors++;
        }
      }


      // Respect rate limit pacing
      if (delayBetweenReqsMs > 0) {
        await new Promise(resolve => setTimeout(resolve, delayBetweenReqsMs));
      }
    } catch (err) {
      console.error(`[clean-sessions] Error processing session ${sessionId}:`, err);
      errors++;
    }
  }

  console.log(`[clean-sessions] Summary: Harvested: ${allHarvested.size} | Protected: ${safeIds.size} | Deleted: ${totalDeleted} | Skipped: ${totalSkipped} | Errors: ${errors}`);

  return {
    totalHarvested: allHarvested.size,
    totalSafe: safeIds.size,
    totalCandidates: candidates.length,
    totalDeleted,
    totalSkipped,
    errors,
  };
}

// ─── CLI Entrypoint ──────────────────────────────────────────────────────────

async function runCli(): Promise<void> {
  const args = process.argv.slice(2);
  const isAll = args.includes('--all');
  const dryRun = args.includes('--dry-run');

  let limit = 500;
  const limitIdx = args.indexOf('--limit');
  if (limitIdx !== -1 && args[limitIdx + 1]) {
    limit = parseInt(args[limitIdx + 1], 10);
  }

  let rateLimitPerMin = 120;
  const rateIdx = args.indexOf('--rate-limit');
  if (rateIdx !== -1 && args[rateIdx + 1]) {
    rateLimitPerMin = parseInt(args[rateIdx + 1], 10);
  }

  let julesKey = process.env.JULES_API_KEY;
  const keyIdx = args.indexOf('--key');
  if (keyIdx !== -1 && args[keyIdx + 1]) {
    julesKey = args[keyIdx + 1];
  }

  const githubToken = process.env.GITHUB_TOKEN;

  if (!julesKey) {
    console.error('Error: JULES_API_KEY must be provided via env or --key argument.');
    process.exit(1);
  }

  const mode = isAll ? 'all' : 'stuck-only';

  const result = await cleanJulesSessions({
    mode,
    limit,
    dryRun,
    julesKey,
    githubToken,
    rateLimitPerMin,
  });


  if (result.errors > 0 && result.totalDeleted === 0) {
    process.exit(1);
  }
}

const currentFilePath = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(currentFilePath)) {
  runCli().catch(err => {
    console.error('Fatal error in clean-jules-sessions:', err);
    process.exit(1);
  });
}
