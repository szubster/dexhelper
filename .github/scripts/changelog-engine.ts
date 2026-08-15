/**
 * changelog-engine.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Engine script for changelog backfill and continuous maintenance.
 * Inspects repository history commit-by-commit, auto-detects non-changelog
 * commits to fast-forward the pointer, and dispatches Jules sessions when a
 * changelog entry is required.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export interface ChangelogState {
  mode: 'backfill' | 'continuous';
  last_processed_commit: string | null;
  status: 'idle' | 'pending_jules' | 'paused_quota' | 'completed' | 'error';
  last_updated?: string;
}

export interface CommitClassification {
  action: 'skip' | 'dispatch';
  reason: string;
  domain?: 'foundry' | 'dexhelper';
  ideaNode?: string;
}

const STATE_FILE_PATH = path.join(process.cwd(), '.foundry', 'changelog-state.json');
const CHANGELOGGER_AGENT_PATH = path.join(process.cwd(), '.github', 'agents', 'changelogger.md');

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

export async function dispatchJulesSession(
  commitDetails: CommitDetails,
  classification: CommitClassification,
  julesApiKey: string,
  repo: string
): Promise<{ success: boolean; sessionId?: string; isQuotaError?: boolean }> {
  try {
    let agentContext = 'As Changelogger, analyze this commit and update the appropriate changelog file.';
    if (fs.existsSync(CHANGELOGGER_AGENT_PATH)) {
      agentContext = fs.readFileSync(CHANGELOGGER_AGENT_PATH, 'utf8');
    }

    const domain = classification.domain || 'dexhelper';
    const targetFile = domain === 'foundry' ? 'CHANGELOG-foundry.md' : 'CHANGELOG-dexhelper.md';

    const promptText = `${agentContext}\n\n### ASSIGNED COMMIT TO EVALUATE
Commit SHA: ${commitDetails.sha}
Message: ${commitDetails.message}
Modified Files:
${commitDetails.files.join('\n')}

Classification Reason: ${classification.reason}
Target Changelog: ${targetFile}

Please inspect the changes in this commit. If a changelog entry is warranted, create a PR adding a concise entry under '## [Unreleased]' in ${targetFile}. If no entry is necessary, submit an empty PR.`;

    const payload = {
      prompt: promptText,
      sourceContext: {
        source: `sources/github/${repo}`,
        githubRepoContext: {
          startingBranch: 'main'
        }
      },
      automationMode: 'AUTO_CREATE_PR',
      title: `Changelogger: Evaluate commit ${commitDetails.sha.slice(0, 7)}`
    };

    const res = await fetch('https://jules.googleapis.com/v1alpha/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': julesApiKey
      },
      body: JSON.stringify(payload)
    });

    const bodyText = await res.text();
    let data: any = {};
    try {
      data = JSON.parse(bodyText);
    } catch {
      // JSON parse error
    }

    if (data?.error?.status === 'FAILED_PRECONDITION' || res.status === 429) {
      process.stderr.write(
        `::warning::Jules session failed due to quota/precondition (FAILED_PRECONDITION / 429). Will retry on next run.\n`
      );
      return { success: false, isQuotaError: true };
    }

    if (!res.ok || !data.id) {
      process.stderr.write(`[changelog-engine] Failed to spawn Jules session: ${res.status} ${bodyText}\n`);
      return { success: false };
    }

    process.stdout.write(`Successfully spawned Jules session: ${data.id}\n`);
    return { success: true, sessionId: data.id };
  } catch (err) {
    process.stderr.write(`[changelog-engine] Network error dispatching Jules session: ${String(err)}\n`);
    return { success: false };
  }
}

export async function runChangelogEngine(): Promise<void> {
  const state = loadState();

  // Reset pending_jules or paused_quota status when a new run begins
  if (state.status === 'pending_jules' || state.status === 'paused_quota') {
    state.status = 'idle';
  }

  const commits = getCommitList();

  if (commits.length === 0) {
    process.stdout.write('[changelog-engine] No commits found in git history.\n');
    return;
  }

  const julesApiKey = process.env['JULES_API_KEY'] || '';
  const repo = process.env['GITHUB_REPO'] || 'owner/repo';

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

    if (!julesApiKey) {
      process.stderr.write(
        `[changelog-engine] JULES_API_KEY missing. Cannot dispatch session for ${sha.slice(0, 7)}. Pausing.\n`
      );
      state.status = 'error';
      saveState(state);
      return;
    }

    const dispatchResult = await dispatchJulesSession(details, classification, julesApiKey, repo);

    if (dispatchResult.isQuotaError) {
      process.stdout.write(
        `[changelog-engine] Quota limit reached. Setting status to 'paused_quota' without advancing past ${sha.slice(0, 7)}.\n`
      );
      state.status = 'paused_quota';
      saveState(state);
      return;
    }

    if (dispatchResult.success) {
      state.last_processed_commit = sha;
      state.status = 'pending_jules';
      saveState(state);
      process.stdout.write(`[changelog-engine] Dispatched Jules session for commit ${sha.slice(0, 7)}. Exiting cycle.\n`);
      return;
    }

    // On non-quota network/dispatch error, pause execution at current commit to prevent skipping data
    process.stderr.write(`[changelog-engine] Dispatch error for ${sha.slice(0, 7)}. Pausing for retry.\n`);
    state.status = 'error';
    saveState(state);
    return;
  }

  // If backfill reached HEAD, switch mode to continuous
  if (state.mode === 'backfill' && state.last_processed_commit === commits[commits.length - 1]) {
    state.mode = 'continuous';
    state.status = 'idle';
    saveState(state);
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
