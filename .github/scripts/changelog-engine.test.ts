import childProcess from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  type ChangelogState,
  bumpVersion,
  classifyCommit,
  determineSemverBump,
  generateContinuousMaintenanceIdeaNode,
  getLatestVersion,
  loadState,
  runChangelogEngine,
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

  describe('semver functions', () => {
    it('determines semver bump correctly', () => {
      expect(determineSemverBump('feat!: breaking change feature')).toBe('major');
      expect(determineSemverBump('feat!: unscoped breaking change')).toBe('major');
      expect(determineSemverBump('fix: resolve issue\n\nBREAKING CHANGE: api update')).toBe('major');
      expect(determineSemverBump('feat(ui): add new button')).toBe('minor');
      expect(determineSemverBump('fix(parser): fix buffer index')).toBe('patch');
      expect(determineSemverBump('chore: update dependencies')).toBe('patch');
    });

    it('extracts latest version from changelog content', () => {
      const content = '# Changelog\n\n## [1.2.3] - 2026-01-01\n- Feature';
      expect(getLatestVersion(content)).toBe('1.2.3');
      expect(getLatestVersion('# Changelog\n\n## [Unreleased]')).toBe('0.1.0');
    });

    it('bumps versions according to semantic versioning', () => {
      expect(bumpVersion('1.2.3', 'major')).toBe('2.0.0');
      expect(bumpVersion('1.2.3', 'minor')).toBe('1.3.0');
      expect(bumpVersion('1.2.3', 'patch')).toBe('1.2.4');
    });
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
      const res = classifyCommit({ sha: '111', message: 'test', date: '2026-05-01', files: [] });
      expect(res.action).toBe('skip');
      expect(res.reason).toContain('Empty commit');
    });

    it('skips automated Foundry commit messages', () => {
      const res = classifyCommit({
        sha: '222',
        message: 'Foundry: Transition task-001 -> ACTIVE',
        date: '2026-05-01',
        files: ['.foundry/tasks/task-001.md']
      });
      expect(res.action).toBe('skip');
      expect(res.reason).toContain('Automated Foundry DAG state');
    });

    it('skips non-idea Foundry sub-node updates', () => {
      const res = classifyCommit({
        sha: '333',
        message: 'feat(task-001): implement feature',
        date: '2026-05-01',
        files: ['.foundry/tasks/task-001.md', '.foundry/stories/story-001.md']
      });
      expect(res.action).toBe('skip');
      expect(res.reason).toContain('Non-idea Foundry sub-node');
    });

    it('skips trivial chore files', () => {
      const res = classifyCommit({
        sha: '444',
        message: 'chore: update lockfile',
        date: '2026-05-01',
        files: ['pnpm-lock.yaml', 'biome.jsonc']
      });
      expect(res.action).toBe('skip');
      expect(res.reason).toContain('Trivial maintenance');
    });

    it('dispatches for Dexhelper IDEA node completion', () => {
      const res = classifyCommit({
        sha: '555',
        message: 'feat: complete Gen 3 save parser idea',
        date: '2026-05-01',
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
        date: '2026-05-01',
        files: ['.foundry/ideas/idea-000-137-orchestrator-telemetry-for-cycles.md']
      });
      expect(res.action).toBe('dispatch');
      expect(res.domain).toBe('foundry');
    });

    it('dispatches for ad-hoc application code modifications', () => {
      const res = classifyCommit({
        sha: '777',
        message: 'fix(saveParser): resolve offset parsing bug',
        date: '2026-05-01',
        files: ['src/engine/saveParser/gen3.ts']
      });
      expect(res.action).toBe('dispatch');
      expect(res.domain).toBe('dexhelper');
    });

    it('dispatches for ad-hoc Foundry system code modifications', () => {
      const res = classifyCommit({
        sha: '888',
        message: 'refactor: optimize orchestrator dependency resolution',
        date: '2026-05-01',
        files: ['.github/scripts/foundry-orchestrator.ts']
      });
      expect(res.action).toBe('dispatch');
      expect(res.domain).toBe('foundry');
    });
  });

  describe('task node updates & continuous node creation', () => {
    it('updates task node status to READY and injects commit details, date, previous commit SHA, and diff instructions', () => {
      const commitDetails = {
        sha: 'abcdef1234567890',
        message: 'feat(ui): add new party analyzer widget',
        date: '2026-08-15',
        files: ['src/components/PartyAnalyzer.tsx']
      };
      const classification = {
        action: 'dispatch' as const,
        reason: 'Ad-hoc user-facing Dexhelper code modification',
        domain: 'dexhelper' as const
      };

      updateTaskNodeForCommit(commitDetails, classification, testTaskPath, '1234567890abcdef');

      expect(fs.existsSync(testTaskPath)).toBe(true);
      const raw = fs.readFileSync(testTaskPath, 'utf8');
      const parsed = matter(raw);

      expect(parsed.data.status).toBe('READY');
      expect(parsed.data.owner_persona).toBe('changelogger');
      expect(parsed.content).toContain('abcdef1234567890');
      expect(parsed.content).toContain('1234567890abcdef');
      expect(parsed.content).toContain('2026-08-15');
      expect(parsed.content).toContain('diff link comparing previous release commit SHA to new release commit SHA');
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

  describe('runChangelogEngine task guards', () => {
    it('exits early when task node status is READY, ACTIVE, or VERIFYING', async () => {
      const initialTaskContent = `---
id: task-000-changelog-backfill
type: TASK
title: Changelog Backfill Commit Evaluation
status: READY
owner_persona: changelogger
created_at: '2026-04-20'
updated_at: '2026-04-20'
depends_on: []
jules_session_id: null
rejection_count: 0
rejection_reason: ''
---
# Task
`;
      fs.writeFileSync(testTaskPath, initialTaskContent, 'utf8');

      const stdoutSpy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);

      await runChangelogEngine(testStatePath, testTaskPath);

      expect(stdoutSpy).toHaveBeenCalledWith(
        expect.stringContaining('Backfill task is currently READY. Waiting for session completion.')
      );
    });

    it('updates last_processed_commit on dispatch and progresses on subsequent cycles with full or short SHA', async () => {
      const initialTaskContent = `---
id: task-000-changelog-backfill
type: TASK
title: Changelog Backfill Commit Evaluation
status: COMPLETED
owner_persona: changelogger
created_at: '2026-04-20'
updated_at: '2026-04-20'
depends_on: []
jules_session_id: null
rejection_count: 0
rejection_reason: ''
---
# Task
`;
      fs.writeFileSync(testTaskPath, initialTaskContent, 'utf8');

      const commit1 = '75e6919a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e';
      const commit2 = '86f7020b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f';

      // Mock execSync to return simulated git log outputs
      vi.spyOn(childProcess, 'execSync').mockImplementation((cmd: unknown) => {
        const cmdStr = String(cmd);
        if (cmdStr.includes('rev-list')) {
          return `${commit1}\n${commit2}\n`;
        }
        if (cmdStr.includes('format=%B')) {
          return 'feat(app): new feature commit message';
        }
        if (cmdStr.includes('format=%cs')) {
          return '2026-09-09';
        }
        if (cmdStr.includes('diff-tree')) {
          return 'src/App.tsx\n';
        }
        return '';
      });

      // Save initial state pointing to short SHA prefix '75e6919' (matching commit1)
      const initialStore: ChangelogState = {
        mode: 'backfill',
        last_processed_commit: '75e6919',
        status: 'idle'
      };
      saveState(initialStore, testStatePath);

      // Spy process.stdout to avoid clutter
      vi.spyOn(process.stdout, 'write').mockImplementation(() => true);

      await runChangelogEngine(testStatePath, testTaskPath);

      // Read updated state: should have advanced to commit2 and set status to pending_jules
      const updatedState = loadState(testStatePath);
      expect(updatedState.status).toBe('pending_jules');
      expect(updatedState.last_processed_commit).toBe(commit2);

      // Ensure task node was re-opened to READY for commit2
      const taskRaw = fs.readFileSync(testTaskPath, 'utf8');
      const taskParsed = matter(taskRaw);
      expect(taskParsed.data.status).toBe('READY');
      expect(taskParsed.content).toContain(commit2);
    });

    it('syncs state.last_processed_commit from completed task node body if state is behind', async () => {
      const commit1 = '75e6919a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e';
      const commit2 = '86f7020b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f';
      const commit3 = '97a8131c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a';

      // Task node was completed for commit2, but state file was left behind at commit1
      const taskContent = `---
id: task-000-changelog-backfill
type: TASK
title: Changelog Backfill Commit Evaluation
status: COMPLETED
owner_persona: changelogger
created_at: '2026-04-20'
updated_at: '2026-04-20'
depends_on: []
jules_session_id: null
rejection_count: 0
rejection_reason: ''
---
# Changelog Backfill Commit Evaluation

- **Commit SHA:** \`${commit2}\`
`;
      fs.writeFileSync(testTaskPath, taskContent, 'utf8');

      // State file is behind at commit1
      const initialStore: ChangelogState = {
        mode: 'backfill',
        last_processed_commit: commit1,
        status: 'idle'
      };
      saveState(initialStore, testStatePath);

      vi.spyOn(childProcess, 'execSync').mockImplementation((cmd: unknown) => {
        const cmdStr = String(cmd);
        if (cmdStr.includes('rev-list')) {
          return `${commit1}\n${commit2}\n${commit3}\n`;
        }
        if (cmdStr.includes('format=%B')) {
          return 'feat(app): third commit message';
        }
        if (cmdStr.includes('format=%cs')) {
          return '2026-09-09';
        }
        if (cmdStr.includes('diff-tree')) {
          return 'src/App.tsx\n';
        }
        return '';
      });

      vi.spyOn(process.stdout, 'write').mockImplementation(() => true);

      await runChangelogEngine(testStatePath, testTaskPath);

      // Should advance state past commit2 to commit3
      const updatedState = loadState(testStatePath);
      expect(updatedState.status).toBe('pending_jules');
      expect(updatedState.last_processed_commit).toBe(commit3);

      const taskRaw = fs.readFileSync(testTaskPath, 'utf8');
      const taskParsed = matter(taskRaw);
      expect(taskParsed.data.status).toBe('READY');
      expect(taskParsed.content).toContain(commit3);
    });
  });
});
