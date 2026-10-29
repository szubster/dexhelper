import fs from 'node:fs/promises';
import path from 'node:path';

const TARGET_DIRS = ['.foundry/ideas', '.foundry/prds', '.foundry/epics', '.foundry/stories', '.foundry/tasks'];

export interface ReadFileResult {
  filePath: string;
  content: string;
}

export async function readFoundryFiles(rootDir: string): Promise<ReadFileResult[]> {
  const existingDirs = await Promise.all(
    TARGET_DIRS.map(async (dir) => {
      const fullDirPath = path.join(rootDir, dir);
      try {
        const stats = await fs.stat(fullDirPath);
        return stats.isDirectory() ? fullDirPath : null;
      } catch {
        return null;
      }
    }),
  );

  const validDirs = existingDirs.filter((d): d is string => d !== null);

  const filesPerDir = await Promise.all(validDirs.map((dir) => getMarkdownFiles(dir)));
  const files = filesPerDir.flat();

  return Promise.all(
    files.map(async (file) => ({
      filePath: file,
      content: await fs.readFile(file, 'utf-8'),
    })),
  );
}

async function getMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const resultsPerEntry = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return getMarkdownFiles(fullPath);
      }
      if (entry.isFile() && entry.name.endsWith('.md')) {
        return [fullPath];
      }
      return [];
    }),
  );

  return resultsPerEntry.flat();
}
