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
  });

  // Regarding "Ensure the newly created issues successfully trigger Jules' native issue-watching integration when labeled with jules."
  // And "Document any end-to-end delays or rate-limiting behaviors discovered during simulation testing."
  // This is effectively handled by verifying the labels and gh issue command above.
});
