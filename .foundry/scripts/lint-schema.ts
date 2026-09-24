#!/usr/bin/env node

import * as fs from 'node:fs/promises';
import * as path from 'node:path';

const TARGET_DIRECTORIES = [
  '.foundry/ideas',
  '.foundry/prds',
  '.foundry/epics',
  '.foundry/stories',
  '.foundry/tasks',
];

const IGNORED_DIRECTORIES = ['.foundry/docs', '.foundry/journals'];

async function getMarkdownFiles(dir: string, fileList: string[] = []): Promise<string[]> {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (IGNORED_DIRECTORIES.some(ignoreDir => filePath.startsWith(ignoreDir))) continue;

    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      await getMarkdownFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function main() {
  console.log('Schema linting started...');
  const allFiles: string[] = [];
  for (const dir of TARGET_DIRECTORIES) {
    try {
      await getMarkdownFiles(dir, allFiles);
    } catch (err: any) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }
  }
  console.log(`Found ${allFiles.length} files to lint.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
