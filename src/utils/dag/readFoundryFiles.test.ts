import type fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { readFoundryFiles } from './readFoundryFiles';

vi.mock('node:fs/promises');

describe('readFoundryFiles', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should read markdown files from specified directories', async () => {
    vi.mocked(fsp.stat).mockImplementation(async (pathStr) => {
      const str = String(pathStr);
      if (str.includes('.foundry/ideas') || str.includes('.foundry/tasks')) {
        return { isDirectory: () => true } as unknown as fs.Stats;
      }
      throw new Error('ENOENT');
    });

    vi.mocked(fsp.readdir).mockImplementation((async (dirPath: unknown) => {
      const str = String(dirPath);
      if (str.includes('.foundry/ideas')) {
        return [
          { name: 'idea1.md', isDirectory: () => false, isFile: () => true },
          { name: 'not-md.txt', isDirectory: () => false, isFile: () => true },
        ] as unknown as fs.Dirent[];
      }
      if (str.includes('.foundry/tasks') && !str.includes('sub')) {
        return [
          { name: 'task1.md', isDirectory: () => false, isFile: () => true },
          { name: 'sub', isDirectory: () => true, isFile: () => false },
        ] as unknown as fs.Dirent[];
      }
      if (str.includes('sub')) {
        return [{ name: 'task2.md', isDirectory: () => false, isFile: () => true }] as unknown as fs.Dirent[];
      }
      return [];
    }) as unknown as typeof fsp.readdir);

    vi.mocked(fsp.readFile).mockImplementation((async (filePath: unknown) => {
      const str = String(filePath);
      if (str.includes('idea1.md')) return 'content idea1';
      if (str.includes('task1.md')) return 'content task1';
      if (str.includes('task2.md')) return 'content task2';
      return '';
    }) as unknown as typeof fsp.readFile);

    const results = await readFoundryFiles('/root');

    expect(results).toHaveLength(3);

    expect(results).toContainEqual({
      filePath: path.join('/root', '.foundry/ideas', 'idea1.md'),
      content: 'content idea1',
    });
    expect(results).toContainEqual({
      filePath: path.join('/root', '.foundry/tasks', 'task1.md'),
      content: 'content task1',
    });
    expect(results).toContainEqual({
      filePath: path.join('/root', '.foundry/tasks', 'sub', 'task2.md'),
      content: 'content task2',
    });
  });

  it('should handle missing directories gracefully', async () => {
    vi.mocked(fsp.stat).mockRejectedValue(new Error('ENOENT'));

    const results = await readFoundryFiles('/root');
    expect(results).toHaveLength(0);
  });
});
