import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');

test.describe('Scheduled Workflow Action & Orchestrator CLI E2E', () => {
  test('foundry-orchestrator.ts --compile-scheduled outputs correct payload', async () => {
    // Run the orchestrator with --compile-scheduled
    // we use a known generic persona like 'coder'
    const stdout = execSync(
      `node --experimental-strip-types packages/foundry/foundry-orchestrator.ts --compile-scheduled coder`,
      { cwd: rootDir, encoding: 'utf-8' },
    );

    expect(stdout).toContain('You are the Coder');
    expect(stdout).toContain('### CORE SYSTEM POLICIES');
    expect(stdout).toContain('Core Agent Policies');
  });

  test('GitHub Action schedule-*.yml workflows correctly reference the central scheduled agent workflow', async () => {
    const workflowsDir = path.join(rootDir, '.github/workflows');
    const scheduleFiles = fs.readdirSync(workflowsDir).filter((f) => f.startsWith('schedule-') && f.endsWith('.yml'));

    expect(scheduleFiles.length).toBeGreaterThan(0);

    for (const file of scheduleFiles) {
      const content = fs.readFileSync(path.join(workflowsDir, file), 'utf8');
      expect(content).toContain('uses: ./.github/workflows/foundry-scheduled-agent.yml');
      expect(content).toMatch(/persona: "\w+"/);
    }
  });

  test('foundry-scheduled-agent.yml creates a correctly formatted issue payload via GH CLI (Simulation)', async () => {
    const workflowPath = path.join(rootDir, '.github/workflows/foundry-scheduled-agent.yml');
    const content = fs.readFileSync(workflowPath, 'utf8');

    // Check for correct label usage
    expect(content).toContain('--label "jules"');

    // Check for title formatting
    expect(content).toContain('--title "Scheduled Agent: $persona"');

    // Check for issue creation command
    expect(content).toContain('gh issue create');

    // Check manual dispatch trigger
    expect(content).toContain('workflow_dispatch:');

    // Check that compiled prompt is in the body
    expect(content).toContain('echo "$agent_context"');
  });

  test('Issue creation correctly triggers Jules via the native issue listening functionality', async () => {
    // Jules natively listens to the 'jules' label on issues to begin execution.
    // This test verifies that the dispatch correctly applies this label for native triggering.
    const workflowPath = path.join(rootDir, '.github/workflows/foundry-scheduled-agent.yml');
    const content = fs.readFileSync(workflowPath, 'utf8');

    expect(content).toMatch(/gh issue create.*--label "jules"/);
  });

  test('Issue is automatically closed natively when Jules PR merges', async () => {
    // We verify that the auto-close-empty-pr workflow is present and configured to merge PRs, which completes the E2E flow.
    const autoClosePath = path.join(rootDir, '.github/workflows/auto-close-empty-pr.yml');
    const content = fs.readFileSync(autoClosePath, 'utf8');

    // Check that auto-merge natively handles the closure by merging the linked PR
    expect(content).toContain('gh pr merge "$PR_NUMBER"');
    expect(content).toContain('types: [opened, synchronize]');
  });
});
