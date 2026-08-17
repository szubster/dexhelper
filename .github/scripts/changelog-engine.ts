/**
 * changelog-engine.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Engine script for changelog backfill and continuous maintenance.
 * Leverages the standard Foundry Task Node lifecycle (.foundry/tasks/task-000-changelog-backfill.md).
 * Auto-detects non-idea sub-node/chore commits to fast-forward the pointer,
 * and re-opens the task node as READY with commit details for Jules session dispatching.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export interface ChangelogState {
  mode: 'backfill' | 'continuous';
  last_processed_commit: string | null;
  status: 'idle' | 'pending_jules' | 'completed' | 'error';
  last_updated?: string;
}

export interface CommitClassification {
  action: 'skip' | 'dispatch';
  reason: string;
  domain?: 'foundry' | 'dexhelper';
  ideaNode?: string;
}

const STATE_FILE_PATH = path.join(process.cwd(), '.foundry', 'changelog-state.json');
const TASK_NODE_PATH = path.join(process.cwd(), '.foundry', 'tasks', 'task-000-changelog-backfill.md');

export function loadState(statePath: string = STATE_FILE_PATH): ChangelogState {
  if (!fs.existsSync(statePath)) {
    return {
      mode: 'backfill',
      last_processed_commit: null,
      status: 'idle'
    };
  }
  try {
    const raw = fs.readFileSync(statePath, 'utf8');
    return JSON.parse(raw) as ChangelogState;
  } catch {
    return {
      mode: 'backfill',
      last_processed_commit: null,
      status: 'idle'
    };
  }
}

export function saveState(state: ChangelogState, statePath: string = STATE_FILE_PATH): void {
  state.last_updated = new Date().toISOString();
  const dir = path.dirname(statePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2) + '\n', 'utf8');
}

export function getCommitList(branch: string = 'main'): string[] {
  try {
    const output = execSync(`git rev-list --reverse ${branch}`, { encoding: 'utf8' });
    return output.trim().split('\n').filter(Boolean);
  } catch (err) {
    process.stderr.write(`[changelog-engine] Failed to get commit list for ${branch}: ${String(err)}\n`);
    return [];
  }
}

export interface CommitDetails {
  sha: string;
  message: string;
  files: string[];
}

export function getCommitDetails(sha: string): CommitDetails {
  try {
    const message = execSync(`git log -1 --format=%B ${sha}`, { encoding: 'utf8' }).trim();
    const filesRaw = execSync(`git diff-tree --no-commit-id --name-only -r ${sha}`, { encoding: 'utf8' });
    const files = filesRaw.trim().split('\n').filter(Boolean);
    return { sha, message, files };
  } catch (err) {
    process.stderr.write(`[changelog-engine] Error getting details for ${sha}: ${String(err)}\n`);
    return { sha, message: '', files: [] };
  }
}

export function classifyCommit(details: CommitDetails): CommitClassification {
  const { message, files } = details;

  if (files.length === 0) {
    return { action: 'skip', reason: 'Empty commit' };
  }

  // Check automated Foundry engine commit messages
  if (
    message.startsWith('Foundry: Transition') ||
    message.startsWith('Foundry: Promote') ||
    message.startsWith('Foundry: Auto-archive') ||
    message.startsWith('chore(dag):') ||
    message.startsWith('chore(task-') ||
    message.startsWith('chore(scribe):')
  ) {
    return { action: 'skip', reason: 'Automated Foundry DAG state or journal commit' };
  }

  // Check if touched files are exclusively Foundry sub-nodes (tasks, stories, epics, prds, journals, fixtures)
  const isOnlySubNodes = files.every((f) => {
    return (
      (f.startsWith('.foundry/tasks/') ||
        f.startsWith('.foundry/stories/') ||
        f.startsWith('.foundry/epics/') ||
        f.startsWith('.foundry/prds/') ||
        f.startsWith('.foundry/journals/') ||
        f.startsWith('.foundry/fixtures/') ||
        f.startsWith('.foundry/research/') ||
        f.startsWith('.foundry/archive/tasks/') ||
        f.startsWith('.foundry/archive/stories/') ||
        f.startsWith('.foundry/archive/epics/') ||
        f.startsWith('.foundry/archive/prds/')) &&
      !f.includes('idea-')
    );
  });

  if (isOnlySubNodes) {
    return { action: 'skip', reason: 'Non-idea Foundry sub-node lifecycle update' };
  }

  // Check if files are exclusively trivial maintenance/chore config files
  const trivialPatterns = [
    'pnpm-lock.yaml',
    'package-lock.json',
    '.gitignore',
    '.oxlintrc.json',
    '.nvmrc',
    'biome.jsonc',
    'codecov.yml',
    '.bundlemonrc.json',
    'knip.json',
    'lefthook.yml',
    '.github/workflows/actionlint.yml',
    '.github/workflows/biome.yml',
    '.github/changelog-state.json',
    '.foundry/changelog-state.json'
  ];

  const isOnlyTrivialFiles = files.every((f) => trivialPatterns.includes(f));
  const isChoreMessage =
    message.startsWith('chore') ||
    message.startsWith('ci') ||
    message.startsWith('style') ||
    message.startsWith('build') ||
    message.startsWith('test');

  if (isOnlyTrivialFiles || (isChoreMessage && isOnlyTrivialFiles)) {
    return { action: 'skip', reason: 'Trivial maintenance or chore configuration' };
  }

  // Check for IDEA node completions
  const ideaFile = files.find((f) => f.includes('.foundry/ideas/idea-') || f.includes('.foundry/archive/ideas/idea-'));
  if (ideaFile) {
    const filename = path.basename(ideaFile).toLowerCase();
    const msgLower = message.toLowerCase();
    const isFoundryDomain =
      filename.includes('foundry') ||
      filename.includes('orchestrator') ||
      filename.includes('persona') ||
      filename.includes('dag') ||
      filename.includes('zombie') ||
      filename.includes('journal') ||
      filename.includes('telemetry') ||
      msgLower.includes('foundry') ||
      msgLower.includes('orchestrator');

    return {
      action: 'dispatch',
      reason: 'IDEA node completion detected',
      domain: isFoundryDomain ? 'foundry' : 'dexhelper',
      ideaNode: ideaFile
    };
  }

  // Check for ad-hoc application code or foundry system changes
  const hasAppChanges = files.some(
    (f) =>
      f.startsWith('src/') ||
      f.startsWith('public/') ||
      f.startsWith('data/') ||
      f.startsWith('functions/') ||
      f === 'index.html' ||
      f === 'vite.config.ts' ||
      f === 'package.json'
  );

  const hasFoundryEngineChanges = files.some(
    (f) => f.startsWith('.github/scripts/') || f.startsWith('.github/workflows/') || f.startsWith('.github/agents/')
  );

  if (hasAppChanges) {
    return {
      action: 'dispatch',
      reason: 'Ad-hoc user-facing Dexhelper code modification',
      domain: 'dexhelper'
    };
  }

  if (hasFoundryEngineChanges) {
    return {
      action: 'dispatch',
      reason: 'Ad-hoc Foundry system code modification',
      domain: 'foundry'
    };
  }

  return { action: 'skip', reason: 'Non-critical repo modification' };
}

export function determineSemverBump(message: string): 'major' | 'minor' | 'patch' {
  const msgLower = message.toLowerCase();
  if (msgLower.includes('breaking change') || msgLower.includes('breaking-change') || /^[a-z]+(\([a-z0-9_.-]+\))?!:/.test(message)) {
    return 'major';
  }
  if (message.startsWith('feat') || /^feat(\([a-z0-9_.-]+\))?:/.test(message)) {
    return 'minor';
  }
  return 'patch';
}

export function getLatestVersion(changelogContent: string): string {
  const match = changelogContent.match(/##\s*\[(\d+\.\d+\.\d+)\]/);
  return match?.[1] || '0.1.0';
}

export function bumpVersion(currentVersion: string, bump: 'major' | 'minor' | 'patch'): string {
  const parts = currentVersion.split('.').map((n) => Number.parseInt(n, 10));
  let major = parts[0] ?? 0;
  let minor = parts[1] ?? 1;
  let patch = parts[2] ?? 0;

  if (bump === 'major') {
    major += 1;
    minor = 0;
    patch = 0;
  } else if (bump === 'minor') {
    minor += 1;
    patch = 0;
  } else {
    patch += 1;
  }

  return `${major}.${minor}.${patch}`;
}

export function updateTaskNodeForCommit(
  commitDetails: CommitDetails,
  classification: CommitClassification,
  taskPath: string = TASK_NODE_PATH
): void {
  const today = new Date().toISOString().split('T')[0]!;

  let rawContent = '';
  if (fs.existsSync(taskPath)) {
    rawContent = fs.readFileSync(taskPath, 'utf8');
  }

  const domain = classification.domain || 'dexhelper';
  const changelogFilename = domain === 'foundry' ? 'CHANGELOG-foundry.md' : 'CHANGELOG-dexhelper.md';
  const changelogPath = path.join(process.cwd(), changelogFilename);
  let latestVersion = '0.1.0';
  if (fs.existsSync(changelogPath)) {
    latestVersion = getLatestVersion(fs.readFileSync(changelogPath, 'utf8'));
  }

  const bumpType = determineSemverBump(commitDetails.message);
  const nextVersion = bumpVersion(latestVersion, bumpType);

  const parsed = matter(rawContent);
  parsed.data.status = 'READY';
  parsed.data.jules_session_id = null;
  parsed.data.updated_at = today;
  parsed.data.owner_persona = 'changelogger';

  const body = `# Changelog Backfill Commit Evaluation

Target commit details injected by \`changelog-engine.ts\`:

- **Commit SHA:** \`${commitDetails.sha}\`
- **Classification Reason:** ${classification.reason}
- **Recommended Domain:** ${domain}
- **Suggested SemVer Bump:** \`${bumpType}\` (from \`${latestVersion}\` -> \`${nextVersion}\`)

## Commit Message
\`\`\`text
${commitDetails.message}
\`\`\`

## Modified Files
${commitDetails.files.map((f) => `- \`${f}\``).join('\n')}

## Evaluation Instructions
As Changelogger, inspect the commit changes above.
If a changelog entry is warranted, create a PR adding a concise bullet point under \`## [Unreleased]\` or new release header \`## [${nextVersion}] - ${today}\` in \`${changelogFilename}\`.
If no entry is necessary, submit an Empty PR.
`;

  const newContent = matter.stringify(body, parsed.data);
  const dir = path.dirname(taskPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(taskPath, newContent, 'utf8');
}

export function generateContinuousMaintenanceIdeaNode(): void {
  const ideaPath = path.join(process.cwd(), '.foundry', 'ideas', 'idea-000-changelog-continuous-maintenance.md');
  if (fs.existsSync(ideaPath)) {
    return;
  }

  const today = new Date().toISOString().split('T')[0];
  const content = `---
id: idea-000-changelog-continuous-maintenance
type: IDEA
title: "Continuous Changelog Maintenance for Merged Ideas"
status: COMPLETED
owner_persona: "product_manager"
created_at: "${today}"
updated_at: "${today}"
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: null
tags: ["changelog", "automation"]
research_references: []
rejection_count: 0
rejection_reason: ""
notes: "Automatically generated upon historical changelog backfill completion."
---

# Continuous Changelog Maintenance for Merged Ideas

Historical repository backfill for changelogs is complete. Continuous changelog maintenance is now active in The Foundry engine.

## Lifecycle Integration
Whenever an \`IDEA\` node is completed in the Foundry Engine (via \`foundry-heartbeat.ts\`), a changelog entry is automatically appended under \`## [Unreleased]\` to either \`CHANGELOG-foundry.md\` or \`CHANGELOG-dexhelper.md\`.
`;

  const dir = path.dirname(ideaPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(ideaPath, content, 'utf8');
  process.stdout.write(`[changelog-engine] Created IDEA node: idea-000-changelog-continuous-maintenance.md\n`);
}

export async function runChangelogEngine(): Promise<void> {
  const state = loadState();

  // If already in continuous mode, nothing to do here (foundry-heartbeat handles new ideas)
  if (state.mode === 'continuous') {
    process.stdout.write('[changelog-engine] System is in "continuous" mode. Historical backfill complete.\n');
    return;
  }

  // Check current status of the task node
  if (fs.existsSync(TASK_NODE_PATH)) {
    try {
      const taskRaw = fs.readFileSync(TASK_NODE_PATH, 'utf8');
      const taskParsed = matter(taskRaw);
      const taskStatus = taskParsed.data.status;

      if (taskStatus === 'READY' || taskStatus === 'ACTIVE' || taskStatus === 'VERIFYING') {
        process.stdout.write(`[changelog-engine] Backfill task is currently ${taskStatus}. Waiting for session completion.\n`);
        return;
      }
    } catch {
      // parse error
    }
  }

  const commits = getCommitList();

  if (commits.length === 0) {
    process.stdout.write('[changelog-engine] No commits found in git history.\n');
    return;
  }

  let startIndex = 0;
  if (state.last_processed_commit) {
    const idx = commits.indexOf(state.last_processed_commit);
    if (idx !== -1) {
      startIndex = idx + 1;
    }
  }

  process.stdout.write(
    `[changelog-engine] Running in '${state.mode}' mode. Processing from index ${startIndex}/${commits.length}.\n`
  );

  for (let i = startIndex; i < commits.length; i++) {
    const sha = commits[i]!;
    const details = getCommitDetails(sha);
    const classification = classifyCommit(details);

    if (classification.action === 'skip') {
      process.stdout.write(`[changelog-engine] Auto-skipping commit ${sha.slice(0, 7)}: ${classification.reason}\n`);
      state.last_processed_commit = sha;
      saveState(state);
      continue;
    }

    process.stdout.write(`[changelog-engine] Evaluating commit ${sha.slice(0, 7)}: ${classification.reason}\n`);

    // Re-open task node as READY for this commit
    updateTaskNodeForCommit(details, classification);

    state.status = 'pending_jules';
    saveState(state);

    process.stdout.write(`[changelog-engine] Set task-000-changelog-backfill to READY for commit ${sha.slice(0, 7)}. Exiting cycle.\n`);
    return;
  }

  // If backfill reached HEAD, switch mode to continuous and create IDEA node
  if (state.mode === 'backfill' && state.last_processed_commit === commits[commits.length - 1]) {
    state.mode = 'continuous';
    state.status = 'idle';
    saveState(state);
    generateContinuousMaintenanceIdeaNode();

    // Set backfill task node to COMPLETED
    if (fs.existsSync(TASK_NODE_PATH)) {
      const taskRaw = fs.readFileSync(TASK_NODE_PATH, 'utf8');
      const taskParsed = matter(taskRaw);
      taskParsed.data.status = 'COMPLETED';
      fs.writeFileSync(TASK_NODE_PATH, matter.stringify(taskParsed.content, taskParsed.data), 'utf8');
    }

    process.stdout.write('[changelog-engine] 🎉 History backfill complete! Switched mode to "continuous".\n');
  }
}

// Auto-run if executed directly
if (import.meta.url.endsWith(process.argv[1] || '')) {
  runChangelogEngine().catch((err) => {
    process.stderr.write(`[changelog-engine] Fatal error: ${String(err)}\n`);
    process.exit(1);
  });
}
