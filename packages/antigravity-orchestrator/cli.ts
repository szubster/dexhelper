#!/usr/bin/env node

import { dispatchReadyNodes } from './dispatcher.ts';
import { reconcileActiveSessions } from './reconciler.ts';
import { assignNode } from './assign.ts';
import { getFoundryStatus } from './status.ts';
import type { ModelTier } from './types.ts';
import type { CommandExecutor } from './agentapi.ts';

export interface CliOptions {
  executor?: CommandExecutor;
  repoRoot?: string;
  log?: (msg: string) => void;
}

export function printUsage(log: (msg: string) => void = console.log): void {
  log(`
Antigravity Orchestrator for Foundry

Usage:
  antigravity dispatch [node-id] [options]
  antigravity reconcile [options]
  antigravity assign <node-id> [human] [options]
  antigravity status [options]

Commands:
  dispatch [node-id]     Dispatches READY node(s) via Antigravity agentapi.
                         Uses 'pro' model for complex personas (coder, architect, tech-lead)
                         with automatic fallback to 'flash', and 'flash' for others.
  reconcile              Reconciles active Antigravity sessions against GitHub PRs.
  assign <node-id> human Assigns a node directly to a human and sets session to agy-human-<ts>.
  status                 Shows summary of READY nodes, active Antigravity & Jules sessions.

Options:
  --model=<pro|flash>    Explicitly override model tier for dispatch
  --git                  Stage, commit, and push state updates and ACTIVE_SESSIONS.md
  --push                 Same as --git (ensures commit and push to remote)
  --no-push              Commit changes locally without pushing to remote
  --dry-run              Simulate execution without modifying files or dispatching
  --help, -h             Show this help message
`);
}

export async function runCli(argv: string[], options: CliOptions = {}): Promise<number> {
  const log = options.log || ((msg: string) => process.stdout.write(`${msg}\n`));
  const errLog = options.log || ((msg: string) => process.stderr.write(`${msg}\n`));

  const args = argv.slice(2);
  const command = args[0];

  if (!command || command === '--help' || command === '-h') {
    printUsage(log);
    return 0;
  }

  // Parse global flags
  const isDryRun = args.includes('--dry-run');
  const hasGit = args.includes('--git') || args.includes('--push');
  const noPush = args.includes('--no-push');

  let explicitModel: ModelTier | undefined;
  const modelEq = args.find((a) => a.startsWith('--model='));
  if (modelEq) {
    explicitModel = modelEq.split('=')[1] as ModelTier;
  } else {
    const modelIdx = args.indexOf('--model');
    if (modelIdx !== -1 && args[modelIdx + 1] && !args[modelIdx + 1].startsWith('--')) {
      explicitModel = args[modelIdx + 1] as ModelTier;
    }
  }

  // Extract positional arguments (non-flag tokens)
  const positionalArgs: string[] = [];
  for (let i = 1; i < args.length; i++) {
    const arg = args[i]!;
    if (arg.startsWith('--')) {
      continue;
    }
    if (args[i - 1] === '--model') {
      continue;
    }
    positionalArgs.push(arg);
  }

  try {
    switch (command) {
      case 'dispatch': {
        const potentialNodeId = positionalArgs[0];
        log(`[cli] Starting dispatch... (dryRun: ${isDryRun}, git: ${hasGit})`);
        const results = await dispatchReadyNodes(
          {
            nodeId: potentialNodeId,
            model: explicitModel,
            dryRun: isDryRun,
            git: hasGit,
            push: hasGit && !noPush,
            repoRoot: options.repoRoot,
            log,
          },
          options.executor
        );
        log(`[cli] Dispatch completed. ${results.filter((r) => r.success).length}/${results.length} succeeded.`);
        return results.every((r) => r.success) ? 0 : 1;
      }

      case 'reconcile': {
        log(`[cli] Starting reconcile... (dryRun: ${isDryRun}, git: ${hasGit})`);
        const results = await reconcileActiveSessions(
          {
            dryRun: isDryRun,
            git: hasGit,
            push: hasGit && !noPush,
            repoRoot: options.repoRoot,
            log,
          },
          options.executor
        );
        log(`[cli] Reconcile completed. ${results.length} session(s) updated.`);
        return 0;
      }

      case 'assign': {
        const nodeId = positionalArgs[0];
        if (!nodeId) {
          errLog('[cli] Error: assign command requires a node-id. Example: antigravity assign task-123 human');
          return 1;
        }
        const personaArg = positionalArgs[1] || 'human';
        log(`[cli] Assigning ${nodeId} to ${personaArg}...`);
        await assignNode(
          nodeId,
          {
            persona: personaArg,
            dryRun: isDryRun,
            git: hasGit,
            push: hasGit && !noPush,
            repoRoot: options.repoRoot,
            log,
          },
          options.executor
        );
        log(`[cli] Successfully assigned ${nodeId} to ${personaArg}.`);
        return 0;
      }

      case 'status': {
        const statusReport = getFoundryStatus(options.repoRoot);
        log(statusReport.markdownTable);
        return 0;
      }

      default: {
        errLog(`[cli] Unknown command: ${command}`);
        printUsage(errLog);
        return 1;
      }
    }
  } catch (err: any) {
    errLog(`[cli] Error: ${err instanceof Error ? err.message : String(err)}`);
    return 1;
  }
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('cli.ts')) {
  void runCli(process.argv).then((code) => {
    if (code !== 0) process.exit(code);
  });
}
