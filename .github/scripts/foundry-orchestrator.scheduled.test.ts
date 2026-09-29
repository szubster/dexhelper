import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { compileScheduledPrompt } from './foundry-orchestrator';

describe('Scheduled Agent Workflows', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'scheduled-agent-tests-'));

    const tmpAgentPath = path.join(tmpDir, '.github', 'agents', 'generic', 'test_scheduled_agent.md');
    fs.mkdirSync(path.dirname(tmpAgentPath), { recursive: true });
    fs.writeFileSync(tmpAgentPath, '# Test Scheduled Agent\nThis is a test agent.', 'utf8');

    const tmpPoliciesPath = path.join(tmpDir, '.foundry', 'docs', 'knowledge_base', 'agents', 'core_policies.md');
    fs.mkdirSync(path.dirname(tmpPoliciesPath), { recursive: true });
    fs.writeFileSync(tmpPoliciesPath, 'TEST_CORE_POLICIES', 'utf8');
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('compiles scheduled prompt with base and core policies', () => {
    const compiled = compileScheduledPrompt('test_scheduled_agent', tmpDir);
    expect(compiled).toContain('# Test Scheduled Agent\nThis is a test agent.');
    expect(compiled).toContain('### CORE SYSTEM POLICIES');
    expect(compiled).toContain('TEST_CORE_POLICIES');
  });
});
