import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fs from 'node:fs';
import * as child_process from 'node:child_process';
import { harvestAllSessionIds, getSafeSessionIds, cleanJulesSessions } from './clean-jules-sessions.ts';
import * as sessionApi from './session-api.ts';

vi.mock('node:fs');
vi.mock('node:child_process');
vi.mock('./session-api.ts');


const globalFetch = vi.fn<typeof fetch>();
vi.stubGlobal('fetch', globalFetch);

describe('clean-jules-sessions', () => {
  const mockRepoRoot = '/mock/dexhelper';

  beforeEach(() => {
    vi.resetAllMocks();
    vi.clearAllMocks();
    globalFetch.mockClear();

    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('harvestAllSessionIds', () => {
    it('should harvest session IDs from git log, candidate files, and .foundry nodes', () => {
      vi.mocked(child_process.execSync).mockReturnValue(
        'commit 123: Transition task [111111111111111111]\ncommit 456: Fix issue (222222222222222222)'
      );

      vi.mocked(fs.existsSync).mockImplementation((p: any) => {
        if (typeof p === 'string' && p.endsWith('jules_source_session_ids.txt')) return true;
        if (typeof p === 'string' && p.endsWith('.foundry')) return true;
        return false;
      });

      vi.mocked(fs.readFileSync).mockImplementation((p: any) => {
        if (typeof p === 'string' && p.endsWith('jules_source_session_ids.txt')) {
          return '333333333333333333\n444444444444444444\n';
        }
        return '';
      });

      vi.mocked(fs.readdirSync).mockImplementation((_p: any) => {
        return [] as any;
      });

      const harvested = harvestAllSessionIds(mockRepoRoot);
      expect(harvested.has('111111111111111111')).toBe(true);
      expect(harvested.has('222222222222222222')).toBe(true);
      expect(harvested.has('333333333333333333')).toBe(true);
      expect(harvested.has('444444444444444444')).toBe(true);
      expect(harvested.size).toBe(4);
    });
  });

  describe('getSafeSessionIds', () => {
    it('should include hardcoded known safe sessions and sessions from open PRs', async () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);

      globalFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [
          {
            title: 'Fix issue for session 555555555555555555',
            body: 'Jules session https://jules.google.com/session/666666666666666666',
            head: { ref: 'jules-task-777777777777777777' },
          },
        ],
      } as any);

      const safeIds = await getSafeSessionIds(mockRepoRoot, 'szubster/dexhelper', 'mock-github-token');

      // Check hardcoded IDs
      expect(safeIds.has('3832943666399001335')).toBe(true);
      expect(safeIds.has('11365892075984344241')).toBe(true);
      expect(safeIds.has('15654756882712595326')).toBe(true);

      // Check PR extracted IDs
      expect(safeIds.has('555555555555555555')).toBe(true);
      expect(safeIds.has('666666666666666666')).toBe(true);
      expect(safeIds.has('777777777777777777')).toBe(true);
    });

    it('should protect sessions from ACTIVE and VERIFYING .foundry nodes', async () => {
      vi.mocked(fs.existsSync).mockImplementation((p: any) => {
        if (typeof p === 'string' && p.endsWith('.foundry')) return true;
        return false;
      });

      vi.mocked(fs.readdirSync).mockImplementation((p: any) => {
        if (typeof p === 'string' && p.endsWith('.foundry')) {
          return [
            { name: 'task-active.md', isDirectory: () => false },
            { name: 'task-completed.md', isDirectory: () => false },
          ] as any;
        }
        return [] as any;
      });

      vi.mocked(fs.readFileSync).mockImplementation((p: any) => {
        if (typeof p === 'string' && p.endsWith('task-active.md')) {
          return '---\nstatus: ACTIVE\njules_session_id: "888888888888888888"\n---\nBody';
        }
        if (typeof p === 'string' && p.endsWith('task-completed.md')) {
          return '---\nstatus: COMPLETED\njules_session_id: "999999999999999999"\n---\nBody';
        }
        return '';
      });

      const safeIds = await getSafeSessionIds(mockRepoRoot);
      expect(safeIds.has('888888888888888888')).toBe(true);
      // Completed node session is NOT safe (it is eligible for archiving/deletion)
      expect(safeIds.has('999999999999999999')).toBe(false);
    });
  });

  describe('cleanJulesSessions', () => {
    it('should delete candidates and respect limit and dryRun in all mode', async () => {
      vi.mocked(child_process.execSync).mockReturnValue(
        '100000000000000001\n100000000000000002\n100000000000000003'
      );
      vi.mocked(fs.existsSync).mockReturnValue(false);

      vi.mocked(sessionApi.deleteJulesSession).mockResolvedValue(true);

      const dryResult = await cleanJulesSessions({
        mode: 'all',
        limit: 2,
        dryRun: true,
        julesKey: 'mock-key',
        repoRoot: mockRepoRoot,
        rateLimitPerMin: 10000, // fast in test
      });

      expect(dryResult.totalDeleted).toBe(2);
      expect(sessionApi.deleteJulesSession).not.toHaveBeenCalled();

      const realResult = await cleanJulesSessions({
        mode: 'all',
        limit: 2,
        dryRun: false,
        julesKey: 'mock-key',
        repoRoot: mockRepoRoot,
        rateLimitPerMin: 10000,
      });

      expect(realResult.totalDeleted).toBe(2);
      expect(sessionApi.deleteJulesSession).toHaveBeenCalledTimes(2);
    });

    it('should only delete stuck or awaiting-feedback sessions in stuck-only mode', async () => {
      vi.mocked(child_process.execSync).mockReturnValue(
        '200000000000000001\n200000000000000002\n200000000000000003'
      );
      vi.mocked(fs.existsSync).mockReturnValue(false);

      vi.mocked(sessionApi.getSessionDetails).mockImplementation(async (id: string) => {
        if (id === '200000000000000001') {
          return { id, state: 'AWAITING_USER_FEEDBACK' };
        }
        if (id === '200000000000000002') {
          return { id, state: 'IN_PROGRESS' };
        }
        if (id === '200000000000000003') {
          return { id, state: 'COMPLETED' };
        }
        return null;
      });

      vi.mocked(sessionApi.getSessionActivities).mockImplementation(async (id: string) => {
        if (id === '200000000000000002') {
          return []; // 0 activities -> stuck in setup
        }
        return [{ id: 'act1' }];
      });

      vi.mocked(sessionApi.deleteJulesSession).mockResolvedValue(true);

      const result = await cleanJulesSessions({
        mode: 'stuck-only',
        dryRun: false,
        julesKey: 'mock-key',
        repoRoot: mockRepoRoot,
        rateLimitPerMin: 10000,
      });

      // Session 1 (AWAITING_USER_FEEDBACK) and Session 2 (0 activities) deleted. Session 3 (COMPLETED) skipped.
      expect(result.totalDeleted).toBe(2);
      expect(result.totalSkipped).toBe(1);
      expect(sessionApi.deleteJulesSession).toHaveBeenCalledWith('200000000000000001', 'mock-key');
      expect(sessionApi.deleteJulesSession).toHaveBeenCalledWith('200000000000000002', 'mock-key');
    });
  });
});
