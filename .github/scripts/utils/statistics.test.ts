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
            return '---\ntype: TASK\nstatus: COMPLETED\n---\nBody';
        }
        if (filePath.endsWith('task2.md')) {
            return '---\ntype: TASK\nstatus: ACTIVE\n---\nBody';
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

    expect(execSync).toHaveBeenCalledWith('gh pr list --state all --json state', { encoding: 'utf-8' });
    expect(metrics).toEqual({
      totalPRs: 5,
      openPRs: 2,
      mergedPRs: 2,
      closedPRs: 1,
    });
  });

  it('should return null and log error if execSync fails', () => {
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
