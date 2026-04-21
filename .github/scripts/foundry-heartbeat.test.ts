import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { main, transitionNodeToFailed } from './foundry-heartbeat.ts';
import * as orchestrator from './foundry-orchestrator.ts';

vi.mock('node:fs');
vi.mock('./foundry-orchestrator.ts');

const globalFetch = vi.fn();
vi.stubGlobal('fetch', globalFetch);

describe('Foundry Heartbeat', () => {
  const originalEnv = process.env;
  const mockRepoRoot = '/mock/repo';

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv, JULES_API_KEY: 'mock-api-key', GITHUB_TOKEN: 'mock-token' };
    vi.spyOn(process, 'cwd').mockReturnValue(mockRepoRoot);

    // Default: fs.existsSync returns true for .foundry
    vi.mocked(fs.existsSync).mockImplementation((p) => {
      if (typeof p === 'string' && p.endsWith('.foundry')) return true;
      if (typeof p === 'string' && p.endsWith('journals')) return true;
      return false;
    });
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it('should transition a node to FAILED if its Jules session is in a terminal state', async () => {
    const mockNode = {
      filePath: '/mock/repo/.foundry/tasks/task-1.md',
      repoPath: '.foundry/tasks/task-1.md',
      frontmatter: {
        id: 'task-1',
        status: 'ACTIVE',
        jules_session_id: 'session-123'
      },
      rawContent: '---\nstatus: ACTIVE\njules_session_id: "session-123"\nupdated_at: "2023-01-01"\n---\nBody'
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/tasks/task-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

    // Mock API response
    globalFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ state: 'FAILED' })
    });

    await main();

    expect(globalFetch).toHaveBeenCalledWith(
      'https://jules.googleapis.com/v1alpha/sessions/session-123',
      expect.objectContaining({ headers: { 'X-Goog-Api-Key': 'mock-api-key' } })
    );

    expect(fs.writeFileSync).toHaveBeenCalled();
    const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
    expect(writeCall[0]).toBe(mockNode.filePath);
    expect(writeCall[1]).toContain('status: "FAILED"');
    expect(writeCall[1]).toContain('jules_session_id: null');

    expect(fs.appendFileSync).toHaveBeenCalled();
    const appendCall = vi.mocked(fs.appendFileSync).mock.calls[0];
    expect(appendCall[0]).toBe(path.join(mockRepoRoot, '.foundry', 'journals', 'tpm.md'));
    expect(appendCall[1]).toContain('Transitioned to FAILED');
  });

  it('should transition a node to FAILED if its Jules session is NOT_FOUND (404)', async () => {
    const mockNode = {
      filePath: '/mock/repo/.foundry/tasks/task-1.md',
      repoPath: '.foundry/tasks/task-1.md',
      frontmatter: {
        id: 'task-1',
        status: 'ACTIVE',
        jules_session_id: 'session-404'
      },
      rawContent: '---\nstatus: ACTIVE\njules_session_id: "session-404"\nupdated_at: "2023-01-01"\n---\nBody'
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/tasks/task-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

    globalFetch.mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({ error: { status: 'NOT_FOUND' } })
    });

    await main();

    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  it('should NOT transition a node if its Jules session is IN_PROGRESS', async () => {
    const mockNode = {
      filePath: '/mock/repo/.foundry/tasks/task-1.md',
      repoPath: '.foundry/tasks/task-1.md',
      frontmatter: {
        id: 'task-1',
        status: 'ACTIVE',
        jules_session_id: 'session-123'
      },
      rawContent: '---\nstatus: ACTIVE\njules_session_id: "session-123"\nupdated_at: "2023-01-01"\n---\nBody'
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/tasks/task-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

    globalFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ state: 'IN_PROGRESS' })
    });

    await main();

    expect(fs.writeFileSync).not.toHaveBeenCalled();
    expect(fs.appendFileSync).not.toHaveBeenCalled();
  });

  it('should transition a node to FAILED if jules_session_id is missing', async () => {
    const mockNode = {
      filePath: '/mock/repo/.foundry/tasks/task-1.md',
      repoPath: '.foundry/tasks/task-1.md',
      frontmatter: {
        id: 'task-1',
        status: 'ACTIVE',
        jules_session_id: null
      },
      rawContent: '---\nstatus: ACTIVE\njules_session_id: null\nupdated_at: "2023-01-01"\n---\nBody'
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/tasks/task-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

    await main();

    expect(globalFetch).not.toHaveBeenCalled();
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
});
