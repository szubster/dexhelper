import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const FlexSearch = require('flexsearch');

export function buildDocumentationIndex(repoRoot: string) {
  const docsDirs = [
    path.join(repoRoot, '.foundry', 'docs'),
    path.join(repoRoot, '.foundry', 'archive', 'docs', 'adrs')
  ];

  const index = new FlexSearch.Document({
    document: {
      id: 'id',
      index: ['content'],
      store: ['title', 'content']
    }
  });

  for (const dir of docsDirs) {
    if (!fs.existsSync(dir)) continue;
    const files = walkSync(dir);
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      const content = fs.readFileSync(file, 'utf8');
      index.add({
        id: file,
        title: path.basename(file),
        content: content
      });
    }
  }

  return index;
}

function walkSync(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkSync(filePath));
    } else {
      results.push(filePath);
    }
  });
  return results;
}
