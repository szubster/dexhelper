import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { main } from './foundry-heartbeat.ts';
import * as orchestrator from './foundry-orchestrator.ts';

vi.mock('node:fs');
vi.mock('./foundry-orchestrator.ts');

const globalFetch = vi.fn<typeof fetch>();
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
    } as unknown as Response);

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
    } as unknown as Response);

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
    } as unknown as Response);

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

  it('should find PR from Jules session link and NOT transition to FAILED', async () => {
    const mockNode = {
      filePath: '/mock/repo/.foundry/tasks/task-1.md',
      repoPath: '.foundry/tasks/task-1.md',
      frontmatter: {
        id: 'task-1',
        status: 'ACTIVE',
        jules_session_id: 'session-pr-link'
      },
      rawContent: '---\nstatus: ACTIVE\njules_session_id: "session-pr-link"\nupdated_at: "2023-01-01"\n---\nBody'
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/tasks/task-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

    globalFetch.mockImplementation((url: string | Request | URL) => {
      const urlStr = url instanceof Request ? url.url : url instanceof URL ? url.toString() : String(url);
      if (urlStr.startsWith('https://jules.googleapis.com/')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            state: 'COMPLETED',
            outputs: [{ pullRequest: { url: 'https://github.com/szubster/dexhelper/pull/402' } }]
          })
        } as unknown as Response);
      }
      if (urlStr.includes('pulls/402')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({ number: 402, state: 'open', html_url: '...' })
        } as unknown as Response);
      }
      return Promise.resolve({ ok: false, status: 404, json: async () => ({}) } as unknown as Response);
    });

    await main();

    // Should NOT flip to FAILED because PR was found via Jules link
    expect(fs.writeFileSync).not.toHaveBeenCalledWith(expect.any(String), expect.stringContaining('status: "FAILED"'), expect.any(String));
  });

  it('should transition a node to COMPLETED if PR from Jules session link is merged', async () => {
    const mockNode = {
      filePath: '/mock/repo/.foundry/tasks/task-1.md',
      repoPath: '.foundry/tasks/task-1.md',
      frontmatter: {
        id: 'task-1',
        status: 'ACTIVE',
        jules_session_id: 'session-pr-link'
      },
      rawContent: '---\nstatus: ACTIVE\njules_session_id: "session-pr-link"\nupdated_at: "2023-01-01"\n---\nBody'
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/tasks/task-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

    globalFetch.mockImplementation((url: string | Request | URL) => {
      const urlStr = url instanceof Request ? url.url : url instanceof URL ? url.toString() : String(url);
      if (urlStr.startsWith('https://jules.googleapis.com/')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            state: 'COMPLETED',
            outputs: [{ pullRequest: { url: 'https://github.com/szubster/dexhelper/pull/402' } }]
          })
        } as unknown as Response);
      }
      if (urlStr.includes('pulls/402')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({ number: 402, state: 'closed', merged: true })
        } as unknown as Response);
      }
      return Promise.resolve({ ok: false, status: 404, json: async () => ({}) } as unknown as Response);
    });

    await main();

    expect(fs.writeFileSync).toHaveBeenCalled();
    const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
    expect(writeCall[1]).toContain('status: "COMPLETED"');
  });

  it('should find PR from fallback list and NOT transition to FAILED', async () => {
    const mockNode = {
      filePath: '/mock/repo/.foundry/tasks/task-1.md',
      repoPath: '.foundry/tasks/task-1.md',
      frontmatter: {
        id: 'task-1',
        status: 'ACTIVE',
        jules_session_id: 'session-fallback'
      },
      rawContent: '---\nstatus: ACTIVE\njules_session_id: "session-fallback"\nupdated_at: "2023-01-01"\n---\nBody'
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/tasks/task-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

    globalFetch.mockImplementation((url: string | Request | URL) => {
      const urlStr = url instanceof Request ? url.url : url instanceof URL ? url.toString() : String(url);
      if (urlStr.startsWith('https://jules.googleapis.com/')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({ state: 'COMPLETED' }) // No PR link here
        } as unknown as Response);
      }
      if (urlStr.includes('search/issues')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({ items: [] }) // Search fails
        } as unknown as Response);
      }
      if (urlStr.includes('repos/szubster/dexhelper/pulls?state=all')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => [{ number: 405, state: 'open', body: 'session-fallback' }]
        } as unknown as Response);
      }
      return Promise.resolve({ ok: false, status: 404, json: async () => ({}) } as unknown as Response);
    });

    await main();

    expect(fs.writeFileSync).not.toHaveBeenCalledWith(expect.any(String), expect.stringContaining('status: "FAILED"'), expect.any(String));
  });

  describe('Human Tasks', () => {
    it('should ignore missing jules_session_id for human tasks', async () => {
      const mockNode = {
        filePath: '/mock/repo/.foundry/tasks/task-human.md',
        repoPath: '.foundry/tasks/task-human.md',
        frontmatter: {
          id: 'task-human',
          status: 'ACTIVE',
          jules_session_id: null,
          owner_persona: 'human'
        },
        rawContent: '---\nstatus: ACTIVE\njules_session_id: null\nowner_persona: "human"\nupdated_at: "2023-01-01"\n---\nBody'
      };

      vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/tasks/task-human.md']);
      vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

      await main();

      expect(globalFetch).not.toHaveBeenCalled();
      expect(fs.writeFileSync).not.toHaveBeenCalled();
    });

    it('should transition an ACTIVE human task to COMPLETED if PR is merged', async () => {
      const mockNode = {
        filePath: '/mock/repo/.foundry/tasks/task-human.md',
        repoPath: '.foundry/tasks/task-human.md',
        frontmatter: {
          id: 'task-human',
          status: 'ACTIVE',
          jules_session_id: null,
          owner_persona: 'human',
          pr_number: 999
        },
        rawContent: '---\nstatus: ACTIVE\njules_session_id: null\nowner_persona: "human"\npr_number: 999\nupdated_at: "2023-01-01"\n---\nBody'
      };

      vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/tasks/task-human.md']);
      vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

      globalFetch.mockImplementation((url: string | Request | URL) => {
      const urlStr = url instanceof Request ? url.url : url instanceof URL ? url.toString() : String(url);
        if (urlStr.includes('pulls/999')) {
          return Promise.resolve({
            ok: true,
            status: 200,
            json: async () => ({ number: 999, state: 'closed', merged: true })
          } as unknown as Response);
        }
        return Promise.resolve({ ok: false, status: 404, json: async () => ({}) } as unknown as Response);
      });

      await main();

      expect(fs.writeFileSync).toHaveBeenCalled();
      const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
      expect(writeCall[1]).toContain('status: "COMPLETED"');
    });

    it('should transition an ACTIVE human task to READY if PR is closed but unmerged', async () => {
      const mockNode = {
        filePath: '/mock/repo/.foundry/tasks/task-human.md',
        repoPath: '.foundry/tasks/task-human.md',
        frontmatter: {
          id: 'task-human',
          status: 'ACTIVE',
          jules_session_id: null,
          owner_persona: 'human',
          pr_number: 888
        },
        rawContent: '---\nstatus: ACTIVE\njules_session_id: null\nowner_persona: "human"\npr_number: 888\nupdated_at: "2023-01-01"\n---\nBody'
      };

      vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/tasks/task-human.md']);
      vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

      globalFetch.mockImplementation((url: string | Request | URL) => {
      const urlStr = url instanceof Request ? url.url : url instanceof URL ? url.toString() : String(url);
        if (urlStr.includes('pulls/888')) {
          return Promise.resolve({
            ok: true,
            status: 200,
            json: async () => ({ number: 888, state: 'closed', merged: false })
          } as unknown as Response);
        }
        return Promise.resolve({ ok: false, status: 404, json: async () => ({}) } as unknown as Response);
      });

      await main();

      expect(fs.writeFileSync).toHaveBeenCalled();
      const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
      expect(writeCall[1]).toContain('status: "READY"');
    });

    it('should leave an ACTIVE human task as ACTIVE if PR is open', async () => {
      const mockNode = {
        filePath: '/mock/repo/.foundry/tasks/task-human.md',
        repoPath: '.foundry/tasks/task-human.md',
        frontmatter: {
          id: 'task-human',
          status: 'ACTIVE',
          jules_session_id: null,
          owner_persona: 'human',
          pr_number: 777
        },
        rawContent: '---\nstatus: ACTIVE\njules_session_id: null\nowner_persona: "human"\npr_number: 777\nupdated_at: "2023-01-01"\n---\nBody'
      };

      vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/tasks/task-human.md']);
      vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

      globalFetch.mockImplementation((url: string | Request | URL) => {
      const urlStr = url instanceof Request ? url.url : url instanceof URL ? url.toString() : String(url);
        if (urlStr.includes('pulls/777')) {
          return Promise.resolve({
            ok: true,
            status: 200,
            json: async () => ({ number: 777, state: 'open' })
          } as unknown as Response);
        }
        return Promise.resolve({ ok: false, status: 404, json: async () => ({}) } as unknown as Response);
      });

      await main();

      expect(fs.writeFileSync).not.toHaveBeenCalled();
    });
  });
});
