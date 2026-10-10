import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Scheduled Agent Workflows', () => {
  const rootDir = path.resolve(__dirname, '../../');

  it('Scheduled workflows format is correct', () => {
    // Check if workflow yaml exists
    const workflowsDir = path.join(rootDir, '.github/workflows');
    const scheduleFiles = fs.readdirSync(workflowsDir).filter((f) => f.startsWith('schedule-') && f.endsWith('.yml'));
    expect(scheduleFiles.length).toBeGreaterThan(0);

    for (const file of scheduleFiles) {
      const content = fs.readFileSync(path.join(workflowsDir, file), 'utf8');
      expect(content).toContain('uses: ./.github/workflows/foundry-scheduled-agent.yml');
      expect(content).toMatch(/persona: "\w+"/);
    }
  });

  it('Mock Payloads exist for schedule workflow testing', () => {
     const fixturesDir = path.join(rootDir, '.foundry/fixtures/github-actions');
     const payloadPath = path.join(fixturesDir, 'scheduled-issue-payload.json');
     const envPath = path.join(fixturesDir, 'mock_schedule_workflow_env.json');

     expect(fs.existsSync(payloadPath)).toBe(true);
     expect(fs.existsSync(envPath)).toBe(true);

     const payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));
     expect(payload.title).toBe('Scheduled Agent: tpm');
     expect(payload.body).toContain('CORE SYSTEM POLICIES');
  });
});
