import fs from 'node:fs/promises';
import path from 'node:path';

const TARGET_DIRS = ['.foundry/ideas', '.foundry/prds', '.foundry/epics', '.foundry/stories', '.foundry/tasks'];

export interface ReadFileResult {
  filePath: string;
  content: string;
}

export async function readFoundryFiles(rootDir: string): Promise<ReadFileResult[]> {
  const dirResults = await Promise.all(
    TARGET_DIRS.map(async (dir) => {
      const fullDirPath = path.join(rootDir, dir);

      try {
        const stats = await fs.stat(fullDirPath);
        if (!stats.isDirectory()) {
          return [];
        }
      } catch {
        // Directory doesn't exist, skip
        return [];
      }

      const files = await getMarkdownFiles(fullDirPath);
      return Promise.all(
        files.map(async (file) => ({
          filePath: file,
          content: await fs.readFile(file, 'utf-8'),
        })),
      );
    }),
  );

  return dirResults.flat();
}

async function getMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const filePromises = entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return getMarkdownFiles(fullPath);
    }
    if (entry.isFile() && entry.name.endsWith('.md')) {
      return [fullPath];
    }
    return [];
  });

  const nestedFiles = await Promise.all(filePromises);
  return nestedFiles.flat();
}
