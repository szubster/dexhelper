import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');

test.describe('Curator Remediation Node Spawning', () => {
  let tmpDir: string;

  test.beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'curator-remediation-e2e-'));
    fs.mkdirSync(path.join(tmpDir, '.foundry', 'tasks'), { recursive: true });
    fs.mkdirSync(path.join(tmpDir, '.foundry', 'research'), { recursive: true });
  });

  test.afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('orchestrator spawns remediation nodes correctly', async () => {
    // 1. Create the late-bound remediation node spawned by the curator
    const remediationNodeId = 'research-999-remediation-legacy-conflict';
    const researchContent = `---
id: ${remediationNodeId}
type: RESEARCH
title: Remediate Legacy Conflict
status: PENDING
owner_persona: researcher
created_at: '2026-09-14'
updated_at: '2026-09-14'
depends_on: []
parent: task-curator-review-01
jules_session_id: null
---
## Acceptance Criteria
- [ ] Investigate legacy conflict
`;
    fs.writeFileSync(path.join(tmpDir, '.foundry/research', `${remediationNodeId}.md`), researchContent);

    // 2. Create the curator node that identified the regression and appended the remediation node
    const curatorContent = `---
id: task-curator-review-01
type: TASK
title: Curator Review
status: READY
owner_persona: curator
created_at: '2026-09-14'
updated_at: '2026-09-14'
depends_on: []
jules_session_id: null
---
## Acceptance Criteria
- [ ] ${remediationNodeId}
`;
    fs.writeFileSync(path.join(tmpDir, '.foundry/tasks/task-curator-review-01.md'), curatorContent);

    // Run the orchestrator in the temporary directory
    const orchestratorPath = path.join(rootDir, 'packages/foundry/foundry-orchestrator.ts');

    let stdout = '';
    try {
      stdout = execSync(`node --experimental-strip-types ${orchestratorPath}`, {
        cwd: tmpDir,
        env: { ...process.env, VITEST: 'true' },
        encoding: 'utf-8',
      });
    } catch (error) {
      console.error('Orchestrator failed:', error);
      throw error;
    }

    // The orchestrator outputs a JSON array of ready nodes as the last line
    const lines = stdout.trim().split('\n');
    const lastLine = lines[lines.length - 1];

    expect(lastLine).toBeDefined();
    // @ts-expect-error we verified it's defined
    const readyNodes = JSON.parse(lastLine);

    const curatorNode = readyNodes.find((n: { id: string }) => n.id === 'task-curator-review-01');
    const remediationNode = readyNodes.find((n: { id: string }) => n.id === remediationNodeId);

    // Curator node should NOT be ready because it has an unchecked dependency
    expect(curatorNode).toBeUndefined();

    // Remediation node should be ready
    expect(remediationNode).toBeDefined();
    expect(remediationNode.status).toBe('READY');
    expect(remediationNode.owner_persona).toBe('researcher');
    // Assert correct metadata in spawned node
    expect(remediationNode.parent).toBe('task-curator-review-01');
    expect(remediationNode.depends_on).toEqual([]);
  });
});
