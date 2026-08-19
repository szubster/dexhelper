import fs from 'node:fs/promises';
import path from 'node:path';

const TARGET_DIRS = ['.foundry/ideas', '.foundry/prds', '.foundry/epics', '.foundry/stories', '.foundry/tasks'];

export interface ReadFileResult {
  filePath: string;
  content: string;
}

export async function readFoundryFiles(rootDir: string): Promise<ReadFileResult[]> {
  const results: ReadFileResult[] = [];

  for (const dir of TARGET_DIRS) {
    const fullDirPath = path.join(rootDir, dir);

    try {
      const stats = await fs.stat(fullDirPath);
      if (!stats.isDirectory()) {
        continue;
      }
    } catch {
      // Directory doesn't exist, skip
      continue;
    }

    const files = await getMarkdownFiles(fullDirPath);
    for (const file of files) {
      const content = await fs.readFile(file, 'utf-8');
      results.push({
        filePath: file,
        content,
      });
    }
  }

  return results;
}

async function getMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getMarkdownFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}
