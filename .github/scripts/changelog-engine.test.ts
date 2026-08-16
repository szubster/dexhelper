import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  type ChangelogState,
  classifyCommit,
  generateContinuousMaintenanceIdeaNode,
  loadState,
  saveState,
  updateTaskNodeForCommit
} from './changelog-engine.ts';

describe('changelog-engine', () => {
  const testStatePath = path.join(process.cwd(), '.foundry', 'test-changelog-state.json');
  const testTaskPath = path.join(process.cwd(), '.foundry', 'tasks', 'test-task-000-backfill.md');
  const testIdeaPath = path.join(process.cwd(), '.foundry', 'ideas', 'idea-000-changelog-continuous-maintenance.md');

  beforeEach(() => {
    if (fs.existsSync(testStatePath)) {
      fs.unlinkSync(testStatePath);
    }
    if (fs.existsSync(testTaskPath)) {
      fs.unlinkSync(testTaskPath);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testStatePath)) {
      fs.unlinkSync(testStatePath);
    }
    if (fs.existsSync(testTaskPath)) {
      fs.unlinkSync(testTaskPath);
    }
    if (fs.existsSync(testIdeaPath)) {
      fs.unlinkSync(testIdeaPath);
    }
    vi.restoreAllMocks();
  });

  describe('state management', () => {
    it('returns default state when file does not exist', () => {
      const state = loadState(testStatePath);
      expect(state).toEqual({
        mode: 'backfill',
        last_processed_commit: null,
        status: 'idle'
      });
    });

    it('saves and loads state correctly', () => {
      const state: ChangelogState = {
        mode: 'backfill',
        last_processed_commit: 'abc1234',
        status: 'pending_jules'
      };

      saveState(state, testStatePath);
      const loaded = loadState(testStatePath);

      expect(loaded.mode).toBe('backfill');
      expect(loaded.last_processed_commit).toBe('abc1234');
      expect(loaded.status).toBe('pending_jules');
      expect(loaded.last_updated).toBeDefined();
    });
  });

  describe('classifyCommit', () => {
    it('skips empty commits', () => {
      const res = classifyCommit({ sha: '111', message: 'test', files: [] });
      expect(res.action).toBe('skip');
      expect(res.reason).toContain('Empty commit');
    });

    it('skips automated Foundry commit messages', () => {
      const res = classifyCommit({
        sha: '222',
        message: 'Foundry: Transition task-001 -> ACTIVE',
        files: ['.foundry/tasks/task-001.md']
      });
      expect(res.action).toBe('skip');
      expect(res.reason).toContain('Automated Foundry DAG state');
    });

    it('skips non-idea Foundry sub-node updates', () => {
      const res = classifyCommit({
        sha: '333',
        message: 'feat(task-001): implement feature',
        files: ['.foundry/tasks/task-001.md', '.foundry/stories/story-001.md']
      });
      expect(res.action).toBe('skip');
      expect(res.reason).toContain('Non-idea Foundry sub-node');
    });

    it('skips trivial chore files', () => {
      const res = classifyCommit({
        sha: '444',
        message: 'chore: update lockfile',
        files: ['pnpm-lock.yaml', 'biome.jsonc']
      });
      expect(res.action).toBe('skip');
      expect(res.reason).toContain('Trivial maintenance');
    });

    it('dispatches for Dexhelper IDEA node completion', () => {
      const res = classifyCommit({
        sha: '555',
        message: 'feat: complete Gen 3 save parser idea',
        files: ['.foundry/ideas/idea-056-living-dex-tracker.md']
      });
      expect(res.action).toBe('dispatch');
      expect(res.domain).toBe('dexhelper');
      expect(res.reason).toContain('IDEA node completion');
    });

    it('dispatches for Foundry IDEA node completion', () => {
      const res = classifyCommit({
        sha: '666',
        message: 'feat: orchestrator telemetry improvement',
        files: ['.foundry/ideas/idea-000-137-orchestrator-telemetry-for-cycles.md']
      });
      expect(res.action).toBe('dispatch');
      expect(res.domain).toBe('foundry');
    });

    it('dispatches for ad-hoc application code modifications', () => {
      const res = classifyCommit({
        sha: '777',
        message: 'fix(saveParser): resolve offset parsing bug',
        files: ['src/engine/saveParser/gen3.ts']
      });
      expect(res.action).toBe('dispatch');
      expect(res.domain).toBe('dexhelper');
    });

    it('dispatches for ad-hoc Foundry system code modifications', () => {
      const res = classifyCommit({
        sha: '888',
        message: 'refactor: optimize orchestrator dependency resolution',
        files: ['.github/scripts/foundry-orchestrator.ts']
      });
      expect(res.action).toBe('dispatch');
      expect(res.domain).toBe('foundry');
    });
  });

  describe('task node updates & continuous node creation', () => {
    it('updates task node status to READY and injects commit details', () => {
      const commitDetails = {
        sha: 'abcdef1234567890',
        message: 'feat(ui): add new party analyzer widget',
        files: ['src/components/PartyAnalyzer.tsx']
      };
      const classification = {
        action: 'dispatch' as const,
        reason: 'Ad-hoc user-facing Dexhelper code modification',
        domain: 'dexhelper' as const
      };

      updateTaskNodeForCommit(commitDetails, classification, testTaskPath);

      expect(fs.existsSync(testTaskPath)).toBe(true);
      const raw = fs.readFileSync(testTaskPath, 'utf8');
      const parsed = matter(raw);

      expect(parsed.data.status).toBe('READY');
      expect(parsed.data.owner_persona).toBe('changelogger');
      expect(parsed.content).toContain('abcdef1234567890');
      expect(parsed.content).toContain('feat(ui): add new party analyzer widget');
    });

    it('creates continuous maintenance idea node correctly', () => {
      generateContinuousMaintenanceIdeaNode();
      expect(fs.existsSync(testIdeaPath)).toBe(true);
      const content = fs.readFileSync(testIdeaPath, 'utf8');
      expect(content).toContain('id: idea-000-changelog-continuous-maintenance');
      expect(content).toContain('Continuous Changelog Maintenance for Merged Ideas');
    });
  });
});
