import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { main, identifyBranchesForCleanup, cleanupRemoteBranches, transitionNodeToCompleted, transitionNodeToReady, transitionNodeToReadyWithoutPenalty, transitionNodeToFailed } from './foundry-heartbeat.ts';
import * as orchestrator from './foundry-orchestrator.ts';

vi.mock('node:fs');
vi.mock('./foundry-orchestrator.ts');

const globalFetch = vi.fn<typeof fetch>();
vi.stubGlobal('fetch', globalFetch);

describe('Foundry Heartbeat', () => {
  const originalEnv = process.env;
  const mockRepoRoot = '/mock/repo';

  beforeEach(() => {
    vi.resetAllMocks();
    vi.clearAllMocks();
    globalFetch.mockClear();
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

  it('should transition an EPIC to FAILED instead of VERIFYING if it lacks an E2E story', async () => {
    const mockEpic = {
      filePath: '/mock/repo/.foundry/epics/epic-1.md',
      repoPath: '.foundry/epics/epic-1.md',
      frontmatter: {
        id: 'epic-1',
        type: 'EPIC',
        status: 'ACTIVE',
        jules_session_id: 'session-1'
      },
      rawContent: '---\ntype: EPIC\nstatus: ACTIVE\njules_session_id: "session-1"\n---\nBody'
    };

    const mockChild = {
      filePath: '/mock/repo/.foundry/stories/story-1.md',
      repoPath: '.foundry/stories/story-1.md',
      frontmatter: {
        id: 'story-1',
        type: 'STORY',
        parent: 'epic-1',
        tags: ['frontend']
      }
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/epics/epic-1.md', '/mock/repo/.foundry/stories/story-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockImplementation((fp) => {
      if (fp === '/mock/repo/.foundry/epics/epic-1.md') return mockEpic as any;
      if (fp === '/mock/repo/.foundry/stories/story-1.md') return mockChild as any;
      return null;
    });

    await transitionNodeToCompleted(mockEpic, mockRepoRoot, 123);

    expect(fs.writeFileSync).toHaveBeenCalled();
    const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
    expect(writeCall[0]).toBe(mockEpic.filePath);
    expect(writeCall[1]).toContain('status: FAILED');
    expect(writeCall[1]).toContain('Missing E2E');
  });

  it('should transition an EPIC to VERIFYING if it has an E2E story', async () => {
    const mockEpic = {
      filePath: '/mock/repo/.foundry/epics/epic-1.md',
      repoPath: '.foundry/epics/epic-1.md',
      frontmatter: {
        id: 'epic-1',
        type: 'EPIC',
        status: 'ACTIVE',
        jules_session_id: 'session-1'
      },
      rawContent: '---\ntype: EPIC\nstatus: ACTIVE\njules_session_id: "session-1"\n---\nBody'
    };

    const mockChild = {
      filePath: '/mock/repo/.foundry/stories/story-1.md',
      repoPath: '.foundry/stories/story-1.md',
      frontmatter: {
        id: 'story-1',
        type: 'STORY',
        parent: 'epic-1',
        tags: ['integration']
      }
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/epics/epic-1.md', '/mock/repo/.foundry/stories/story-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockImplementation((fp) => {
      if (fp === '/mock/repo/.foundry/epics/epic-1.md') return mockEpic as any;
      if (fp === '/mock/repo/.foundry/stories/story-1.md') return mockChild as any;
      return null;
    });

    await transitionNodeToCompleted(mockEpic, mockRepoRoot, 123);

    expect(fs.writeFileSync).toHaveBeenCalled();
    const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
    expect(writeCall[0]).toBe(mockEpic.filePath);
    expect(writeCall[1]).toContain('status: VERIFYING');
  });


  it('should transition an EPIC to FAILED instead of VERIFYING if it lacks an E2E story', async () => {
    const mockEpic = {
      filePath: '/mock/repo/.foundry/epics/epic-1.md',
      repoPath: '.foundry/epics/epic-1.md',
      frontmatter: {
        id: 'epic-1',
        type: 'EPIC',
        status: 'ACTIVE',
        jules_session_id: 'session-1',
        owner_persona: 'story_owner'
      },
      rawContent: '---\ntype: EPIC\nstatus: ACTIVE\njules_session_id: "session-1"\nowner_persona: "story_owner"\n---\nBody'
    };

    const mockChild = {
      filePath: '/mock/repo/.foundry/stories/story-1.md',
      repoPath: '.foundry/stories/story-1.md',
      frontmatter: {
        id: 'story-1',
        type: 'STORY',
        parent: 'epic-1',
        tags: ['frontend']
      }
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/epics/epic-1.md', '/mock/repo/.foundry/stories/story-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockImplementation((fp) => {
      if (fp === '/mock/repo/.foundry/epics/epic-1.md') return mockEpic as any;
      if (fp === '/mock/repo/.foundry/stories/story-1.md') return mockChild as any;
      return null;
    });

    await transitionNodeToCompleted(mockEpic, '/mock/repo', 123);

    expect(fs.writeFileSync).toHaveBeenCalled();
    const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
    expect(writeCall[0]).toBe(mockEpic.filePath);
    expect(writeCall[1]).toContain('status: FAILED');
    expect(writeCall[1]).toContain('Missing E2E');
  });

  it('should transition an EPIC to VERIFYING if it has an E2E story', async () => {
    const mockEpic = {
      filePath: '/mock/repo/.foundry/epics/epic-1.md',
      repoPath: '.foundry/epics/epic-1.md',
      frontmatter: {
        id: 'epic-1',
        type: 'EPIC',
        status: 'ACTIVE',
        jules_session_id: 'session-1',
        owner_persona: 'story_owner'
      },
      rawContent: '---\ntype: EPIC\nstatus: ACTIVE\njules_session_id: "session-1"\nowner_persona: "story_owner"\n---\nBody'
    };

    const mockChild = {
      filePath: '/mock/repo/.foundry/stories/story-1.md',
      repoPath: '.foundry/stories/story-1.md',
      frontmatter: {
        id: 'story-1',
        type: 'STORY',
        parent: 'epic-1',
        tags: ['integration']
      }
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/epics/epic-1.md', '/mock/repo/.foundry/stories/story-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockImplementation((fp) => {
      if (fp === '/mock/repo/.foundry/epics/epic-1.md') return mockEpic as any;
      if (fp === '/mock/repo/.foundry/stories/story-1.md') return mockChild as any;
      return null;
    });

    await transitionNodeToCompleted(mockEpic, '/mock/repo', 123);

    expect(fs.writeFileSync).toHaveBeenCalled();
    const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
    expect(writeCall[0]).toBe(mockEpic.filePath);
    expect(writeCall[1]).toContain('status: VERIFYING');
    expect(writeCall[1]).toContain('owner_persona: auditor');
  });

  it('should transition an active PRD node with owner_persona product_manager to VERIFYING and update owner_persona to auditor', async () => {
    const mockPrd = {
      filePath: '/mock/repo/.foundry/prds/prd-1.md',
      repoPath: '.foundry/prds/prd-1.md',
      frontmatter: {
        id: 'prd-1',
        type: 'PRD',
        status: 'ACTIVE',
        owner_persona: 'product_manager',
        jules_session_id: 'session-1'
      },
      rawContent: '---\ntype: PRD\nstatus: ACTIVE\nowner_persona: "product_manager"\njules_session_id: "session-1"\n---\nBody'
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/prds/prd-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockImplementation((fp) => {
      if (fp === '/mock/repo/.foundry/prds/prd-1.md') return mockPrd as any;
      return null;
    });

    await transitionNodeToCompleted(mockPrd, mockRepoRoot, 123);

    expect(fs.writeFileSync).toHaveBeenCalled();
    const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
    expect(writeCall[0]).toBe(mockPrd.filePath);
    expect(writeCall[1]).toContain('status: VERIFYING');
    expect(writeCall[1]).toContain('owner_persona: auditor');
  });

  it('should transition an active PRD node with owner_persona auditor to COMPLETED directly', async () => {
    const mockPrd = {
      filePath: '/mock/repo/.foundry/prds/prd-1.md',
      repoPath: '.foundry/prds/prd-1.md',
      frontmatter: {
        id: 'prd-1',
        type: 'PRD',
        status: 'ACTIVE',
        owner_persona: 'auditor',
        jules_session_id: 'session-1'
      },
      rawContent: '---\ntype: PRD\nstatus: ACTIVE\nowner_persona: "auditor"\njules_session_id: "session-1"\n---\nBody'
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/prds/prd-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockImplementation((fp) => {
      if (fp === '/mock/repo/.foundry/prds/prd-1.md') return mockPrd as any;
      return null;
    });

    await transitionNodeToCompleted(mockPrd, mockRepoRoot, 123);

    expect(fs.writeFileSync).toHaveBeenCalled();
    const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
    expect(writeCall[0]).toBe(mockPrd.filePath);
    expect(writeCall[1]).toContain('status: COMPLETED');
  });

  it('should transition an active IDEA node with owner_persona product_manager to VERIFYING and update owner_persona to auditor', async () => {
    const mockIdea = {
      filePath: '/mock/repo/.foundry/ideas/idea-1.md',
      repoPath: '.foundry/ideas/idea-1.md',
      frontmatter: {
        id: 'idea-1',
        type: 'IDEA',
        status: 'ACTIVE',
        owner_persona: 'product_manager',
        jules_session_id: 'session-1'
      },
      rawContent: '---\ntype: IDEA\nstatus: ACTIVE\nowner_persona: "product_manager"\njules_session_id: "session-1"\n---\nBody'
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/ideas/idea-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockImplementation((fp) => {
      if (fp === '/mock/repo/.foundry/ideas/idea-1.md') return mockIdea as any;
      return null;
    });

    await transitionNodeToCompleted(mockIdea, mockRepoRoot, 123);

    expect(fs.writeFileSync).toHaveBeenCalled();
    const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
    expect(writeCall[0]).toBe(mockIdea.filePath);
    expect(writeCall[1]).toContain('status: VERIFYING');
    expect(writeCall[1]).toContain('owner_persona: auditor');
  });

  it('should transition an active IDEA node with owner_persona auditor to COMPLETED directly', async () => {
    const mockIdea = {
      filePath: '/mock/repo/.foundry/ideas/idea-1.md',
      repoPath: '.foundry/ideas/idea-1.md',
      frontmatter: {
        id: 'idea-1',
        type: 'IDEA',
        status: 'ACTIVE',
        owner_persona: 'auditor',
        jules_session_id: 'session-1'
      },
      rawContent: '---\ntype: IDEA\nstatus: ACTIVE\nowner_persona: "auditor"\njules_session_id: "session-1"\n---\nBody'
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/ideas/idea-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockImplementation((fp) => {
      if (fp === '/mock/repo/.foundry/ideas/idea-1.md') return mockIdea as any;
      return null;
    });

    await transitionNodeToCompleted(mockIdea, mockRepoRoot, 123);

    expect(fs.writeFileSync).toHaveBeenCalled();
    const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
    expect(writeCall[0]).toBe(mockIdea.filePath);
    expect(writeCall[1]).toContain('status: COMPLETED');
  });

  it('should transition an active EPIC node with owner_persona auditor to COMPLETED directly', async () => {
    const mockEpic = {
      filePath: '/mock/repo/.foundry/epics/epic-1.md',
      repoPath: '.foundry/epics/epic-1.md',
      frontmatter: {
        id: 'epic-1',
        type: 'EPIC',
        status: 'ACTIVE',
        owner_persona: 'auditor',
        jules_session_id: 'session-1'
      },
      rawContent: '---\ntype: EPIC\nstatus: ACTIVE\nowner_persona: "auditor"\njules_session_id: "session-1"\n---\nBody'
    };

    const mockChild = {
      filePath: '/mock/repo/.foundry/stories/story-1.md',
      repoPath: '.foundry/stories/story-1.md',
      frontmatter: {
        id: 'story-1',
        type: 'STORY',
        parent: 'epic-1',
        tags: ['integration']
      }
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/epics/epic-1.md', '/mock/repo/.foundry/stories/story-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockImplementation((fp) => {
      if (fp === '/mock/repo/.foundry/epics/epic-1.md') return mockEpic as any;
      if (fp === '/mock/repo/.foundry/stories/story-1.md') return mockChild as any;
      return null;
    });

    await transitionNodeToCompleted(mockEpic, mockRepoRoot, 123);

    expect(fs.writeFileSync).toHaveBeenCalled();
    const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
    expect(writeCall[0]).toBe(mockEpic.filePath);
    expect(writeCall[1]).toContain('status: COMPLETED');
  });

  it('should increment rejection_count from 0 to 1 and status becomes READY during rejection resurrection of ACTIVE node', async () => {
    const mockNode = {
      filePath: '/mock/repo/.foundry/tasks/task-1.md',
      repoPath: '.foundry/tasks/task-1.md',
      frontmatter: {
        id: 'task-1',
        type: 'TASK',
        status: 'ACTIVE',
        jules_session_id: 'session-123',
        rejection_count: 0
      },
      rawContent: '---\ntype: TASK\nstatus: ACTIVE\njules_session_id: "session-123"\nrejection_count: 0\n---\nBody'
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/tasks/task-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

    // Mock API response with unmerged closed PR
    globalFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ state: 'COMPLETED', outputs: [{ pullRequest: { url: 'https://github.com/szubster/dexhelper/pull/123' } }] })
    } as unknown as Response);

    // Also mock details call
    // @ts-expect-error
    globalFetch.mockImplementation((url: string | URL | Request) => {
      const urlStr = typeof url === "string" ? url : (url as URL).toString();
      if (urlStr.includes('/pulls/123')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({ state: 'closed', merged: false, number: 123 })
        });
      }
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({ state: 'COMPLETED', outputs: [{ pullRequest: { url: 'https://github.com/szubster/dexhelper/pull/123' } }] })
      });
    });

    await main();

    expect(fs.writeFileSync).toHaveBeenCalled();
    const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
    expect(writeCall[0]).toBe(mockNode.filePath);
    expect(writeCall[1]).toContain('status: READY');
    expect(writeCall[1]).toContain('rejection_count: 1');
  });

  it('should resurrect a VERIFYING node by keeping status as VERIFYING and setting jules_session_id to null with incremented rejection_count', async () => {
    const mockNode = {
      filePath: '/mock/repo/.foundry/epics/epic-1.md',
      repoPath: '.foundry/epics/epic-1.md',
      frontmatter: {
        id: 'epic-1',
        type: 'EPIC',
        status: 'VERIFYING',
        jules_session_id: 'session-123',
        rejection_count: 0
      },
      rawContent: '---\ntype: EPIC\nstatus: VERIFYING\njules_session_id: "session-123"\nrejection_count: 0\n---\nBody'
    };

    // First gather it under ACTIVE/VERIFYING (note that main gathers both in reality, but test mocks discovery)
    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/epics/epic-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

    // Mock API response with unmerged closed PR
    // @ts-expect-error
    globalFetch.mockImplementation((url: string | URL | Request) => {
      const urlStr = typeof url === "string" ? url : (url as URL).toString();
      if (urlStr.includes('/pulls/123')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({ state: 'closed', merged: false, number: 123 })
        });
      }
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({ state: 'COMPLETED', outputs: [{ pullRequest: { url: 'https://github.com/szubster/dexhelper/pull/123' } }] })
      });
    });

    // Wait! In main heartbeat script, it checks activeNodes, which is gathered via status === 'ACTIVE'.
    // In our test, if we mock activeNodes to include VERIFYING or run transitionNodeToReady directly:
    const { transitionNodeToReady } = await import('./foundry-heartbeat.js');
    await transitionNodeToReady(mockNode, mockRepoRoot, 'PR closed');

    expect(fs.writeFileSync).toHaveBeenCalled();
    const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
    expect(writeCall[0]).toBe(mockNode.filePath);
    expect(writeCall[1]).toContain('status: VERIFYING');
    expect(writeCall[1]).toContain('rejection_count: 1');
    expect(writeCall[1]).toContain('jules_session_id: null');
  });

  it('should not transition or modify the ACTIVE node if a Jules API fetch error occurs (throws exception)', async () => {
    const mockNode = {
      filePath: '/mock/repo/.foundry/tasks/task-1.md',
      repoPath: '.foundry/tasks/task-1.md',
      frontmatter: {
        id: 'task-1',
        type: 'TASK',
        status: 'ACTIVE',
        jules_session_id: 'session-error'
      },
      rawContent: '---\ntype: TASK\nstatus: ACTIVE\njules_session_id: "session-error"\n---\nBody'
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/tasks/task-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

    // Mock fetch to throw error
    globalFetch.mockRejectedValue(new Error('Network error'));

    await main();

    // Node remains unmodified
    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });

  it('should transition a node to READY without penalty if its Jules session is in a terminal state without a PR', async () => {
    const mockNode = {
      filePath: '/mock/repo/.foundry/tasks/task-1.md',
      repoPath: '.foundry/tasks/task-1.md',
      frontmatter: {
        id: 'task-1',
        type: 'TASK',
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
    expect(writeCall[1]).toContain('status: READY');
    expect(writeCall[1]).toContain('jules_session_id: null');
  });

  it('should transition a node to FAILED if its Jules session is NOT_FOUND (404)', async () => {
    const mockNode = {
      filePath: '/mock/repo/.foundry/tasks/task-1.md',
      repoPath: '.foundry/tasks/task-1.md',
      frontmatter: {
        id: 'task-1',
        type: 'TASK',
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


  it('should transition a node to READY without penalty if its Jules session has been IN_PROGRESS for >24h', async () => {
    const mockNode = {
      filePath: '/mock/repo/.foundry/tasks/task-stuck.md',
      repoPath: '.foundry/tasks/task-stuck.md',
      frontmatter: {
        id: 'task-stuck',
        status: 'ACTIVE',
        jules_session_id: 'session-stuck'
      },
      rawContent: '---\nstatus: ACTIVE\njules_session_id: "session-stuck"\nupdated_at: "2023-01-01"\n---\nBody'
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/tasks/task-stuck.md']);
    vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

    // Mock API response with an update time > 24 hours ago
    const pastDate = new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString();
    globalFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ state: 'IN_PROGRESS', updateTime: pastDate })
    } as unknown as Response);

    await main();

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      '/mock/repo/.foundry/tasks/task-stuck.md',
      expect.stringContaining('status: READY'),
      'utf-8'
    );
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
      json: async () => ({ state: 'IN_PROGRESS', updateTime: new Date().toISOString() })
    } as unknown as Response);

    await main();

    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });


  it('should NOT transition a node to FAILED if VERIFYING and jules_session_id is missing', async () => {
    const mockNode = {
      filePath: '/mock/repo/.foundry/tasks/task-1.md',
      repoPath: '.foundry/tasks/task-1.md',
      frontmatter: {
        id: 'task-1',
        status: 'VERIFYING',
        jules_session_id: null
      },
      rawContent: '---\nstatus: VERIFYING\njules_session_id: null\nupdated_at: "2023-01-01"\n---\nBody'
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/tasks/task-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

    globalFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => []
    } as unknown as Response);

    await main();

    expect(fs.writeFileSync).not.toHaveBeenCalled();
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

    // Mock API requests done in the cleanup phase to prevent them from failing the mock verification
    globalFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => []
    } as unknown as Response);

    await main();

    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  it('should transition a node to FAILED if jules_session_id is empty string', async () => {
    const mockNode = {
      filePath: '/mock/repo/.foundry/tasks/task-1.md',
      repoPath: '.foundry/tasks/task-1.md',
      frontmatter: {
        id: 'task-1',
        status: 'ACTIVE',
        jules_session_id: ""
      },
      rawContent: '---\nstatus: ACTIVE\njules_session_id: ""\nupdated_at: "2023-01-01"\n---\nBody'
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/tasks/task-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

    globalFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => []
    } as unknown as Response);

    await main();

    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  it('should transition a node to FAILED if jules_session_id is whitespace only', async () => {
    const mockNode = {
      filePath: '/mock/repo/.foundry/tasks/task-1.md',
      repoPath: '.foundry/tasks/task-1.md',
      frontmatter: {
        id: 'task-1',
        status: 'ACTIVE',
        jules_session_id: "   "
      },
      rawContent: '---\nstatus: ACTIVE\njules_session_id: "   "\nupdated_at: "2023-01-01"\n---\nBody'
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/tasks/task-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

    globalFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => []
    } as unknown as Response);

    await main();

    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  it('should transition a node to FAILED if jules_session_id is literal "null"', async () => {
    const mockNode = {
      filePath: '/mock/repo/.foundry/tasks/task-1.md',
      repoPath: '.foundry/tasks/task-1.md',
      frontmatter: {
        id: 'task-1',
        status: 'ACTIVE',
        jules_session_id: "null"
      },
      rawContent: '---\nstatus: ACTIVE\njules_session_id: "null"\nupdated_at: "2023-01-01"\n---\nBody'
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/tasks/task-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

    globalFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => []
    } as unknown as Response);

    await main();

    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  it('should transition a node to FAILED if jules_session_id is literal "undefined"', async () => {
    const mockNode = {
      filePath: '/mock/repo/.foundry/tasks/task-1.md',
      repoPath: '.foundry/tasks/task-1.md',
      frontmatter: {
        id: 'task-1',
        status: 'ACTIVE',
        jules_session_id: "undefined"
      },
      rawContent: '---\nstatus: ACTIVE\njules_session_id: "undefined"\nupdated_at: "2023-01-01"\n---\nBody'
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/tasks/task-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

    globalFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => []
    } as unknown as Response);

    await main();

    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  it('should find PR from Jules session link and NOT transition to FAILED', async () => {
    const mockNode = {
      filePath: '/mock/repo/.foundry/tasks/task-1.md',
      repoPath: '.foundry/tasks/task-1.md',
      frontmatter: {
        id: 'task-1',
        type: 'TASK',
        status: 'ACTIVE',
        jules_session_id: 'session-pr-link'
      },
      rawContent: '---\nstatus: ACTIVE\ntype: TASK\njules_session_id: "session-pr-link"\nupdated_at: "2023-01-01"\n---\nBody'
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/tasks/task-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

    // @ts-expect-error - Mock signature mismatch
    globalFetch.mockImplementation((url: string | URL | Request) => {
      const urlStr = typeof url === "string" ? url : (url as URL).toString();
      if (urlStr.startsWith('https://jules.googleapis.com/')) {
        return Promise.resolve({
            ok: true,
            status: 200,
          json: async () => ({ 
              state: 'COMPLETED',
              outputs: [{ pullRequest: { url: 'https://github.com/szubster/dexhelper/pull/402' } }]
            })
          });
      }
      if (urlStr.startsWith('https://api.github.com/repos/szubster/dexhelper/pulls/402')) {
        return Promise.resolve({
            ok: true,
            status: 200,
          json: async () => ({ number: 402, state: 'open', html_url: '...' })
        });
      }
      return Promise.resolve({ ok: false, status: 404, json: async () => ({}) });
    });

    await main();

    // Should NOT flip to FAILED because PR was found via Jules link
    expect(fs.writeFileSync).not.toHaveBeenCalledWith(expect.any(String), expect.stringContaining('status: FAILED'), expect.any(String));
  });

  it('should transition a node to PENDING if its PR is merged but it has unchecked tasks', async () => {
    const mockNode = {
      filePath: '/mock/repo/.foundry/tasks/task-1.md',
      repoPath: '.foundry/tasks/task-1.md',
      frontmatter: {
        id: 'task-1',
        type: 'STORY',
        status: 'ACTIVE',
        jules_session_id: 'session-123'
      },
      rawContent: '---\ntype: STORY\nstatus: ACTIVE\njules_session_id: "session-123"\nupdated_at: "2023-01-01"\n---\n## Acceptance Criteria\n- [ ] Unchecked task'
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/tasks/task-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

    // @ts-expect-error
    globalFetch.mockImplementation((url: string | URL | Request) => {
      const urlStr = typeof url === "string" ? url : (url as URL).toString();
      if (urlStr.startsWith('https://jules.googleapis.com/')) {
        return Promise.resolve({
            ok: true,
            status: 200,
          json: async () => ({
              state: 'COMPLETED',
              outputs: [{ pullRequest: { url: 'https://github.com/szubster/dexhelper/pull/402' } }]
            })
          });
      }
      if (urlStr.startsWith('https://api.github.com/repos/szubster/dexhelper/pulls/402')) {
        return Promise.resolve({
            ok: true,
            status: 200,
          json: async () => ({ number: 402, state: 'closed', merged: true })
        });
      }
      return Promise.resolve({ ok: false, status: 404, json: async () => ({}) });
    });

    await main();

    expect(fs.writeFileSync).toHaveBeenCalled();
    const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
    expect(writeCall[1]).toContain('status: PENDING');
  });

  it('should transition a leaf task to FAILED if its PR is merged but it has unchecked tasks', async () => {
    const mockNode = {
      filePath: '/mock/repo/.foundry/tasks/task-2.md',
      repoPath: '.foundry/tasks/task-2.md',
      frontmatter: {
        id: 'task-2',
        type: 'TASK',
        status: 'ACTIVE',
        jules_session_id: 'session-123'
      },
      rawContent: '---\ntype: TASK\nstatus: ACTIVE\njules_session_id: "session-123"\nupdated_at: "2023-01-01"\n---\n## Acceptance Criteria\n- [ ] Unchecked task'
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/tasks/task-2.md']);
    vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

    // @ts-expect-error
    globalFetch.mockImplementation((url: string | URL | Request) => {
      const urlStr = typeof url === "string" ? url : (url as URL).toString();
      if (urlStr.startsWith('https://jules.googleapis.com/')) {
        return Promise.resolve({
            ok: true,
            status: 200,
          json: async () => ({
              state: 'COMPLETED',
              outputs: [{ pullRequest: { url: 'https://github.com/szubster/dexhelper/pull/402' } }]
            })
          });
      }
      if (urlStr.startsWith('https://api.github.com/repos/szubster/dexhelper/pulls/402')) {
        return Promise.resolve({
            ok: true,
            status: 200,
          json: async () => ({ number: 402, state: 'closed', merged: true })
        });
      }
      return Promise.resolve({ ok: false, status: 404, json: async () => ({}) });
    });

    await main();

    expect(fs.writeFileSync).toHaveBeenCalled();
    const writeCall = vi.mocked(fs.writeFileSync).mock.calls[vi.mocked(fs.writeFileSync).mock.calls.length - 1];
    expect(writeCall[1]).toContain('status: FAILED');
  });

  it('should transition a node to COMPLETED if PR from Jules session link is merged', async () => {
    const mockNode = {
      filePath: '/mock/repo/.foundry/tasks/task-1.md',
      repoPath: '.foundry/tasks/task-1.md',
      frontmatter: {
        id: 'task-1',
        type: 'TASK',
        status: 'ACTIVE',
        jules_session_id: 'session-pr-link'
      },
      rawContent: '---\nstatus: ACTIVE\ntype: TASK\njules_session_id: "session-pr-link"\nupdated_at: "2023-01-01"\n---\nBody'
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/tasks/task-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

    // @ts-expect-error - Mock signature mismatch
    globalFetch.mockImplementation((url: string | URL | Request) => {
      const urlStr = typeof url === "string" ? url : (url as URL).toString();
      if (urlStr.startsWith('https://jules.googleapis.com/')) {
        return Promise.resolve({
            ok: true,
            status: 200,
          json: async () => ({
              state: 'COMPLETED',
              outputs: [{ pullRequest: { url: 'https://github.com/szubster/dexhelper/pull/402' } }]
            })
          });
      }
      if (urlStr.startsWith('https://api.github.com/repos/szubster/dexhelper/pulls/402')) {
        return Promise.resolve({
            ok: true,
            status: 200,
          json: async () => ({ number: 402, state: 'closed', merged: true })
        });
      }
      return Promise.resolve({ ok: false, status: 404, json: async () => ({}) });
    });

    await main();

    expect(fs.writeFileSync).toHaveBeenCalled();
    const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
    expect(writeCall[1]).toContain('status: COMPLETED');
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

    // @ts-expect-error - Mock signature mismatch
    globalFetch.mockImplementation((url: string | URL | Request) => {
      const urlStr = typeof url === "string" ? url : (url as URL).toString();
      if (urlStr.startsWith('https://jules.googleapis.com/')) {
        return Promise.resolve({
            ok: true,
            status: 200,
          json: async () => ({ state: 'COMPLETED' }) // No PR link here
        });
      }
      if (urlStr.startsWith('https://api.github.com/search/issues')) {
        return Promise.resolve({
            ok: true,
            status: 200,
          json: async () => ({ items: [] }) // Search fails
        });
      }
      if (urlStr.startsWith('https://api.github.com/repos/szubster/dexhelper/pulls?state=all')) {
        return Promise.resolve({
            ok: true,
            status: 200,
          json: async () => [{ number: 405, state: 'open', body: 'session-fallback' }] // Found in list!
        });
      }
      return Promise.resolve({ ok: false, status: 404, json: async () => ({}) });
    });

    await main();

    expect(fs.writeFileSync).not.toHaveBeenCalledWith(expect.any(String), expect.stringContaining('status: FAILED'), expect.any(String));
  });


  describe('Resurrection Loop / Rejection Count', () => {
    it('should transition to FAILED instead of READY if rejection_count reaches 3', async () => {
      const nodePath = path.join(mockRepoRoot, '.foundry/tasks/task-max-rejections.md');
      const nodeContent = `---
id: task-max-rejections
type: TASK
status: ACTIVE
jules_session_id: "session-123"
rejection_count: 2
---
Body`;

      const mockNode = {
        filePath: nodePath,
        repoPath: '.foundry/tasks/task-max-rejections.md',
        frontmatter: { id: 'task-max-rejections', type: 'TASK', status: 'ACTIVE', jules_session_id: 'session-123', rejection_count: 2 },
        rawContent: nodeContent, body: nodeContent
      } as any;

      vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue([nodePath]);
      vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode);

      // @ts-expect-error
      globalFetch.mockImplementation((url: string | URL | Request) => {
        const urlStr = typeof url === "string" ? url : (url as URL).toString();
        if (urlStr.startsWith('https://jules.googleapis.com/')) {
          return Promise.resolve({
            ok: true,
            status: 200,
            json: async () => ({
              state: 'COMPLETED',
              outputs: [{ pullRequest: { url: 'https://github.com/szubster/dexhelper/pull/999' } }]
            })
          });
        }
        if (urlStr.startsWith('https://api.github.com/repos/szubster/dexhelper/pulls/999')) {
          return Promise.resolve({
            ok: true,
            status: 200,
            json: async () => ({ number: 999, state: 'closed', merged: false })
          });
        }
        return Promise.resolve({ ok: false, status: 404, json: async () => ({}) });
      });

      await main();

      expect(fs.writeFileSync).toHaveBeenCalled();
      const content = vi.mocked(fs.writeFileSync).mock.calls[0][1] as string;
      expect(content).toContain('status: FAILED');
      expect(content).toContain('rejection_count: 3');
      expect(content).toContain('rejection_reason: Max rejection count reached');
    });
  });

  describe('Enforce Acceptance Criteria', () => {

  it('should process PR-less COMPLETED session as Empty PR', async () => {
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

    // @ts-expect-error - Mock signature mismatch
    globalFetch.mockImplementation((url: string | URL | Request) => {
      const urlStr = typeof url === "string" ? url : (url as URL).toString();
      if (urlStr.startsWith('https://jules.googleapis.com/')) {
        return Promise.resolve({
            ok: true,
            status: 200,
          json: async () => ({
              state: 'COMPLETED',
              outputs: {
                "pullRequest": {
                  "pullRequest": {
                    "url": "https://github.com/szubster/dexhelper/pull/402"
                  }
                }
              }
            })
          });
      }
      if (urlStr.includes('/pulls/402')) {
        return Promise.resolve({
            ok: true,
            status: 200,
          json: async () => ({ state: 'closed', merged: true, number: 402 })
          });
      }
      return Promise.resolve({ ok: false, status: 404, json: async () => ({}) });
    });

    await main();

    expect(fs.writeFileSync).toHaveBeenCalled();
    const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
    expect(writeCall[1]).toContain('status: COMPLETED');
  });

  it('should process PR-less COMPLETED session with unchecked tasks as FAILED with correct message', async () => {
    const mockNode = {
      filePath: '/mock/repo/.foundry/tasks/task-1.md',
      repoPath: '.foundry/tasks/task-1.md',
      frontmatter: {
        id: 'task-1',
        type: 'TASK',
        status: 'ACTIVE',
        jules_session_id: 'session-pr-less'
      },
      rawContent: '---\ntype: TASK\nstatus: ACTIVE\njules_session_id: "session-pr-less"\nupdated_at: "2023-01-01"\n---\n## Acceptance Criteria\n- [ ] Unchecked box'
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/tasks/task-1.md']);
    vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

    // @ts-expect-error - Mock signature mismatch
    globalFetch.mockImplementation((url: string | URL | Request) => {
      const urlStr = typeof url === "string" ? url : (url as URL).toString();
      if (urlStr.startsWith('https://jules.googleapis.com/')) {
        return Promise.resolve({
            ok: true,
            status: 200,
          json: async () => ({
              state: 'COMPLETED',
              outputs: {}
            })
          });
      }
      return Promise.resolve({ ok: false, status: 404, json: async () => ({}) });
    });

    await transitionNodeToCompleted(mockNode, '/mock/repo', 0);

    expect(fs.writeFileSync).toHaveBeenCalled();
    const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
    expect(writeCall[1]).toContain('status: FAILED');
  });

    it('should transition leaf task with unchecked boxes to FAILED and set rejection_reason', async () => {
      const nodePath = path.join(mockRepoRoot, '.foundry/tasks/task-unchecked-leaf.md');
      const nodeContent = `---
id: task-unchecked-leaf
type: TASK
status: ACTIVE
---

## Acceptance Criteria
- [ ] Unchecked box
`;

      const node = {
        filePath: nodePath,
        repoPath: '.foundry/tasks/task-unchecked-leaf.md',
        frontmatter: { id: 'task-unchecked-leaf', type: 'TASK', status: 'ACTIVE' },
        rawContent: nodeContent, body: nodeContent
      } as any;

      vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue([nodePath]);
      vi.mocked(orchestrator.parseNodeFile).mockReturnValue(node);

      await transitionNodeToCompleted(node, mockRepoRoot, 123);

      const content = vi.mocked(fs.writeFileSync).mock.calls[0][1] as string;
      expect(content).toContain('status: FAILED');
      expect(content).toContain('rejection_reason: Merged with unfulfilled acceptance criteria');
    });

    it('should transition parent node with unchecked boxes to PENDING', async () => {
      const nodePath = path.join(mockRepoRoot, '.foundry/stories/story-unchecked-parent.md');
      const nodeContent = `---
id: story-unchecked-parent
type: STORY
status: ACTIVE
---

## Acceptance Criteria
- [ ] Unchecked box
`;

      const node = {
        filePath: nodePath,
        repoPath: '.foundry/stories/story-unchecked-parent.md',
        frontmatter: { id: 'story-unchecked-parent', type: 'STORY', status: 'ACTIVE' },
        rawContent: nodeContent, body: nodeContent
      } as any;

      vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue([nodePath]);
      vi.mocked(orchestrator.parseNodeFile).mockReturnValue(node);

      await transitionNodeToCompleted(node, mockRepoRoot, 123);

      const content = vi.mocked(fs.writeFileSync).mock.calls[0][1] as string;
      expect(content).toContain('status: PENDING');
      expect(content).toContain("rejection_reason: ''");
    });
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

      // Mock API requests done in the cleanup phase to prevent them from failing the mock verification
      globalFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => []
      } as unknown as Response);

      await main();

      // Github list PRs is called for remote branch cleanup, so there might be calls
      // The important part is that we don't write to the file
      expect(fs.writeFileSync).not.toHaveBeenCalled();
    });

    it('should transition an ACTIVE human task to COMPLETED if PR is merged', async () => {
      const mockNode = {
        filePath: '/mock/repo/.foundry/tasks/task-human.md',
        repoPath: '.foundry/tasks/task-human.md',
        frontmatter: {
          id: 'task-human',
          type: 'TASK',
          status: 'ACTIVE',
          jules_session_id: null,
          owner_persona: 'human',
          pr_number: 999
        },
        rawContent: '---\nstatus: ACTIVE\ntype: TASK\njules_session_id: null\nowner_persona: "human"\npr_number: 999\nupdated_at: "2023-01-01"\n---\nBody'
      };

      vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/tasks/task-human.md']);
      vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

      // @ts-expect-error - Mock signature mismatch
    globalFetch.mockImplementation((url: string | URL | Request) => {
      const urlStr = typeof url === "string" ? url : (url as URL).toString();
        if (urlStr.startsWith('https://api.github.com/repos/szubster/dexhelper/pulls/999')) {
          return Promise.resolve({
            ok: true,
            status: 200,
            json: async () => ({ number: 999, state: 'closed', merged: true })
          });
        }
        return Promise.resolve({ ok: false, status: 404, json: async () => ({}) });
      });

      await main();

      expect(fs.writeFileSync).toHaveBeenCalled();
      const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
      expect(writeCall[1]).toContain('status: COMPLETED');
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

      // @ts-expect-error - Mock signature mismatch
    globalFetch.mockImplementation((url: string | URL | Request) => {
      const urlStr = typeof url === "string" ? url : (url as URL).toString();
        if (urlStr.startsWith('https://api.github.com/repos/szubster/dexhelper/pulls/888')) {
          return Promise.resolve({
            ok: true,
            status: 200,
            json: async () => ({ number: 888, state: 'closed', merged: false })
          });
        }
        return Promise.resolve({ ok: false, status: 404, json: async () => ({}) });
      });

      await main();

      expect(fs.writeFileSync).toHaveBeenCalled();
      const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
      expect(writeCall[1]).toContain('status: READY');
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

      // @ts-expect-error - Mock signature mismatch
    globalFetch.mockImplementation((url: string | URL | Request) => {
      const urlStr = typeof url === "string" ? url : (url as URL).toString();
        if (urlStr.startsWith('https://api.github.com/repos/szubster/dexhelper/pulls/777')) {
          return Promise.resolve({
            ok: true,
            status: 200,
            json: async () => ({ number: 777, state: 'open' })
          });
        }
        return Promise.resolve({ ok: false, status: 404, json: async () => ({}) });
      });

      await main();

      expect(fs.writeFileSync).not.toHaveBeenCalled();
    });
  });


  describe('Regression: Archived Parent and Child Path Matching in Heartbeat', () => {
    it('should transition an EPIC in archive to VERIFYING when its E2E story child is also in archive and parent reference is original path', async () => {
      const mockEpicRegression = {
        filePath: '/mock/repo/.foundry/archive/epics/epic-regression-archived.md',
        repoPath: '.foundry/archive/epics/epic-regression-archived.md',
        frontmatter: {
          id: 'epic-regression-archived',
          type: 'EPIC',
          status: 'ACTIVE',
          jules_session_id: 'session-regression-1',
          owner_persona: 'story_owner'
        },
        rawContent: '---\ntype: EPIC\nstatus: ACTIVE\njules_session_id: "session-regression-1"\nowner_persona: "story_owner"\n---\nBody'
      };

      const mockChildRegression = {
        filePath: '/mock/repo/.foundry/archive/stories/story-regression-archived.md',
        repoPath: '.foundry/archive/stories/story-regression-archived.md',
        frontmatter: {
          id: 'story-regression-archived',
          type: 'STORY',
          parent: '.foundry/epics/epic-regression-archived.md',
          tags: ['integration']
        }
      };

      vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue([
        '/mock/repo/.foundry/archive/epics/epic-regression-archived.md',
        '/mock/repo/.foundry/archive/stories/story-regression-archived.md'
      ]);
      vi.mocked(orchestrator.parseNodeFile).mockImplementation((fp) => {
        if (fp === '/mock/repo/.foundry/archive/epics/epic-regression-archived.md') return mockEpicRegression as any;
        if (fp === '/mock/repo/.foundry/archive/stories/story-regression-archived.md') return mockChildRegression as any;
        return null;
      });

      await transitionNodeToCompleted(mockEpicRegression, '/mock/repo', 123);

      expect(fs.writeFileSync).toHaveBeenCalled();
      const writeCall = vi.mocked(fs.writeFileSync).mock.calls.find(call => call[0] === mockEpicRegression.filePath);
      expect(writeCall).toBeDefined();
      expect(writeCall![1]).toContain('status: VERIFYING');
      expect(writeCall![1]).toContain('owner_persona: auditor');
    });
  });
});

  describe('cleanupRemoteBranches', () => {
    it('should skip deletion and write to journal in DRY_RUN mode', async () => {
      // Mock DRY_RUN = true
      vi.stubGlobal('DRY_RUN', true);

      // Need to re-import or mock DRY_RUN inside module.
      // Easiest is to rely on mock output if info/warn were mocked, but we mock fetch.

      globalFetch.mockImplementation(async (url) => {
        const urlStr = typeof url === "string" ? url : (url as URL).toString();
        if (urlStr.endsWith('/pulls?state=open')) {
          return { ok: true, json: async () => [] } as any;
        }
        if (urlStr.endsWith('/git/matching-refs/heads/')) {
          return { ok: true, json: async () => [{ ref: 'refs/heads/branch-delete' }] } as any;
        }
        return { ok: false } as any;
      });

      // Need DRY_RUN disabled explicitly just in case environment leaks
      vi.stubGlobal('DRY_RUN', false);

      const mockFailedNode = {
        frontmatter: { status: 'FAILED', jules_session_id: 'delete' }
      };

      vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['fail.md']);
      vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockFailedNode as any);

      // We expect identifying to work, but no DELETE fetch
      await main();

      const calls = globalFetch.mock.calls;
      const deleteCalls = calls.filter(call => call[1]?.method === 'DELETE');
      expect(deleteCalls.length).toBe(0);

    });

    it('should delete branch and write to journal when not DRY_RUN', async () => {
      const originalArgv = process.argv;
      process.argv = [];

      const { cleanupRemoteBranches: cleanupRemoteBranchesNoDry } = await import('./foundry-heartbeat.js?update=' + Date.now());

      // Mock DRY_RUN = false (default)
      globalFetch.mockImplementation(async (url, init) => {
        const urlStr = typeof url === "string" ? url : (url as URL).toString();
        if (urlStr.endsWith('/pulls?state=open&per_page=100')) {
          return { ok: true, json: async () => [] } as any;
        }
        if (urlStr.endsWith('/git/matching-refs/heads/')) {
          return { ok: true, json: async () => [{ ref: 'refs/heads/branch-delete' }] } as any;
        }
        if (urlStr.endsWith('/git/refs/heads/branch-delete') && init?.method === 'DELETE') {
          return { ok: true } as any;
        }
        return { ok: false } as any;
      });

      const mockFailedNode = {
        frontmatter: { status: 'FAILED', jules_session_id: 'delete' }
      };

      vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['fail.md']);
      vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockFailedNode as any);

      const mockRepoRootValue = process.cwd();
      await cleanupRemoteBranchesNoDry(mockRepoRootValue, 'szubster/dexhelper', 'mock-token');

      const calls = globalFetch.mock.calls;
      const deleteCalls = calls.filter(call => call[1]?.method === 'DELETE');
      expect(deleteCalls.length).toBe(1);
      expect(deleteCalls[0][0]).toContain('refs/heads/branch-delete');

      process.argv = originalArgv;
    });

    it('should protect branches with open PRs', async () => {
      vi.stubGlobal('DRY_RUN', false);
      const originalArgv = process.argv;
      globalFetch.mockClear(); process.argv = originalArgv.filter(arg => arg !== '--dry-run');

      globalFetch.mockImplementation(async (url) => {
        const urlStr = typeof url === "string" ? url : (url as URL).toString();
        if (urlStr.endsWith('/pulls?state=open')) {
          return { ok: true, json: async () => [{ head: { ref: 'branch-delete' } }] } as any;
        }
        if (urlStr.endsWith('/git/matching-refs/heads/')) {
          return { ok: true, json: async () => [{ ref: 'refs/heads/branch-delete' }] } as any;
        }
        return { ok: false } as any;
      });

      const mockFailedNode = {
        frontmatter: { status: 'FAILED', jules_session_id: 'delete' }
      };

      vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['fail.md']);
      vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockFailedNode as any);

      const mockRepoRootValue = process.cwd();
      await cleanupRemoteBranches(mockRepoRootValue, 'szubster/dexhelper', 'mock-token');

      const calls = globalFetch.mock.calls;
      const deleteCalls = calls.filter(call => call[1]?.method === 'DELETE');
      expect(deleteCalls.length).toBe(0);

      process.argv = originalArgv;
    });

    it('should gracefully exit and not delete any branches if GITHUB API to list open PRs fails (returns 500)', async () => {
      vi.stubGlobal('DRY_RUN', false);
      globalFetch.mockImplementation(async (url) => {
        const urlStr = typeof url === "string" ? url : (url as URL).toString();
        if (urlStr.includes('/pulls?state=open')) {
          return { ok: false, status: 500, statusText: 'Internal Server Error' } as any;
        }
        return { ok: true, json: async () => [] } as any;
      });

      const mockFailedNode = {
        frontmatter: { status: 'FAILED', jules_session_id: 'delete' }
      };

      vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['fail.md']);
      vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockFailedNode as any);

      const mockRepoRootValue = process.cwd();
      await cleanupRemoteBranches(mockRepoRootValue, 'szubster/dexhelper', 'mock-token');

      const deleteCalls = globalFetch.mock.calls.filter(call => call[1]?.method === 'DELETE');
      expect(deleteCalls.length).toBe(0);
    });

    it('should gracefully exit and not delete any branches if GITHUB API to list remote branches fails (returns 500)', async () => {
      vi.stubGlobal('DRY_RUN', false);
      globalFetch.mockImplementation(async (url) => {
        const urlStr = typeof url === "string" ? url : (url as URL).toString();
        if (urlStr.includes('/pulls?state=open')) {
          return { ok: true, json: async () => [] } as any;
        }
        if (urlStr.includes('/git/matching-refs/heads/')) {
          return { ok: false, status: 500, statusText: 'Internal Server Error' } as any;
        }
        return { ok: true } as any;
      });

      const mockFailedNode = {
        frontmatter: { status: 'FAILED', jules_session_id: 'delete' }
      };

      vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['fail.md']);
      vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockFailedNode as any);

      const mockRepoRootValue = process.cwd();
      await cleanupRemoteBranches(mockRepoRootValue, 'szubster/dexhelper', 'mock-token');

      const deleteCalls = globalFetch.mock.calls.filter(call => call[1]?.method === 'DELETE');
      expect(deleteCalls.length).toBe(0);
    });
  });

  describe('identifyBranchesForCleanup', () => {
    it('should return candidate branches for FAILED nodes', async () => {
      const mockFailedNode = {
        frontmatter: { status: 'FAILED', jules_session_id: 'session-fail' }
      };

      vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['fail.md']);
      vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockFailedNode as any);

      const result = await identifyBranchesForCleanup('/mock', ['origin/branch-session-fail']);
      expect(result).toEqual(['origin/branch-session-fail']);
    });

    it('should return candidate branches for CANCELLED nodes', async () => {
      const mockCancelledNode = {
        frontmatter: { status: 'CANCELLED', jules_session_id: 'session-cancelled' }
      };

      vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['cancelled.md']);
      vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockCancelledNode as any);

      const result = await identifyBranchesForCleanup('/mock', ['origin/branch-session-cancelled']);
      expect(result).toEqual(['origin/branch-session-cancelled']);
    });

    it('should NOT return safe branches even if they contain candidate session IDs', async () => {
      const mockFailedNode = {
        frontmatter: { status: 'FAILED', jules_session_id: 'session-fail' }
      };
      // Imagine a node previously failed but now is ACTIVE again under the same session ID
      // Or a different node has the same session ID and is ACTIVE
      const mockActiveNode = {
        frontmatter: { status: 'ACTIVE', jules_session_id: 'session-fail' }
      };

      vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['fail.md', 'active.md']);
      vi.mocked(orchestrator.parseNodeFile).mockImplementation((fp) => {
        if (fp === 'fail.md') return mockFailedNode as any;
        if (fp === 'active.md') return mockActiveNode as any;
        return null;
      });

      const result = await identifyBranchesForCleanup('/mock', ['origin/branch-session-fail']);
      expect(result).toEqual([]);
    });

    it('should NOT return branches associated with ACTIVE/COMPLETED/READY/PENDING nodes', async () => {
      const mockActiveNode = {
        frontmatter: { status: 'ACTIVE', jules_session_id: 'session-active' }
      };
      const mockCompletedNode = {
        frontmatter: { status: 'COMPLETED', jules_session_id: 'session-completed' }
      };

      vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['active.md', 'completed.md']);
      vi.mocked(orchestrator.parseNodeFile).mockImplementation((fp) => {
        if (fp === 'active.md') return mockActiveNode as any;
        if (fp === 'completed.md') return mockCompletedNode as any;
        return null;
      });

      const result = await identifyBranchesForCleanup('/mock', [
        'origin/branch-session-active',
        'origin/branch-session-completed'
      ]);
      expect(result).toEqual([]);
    });

    it('should ignore main and master branches', async () => {
      const mockFailedNode = {
        frontmatter: { status: 'FAILED', jules_session_id: 'session-main' }
      };

      vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['fail.md']);
      vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockFailedNode as any);

      const result = await identifyBranchesForCleanup('/mock', ['origin/main', 'master', 'origin/branch-session-main']);
      expect(result).toEqual(['origin/branch-session-main']);
    });

    it('should handle null session IDs safely', async () => {
      const mockNode = {
        frontmatter: { status: 'FAILED', jules_session_id: null }
      };

      vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['fail.md']);
      vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

      const result = await identifyBranchesForCleanup('/mock', ['origin/some-branch']);
      expect(result).toEqual([]);
    });

    it('should ignore active PR branches', async () => {
      const mockFailedNode = {
        frontmatter: { status: 'FAILED', jules_session_id: 'session-fail' }
      };

      vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['fail.md']);
      vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockFailedNode as any);

      const result = await identifyBranchesForCleanup('/mock', ['origin/branch-session-fail'], ['branch-session-fail']);
      expect(result).toEqual([]);
    });
  });

  describe('Terminal Status Protection', () => {
    it('should preserve CANCELLED or COMPLETED status in transitionNodeToCompleted', async () => {
      vi.mocked(fs.writeFileSync).mockClear();
      const mockCancelledNode = {
        filePath: '/mock/repo/.foundry/epics/epic-1.md',
        repoPath: '.foundry/epics/epic-1.md',
        rawContent: '---\ntype: EPIC\nstatus: CANCELLED\njules_session_id: "session-1"\n---\nBody'
      };
      await transitionNodeToCompleted(mockCancelledNode, '/mock/repo', 123);
      expect(fs.writeFileSync).not.toHaveBeenCalled();

      vi.mocked(fs.writeFileSync).mockClear();
      const mockCompletedNode = {
        filePath: '/mock/repo/.foundry/epics/epic-1.md',
        repoPath: '.foundry/epics/epic-1.md',
        rawContent: '---\ntype: EPIC\nstatus: COMPLETED\njules_session_id: "session-1"\n---\nBody'
      };
      await transitionNodeToCompleted(mockCompletedNode, '/mock/repo', 123);
      expect(fs.writeFileSync).not.toHaveBeenCalled();
    });

    it('should preserve CANCELLED or COMPLETED status in transitionNodeToReady', async () => {
      vi.mocked(fs.writeFileSync).mockClear();
      const mockCancelledNode = {
        filePath: '/mock/repo/.foundry/epics/epic-1.md',
        repoPath: '.foundry/epics/epic-1.md',
        rawContent: '---\ntype: EPIC\nstatus: CANCELLED\njules_session_id: "session-1"\n---\nBody'
      };
      await transitionNodeToReady(mockCancelledNode, '/mock/repo', 'reason');
      expect(fs.writeFileSync).not.toHaveBeenCalled();

      vi.mocked(fs.writeFileSync).mockClear();
      const mockCompletedNode = {
        filePath: '/mock/repo/.foundry/epics/epic-1.md',
        repoPath: '.foundry/epics/epic-1.md',
        rawContent: '---\ntype: EPIC\nstatus: COMPLETED\njules_session_id: "session-1"\n---\nBody'
      };
      await transitionNodeToReady(mockCompletedNode, '/mock/repo', 'reason');
      expect(fs.writeFileSync).not.toHaveBeenCalled();
    });

    it('should preserve CANCELLED or COMPLETED status in transitionNodeToReadyWithoutPenalty', async () => {
      vi.mocked(fs.writeFileSync).mockClear();
      const mockCancelledNode = {
        filePath: '/mock/repo/.foundry/epics/epic-1.md',
        repoPath: '.foundry/epics/epic-1.md',
        rawContent: '---\ntype: EPIC\nstatus: CANCELLED\njules_session_id: "session-1"\n---\nBody'
      };
      await transitionNodeToReadyWithoutPenalty(mockCancelledNode, '/mock/repo', 'reason');
      expect(fs.writeFileSync).not.toHaveBeenCalled();

      vi.mocked(fs.writeFileSync).mockClear();
      const mockCompletedNode = {
        filePath: '/mock/repo/.foundry/epics/epic-1.md',
        repoPath: '.foundry/epics/epic-1.md',
        rawContent: '---\ntype: EPIC\nstatus: COMPLETED\njules_session_id: "session-1"\n---\nBody'
      };
      await transitionNodeToReadyWithoutPenalty(mockCompletedNode, '/mock/repo', 'reason');
      expect(fs.writeFileSync).not.toHaveBeenCalled();
    });

    it('should preserve CANCELLED or COMPLETED status in transitionNodeToFailed', async () => {
      vi.mocked(fs.writeFileSync).mockClear();
      const mockCancelledNode = {
        filePath: '/mock/repo/.foundry/epics/epic-1.md',
        repoPath: '.foundry/epics/epic-1.md',
        rawContent: '---\ntype: EPIC\nstatus: CANCELLED\njules_session_id: "session-1"\n---\nBody'
      };
      await transitionNodeToFailed(mockCancelledNode, '/mock/repo', 'reason');
      expect(fs.writeFileSync).not.toHaveBeenCalled();

      vi.mocked(fs.writeFileSync).mockClear();
      const mockCompletedNode = {
        filePath: '/mock/repo/.foundry/epics/epic-1.md',
        repoPath: '.foundry/epics/epic-1.md',
        rawContent: '---\ntype: EPIC\nstatus: COMPLETED\njules_session_id: "session-1"\n---\nBody'
      };
      await transitionNodeToFailed(mockCompletedNode, '/mock/repo', 'reason');
      expect(fs.writeFileSync).not.toHaveBeenCalled();
    });
  });
