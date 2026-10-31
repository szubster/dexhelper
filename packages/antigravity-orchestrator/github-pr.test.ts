import { describe, it, expect, vi } from 'vitest';
import { matchPRToNode, fetchRecentPRs } from './github-pr.ts';
import type { NodeData, PRInfo } from './types.ts';
import type { CommandExecutor } from './agentapi.ts';

describe('github-pr', () => {
  const node: NodeData = {
    id: 'task-42-magic-fix',
    type: 'TASK',
    title: 'Magic Fix',
    status: 'ACTIVE',
    owner_persona: 'coder',
    jules_session_id: 'agy-session-999',
    filePath: '/repo/.foundry/tasks/task-42-magic-fix.md',
    repoPath: '.foundry/tasks/task-42-magic-fix.md',
    rawContent: '',
    frontmatter: {},
    body: '',
  };

  describe('matchPRToNode', () => {
    it('matches by exact branch antigravity/<node-id>', () => {
      const prs: PRInfo[] = [
        {
          number: 101,
          title: 'Unrelated PR',
          headRefName: 'feature/unrelated',
          state: 'OPEN',
        },
        {
          number: 102,
          title: 'Some fix',
          headRefName: 'antigravity/task-42-magic-fix',
          state: 'OPEN',
        },
      ];

      const match = matchPRToNode(node, prs);
      expect(match).not.toBeNull();
      expect(match?.number).toBe(102);
    });

    it('matches by bracketed node ID in title', () => {
      const prs: PRInfo[] = [
        {
          number: 201,
          title: '[task-42-magic-fix] Implement Magic Fix',
          headRefName: 'patch-1',
          state: 'OPEN',
        },
      ];

      const match = matchPRToNode(node, prs);
      expect(match?.number).toBe(201);
    });

    it('matches by prefix in title', () => {
      const prs: PRInfo[] = [
        {
          number: 301,
          title: 'task-42-magic-fix: Implement Magic Fix',
          state: 'OPEN',
        },
      ];

      const match = matchPRToNode(node, prs);
      expect(match?.number).toBe(301);
    });

    it('matches by session ID in body', () => {
      const prs: PRInfo[] = [
        {
          number: 401,
          title: 'Automated PR',
          body: 'Triggered by session agy-session-999',
          state: 'OPEN',
        },
      ];

      const match = matchPRToNode(node, prs);
      expect(match?.number).toBe(401);
    });

    it('matches directly by pr_number if already linked on node', () => {
      const nodeWithPR: NodeData = { ...node, pr_number: 777 };
      const prs: PRInfo[] = [
        {
          number: 777,
          title: 'Custom PR title without markers',
          headRefName: 'custom-branch',
          state: 'MERGED',
        },
      ];

      const match = matchPRToNode(nodeWithPR, prs);
      expect(match).not.toBeNull();
      expect(match?.number).toBe(777);
    });

    it('matches case-insensitively for branch and title markers', () => {
      const prs: PRInfo[] = [
        {
          number: 801,
          title: '[TASK-42-MAGIC-FIX] Uppercase marker',
          headRefName: 'ANTIGRAVITY/task-42-magic-fix',
          state: 'OPEN',
        },
      ];

      const match = matchPRToNode(node, prs);
      expect(match).not.toBeNull();
      expect(match?.number).toBe(801);
    });

    it('returns null when no PR matches', () => {
      const prs: PRInfo[] = [
        {
          number: 501,
          title: '[task-999] Other task',
          headRefName: 'antigravity/task-999',
          state: 'OPEN',
        },
      ];

      const match = matchPRToNode(node, prs);
      expect(match).toBeNull();
    });
  });

  describe('fetchRecentPRs', () => {
    it('fetches and normalizes PRs via gh CLI', async () => {
      const mockGhOutput = JSON.stringify([
        {
          number: 123,
          title: '[task-42-magic-fix] Magic Fix',
          headRefName: 'antigravity/task-42-magic-fix',
          state: 'MERGED',
          url: 'https://github.com/szubster/dexhelper/pull/123',
          mergedAt: '2026-10-31T00:00:00Z',
          body: 'Closes task',
        },
      ]);

      const mockExecutor = vi.fn<CommandExecutor>().mockResolvedValue({
        stdout: mockGhOutput,
        stderr: '',
      });

      const prs = await fetchRecentPRs({ executor: mockExecutor });
      expect(prs.length).toBe(1);
      expect(prs[0]?.number).toBe(123);
      expect(prs[0]?.state).toBe('MERGED');
      expect(prs[0]?.isMerged).toBe(true);
    });
  });
});
