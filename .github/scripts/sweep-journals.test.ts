import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { sweepJournals } from './sweep-journals.ts';

vi.mock('node:fs');
vi.mock('node:fs/promises');

describe('sweepJournals', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('sweeps files older than max age', () => {
    const mockRepoRoot = '/mock/repo';
    const oldDate = new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).getTime();

    vi.spyOn(fs, 'existsSync').mockImplementation((p: any) => {
      if (typeof p === 'string' && p.includes('journals')) return true;
      if (typeof p === 'string' && p.includes('.jules')) return true;
      return true;
    });

    vi.spyOn(fs, 'readdirSync').mockImplementation(((dir: any, _options?: any) => {
      if (dir === path.join(mockRepoRoot, '.foundry', 'journals')) {
        return [
          { name: 'old-journal.md', isDirectory: () => false, isFile: () => true },
          { name: 'new-journal.md', isDirectory: () => false, isFile: () => true }
        ];
      }
      if (dir === path.join(mockRepoRoot, '.jules')) {
        return [];
      }
      return [];
    }) as any);

    vi.spyOn(fs, 'statSync').mockImplementation((p: any) => {
      if (typeof p === 'string' && p.endsWith('old-journal.md')) {
        return { mtimeMs: oldDate } as fs.Stats;
      }
      return { mtimeMs: Date.now() } as fs.Stats;
    });

    vi.spyOn(fs, 'readFileSync').mockImplementation(() => '');

    const swept = sweepJournals(mockRepoRoot, { dryRun: true });
    expect(swept).toContain(path.join(mockRepoRoot, '.foundry', 'journals', 'old-journal.md'));
    expect(swept).not.toContain(path.join(mockRepoRoot, '.foundry', 'journals', 'new-journal.md'));
  });

  it('sweeps files explicitly marked as processed in frontmatter', () => {
    const mockRepoRoot = '/mock/repo';

    vi.spyOn(fs, 'existsSync').mockImplementation(() => true);

    vi.spyOn(fs, 'readdirSync').mockImplementation(((dir: any, _options?: any) => {
      if (dir === path.join(mockRepoRoot, '.foundry', 'journals')) {
        return [
          { name: 'processed-journal.md', isDirectory: () => false, isFile: () => true },
          { name: 'active-journal.md', isDirectory: () => false, isFile: () => true }
        ];
      }
      return [];
    }) as any);

    vi.spyOn(fs, 'statSync').mockImplementation(() => {
      return { mtimeMs: Date.now() } as fs.Stats;
    });

    vi.spyOn(fs, 'readFileSync').mockImplementation((p: any) => {
      if (typeof p === 'string' && p.endsWith('processed-journal.md')) {
        return '---\nprocessed: true\n---\nBody';
      }
      if (typeof p === 'string' && p.endsWith('active-journal.md')) {
        return '---\nprocessed: false\n---\nBody';
      }
      return '';
    });

    const swept = sweepJournals(mockRepoRoot, { dryRun: true });
    expect(swept).toContain(path.join(mockRepoRoot, '.foundry', 'journals', 'processed-journal.md'));
    expect(swept).not.toContain(path.join(mockRepoRoot, '.foundry', 'journals', 'active-journal.md'));
  });
});
