import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { aggregateNodeStatistics } from './statistics.js';

vi.mock('node:fs');

describe('statistics utility', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should correctly aggregate node states', () => {
    const mockRepoRoot = '/mock-repo';
    const mockFoundryDir = path.join(mockRepoRoot, '.foundry');

    vi.mocked(fs.existsSync).mockImplementation((p) => {
      if (p === mockFoundryDir) return true;
      return false;
    });

    vi.mocked(fs.readdirSync).mockImplementation((p: fs.PathOrFileDescriptor | fs.PathLike, _options?: any): any => {
      if (p === mockFoundryDir) {
        return [
          { name: 'task1.md', isDirectory: () => false, isFile: () => true },
          { name: 'idea1.md', isDirectory: () => false, isFile: () => true },
          { name: 'task2.md', isDirectory: () => false, isFile: () => true },
          { name: 'archive', isDirectory: () => true, isFile: () => false },
        ] as fs.Dirent[];
      }
      if (p === path.join(mockFoundryDir, 'archive')) {
        return [
          { name: 'epic1.md', isDirectory: () => false, isFile: () => true },
        ] as fs.Dirent[];
      }
      return [];
    });

    vi.mocked(fs.readFileSync).mockImplementation((p: fs.PathOrFileDescriptor | fs.PathLike, _options?: any): any => {
        const filePath = p as string;
        if (filePath.endsWith('task1.md')) {
            return '---\ntype: TASK\nstatus: COMPLETED\nrejection_count: 2\ncreated_at: 2024-01-01T00:00:00Z\nupdated_at: 2024-01-02T00:00:00Z\n---\nBody';
        }
        if (filePath.endsWith('task2.md')) {
            return '---\ntype: TASK\nstatus: ACTIVE\nrejection_count: 0\n---\nBody';
        }
        if (filePath.endsWith('idea1.md')) {
            return '---\ntype: IDEA\nstatus: COMPLETED\n---\nBody';
        }
        if (filePath.endsWith('epic1.md')) {
            return '---\ntype: EPIC\nstatus: FAILED\n---\nBody';
        }
        return '';
    });

    const stats = aggregateNodeStatistics(mockRepoRoot);

    expect(stats.byType).toEqual({
        'TASK': 2,
        'IDEA': 1,
        'EPIC': 1
    });

    expect(stats.byStatus).toEqual({
        'COMPLETED': 2,
        'ACTIVE': 1,
        'FAILED': 1
    });

    expect(stats.rejectionCounts).toEqual({
        'task1.md': 2,
        'task2.md': 0
    });

    expect(stats.waitTimes).toEqual({
        'task1.md': 86400000
    });
  });

  it('should correctly parse rejection_count when 0, undefined or missing', () => {
    const mockRepoRoot = '/mock-repo';

    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readdirSync).mockImplementation((_p: any, _options?: any): any => {
      return [
        { name: 'task_zero.md', isDirectory: () => false, isFile: () => true },
        { name: 'task_missing.md', isDirectory: () => false, isFile: () => true },
      ] as fs.Dirent[];
    });

    vi.mocked(fs.readFileSync).mockImplementation((p: fs.PathOrFileDescriptor | fs.PathLike): any => {
      const filePath = p as string;
      if (filePath.endsWith('task_zero.md')) {
        return '---\ntype: TASK\nstatus: ACTIVE\nrejection_count: 0\n---\nBody';
      }
      if (filePath.endsWith('task_missing.md')) {
        return '---\ntype: TASK\nstatus: ACTIVE\n---\nBody';
      }
      return '';
    });

    const stats = aggregateNodeStatistics(mockRepoRoot);

    expect(stats.rejectionCounts).toEqual({
      'task_zero.md': 0
    });
    expect(stats.rejectionCounts).not.toHaveProperty('task_missing.md');
  });

  it('should gracefully handle invalid dates and missing dates without adding NaN to waitTimes', () => {
    const mockRepoRoot = '/mock-repo';

    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readdirSync).mockImplementation((_p: any, _options?: any): any => {
      return [
        { name: 'task_invalid_date.md', isDirectory: () => false, isFile: () => true },
        { name: 'task_missing_date.md', isDirectory: () => false, isFile: () => true },
        { name: 'task_malformed.md', isDirectory: () => false, isFile: () => true },
      ] as fs.Dirent[];
    });

    vi.mocked(fs.readFileSync).mockImplementation((p: fs.PathOrFileDescriptor | fs.PathLike): any => {
      const filePath = p as string;
      if (filePath.endsWith('task_invalid_date.md')) {
        return '---\ntype: TASK\nstatus: ACTIVE\ncreated_at: not_a_date\nupdated_at: 2024-01-02T00:00:00Z\n---\nBody';
      }
      if (filePath.endsWith('task_missing_date.md')) {
        return '---\ntype: TASK\nstatus: ACTIVE\ncreated_at: 2024-01-01T00:00:00Z\n---\nBody';
      }
      if (filePath.endsWith('task_malformed.md')) {
        return 'not a real file';
      }
      return '';
    });

    const stats = aggregateNodeStatistics(mockRepoRoot);

    // waitTimes should be completely empty (or empty object) since no valid wait time can be calculated
    expect(stats.waitTimes).toEqual({});
  });
});

import { execSync } from 'node:child_process';
import { extractPRMetrics } from './statistics.js';

vi.mock('node:child_process', () => ({
  execSync: vi.fn<() => Buffer>(),
}));

describe('extractPRMetrics', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should extract and parse PR metrics correctly', () => {
    const mockOutput = JSON.stringify([
      { state: 'OPEN' },
      { state: 'MERGED' },
      { state: 'CLOSED' },
      { state: 'OPEN' },
      { state: 'MERGED' },
    ]);

    vi.mocked(execSync).mockReturnValue(mockOutput as any);

    const metrics = extractPRMetrics();

    expect(execSync).toHaveBeenCalledWith('gh pr list --limit 10000 --state all --json state', { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] });
    expect(metrics).toEqual({
      totalPRs: 5,
      openPRs: 2,
      mergedPRs: 2,
      closedPRs: 1,
    });
  });

  it('should fallback to frontmatter scanning and git log if execSync gh fails and repoRoot is provided', () => {
    vi.mocked(execSync).mockImplementation((cmd: string) => {
      if (cmd.startsWith('gh')) {
        throw new Error('gh command missing');
      }
      if (cmd.startsWith('git log')) {
        return 'Merge pull request #103 from branch\nchore: test commit (#104)\n' as any;
      }
      return '' as any;
    });

    const mockRepoRoot = '/mock-repo';
    const mockFoundryDir = path.join(mockRepoRoot, '.foundry');

    vi.mocked(fs.existsSync).mockImplementation((p) => {
      if (p === mockFoundryDir) return true;
      return false;
    });

    vi.mocked(fs.readdirSync).mockImplementation((p: any, _options?: any): any => {
      if (p === mockFoundryDir) {
        return [
          { name: 'task1.md', isDirectory: () => false, isFile: () => true },
          { name: 'task2.md', isDirectory: () => false, isFile: () => true },
        ] as fs.Dirent[];
      }
      return [];
    });

    vi.mocked(fs.readFileSync).mockImplementation((p: any, _options?: any): any => {
      const filePath = p as string;
      if (filePath.endsWith('task1.md')) {
        return '---\ntype: TASK\nstatus: COMPLETED\npr_number: 101\n---\nBody';
      }
      if (filePath.endsWith('task2.md')) {
        return '---\ntype: TASK\nstatus: ACTIVE\npr_number: 102\n---\nBody';
      }
      return '';
    });

    const metrics = extractPRMetrics(mockRepoRoot);

    expect(metrics).toEqual({
      totalPRs: 4,
      openPRs: 1,
      mergedPRs: 3,
      closedPRs: 0,
    });
  });

  it('should return null and log error if execSync fails without repoRoot', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(execSync).mockImplementation(() => {
      throw new Error('Command failed');
    });

    const metrics = extractPRMetrics();

    expect(metrics).toBeNull();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
