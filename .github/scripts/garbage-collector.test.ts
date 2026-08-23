import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { main } from './garbage-collector.ts';
import * as sweepActiveNodesModule from './sweep-active-nodes.ts';
import * as sessionApiModule from './session-api.ts';
import * as remediateZombieModule from './remediate-zombie.ts';
import * as heartbeatModule from './foundry-heartbeat.ts';

vi.mock('./sweep-active-nodes.ts');
vi.mock('./session-api.ts');
vi.mock('./remediate-zombie.ts');
vi.mock('./foundry-heartbeat.ts', () => ({
  findPRForSession: vi.fn()
}));

describe('garbage-collector', () => {
  let originalEnv: NodeJS.ProcessEnv;
  let tmpNodePaths: string[] = [];

  beforeEach(() => {
    originalEnv = { ...process.env };
    process.env.JULES_API_KEY = 'test-key';

    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    tmpNodePaths = [];
    vi.clearAllMocks();
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();

    // Clean up
    for (const p of tmpNodePaths) {
      const fullPath = path.join(path.resolve(__dirname, '..', '..'), p);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }
  });

  function createTestNode(content: string): string {
    const p = '.foundry/tasks/test-gc-node-' + Math.random().toString(36).substring(7) + '.md';
    tmpNodePaths.push(p);
    const fullPath = path.join(path.resolve(__dirname, '..', '..'), p);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content, 'utf-8');
    return p;
  }

  it('exits if JULES_API_KEY is missing', async () => {
    delete process.env.JULES_API_KEY;
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {}) as any);

    // Provide a valid return value to prevent iteration error
    vi.spyOn(sweepActiveNodesModule, 'sweepActiveNodes').mockReturnValue([]);

    await main();

    expect(console.warn).toHaveBeenCalledWith('Missing JULES_API_KEY. Cannot verify session liveliness.');
    expect(exitSpy).toHaveBeenCalledWith(0);
  });

  it('remediates nodes with missing session IDs', async () => {
    const tmpNodePath = createTestNode(`---
id: task-no-session
status: ACTIVE
owner_persona: coder
---`);

    vi.spyOn(sweepActiveNodesModule, 'sweepActiveNodes').mockReturnValue([tmpNodePath]);

    await main();

    expect(remediateZombieModule.remediateZombieNode).toHaveBeenCalledWith(
      expect.any(String),
      tmpNodePath,
      'Zombie node detected: Missing jules_session_id in ACTIVE state'
    );
  });

  it('skips nodes with human persona', async () => {
    const tmpNodePath = createTestNode(`---
id: task-human
status: ACTIVE
owner_persona: human
---`);

    vi.spyOn(sweepActiveNodesModule, 'sweepActiveNodes').mockReturnValue([tmpNodePath]);

    await main();

    expect(sessionApiModule.checkSessionLiveliness).not.toHaveBeenCalled();
    expect(remediateZombieModule.remediateZombieNode).not.toHaveBeenCalled();
  });

  it('remediates nodes if session is TERMINATED and no PR exists', async () => {
    const tmpNodePath = createTestNode(`---
id: task-terminated
status: ACTIVE
owner_persona: coder
jules_session_id: sess-terminated
---`);

    vi.spyOn(sweepActiveNodesModule, 'sweepActiveNodes').mockReturnValue([tmpNodePath]);
    vi.spyOn(sessionApiModule, 'checkSessionLiveliness').mockResolvedValue('TERMINATED');

    await main();

    expect(sessionApiModule.checkSessionLiveliness).toHaveBeenCalledWith('sess-terminated', 'test-key');
    expect(remediateZombieModule.remediateZombieNode).toHaveBeenCalledWith(
      expect.any(String),
      tmpNodePath,
      'Zombie node detected: Session sess-terminated is TERMINATED / inactive'
    );
  });

  it('skips nodes if session is TERMINATED but has an open PR', async () => {
    process.env.GITHUB_TOKEN = 'test-token';
    const tmpNodePath = createTestNode(`---
id: task-open-pr
status: ACTIVE
owner_persona: coder
jules_session_id: sess-open-pr
---`);

    vi.spyOn(sweepActiveNodesModule, 'sweepActiveNodes').mockReturnValue([tmpNodePath]);
    vi.spyOn(sessionApiModule, 'checkSessionLiveliness').mockResolvedValue('TERMINATED');
    vi.spyOn(heartbeatModule, 'findPRForSession').mockResolvedValue({
      pr: { number: 42, state: 'open' },
      sessionStatus: 'TERMINATED'
    });

    await main();

    expect(sessionApiModule.checkSessionLiveliness).toHaveBeenCalledWith('sess-open-pr', 'test-key');
    expect(heartbeatModule.findPRForSession).toHaveBeenCalledWith(expect.any(String), 'test-token', 'test-key', 'sess-open-pr');
    expect(remediateZombieModule.remediateZombieNode).not.toHaveBeenCalled();
    expect(console.info).toHaveBeenCalledWith(`[GC] Skipping node ${tmpNodePath}: Session sess-open-pr is TERMINATED but has open PR #42 (heartbeat will process)`);
  });

  it('skips remediation in dry-run mode when session is TERMINATED', async () => {
    process.argv.push('--dry-run');
    const tmpNodePath = createTestNode(`---
id: task-terminated-dry
status: ACTIVE
owner_persona: coder
jules_session_id: sess-terminated-dry
---`);

    vi.spyOn(sweepActiveNodesModule, 'sweepActiveNodes').mockReturnValue([tmpNodePath]);
    vi.spyOn(sessionApiModule, 'checkSessionLiveliness').mockResolvedValue('TERMINATED');

    await main();

    expect(sessionApiModule.checkSessionLiveliness).toHaveBeenCalledWith('sess-terminated-dry', 'test-key');
    expect(remediateZombieModule.remediateZombieNode).not.toHaveBeenCalled();
    expect(console.info).toHaveBeenCalledWith(`[GC] [DRY-RUN] Remediating node ${tmpNodePath}: Session sess-terminated-dry is TERMINATED / inactive`);

    process.argv.pop();
  });

  it('skips nodes if session liveliness is UNKNOWN', async () => {
    const tmpNodePath = createTestNode(`---
id: task-unknown
status: ACTIVE
owner_persona: coder
jules_session_id: sess-unknown
---`);

    vi.spyOn(sweepActiveNodesModule, 'sweepActiveNodes').mockReturnValue([tmpNodePath]);
    vi.spyOn(sessionApiModule, 'checkSessionLiveliness').mockResolvedValue('UNKNOWN');

    await main();

    expect(sessionApiModule.checkSessionLiveliness).toHaveBeenCalledWith('sess-unknown', 'test-key');
    expect(remediateZombieModule.remediateZombieNode).not.toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalledWith(`[GC] Skipping node ${tmpNodePath}: Unable to determine session liveliness for sess-unknown (API error)`);
  });

  it('does not remediate nodes if session is ACTIVE', async () => {
    const tmpNodePath = createTestNode(`---
id: task-active
status: ACTIVE
owner_persona: coder
jules_session_id: sess-active
---`);

    vi.spyOn(sweepActiveNodesModule, 'sweepActiveNodes').mockReturnValue([tmpNodePath]);
    vi.spyOn(sessionApiModule, 'checkSessionLiveliness').mockResolvedValue('ACTIVE');

    await main();

    expect(sessionApiModule.checkSessionLiveliness).toHaveBeenCalledWith('sess-active', 'test-key');
    expect(remediateZombieModule.remediateZombieNode).not.toHaveBeenCalled();
  });
});
