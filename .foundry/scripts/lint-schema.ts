#!/usr/bin/env node

import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import matter from '@11ty/gray-matter';

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

  const requiredFields = [
    'id',
    'type',
    'title',
    'status',
    'owner_persona',
    'created_at',
    'updated_at',
    'depends_on',
    'jules_session_id',
  ];

  let hasErrors = false;

  for (const file of allFiles) {
    const content = await fs.readFile(file, 'utf-8');
    const parsed = matter(content);

    for (const field of requiredFields) {
      if (parsed.data[field] === undefined) {
        console.error(`Error: File '${file}' is missing required frontmatter field '${field}'.`);
        hasErrors = true;
      }
    }
  }

  if (hasErrors) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
